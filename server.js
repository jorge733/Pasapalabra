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
  segPreguntaPresentador: 25, //   segundos por pregunta con presentador (se detiene mientras un equipo responde)
  verdaderoFalso: 6,       // Verdadero o falso: nº de afirmaciones
  segVF: 10,               //   segundos para responder (modo automático)
  segVFPresentador: 15,    //   segundos para responder (con presentador: incluye la lectura)
  palabrasOcultas: 4,      // Palabra oculta: nº de palabras
  revelarCadaMs: 2200,     //   cada cuánto aparece una letra
  porPrueba: 4,            // Letras revueltas, Siglas, ¿Quién soy?, Adivinanzas y Completa el refrán: nº de rondas de cada una
  queFueAntes: 5,          // ¿Qué fue antes?: nº de preguntas
  cifras: 4,               // Adivina la cifra: nº de preguntas
  segCifra: 25,            //   segundos para escribir el número
  segPulsador: 30,         //   segundos antes de dar la ronda por perdida si nadie presiona
  quienSoyCadaMs: 10000,   // ¿Quién soy?: cada cuánto sale una pista nueva
  segRebote: 5,            // si un equipo falla, el otro tiene al menos estos segundos para presionar «¡Lo sé!»
  segPensar: 3,            // segundos al empezar cada pregunta en que el botón «¡Lo sé!» está bloqueado (para pensar)
  segParaResponder: 12,    // segundos para escribir la respuesta tras presionar «¡Lo sé!» (modo automático)
};
// Modo Kids (7 a 12 años): más tiempo para leer, pensar y escribir.
const CONFIG_KIDS = {
  ...CONFIG,
  tiempoBaseRueda: 130,
  segPregunta: 22,
  segPreguntaPresentador: 30,
  segVF: 15,
  segVFPresentador: 20,
  revelarCadaMs: 2800,
  segCifra: 35,
  segPulsador: 40,
  quienSoyCadaMs: 13000,
  segRebote: 7,
  segParaResponder: 20,
};
const cfg = () => (G && G.dificultad === 'kids' ? CONFIG_KIDS : CONFIG);

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
// En internet (Render u otro servicio) se usa la dirección pública para el QR y los enlaces.
const URL_PUBLICA = (process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || '').replace(/\/+$/, '');
// Clave del panel del presentador (recomendada en internet). Si no se define, el panel queda abierto (uso en casa).
const CLAVE = String(process.env.CLAVE_PRESENTADOR || '').trim();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const pub = (f) => path.join(__dirname, 'public', f);
app.get('/', (_, res) => res.sendFile(pub('index.html')));
app.get('/favicon.ico', (_, res) => res.type('image/png').sendFile(pub('favicon-32.png'))); // navegadores que piden /favicon.ico
app.get('/tv', (_, res) => res.sendFile(pub('tv.html')));
app.get('/play', (_, res) => res.sendFile(pub('play.html')));
app.get('/host', (_, res) => res.sendFile(pub('host.html')));
app.get('/info', (_, res) => res.json({ base: BASE, play: BASE + '/play' }));
app.get('/qr.svg', async (_, res) => {
  res.type('image/svg+xml').send(await QR.toString(BASE + '/play', { type: 'svg', margin: 1 }));
});
app.use('/vendor', express.static(path.join(__dirname, 'node_modules', 'idiomorph', 'dist')));
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
    auto: 'Ordenen las letras para formar la palabra. Presionen «¡Lo sé!» y escríbanla. Acertar suma 8 segundos.',
    presentador: 'Ordenen las letras de la tele para formar la palabra. Presionen «¡Lo sé!» y díganla en voz alta. Acertar suma 8 segundos.',
  },
  oculta: {
    titulo: 'Palabra oculta',
    auto: 'Las letras van apareciendo. Presionen «¡Lo sé!» y escriban la palabra. Cuanto antes, más segundos.',
    presentador: 'Las letras van apareciendo y el presentador da la pista. Presionen «¡Lo sé!» y digan la palabra en voz alta. Cuanto antes, más segundos.',
  },
  quiensoy: {
    titulo: '¿Quién soy?',
    auto: 'Van saliendo pistas, cada vez más fáciles. Acertar con 1 pista suma 12 segundos; con 2, 8; con 3, 5.',
    presentador: 'El presentador lee pistas cada vez más fáciles. Acertar con 1 pista suma 12 segundos; con 2, 8; con 3, 5.',
  },
  refran: {
    titulo: 'Completa el refrán',
    auto: 'Lean el comienzo del refrán, presionen «¡Lo sé!» y escriban cómo termina. Acertar suma 8 segundos.',
    presentador: 'El presentador dice el comienzo del refrán. Presionen «¡Lo sé!» y digan cómo termina. Acertar suma 8 segundos.',
  },
  antes: {
    titulo: '¿Qué fue antes?',
    auto: 'Elijan en el celular cuál de los dos hechos ocurrió primero. Cada acierto suma 3 segundos.',
    presentador: 'Escuchen los dos hechos y elijan en el celular cuál ocurrió primero. Cada acierto suma 3 segundos.',
  },
  cifra: {
    titulo: 'Adivina la cifra',
    auto: 'Escriban un número en el celular. El equipo que más se acerque gana 8 segundos; si lo aciertan exacto, 12.',
    presentador: 'Escuchen la pregunta y escriban un número en el celular. El equipo que más se acerque gana 8 segundos; si lo aciertan exacto, 12.',
  },
  adivinanza: {
    titulo: 'Adivinanzas',
    auto: 'Lean la adivinanza, presionen «¡Lo sé!» y escriban la respuesta. Acertar suma 8 segundos.',
    presentador: 'El presentador lee la adivinanza. Presionen «¡Lo sé!» y digan la respuesta en voz alta. Acertar suma 8 segundos.',
  },
  siglas: {
    titulo: 'Siglas',
    auto: '¿Qué significan estas siglas? Presionen «¡Lo sé!» y escriban el significado completo. Acertar suma 8 segundos.',
    presentador: '¿Qué significan estas siglas? Presionen «¡Lo sé!» y digan el significado completo en voz alta. Acertar suma 8 segundos.',
  },
  rueda: {
    titulo: 'La Rueda Final',
    auto: 'Una palabra por cada letra. Si fallas o dices «Paso», le toca al otro equipo. ¡Gana quien más acierte!',
    presentador: 'El presentador lee una definición por cada letra. Respondan en voz alta o digan «Paso». Si fallas o pasas, le toca al otro equipo. ¡Gana quien más acierte!',
  },
};
const ORDEN = ['quiz', 'vf', 'antes', 'anagrama', 'siglas', 'oculta', 'cifra', 'quiensoy', 'adivinanza', 'refran']; // la rueda va siempre al final
const PULSADOR = ['anagrama', 'quiensoy', 'refran', 'adivinanza', 'siglas']; // pruebas de «presiona y responde»
const ELECCION = ['vf', 'antes']; // pruebas en que ambos equipos eligen una opción en el celular

