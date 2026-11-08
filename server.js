// Letramanía — juego de fiesta: la tele muestra la partida, los celulares son los controles.
const express = require('express');
const http = require('http');
const os = require('os');
const dgram = require('dgram');
const path = require('path');
const { Server } = require('socket.io');
const QR = require('qrcode');
const C = require('./contenido');

const PORT = Number(process.env.PORT) || 3000;
const CONFIG = {
  tiempoBaseRueda: 100,    // segundos base de cada equipo en la rueda final
  preguntasRapidas: 6,     // Respuesta rápida: nº de preguntas
  segPregunta: 15,         //   segundos para responder (modo automático)
  verdaderoFalso: 6,       // Verdadero o falso: nº de afirmaciones
  segVF: 10,               //   segundos para responder (modo automático)
  segVFPresentador: 15,    //   segundos para responder (con presentador: incluye la lectura)
  palabrasOcultas: 4,      // Palabra oculta: nº de palabras
  revelarCadaMs: 2200,     //   cada cuánto aparece una letra
  porPrueba: 4,            // Letras revueltas, ¿Quién soy? y Completa el refrán: nº de rondas de cada una
  segPulsador: 30,         //   segundos antes de dar la ronda por perdida si nadie presiona
  quienSoyCadaMs: 10000,   // ¿Quién soy?: cada cuánto sale una pista nueva
  segParaResponder: 12,    // segundos para escribir la respuesta tras presionar «¡La sé!» (modo automático)
};

// --- Dirección IP de la red local ---
// Se ignoran adaptadores virtuales (VirtualBox, VMware, WSL, Hyper-V, VPN…) porque los celulares no pueden llegar a ellos.
const VIRTUAL = /virtualbox|vmware|vethernet|hyper-v|wsl|docker|loopback|tailscale|zerotier|vpn|bluetooth|host-only/i;
function candidatas() {
  const out = [];
  for (const [nombre, list] of Object.entries(os.networkInterfaces()))
    for (const i of list || []) if (i.family === 'IPv4' && !i.internal) out.push({ nombre, ip: i.address });
  return out;
}
const esVirtual = (c) => VIRTUAL.test(c.nombre) || c.ip.startsWith('192.168.56.') || c.ip.startsWith('169.254.');
// Pregunta al sistema qué IP usaría para salir a internet (no envía ningún paquete).
function ipDeRuta() {
  return new Promise((res) => {
    const s = dgram.createSocket('udp4');
    const fin = (ip) => { try { s.close(); } catch (e) {} res(ip); };
    s.on('error', () => fin(null));
    try { s.connect(53, '8.8.8.8', () => { try { fin(s.address().address); } catch (e) { fin(null); } }); } catch (e) { fin(null); }
    setTimeout(() => fin(null), 1500);
  });
}
async function elegirIP() {
  if (process.env.HOST_IP) return process.env.HOST_IP;
  const todas = candidatas();
  const ruta = await ipDeRuta();
  const deRuta = todas.find((c) => c.ip === ruta);
  if (deRuta && !esVirtual(deRuta)) return deRuta.ip;
  const reales = todas.filter((c) => !esVirtual(c));
  const preferida = reales.find((c) => /wi-?fi|wlan|wireless|inal|ethernet|^eth|^en\d/i.test(c.nombre));
  return (preferida || reales[0] || todas[0] || { ip: 'localhost' }).ip;
}
let IP = 'localhost';
let BASE = `http://${IP}:${PORT}`;

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
// Acepta la respuesta exacta (sin tildes/mayúsculas) o con alguna errata si es larga.
function coincide(dada, respuestas) {
  const x = norm(dada);
  if (!x) return false;
  return respuestas.some((r) => {
    const y = norm(r);
    if (x === y) return true;
    const margen = y.length >= 14 ? Math.floor(y.length / 5) : y.length >= 6 ? 1 : 0; // frases (refranes): más margen
    return lev(x, y) <= margen;
  });
}
// Desordena una palabra asegurando que no quede igual
function revolver(palabra) {
  const letras = [...palabra.toUpperCase().replace(/\s/g, '')];
  for (let k = 0; k < 20; k++) { const r = shuffle(letras).join(''); if (r !== letras.join('')) return r; }
  return letras.reverse().join('');
}

