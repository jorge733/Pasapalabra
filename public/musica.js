// Música original de Letramanía, generada con Web Audio (sin archivos de audio).
// Todas las melodías y ritmos son composiciones propias del juego.
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
    // --- instrumentos (dst = adónde se conecta el sonido) ---
    function nota(t, n, dur, tipo = 'square', vol = 0.1, dst = master) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = tipo; o.frequency.value = midi(n);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(vol * 0.6, t + dur * 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.02);
    }
    function suave(t, n, dur, vol, dst = master) { // nota con ataque lento (colchón de fondo)
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = midi(n);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol, t + dur * 0.3);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.02);
    }
    function bombo(t, vol = 0.6, dst = master) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g).connect(dst); o.start(t); o.stop(t + 0.2);
    }
    function ruidoF(t, dur, vol, filtro, dst = master) {
      const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
      s.buffer = bufRuido(); f.type = 'highpass'; f.frequency.value = filtro;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f).connect(g).connect(dst); s.start(t); s.stop(t + dur + 0.02);
    }
    const caja = (t, vol = 0.28, dst) => ruidoF(t, 0.13, vol, 1500, dst);
    const charles = (t, vol = 0.05, dst) => ruidoF(t, 0.04, vol, 7000, dst);
    const platillo = (t, dst) => ruidoF(t, 1.2, 0.18, 5000, dst);
    function acorde(t, notas, dur, vol = 0.07, dst = master) {
      notas.forEach((n) => { nota(t, n, dur, 'sawtooth', vol, dst); nota(t, n + 12, dur, 'square', vol * 0.5, dst); });
    }

    // --- bucles de fondo: se programan unos segundos por adelantado y se detienen con un fundido ---
    const BUCLES = {
      // Sala de espera: relajada, 100 pulsos por minuto (Do – La m – Fa – Sol)
      sala: {
        pulso: 60 / 100, volumen: 0.75,
        compas(t, i, b, dst) {
          const c = b / 2, k = i % 4, vuelta = Math.floor(i / 4);
          const acordes = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
          const bajos = [36, 33, 29, 31];
          const melodias = [
            [72, null, 74, 76, null, 79, null, 76],
            [76, null, 74, 72, null, 69, null, null],
            [69, 72, 74, null, 72, 69, 67, null],
            [67, null, 71, 74, null, 72, null, null],
          ];
          bombo(t, 0.28, dst); bombo(t + 2 * b, 0.22, dst);
          nota(t, bajos[k], b * 1.6, 'triangle', 0.13, dst);
          nota(t + 2 * b, bajos[k] + 7, b * 1.4, 'triangle', 0.1, dst);
          for (const p of [1, 3]) acordes[k].forEach((n) => nota(t + p * b, n, b * 0.5, 'triangle', 0.035, dst));
          for (let e = 0; e < 8; e++) charles(t + e * c, e % 2 ? 0.02 : 0.03, dst);
          suave(t, acordes[k][0] - 12, 4 * b, 0.03, dst);
          if (vuelta % 2 === 1) melodias[k].forEach((n, e) => { if (n != null) nota(t + e * c, n, c * 1.6, 'sine', 0.05, dst); });
        },
      },
      // Rueda Final: tensa y constante, 128 pulsos por minuto (La m – Fa – Sol – Mi)
      rueda: {
        pulso: 60 / 128, volumen: 0.6,
        compas(t, i, b, dst) {
          const s = b / 4, k = i % 4, vuelta = Math.floor(i / 4);
          const acordes = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]];
          const bajos = [33, 29, 31, 28];
          for (let e = 0; e < 8; e++) nota(t + e * (b / 2), bajos[k], b * 0.4, 'triangle', 0.13, dst); // bajo pulsante
          for (let p = 0; p < 4; p++) { if (p % 2 === 0) bombo(t + p * b, 0.32, dst); else caja(t + p * b, 0.07, dst); }
          for (let e = 0; e < 16; e++) charles(t + e * s, e % 4 === 2 ? 0.035 : 0.015, dst); // tic-tac
          acordes[k].forEach((n) => suave(t, n, 4 * b, 0.018, dst));
          if (vuelta % 2 === 1) { // arpegio en las vueltas impares
            const arp = [...acordes[k], acordes[k][0] + 12];
            for (let e = 0; e < 16; e++) nota(t + e * s, arp[e % 4] + 12, s * 0.8, 'square', 0.018, dst);
          }
        },
      },
    };
    function bucle(tipo) {
      const B = BUCLES[tipo];
      if (!B) return { parar() {} };
      const out = ac.createGain();
      out.gain.setValueAtTime(0.0001, ac.currentTime);
      out.gain.linearRampToValueAtTime(B.volumen, ac.currentTime + 2); // entra con fundido
      out.connect(master);
      const largo = 4 * B.pulso;
      let siguiente = ac.currentTime + 0.1, i = 0, vivo = true;
      const programar = () => { while (vivo && siguiente < ac.currentTime + 2.5) { B.compas(siguiente, i++, B.pulso, out); siguiente += largo; } };
      programar();
      const id = setInterval(programar, 200);
      return {
        parar() {
          if (!vivo) return;
          vivo = false; clearInterval(id);
          const t = ac.currentTime;
          out.gain.cancelScheduledValues(t);
          out.gain.setValueAtTime(out.gain.value, t);
          out.gain.linearRampToValueAtTime(0.0001, t + 0.8); // sale con fundido
          setTimeout(() => out.disconnect(), 3000);
        },
      };
    }

    // Programa n compases seguidos de un bucle (para escucharlo o probarlo sin tiempo real)
    function muestra(tipo, n) {
      const B = BUCLES[tipo], out = ac.createGain();
      out.gain.value = B.volumen; out.connect(master);
      const t0 = ac.currentTime + 0.05;
      for (let i = 0; i < n; i++) B.compas(t0 + i * 4 * B.pulso, i, B.pulso, out);
      return n * 4 * B.pulso;
    }
    return {
      bucle, muestra,
      // Intro completa (~10 s): al empezar la partida
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
