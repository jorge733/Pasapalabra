# Letramanía

Juego de fiesta por equipos para jugar en la tele. La partida se ve en la tele (a través del Chromecast) y cada jugador usa su **celular como control**: escanea un QR y listo, sin instalar nada.

## Actualizar a una versión nueva

En la carpeta del juego, con el juego detenido (`Ctrl + C`):

```bash
git pull
npm install
npm start
```

`npm install` solo hace falta cuando cambian las dependencias, pero no hace daño ejecutarlo siempre.

## Cómo se juega

Dos equipos compiten en varias pruebas cortas para ganar segundos. Después viene **La Rueda Final**, donde cada equipo juega con 100 segundos más los que haya ganado.

| Prueba | Cómo funciona | Premio |
|---|---|---|
| **Respuesta rápida** | Pregunta con 4 opciones | 8 s (con presentador) / 5 + 3 s al más rápido (automático) |
| **Verdadero o falso** | Los dos equipos responden a la vez en el celular | 3 s por acierto |
| **¿Qué fue antes?** | Dos hechos históricos: elegir cuál ocurrió primero | 3 s por acierto |
| **Letras revueltas** | Ordenar las letras para formar la palabra | 8 s |
| **Siglas** | Decir qué significan (ONU, SII, CONAF…) | 8 s |
| **Palabra oculta** | Las letras van apareciendo poco a poco | de 5 a 15 s (cuanto antes, más) |
| **Adivina la cifra** | Cada equipo escribe un número; gana el más cercano | 8 s (exacto: 12 s; empate: 5 s cada uno) |
| **¿Quién soy?** | Tres pistas, cada vez más fáciles | 12 / 8 / 5 s según las pistas usadas |
| **Adivinanzas** | Adivinanzas tradicionales | 8 s |
| **Completa el refrán** | Decir cómo termina el refrán (incluye dichos chilenos) | 8 s |
| **La Rueda Final** | Una palabra por letra. Si fallas o pasas, le toca al otro equipo | Gana quien más acierte |

El presentador elige en su panel qué pruebas se juegan antes de empezar. Si un equipo presiona y falla, el otro puede intentarlo.

## Qué necesitas

- Un computador (Windows, Mac o Linux) conectado a la **misma Wi-Fi** que la tele y los celulares.
- [Node.js](https://nodejs.org) 18 o superior.
- Google Chrome en el computador (para enviar la pantalla al Chromecast).

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
Presentador (en tu computador):            http://192.168.1.50:3000/host
Jugadores (o escanean el QR de la tele):  http://192.168.1.50:3000/play
```

1. **Tele:** abre la dirección `/tv` en Chrome, haz clic en «Presiona para activar el sonido» y luego, en el menú ⋮ de Chrome, elige **Enviar… → tu Chromecast → Enviar pestaña**. Pon la tele en pantalla completa si te lo ofrece.
2. **Presentador:** abre `/host` en otra ventana del computador (o en un celular). Desde ahí empiezas la partida, la pausas, saltas pruebas y haces de juez.
3. **Jugadores:** escanean el QR que sale en la tele, escriben su nombre y eligen equipo.

> **Windows:** la primera vez, el Firewall preguntará si Node.js puede usar la red. Marca «Redes privadas» y acepta; si no, los celulares no podrán conectarse.
>
> Si la dirección detectada no es la buena (por ejemplo, si tienes VPN), puedes indicarla tú: `HOST_IP=192.168.1.50 npm start` (en Windows PowerShell: `$env:HOST_IP="192.168.1.50"; npm start`).

## Modo de juego

En el panel del presentador, antes de empezar, eliges:

- **🎙️ Con presentador** (por defecto): como en la tele. El presentador lee en voz alta las preguntas, pistas y definiciones (también se ven en la tele) y en su panel ve la respuesta correcta, que la tele solo muestra al final. Los jugadores presionan «¡Lo sé!» en el celular y responden **en voz alta**. El presentador marca **✔ Correcto**, **✘ Incorrecto**, **⏭ Paso** o **Nadie la sabe**. También puede usar el teclado: `C` correcto, `X` incorrecto, `P` paso, `N` nadie la sabe.
- **📱 Automático**: las preguntas salen en la tele y los jugadores escriben las respuestas en el celular. El juego corrige solo.

Consejo: con presentador, abre `/host` en tu celular o en un portátil que puedas tener en la mano, para ver la respuesta sin que los jugadores la vean.

## Dificultad

- **🔥 Difícil** (por defecto): preguntas de historia, ciencia, geografía y literatura (por ejemplo, batallas de la independencia, autores chilenos, química o astronomía). La rueda mezcla dos ruedas difíciles (una general y una chilena) para que cada equipo tenga definiciones distintas.
- **🙂 Normal**: preguntas de cultura general más sencillas, buenas para jugar con niños.

El contenido difícil está en la sección «NIVEL DIFÍCIL» de [`contenido.js`](contenido.js). Si una prueba no tiene suficientes preguntas difíciles, se completa con las normales.

## Temática

En el panel del presentador, antes de empezar, puedes elegir:

- **🎲 Mixto** (por defecto): mezcla preguntas generales y chilenas. La rueda final se sortea entre las generales y las chilenas, y los dos equipos reciben ruedas del mismo tipo.
- **🇨🇱 Solo Chile**: 20 preguntas, 12 palabras ocultas y 2 ruedas completas sobre Chile (comida, lugares, música, historia y chilenismos).
- **🌍 General**: cultura general, sin temática chilena.

## Variedad entre partidas

El juego **recuerda qué preguntas ya salieron** y no las repite hasta haber usado todas las de esa categoría; después vuelve a empezar. Lo guarda en el archivo `historial.json` (junto a `server.js`), así que lo recuerda aunque cierres el juego. Para empezar de cero, borra ese archivo.

La Rueda Final se arma **letra a letra**: para cada letra se elige entre todas las definiciones disponibles (de todas las ruedas del tema y la dificultad elegidos), dando una distinta a cada equipo. Así cada rueda es una combinación nueva.

Cuantas más preguntas añadas en `contenido.js`, más tardarán en repetirse.

## Personalizarlo

Todo el contenido está en [`contenido.js`](contenido.js) y [`contenido-extra.js`](contenido-extra.js): preguntas, palabras ocultas y ruedas de letras, con una sección general y otra chilena (`preguntasChile`, `palabrasOcultasChile`, `ruedasChile`). Añade las tuyas siguiendo el mismo formato (por ejemplo, preguntas sobre tu familia o tus amigos). Las respuestas se comparan sin tildes ni mayúsculas, se admite una errata en palabras de 6 letras o más y puedes poner varias respuestas válidas.

Los tiempos y el número de rondas de cada prueba se cambian en `CONFIG`, al principio de [`server.js`](server.js).

Si el juego no reconoce una respuesta válida (un sinónimo, por ejemplo), el presentador puede presionar **«Dar por buena la última respuesta»**.

## Estructura

| Archivo | Qué es |
|---|---|
| `server.js` | Servidor (Express + Socket.IO): lógica de la partida y reloj |
| `contenido.js` | Preguntas, palabras y ruedas |
| `public/tv.html` | Pantalla de la tele |
| `public/play.html` | Control del celular |
| `public/host.html` | Panel del presentador |
