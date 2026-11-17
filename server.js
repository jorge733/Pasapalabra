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
  segPregunta: 25,         //   segundos por pregunta (se detiene mientras un equipo responde)
  verdaderoFalso: 6,       // Verdadero o falso: nº de afirmaciones
  segVF: 15,               //   segundos para responder (incluye la lectura)
  palabrasOcultas: 4,      // Palabra oculta: nº de palabras
  revelarCadaMs: 2200,     //   cada cuánto aparece una letra
  porPrueba: 4,            // Letras revueltas, Siglas, ¿Quién soy?, Adivinanzas, Completa el refrán, El Quitaletras y Pistas que despistan: nº de rondas de cada una
  deletrea: 9,             // Deletrea la palabra: palabras por equipo (3 normal, 3 al azar y 3 al revés, como en el programa)
  tutiFruti: 3,            // Bachillerato (Tuti Fruti): nº de letras
  categoriasTuti: 4,       //   categorías por letra (como en el programa)
  segTuti: 90,             //   segundos para llenar las categorías (como en el programa)
  segBasta: 10,            //   segundos que le quedan al otro equipo cuando uno grita «¡Basta!»
  segRevisionTuti: 90,     //   segundos para que el presentador revise las respuestas
  palabrasVerticales: 2,   // La palabra vertical: nº de tableros (cada uno tiene 4 a 6 filas)
  segPulsadorCorto: 20,    // La palabra vertical: segundos antes de dar la ronda por perdida
  // Pruebas por turnos (Letra a letra, Palabras cruzadas, La Memoria, Una de cuatro): cada equipo juega solo contra el reloj
  segTurno: { letraaletra: 90, cruzadas: 75, memoria: 75, deletrea: 120, unade4: 45 }, //   segundos de cada equipo (los del programa)
  segElegir: 12,           //   segundos para elegir entre los dos temas
  segMemorizar: 15,        //   La Memoria: segundos para memorizar el tablero antes de taparlo
  pistasCadaMs: 8000,      // Pistas que despistan: cada cuánto sale una pista nueva (son 5; el acierto vale 5, 4, 3, 2 o 1 s)
  canciones: 4,            // La pista musical: nº de canciones (las pone el presentador)
  musicalCadaMs: 12000,    //   cada cuánto sale una pista escrita mientras suena la canción (son 3; el acierto vale 5, 3 o 2 s)
  todosContraTodos: 15,    // Todos contra todos: nº de canciones (como en el programa; una es de película o serie)
  segTodos: 20,            //   segundos para presionar desde que suena la canción; si nadie presiona, se pierde
  queFueAntes: 5,          // ¿Qué fue antes?: nº de preguntas
  cifras: 4,               // Adivina la cifra: nº de preguntas
  segCifra: 25,            //   segundos para escribir el número
  segPulsador: 30,         //   segundos antes de dar la ronda por perdida si nadie presiona
  quienSoyCadaMs: 10000,   // ¿Quién soy?: cada cuánto sale una pista nueva
  segRebote: 5,            // si un equipo falla, el otro tiene al menos estos segundos para presionar «¡Lo sé!»
  segPensar: 3,            // segundos al empezar cada pregunta en que el botón «¡Lo sé!» está bloqueado (para pensar)
};
// Modo Kids (7 a 12 años): más tiempo para leer, pensar y escribir.
const CONFIG_KIDS = {
  ...CONFIG,
  tiempoBaseRueda: 130,
  segPregunta: 30,
  segVF: 20,
  revelarCadaMs: 2800,
  segCifra: 35,
  segPulsador: 40,
  segPulsadorCorto: 28,
  segMemorizar: 20,
  segTurno: { letraaletra: 120, cruzadas: 100, memoria: 100, deletrea: 150, unade4: 60 },
  pistasCadaMs: 10000,
  musicalCadaMs: 15000,
  segTodos: 30,
  segTuti: 120,
  segBasta: 15,
  quienSoyCadaMs: 13000,
  segRebote: 7,
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
// Las páginas llevan etiquetas Open Graph (vista previa al compartir el enlace en WhatsApp, redes, etc.),
// que exigen direcciones absolutas: se reemplaza __BASE__ por la dirección pública o la del propio pedido.
const paginas = {};
// Versión del juego: cambia cuando se publica código nuevo. Las páginas abiertas la comparan y se recargan solas,
// porque al reconectarse a un servidor actualizado seguirían usando el código viejo (y no mostrarían las pruebas nuevas).
const VERSION = require('crypto').createHash('sha1')
  .update(['server.js', 'contenido.js', 'contenido-pasapalabra.js', 'public/tv.html', 'public/play.html', 'public/host.html', 'public/style.css']
    .map((f) => { try { return require('fs').readFileSync(path.join(__dirname, f), 'utf8'); } catch (e) { return ''; } }).join('\n'))
  .digest('hex').slice(0, 12);
const pagina = (f) => (req, res) => {
  const html = (paginas[f] ??= fs.readFileSync(pub(f), 'utf8'));
  const base = URL_PUBLICA || `${req.protocol}://${req.get('host')}`;
  res.type('html').set('Cache-Control', 'no-cache').send(html.replaceAll('__BASE__', base));
};
app.get('/', pagina('index.html'));
app.get('/favicon.ico', (_, res) => res.type('image/png').sendFile(pub('favicon-32.png'))); // navegadores que piden /favicon.ico
app.get('/tv', pagina('tv.html'));
app.get('/play', pagina('play.html'));
app.get('/host', pagina('host.html'));
app.get(/^\/(index|tv|play|host)\.html$/, (req, res) => res.redirect(301, req.params[0] === 'index' ? '/' : '/' + req.params[0]));
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
// Cada prueba: título, reglas (las explica el presentador) y de dónde sale su contenido.
const PRUEBAS = {
  quiz: {
    titulo: 'Respuesta rápida',
    presentador: 'Escuchen la pregunta. El primer equipo en presionar responde en voz alta. Acertar suma 8 segundos; si fallan, puede responder el otro equipo.',
    presentadorSolo: 'Escucha la pregunta, presiona «¡Lo sé!» y responde en voz alta. Acertar suma 8 segundos; si fallas, se pierde la pregunta.',
  },
  vf: {
    titulo: 'Verdadero o falso',
    presentador: 'Escuchen la afirmación y presionen Verdadero o Falso en el celular. Cada acierto suma 3 segundos.',
  },
  anagrama: {
    titulo: 'Letras revueltas',
    presentador: 'Ordenen las letras de la tele para formar la palabra. Presionen «¡Lo sé!» y díganla en voz alta. Acertar suma 8 segundos.',
  },
  oculta: {
    titulo: 'Palabra oculta',
    presentador: 'Las letras van apareciendo y el presentador da la pista. Presionen «¡Lo sé!» y digan la palabra en voz alta. Cuanto antes, más segundos.',
  },
  quiensoy: {
    titulo: '¿Quién soy?',
    presentador: 'El presentador lee pistas cada vez más fáciles. Acertar con 1 pista suma 12 segundos; con 2, 8; con 3, 5.',
  },
  refran: {
    titulo: 'Completa el refrán',
    presentador: 'El presentador dice el comienzo del refrán. Presionen «¡Lo sé!» y digan cómo termina. Acertar suma 8 segundos.',
  },
  antes: {
    titulo: '¿Qué fue antes?',
    presentador: 'Escuchen los dos hechos y elijan en el celular cuál ocurrió primero. Cada acierto suma 3 segundos.',
  },
  cifra: {
    titulo: 'Adivina la cifra',
    presentador: 'Escuchen la pregunta y escriban un número en el celular. El equipo que más se acerque gana 8 segundos; si lo aciertan exacto, 12.',
    presentadorSolo: 'Escucha la pregunta y escribe un número en el celular. Exacto: 12 segundos; a menos de un 10 %: 8; a menos de un 25 %: 5.',
  },
  adivinanza: {
    titulo: 'Adivinanzas',
    presentador: 'El presentador lee la adivinanza. Presionen «¡Lo sé!» y digan la respuesta en voz alta. Acertar suma 8 segundos.',
  },
  siglas: {
    titulo: 'Siglas',
    presentador: '¿Qué significan estas siglas? Presionen «¡Lo sé!» y digan el significado completo en voz alta. Acertar suma 8 segundos.',
  },
  // --- Pruebas del Pasapalabra chileno (Chilevisión). Reglas según el programa, adaptadas a dos equipos y celulares ---
  letraaletra: {
    titulo: 'Letra a letra',
    pasapalabra: true,
    presentador: 'Juega un equipo a la vez contra el reloj. Todas las palabras contienen las dos letras de la tele. El presentador da una pista por palabra: respondan en voz alta o digan «Pasapalabra». Cada acierto suma 1 segundo.',
    presentadorSolo: 'Juegas contra el reloj. Todas las palabras contienen las dos letras de la tele. El presentador da una pista por palabra: responde en voz alta o di «Pasapalabra». Cada acierto suma 1 segundo.',
  },
  pistas: {
    titulo: 'Pistas que despistan',
    pasapalabra: true,
    presentador: 'El presentador lee hasta cinco pistas sobre un personaje o cosa secreta, de la más difícil a la más fácil. Presionen «¡Lo sé!» y digan qué es. Con la 1.ª pista se ganan 5 s, y 1 s menos por cada pista más.',
  },
  musical: {
    titulo: 'La pista musical',
    pasapalabra: true,
    presentador: 'El presentador pone una canción. Presionen «¡Lo sé!» y digan su nombre en voz alta. Si nadie la adivina, van saliendo pistas. Solo con la música y la 1.ª pista se ganan 5 s; con la 2.ª, 3 s; con la 3.ª, 2 s.',
  },
  todos: {
    titulo: 'Todos contra todos',
    pasapalabra: true,
    presentador: 'El presentador pone 15 canciones. Presionen «¡Lo sé!» y digan quién la canta (en una, de qué película o serie es). ¡Hay una sola oportunidad por canción: si fallan, se pierde! Cada acierto suma 2 segundos.',
  },
  cruzadas: {
    titulo: 'Palabras cruzadas',
    pasapalabra: true,
    presentador: 'Juega un equipo a la vez: elijan uno de dos temas. Las palabras están partidas en dos columnas: con la pista del presentador, junten las mitades y digan la palabra. Cada acierto suma 2 segundos.',
    presentadorSolo: 'Elige uno de dos temas. Las palabras están partidas en dos columnas: con la pista del presentador, junta las mitades y di la palabra. Cada acierto suma 2 segundos.',
  },
  memoria: {
    titulo: 'La Memoria',
    pasapalabra: true,
    presentador: 'Juega un equipo a la vez: elijan uno de dos temas y memoricen las 9 palabras. Luego se tapan y hay que decirlas en orden, de abajo hacia arriba. ¡Un error o un pase y se reinicia! Cada palabra destapada al final suma 1 segundo.',
    presentadorSolo: 'Elige uno de dos temas y memoriza las 9 palabras. Luego se tapan y hay que decirlas en orden, de abajo hacia arriba. ¡Un error o un pase y se reinicia! Cada palabra destapada al final suma 1 segundo.',
  },
  deletrea: {
    titulo: 'Deletrea la palabra',
    pasapalabra: true,
    presentador: 'Juega un equipo a la vez contra el reloj: deletreen 9 palabras letra por letra, 3 normal, 3 en el orden al azar que marca la tele y 3 al revés. Con un error, se deletrea desde el inicio. Normal o al azar: 1 s; al revés: 2 s.',
    presentadorSolo: 'Juegas contra el reloj: deletrea 9 palabras letra por letra, 3 normal, 3 en el orden al azar que marca la tele y 3 al revés. Con un error, se deletrea desde el inicio. Normal o al azar: 1 s; al revés: 2 s.',
  },
  tutifruti: {
    titulo: 'Bachillerato',
    pasapalabra: true,
    presentador: 'El Tuti Fruti: sale una letra y cuatro categorías. Llenen todas en el celular y griten «¡Basta!». El presentador revisa. Respuesta que solo tiene un equipo: 3 s; distintas: 2 s cada uno; iguales: 1 s.',
    presentadorSolo: 'El Tuti Fruti: sale una letra y cuatro categorías. Llénalas todas en el celular y grita «¡Basta!». El presentador revisa. Cada respuesta válida suma 3 segundos.',
  },
  unade4: {
    titulo: 'Una de cuatro',
    pasapalabra: true,
    presentador: 'Juega un equipo a la vez contra el reloj: el presentador hace una pregunta con cuatro alternativas y respondan en voz alta. Acierten o fallen, sale otra. Cada acierto suma 1 segundo.',
    presentadorSolo: 'Juegas contra el reloj: el presentador hace una pregunta con cuatro alternativas y respondes en voz alta. Aciertes o falles, sale otra. Cada acierto suma 1 segundo.',
  },
  vertical: {
    titulo: 'La palabra vertical',
    pasapalabra: true,
    presentador: 'El presentador da el concepto y una pista por fila. Las iniciales forman la palabra vertical. Presionen «¡Lo sé!» y digan la palabra de la fila. Cada fila suma 5 segundos.',
  },
  quitaletras: {
    titulo: 'El Quitaletras',
    pasapalabra: true,
    presentador: 'Las letras están revueltas y sobra una. Presionen «¡Lo sé!» y digan la palabra y qué letra sobra. Acertar suma 8 segundos.',
  },
  rueda: {
    titulo: 'La Rueda Final',
    presentador: 'El presentador lee una definición por cada letra. Respondan en voz alta o digan «Paso». Si fallas o pasas, le toca al otro equipo. ¡Gana quien más acierte!',
    presentadorSolo: 'El presentador lee una definición por cada letra. Responde en voz alta o di «Paso»: las pasadas vuelven al final. ¡Completa la rueda sin fallos antes de que se acabe el tiempo!',
  },
};
const CLASICAS = ['quiz', 'vf', 'antes', 'anagrama', 'siglas', 'oculta', 'cifra', 'quiensoy', 'adivinanza', 'refran'];
// Pruebas del Pasapalabra chileno: primero las de la temporada 2026, luego otras de temporadas anteriores
const CHILENAS = ['letraaletra', 'pistas', 'musical', 'todos', 'memoria', 'cruzadas', 'deletrea', 'tutifruti', 'unade4', 'vertical', 'quitaletras'];
const ORDEN = [...CLASICAS, ...CHILENAS]; // orden en que se juegan; la rueda va siempre al final
const PULSADOR = ['anagrama', 'quiensoy', 'refran', 'adivinanza', 'siglas', 'quitaletras', 'vertical', 'pistas', 'musical', 'todos']; // pruebas de «presiona y responde»
const RAPIDA = ['quiz']; // pruebas con cuatro alternativas en que responden los dos equipos
const PREMIO = { quiensoy: [12, 8, 5], pistas: [5, 4, 3, 2, 1], musical: [5, 3, 2], todos: 2, vertical: 5 }; // segundos por acierto en las pruebas de pulsador (8 si no se indica)
const PULSADOR_CORTO = ['vertical'];
const CON_PISTAS = ['quiensoy', 'pistas', 'musical']; // pruebas de pulsador en que van saliendo pistas
const MUSICALES = ['musical', 'todos']; // pruebas en que el presentador pone las canciones
const TURNOS = ['letraaletra', 'cruzadas', 'memoria', 'deletrea', 'unade4']; // pruebas en que cada equipo juega solo contra el reloj
const ELIGE_TEMA = ['cruzadas', 'memoria']; // pruebas por turnos en que el equipo elige entre dos temas
const ELECCION = ['vf', 'antes']; // pruebas en que ambos equipos eligen una opción en el celular

// ---------- estado ----------
const players = {}; // socket.id -> { name, team }
const NOMBRE_A = 'Equipo Violeta';
let G;
function nuevaPartida() {
  G = {
    phase: 'lobby', paused: false, rem: 0,
    teams: { A: { name: NOMBRE_A, bonus: 0 }, B: { name: 'Equipo Ámbar', bonus: 0 } },
    r: null,
    tema: G ? G.tema : 'mixto',
    dificultad: G ? G.dificultad : 'dificil', // 'kids', 'normal' o 'dificil'
    musicaFondo: G ? G.musicaFondo : true,   // música de fondo en la sala de espera y en la rueda
    solo: G ? G.solo : false,                 // modo solitario: juega una sola persona (o equipo) con el presentador
    rondas: G ? G.rondas : [...CLASICAS], // pruebas elegidas por el presentador (las del Pasapalabra chileno se activan en el panel)
    secuencia: [], paso: -1, introDe: null,
    historial: [], enCurso: null, // segundos ganados por cada equipo en cada prueba (tabla de «tiempo acumulado»)
  };
}
nuevaPartida();
// Equipos que juegan: en el modo solitario, solo el A
const EQUIPOS = () => (G.solo ? ['A'] : ['A', 'B']);
// Al empezar cada pregunta, el equipo que no juega queda bloqueado (así un fallo del jugador cierra la pregunta)
const bloqueoInicial = () => ({ A: false, B: !!G.solo });
// ¿Ya respondieron todos los que juegan?
const respondieronTodos = (resp) => EQUIPOS().every((t) => resp[t] !== null);
// Modo solitario: todos los jugadores pasan al equipo A, que toma el nombre del jugador
function nombreSolo() {
  if (!G.solo) return;
  const p = Object.values(players)[0];
  if (p && (G.teams.A.name === NOMBRE_A || G.teams.A.auto)) { G.teams.A.name = p.name; G.teams.A.auto = true; }
}
function cambiarSolo(on) {
  G.solo = !!on;
  if (G.solo) {
    for (const [id, p] of Object.entries(players)) { if (p.team !== 'A') { p.team = 'A'; io.to(id).emit('me', p); } }
    nombreSolo();
  } else if (G.teams.A.auto) { G.teams.A.name = NOMBRE_A; G.teams.A.auto = false; }
}

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
// Letras que no se juegan en la Rueda Final (sus definiciones siguen en el contenido, pero no se usan)
const LETRAS_FUERA = ['K', 'W'];
function ruedasParaPartida() {
  const suf = SUFIJO[G.dificultad];
  const dificiles = suf ? pool(C['ruedas' + suf] || [], C['ruedasChile' + suf] || []) : [];
  const normales = pool(C.ruedas, C.ruedasChile);
  const A = [], B = [];
  C.ruedas[0].forEach((base, j) => {
    if (LETRAS_FUERA.includes(base.letra)) return; // el rosco va sin K ni W (25 letras)
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
  cerrarPrueba();
  G.paso++;
  if (G.paso >= G.secuencia.length) return terminar();
  G.phase = 'intro'; G.introDe = G.secuencia[G.paso]; G.r = null;
  // cada presentación dura lo que la cortina musical de Letramanía (~16 s)
  G.rem = 16000;
  emitir();
}
// Anota cuántos segundos ganó cada equipo en la prueba que termina
function cerrarPrueba() {
  const e = G.enCurso;
  if (!e) return;
  G.historial.push({ id: e.id, titulo: PRUEBAS[e.id].titulo, A: G.teams.A.bonus - e.A, B: G.teams.B.bonus - e.B });
  G.enCurso = null;
}
function iniciarPrueba(k) {
  G.phase = k;
  G.enCurso = k === 'rueda' ? null : { id: k, A: G.teams.A.bonus, B: G.teams.B.bonus };
  const n = cfg().porPrueba;
  if (k === 'quiz') { G.r = { kind: k, list: tomar('preguntasRapidas', 'preguntasChile', cfg().preguntasRapidas), i: -1 }; siguientePregunta(); }
  else if (TURNOS.includes(k)) iniciarTurnos(k);
  else if (k === 'pistas') { G.r = { kind: k, list: tomar('pistasQueDespistan', 'pistasQueDespistanChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'musical') {
    // se toman unas canciones de reserva por si el presentador no encuentra alguna y la cambia
    const todas = tomar('pistaMusical', 'pistaMusicalChile', cfg().canciones + 3);
    G.r = { kind: k, list: todas.slice(0, cfg().canciones), reserva: todas.slice(cfg().canciones), i: -1 };
    siguientePulsador();
  }
  else if (k === 'todos') {
    // como en el programa: una de las canciones es de una película o serie (en vez del intérprete, se dice la obra)
    const n2 = cfg().todosContraTodos;
    const todas = tomar('todosContraTodos', 'todosContraTodosChile', n2 - 1 + 3);
    const obras = tomar('todosContraTodosObra', 'todosContraTodosObraChile', 2);
    const list = todas.slice(0, n2 - 1);
    list.splice(Math.floor(Math.random() * (list.length + 1)), 0, obras[0]);
    G.r = { kind: k, list, reserva: todas.slice(n2 - 1), reservaObra: obras.slice(1), i: -1 };
    siguientePulsador();
  }
  else if (k === 'tutifruti') { G.r = { kind: k, list: rondasTuti(cfg().tutiFruti), i: -1 }; siguienteTuti(); }
  else if (k === 'quitaletras') { G.r = { kind: k, list: tomar('quitaletras', 'quitaletrasChile', n), i: -1 }; siguientePulsador(); }
  else if (k === 'vertical') {
    // cada tablero aporta sus filas; se juegan una tras otra y la tele muestra el tablero completo
    const tableros = tomar('palabraVertical', 'palabraVerticalChile', cfg().palabrasVerticales);
    const list = tableros.flatMap((tb, t) => tb.filas.map((f, k2) => ({ ...f, tablero: t, fila: k2 })));
    G.r = { kind: k, list, i: -1, tableros: tableros.map((tb) => ({ concepto: tb.concepto, filas: tb.filas.map(() => null) })) };
    siguientePulsador();
  }
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
  r.q = { texto: q.pregunta, tema: q.tema || null, opciones: opts.map((o) => o.t), correcta: opts.findIndex((o) => o.ok) };
  r.stage = 'ask'; r.rem = cfg().segPregunta * 1000;
  r.buzz = null; r.bloqueado = bloqueoInicial(); r.gana = {};
  r.espera = cfg().segPensar * 1000; // se presiona «¡Lo sé!» y se responde en voz alta
}
function pulsarQuiz(team) {
  const r = G.r;
  if (r.stage !== 'ask' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
  r.buzz = { team };
  emitir('buzz');
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
  r.stage = 'ask'; r.rem = cfg().segVF * 1000;
  r.resp = { A: null, B: null }; r.gana = {};
}
function responderVF(team, k) {
  const r = G.r;
  if (!ELECCION.includes(G.phase) || r.stage !== 'ask' || r.resp[team] !== null) return;
  if (typeof k === 'boolean') k = k ? 0 : 1; // compatibilidad
  k = Number(k);
  if (k !== 0 && k !== 1) return;
  r.resp[team] = k;
  if (respondieronTodos(r.resp)) revelarVF(); else emitir();
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
  if (respondieronTodos(r.resp)) revelarCifra(); else emitir();
}
function revelarCifra() {
  const r = G.r, ok = r.item.respuesta;
  r.stage = 'reveal'; r.rem = 6500; r.gana = {};
  const dif = (t) => Math.abs(r.resp[t] - ok);
  const conResp = ['A', 'B'].filter((t) => r.resp[t] !== null);
  if (G.solo) {
    // sin rival no hay «el más cercano»: exacto 12 s, a menos de un 10 % 8 s, a menos de un 25 % 5 s
    if (conResp.length) {
      const err = dif('A') / Math.max(1, Math.abs(ok));
      const premio = err === 0 ? 12 : err <= 0.1 ? 8 : err <= 0.25 ? 5 : 0;
      if (premio) { r.gana.A = premio; G.teams.A.bonus += premio; }
    }
  } else if (conResp.length) {
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
  r.bloqueado = bloqueoInicial(); r.ganador = null;
  r.espera = cfg().segPensar * 1000;
}
function pulsarOculta(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
  r.buzz = { team };
  emitir('buzz');
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
  if (['anagrama', 'quitaletras'].includes(r.kind)) return [r.item.palabra];
  if (r.kind === 'refran') return r.item.finales;
  return r.item.respuestas; // ¿quién soy?, adivinanzas, siglas
}
function textoRespuesta(r) {
  if (r.kind === 'anagrama') return r.item.palabra.toUpperCase();
  if (r.kind === 'quitaletras') return `${r.item.palabra.toUpperCase()} (sobraba la ${r.item.sobra.toUpperCase()})`;
  if (r.kind === 'vertical') return r.item.respuestas[0].toUpperCase();
  if (r.kind === 'refran') return r.item.inicio.replace(/…$/, '') + ' ' + r.item.finales[0];
  if (r.kind === 'siglas') return `${r.item.sigla}: ${r.item.respuestas[0]}`;
  if (r.kind === 'musical') return `${r.item.titulo} (${r.item.artista})`;
  if (r.kind === 'todos') return r.item.obra ? `${r.item.obra} («${r.item.titulo}»)` : `${r.item.artista} («${r.item.titulo}»)`;
  return r.item.respuestas[0];
}
function siguientePulsador() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  r.stage = 'play'; r.buzz = null; r.bloqueado = bloqueoInicial(); r.ganador = null;
  r.pistas = 1;
  r.rem = tiempoP(r); // tiempo hasta la siguiente pista o hasta rendirse
  if (r.kind === 'anagrama') r.revuelta = revolver(r.item.palabra);
  if (r.kind === 'quitaletras') r.revuelta = revolver(r.item.palabra + r.item.sobra);
  r.espera = cfg().segPensar * 1000;
  // La pista musical y Todos contra todos: el reloj no corre hasta que el presentador pone la canción
  if (MUSICALES.includes(r.kind)) { r.stage = 'preparar'; r.espera = 0; }
}
// El presentador avisa que ya suena la canción (o la cambia por otra si no la encuentra)
function empezarCancion() {
  const r = G.r;
  r.stage = 'play'; r.rem = tiempoP(r); r.espera = cfg().segPensar * 1000;
  emitir('listo');
}
function cambiarCancion() {
  const r = G.r;
  // en Todos contra todos, la de película o serie se cambia por otra de película o serie
  const reserva = r.item.obra && r.reservaObra ? r.reservaObra : r.reserva;
  if (!reserva.length) return;
  r.item = r.list[r.i] = reserva.shift();
  emitir();
}
// Tiempo de cada ronda de pulsador (en ¿Quién soy?, hasta la siguiente pista)
function tiempoP(r) {
  if (CON_PISTAS.includes(r.kind)) return cadaPista(r);
  if (r.kind === 'todos') return cfg().segTodos * 1000;
  return (PULSADOR_CORTO.includes(r.kind) ? cfg().segPulsadorCorto : cfg().segPulsador) * 1000;
}
// ¿Quién soy? y Pistas que despistan: cada cuánto sale una pista y cuántas hay
const cadaPista = (r) => (r.kind === 'pistas' ? cfg().pistasCadaMs : r.kind === 'musical' ? cfg().musicalCadaMs : cfg().quienSoyCadaMs);
const maxPistas = (r) => r.item.pistas.length;
// La palabra vertical: anota quién resolvió la fila (o 'nadie')
function anotarFila(r, quien) { if (r.kind === 'vertical') r.tableros[r.item.tablero].filas[r.item.fila] = quien; }
function pulsarP(team) {
  const r = G.r;
  if (r.stage !== 'play' || r.buzz || r.bloqueado[team] || r.espera > 0) return;
  r.buzz = { team };
  emitir('buzz');
}
function acertarP(team) {
  const r = G.r;
  const p = PREMIO[r.kind];
  const seg = Array.isArray(p) ? p[r.pistas - 1] : p || 8;
  G.teams[team].bonus += seg;
  r.ganador = { team, seg }; r.buzz = null;
  anotarFila(r, team);
  r.stage = 'reveal'; r.rem = r.kind === 'todos' ? 3500 : 5000; // Todos contra todos es rápida: 15 canciones
  emitir('ok');
}
function fallarP(team) {
  const r = G.r;
  r.bloqueado[team] = true; r.buzz = null;
  // Todos contra todos: una sola oportunidad por canción (como en el programa): si fallan, se pierde
  if (r.kind === 'todos') { r.stage = 'reveal'; r.rem = 3500; }
  else if (r.bloqueado.A && r.bloqueado.B) { r.stage = 'reveal'; r.rem = 5000; anotarFila(r, 'nadie'); }
  else {
    // el otro equipo tiene al menos unos segundos para presionar
    const quedan = (CON_PISTAS.includes(r.kind) ? (maxPistas(r) - r.pistas) * cadaPista(r) : 0) + r.rem;
    if (quedan < cfg().segRebote * 1000) r.rem += cfg().segRebote * 1000 - quedan;
  }
  emitir('fail');
}
function rendirP() { const r = G.r; r.buzz = null; r.stage = 'reveal'; r.rem = ['vertical', 'todos'].includes(r.kind) ? 3500 : 5000; anotarFila(r, 'nadie'); emitir('reveal'); }

// ---- Pruebas por turnos (Letra a letra, Palabras cruzadas, La Memoria, Una de cuatro) ----
// Como en el programa: juega un equipo y después el otro, cada uno con su propio reloj y su propio panel.
// Empieza el equipo con más segundos acumulados (si hay empate, el primero).
// segundos por acierto, como en el programa (Deletrea: 2 s solo al revés)
const premioTurno = (k, it) => (k === 'cruzadas' ? 2 : k === 'deletrea' && it.modo === 'reves' ? 2 : 1);
const segTurno = (k) => cfg().segTurno[k];
const FUENTE_TURNO = { letraaletra: ['letraALetra', 'letraALetraChile'], cruzadas: ['palabrasCruzadas', 'palabrasCruzadasChile'], memoria: ['memoria', 'memoriaChile'] };
// Deletrea: 3 palabras con deletreo normal, 3 en un orden al azar y 3 al revés
function deletreos(lista) {
  return lista.map((x, i) => {
    const modo = ['normal', 'azar', 'reves'][Math.min(2, Math.floor((i * 3) / lista.length))];
    const pos = [...x.palabra].map((ch, j) => j).filter((j) => x.palabra[j] !== ' ');
    const orden = modo === 'azar' ? shuffle(pos) : modo === 'reves' ? [...pos].reverse() : pos;
    const secuencia = orden.map((j) => x.palabra[j].toUpperCase()).join('');
    return { pista: x.definicion, palabra: x.palabra, modo, orden, secuencia, respuestas: [secuencia] };
  });
}
const sinTilde = (ch) => ch.normalize('NFD').charAt(0);
// Lo que juega un equipo a partir de un panel del contenido
function panelTurno(k, p) {
  if (k === 'letraaletra') return { letras: p.letras.toUpperCase(), items: shuffle(p.palabras).map((w) => ({ pista: w.pista, respuestas: [w.palabra, ...(w.otras || [])] })) };
  if (k === 'cruzadas') {
    const items = shuffle(p.palabras).map((w) => ({ pista: w.pista, partes: w.partes.map((x) => x.toUpperCase()), respuestas: [w.partes.join(''), ...(w.otras || [])] }));
    const idx = items.map((_, i) => i);
    return { tema: p.tema, items, izq: shuffle(idx), der: shuffle(idx) };
  }
  if (k === 'memoria') return { tema: p.tema, items: p.elementos.map((e) => ({ emoji: e.emoji, nombre: e.nombre, respuestas: [e.nombre, ...(e.otras || [])] })) };
  if (k === 'deletrea') return { items: deletreos(p) };
  // Una de cuatro: p es una lista de preguntas
  return { items: p.map((q) => {
    const o = shuffle(q.opciones.map((t, i) => ({ t, ok: i === 0 })));
    return { tema: q.tema, pista: q.pista, opciones: o.map((x) => x.t), correcta: o.findIndex((x) => x.ok), respuestas: [q.opciones[0]] };
  }) };
}
function nuevoEquipoTurno(k, panel) {
  return { ...panel, estado: panel.items.map(() => null), cola: panel.items.map((_, i) => i), aciertos: 0, fallos: 0, reinicios: 0,
    tiempo: segTurno(k) * 1000, gana: 0, ultimo: null, jugado: false };
}
function iniciarTurnos(k) {
  const orden = G.solo ? ['A'] : G.teams.B.bonus > G.teams.A.bonus ? ['B', 'A'] : ['A', 'B'];
  const r = (G.r = { kind: k, orden, k: -1, eq: {}, opciones: {}, turno: orden[0], stage: 'elegir', rem: 0 });
  if (k === 'deletrea') {
    const n = cfg().deletrea, ws = tomar('deletrea', 'deletreaChile', 2 * n);
    const deA = ws.slice(0, n), deB = ws.slice(n).length >= n ? ws.slice(n, 2 * n) : shuffle(ws).slice(0, n);
    r.eq.A = nuevoEquipoTurno(k, panelTurno(k, deA)); r.eq.B = nuevoEquipoTurno(k, panelTurno(k, deB));
  } else if (k === 'unade4') {
    const qs = tomar('unaDeCuatro', 'unaDeCuatroChile', 24), mitad = Math.ceil(qs.length / 2);
    r.eq.A = nuevoEquipoTurno(k, panelTurno(k, qs.slice(0, mitad)));
    r.eq.B = nuevoEquipoTurno(k, panelTurno(k, qs.slice(mitad).length ? qs.slice(mitad) : qs));
  } else {
    const [gen, chi] = FUENTE_TURNO[k];
    const ps = tomar(gen, chi, ELIGE_TEMA.includes(k) ? 4 : 2);
    const de = (j) => ps[j % ps.length];
    if (ELIGE_TEMA.includes(k)) r.opciones = { A: [de(0), de(1)], B: [de(2), de(3)] }; // cada equipo elige entre dos temas
    else { r.eq.A = nuevoEquipoTurno(k, panelTurno(k, de(0))); r.eq.B = nuevoEquipoTurno(k, panelTurno(k, de(1))); }
  }
  siguienteTurno();
}
function siguienteTurno() {
  const r = G.r;
  r.k++;
  if (r.k >= r.orden.length) { r.stage = 'reveal'; r.rem = 6000; return emitir('reveal'); }
  r.turno = r.orden[r.k];
  if (ELIGE_TEMA.includes(r.kind)) { r.stage = 'elegir'; r.rem = cfg().segElegir * 1000; return emitir('turno'); }
  empezarTurno();
}
function elegirTema(team, j) {
  const r = G.r;
  if (r.stage !== 'elegir' || team !== r.turno || !(j === 0 || j === 1)) return;
  r.eq[team] = nuevoEquipoTurno(r.kind, panelTurno(r.kind, r.opciones[team][j]));
  r.eq[team].temaElegido = j;
  empezarTurno();
}
function empezarTurno() {
  const r = G.r;
  r.eq[r.turno].jugado = true;
  if (r.kind === 'memoria') { r.stage = 'memorizar'; r.rem = cfg().segMemorizar * 1000; } // primero se ve el tablero destapado
  else r.stage = 'play';
  emitir('turno');
}
function taparTablero() { const r = G.r; if (r.stage === 'memorizar') { r.stage = 'play'; emitir('listo'); } }
// La Memoria: un error o un pase reinicia el tablero (se vuelve a tapar todo)
function reiniciarMemoria(T) { T.estado = T.items.map(() => null); T.cola = T.items.map((_, i) => i); T.aciertos = 0; T.reinicios++; }
// El presentador juzga cada respuesta (ok: true/false); el equipo también puede pasar desde el celular
function responderTurno(team, { paso, ok } = {}) {
  const r = G.r;
  if (r.stage !== 'play' || team !== r.turno) return;
  const T = r.eq[team], i = T.cola[0];
  if (i === undefined) return;
  const it = T.items[i];
  if (paso && r.kind === 'deletrea') return; // en Deletrea no se puede pasar palabra
  if (paso) {
    if (r.kind === 'memoria') reiniciarMemoria(T);
    else if (r.kind === 'unade4') { T.estado[i] = 'paso'; T.cola.shift(); }
    else T.cola.push(T.cola.shift()); // la palabra vuelve al final
    T.ultimo = { tipo: 'paso', t: Date.now() };
    if (!T.cola.length) return terminarTurno();
    return emitir('paso');
  }
  if (ok) {
    T.estado[i] = 'ok'; T.cola.shift(); T.aciertos++;
    if (r.kind !== 'memoria') { const p = premioTurno(r.kind, it); T.gana += p; G.teams[team].bonus += p; } // en La Memoria se cuenta al final
    T.ultimo = { tipo: 'acierto', t: Date.now() };
  } else {
    T.fallos++;
    T.ultimo = { tipo: 'fallo', t: Date.now(), correcta: r.kind === 'unade4' ? it.opciones[it.correcta] : null };
    if (r.kind === 'memoria') reiniciarMemoria(T);
    else if (r.kind === 'unade4') { T.estado[i] = 'fallo'; T.cola.shift(); } // se reemplaza por otra pregunta
    else if (r.kind !== 'deletrea') T.cola.push(T.cola.shift()); // se retoma al final (en Deletrea, se deletrea de nuevo desde el inicio)
  }
  if (!T.cola.length) return terminarTurno();
  emitir(ok ? 'ok' : 'fail');
}
function terminarTurno() {
  const r = G.r, T = r.eq[r.turno];
  if (r.stage !== 'play') return;
  if (r.kind === 'memoria') { T.gana = T.aciertos; G.teams[r.turno].bonus += T.gana; } // lo que quede destapado al final
  r.stage = 'finTurno'; r.rem = 4500;
  emitir(T.gana ? 'ok' : 'tiempo');
}
// Estado público: el panel del equipo que juega (sin respuestas, salvo las ya acertadas)
function publicoTurnos(r) {
  const resumen = {};
  for (const t of ['A', 'B']) {
    const T = r.eq[t];
    resumen[t] = T ? { aciertos: T.aciertos, fallos: T.fallos, gana: T.gana, tiempo: T.tiempo, total: T.items.length, jugado: T.jugado } : null;
  }
  const s = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, stage: r.stage, turno: r.turno, orden: r.orden, n: r.k + 1, resumen,
    temas: r.stage === 'elegir' ? r.opciones[r.turno].map((p) => p.tema) : null };
  const T = r.eq[r.turno];
  if (!T || r.stage === 'elegir' || r.stage === 'reveal') return s;
  const i = T.cola[0], it = i !== undefined ? T.items[i] : null, jugando = r.stage === 'play';
  s.ultimo = T.ultimo; s.actual = jugando ? i : null;
  s.estado = T.estado;
  if (r.kind === 'letraaletra') {
    s.letras = T.letras;
    if (it && jugando) {
      const w = it.respuestas[0].toUpperCase();
      s.pista = it.pista;
      s.molde = [...w].map((ch) => (ch === ' ' ? ' ' : T.letras.includes(sinTilde(ch)) ? ch : ''));
    }
    s.resueltas = T.items.filter((_, j) => T.estado[j] === 'ok').map((x) => x.respuestas[0].toUpperCase()); // se apilan como en el programa
  } else if (r.kind === 'cruzadas') {
    s.tema = T.tema;
    s.izq = T.izq.map((j) => ({ t: T.items[j].partes[0], ok: T.estado[j] === 'ok', cur: j === i && jugando }));
    s.der = T.der.map((j) => ({ t: T.items[j].partes[1], ok: T.estado[j] === 'ok' }));
    s.resueltas = T.items.filter((_, j) => T.estado[j] === 'ok').map((x) => x.respuestas[0].toUpperCase());
    if (it && jugando) s.pista = it.pista;
  } else if (r.kind === 'memoria') {
    s.tema = T.tema;
    s.memorizar = r.stage === 'memorizar';
    s.celdas = T.items.map((x, j) => (s.memorizar || T.estado[j] === 'ok' || r.stage === 'finTurno' ? { emoji: x.emoji, nombre: x.nombre, ok: T.estado[j] === 'ok' } : {}));
    s.reinicios = T.reinicios;
  } else if (r.kind === 'deletrea') {
    s.resueltas = T.items.filter((_, j) => T.estado[j] === 'ok').map((x) => x.palabra.toUpperCase());
    if (it && jugando) {
      const num = [...it.palabra].map(() => null);
      it.orden.forEach((j, k2) => { num[j] = k2 + 1; });
      Object.assign(s, { pista: it.pista, modo: it.modo, molde: [...it.palabra].map((ch) => (ch === ' ' ? ' ' : '')), numeros: it.modo === 'normal' ? null : num,
        nPalabra: T.aciertos + 1 });
    }
  } else if (r.kind === 'unade4' && it && jugando) {
    Object.assign(s, { tema: it.tema, pista: it.pista, opciones: it.opciones });
  }
  return s;
}
// Lo que ve el presentador: la respuesta del momento
function secretoTurnos(r) {
  const T = r.eq[r.turno], i = T ? T.cola[0] : undefined, it = T && i !== undefined ? T.items[i] : null;
  return { tipo: 'turnos', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, stage: r.stage, turno: r.turno,
    temas: r.stage === 'elegir' ? r.opciones[r.turno].map((p) => p.tema) : null,
    tema: T && T.tema, letras: T && T.letras, tiempo: T ? T.tiempo : null, pendientes: T ? T.cola.length : 0,
    pos: i, item: it ? { pista: it.pista, respuestas: it.respuestas, opciones: it.opciones, correcta: it.correcta, partes: it.partes, modo: it.modo, palabra: it.palabra, secuencia: it.secuencia } : null,
    elementos: r.kind === 'memoria' && T ? T.items.map((x) => x.nombre.toUpperCase()) : null };
}

// ---- Tuti Fruti (el bachillerato): una letra y varias categorías; los dos equipos escriben a la vez ----
const LETRAS_TUTI = [...'ABCDEFGLMNOPRST'];
const inicialDe = (t) => String(t || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0);
// Cada ronda: una letra y las categorías que tienen palabras con esa letra (con «Solo Chile», primero las chilenas)
function rondasTuti(n) {
  const gen = C.tutiFruti || [], chi = C.tutiFrutiChile || [];
  const letras = elegirSinRepetir(`tuti|${G.tema}`, LETRAS_TUTI, n);
  return letras.map((L) => {
    const l = L.toLowerCase(), tiene = (c) => c.palabras.some((p) => inicialDe(p) === l);
    let cats;
    if (G.tema === 'general') cats = shuffle(gen.filter(tiene));
    else if (G.tema === 'chile') cats = [...shuffle(chi.filter(tiene)), ...shuffle(gen.filter(tiene))];
    else cats = [...shuffle(chi.filter(tiene)).slice(0, 2), ...shuffle(gen.filter(tiene))]; // mixto: hasta 2 chilenas
    const vistas = new Set();
    cats = cats.filter((c) => !vistas.has(c.categoria) && vistas.add(c.categoria)).slice(0, cfg().categoriasTuti);
    return { letra: L, cats: shuffle(cats).map((c) => ({ categoria: c.categoria, palabras: c.palabras.filter((p) => inicialDe(p) === l) })) };
  });
}
function siguienteTuti() {
  const r = G.r;
  r.i++;
  if (r.i >= r.list.length) return avanzar();
  r.item = r.list[r.i];
  const vacias = () => r.item.cats.map(() => '');
  r.stage = 'ask'; r.rem = cfg().segTuti * 1000; r.resp = { A: vacias(), B: vacias() }; r.basta = null; r.marcas = null; r.gana = {}; r.puntos = null;
}
function escribirTuti(team, k, texto) {
  const r = G.r;
  if (G.phase !== 'tutifruti' || r.stage !== 'ask' || !(k >= 0 && k < r.item.cats.length)) return;
  r.resp[team][k] = String(texto ?? '').slice(0, 40);
}
// «¡Basta!»: el equipo que llenó todo detiene la ronda; al otro le quedan unos segundos
function bastaTuti(team) {
  const r = G.r;
  if (G.phase !== 'tutifruti' || r.stage !== 'ask' || r.basta || r.resp[team].some((x) => !x.trim())) return;
  r.basta = team;
  if (G.solo) return cerrarTuti(); // sin rival, «¡Basta!» cierra la ronda
  r.rem = Math.min(r.rem, cfg().segBasta * 1000);
  emitir('buzz');
}
// Marca de cada respuesta: 'ok' (está en la lista), 'duda' (empieza bien pero no está en la lista: vale salvo que el presentador la rechace),
// 'mal' (no empieza por la letra), 'vacia'. El presentador puede cambiarla a 'si' (aceptada) o 'no' (rechazada).
function marcaTuti(texto, cat, letra) {
  if (!String(texto).trim()) return 'vacia';
  if (inicialDe(texto) !== letra.toLowerCase()) return 'mal';
  return coincide(texto, cat.palabras) ? 'ok' : 'duda';
}
const valeTuti = (m) => ['ok', 'duda', 'si'].includes(m);
function cerrarTuti() {
  const r = G.r;
  r.stage = 'revision';
  r.marcas = { A: [], B: [] };
  for (const t of ['A', 'B']) r.marcas[t] = r.item.cats.map((c, k) => marcaTuti(r.resp[t][k], c, r.item.letra));
  r.rem = cfg().segRevisionTuti * 1000;
  emitir('reveal');
}
function marcarTuti(team, k) {
  const r = G.r;
  if (G.phase !== 'tutifruti' || r.stage !== 'revision' || !r.marcas[team] || r.marcas[team][k] === undefined || r.marcas[team][k] === 'vacia') return;
  r.marcas[team][k] = valeTuti(r.marcas[team][k]) ? 'no' : 'si';
  emitir();
}
function puntuarTuti() {
  const r = G.r;
  r.stage = 'reveal'; r.rem = 7000; r.gana = { A: 0, B: 0 };
  r.puntos = r.item.cats.map((c, k) => {
    const va = valeTuti(r.marcas.A[k]), vb = valeTuti(r.marcas.B[k]);
    if (va && vb) { const p = coincide(r.resp.A[k], [r.resp.B[k]]) ? 1 : 2; return { A: p, B: p }; }
    return { A: va ? 3 : 0, B: vb ? 3 : 0 };
  });
  for (const pt of r.puntos) for (const t of ['A', 'B']) r.gana[t] += pt[t];
  for (const t of ['A', 'B']) G.teams[t].bonus += r.gana[t];
  emitir(r.gana.A || r.gana.B ? 'ok' : 'fail');
}

// ---- Rueda final ----
function iniciarRueda() {
  const sets = ruedasParaPartida();
  const mk = (set, team) => ({
    letras: set.map((l) => ({ ...l, estado: 'pendiente' })),
    idx: 0,
    tiempo: (cfg().tiempoBaseRueda + G.teams[team].bonus) * 1000,
  });
  const ordenA = G.solo || G.teams.A.bonus <= G.teams.B.bonus; // empieza quien tiene menos tiempo
  const eq = { A: mk(sets[0], 'A') };
  if (!G.solo) eq.B = mk(sets[1 % sets.length], 'B'); // en el modo solitario hay una sola rueda
  G.r = { eq, turno: ordenA ? 'A' : 'B', stage: 'play', ultimo: null };
}
function siguientePendiente(T, desde) {
  const n = T.letras.length;
  for (let k = 1; k <= n; k++) { const j = (desde + k) % n; if (T.letras[j].estado === 'pendiente') return j; }
  return -1;
}
const puedeJugar = (T) => T.tiempo > 0 && T.letras.some((l) => l.estado === 'pendiente');
function responderRueda(team, paso, ok) {
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
  L.estado = ok ? 'acierto' : 'fallo';
  r.ultimo = { team, letra: L.letra, idx: T.idx, tipo: ok ? 'acierto' : 'fallo', correcta: L.respuestas[0], t: Date.now() };
  T.idx = siguientePendiente(T, T.idx);
  if (!ok) { r.stage = 'feedback'; r.rem = 3500; }
  else if (T.idx === -1) { r.stage = 'feedback'; r.rem = 2500; }
  emitir(ok ? 'ok' : 'fail');
}
function trasFeedback() {
  const r = G.r;
  const otro = r.turno === 'A' ? 'B' : 'A';
  r.stage = 'play';
  if (r.eq[otro] && puedeJugar(r.eq[otro])) r.turno = otro;
  else if (!puedeJugar(r.eq[r.turno])) return terminar();
  emitir('turno');
}
function terminar() {
  const r = G.phase === 'rueda' ? G.r : null;
  const cuenta = (t, e) => (r ? r.eq[t].letras.filter((l) => l.estado === e).length : 0);
  const res = EQUIPOS().map((t) => ({ team: t, aciertos: cuenta(t, 'acierto'), fallos: cuenta(t, 'fallo'), tiempo: r && r.eq[t] ? r.eq[t].tiempo : 0 }));
  if (G.solo) {
    // sin rival: se gana completando la rueda sin fallos (el «bote»)
    const total = r ? r.eq.A.letras.length : 0;
    G.fin = { res, solo: true, total, ganador: total && res[0].aciertos === total ? 'A' : null };
  } else {
    res.sort((a, b) => b.aciertos - a.aciertos || a.fallos - b.fallos || b.tiempo - a.tiempo);
    const empate = res[0].aciertos === res[1].aciertos && res[0].fallos === res[1].fallos;
    G.fin = { res, ganador: empate ? null : res[0].team };
  }
  G.phase = 'fin';
  emitir('fin');
}

// ---- Decisión del presentador: 'ok', 'ko', 'paso' (rueda) o 'nadie' (nadie la sabe) ----
function juzgar(res) {
  const r = G.r;
  if (!r || G.paused) return;
  // La pista musical y Todos contra todos: el presentador avisa cuando suena la canción (o la cambia)
  if (MUSICALES.includes(G.phase)) {
    if (r.stage === 'preparar') {
      if (res === 'empezar') return empezarCancion();
      if (res === 'cambiar') return cambiarCancion();
      if (res === 'nadie') return rendirP();
      return;
    }
    if (res === 'paso' && r.stage === 'play' && !r.buzz) return rendirP(); // Todos contra todos: «Pasapalabra»
  }
  if (RAPIDA.includes(G.phase) && r.stage === 'ask') {
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
  } else if (G.phase === 'tutifruti') {
    if (res === 'nadie' && r.stage === 'ask') return cerrarTuti();      // el presentador corta la escritura
    if (res === 'nadie' && r.stage === 'revision') return puntuarTuti(); // confirma la revisión
  } else if (TURNOS.includes(G.phase)) {
    if (res === 'nadie' && r.stage === 'elegir') return elegirTema(r.turno, 0);
    if (res === 'nadie' && r.stage === 'memorizar') return taparTablero();
    if (r.stage === 'play' && ['ok', 'ko', 'paso'].includes(res)) return responderTurno(r.turno, res === 'paso' ? { paso: true } : { ok: res === 'ok' });
    if (res === 'nadie' && r.stage === 'play') return terminarTurno(); // el presentador corta el turno
  } else if (PULSADOR.includes(G.phase) && r.stage === 'play') {
    if (res === 'nadie') return rendirP();
    if (res === 'pista' && CON_PISTAS.includes(r.kind) && !r.buzz && r.pistas < maxPistas(r)) { r.pistas++; r.rem = cadaPista(r); return emitir('reveal'); }
    if (!r.buzz) return;
    if (res === 'ok') return acertarP(r.buzz.team);
    if (res === 'ko') return fallarP(r.buzz.team);
  } else if (G.phase === 'rueda' && r.stage === 'play') {
    if (res === 'paso') return responderRueda(r.turno, true);
    if (res === 'ok' || res === 'ko') return responderRueda(r.turno, false, res === 'ok');
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
  if (r && r.espera > 0 && (r.stage === 'ask' || r.stage === 'play') && [...RAPIDA, 'oculta', ...PULSADOR].includes(G.phase)) {
    r.espera -= dt;
    if (r.espera <= 0) { r.espera = 0; emitir('listo'); }
    return;
  }
  if (RAPIDA.includes(G.phase)) {
    if (r.stage === 'ask') {
      // el reloj se detiene mientras un equipo responde; si se acaba, nadie suma
      if (!r.buzz) { r.rem -= dt; if (r.rem <= 0) { r.rem = 5000; r.stage = 'reveal'; emitir('tiempo'); } }
    } else { r.rem -= dt; if (r.rem <= 0) { siguientePregunta(); emitir(); } }
  } else if (ELECCION.includes(G.phase)) {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') revelarVF(); else { siguienteVF(); emitir(); } }
  } else if (TURNOS.includes(G.phase)) {
    if (r.stage === 'play') { const T = r.eq[r.turno]; T.tiempo -= dt; if (T.tiempo <= 0) { T.tiempo = 0; terminarTurno(); } }
    else {
      r.rem -= dt;
      if (r.rem <= 0) {
        if (r.stage === 'elegir') elegirTema(r.turno, Math.floor(Math.random() * 2));
        else if (r.stage === 'memorizar') taparTablero();
        else if (r.stage === 'finTurno') siguienteTurno();
        else if (r.stage === 'reveal') avanzar();
      }
    }
  } else if (G.phase === 'tutifruti') {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') cerrarTuti(); else if (r.stage === 'revision') puntuarTuti(); else { siguienteTuti(); emitir(); } }
  } else if (G.phase === 'cifra') {
    r.rem -= dt;
    if (r.rem <= 0) { if (r.stage === 'ask') revelarCifra(); else { siguienteCifra(); emitir(); } }
  } else if (G.phase === 'oculta') {
    if (r.stage === 'play') {
      if (!r.buzz) {
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
      if (!r.buzz) {
        r.rem -= dt;
        if (r.rem <= 0) {
          if (CON_PISTAS.includes(r.kind) && r.pistas < maxPistas(r)) { r.pistas++; r.rem = cadaPista(r); emitir('reveal'); }
          else rendirP();
        }
      }
    } else if (r.stage === 'reveal') { r.rem -= dt; if (r.rem <= 0) { siguientePulsador(); emitir(); } }
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
    solo: G.solo,
    phase: G.phase, paused: G.paused, rem: G.rem, base: BASE, tema: G.tema, tiempoBase: cfg().tiempoBaseRueda,
    dificultad: G.dificultad, musicaFondo: G.musicaFondo, rondas: G.rondas,
    catalogo: ORDEN.map((k) => ({ id: k, titulo: PRUEBAS[k].titulo, pasapalabra: !!PRUEBAS[k].pasapalabra })),
    teams: G.teams,
    players: Object.values(players),
    intro: null,
  };
  if (G.phase === 'intro') {
    const k = G.introDe, P = PRUEBAS[k];
    s.intro = { prueba: k, titulo: k === 'rueda' ? P.titulo : `Prueba ${G.paso + 1} de ${G.secuencia.length - 1} · ${P.titulo}`, texto: (G.solo && P.presentadorSolo) || P.presentador };
  }
  const oculto = false; // las preguntas y pistas se ven en la tele en ambos modos (las respuestas, nunca hasta el final)
  const r = G.r;
  if (RAPIDA.includes(G.phase)) {
    const ver = !oculto || r.stage === 'reveal';
    s.quiz = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, tema: r.q.tema, n: r.i + 1, total: r.list.length, texto: ver ? r.q.texto : null, opciones: ver ? r.q.opciones : null, stage: r.stage, rem: r.rem,
      buzz: r.buzz, bloqueado: r.bloqueado, espera: r.espera || 0 };
    if (r.stage === 'reveal') Object.assign(s.quiz, { correcta: r.q.correcta, gana: r.gana });
  } else if (ELECCION.includes(G.phase)) {
    const rev = r.stage === 'reveal';
    s.vf = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage, rem: r.rem,
      total_ms: cfg().segVF * 1000,
      texto: r.item.texto, opciones: r.item.opciones, respondido: { A: r.resp.A !== null, B: r.resp.B !== null },
      correcta: rev ? r.item.correcta : null, detalle: rev ? r.item.detalle : null, resp: rev ? r.resp : null, gana: rev ? r.gana : null };
  } else if (G.phase === 'cifra') {
    const rev = r.stage === 'reveal';
    s.cifra = { n: r.i + 1, total: r.list.length, stage: r.stage, texto: r.item.pregunta, unidad: r.item.unidad,
      respondido: { A: r.resp.A !== null, B: r.resp.B !== null },
      respuesta: rev ? r.item.respuesta : null, resp: rev ? r.resp : null, gana: rev ? r.gana : null };
  } else if (TURNOS.includes(G.phase)) s.turnos = publicoTurnos(r);
  else if (G.phase === 'tutifruti') {
    const ver = r.stage !== 'ask';
    s.tuti = { n: r.i + 1, total: r.list.length, letra: r.item.letra, categorias: r.item.cats.map((c) => c.categoria), stage: r.stage, basta: r.basta,
      llenas: { A: r.resp.A.filter((x) => x.trim()).length, B: r.resp.B.filter((x) => x.trim()).length },
      llenasK: { A: r.resp.A.map((x) => !!x.trim()), B: r.resp.B.map((x) => !!x.trim()) }, // qué casillas ya llenó cada equipo (sin mostrar el texto)
      resp: ver ? r.resp : null, marcas: ver ? r.marcas : null, puntos: r.puntos, gana: r.stage === 'reveal' ? r.gana : null,
      ejemplos: r.stage === 'reveal' ? r.item.cats.map((c) => c.palabras.slice(0, 2)) : null };
  } else if (G.phase === 'oculta') {
    s.oculta = { n: r.i + 1, total: r.list.length, pista: !oculto || r.stage === 'reveal' ? r.pista : null, stage: r.stage,
      letras: [...r.palabra].map((ch, k) => (ch === ' ' ? ' ' : r.visibles[k] ? ch : '')),
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, espera: r.espera || 0 };
  } else if (PULSADOR.includes(G.phase)) {
    const rev = r.stage === 'reveal', ver = !oculto || rev, it = r.item;
    s.p = { kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, stage: r.stage,
      buzz: r.buzz, bloqueado: r.bloqueado, ganador: r.ganador, numPistas: r.pistas, espera: r.espera || 0,
      respuesta: rev ? textoRespuesta(r) : null };
    if (r.kind === 'anagrama') Object.assign(s.p, { revuelta: r.revuelta, pista: ver ? it.pista : null });
    if (CON_PISTAS.includes(r.kind)) Object.assign(s.p, { maxPistas: maxPistas(r), pistas: ver ? it.pistas.slice(0, rev ? maxPistas(r) : r.pistas) : null });
    if (r.kind === 'todos') s.p.obra = !!it.obra; // esta canción es de una película o serie
    if (r.kind === 'musical') Object.assign(s.p, { valor: PREMIO.musical[r.pistas - 1], pistas: r.stage === 'preparar' ? [] : s.p.pistas });
    if (r.kind === 'refran') s.p.inicio = ver ? it.inicio : null;
    if (r.kind === 'adivinanza') s.p.texto = it.texto;
    if (r.kind === 'siglas') s.p.sigla = it.sigla;
    if (r.kind === 'quitaletras') Object.assign(s.p, { revuelta: r.revuelta, pista: ver ? it.pista : null, sobra: rev ? it.sobra.toUpperCase() : null, palabra: rev ? it.palabra.toUpperCase() : null });
    if (r.kind === 'vertical') {
      // el tablero en curso: cada fila muestra su inicial y, si ya se resolvió, la palabra completa
      const tb = r.tableros[it.tablero], filas = r.list.filter((f) => f.tablero === it.tablero);
      s.p.n = it.fila + 1; s.p.total = filas.length;
      s.p.tablero = { num: it.tablero + 1, de: r.tableros.length, concepto: tb.concepto, actual: it.fila, pista: ver ? it.pista : null,
        filas: filas.map((f, k) => {
          const quien = tb.filas[k], palabra = f.respuestas[0].toUpperCase();
          return { inicial: palabra.charAt(0).normalize('NFD').charAt(0), molde: molde(palabra), quien, palabra: quien ? palabra : null };
        }) };
    }
  } else if (G.phase === 'rueda') {
    const eq = {};
    for (const t of EQUIPOS()) {
      const T = r.eq[t];
      if (!T) continue;
      eq[t] = { tiempo: T.tiempo, idx: T.idx, letras: T.letras.map((l) => ({ letra: l.letra, estado: l.estado })) };
    }
    const T = r.eq[r.turno];
    const L = T.idx >= 0 ? T.letras[T.idx] : null;
    s.rueda = { eq, turno: r.turno, stage: r.stage, ultimo: r.ultimo,
      actual: L && r.stage === 'play' ? { letra: L.letra, tipo: L.tipo, pista: oculto ? null : L.pista } : null };
  } else if (G.phase === 'fin') s.fin = G.fin;
  s.reloj = reloj();
  s.version = VERSION;
  s.acumulado = G.historial;
  s.secuencia = G.secuencia; s.paso = G.paso; // para el recorrido de pruebas del panel del presentador
  if (G.enCurso) s.enPrueba = { A: G.teams.A.bonus - G.enCurso.A, B: G.teams.B.bonus - G.enCurso.B }; // lo ganado en la prueba en curso
  return s;
}
// Casillas de una palabra oculta: solo se ve la inicial (sin tilde); los espacios quedan como huecos
const molde = (palabra) => [...palabra.toUpperCase()].map((ch, k) => (ch === ' ' ? ' ' : k === 0 ? ch.normalize('NFD').charAt(0) : ''));
// Cuenta atrás de la pregunta en curso (null si no hay ninguna); 'parado' = mientras un equipo responde
function reloj() {
  const r = G.r;
  if (!r) return null;
  if (r.espera > 0 && (r.stage === 'ask' || r.stage === 'play') && [...RAPIDA, 'oculta', ...PULSADOR].includes(G.phase))
    return { rem: r.espera, total: cfg().segPensar * 1000, parado: false, pensar: true };
  if (RAPIDA.includes(G.phase) && r.stage === 'ask')
    return { rem: r.rem, total: cfg().segPregunta * 1000, parado: !!r.buzz };
  if (G.phase === 'cifra' && r.stage === 'ask') return { rem: r.rem, total: cfg().segCifra * 1000, parado: false };
  if (G.phase === 'tutifruti' && r.stage === 'ask') return { rem: r.rem, total: cfg().segTuti * 1000, parado: false };
  if (ELECCION.includes(G.phase) && r.stage === 'ask')
    return { rem: r.rem, total: cfg().segVF * 1000, parado: false };
  if (G.phase === 'oculta' && r.stage === 'play') {
    const ocultas = r.visibles.filter((v) => !v).length;
    return { rem: Math.max(0, ocultas - 2) * cfg().revelarCadaMs + r.revealRem, total: r.totalMs, parado: !!r.buzz };
  }
  if (TURNOS.includes(G.phase)) {
    if (r.stage === 'play') return { rem: r.eq[r.turno].tiempo, total: segTurno(r.kind) * 1000, parado: false };
    if (r.stage === 'elegir') return { rem: r.rem, total: cfg().segElegir * 1000, parado: false };
    if (r.stage === 'memorizar') return { rem: r.rem, total: cfg().segMemorizar * 1000, parado: false };
    return null;
  }
  if (PULSADOR.includes(G.phase) && r.stage === 'play') {
    if (CON_PISTAS.includes(r.kind)) return { rem: (maxPistas(r) - r.pistas) * cadaPista(r) + r.rem, total: maxPistas(r) * cadaPista(r), parado: !!r.buzz };
    return { rem: r.rem, total: tiempoP(r), parado: !!r.buzz };
  }
  return null;
}
// Lo que solo ve el presentador: la pista completa y la respuesta
function secreto() {
  const r = G.r;
  if (!r) return null;
  if (RAPIDA.includes(G.phase)) return { tipo: 'quiz', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, tema: r.q.tema, n: r.i + 1, total: r.list.length, texto: r.q.texto, opciones: r.q.opciones, correcta: r.q.correcta, buzz: r.buzz, bloqueado: r.bloqueado, stage: r.stage, espera: r.espera || 0 };
  if (ELECCION.includes(G.phase)) return { tipo: 'vf', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: r.i + 1, total: r.list.length, texto: r.item.texto, opciones: r.item.opciones, correcta: r.item.correcta, detalle: r.item.detalle, stage: r.stage, respondido: { A: r.resp.A !== null, B: r.resp.B !== null } };
  if (G.phase === 'cifra') return { tipo: 'cifra', n: r.i + 1, total: r.list.length, texto: r.item.pregunta, respuesta: r.item.respuesta, unidad: r.item.unidad, stage: r.stage, respondido: { A: r.resp.A !== null, B: r.resp.B !== null } };
  if (TURNOS.includes(G.phase)) return secretoTurnos(r);
  if (G.phase === 'tutifruti') return { tipo: 'tuti', n: r.i + 1, total: r.list.length, letra: r.item.letra, stage: r.stage, basta: r.basta, rem: r.rem,
    cats: r.item.cats.map((c) => ({ categoria: c.categoria, ejemplos: c.palabras.slice(0, 4) })), resp: r.resp, marcas: r.marcas, puntos: r.puntos, gana: r.gana };
  if (G.phase === 'oculta') return { tipo: 'oculta', n: r.i + 1, total: r.list.length, pista: r.pista, palabra: r.palabra, buzz: r.buzz, bloqueado: r.bloqueado, stage: r.stage };
  if (PULSADOR.includes(G.phase)) {
    // en La palabra vertical se cuenta dentro del tablero en curso
    const tablero = r.kind === 'vertical' ? r.list.filter((f) => f.tablero === r.item.tablero) : null;
    return { tipo: 'p', kind: r.kind, titulo: PRUEBAS[r.kind].titulo, n: tablero ? tablero.indexOf(r.item) + 1 : r.i + 1, total: tablero ? tablero.length : r.list.length,
      stage: r.stage, buzz: r.buzz, bloqueado: r.bloqueado, item: r.item, revuelta: r.revuelta, numPistas: r.pistas, respuesta: textoRespuesta(r),
      reserva: r.reserva ? (r.item.obra && r.reservaObra ? r.reservaObra : r.reserva).length : 0, // canciones para cambiar la actual
      concepto: r.kind === 'vertical' ? r.tableros[r.item.tablero].concepto : null,
      tablero: tablero ? { num: r.item.tablero + 1, de: r.tableros.length } : null };
  }
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
    team = team === 'B' && !G.solo ? 'B' : 'A'; // en el modo solitario todos van al equipo A
    players[sock.id] = { name, team };
    nombreSolo();
    sock.emit('me', players[sock.id]);
    emitir('join');
  });
  sock.on('disconnect', () => { if (players[sock.id]) { delete players[sock.id]; emitir(); } });
  const team = () => players[sock.id] && players[sock.id].team;
  sock.on('vf', (v) => team() && responderVF(team(), v));
  sock.on('cifra', (v) => team() && responderCifra(team(), v));
  sock.on('tuti', ({ k, texto } = {}) => team() && escribirTuti(team(), Number(k), texto));
  sock.on('basta', () => team() && bastaTuti(team()));
  // pruebas por turnos: el equipo puede pasar o elegir tema desde el celular (las respuestas las juzga el presentador)
  sock.on('turno', ({ paso } = {}) => team() && TURNOS.includes(G.phase) && paso && responderTurno(team(), { paso: true }));
  sock.on('tema', (j) => team() && TURNOS.includes(G.phase) && elegirTema(team(), Number(j)));
  sock.on('buzz', () => {
    const t = team();
    if (!t || !G.r) return;
    if (RAPIDA.includes(G.phase)) pulsarQuiz(t);
    else if (G.phase === 'oculta') pulsarOculta(t);
    else if (PULSADOR.includes(G.phase)) pulsarP(t);
  });
  sock.on('rueda', ({ paso } = {}) => team() && paso && responderRueda(team(), true));
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
    else if (cmd === 'solo' && G.phase === 'lobby') { cambiarSolo(!!arg); emitir(); }
    else if (cmd === 'musica') { G.musicaFondo = !G.musicaFondo; emitir(); }
    else if (cmd === 'nueva') { nuevaPartida(); nombreSolo(); emitir(); }
    else if (cmd === 'dificultad' && G.phase === 'lobby' && ['kids', 'normal', 'dificil'].includes(arg)) { G.dificultad = arg; emitir(); }
    else if (cmd === 'tema' && G.phase === 'lobby' && ['mixto', 'chile', 'general'].includes(arg)) { G.tema = arg; emitir(); }
    else if (cmd === 'ronda' && G.phase === 'lobby' && ORDEN.includes(arg)) {
      G.rondas = G.rondas.includes(arg) ? G.rondas.filter((k) => k !== arg) : [...G.rondas, arg];
      emitir();
    }
    // atajos: solo las pruebas del Pasapalabra chileno, solo las clásicas de Letramanía o todas
    else if (cmd === 'rondasGrupo' && G.phase === 'lobby' && ['chilenas', 'clasicas', 'todas'].includes(arg)) {
      G.rondas = arg === 'chilenas' ? [...CHILENAS] : arg === 'clasicas' ? [...CLASICAS] : [...ORDEN];
      emitir();
    }
    else if (cmd === 'juzgar') juzgar(arg);
    else if (cmd === 'tema' && TURNOS.includes(G.phase) && G.r.stage === 'elegir') elegirTema(G.r.turno, Number(arg));
    else if (cmd === 'tutiMarca' && arg && ['A', 'B'].includes(arg.team)) marcarTuti(arg.team, Number(arg.k));
    else if (cmd === 'irRueda' && G.phase !== 'fin') {
      if (G.phase === 'lobby') G.secuencia = [...ORDEN.filter((k) => G.rondas.includes(k)), 'rueda'];
      G.paso = G.secuencia.length - 2; avanzar();
    }
    else if (cmd === 'nombre' && arg && G.teams[arg.team]) { G.teams[arg.team].name = String(arg.name).slice(0, 20); G.teams[arg.team].auto = false; emitir(); }
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
