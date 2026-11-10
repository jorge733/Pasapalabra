// Música original de Letramanía, generada con Web Audio (sin archivos de audio).
// Todas las melodías y ritmos son composiciones propias del juego.
(function () {
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  function crear(ac, destino, grabacion) {
    const master = ac.createGain();
    master.gain.value = grabacion ? 1 : 0.5;
    if (!grabacion) {
      // limitador: evita que el sonido se sature (y chicharree) aunque suenen varias cosas a la vez
      const lim = ac.createDynamicsCompressor();
      lim.threshold.value = -12; lim.knee.value = 6; lim.ratio.value = 12; lim.attack.value = 0.003; lim.release.value = 0.25;
      master.connect(lim); lim.connect(destino || ac.destination);
    }
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
    function golpe(t, vol = 0.2, dst = master) { // bombo suave y más agudo, apto para parlantes pequeños
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(110, t + 0.08);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(dst); o.start(t); o.stop(t + 0.14);
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

    // piano eléctrico suave: fundamental + octava, con caída natural
    function piano(t, n, dur, vol, dst = master) {
      [[1, vol], [2, vol * 0.25]].forEach(([mult, v]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = 'sine'; o.frequency.value = midi(n) * mult;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.02);
      });
    }

    // --- bucles de fondo ---
    // Cada bucle dura 8 compases; se «graba» una vez a un búfer y se repite sin cortes.
    const BUCLES = {
      // Sala de espera: relajada y cálida, 96 pulsos por minuto (Do – La m – Fa – Sol)
      sala: {
        pulso: 60 / 96, volumen: 0.9, filtro: 3200, eco: 0.28,
        compas(t, i, b, dst) {
          const c = b / 2, k = i % 4, vuelta = Math.floor(i / 4) % 2;
          const acordes = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
          const bajos = [36, 33, 29, 31];
          const melodias = [
            [72, null, 74, 76, null, 79, null, 76],
            [76, null, 74, 72, null, 69, null, null],
            [69, 72, 74, null, 72, 69, 67, null],
            [67, null, 71, 74, null, 72, null, null],
          ];
          piano(t, bajos[k] + 12, b * 1.8, 0.12, dst);       // bajo una octava más arriba: los parlantes de la tele no vibran
          piano(t + 2 * b, bajos[k] + 19, b * 1.6, 0.08, dst);
          for (const p of [1, 2.5, 3]) acordes[k].forEach((n) => piano(t + p * b, n, b * 0.9, 0.04, dst));
          acordes[k].forEach((n) => suave(t, n, 4 * b, 0.01, dst));
          if (vuelta === 1) melodias[k].forEach((n, e) => { if (n != null) piano(t + e * c, n, c * 2.2, 0.06, dst); });
        },
      },
      // Preguntas: suspenso suave «para pensar», 110 pulsos por minuto (Re m – Si♭ – Do – La)
      pregunta: {
        pulso: 60 / 110, volumen: 1.6, filtro: 3800, eco: 0.15,
        compas(t, i, b, dst) {
          const c = b / 2, k = i % 4, vuelta = Math.floor(i / 4) % 2;
          const acordes = [[62, 65, 69], [58, 62, 65], [60, 64, 67], [57, 61, 64]];
          const bajos = [50, 46, 48, 45];
          for (let e = 0; e < 8; e++) piano(t + e * c, bajos[k], c * 0.9, e % 2 ? 0.06 : 0.09, dst); // pulso de bajo
          golpe(t, 0.07, dst); golpe(t + 2 * b, 0.05, dst);
          for (let e = 1; e < 8; e += 2) piano(t + e * c, e % 4 === 1 ? 86 : 81, 0.06, 0.012, dst); // tic suave
          acordes[k].forEach((n) => suave(t, n, 4 * b, 0.014, dst));
          if (vuelta === 1) { // arpegio en la segunda vuelta
            const arp = [acordes[k][0], acordes[k][1], acordes[k][2], acordes[k][1]];
            for (let e = 0; e < 8; e++) piano(t + e * c, arp[e % 4] + 12, c * 1.4, 0.025, dst);
          }
        },
      },
      // Rueda Final: tensa y constante, 128 pulsos por minuto (La m – Fa – Sol – Mi)
      rueda: {
        pulso: 60 / 128, volumen: 0.7, filtro: 4500, eco: 0.12,
        compas(t, i, b, dst) {
          const s = b / 4, k = i % 4, vuelta = Math.floor(i / 4) % 2;
          const acordes = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]];
          const bajos = [33, 29, 31, 28];
          for (let e = 0; e < 8; e++) piano(t + e * (b / 2), bajos[k] + 12, b * 0.45, 0.1, dst); // bajo pulsante (sin graves extremos)
          for (let p = 0; p < 4; p++) { if (p % 2 === 0) golpe(t + p * b, 0.14, dst); else caja(t + p * b, 0.03, dst); }
          for (let e = 0; e < 8; e++) piano(t + e * (b / 2), e % 2 ? 93 : 88, 0.05, 0.012, dst); // tic-tac suave (sin ruido)
          acordes[k].forEach((n) => suave(t, n, 4 * b, 0.018, dst));
          if (vuelta === 1) { // arpegio en la segunda vuelta
            const arp = [...acordes[k], acordes[k][0] + 12];
            for (let e = 0; e < 16; e++) piano(t + e * s, arp[e % 4] + 12, s * 1.5, 0.03, dst);
          }
        },
      },
    };
    const COMPASES = 8;
    const grabados = {};
    // Graba el bucle en un búfer: se tocan 16 compases y se guardan los 8 últimos,
    // que ya incluyen las colas de las notas anteriores, así el empalme no se nota.
    function grabar(tipo) {
      if (grabados[tipo]) return grabados[tipo];
      const B = BUCLES[tipo], sr = ac.sampleRate, largo = COMPASES * 4 * B.pulso;
      const off = new OfflineAudioContext(2, Math.ceil(sr * largo * 2), sr);
      const sub = crear(off, null, true); // instrumentos conectados al contexto de grabación
      const salida = off.createGain(); salida.gain.value = B.volumen;
      const lp = off.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = B.filtro; lp.Q.value = 0.4;
      const eco = off.createDelay(1); eco.delayTime.value = B.pulso * 0.75;
      const fb = off.createGain(); fb.gain.value = B.eco;
      const hp = off.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 120; hp.Q.value = 0.5; // corta los graves extremos
      salida.connect(hp); hp.connect(lp); lp.connect(off.destination);
      lp.connect(eco); eco.connect(fb); fb.connect(eco); fb.connect(off.destination);
      for (let i = 0; i < COMPASES * 2; i++) sub._compas(tipo, i * 4 * B.pulso, i, salida);
      grabados[tipo] = off.startRendering().then((buf) => {
        const ini = Math.floor(sr * largo), n = Math.floor(sr * largo);
        const loop = ac.createBuffer(2, n, sr);
        for (let ch = 0; ch < 2; ch++) loop.getChannelData(ch).set(buf.getChannelData(ch).subarray(ini, ini + n));
        return loop;
      });
      return grabados[tipo];
    }
    function bucle(tipo) {
      if (!BUCLES[tipo]) return { parar() {} };
      const out = ac.createGain();
      out.gain.setValueAtTime(0.0001, ac.currentTime);
      out.connect(master);
      let fuente = null, vivo = true;
      grabar(tipo).then((buf) => {
        if (!vivo) return;
        fuente = ac.createBufferSource(); fuente.buffer = buf; fuente.loop = true;
        fuente.connect(out); fuente.start();
        out.gain.setValueAtTime(0.0001, ac.currentTime);
        out.gain.linearRampToValueAtTime(1, ac.currentTime + 2); // entra con fundido
      });
      return {
        parar() {
          if (!vivo) return;
          vivo = false;
          const t = ac.currentTime;
          out.gain.cancelScheduledValues(t);
          out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), t);
          out.gain.linearRampToValueAtTime(0.0001, t + 0.8); // sale con fundido
          setTimeout(() => { try { fuente && fuente.stop(); } catch (e) {} out.disconnect(); }, 1200);
        },
      };
    }
    // Devuelve el búfer grabado (para escucharlo o probarlo)
    const muestra = (tipo) => grabar(tipo);
    const _compas = (tipo, t, i, dst) => BUCLES[tipo].compas(t, i, BUCLES[tipo].pulso, dst);

    return {
      bucle, muestra, _compas, preparar() { grabar('pregunta'); grabar('rueda'); },
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