// ---------- estado ----------
const players = {}; // socket.id -> { name, team }
let G;
function nuevaPartida() {
  G = {
    phase: 'lobby', paused: false, rem: 0,
    teams: { A: { name: 'Equipo Violeta', bonus: 0 }, B: { name: 'Equipo Ámbar', bonus: 0 } },
    r: null,
    tema: G ? G.tema : 'mixto',
    dificultad: G ? G.dificultad : 'dificil', // 'kids', 'normal' o 'dificil'
    musicaFondo: G ? G.musicaFondo : true,   // música de fondo en la sala de espera y en la rueda
    modo: G ? G.modo : 'presentador', // 'presentador' (se responde en voz alta) o 'auto' (se escribe en el celular)
    rondas: G ? G.rondas : [...ORDEN], // pruebas elegidas por el presentador
    secuencia: [], paso: -1, introDe: null,
  };
}
nuevaPartida();
const conPresentador = () => G.modo === 'presentador';

// Elige el contenido según el tema: 'general', 'chile' o 'mixto'
function pool(general, chile) {
  general = general || []; chile = chile || [];
  if (G.tema === 'chile') return chile.length ? chile : general; // pruebas sin versión chilena usan la general
  if (G.tema === 'general') return general.length ? general : chile;
  return [...general, ...chile];
}
// En «mixto» se sortea si la rueda es general o chilena; los dos equipos reciben ruedas del mismo tipo para que sea justo.
// ---------- variedad: recuerda lo ya jugado para no repetirlo ----------
// Se guarda en historial.json (junto a server.js), así que se recuerda aunque se cierre el juego.
const fs = require('fs');
const HIST_FILE = path.join(__dirname, 'historial.json');
let HIST = {};
try { HIST = JSON.parse(fs.readFileSync(HIST_FILE, 'utf8')); } catch (e) { HIST = {}; }
function guardarHistorial() { try { fs.writeFileSync(HIST_FILE, JSON.stringify(HIST)); } catch (e) {} }
const idDe = (x) => JSON.stringify(x);
// Elige n elementos de los candidatos que no hayan salido todavía; cuando se agotan, vuelve a empezar.
function elegirSinRepetir(categoria, candidatos, n) {
  const usados = new Set(HIST[categoria] || []);
  let libres = shuffle(candidatos.filter((x) => !usados.has(idDe(x))));
  if (libres.length < n) {
    // se acabaron los nuevos: usa los que quedan y completa con el resto (y reinicia la memoria)
    const resto = shuffle(candidatos.filter((x) => usados.has(idDe(x))));
    libres = [...libres, ...resto];
    HIST[categoria] = [];
  }
  const elegidos = libres.slice(0, n);
  HIST[categoria] = [...(HIST[categoria] || []), ...elegidos.map(idDe)];
  guardarHistorial();
  return elegidos;
}

