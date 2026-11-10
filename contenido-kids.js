// MODO KIDS — preguntas pensadas para niños de 7 a 12 años.
// Se usa cuando el presentador elige «🧒 Kids». Mismo formato que contenido.js.
// Si una prueba no tiene suficientes preguntas kids, se completa con las normales.
const L = (letra, tipo, pista, ...respuestas) => ({ letra, tipo, pista, respuestas });

// ---------------- Respuesta rápida (la PRIMERA opción es la correcta) ----------------
exports.preguntasRapidasKids = [
  { pregunta: '¿Cuántas patas tiene un insecto?', opciones: ['6', '8', '4', '10'] },
  { pregunta: '¿Cuál es el animal más alto del mundo?', opciones: ['Jirafa', 'Elefante', 'Avestruz', 'Caballo'] },
  { pregunta: '¿Cuántos días tiene una semana?', opciones: ['7', '5', '6', '10'] },
  { pregunta: '¿Cuántos meses tiene un año?', opciones: ['12', '10', '11', '13'] },
  { pregunta: '¿Cuánto es 9 + 6?', opciones: ['15', '14', '16', '13'] },
  { pregunta: '¿Cuánto es la mitad de 20?', opciones: ['10', '5', '15', '2'] },
  { pregunta: '¿Qué figura tiene tres lados?', opciones: ['Triángulo', 'Cuadrado', 'Círculo', 'Rectángulo'] },
  { pregunta: '¿Qué órgano bombea la sangre por el cuerpo?', opciones: ['Corazón', 'Pulmones', 'Estómago', 'Cerebro'] },
  { pregunta: '¿En qué estación del año se caen las hojas de muchos árboles?', opciones: ['Otoño', 'Verano', 'Primavera', 'Invierno'] },
  { pregunta: '¿Qué animal es un mamífero que vuela?', opciones: ['Murciélago', 'Loro', 'Abeja', 'Pingüino'] },
  { pregunta: '¿Con qué sentido sentimos los olores?', opciones: ['Olfato', 'Oído', 'Tacto', 'Vista'] },
  { pregunta: '¿Cuántas horas tiene un día?', opciones: ['24', '12', '20', '30'] },
  { pregunta: '¿Qué toman las abejas de las flores para hacer miel?', opciones: ['Néctar', 'Hojas', 'Agua de lluvia', 'Tierra'] },
  { pregunta: '¿Qué animal pone huevos?', opciones: ['Gallina', 'Perro', 'Gato', 'Vaca'] },
  { pregunta: '¿Qué se usa para mirar las estrellas de lejos?', opciones: ['Telescopio', 'Microscopio', 'Termómetro', 'Brújula'] },
  { pregunta: '¿Cómo se llama el muñeco de madera al que le crece la nariz cuando miente?', opciones: ['Pinocho', 'Peter Pan', 'Aladino', 'Hansel'] },
  { pregunta: '¿Qué planeta es conocido como «el planeta rojo»?', opciones: ['Marte', 'Venus', 'Júpiter', 'Neptuno'] },
  { pregunta: '¿Qué color se forma al mezclar rojo y blanco?', opciones: ['Rosado', 'Morado', 'Verde', 'Café'] },
  { pregunta: '¿Cómo se llama la cría de la vaca?', opciones: ['Ternero', 'Potrillo', 'Cordero', 'Cachorro'] },
  { pregunta: '¿Qué hay que hacer antes de cruzar la calle?', opciones: ['Mirar a ambos lados', 'Correr rápido', 'Cerrar los ojos', 'Saltar'] },
];
exports.preguntasChileKids = [
  { pregunta: '¿Cuál es el baile nacional de Chile?', opciones: ['La cueca', 'El tango', 'La salsa', 'La cumbia'] },
  { pregunta: '¿En qué mes se celebran las Fiestas Patrias en Chile?', opciones: ['Septiembre', 'Diciembre', 'Marzo', 'Julio'] },
  { pregunta: '¿Cómo se llaman las grandes estatuas de piedra de Isla de Pascua?', opciones: ['Moáis', 'Pirámides', 'Tótems', 'Esfinges'] },
  { pregunta: '¿Cuál es la flor nacional de Chile?', opciones: ['Copihue', 'Rosa', 'Tulipán', 'Girasol'] },
  { pregunta: '¿Qué desierto está en el norte de Chile?', opciones: ['Atacama', 'Sahara', 'Gobi', 'Kalahari'] },
  { pregunta: '¿Qué animal acompaña al cóndor en el escudo de Chile?', opciones: ['Huemul', 'Puma', 'Pudú', 'Llama'] },
  { pregunta: '¿Cuántas estrellas tiene la bandera de Chile?', opciones: ['1', '2', '3', '5'] },
  { pregunta: '¿Qué juguete se encumbra en el cielo en Fiestas Patrias?', opciones: ['Volantín', 'Trompo', 'Emboque', 'Yoyó'] },
  { pregunta: '¿Qué comida chilena se rellena con pino?', opciones: ['Empanada', 'Sopaipilla', 'Humita', 'Calzones rotos'] },
  { pregunta: '¿Qué océano baña las costas de Chile?', opciones: ['Pacífico', 'Atlántico', 'Índico', 'Ártico'] },
];

