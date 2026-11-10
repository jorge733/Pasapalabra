// Genera los archivos de audio de la música original del juego (public/audio/).
// La tele solo reproduce estos archivos: así no tiene que sintetizar la música en tiempo real,
// algo que en los navegadores de los televisores provoca chicharreo.
//
// Uso (solo para quien desarrolla; requiere Playwright y ffmpeg instalados):
//   node scripts/generar-musica.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const RAIZ = path.join(__dirname, '..');
const SALIDA = path.join(RAIZ, 'public', 'audio');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'letramania-musica-'));

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  await pagina.setContent('<!doctype html><html><body></body></html>');
  await pagina.addScriptTag({ content: fs.readFileSync(path.join(RAIZ, 'public', 'musica.js'), 'utf8') });

  // { nombre, tipo: 'pieza' (se toca una vez) o 'bucle' (se repite sin cortes) }
  // La intro (public/audio/intro.mp3) y el fondo de la Rueda Final (public/audio/rueda.wav)
  // son grabaciones de Letramanía: no se generan aquí.
  const piezas = [
    { nombre: 'cortina', tipo: 'pieza' },
    { nombre: 'redoble', tipo: 'pieza' },
    { nombre: 'pregunta', tipo: 'bucle' },
  ];
  for (const p of piezas) {
    const wavBase64 = await pagina.evaluate(async ({ nombre, tipo }) => {
      const sr = 44100;
      let buf;
      if (tipo === 'pieza') {
        const ctx = new OfflineAudioContext(1, sr * 14, sr);
        const dur = MusicaLetramania.crear(ctx, ctx.destination)[nombre]();
        const completo = await ctx.startRendering();
        const n = Math.ceil((dur + 0.2) * sr);
        buf = { canales: [completo.getChannelData(0).slice(0, n)], sr, ganancia: 1 };
      } else {
        const ctx = new AudioContext({ sampleRate: sr });
        const b = await MusicaLetramania.crear(ctx).muestra(nombre);
        buf = { canales: [b.getChannelData(0)], sr, ganancia: 0.5 }; // 0.5 = volumen de la salida en vivo
      }
      const d = buf.canales[0], n = d.length;
      const ab = new ArrayBuffer(44 + n * 2), dv = new DataView(ab);
      const w = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
      w(0, 'RIFF'); dv.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
      dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
      dv.setUint32(24, buf.sr, true); dv.setUint32(28, buf.sr * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
      w(36, 'data'); dv.setUint32(40, n * 2, true);
      for (let i = 0; i < n; i++) dv.setInt16(44 + i * 2, Math.max(-1, Math.min(1, d[i] * buf.ganancia)) * 32767, true);
      let bin = ''; const u = new Uint8Array(ab);
      for (let i = 0; i < u.length; i += 8192) bin += String.fromCharCode.apply(null, u.subarray(i, i + 8192));
      return btoa(bin);
    }, p);
    const crudo = path.join(TMP, p.nombre + '.wav');
    fs.writeFileSync(crudo, Buffer.from(wavBase64, 'base64'));
    if (p.tipo === 'bucle') {
      // WAV para los bucles: no tiene relleno al principio ni al final, así el empalme no se nota
      const destino = path.join(SALIDA, p.nombre + '.wav');
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', crudo, '-ac', '1', '-ar', '22050', '-c:a', 'pcm_s16le', destino]);
    } else {
      const destino = path.join(SALIDA, p.nombre + '.mp3');
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', crudo, '-ac', '1', '-ar', '44100', '-b:a', '128k', destino]);
    }
    console.log('✔', p.nombre);
  }
  await navegador.close();
  fs.rmSync(TMP, { recursive: true, force: true });
})();