// ---------- catálogo de pruebas ----------
// Cada prueba: título, reglas (modo automático / con presentador) y de dónde sale su contenido.
const PRUEBAS = {
  quiz: {
    titulo: 'Respuesta rápida',
    auto: 'Respondan en el celular. Acertar suma 5 segundos y el equipo más rápido gana 3 más.',
    presentador: 'Escuchen la pregunta. El primer equipo en presionar responde en voz alta. Acertar suma 8 segundos; si fallan, puede responder el otro equipo.',
  },
  vf: {
    titulo: 'Verdadero o falso',
    auto: 'Lean la afirmación y presionen Verdadero o Falso en el celular. Cada acierto suma 3 segundos.',
    presentador: 'Escuchen la afirmación y presionen Verdadero o Falso en el celular. Cada acierto suma 3 segundos.',
  },
  anagrama: {
    titulo: 'Letras revueltas',
    auto: 'Ordenen las letras para formar la palabra. Presionen «¡La sé!» y escríbanla. Acertar suma 8 segundos.',
    presentador: 'Ordenen las letras de la tele para formar la palabra. Presionen «¡La sé!» y díganla en voz alta. Acertar suma 8 segundos.',
  },
  oculta: {
    titulo: 'Palabra oculta',
    auto: 'Las letras van apareciendo. Presionen «¡La sé!» y escriban la palabra. Cuanto antes, más segundos.',
    presentador: 'Las letras van apareciendo y el presentador da la pista. Presionen «¡La sé!» y digan la palabra en voz alta. Cuanto antes, más segundos.',
  },
  quiensoy: {
    titulo: '¿Quién soy?',
    auto: 'Van saliendo pistas, cada vez más fáciles. Acertar con 1 pista suma 12 segundos; con 2, 8; con 3, 5.',
    presentador: 'El presentador lee pistas cada vez más fáciles. Acertar con 1 pista suma 12 segundos; con 2, 8; con 3, 5.',
  },
  refran: {
    titulo: 'Completa el refrán',
    auto: 'Lean el comienzo del refrán, presionen «¡La sé!» y escriban cómo termina. Acertar suma 8 segundos.',
    presentador: 'El presentador dice el comienzo del refrán. Presionen «¡La sé!» y digan cómo termina. Acertar suma 8 segundos.',
  },
  rueda: {
    titulo: 'La Rueda Final',
    auto: 'Una palabra por cada letra. Si fallas o dices «Paso», le toca al otro equipo. ¡Gana quien más acierte!',
    presentador: 'El presentador lee una definición por cada letra. Respondan en voz alta o digan «Paso». Si fallas o pasas, le toca al otro equipo. ¡Gana quien más acierte!',
  },
};
const ORDEN = ['quiz', 'vf', 'anagrama', 'oculta', 'quiensoy', 'refran']; // la rueda va siempre al final
const PULSADOR = ['anagrama', 'quiensoy', 'refran']; // pruebas de «presiona y responde»

// ---------- estado ----------
const players = {}; // socket.id -> { name, team }
let G;
function nuevaPartida() {
  G = {
    phase: 'lobby', paused: false, rem: 0,
    teams: { A: { name: 'Equipo Violeta', bonus: 0 }, B: { name: 'Equipo Ámbar', bonus: 0 } },
    r: null,
    tema: G ? G.tema : 'mixto',
    modo: G ? G.modo : 'presentador', // 'presentador' (se responde en voz alta) o 'auto' (se escribe en el celular)
    rondas: G ? G.rondas : [...ORDEN], // pruebas elegidas por el presentador
    secuencia: [], paso: -1, introDe: null,
  };
}
nuevaPartida();
const conPresentador = () => G.modo === 'presentador';

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
const tomar = (general, chile, n) => shuffle(pool(general, chile)).slice(0, n);