// ---------------- Verdadero o falso ----------------
exports.verdaderoFalsoKids = [
  { texto: 'Los peces respiran bajo el agua gracias a sus branquias.', v: true },
  { texto: 'El Sol gira alrededor de la Tierra.', v: false },
  { texto: 'Las ballenas son peces.', v: false },
  { texto: 'Un triángulo tiene cuatro lados.', v: false },
  { texto: 'Las plantas necesitan luz para crecer.', v: true },
  { texto: 'Los pingüinos pueden volar.', v: false },
  { texto: 'Las mariposas antes de serlo fueron orugas.', v: true },
  { texto: 'Las arañas tienen seis patas.', v: false },
  { texto: 'La Luna tiene luz propia.', v: false },
  { texto: 'Los dinosaurios vivieron al mismo tiempo que las personas.', v: false },
  { texto: 'El agua se congela a 0 °C.', v: true },
  { texto: 'Los murciélagos son aves.', v: false },
  { texto: '5 × 2 es igual a 10.', v: true },
  { texto: 'Los tomates son frutos.', v: true },
];
exports.verdaderoFalsoChileKids = [
  { texto: 'Chile es un país largo y angosto.', v: true },
  { texto: 'En Chile viven pingüinos.', v: true },
  { texto: 'La bandera de Chile tiene una estrella blanca.', v: true },
  { texto: 'La Isla de Pascua está en el océano Atlántico.', v: false },
  { texto: 'El cóndor aparece en el escudo de Chile.', v: true },
  { texto: 'En Chile, la Navidad se celebra en invierno.', v: false },
];

// ---------------- ¿Qué fue antes? ----------------
exports.queFueAntesKids = [
  { a: 'Los dinosaurios', anioA: 'hace millones de años', b: 'Las pirámides de Egipto', anioB: 'hace unos 4.500 años', antes: 'a' },
  { a: 'Invención de la rueda', anioA: 'hace unos 5.500 años', b: 'Invención del automóvil', anioB: '1886', antes: 'a' },
  { a: 'Primer vuelo en avión', anioA: '1903', b: 'Llegada de Colón a América', anioB: '1492', antes: 'b' },
  { a: 'Invención de la radio', anioA: '1895', b: 'Invención de la televisión', anioB: '1927', antes: 'a' },
  { a: 'Llegada del ser humano a la Luna', anioA: '1969', b: 'Creación de la web (internet)', anioB: '1991', antes: 'a' },
  { a: 'Construcción de la Torre Eiffel', anioA: '1889', b: 'Gran Muralla China', anioB: 'hace más de 2.000 años', antes: 'b' },
  { a: 'Primer videojuego para la casa', anioA: '1972', b: 'Invención de la ampolleta eléctrica', anioB: '1879', antes: 'b' },
];
exports.queFueAntesChileKids = [
  { a: 'Fundación de Santiago', anioA: '1541', b: 'Independencia de Chile', anioB: '1818', antes: 'a' },
  { a: 'Mundial de fútbol en Chile', anioA: '1962', b: 'Chile gana su primera Copa América', anioB: '2015', antes: 'a' },
  { a: 'Llegada del ser humano a la Luna', anioA: '1969', b: 'Gabriela Mistral gana el Premio Nobel', anioB: '1945', antes: 'b' },
];

