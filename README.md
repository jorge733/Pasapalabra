# Letramanía

Juego de fiesta por equipos para jugar en la tele. La partida se ve en la tele (a través del Chromecast) y cada jugador usa su **móvil como mando**: escanea un QR y listo, sin instalar nada.

## Cómo se juega

Dos equipos compiten en tres pruebas:

1. **Respuesta rápida**: preguntas con 4 opciones. Acertar suma 5 segundos y el equipo más rápido gana 3 más.
2. **Palabra oculta**: las letras de una palabra van apareciendo. El primer equipo que pulsa «¡La sé!» y la escribe bien gana segundos (más cuanto antes la acierte).
3. **La Rueda Final**: una palabra por cada letra del abecedario («empieza por…» o «contiene la…»). Cada equipo empieza con 100 segundos más los que ganó antes. Si fallas o dices «Paso», le toca al otro equipo. Gana quien más palabras acierte (en caso de empate, quien menos falle).

## Qué necesitas

- Un ordenador (Windows, Mac o Linux) conectado a la **misma Wi-Fi** que la tele y los móviles.
- [Node.js](https://nodejs.org) 18 o superior.
- Google Chrome en el ordenador (para enviar la pantalla al Chromecast).

## Puesta en marcha

```bash
git clone https://github.com/jorge733/Pasapalabra.git
cd Pasapalabra
npm install
npm start
```

La terminal mostrará tres direcciones, por ejemplo:

```
Tele (envía esta pestaña al Chromecast): http://192.168.1.50:3000/tv
Presentador (en tu ordenador):            http://192.168.1.50:3000/host
Jugadores (o escanean el QR de la tele):  http://192.168.1.50:3000/play
```

1. **Tele:** abre la dirección `/tv` en Chrome, haz clic en «Pulsa para activar el sonido» y luego, en el menú ⋮ de Chrome, elige **Enviar… → tu Chromecast → Enviar pestaña**. Pon la tele en pantalla completa si te lo ofrece.
2. **Presentador:** abre `/host` en otra ventana del ordenador (o en un móvil). Desde ahí empiezas la partida, la pausas, saltas pruebas y haces de juez.
3. **Jugadores:** escanean el QR que sale en la tele, escriben su nombre y eligen equipo.

> **Windows:** la primera vez, el Firewall preguntará si Node.js puede usar la red. Marca «Redes privadas» y acepta; si no, los móviles no podrán conectarse.
>
> Si la dirección detectada no es la buena (por ejemplo, si tienes VPN), puedes indicarla tú: `HOST_IP=192.168.1.50 npm start` (en Windows PowerShell: `$env:HOST_IP="192.168.1.50"; npm start`).

## Modo de juego

En el panel del presentador, antes de empezar, eliges:

- **🎙️ Con presentador** (por defecto): como en la tele. El presentador lee las preguntas, pistas y definiciones desde su panel (la tele **no** las muestra) y ve la respuesta correcta. Los jugadores pulsan «¡La sé!» en el móvil y responden **en voz alta**. El presentador marca **✔ Correcto**, **✘ Incorrecto**, **⏭ Paso** o **Nadie la sabe**. También puede usar el teclado: `C` correcto, `X` incorrecto, `P` paso, `N` nadie la sabe.
- **📱 Automático**: las preguntas salen en la tele y los jugadores escriben las respuestas en el móvil. El juego corrige solo.

Consejo: con presentador, abre `/host` en tu móvil o en un portátil que puedas tener en la mano, para leer sin que los jugadores vean la respuesta.

## Temática

En el panel del presentador, antes de empezar, puedes elegir:

- **🎲 Mixto** (por defecto): mezcla preguntas generales y chilenas. La rueda final se sortea entre las generales y las chilenas, y los dos equipos reciben ruedas del mismo tipo.
- **🇨🇱 Solo Chile**: 20 preguntas, 12 palabras ocultas y 2 ruedas completas sobre Chile (comida, lugares, música, historia y chilenismos).
- **🌍 General**: cultura general, sin temática chilena.

## Personalizarlo

Todo el contenido está en [`contenido.js`](contenido.js): preguntas, palabras ocultas y ruedas de letras, con una sección general y otra chilena (`preguntasChile`, `palabrasOcultasChile`, `ruedasChile`). Añade las tuyas siguiendo el mismo formato (por ejemplo, preguntas sobre tu familia o tus amigos). Las respuestas se comparan sin tildes ni mayúsculas, se admite una errata en palabras de 6 letras o más y puedes poner varias respuestas válidas.

Los tiempos y el número de preguntas se cambian en `CONFIG`, al principio de [`server.js`](server.js).

Si el juego no reconoce una respuesta válida (un sinónimo, por ejemplo), el presentador puede pulsar **«Dar por buena la última respuesta»**.

## Estructura

| Archivo | Qué es |
|---|---|
| `server.js` | Servidor (Express + Socket.IO): lógica de la partida y reloj |
| `contenido.js` | Preguntas, palabras y ruedas |
| `public/tv.html` | Pantalla de la tele |
| `public/play.html` | Mando del móvil |
| `public/host.html` | Panel del presentador |
