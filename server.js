// Letramanía — juego de fiesta: la tele muestra la partida, los móviles son los mandos.
const express = require('express');
const http = require('http');
const os = require('os');
const path = require('path');
const { Server } = require('socket.io');
const QR = require('qrcode');
const C = require('./contenido');

const PORT = Number(process.env.PORT) || 3000;
const CONFIG = {
  preguntasRapidas: 8,     // ronda 1
  palabrasOcultas: 5,      // ronda 2
  tiempoBaseRueda: 100,    // segundos base de cada equipo en la rueda final
  segPregunta: 15,         // segundos para responder en la ronda 1
  revelarCadaMs: 2200,     // ronda 2: cada cuánto aparece una letra
  segParaResponder: 12,    // ronda 2: segundos tras pulsar "¡La sé!"
};

function lanIP() {
  for (const list of Object.values(os.networkInterfaces()))
    for (const i of list || []) if (i.family === 'IPv4' && !i.internal) return i.address;
  return 'localhost';
}
const IP = process.env.HOST_IP || lanIP();
const BASE = `http://${IP}:${PORT}`;

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const pub = (f) => path.join(__dirname, 'public', f);
app.get('/', (_, res) => res.sendFile(pub('index.html')));
app.get('/tv', (_, res) => res.sendFile(pub('tv.html')));
app.get('/play', (_, res) => res.sendFile(pub('play.html')));
app.get('/host', (_, res) => res.sendFile(pub('host.html')));
app.get('/info', (_, res) => res.json({ base: BASE, play: BASE + '/play' }));
app.get('/qr.svg', async (_, res) => {
  res.type('image/svg+xml').send(await QR.toString(BASE + '/play', { type: 'svg', margin: 1 }));
});
app.use(express.static(path.join(__dirname, 'public')));

// ---------- utilidades ----------
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function norm(s) {
  return String(s || '').toLowerCase().trim()
    .replace(/^(el|la|los|las|un|una)\s+/, '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // quita tildes (también ñ→n, ü→u)
    .replace(/[^a-z0-9]/g, '');
}
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
// Acepta la respuesta exacta (sin tildes/mayúsculas) o con una errata si la palabra es larga.
function coincide(dada, respuestas) {
  const x = norm(dada);
  if (!x) return false;
  return respuestas.some((r) => { const y = norm(r); return x === y || (y.length >= 6 && lev(x, y) <= 1); });
}

// ---------- estado ----------
const players = {}; // socket.id -> { name, team }
let G;
function nuevaPartida() {
  G = {
    phase: 'lobby', paused: false, rem: 0,
    teams: { A: { name: 'Equipo Violeta', bonus: 0 }, B: { name: 'Equipo Ámbar', bonus: 0 } },
    r: null, log: [],
    tema: G ? G.tema : 'mixto',
  };
}
nuevaPartida();

// Elige el contenido según el tema: 'general', 'chile' o 'mixto'
function pool(general, chile) {
  if (G.tema === 'chile') return chile;
  if (G.tema === 'general') return general;
  return [...general, ...chile];
}
// En «mixto» se sortea si la rueda es general o chilena; los dos equipos reciben ruedas del mismo tipo para que sea justo.
function ruedasParaPartida() {
  const fuente = G.tema === 'mixto' ? shuffle([C.ruedas, C.ruedasChile])[0] : pool(C.ruedas, C.ruedasChile);
  return shuffle(fuente).slice(0, 2);
}

const INTROS = {
  intro1: { titulo: 'Prueba 1 · Respuesta rápida', texto: 'Responded en el móvil. Acertar suma 5 segundos y el equipo más rápido gana 3 más.', next: 'quiz' },
  intro2: { titulo: 'Prueba 2 · Palabra oculta', texto: 'Las letras van apareciendo. Pulsad «¡La sé!» y escribid la palabra. Cuanto antes, más segundos.', next: 'oculta' },
  intro3: { titulo: 'La Rueda Final', texto: 'Una palabra por cada letra. Si fallas o dices «Paso», le toca al otro equipo. ¡Gana quien más acierte!', next: 'rueda' },
};

function irA(phase) {
  G.phase = phase;
  if (INTROS[phase]) { G.rem = 7000; G.r = null; }
  else if (phase === 'quiz') {
    G.r = { list: shuffle(pool(C.preguntasRapidas, C.preguntasChile)).slice(0, CONFIG.preguntasRapidas), i: -1 };
    siguientePregunta();
  } else if (phase === 'oculta') {
    G.r = { list: shuffle(pool(C.palabrasOcultas, C.palabrasOcultasChile)).slice(0, CONFIG.palabrasOcultas), i: -1 };
    siguienteOculta();
  } else if (phase === 'rueda') iniciarRueda();
  emitir();
}
const SIGUIENTE = { lobby: 'intro1', intro1: 'quiz', quiz: 'intro2', intro2: 'oculta', oculta: 'intro3', intro3: 'rueda', rueda: 'fin' };

// ---- Ronda 1: respuesta rápida ----
function siguientePregunta() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return irA('intro2');
  const q = r.list[r.i];
  // baraja opciones conservando la correcta
  const opts = shuffle(q.opciones.map((t, k) => ({ t, ok: k === 0 })));
  r.q = { texto: q.pregunta, opciones: opts.map((o) => o.t), correcta: opts.findIndex((o) => o.ok) };
  r.stage = 'ask'; r.rem = CONFIG.segPregunta * 1000; r.elapsed = 0;
  r.resp = { A: null, B: null };
}
function responderQuiz(team, opt) {
  const r = G.r;
  if (G.phase !== 'quiz' || r.stage !== 'ask' || r.resp[team]) return;
  r.resp[team] = { opt, ms: r.elapsed, ok: opt === r.q.correcta };
  if (r.resp.A && r.resp.B) revelarQuiz(); else emitir();
}
function revelarQuiz() {
  const r = G.r;
  r.stage = 'reveal'; r.rem = 4500; r.gana = {};
  const ok = ['A', 'B'].filter((t) => r.resp[t] && r.resp[t].ok);
  ok.forEach((t) => { r.gana[t] = 5; });
  if (ok.length) {
    const rapido = ok.sort((a, b) => r.resp[a].ms - r.resp[b].ms)[0];
    r.gana[rapido] += 3;
  }
  for (const t in r.gana) G.teams[t].bonus += r.gana[t];
  emitir('reveal');
}