// ---------------- Adivina la cifra ----------------
exports.cifrasKids = [
  { pregunta: '¿Cuántas patas tienen en total 3 perros?', respuesta: 12, unidad: 'patas' },
  { pregunta: '¿Cuántos dientes de leche tiene un niño?', respuesta: 20, unidad: 'dientes' },
  { pregunta: '¿Cuántos días tiene un año que no es bisiesto?', respuesta: 365, unidad: 'días' },
  { pregunta: '¿Cuántas teclas tiene un piano normal?', respuesta: 88, unidad: 'teclas' },
  { pregunta: '¿Cuántos jugadores hay en la cancha en un partido de fútbol, sumando los dos equipos?', respuesta: 22, unidad: 'jugadores' },
  { pregunta: '¿Cuántos centímetros tiene un metro?', respuesta: 100, unidad: 'centímetros' },
  { pregunta: '¿Cuántos planetas tiene el sistema solar?', respuesta: 8, unidad: 'planetas' },
  { pregunta: '¿Cuántos huesos tiene el cuerpo de una persona adulta?', respuesta: 206, unidad: 'huesos' },
  { pregunta: '¿Cuántas cartas tiene un naipe inglés sin comodines?', respuesta: 52, unidad: 'cartas' },
  { pregunta: '¿Cuántos minutos tienen dos horas?', respuesta: 120, unidad: 'minutos' },
];
exports.cifrasChileKids = [
  { pregunta: '¿Cuántas regiones tiene Chile?', respuesta: 16, unidad: 'regiones' },
  { pregunta: '¿En qué día de septiembre se celebra la independencia de Chile?', respuesta: 18, unidad: '' },
];

// ---------------- Adivinanzas ----------------
exports.adivinanzasKids = [
  { texto: 'Una cajita blanca como la cal: todos la saben abrir, nadie la sabe cerrar.', respuestas: ['huevo'] },
  { texto: 'Orejas largas, rabo cortito; corro y salto muy ligerito.', respuestas: ['conejo'] },
  { texto: 'Vuelo de noche, duermo de día, y nunca verás plumas en el ala mía.', respuestas: ['murciélago'] },
  { texto: 'Treinta y dos sillitas blancas en un viejo comedor, y una vieja parlanchina que las pisa sin temor.', respuestas: ['dientes', 'los dientes'] },
  { texto: 'Soy redonda como el mundo; al morir me despedazan, me reducen a pellejo y todo el jugo me sacan.', respuestas: ['naranja'] },
  { texto: 'Tiene corona y no es rey, tiene escamas y no es pez.', respuestas: ['piña'] },
  { texto: 'Cuatro patas tiene y no puede andar; tiene cabecera y no sabe pensar.', respuestas: ['cama'] },
  { texto: 'Blanca como la nieve y dulce como la miel; alegro los pasteles y la leche también.', respuestas: ['azúcar'] },
  { texto: 'Llevo mi casa a cuestas, camino sin tener patas y voy dejando mi huella con un hilito de plata.', respuestas: ['caracol'] },
  { texto: 'Tengo agujas y no sé coser, tengo números y no sé leer.', respuestas: ['reloj'] },
  { texto: 'Oro parece, plata no es; el que no lo adivine, bien tonto es.', respuestas: ['plátano'] },
  { texto: 'Tiene hojas y no es árbol, tiene lomo y no es caballo.', respuestas: ['libro'] },
  { texto: 'Una señorita muy aseñorada, siempre va en coche y siempre está mojada.', respuestas: ['lengua'] },
  { texto: 'Salgo de día, me escondo de noche, y doy luz y calor a todo el mundo.', respuestas: ['sol', 'el sol'] },
];