// ---------- secuencia de la partida ----------
function empezar() {
  G.secuencia = [...ORDEN.filter((k) => G.rondas.includes(k)), 'rueda'];
  G.paso = -1;
  avanzar();
}
// Pasa a la intro de la siguiente prueba
function avanzar() {
  G.paso++;
  if (G.paso >= G.secuencia.length) return terminar();
  G.phase = 'intro'; G.introDe = G.secuencia[G.paso]; G.rem = 7000; G.r = null;
  emitir();
}
function iniciarPrueba(k) {
  G.phase = k;
  const n = CONFIG.porPrueba;
  if (k === 'quiz') { G.r = { list: tomar(C.preguntasRapidas, C.preguntasChile, CONFIG.preguntasRapidas), i: -1 }; siguientePregunta(); }
  else if (k === 'vf') { G.r = { list: tomar(C.verdaderoFalso, C.verdaderoFalsoChile, CONFIG.verdaderoFalso), i: -1 }; siguienteVF(); }
  else if (k === 'oculta') { G.r = { list: tomar(C.palabrasOcultas, C.palabrasOcultasChile, CONFIG.palabrasOcultas), i: -1 }; siguienteOculta(); }
  else if (k === 'anagrama') { G.r = { kind: k, list: tomar(C.letrasRevueltas, C.letrasRevueltasChile, n), i: -1 }; siguientePulsador(); }
  else if (k === 'quiensoy') { G.r = { kind: k, list: tomar(C.quienSoy, C.quienSoyChile, n), i: -1 }; siguientePulsador(); }
  else if (k === 'refran') { G.r = { kind: k, list: tomar(C.refranes, C.refranesChile, n), i: -1 }; siguientePulsador(); }
  else if (k === 'rueda') iniciarRueda();
  emitir();
}

// ---- Respuesta rápida ----
function siguientePregunta() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  const q = r.list[r.i];
  const opts = shuffle(q.opciones.map((t, k) => ({ t, ok: k === 0 }))); // la primera opción es la correcta
  r.q = { texto: q.pregunta, opciones: opts.map((o) => o.t), correcta: opts.findIndex((o) => o.ok) };
  r.stage = 'ask'; r.rem = CONFIG.segPregunta * 1000; r.elapsed = 0;
  r.resp = { A: null, B: null };
  r.buzz = null; r.bloqueado = { A: false, B: false }; r.gana = {};
}
function pulsarQuiz(team) {
  const r = G.r;
  if (!conPresentador() || r.stage !== 'ask' || r.buzz || r.bloqueado[team]) return;
  r.buzz = { team };
  emitir('buzz');
}
function responderQuiz(team, opt) {
  const r = G.r;
  if (G.phase !== 'quiz' || conPresentador() || r.stage !== 'ask' || r.resp[team]) return;
  r.resp[team] = { opt, ms: r.elapsed, ok: opt === r.q.correcta };
  if (r.resp.A && r.resp.B) revelarQuiz(); else emitir();
}
function revelarQuiz() {
  const r = G.r;
  r.stage = 'reveal'; r.rem = 4500; r.gana = {};
  const ok = ['A', 'B'].filter((t) => r.resp[t] && r.resp[t].ok);
  ok.forEach((t) => { r.gana[t] = 5; });
  if (ok.length) r.gana[ok.sort((a, b) => r.resp[a].ms - r.resp[b].ms)[0]] += 3;
  for (const t in r.gana) G.teams[t].bonus += r.gana[t];
  emitir('reveal');
}

