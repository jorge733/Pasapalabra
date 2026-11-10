// Música original de Letramanía, generada con Web Audio (sin archivos de audio).
// Composición propia: progresión Do – Do – La m – Fa – Sol – Do a 150 pulsos por minuto.
(function () {
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  function crear(ac, destino) {
    const master = ac.createGain();
    master.gain.value = 0.55;
    master.connect(destino || ac.destination);
    let ruido = null;
    function bufRuido() {
      if (ruido) return ruido;
      ruido = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = ruido.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      return ruido;
    }
    function nota(t, n, dur, tipo = 'square', vol = 0.1) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = tipo; o.frequency.value = midi(n);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(vol * 0.6, t + dur * 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02);
    }
    function bombo(t, vol = 0.6) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g).connect(master); o.start(t); o.stop(t + 0.2);
    }
    function ruidoF(t, dur, vol, filtro) {
      const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
      s.buffer = bufRuido(); f.type = 'highpass'; f.frequency.value = filtro;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.02);
    }
    const caja = (t, vol = 0.28) => ruidoF(t, 0.13, vol, 1500);
    const charles = (t) => ruidoF(t, 0.04, 0.05, 7000);
    const platillo = (t) => ruidoF(t, 1.2, 0.18, 5000);
    function acorde(t, notas, dur, vol = 0.07) { notas.forEach((n) => { nota(t, n, dur, 'sawtooth', vol); nota(t, n + 12, dur, 'square', vol * 0.5); }); }

    return {
      // Intro completa (~8 s): se toca al empezar la partida
      intro() {
        const t0 = ac.currentTime + 0.05, b = 60 / 150, c = b / 2;
        const melodia = [
          [60, 64, 67, 72, 67, 72, 76, 79],
          [76, 74, 72, 74, 76, null, 72, null],
          [69, 72, 76, 72, 69, 72, 76, 81],
          [77, 76, 74, 72, 69, 72, 74, 77],
          [79, null, 77, 76, 74, null, 71, 74],
        ];
        const bajos = [36, 36, 33, 29, 31];
        const acordes = [[60, 64, 67], [60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
        melodia.forEach((compas, i) => {
          const tc = t0 + i * 4 * b;
          compas.forEach((n, j) => { if (n != null) nota(tc + j * c, n, c * (compas[j + 1] === null ? 2 : 1) * 0.95, 'square', 0.09); });
          for (let k = 0; k < 4; k++) {
            nota(tc + k * b, bajos[i], b * 0.8, 'triangle', 0.22);
            if (k % 2 === 0) bombo(tc + k * b); else caja(tc + k * b);
            charles(tc + k * b); charles(tc + k * b + c);
          }
          acorde(tc, acordes[i], b * 3.5, 0.035);
        });
        const tf = t0 + 5 * 4 * b; // remate final en Do mayor
        caja(tf - c, 0.2); caja(tf - c / 2, 0.24);
        bombo(tf, 0.8); platillo(tf);
        acorde(tf, [60, 64, 67, 72], 1.6, 0.08);
        nota(tf, 84, 1.4, 'square', 0.08);
        nota(tf, 36, 1.4, 'triangle', 0.3);
        return tf + 1.6 - ac.currentTime;
      },
      // Cortina corta (~2 s): al presentar cada prueba
      cortina() {
        const t0 = ac.currentTime + 0.05, s = 60 / 150 / 4;
        [67, 72, 76, 79, 76, 79, 84].forEach((n, i) => nota(t0 + i * s, n, s * 0.9, 'square', 0.09));
        const tf = t0 + 7 * s + s;
        caja(t0 + 5 * s, 0.18); caja(t0 + 6 * s, 0.22);
        bombo(tf, 0.8); platillo(tf);
        acorde(tf, [60, 64, 67, 72], 1.1, 0.08);
        nota(tf, 36, 1, 'triangle', 0.3);
        return tf + 1.1 - ac.currentTime;
      },
      // Redoble con remate (~3 s): antes de la Rueda Final
      redoble() {
        const t0 = ac.currentTime + 0.05, dur = 1.8, golpes = 36;
        for (let i = 0; i < golpes; i++) caja(t0 + (i * dur) / golpes, 0.06 + (0.24 * i) / golpes);
        const tf = t0 + dur;
        acorde(tf - 0.4, [55, 59, 62], 0.4, 0.05);
        bombo(tf, 0.9); platillo(tf);
        acorde(tf, [60, 64, 67, 72], 1.4, 0.09);
        [72, 76, 79, 84].forEach((n, i) => nota(tf + i * 0.09, n, 0.6, 'square', 0.07));
        nota(tf, 36, 1.4, 'triangle', 0.32);
        return tf + 1.5 - ac.currentTime;
      },
    };
  }
  window.MusicaLetramania = { crear };
})();