// ---------------- Siglas y abreviaturas ----------------
exports.siglasKids = [
  { sigla: 'TV', respuestas: ['televisión', 'tele'] },
  { sigla: 'km', respuestas: ['kilómetro', 'kilómetros'] },
  { sigla: 'kg', respuestas: ['kilogramo', 'kilogramos', 'kilo', 'kilos'] },
  { sigla: 'cm', respuestas: ['centímetro', 'centímetros'] },
  { sigla: 'Dr.', respuestas: ['doctor'] },
  { sigla: 'Sra.', respuestas: ['señora'] },
  { sigla: 'pág.', respuestas: ['página'] },
  { sigla: 'Av.', respuestas: ['avenida'] },
  { sigla: 'Prof.', respuestas: ['profesor', 'profesora'] },
  { sigla: 'N, S, E, O', respuestas: ['norte sur este oeste', 'norte, sur, este y oeste', 'norte sur este y oeste'] },
];

// ---------------- Letras revueltas ----------------
exports.letrasRevueltasKids = [
  { pista: 'Animal', palabra: 'Conejo' },
  { pista: 'Juguete', palabra: 'Pelota' },
  { pista: 'Lugar donde se aprende', palabra: 'Escuela' },
  { pista: 'Animal lento', palabra: 'Tortuga' },
  { pista: 'Postre frío', palabra: 'Helado' },
  { pista: 'Animal de cuello largo', palabra: 'Jirafa' },
  { pista: 'Útil escolar', palabra: 'Cuaderno' },
  { pista: 'Fruta', palabra: 'Naranja' },
  { pista: 'Se lleva a la espalda al colegio', palabra: 'Mochila' },
  { pista: 'Animal del mar', palabra: 'Delfín' },
];
exports.letrasRevueltasChileKids = [
  { pista: 'Flor nacional', palabra: 'Copihue' },
  { pista: 'Baile nacional', palabra: 'Cueca' },
  { pista: 'Ave del escudo', palabra: 'Cóndor' },
  { pista: 'Se encumbra en septiembre', palabra: 'Volantín' },
];

// ---------------- Palabra oculta ----------------
exports.palabrasOcultasKids = [
  { pista: 'Animal', palabra: 'Pingüino' },
  { pista: 'Fruta', palabra: 'Frutilla' },
  { pista: 'Color', palabra: 'Amarillo' },
  { pista: 'Útil escolar', palabra: 'Sacapuntas' },
  { pista: 'Dulce', palabra: 'Chocolate' },
  { pista: 'Medio de transporte', palabra: 'Helicóptero' },
  { pista: 'Planeta', palabra: 'Saturno' },
  { pista: 'Deporte', palabra: 'Fútbol' },
  { pista: 'Parte de la casa', palabra: 'Cocina' },
  { pista: 'Animal', palabra: 'Mariposa' },
];
exports.palabrasOcultasChileKids = [
  { pista: 'Comida chilena', palabra: 'Sopaipilla' },
  { pista: 'Animal del escudo', palabra: 'Huemul' },
  { pista: 'Bebida y postre del verano', palabra: 'Mote con huesillo' },
  { pista: 'Isla chilena', palabra: 'Isla de Pascua' },
];