// ---- Verdadero o falso ----
function siguienteVF() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  r.stage = 'ask'; r.rem = (conPresentador() ? CONFIG.segVFPresentador : CONFIG.segVF) * 1000;
  r.resp = { A: null, B: null }; r.gana = {};
}
function responderVF(team, valor) {
  const r = G.r;
  if (G.phase !== 'vf' || r.stage !== 'ask' || r.resp[team] !== null) return;
  r.resp[team] = !!valor;
  if (r.resp.A !== null && r.resp.B !== null) revelarVF(); else emitir();
}
function revelarVF() {
  const r = G.r;
  r.stage = 'reveal'; r.rem = 4000; r.gana = {};
  for (const t of ['A', 'B']) if (r.resp[t] === r.item.v) { r.gana[t] = 3; G.teams[t].bonus += 3; }
  emitir(Object.keys(r.gana).length ? 'ok' : 'fail');
}

// ---- Palabra oculta ----
function siguienteOculta() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  const p = r.list[r.i];
  r.palabra = p.palabra.toUpperCase(); r.pista = p.pista;
  r.visibles = [...r.palabra].map((ch) => ch === ' ');
  r.stage = 'play'; r.revealRem = CONFIG.revelarCadaMs; r.buzz = null;
  r.bloqueado = { A: false, B: false }; r.ganador = null; r.intento = null;
}
function pulsarOculta(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team]) return;
  r.buzz = { team, rem: CONFIG.segParaResponder * 1000 };
  emitir('buzz');
}
function responderOculta(team, texto) {
  const r = G.r;
  if (conPresentador() || !r.buzz || r.buzz.team !== team) return;
  r.intento = { team, texto };
  if (coincide(texto, [r.palabra])) acertarOculta(team); else fallarOculta(team);
}
function acertarOculta(team) {
  const r = G.r;
  const seg = Math.max(5, 15 - r.visibles.filter((v, k) => v && r.palabra[k] !== ' ').length);
  G.teams[team].bonus += seg;
  r.ganador = { team, seg };
  r.stage = 'reveal'; r.rem = 4500; r.buzz = null;
  r.visibles = r.visibles.map(() => true);
  emitir('ok');
}
function fallarOculta(team) {
  const r = G.r;
  r.bloqueado[team] = true; r.buzz = null;
  if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 4000; r.visibles = r.visibles.map(() => true); }
  emitir('fail');
}

// ---- Pruebas de pulsador: letras revueltas, ¿quién soy?, completa el refrán ----
function respuestasDe(r) {
  if (r.kind === 'anagrama') return [r.item.palabra];
  if (r.kind === 'quiensoy') return r.item.respuestas;
  return r.item.finales;
}
function textoRespuesta(r) {
  if (r.kind === 'anagrama') return r.item.palabra.toUpperCase();
  if (r.kind === 'quiensoy') return r.item.respuestas[0];
  return r.item.inicio.replace(/…$/, '') + ' ' + r.item.finales[0];
}
function siguientePulsador() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  r.stage = 'play'; r.buzz = null; r.bloqueado = { A: false, B: false }; r.ganador = null; r.intento = null;
  r.pistas = 1;
  r.rem = r.kind === 'quiensoy' ? CONFIG.quienSoyCadaMs : CONFIG.segPulsador * 1000; // tiempo hasta la siguiente pista o hasta rendirse
  if (r.kind === 'anagrama') r.revuelta = revolver(r.item.palabra);
}
function pulsarP(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team]) return;
  r.buzz = { team, rem: CONFIG.segParaResponder * 1000 };
  emitir('buzz');
}
function responderP(team, texto) {
  const r = G.r;
  if (conPresentador() || !r.buzz || r.buzz.team !== team) return;
  r.intento = { team, texto };
  if (coincide(texto, respuestasDe(r))) acertarP(team); else fallarP(team);
}
function acertarP(team) {
  const r = G.r;
  const seg = r.kind === 'quiensoy' ? [12, 8, 5][r.pistas - 1] : 8;
  G.teams[team].bonus += seg;
  r.ganador = { team, seg }; r.buzz = null;
  r.stage = 'reveal'; r.rem = 5000;
  emitir('ok');
}
function fallarP(team) {
  const r = G.r;
  r.bloqueado[team] = true; r.buzz = null;
  if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 5000; }
  emitir('fail');
}
function rendirP() { const r = G.r; r.buzz = null; r.stage = 'reveal'; r.rem = 5000; emitir('reveal'); }