// ---- Ronda 2: palabra oculta ----
function siguienteOculta() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return irA('intro3');
  const p = r.list[r.i];
  r.palabra = p.palabra.toUpperCase(); r.pista = p.pista;
  r.visibles = [...r.palabra].map((ch) => ch === ' ');
  r.stage = 'play'; r.revealRem = CONFIG.revelarCadaMs; r.buzz = null;
  r.bloqueado = { A: false, B: false }; r.ganador = null; r.intento = null;
}
function letrasOcultas() { return G.r.visibles.filter((v) => !v).length; }
function pulsarOculta(team) {
  const r = G.r;
  if (G.phase !== 'oculta' || r.stage !== 'play' || r.buzz || r.bloqueado[team]) return;
  r.buzz = { team, rem: CONFIG.segParaResponder * 1000 };
  emitir('buzz');
}
function responderOculta(team, texto) {
  const r = G.r;
  if (G.phase !== 'oculta' || !r.buzz || r.buzz.team !== team) return;
  r.intento = { team, texto };
  if (coincide(texto, [r.palabra])) {
    const seg = Math.max(5, 15 - r.visibles.filter((v, k) => v && r.palabra[k] !== ' ').length);
    G.teams[team].bonus += seg;
    r.ganador = { team, seg };
    r.stage = 'reveal'; r.rem = 4500; r.buzz = null;
    r.visibles = r.visibles.map(() => true);
    emitir('ok');
  } else fallarOculta(team);
}
function fallarOculta(team) {
  const r = G.r;
  r.bloqueado[team] = true; r.buzz = null;
  if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 4000; r.visibles = r.visibles.map(() => true); }
  emitir('fail');
}