// ---------------- ¿Quién soy? (pistas de la más difícil a la más fácil) ----------------
exports.quienSoyKids = [
  { pistas: ['Vivo en África', 'Como hojas de los árboles más altos', 'Tengo el cuello más largo de todos los animales'], respuestas: ['jirafa', 'la jirafa'] },
  { pistas: ['Tengo plumas pero no vuelo', 'Me encanta el frío', 'Camino como un pato y parece que uso frac'], respuestas: ['pingüino', 'el pingüino'] },
  { pistas: ['Vivo en el mar', 'Si me asusto, lanzo tinta', 'Tengo ocho brazos'], respuestas: ['pulpo', 'el pulpo'] },
  { pistas: ['Soy un planeta', 'Soy el segundo más grande del sistema solar', 'Tengo unos anillos muy famosos'], respuestas: ['saturno'] },
  { pistas: ['Soy una fruta', 'Soy alargada y curva', 'Soy amarilla y a los monos les encanto'], respuestas: ['plátano', 'el plátano', 'banana'] },
  { pistas: ['Soy un insecto', 'Vivo en una colmena', 'Hago miel'], respuestas: ['abeja', 'la abeja'] },
  { pistas: ['Antes fui oruga', 'Me gustan las flores', 'Tengo alas de colores'], respuestas: ['mariposa', 'la mariposa'] },
  { pistas: ['Soy un instrumento', 'Tengo cuerdas por dentro', 'Tengo teclas blancas y negras'], respuestas: ['piano', 'el piano'] },
];
exports.quienSoyChileKids = [
  { pistas: ['Soy un ave', 'Vuelo muy alto en la cordillera', 'Estoy en el escudo de Chile'], respuestas: ['cóndor', 'el cóndor'] },
  { pistas: ['Estoy en medio del océano Pacífico', 'Mi otro nombre es Rapa Nui', 'Tengo estatuas gigantes llamadas moáis'], respuestas: ['isla de pascua', 'rapa nui'] },
  { pistas: ['Soy una flor', 'Soy roja y cuelgo de una enredadera', 'Soy la flor nacional de Chile'], respuestas: ['copihue', 'el copihue'] },
  { pistas: ['Me bailan con pañuelo', 'Suena en las fondas', 'Soy el baile nacional de Chile'], respuestas: ['cueca', 'la cueca'] },
];

// ---------------- Completa el refrán (o la frase) ----------------
exports.refranesKids = [
  { inicio: 'Colorín colorado…', finales: ['este cuento se ha acabado'] },
  { inicio: 'Sana, sana…', finales: ['colita de rana', 'potito de rana', 'colita de rana, si no sanas hoy, sanarás mañana'] },
  { inicio: 'Más vale tarde…', finales: ['que nunca'] },
  { inicio: 'El que busca…', finales: ['encuentra'] },
  { inicio: 'Querer es…', finales: ['poder'] },
  { inicio: 'Perro que ladra…', finales: ['no muerde'] },
  { inicio: 'En boca cerrada…', finales: ['no entran moscas'] },
  { inicio: 'Al mal tiempo…', finales: ['buena cara'] },
  { inicio: 'Ojos que no ven…', finales: ['corazón que no siente'] },
  { inicio: 'Poco a poco…', finales: ['se anda lejos'] },
];
exports.refranesChileKids = [
  { inicio: 'El que se fue a Melipilla…', finales: ['perdió su silla'] },
  { inicio: 'El que se pica…', finales: ['pierde'] },
  { inicio: 'Guagua que no llora…', finales: ['no mama'] },
  { inicio: 'Al que le quede el poncho…', finales: ['que se lo ponga'] },
];