// ---- Rueda final ----
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
function responderRueda(team, texto, paso, forzado) {
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
  const ok = forzado !== undefined ? forzado : coincide(texto, L.respuestas);
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
  const r = G.phase === 'rueda' ? G.r : null;
  const cuenta = (t, e) => (r ? r.eq[t].letras.filter((l) => l.estado === e).length : 0);
  const res = ['A', 'B'].map((t) => ({ team: t, aciertos: cuenta(t, 'acierto'), fallos: cuenta(t, 'fallo'), tiempo: r ? r.eq[t].tiempo : 0 }));
  res.sort((a, b) => b.aciertos - a.aciertos || a.fallos - b.fallos || b.tiempo - a.tiempo);
  const empate = res[0].aciertos === res[1].aciertos && res[0].fallos === res[1].fallos;
  G.fin = { res, ganador: empate ? null : res[0].team };
  G.phase = 'fin';
  emitir('fin');
}

// ---- Decisión del presentador: 'ok', 'ko', 'paso' (rueda) o 'nadie' (nadie la sabe) ----
function juzgar(res) {
  const r = G.r;
  if (!r || !conPresentador() || G.paused) return;
  if (G.phase === 'quiz' && r.stage === 'ask') {
    if (res === 'nadie') { r.buzz = null; r.stage = 'reveal'; r.rem = 5000; return emitir('reveal'); }
    if (!r.buzz) return;
    const t = r.buzz.team;
    r.buzz = null;
    if (res === 'ok') { r.gana = { [t]: 8 }; G.teams[t].bonus += 8; r.stage = 'reveal'; r.rem = 5000; return emitir('ok'); }
    if (res === 'ko') { r.bloqueado[t] = true; if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 5000; } return emitir('fail'); }
  } else if (G.phase === 'vf' && r.stage === 'ask') {
    if (res === 'nadie') return revelarVF();
  } else if (G.phase === 'oculta' && r.stage === 'play') {
    if (res === 'nadie') { r.buzz = null; r.stage = 'reveal'; r.rem = 4000; r.visibles = r.visibles.map(() => true); return emitir('reveal'); }
    if (!r.buzz) return;
    if (res === 'ok') return acertarOculta(r.buzz.team);
    if (res === 'ko') return fallarOculta(r.buzz.team);
  } else if (PULSADOR.includes(G.phase) && r.stage === 'play') {
    if (res === 'nadie') return rendirP();
    if (res === 'pista' && r.kind === 'quiensoy' && !r.buzz && r.pistas < 3) { r.pistas++; r.rem = CONFIG.quienSoyCadaMs; return emitir('reveal'); }
    if (!r.buzz) return;
    if (res === 'ok') return acertarP(r.buzz.team);
    if (res === 'ko') return fallarP(r.buzz.team);
  } else if (G.phase === 'rueda' && r.stage === 'play') {
    if (res === 'paso') return responderRueda(r.turno, '', true);
    if (res === 'ok' || res === 'ko') return responderRueda(r.turno, '', false, res === 'ok');
  }
}

