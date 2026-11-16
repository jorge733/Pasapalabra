# Letramanía

Juego de fiesta por equipos para jugar en la tele. La partida se ve en la tele (a través del Chromecast) y cada jugador usa su **celular como control**: escanea un QR y listo, sin instalar nada.

## Jugar por internet (sin Wi-Fi compartido y sin terminal)

Puedes publicar el juego gratis en [Render](https://render.com). Así los jugadores entran desde el celular **con datos móviles o cualquier Wi-Fi**, y no necesitas tener un computador con la terminal abierta.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jorge733/Pasapalabra)

1. Crea una cuenta en Render entrando con tu cuenta de GitHub.
2. Presiona el botón de arriba. Render leerá el archivo `render.yaml` de este repositorio.
3. Cuando pida **`CLAVE_PRESENTADOR`**, escribe una clave inventada por ti: se pedirá al abrir el panel del presentador para que nadie más pueda manejar la partida.
4. Presiona **Deploy** y espera unos minutos. Render te dará una dirección como `https://letramania-xxxx.onrender.com`.
5. Para jugar: abre `…/tv` en la pantalla que vas a transmitir, `…/host` en tu celular (con la clave) y los jugadores escanean el QR.

Cada vez que se suban cambios a GitHub, Render actualiza el juego solo.

**Ten en cuenta (plan gratuito):**
- Si nadie usa el juego durante 15 minutos, se «duerme». La primera vez que lo abras después, tarda **alrededor de un minuto** en cargar. Abre la página de la tele un rato antes de empezar.
- Mientras se juega no se duerme.
- El historial de preguntas usadas se borra cuando Render reinicia el juego, así que a veces podrían repetirse preguntas.

**Para ver la tele sin computador:** con un celular Android, abre `…/tv` en Chrome y, en la app **Google Home**, elige tu Chromecast → **Transmitir mi pantalla**. Desde un computador, también puedes usar Chrome → ⋮ → **Transmitir… → Transmitir pestaña**, sin abrir ninguna terminal.

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
| 🇨🇱 **Letra a letra** | Por turnos: cada equipo juega solo contra el reloj (90 s) con 15 palabras que contienen dos letras dadas; una pista por palabra. Las acertadas se van apilando. Si falla o pasa, la palabra vuelve al final | 1 s por acierto |
| 🇨🇱 **Pistas que despistan** | Duelo con pulsador: un personaje, objeto o concepto secreto y hasta 5 pistas, de la más difícil a la más fácil | 5 s con la 1.ª pista, 1 s menos por cada pista más |
| 🇨🇱 **La Memoria** | Por turnos (75 s): el equipo elige entre dos temas y memoriza 9 palabras en una columna; luego se tapan y hay que decirlas en orden, de abajo hacia arriba. Un error o un pase la reinicia | 1 s por palabra destapada al final |
| 🇨🇱 **Palabras cruzadas** | Por turnos (75 s): el equipo elige entre dos temas. Las 9 palabras están partidas en dos columnas (p. ej. SAL + MÓN); con la pista hay que juntar las dos mitades | 2 s por acierto |
| 🇨🇱 **Deletrea la palabra** | Por turnos (120 s): 9 palabras sin faltas, 3 con deletreo normal, 3 en el orden al azar que marcan los números y 3 al revés. Con un error se deletrea desde el inicio; no se puede pasar | 1 s (normal o al azar) / 2 s (al revés) |
| 🇨🇱 **Bachillerato** (Tuti Fruti) | Una letra y cuatro categorías que los dos equipos llenan a la vez en el celular (90 s), con «¡Basta!» | Por categoría: 3 s si solo un equipo tiene respuesta válida, 2 s a cada uno si son distintas, 1 s si son iguales |
| 🇨🇱 **Una de cuatro** | Por turnos (45 s): pregunta con cuatro alternativas; acierte o falle, sale otra | 1 s por acierto |
| 🇨🇱 **La palabra vertical** | Un concepto y varias filas relacionadas; sus iniciales forman la palabra vertical | 5 s por fila |
| 🇨🇱 **El Quitaletras** | Letras revueltas con una de más: quitarla y formar la palabra | 8 s |
| **La Rueda Final** | Una palabra por letra (25 letras: sin K ni W). Si fallas o pasas, le toca al otro equipo | Gana quien más acierte |

Las marcadas con 🇨🇱 son pruebas del **Pasapalabra de Chilevisión**, con reglas basadas en el [artículo de Wikipedia del programa](https://es.wikipedia.org/wiki/Pasapalabra_(Chile)) y en el capítulo de estreno de la temporada 2026 (orden de los juegos, tiempos y segundos de cada uno), adaptadas a dos equipos con celulares. Las cinco primeras son, de los siete juegos de esa temporada, las que se pueden jugar sin música (faltan *La pista musical* y *Todos contra todos*, que necesitan canciones). Vienen desactivadas para que la partida no se alargue: actívalas una por una en el panel del presentador o con el botón **«🇨🇱 Solo las del Pasapalabra chileno»** (también hay «Solo las clásicas» y «Todas»). En las pruebas **por turnos** juega un equipo y después el otro (empieza el que tiene más segundos), como en el programa. Su contenido está en [`contenido-pasapalabra.js`](contenido-pasapalabra.js). En el Bachillerato, una respuesta que empieza por la letra pero no está en las listas vale igual (sale con «?»), salvo que el presentador la rechace: durante la revisión, en su panel, puede aceptar o rechazar cada respuesta con un toque, también en modo automático.

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
- **🧒 Kids (7-12)**: preguntas pensadas para niños de 7 a 12 años en todas las pruebas: animales, el cuerpo, números, cuentos, adivinanzas clásicas, abreviaturas fáciles (TV, km, Dr.) y una rueda final con palabras conocidas. Hay más tiempo para pensar y responder, y la rueda parte con 130 segundos en vez de 100.

El contenido difícil está en la sección «NIVEL DIFÍCIL» de [`contenido.js`](contenido.js) y el de Kids en [`contenido-kids.js`](contenido-kids.js). Si una prueba no tiene suficientes preguntas de ese nivel, se completa con las normales. Los tiempos del modo Kids se cambian en `CONFIG_KIDS`, en [`server.js`](server.js).

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

Todo el contenido está en [`contenido.js`](contenido.js), [`contenido-extra.js`](contenido-extra.js) y [`contenido-variedad.js`](contenido-variedad.js) (cine, música, deportes, tecnología, mitología, cocina…): preguntas, palabras ocultas y ruedas de letras, con una sección general y otra chilena (`preguntasChile`, `palabrasOcultasChile`, `ruedasChile`). Añade las tuyas siguiendo el mismo formato (por ejemplo, preguntas sobre tu familia o tus amigos). Las respuestas se comparan sin tildes ni mayúsculas, se admite una errata en palabras de 6 letras o más y puedes poner varias respuestas válidas.

Los tiempos y el número de rondas de cada prueba se cambian en `CONFIG`, al principio de [`server.js`](server.js).

Si el juego no reconoce una respuesta válida (un sinónimo, por ejemplo), el presentador puede presionar **«Dar por buena la última respuesta»**.

## Estructura

| Archivo | Qué es |
|---|---|
| `server.js` | Servidor (Express + Socket.IO): lógica de la partida y reloj |
| `contenido.js` | Preguntas, palabras y ruedas |
| `contenido-variedad.js` | Más preguntas de temas variados para todas las pruebas y niveles |
| `contenido-kids.js` | Contenido del modo Kids (7 a 12 años) |
| `contenido-pasapalabra.js` | Contenido de las pruebas del Pasapalabra chileno |
| `public/tv.html` | Pantalla de la tele |
| `public/play.html` | Control del celular |
| `public/host.html` | Panel del presentador |