// ---------------- Rueda final (mismo orden de letras que las otras ruedas) ----------------
exports.ruedasKids = [
  [
    L('A', 'empieza', 'Insecto que vive en colmenas y hace miel', 'abeja'),
    L('B', 'empieza', 'El animal más grande del mundo, vive en el mar', 'ballena'),
    L('C', 'empieza', 'Animal de orejas largas que come zanahorias', 'conejo'),
    L('D', 'empieza', 'Mamífero marino muy inteligente que salta sobre las olas', 'delfín'),
    L('E', 'empieza', 'Lugar al que van los niños a aprender', 'escuela', 'escuelita'),
    L('F', 'empieza', 'Parte de la planta, de colores y con perfume, que visitan las abejas', 'flor'),
    L('G', 'empieza', 'Bolsa de goma que se infla en los cumpleaños', 'globo'),
    L('H', 'empieza', 'Postre frío que se come en verano', 'helado'),
    L('I', 'empieza', 'Casa hecha con bloques de hielo', 'iglú'),
    L('J', 'empieza', 'Animal con el cuello más largo del mundo', 'jirafa'),
    L('K', 'empieza', 'Animal australiano que vive en los árboles y come eucalipto', 'koala'),
    L('L', 'empieza', 'Felino con melena al que llaman «el rey de la selva»', 'león'),
    L('M', 'empieza', 'Insecto con alas de colores que antes fue oruga', 'mariposa'),
    L('N', 'empieza', 'Se forma en el cielo con gotitas de agua y de ella cae la lluvia', 'nube'),
    L('Ñ', 'contiene', 'Animal de ocho patas que teje telas', 'araña'),
    L('O', 'empieza', 'Animal que nos da lana', 'oveja'),
    L('P', 'empieza', 'Juguete redondo con el que se juega fútbol', 'pelota', 'pelotita'),
    L('Q', 'empieza', 'Número que viene después del catorce', 'quince'),
    L('R', 'empieza', 'Aparato que marca la hora', 'reloj'),
    L('S', 'empieza', 'Reptil largo que no tiene patas', 'serpiente'),
    L('T', 'empieza', 'Animal lento que lleva su casa a cuestas', 'tortuga'),
    L('U', 'empieza', 'Caballo mágico con un cuerno en la frente', 'unicornio'),
    L('V', 'empieza', 'Animal que nos da leche y hace «muu»', 'vaca'),
    L('W', 'contiene', 'Fruta café y peluda por fuera, verde por dentro', 'kiwi'),
    L('X', 'contiene', 'Prueba que se da en el colegio para ver cuánto aprendiste', 'examen'),
    L('Y', 'empieza', 'Alimento hecho con leche que se come con cuchara', 'yogur', 'yogurt', 'yoghurt'),
    L('Z', 'empieza', 'Verdura naranja que les encanta a los conejos', 'zanahoria'),
  ],
  [
    L('A', 'empieza', 'Arco de colores que aparece en el cielo cuando sale el sol después de la lluvia', 'arcoíris', 'arco iris'),
    L('B', 'empieza', 'Vehículo de dos ruedas que se mueve con pedales', 'bicicleta', 'bici'),
    L('C', 'empieza', 'Útil escolar con hojas para escribir', 'cuaderno'),
    L('D', 'empieza', 'Cubo con puntos del 1 al 6 que se usa en juegos de mesa', 'dado'),
    L('E', 'empieza', 'Punto de luz que brilla en el cielo de noche', 'estrella'),
    L('F', 'empieza', 'Mamífero marino con bigotes que vive en costas frías', 'foca'),
    L('G', 'empieza', 'Instrumento musical de seis cuerdas', 'guitarra'),
    L('H', 'empieza', 'Insecto pequeño que vive en grupo y trabaja en equipo', 'hormiga'),
    L('I', 'empieza', 'La estación más fría del año', 'invierno'),
    L('J', 'empieza', 'Bebida que se hace exprimiendo frutas', 'jugo'),
    L('K', 'empieza', 'Arte marcial japonés con cinturones de colores', 'kárate', 'karate'),
    L('L', 'empieza', 'Sirve para escribir y dibujar, y lo puedes borrar con goma', 'lápiz'),
    L('M', 'empieza', 'Animal que trepa a los árboles y come plátanos', 'mono'),
    L('N', 'empieza', 'Parte de la cara con la que olemos', 'nariz'),
    L('Ñ', 'contiene', 'Figura llena de dulces que se rompe en los cumpleaños', 'piñata'),
    L('O', 'empieza', 'Parte del cuerpo con la que vemos', 'ojo', 'ojos'),
    L('P', 'empieza', 'Ave blanca y negra que no vuela y nada en aguas frías', 'pingüino'),
    L('Q', 'empieza', 'Alimento que se hace con leche y que, en los dibujos animados, les encanta a los ratones', 'queso'),
    L('R', 'empieza', 'Animal verde que salta y croa', 'rana'),
    L('S', 'empieza', 'Mueble que sirve para sentarse', 'silla'),
    L('T', 'empieza', 'Pez grande con muchos dientes afilados', 'tiburón'),
    L('U', 'empieza', 'Parte dura que tenemos en la punta de los dedos', 'uña', 'uñas'),
    L('V', 'empieza', 'Montaña que puede echar lava y fuego', 'volcán'),
    L('W', 'empieza', 'Señal para conectarse a internet sin cables', 'wifi', 'wi-fi'),
    L('X', 'empieza', 'Instrumento con láminas de colores que se toca con baquetas', 'xilófono'),
    L('Y', 'contiene', 'Artista del circo con nariz roja y zapatos enormes', 'payaso'),
    L('Z', 'empieza', 'Animal astuto de cola peluda', 'zorro'),
  ],
];
exports.ruedasChileKids = [
  [
    L('A', 'empieza', 'Cordillera que recorre Chile de norte a sur', 'andes', 'los andes'),
    L('B', 'empieza', 'La de Chile es blanca, azul y roja, con una estrella', 'bandera'),
    L('C', 'empieza', 'Gran ave que aparece en el escudo de Chile', 'cóndor'),
    L('D', 'empieza', 'El de Atacama es el más seco del mundo', 'desierto'),
    L('E', 'empieza', 'Comida chilena de masa rellena con pino', 'empanada'),
    L('F', 'empieza', 'Lugar donde se celebra el 18 con comida, juegos y cueca', 'fonda', 'fondas'),
    L('G', 'empieza', 'Así llamamos en Chile a un bebé', 'guagua'),
    L('H', 'empieza', 'Ciervo que aparece en el escudo de Chile', 'huemul'),
    L('I', 'empieza', 'Rapa Nui es una ___ en medio del océano Pacífico', 'isla'),
    L('J', 'empieza', 'Cangrejo que se come en el chupe chileno', 'jaiba'),
    L('K', 'empieza', 'Pastel con frutas típico del sur de Chile, de origen alemán', 'kuchen'),
    L('L', 'empieza', 'Animal del norte de Chile, pariente del camello pero sin joroba', 'llama', 'llamo'),
    L('M', 'empieza', 'Estatua gigante de piedra de Isla de Pascua', 'moái', 'moai'),
    L('N', 'empieza', 'Apellido del poeta chileno Pablo, que ganó el Premio Nobel', 'neruda'),
    L('Ñ', 'contiene', 'Semilla de la araucaria', 'piñón', 'piñones'),
    L('O', 'empieza', 'En Chile, la comida de la tarde con té y pan', 'once', 'onces'),
    L('P', 'empieza', 'El ciervo más pequeño del mundo, que vive en el sur de Chile', 'pudú'),
    L('Q', 'empieza', 'Pan dulce que se come a la hora de la once', 'queque'),
    L('R', 'empieza', 'Deporte nacional de Chile, con huasos y caballos', 'rodeo'),
    L('S', 'empieza', 'Masa frita y redonda que se come cuando llueve', 'sopaipilla'),
    L('T', 'empieza', 'Juguete que gira gracias a una cuerda', 'trompo'),
    L('U', 'empieza', 'Palo de madera para estirar la masa de las empanadas', 'uslero'),
    L('V', 'empieza', 'Se encumbra en el cielo en septiembre', 'volantín'),
    L('W', 'contiene', 'El chacarero y el barros luco son tipos de ___', 'sándwich', 'sandwich'),
    L('X', 'contiene', 'En Chile, auto negro con techo amarillo que lleva pasajeros', 'taxi', 'taxis'),
    L('Y', 'contiene', 'Lugar con arena y mar donde vamos en vacaciones de verano', 'playa'),
    L('Z', 'empieza', 'Verdura naranja que se le pone a la masa de las sopaipillas', 'zapallo'),
  ],
];