// ---------- reloj ----------
let last = Date.now();
setInterval(() => {
  const now = Date.now(), dt = now - last; last = now;
  if (G.paused) return;
  const r = G.r;
  if (G.phase === 'intro') { G.rem -= dt; if (G.rem <= 0) iniciarPrueba(G.introDe); return; }
  if (G.phase === 'quiz') {
    if (r.stage === 'ask') {
      // con presentador no hay cuenta atrás: él decide cuándo pasar a la siguiente
      if (!conPresentador()) { r.rem -= dt; r.elapsed += dt; if (r.rem <= 0) revelarQuiz(); }
    } else { r.rem -= dt; if (r.rem <= 0) { siguientePregunta(); emitir(); } }
  } else if (G.phase === 'vf') {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') revelarVF(); else { siguienteVF(); emitir(); } }
  } else if (G.phase === 'oculta') {
    if (r.stage === 'play') {
      if (r.buzz) { if (!conPresentador()) { r.buzz.rem -= dt; if (r.buzz.rem <= 0) fallarOculta(r.buzz.team); } }
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
  } else if (PULSADOR.includes(G.phase)) {
    if (r.stage === 'play') {
      if (r.buzz) { if (!conPresentador()) { r.buzz.rem -= dt; if (r.buzz.rem <= 0) fallarP(r.buzz.team); } }
      else {
        r.rem -= dt;
        if (r.rem <= 0) {
          if (r.kind === 'quiensoy' && r.pistas < 3) { r.pistas++; r.rem = CONFIG.quienSoyCadaMs; emitir('reveal'); }
          else rendirP();
        }
      }
    } else { r.rem -= dt; if (r.rem <= 0) { siguientePulsador(); emitir(); } }
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
    phase: G.phase, paused: G.paused, rem: G.rem, base: BASE, tema: G.tema, modo: G.modo, tiempoBase: CONFIG.tiempoBaseRueda,
    rondas: G.rondas, catalogo: ORDEN.map((k) => ({ id: k, titulo: PRUEBAS[k].titulo })),
    teams: G.teams,
    players: Object.values(players),
    intro: null,
  };
  if (G.phase === 'intro') {
    const k = G.introDe, P = PRUEBAS[k];
    s.intro = { prueba: k, titulo: k === 'rueda' ? P.titulo : `Prueba ${G.paso + 1} de ${G.secuencia.length - 1} · ${P.titulo}`, texto: conPresentador() ? P.presentador : P.auto };
  }
  const oculto = false; // las preguntas y pistas se ven en la tele en ambos modos (las respuestas, nunca hasta el final)
  const r = G.r;
  if (G.phase === 'quiz') {
    const ver = !oculto || r.stage === 'reveal';
    s.quiz = { n: r.i + 1, total: r.list.length, texto: ver ? r.q.texto : null, opciones: ver ? r.q.opciones : null, stage: r.stage, rem: r.rem,
      respondido: { A: !!r.resp.A, B: !!r.resp.B }, buzz: r.buzz, bloqueado: r.bloqueado };
    if (r.stage === 'reveal') Object.assign(s.quiz, { correcta: r.q.correcta, resp: r.resp, gana: r.gana });
  } else if (G.phase === 'vf') {
    const rev = r.stage === 'reveal';
    s.vf = { n: r.i + 1, total: r.list.length, stage: r.stage, rem: r.rem, total_ms: (conPresentador() ? CONFIG.segVFPresentador : CONFIG.segVF) * 1000,
      texto: !oculto || rev ? r.item.texto : null, respondido: { A: r.resp.A !== null, B: r.resp.B !== null },
      verdadero: rev ? r.item.v : null, resp: rev ? r.resp : null, gana: rev ? r.gana : null };
  } else if (G.phase === 'oculta') {
    s.oculta = { n: r.i + 1, total: r.list.length, pista: !oculto || r.stage === 'reveal' ? r.pista : null, stage: r.stage,
      letras: [...r.palabra].map((ch, k) => (ch === ' ' ? ' ' : r.visibles[k] ? ch : '')),
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, intento: r.intento };
  } else if (PULSADOR.includes(G.phase)) {
    const rev = r.stage === 'reveal', ver = !oculto || rev, it = r.item;
    s.p = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage,
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, intento: r.intento, numPistas: r.pistas,
      respuesta: rev ? textoRespuesta(r) : null };
    if (r.kind === 'anagrama') Object.assign(s.p, { revuelta: r.revuelta, pista: ver ? it.pista : null });
    if (r.kind === 'quiensoy') s.p.pistas = ver ? it.pistas.slice(0, rev ? 3 : r.pistas) : null;
    if (r.kind === 'refran') s.p.inicio = ver ? it.inicio : null;
  } else if (G.phase === 'rueda') {
    const eq = {};
    for (const t of ['A', 'B']) {
      const T = r.eq[t];
      eq[t] = { tiempo: T.tiempo, idx: T.idx, letras: T.letras.map((l) => ({ letra: l.letra, estado: l.estado })) };
    }
    const T = r.eq[r.turno];
    const L = T.idx >= 0 ? T.letras[T.idx] : null;
    s.rueda = { eq, turno: r.turno, stage: r.stage, ultimo: r.ultimo,
      actual: L && r.stage === 'play' ? { letra: L.letra, tipo: L.tipo, pista: oculto ? null : L.pista } : null };
  } else if (G.phase === 'fin') s.fin = G.fin;
  return s;
}
// Lo que solo ve el presentador: la pista completa y la respuesta
function secreto() {
  const r = G.r;
  if (!r) return null;
  if (G.phase === 'quiz') return { tipo: 'quiz', n: r.i + 1, total: r.list.length, texto: r.q.texto, opciones: r.q.opciones, correcta: r.q.correcta, buzz: r.buzz, bloqueado: r.bloqueado, stage: r.stage };
  if (G.phase === 'vf') return { tipo: 'vf', n: r.i + 1, total: r.list.length, texto: r.item.texto, v: r.item.v, stage: r.stage, rem: r.rem, respondido: { A: r.resp.A !== null, B: r.resp.B !== null } };
  if (G.phase === 'oculta') return { tipo: 'oculta', n: r.i + 1, total: r.list.length, pista: r.pista, palabra: r.palabra, buzz: r.buzz, bloqueado: r.bloqueado, stage: r.stage };
  if (PULSADOR.includes(G.phase)) return { tipo: 'p', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage, buzz: r.buzz, bloqueado: r.bloqueado,
    item: r.item, revuelta: r.revuelta, numPistas: r.pistas, respuesta: textoRespuesta(r) };
  if (G.phase === 'rueda') {
    const T = r.eq[r.turno], L = T.idx >= 0 ? T.letras[T.idx] : null;
    return { tipo: 'rueda', turno: r.turno, stage: r.stage, tiempo: T.tiempo, letra: L && L.letra, tipoLetra: L && L.tipo, pista: L && L.pista, respuestas: L && L.respuestas, ultimo: r.ultimo };
  }
  return null;
}
function emitir(evento) {
  io.emit('state', publico(), evento || null);
  io.to('hosts').emit('secreto', secreto());
}

// ---------- conexiones ----------
io.on('connection', (sock) => {
  sock.emit('state', publico(), null);
  sock.on('join', ({ name, team } = {}) => {
    name = String(name || '').trim().slice(0, 16) || 'Jugador';
    team = team === 'B' ? 'B' : 'A';
    players[sock.id] = { name, team };
    sock.emit('me', players[sock.id]);
    emitir('join');
  });
  sock.on('disconnect', () => { if (players[sock.id]) { delete players[sock.id]; emitir(); } });
  const team = () => players[sock.id] && players[sock.id].team;
  sock.on('quiz', (opt) => team() && responderQuiz(team(), Number(opt)));
  sock.on('vf', (v) => team() && responderVF(team(), v));
  sock.on('buzz', () => {
    const t = team();
    if (!t || !G.r) return;
    if (G.phase === 'quiz') pulsarQuiz(t);
    else if (G.phase === 'oculta') pulsarOculta(t);
    else if (PULSADOR.includes(G.phase)) pulsarP(t);
  });
  // respuesta escrita (modo automático) en palabra oculta y pruebas de pulsador
  sock.on('oculta', (txt) => {
    const t = team();
    if (!t || !G.r) return;
    if (G.phase === 'oculta') responderOculta(t, txt);
    else if (PULSADOR.includes(G.phase)) responderP(t, txt);
  });
  sock.on('rueda', ({ texto, paso } = {}) => team() && (paso || !conPresentador()) && responderRueda(team(), texto, !!paso));
  sock.on('soyHost', () => { sock.join('hosts'); sock.emit('secreto', secreto()); });

  // controles del presentador
  sock.on('host', (cmd, arg) => {
    const enJuego = !['lobby', 'fin'].includes(G.phase);
    if (cmd === 'empezar' && G.phase === 'lobby') empezar();
    else if (cmd === 'saltar' && enJuego) {
      if (G.phase === 'intro') iniciarPrueba(G.introDe);
      else if (G.phase === 'rueda') terminar();
      else avanzar();
    }
    else if (cmd === 'pausa') { G.paused = !G.paused; emitir(); }
    else if (cmd === 'nueva') { nuevaPartida(); emitir(); }
    else if (cmd === 'tema' && G.phase === 'lobby' && ['mixto', 'chile', 'general'].includes(arg)) { G.tema = arg; emitir(); }
    else if (cmd === 'modo' && G.phase === 'lobby' && ['presentador', 'auto'].includes(arg)) { G.modo = arg; emitir(); }
    else if (cmd === 'ronda' && G.phase === 'lobby' && ORDEN.includes(arg)) {
      G.rondas = G.rondas.includes(arg) ? G.rondas.filter((k) => k !== arg) : [...G.rondas, arg];
      emitir();
    }
    else if (cmd === 'juzgar') juzgar(arg);
    else if (cmd === 'irRueda' && G.phase !== 'fin') {
      if (G.phase === 'lobby') G.secuencia = [...ORDEN.filter((k) => G.rondas.includes(k)), 'rueda'];
      G.paso = G.secuencia.length - 2; avanzar();
    }
    else if (cmd === 'nombre' && arg && G.teams[arg.team]) { G.teams[arg.team].name = String(arg.name).slice(0, 20); emitir(); }
    else if (cmd === 'darPorBuena' && G.phase === 'rueda') {
      const u = G.r.ultimo;
      if (u && u.tipo === 'fallo') { G.r.eq[u.team].letras[u.idx].estado = 'acierto'; u.tipo = 'corregida'; emitir('ok'); }
    }
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') console.error(`\n  El puerto ${PORT} ya está en uso: probablemente el juego ya está abierto en otra ventana.\n  Ciérrala (o presiona Ctrl + C en ella) y vuelve a ejecutar npm start.\n`);
  else console.error('\n  Error al arrancar el servidor:', e.message, '\n');
  process.exit(1);
});

elegirIP().then((ip) => {
  IP = ip;
  BASE = `http://${IP}:${PORT}`;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  LETRAMANÍA lista\n`);
    console.log(`  Tele (envía esta pestaña al Chromecast): ${BASE}/tv`);
    console.log(`  Presentador (en tu computador):           ${BASE}/host`);
    console.log(`  Jugadores (o escanean el QR de la tele):  ${BASE}/play\n`);
    const otras = candidatas().filter((c) => c.ip !== IP);
    if (otras.length) console.log(`  (Otras redes del equipo: ${otras.map((c) => `${c.ip} [${c.nombre}]`).join(', ')})\n`);
    console.log('  Deja esta ventana ABIERTA mientras juegan. Para cerrar el juego presiona Ctrl + C.\n');
  });
});