const SUFIJO = { dificil: 'Dificil', kids: 'Kids' }; // contenido propio de cada dificultad (p. ej. preguntasRapidasKids)

// La rueda se arma letra a letra con todas las definiciones disponibles para esa letra,
// dando una distinta a cada equipo y evitando las que ya salieron en partidas anteriores.
function ruedasParaPartida() {
  const suf = SUFIJO[G.dificultad];
  const dificiles = suf ? pool(C['ruedas' + suf] || [], C['ruedasChile' + suf] || []) : [];
  const normales = pool(C.ruedas, C.ruedasChile);
  const A = [], B = [];
  C.ruedas[0].forEach((base, j) => {
    const deLaLetra = (ruedas) => ruedas.map((r) => r[j]).filter(Boolean);
    let cand = deLaLetra(dificiles);
    if (cand.length < 2) cand = [...cand, ...deLaLetra(normales)];
    const [x, y] = elegirSinRepetir(`rueda|${base.letra}|${G.dificultad}|${G.tema}`, cand, 2);
    if (Math.random() < 0.5) { A.push(x); B.push(y || x); } else { A.push(y || x); B.push(x); }
  });
  return [A, B];
}
// Toma n elementos de una prueba según tema y dificultad, sin repetir lo ya jugado.
// «Difícil» y «Kids» usan su propio contenido; si no alcanza, se completa con el normal.
function tomar(general, chile, n) {
  const suf = SUFIJO[G.dificultad];
  const dificiles = suf ? pool(C[general + suf] || [], C[chile + suf] || []) : [];
  const normales = pool(C[general] || [], C[chile] || []);
  const candidatos = dificiles.length >= n ? dificiles : [...dificiles, ...normales];
  return elegirSinRepetir(`${general}|${G.dificultad}|${G.tema}`, candidatos, n);
}

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
  G.phase = 'intro'; G.introDe = G.secuencia[G.paso]; G.r = null;
  // cada presentación dura lo que la cortina musical de Letramanía (~16 s)
  G.rem = 16000;
  emitir();
}
function iniciarPrueba(k) {
  G.phase = k;
  const n = cfg().porPrueba;
  if (k === 'quiz') { G.r = { list: tomar('preguntasRapidas', 'preguntasChile', cfg().preguntasRapidas), i: -1 }; siguientePregunta(); }
  else if (k === 'vf') { G.r = { kind: k, list: tomar('verdaderoFalso', 'verdaderoFalsoChile', cfg().verdaderoFalso), i: -1 }; siguienteVF(); }
  else if (k === 'antes') { G.r = { kind: k, list: tomar('queFueAntes', 'queFueAntesChile', cfg().queFueAntes), i: -1 }; siguienteVF(); }
  else if (k === 'cifra') { G.r = { list: tomar('cifras', 'cifrasChile', cfg().cifras), i: -1 }; siguienteCifra(); }
  else if (k === 'adivinanza') { G.r = { kind: k, list: tomar('adivinanzas', 'adivinanzasChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'siglas') { G.r = { kind: k, list: tomar('siglas', 'siglasChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'oculta') { G.r = { list: tomar('palabrasOcultas', 'palabrasOcultasChile', cfg().palabrasOcultas), i: -1 }; siguienteOculta(); }
  else if (k === 'anagrama') { G.r = { kind: k, list: tomar('letrasRevueltas', 'letrasRevueltasChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'quiensoy') { G.r = { kind: k, list: tomar('quienSoy', 'quienSoyChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'refran') { G.r = { kind: k, list: tomar('refranes', 'refranesChile', n), i: -1 }; siguientePulsador(); }
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
  r.stage = 'ask'; r.rem = (conPresentador() ? cfg().segPreguntaPresentador : cfg().segPregunta) * 1000; r.elapsed = 0;
  r.resp = { A: null, B: null };
  r.buzz = null; r.bloqueado = { A: false, B: false }; r.gana = {};
  r.espera = conPresentador() ? cfg().segPensar * 1000 : 0; // con presentador se presiona «¡Lo sé!»
}
function pulsarQuiz(team) {
  const r = G.r;
  if (!conPresentador() || r.stage !== 'ask' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
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

// ---- Verdadero o falso / ¿Qué fue antes?: los dos equipos eligen una opción ----
function siguienteVF() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  const it = r.list[r.i];
  r.item = r.kind === 'antes'
    ? { texto: '¿Qué ocurrió antes?', opciones: [it.a, it.b], correcta: it.antes === 'a' ? 0 : 1, detalle: `${it.a}: ${it.anioA} · ${it.b}: ${it.anioB}` }
    : { texto: it.texto, opciones: ['Verdadero', 'Falso'], correcta: it.v ? 0 : 1, detalle: null };
  r.stage = 'ask'; r.rem = (conPresentador() ? cfg().segVFPresentador : cfg().segVF) * 1000;
  r.resp = { A: null, B: null }; r.gana = {};
}
function responderVF(team, k) {
  const r = G.r;
  if (!ELECCION.includes(G.phase) || r.stage !== 'ask' || r.resp[team] !== null) return;
  if (typeof k === 'boolean') k = k ? 0 : 1; // compatibilidad
  k = Number(k);
  if (k !== 0 && k !== 1) return;
  r.resp[team] = k;
  if (r.resp.A !== null && r.resp.B !== null) revelarVF(); else emitir();
}
function revelarVF() {
  const r = G.r;
  r.stage = 'reveal'; r.rem = r.kind === 'antes' ? 5500 : 4000; r.gana = {};
  for (const t of ['A', 'B']) if (r.resp[t] === r.item.correcta) { r.gana[t] = 3; G.teams[t].bonus += 3; }
  emitir(Object.keys(r.gana).length ? 'ok' : 'fail');
}

// ---- Adivina la cifra: cada equipo escribe un número; gana el más cercano ----
function leerNumero(v) {
  let t = String(v ?? '').trim().replace(/\s/g, '');
  if (!t) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');      // 4.270,5 → 4270.5
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');    // 384.400 → 384400
  return parseFloat(t);
}
function siguienteCifra() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  r.stage = 'ask'; r.rem = cfg().segCifra * 1000;
  r.resp = { A: null, B: null }; r.gana = {};
}
function responderCifra(team, valor) {
  const r = G.r;
  if (G.phase !== 'cifra' || r.stage !== 'ask' || r.resp[team] !== null) return;
  const x = leerNumero(valor);
  if (!Number.isFinite(x)) return;
  r.resp[team] = x;
  if (r.resp.A !== null && r.resp.B !== null) revelarCifra(); else emitir();
}
function revelarCifra() {
  const r = G.r, ok = r.item.respuesta;
  r.stage = 'reveal'; r.rem = 6500; r.gana = {};
  const dif = (t) => Math.abs(r.resp[t] - ok);
  const conResp = ['A', 'B'].filter((t) => r.resp[t] !== null);
  if (conResp.length) {
    const mejor = Math.min(...conResp.map(dif));
    const ganadores = conResp.filter((t) => dif(t) === mejor);
    const premio = mejor === 0 ? 12 : ganadores.length === 2 ? 5 : 8;
    for (const t of ganadores) { r.gana[t] = premio; G.teams[t].bonus += premio; }
  }
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
  r.stage = 'play'; r.revealRem = cfg().revelarCadaMs; r.buzz = null;
  r.totalMs = Math.max(1, r.visibles.filter((v) => !v).length - 1) * cfg().revelarCadaMs;
  r.bloqueado = { A: false, B: false }; r.ganador = null; r.intento = null;
  r.espera = cfg().segPensar * 1000;
}
function pulsarOculta(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
  r.buzz = { team, rem: cfg().segParaResponder * 1000 };
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
  else {
    // el otro equipo tiene al menos unos segundos para presionar antes de que se acabe la palabra
    const quedan = Math.max(0, r.visibles.filter((v) => !v).length - 2) * cfg().revelarCadaMs + r.revealRem;
    if (quedan < cfg().segRebote * 1000) r.revealRem += cfg().segRebote * 1000 - quedan;
  }
  emitir('fail');
}

// ---- Pruebas de pulsador: letras revueltas, ¿quién soy?, completa el refrán ----
function respuestasDe(r) {
  if (r.kind === 'anagrama') return [r.item.palabra];
  if (r.kind === 'refran') return r.item.finales;
  return r.item.respuestas; // ¿quién soy?, adivinanzas, siglas
}
function textoRespuesta(r) {
  if (r.kind === 'anagrama') return r.item.palabra.toUpperCase();
  if (r.kind === 'refran') return r.item.inicio.replace(/…$/, '') + ' ' + r.item.finales[0];
  if (r.kind === 'siglas') return `${r.item.sigla}: ${r.item.respuestas[0]}`;
  return r.item.respuestas[0];
}
function siguientePulsador() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  r.stage = 'play'; r.buzz = null; r.bloqueado = { A: false, B: false }; r.ganador = null; r.intento = null;
  r.pistas = 1;
  r.rem = r.kind === 'quiensoy' ? cfg().quienSoyCadaMs : cfg().segPulsador * 1000; // tiempo hasta la siguiente pista o hasta rendirse
  if (r.kind === 'anagrama') r.revuelta = revolver(r.item.palabra);
  r.espera = cfg().segPensar * 1000;
}
function pulsarP(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
  r.buzz = { team, rem: cfg().segParaResponder * 1000 };
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
  else {
    // el otro equipo tiene al menos unos segundos para presionar
    const quedan = (r.kind === 'quiensoy' ? (3 - r.pistas) * cfg().quienSoyCadaMs : 0) + r.rem;
    if (quedan < cfg().segRebote * 1000) r.rem += cfg().segRebote * 1000 - quedan;
  }
  emitir('fail');
}
function rendirP() { const r = G.r; r.buzz = null; r.stage = 'reveal'; r.rem = 5000; emitir('reveal'); }

// ---- Rueda final ----
function iniciarRueda() {
  const sets = ruedasParaPartida();
  const mk = (set, team) => ({
    letras: set.map((l) => ({ ...l, estado: 'pendiente' })),
    idx: 0,
    tiempo: (cfg().tiempoBaseRueda + G.teams[team].bonus) * 1000,
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
    if (res === 'ko') {
      r.bloqueado[t] = true;
      if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 5000; }
      else r.rem = Math.max(r.rem, cfg().segRebote * 1000); // el otro equipo tiene tiempo para presionar
      return emitir('fail');
    }
  } else if (ELECCION.includes(G.phase) && r.stage === 'ask') {
    if (res === 'nadie') return revelarVF();
  } else if (G.phase === 'cifra' && r.stage === 'ask') {
    if (res === 'nadie') return revelarCifra();
  } else if (G.phase === 'oculta' && r.stage === 'play') {
    if (res === 'nadie') { r.buzz = null; r.stage = 'reveal'; r.rem = 4000; r.visibles = r.visibles.map(() => true); return emitir('reveal'); }
    if (!r.buzz) return;
    if (res === 'ok') return acertarOculta(r.buzz.team);
    if (res === 'ko') return fallarOculta(r.buzz.team);
  } else if (PULSADOR.includes(G.phase) && r.stage === 'play') {
    if (res === 'nadie') return rendirP();
    if (res === 'pista' && r.kind === 'quiensoy' && !r.buzz && r.pistas < 3) { r.pistas++; r.rem = cfg().quienSoyCadaMs; return emitir('reveal'); }
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
  // tiempo para pensar: el botón está bloqueado y el resto del reloj no corre
  if (r && r.espera > 0 && (r.stage === 'ask' || r.stage === 'play') && ['quiz', 'oculta', ...PULSADOR].includes(G.phase)) {
    r.espera -= dt;
    if (r.espera <= 0) { r.espera = 0; emitir('listo'); }
    return;
  }
  if (G.phase === 'quiz') {
    if (r.stage === 'ask') {
      if (!conPresentador()) { r.rem -= dt; r.elapsed += dt; if (r.rem <= 0) revelarQuiz(); }
      // con presentador, el reloj se detiene mientras un equipo responde; si se acaba, nadie suma
      else if (!r.buzz) { r.rem -= dt; if (r.rem <= 0) { r.rem = 5000; r.stage = 'reveal'; emitir('tiempo'); } }
    } else { r.rem -= dt; if (r.rem <= 0) { siguientePregunta(); emitir(); } }
  } else if (ELECCION.includes(G.phase)) {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') revelarVF(); else { siguienteVF(); emitir(); } }
  } else if (G.phase === 'cifra') {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') revelarCifra(); else { siguienteCifra(); emitir(); } }
  } else if (G.phase === 'oculta') {
    if (r.stage === 'play') {
      if (r.buzz) { if (!conPresentador()) { r.buzz.rem -= dt; if (r.buzz.rem <= 0) fallarOculta(r.buzz.team); } }
      else {
        r.revealRem -= dt;
        if (r.revealRem <= 0) {
          r.revealRem = cfg().revelarCadaMs;
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
          if (r.kind === 'quiensoy' && r.pistas < 3) { r.pistas++; r.rem = cfg().quienSoyCadaMs; emitir('reveal'); }
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
    phase: G.phase, paused: G.paused, rem: G.rem, base: BASE, tema: G.tema, modo: G.modo, tiempoBase: cfg().tiempoBaseRueda,
    dificultad: G.dificultad, musicaFondo: G.musicaFondo, rondas: G.rondas, catalogo: ORDEN.map((k) => ({ id: k, titulo: PRUEBAS[k].titulo })),
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
      respondido: { A: !!r.resp.A, B: !!r.resp.B }, buzz: r.buzz, bloqueado: r.bloqueado, espera: r.espera || 0 };
    if (r.stage === 'reveal') Object.assign(s.quiz, { correcta: r.q.correcta, resp: r.resp, gana: r.gana });
  } else if (ELECCION.includes(G.phase)) {
    const rev = r.stage === 'reveal';
    s.vf = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage, rem: r.rem,
      total_ms: (conPresentador() ? cfg().segVFPresentador : cfg().segVF) * 1000,
      texto: r.item.texto, opciones: r.item.opciones, respondido: { A: r.resp.A !== null, B: r.resp.B !== null },
      correcta: rev ? r.item.correcta : null, detalle: rev ? r.item.detalle : null, resp: rev ? r.resp : null, gana: rev ? r.gana : null };
  } else if (G.phase === 'cifra') {
    const rev = r.stage === 'reveal';
    s.cifra = { n: r.i + 1, total: r.list.length, stage: r.stage, texto: r.item.pregunta, unidad: r.item.unidad,
      respondido: { A: r.resp.A !== null, B: r.resp.B !== null },
      respuesta: rev ? r.item.respuesta : null, resp: rev ? r.resp : null, gana: rev ? r.gana : null };
  } else if (G.phase === 'oculta') {
    s.oculta = { n: r.i + 1, total: r.list.length, pista: !oculto || r.stage === 'reveal' ? r.pista : null, stage: r.stage,
      letras: [...r.palabra].map((ch, k) => (ch === ' ' ? ' ' : r.visibles[k] ? ch : '')),
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, intento: r.intento, espera: r.espera || 0 };
  } else if (PULSADOR.includes(G.phase)) {
    const rev = r.stage === 'reveal', ver = !oculto || rev, it = r.item;
    s.p = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage,
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, intento: r.intento, numPistas: r.pistas, espera: r.espera || 0,
      respuesta: rev ? textoRespuesta(r) : null };
    if (r.kind === 'anagrama') Object.assign(s.p, { revuelta: r.revuelta, pista: ver ? it.pista : null });
    if (r.kind === 'quiensoy') s.p.pistas = ver ? it.pistas.slice(0, rev ? 3 : r.pistas) : null;
    if (r.kind === 'refran') s.p.inicio = ver ? it.inicio : null;
    if (r.kind === 'adivinanza') s.p.texto = it.texto;
    if (r.kind === 'siglas') s.p.sigla = it.sigla;
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
  s.reloj = reloj();
  return s;
}
// Cuenta atrás de la pregunta en curso (null si no hay ninguna); 'parado' = mientras un equipo responde
function reloj() {
  const r = G.r;
  if (!r) return null;
  if (r.espera > 0 && (r.stage === 'ask' || r.stage === 'play') && ['quiz', 'oculta', ...PULSADOR].includes(G.phase))
    return { rem: r.espera, total: cfg().segPensar * 1000, parado: false, pensar: true };
  if (G.phase === 'quiz' && r.stage === 'ask')
    return { rem: r.rem, total: (conPresentador() ? cfg().segPreguntaPresentador : cfg().segPregunta) * 1000, parado: !!r.buzz };
  if (G.phase === 'cifra' && r.stage === 'ask') return { rem: r.rem, total: cfg().segCifra * 1000, parado: false };
  if (ELECCION.includes(G.phase) && r.stage === 'ask')
    return { rem: r.rem, total: (conPresentador() ? cfg().segVFPresentador : cfg().segVF) * 1000, parado: false };
  if (G.phase === 'oculta' && r.stage === 'play') {
    const ocultas = r.visibles.filter((v) => !v).length;
    return { rem: Math.max(0, ocultas - 2) * cfg().revelarCadaMs + r.revealRem, total: r.totalMs, parado: !!r.buzz };
  }
  if (PULSADOR.includes(G.phase) && r.stage === 'play') {
    if (r.kind === 'quiensoy') return { rem: (3 - r.pistas) * cfg().quienSoyCadaMs + r.rem, total: 3 * cfg().quienSoyCadaMs, parado: !!r.buzz };
    return { rem: r.rem, total: cfg().segPulsador * 1000, parado: !!r.buzz };
  }
  return null;
}
// Lo que solo ve el presentador: la pista completa y la respuesta
function secreto() {
  const r = G.r;
  if (!r) return null;
  if (G.phase === 'quiz') return { tipo: 'quiz', n: r.i + 1, total: r.list.length, texto: r.q.texto, opciones: r.q.opciones, correcta: r.q.correcta, buzz: r.buzz, bloqueado: r.bloqueado, stage: r.stage, espera: r.espera || 0 };
  if (ELECCION.includes(G.phase)) return { tipo: 'vf', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, texto: r.item.texto, opciones: r.item.opciones, correcta: r.item.correcta, detalle: r.item.detalle, stage: r.stage, respondido: { A: r.resp.A !== null, B: r.resp.B !== null } };
  if (G.phase === 'cifra') return { tipo: 'cifra', n: r.i + 1, total: r.list.length, texto: r.item.pregunta, respuesta: r.item.respuesta, unidad: r.item.unidad, stage: r.stage, respondido: { A: r.resp.A !== null, B: r.resp.B !== null } };
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
  sock.on('cifra', (v) => team() && responderCifra(team(), v));
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
  sock.on('soyHost', (clave) => {
    if (CLAVE && String(clave || '').trim() !== CLAVE) return sock.emit('claveIncorrecta', !!clave);
    sock.data.esHost = true;
    sock.join('hosts'); sock.emit('hostOk'); sock.emit('secreto', secreto());
  });

  // controles del presentador
  sock.on('host', (cmd, arg) => {
    if (CLAVE && !sock.data.esHost) return; // sin la clave no se puede manejar la partida
    const enJuego = !['lobby', 'fin'].includes(G.phase);
    if (cmd === 'empezar' && G.phase === 'lobby') empezar();
    else if (cmd === 'saltar' && enJuego) {
      if (G.phase === 'intro') iniciarPrueba(G.introDe);
      else if (G.phase === 'rueda') terminar();
      else avanzar();
    }
    else if (cmd === 'pausa') { G.paused = !G.paused; emitir(); }
    else if (cmd === 'musica') { G.musicaFondo = !G.musicaFondo; emitir(); }
    else if (cmd === 'nueva') { nuevaPartida(); emitir(); }
    else if (cmd === 'dificultad' && G.phase === 'lobby' && ['kids', 'normal', 'dificil'].includes(arg)) { G.dificultad = arg; emitir(); }
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

(URL_PUBLICA ? Promise.resolve(null) : elegirIP()).then((ip) => {
  if (URL_PUBLICA) BASE = URL_PUBLICA;
  else { IP = ip; BASE = `http://${IP}:${PORT}`; }
  server.listen(PORT, '0.0.0.0', () => {
    if (URL_PUBLICA) {
      console.log(`Letramanía en línea: ${BASE}  (tele: /tv · presentador: /host · jugadores: /play)`);
      console.log(CLAVE ? 'Panel del presentador protegido con clave.' : 'AVISO: define CLAVE_PRESENTADOR para proteger el panel del presentador.');
      return;
    }
    console.log(`\n  LETRAMANÍA lista\n`);
    console.log(`  Tele (envía esta pestaña al Chromecast): ${BASE}/tv`);
    console.log(`  Presentador (en tu computador):           ${BASE}/host`);
    console.log(`  Jugadores (o escanean el QR de la tele):  ${BASE}/play\n`);
    const otras = candidatas().filter((c) => c.ip !== IP);
    if (otras.length) console.log(`  (Otras redes del equipo: ${otras.map((c) => `${c.ip} [${c.nombre}]`).join(', ')})\n`);
    console.log('  Deja esta ventana ABIERTA mientras juegan. Para cerrar el juego presiona Ctrl + C.\n');
  });
});