// ---- Ronda final: la rueda ----
function iniciarRueda() {
  const sets = ruedasParaPartida();
  const mk = (set, team) => ({
    letras: set.map((l) => ({ ...l, estado: 'pendiente' })),
    idx: 0,
    tiempo: (CONFIG.tiempoBaseRueda + G.teams[team].bonus) * 1000,
  });
  const ordenA = G.teams.A.bonus <= G.teams.B.bonus; // empieza quien tiene menos tiempo
  G.r = { eq: { A: mk(sets[0], 'A'), B: mk(sets[1 % sets.length], 'B') }, turno: ordenA ? 'A' : 'B', stage: 'play', ultimo: null };
}
function siguientePendiente(T, desde) {
  const n = T.letras.length;
  for (let k = 1; k <= n; k++) { const j = (desde + k) % n; if (T.letras[j].estado === 'pendiente') return j; }
  return -1;
}
const puedeJugar = (T) => T.tiempo > 0 && T.letras.some((l) => l.estado === 'pendiente');
function responderRueda(team, texto, paso) {
  const r = G.r;
  if (G.phase !== 'rueda' || r.stage !== 'play' || r.turno !== team) return;
  const T = r.eq[team];
  const L = T.letras[T.idx];
  if (paso) {
    r.ultimo = { team, letra: L.letra, tipo: 'paso', t: Date.now() };
    T.idx = siguientePendiente(T, T.idx);
    r.stage = 'feedback'; r.rem = 1500;
    return emitir('paso');
  }
  const ok = coincide(texto, L.respuestas);
  L.estado = ok ? 'acierto' : 'fallo';
  r.ultimo = { team, letra: L.letra, idx: T.idx, tipo: ok ? 'acierto' : 'fallo', dada: texto, correcta: L.respuestas[0], t: Date.now() };
  T.idx = siguientePendiente(T, T.idx);
  if (!ok) { r.stage = 'feedback'; r.rem = 3500; }
  else if (T.idx === -1) { r.stage = 'feedback'; r.rem = 2500; }
  emitir(ok ? 'ok' : 'fail');
}
function trasFeedback() {
  const r = G.r;
  const otro = r.turno === 'A' ? 'B' : 'A';
  r.stage = 'play';
  if (puedeJugar(r.eq[otro])) r.turno = otro;
  else if (!puedeJugar(r.eq[r.turno])) return terminar();
  emitir('turno');
}
function terminar() {
  const cuenta = (t, e) => G.r.eq[t].letras.filter((l) => l.estado === e).length;
  const res = ['A', 'B'].map((t) => ({ team: t, aciertos: cuenta(t, 'acierto'), fallos: cuenta(t, 'fallo'), tiempo: G.r.eq[t].tiempo }));
  res.sort((a, b) => b.aciertos - a.aciertos || a.fallos - b.fallos || b.tiempo - a.tiempo);
  const empate = res[0].aciertos === res[1].aciertos && res[0].fallos === res[1].fallos;
  G.fin = { res, ganador: empate ? null : res[0].team };
  G.phase = 'fin';
  emitir('fin');
}

// ---------- reloj ----------
let last = Date.now();
setInterval(() => {
  const now = Date.now(), dt = now - last; last = now;
  if (G.paused) return;
  const r = G.r;
  if (INTROS[G.phase]) { G.rem -= dt; if (G.rem <= 0) irA(INTROS[G.phase].next); return; }
  if (G.phase === 'quiz') {
    r.rem -= dt;
    if (r.stage === 'ask') { r.elapsed += dt; if (r.rem <= 0) revelarQuiz(); }
    else if (r.rem <= 0) { siguientePregunta(); emitir(); }
  } else if (G.phase === 'oculta') {
    if (r.stage === 'play') {
      if (r.buzz) { r.buzz.rem -= dt; if (r.buzz.rem <= 0) fallarOculta(r.buzz.team); }
      else {
        r.revealRem -= dt;
        if (r.revealRem <= 0) {
          r.revealRem = CONFIG.revelarCadaMs;
          const ocultas = r.visibles.map((v, k) => (v ? -1 : k)).filter((k) => k >= 0);
          // deja siempre una letra sin revelar hasta el final
          if (ocultas.length > 1) { r.visibles[ocultas[Math.floor(Math.random() * ocultas.length)]] = true; emitir(); }
          else { r.stage = 'reveal'; r.rem = 4000; r.visibles = r.visibles.map(() => true); emitir(); }
        }
      }
    } else { r.rem -= dt; if (r.rem <= 0) { siguienteOculta(); emitir(); } }
  } else if (G.phase === 'rueda') {
    if (r.stage === 'play') {
      const T = r.eq[r.turno];
      T.tiempo -= dt;
      if (T.tiempo <= 0) { T.tiempo = 0; r.ultimo = { team: r.turno, tipo: 'tiempo', t: Date.now() }; r.stage = 'feedback'; r.rem = 2500; emitir('tiempo'); }
    } else if (r.stage === 'feedback') { r.rem -= dt; if (r.rem <= 0) trasFeedback(); }
  }
}, 100);
setInterval(() => { if (!['lobby', 'fin'].includes(G.phase)) emitir(); }, 500);

// ---------- estado público (sin respuestas) ----------
function publico() {
  const s = {
    phase: G.phase, paused: G.paused, rem: G.rem, base: BASE, tema: G.tema, tiempoBase: CONFIG.tiempoBaseRueda,
    teams: G.teams,
    players: Object.values(players),
    intro: INTROS[G.phase] || null,
  };
  const r = G.r;
  if (G.phase === 'quiz') {
    s.quiz = { n: r.i + 1, total: r.list.length, texto: r.q.texto, opciones: r.q.opciones, stage: r.stage, rem: r.rem,
      respondido: { A: !!r.resp.A, B: !!r.resp.B } };
    if (r.stage === 'reveal') Object.assign(s.quiz, { correcta: r.q.correcta, resp: r.resp, gana: r.gana });
  } else if (G.phase === 'oculta') {
    s.oculta = { n: r.i + 1, total: r.list.length, pista: r.pista, stage: r.stage,
      letras: [...r.palabra].map((ch, k) => (ch === ' ' ? ' ' : r.visibles[k] ? ch : '')),
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, intento: r.intento };
  } else if (G.phase === 'rueda') {
    const eq = {};
    for (const t of ['A', 'B']) {
      const T = r.eq[t];
      eq[t] = { tiempo: T.tiempo, idx: T.idx, letras: T.letras.map((l) => ({ letra: l.letra, estado: l.estado })) };
    }
    const T = r.eq[r.turno];
    const L = T.idx >= 0 ? T.letras[T.idx] : null;
    s.rueda = { eq, turno: r.turno, stage: r.stage, ultimo: r.ultimo,
      actual: L && r.stage === 'play' ? { letra: L.letra, tipo: L.tipo, pista: L.pista } : null };
  } else if (G.phase === 'fin') s.fin = G.fin;
  return s;
}
function emitir(evento) { io.emit('state', publico(), evento || null); }

// ---------- conexiones ----------
io.on('connection', (sock) => {
  sock.emit('state', publico(), null);
  sock.on('join', ({ name, team }) => {
    name = String(name || '').trim().slice(0, 16) || 'Jugador';
    team = team === 'B' ? 'B' : 'A';
    players[sock.id] = { name, team };
    sock.emit('me', players[sock.id]);
    emitir('join');
  });
  sock.on('disconnect', () => { if (players[sock.id]) { delete players[sock.id]; emitir(); } });
  const team = () => players[sock.id] && players[sock.id].team;
  sock.on('quiz', (opt) => team() && responderQuiz(team(), Number(opt)));
  sock.on('buzz', () => team() && pulsarOculta(team()));
  sock.on('oculta', (txt) => team() && responderOculta(team(), txt));
  sock.on('rueda', ({ texto, paso }) => team() && responderRueda(team(), texto, !!paso));

  // controles del presentador
  sock.on('host', (cmd, arg) => {
    if (cmd === 'empezar' && G.phase === 'lobby') irA('intro1');
    else if (cmd === 'saltar' && SIGUIENTE[G.phase]) (G.phase === 'rueda' ? terminar() : irA(SIGUIENTE[G.phase]));
    else if (cmd === 'pausa') { G.paused = !G.paused; emitir(); }
    else if (cmd === 'nueva') { nuevaPartida(); emitir(); }
    else if (cmd === 'tema' && G.phase === 'lobby' && ['mixto', 'chile', 'general'].includes(arg)) { G.tema = arg; emitir(); }
    else if (cmd === 'irRueda') irA('intro3');
    else if (cmd === 'nombre' && arg && G.teams[arg.team]) { G.teams[arg.team].name = String(arg.name).slice(0, 20); emitir(); }
    else if (cmd === 'darPorBuena' && G.phase === 'rueda') {
      const u = G.r.ultimo;
      if (u && u.tipo === 'fallo') { G.r.eq[u.team].letras[u.idx].estado = 'acierto'; u.tipo = 'corregida'; emitir('ok'); }
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  LETRAMANÍA lista\n`);
  console.log(`  Tele (envía esta pestaña al Chromecast): ${BASE}/tv`);
  console.log(`  Presentador (en tu ordenador):            ${BASE}/host`);
  console.log(`  Jugadores (o escanean el QR de la tele):  ${BASE}/play\n`);
});
