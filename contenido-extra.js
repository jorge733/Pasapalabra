// Contenido adicional. Se suma automáticamente al de contenido.js (mismo formato).
// Puedes añadir aquí tus propias preguntas.
const L = (letra, tipo, pista, ...respuestas) => ({ letra, tipo, pista, respuestas });

// ---------------- Respuesta rápida (la PRIMERA opción es la correcta) ----------------
exports.preguntasRapidas = [
  { pregunta: '¿Cuál es el animal más grande del mundo?', opciones: ['Ballena azul', 'Elefante africano', 'Tiburón ballena', 'Jirafa'] },
  { pregunta: '¿Cuántas patas tiene una araña?', opciones: ['8', '6', '10', '12'] },
  { pregunta: '¿Qué color se obtiene al mezclar azul y amarillo?', opciones: ['Verde', 'Morado', 'Naranja', 'Café'] },
  { pregunta: '¿Cuál es el planeta más cercano al Sol?', opciones: ['Mercurio', 'Venus', 'Marte', 'La Tierra'] },
  { pregunta: '¿Cuántos minutos dura un partido de fútbol sin alargue?', opciones: ['90', '80', '100', '120'] },
  { pregunta: '¿En qué país están las pirámides de Guiza?', opciones: ['Egipto', 'México', 'Perú', 'Grecia'] },
  { pregunta: '¿Qué instrumento mide la temperatura?', opciones: ['Termómetro', 'Barómetro', 'Velocímetro', 'Brújula'] },
  { pregunta: '¿Cuál es el idioma oficial de Brasil?', opciones: ['Portugués', 'Español', 'Inglés', 'Francés'] },
  { pregunta: '¿Cuántos colores tiene el arcoíris?', opciones: ['7', '5', '6', '8'] },
  { pregunta: '¿Cuál es el hueso más largo del cuerpo humano?', opciones: ['Fémur', 'Tibia', 'Húmero', 'Radio'] },
  { pregunta: '¿Qué país tiene forma de bota?', opciones: ['Italia', 'España', 'Grecia', 'Portugal'] },
  { pregunta: '¿Qué animal es conocido como «el rey de la selva»?', opciones: ['León', 'Tigre', 'Elefante', 'Gorila'] },
];
exports.preguntasChile = [
  { pregunta: '¿Qué colores tiene la bandera de Chile?', opciones: ['Blanco, azul y rojo', 'Rojo y amarillo', 'Azul y blanco', 'Verde, blanco y rojo'] },
  { pregunta: '¿Cómo se llama el palacio de gobierno de Chile?', opciones: ['La Moneda', 'La Casa Rosada', 'Cerro Castillo', 'Palacio Cousiño'] },
  { pregunta: '¿En qué ciudad se realiza el festival de la canción más famoso de Chile?', opciones: ['Viña del Mar', 'Santiago', 'La Serena', 'Valparaíso'] },
  { pregunta: '¿De qué fruta se hace el pisco?', opciones: ['Uva', 'Manzana', 'Durazno', 'Pera'] },
  { pregunta: '¿Cómo se llama el pan con vienesa, palta, tomate y mayonesa?', opciones: ['Completo', 'Chacarero', 'Barros Luco', 'Churrasco'] },
  { pregunta: '¿Qué sándwich chileno lleva carne y porotos verdes?', opciones: ['Chacarero', 'Barros Jarpa', 'Completo', 'Lomito'] },
  { pregunta: '¿Qué animal es el pudú?', opciones: ['Un ciervo pequeño', 'Un ave', 'Un roedor', 'Un pez'] },
  { pregunta: '¿Cuál es la región más poblada de Chile?', opciones: ['Metropolitana', 'Valparaíso', 'Biobío', 'La Araucanía'] },
  { pregunta: '¿Qué cerro de Santiago tiene funicular y zoológico?', opciones: ['San Cristóbal', 'Santa Lucía', 'Manquehue', 'Renca'] },
  { pregunta: '¿Cómo se llama el trago de pisco con limón?', opciones: ['Pisco sour', 'Piscola', 'Cola de mono', 'Terremoto'] },
  { pregunta: '¿Qué instrumento acompaña tradicionalmente la cueca junto a la guitarra?', opciones: ['Pandero', 'Violín', 'Flauta traversa', 'Saxofón'] },
  { pregunta: '¿Cuál es el pueblo originario más numeroso de Chile?', opciones: ['Mapuche', 'Aymara', 'Rapanui', 'Diaguita'] },
];
exports.preguntasRapidasDificil = [
  { pregunta: '¿Qué científico propuso la evolución por selección natural?', opciones: ['Charles Darwin', 'Gregor Mendel', 'Louis Pasteur', 'Alfred Nobel'] },
  { pregunta: '¿En qué año comenzó la Primera Guerra Mundial?', opciones: ['1914', '1918', '1939', '1905'] },
  { pregunta: '¿Qué escritor creó a Don Quijote?', opciones: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Francisco de Quevedo'] },
  { pregunta: '¿Cuál es la velocidad aproximada de la luz?', opciones: ['300.000 km/s', '30.000 km/s', '3.000 km/s', '3 millones de km/s'] },
  { pregunta: '¿Qué país tiene más husos horarios, contando sus territorios de ultramar?', opciones: ['Francia', 'Rusia', 'Estados Unidos', 'China'] },
  { pregunta: '¿Quién pintó «La noche estrellada»?', opciones: ['Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Edvard Munch'] },
  { pregunta: '¿Cuál es la capital de Canadá?', opciones: ['Ottawa', 'Toronto', 'Montreal', 'Vancouver'] },
  { pregunta: '¿Qué vitamina produce la piel al recibir luz solar?', opciones: ['Vitamina D', 'Vitamina C', 'Vitamina A', 'Vitamina B12'] },
  { pregunta: '¿Qué civilización construyó Machu Picchu?', opciones: ['Inca', 'Maya', 'Azteca', 'Olmeca'] },
  { pregunta: '¿Qué metal es líquido a temperatura ambiente?', opciones: ['Mercurio', 'Plomo', 'Estaño', 'Aluminio'] },
  { pregunta: '¿Cuál es el planeta con más lunas conocidas?', opciones: ['Saturno', 'Júpiter', 'Urano', 'Neptuno'] },
  { pregunta: '¿Qué país regaló la Estatua de la Libertad a Estados Unidos?', opciones: ['Francia', 'Reino Unido', 'España', 'Italia'] },
];
exports.preguntasChileDificil = [
  { pregunta: '¿En qué año se formó la Primera Junta Nacional de Gobierno?', opciones: ['1810', '1818', '1808', '1814'] },
  { pregunta: '¿Quién presidió la Primera Junta Nacional de Gobierno?', opciones: ['Mateo de Toro y Zambrano', "Bernardo O'Higgins", 'José Miguel Carrera', 'Juan Martínez de Rozas'] },
  { pregunta: '¿Qué guerra enfrentó a Chile con Perú y Bolivia entre 1879 y 1884?', opciones: ['Guerra del Pacífico', 'Guerra de Arauco', 'Guerra Civil de 1891', 'Guerra contra la Confederación'] },
  { pregunta: '¿Qué presidente se quitó la vida tras la guerra civil de 1891?', opciones: ['José Manuel Balmaceda', 'Federico Errázuriz', 'Domingo Santa María', 'Aníbal Pinto'] },
  { pregunta: '¿En qué año fue el plebiscito del «Sí» y el «No»?', opciones: ['1988', '1989', '1990', '1980'] },
  { pregunta: '¿Qué película chilena ganó el Óscar a la mejor película extranjera?', opciones: ['Una mujer fantástica', 'No', 'Machuca', 'El club'] },
  { pregunta: '¿Qué cortometraje chileno ganó el Óscar de animación en 2016?', opciones: ['Historia de un oso', 'Bestia', 'Ana y Bruno', 'Ogú y Mampato'] },
  { pregunta: '¿Cuál es la capital de la región de Los Ríos?', opciones: ['Valdivia', 'Osorno', 'Puerto Montt', 'La Unión'] },
  { pregunta: '¿Qué chileno fue uno de los goleadores del Mundial de 1962?', opciones: ['Leonel Sánchez', 'Elías Figueroa', 'Iván Zamorano', 'Carlos Caszely'] },
  { pregunta: '¿Cómo se llama el gran telescopio europeo del cerro Paranal?', opciones: ['VLT', 'ALMA', 'Gemini', 'Hubble'] },
  { pregunta: '¿Qué isla acompaña a Robinson Crusoe en el archipiélago Juan Fernández?', opciones: ['Alejandro Selkirk', 'Isla Mocha', 'Isla Quiriquina', 'Isla Navarino'] },
  { pregunta: '¿Qué tenistas chilenos ganaron el oro en dobles en Atenas 2004?', opciones: ['Massú y González', 'Ríos y Massú', 'González y Jarry', 'Garín y Jarry'] },
];

// ---------------- Verdadero o falso ----------------
exports.verdaderoFalso = [
  { texto: 'Los delfines respiran aire.', v: true },
  { texto: 'El Sol sale por el oeste.', v: false },
  { texto: 'El estómago de las vacas tiene cuatro compartimentos.', v: true },
  { texto: 'El hielo flota en el agua.', v: true },
  { texto: 'Los camellos guardan agua en sus jorobas.', v: false },
  { texto: 'La Luna tiene luz propia.', v: false },
  { texto: 'Las plantas necesitan luz para hacer la fotosíntesis.', v: true },
  { texto: 'Los pulpos tienen ocho brazos.', v: true },
  { texto: 'Las serpientes tienen párpados.', v: false },
  { texto: 'Las abejas mueren después de picar a una persona.', v: true },
];
exports.verdaderoFalsoChile = [
  { texto: 'El cóndor aparece en el escudo de Chile.', v: true },
  { texto: 'La Isla de Pascua está en el océano Atlántico.', v: false },
  { texto: 'El Festival de Viña se hace en invierno.', v: false },
  { texto: 'La empanada de pino lleva carne.', v: true },
  { texto: 'El desierto de Atacama está en el sur de Chile.', v: false },
  { texto: 'El huemul es un animal en peligro de extinción.', v: true },
  { texto: 'La cordillera de los Andes separa a Chile de Argentina.', v: true },
  { texto: 'En Chile, el 18 de septiembre se celebra la Navidad.', v: false },
  { texto: 'El Metro de Santiago se inauguró en la década de 1970.', v: true },
  { texto: 'Punta Arenas está en la región de Magallanes.', v: true },
];
exports.verdaderoFalsoDificil = [
  { texto: 'Los murciélagos son ciegos.', v: false },
  { texto: 'Australia es más ancha que el diámetro de la Luna.', v: true },
  { texto: 'Un rayo nunca cae dos veces en el mismo lugar.', v: false },
  { texto: 'Un pulpo tiene tres corazones.', v: true },
  { texto: 'Cleopatra vivió más cerca de la llegada a la Luna que de la construcción de la Gran Pirámide.', v: true },
  { texto: 'Los plátanos son ligeramente radiactivos.', v: true },
  { texto: 'El cuello de una jirafa tiene más vértebras que el de una persona.', v: false },
  { texto: 'El vidrio es un líquido que fluye muy lentamente.', v: false },
  { texto: 'El monte Everest está en la frontera entre Nepal y China.', v: true },
  { texto: 'El oro es un buen conductor de la electricidad.', v: true },
];
exports.verdaderoFalsoChileDificil = [
  { texto: 'Chile se define a sí mismo como un país tricontinental.', v: true },
  { texto: 'La Universidad de Chile se fundó en 1842.', v: true },
  { texto: 'Chile ganó medallas de oro en tenis en Atenas 2004.', v: true },
  { texto: 'Iquique pertenecía a Perú antes de la Guerra del Pacífico.', v: true },
  { texto: 'El cerro Santa Lucía se llamaba originalmente Huelén.', v: true },
  { texto: 'Rapa Nui está más cerca de Tahití que de la costa chilena.', v: false },
  { texto: 'El volcán Llaima está en la región de Los Lagos.', v: false },
  { texto: 'La Antártica chilena forma parte de la región de Magallanes.', v: true },
  { texto: 'Pedro de Valdivia fundó Santiago en 1536.', v: false },
  { texto: 'El primer Director Supremo de Chile fue Bernardo O\'Higgins.', v: false },
];

// ---------------- Letras revueltas ----------------
exports.letrasRevueltas = [
  { pista: 'Animal', palabra: 'Jirafa' }, { pista: 'Utensilio', palabra: 'Cuchara' },
  { pista: 'Transporte', palabra: 'Bicicleta' }, { pista: 'Fruta', palabra: 'Naranja' },
  { pista: 'Arte', palabra: 'Pintura' }, { pista: 'Lugar', palabra: 'Hospital' },
  { pista: 'Calzado', palabra: 'Zapato' }, { pista: 'Juguete', palabra: 'Muñeca' },
];
exports.letrasRevueltasChile = [
  { pista: 'Salsa', palabra: 'Pebre' }, { pista: 'Comida', palabra: 'Sopaipilla' },
  { pista: 'Ciudad', palabra: 'Valdivia' }, { pista: 'Ciudad', palabra: 'Arica' },
  { pista: 'Comida', palabra: 'Cazuela' }, { pista: 'Ave', palabra: 'Cóndor' },
  { pista: 'Isla', palabra: 'Chiloé' }, { pista: 'Baile', palabra: 'Cueca' },
];
exports.letrasRevueltasDificil = [
  { pista: 'Instrumento', palabra: 'Termómetro' }, { pista: 'Instrumento', palabra: 'Telescopio' },
  { pista: 'Libro', palabra: 'Diccionario' }, { pista: 'Lugar', palabra: 'Universidad' },
  { pista: 'Animal', palabra: 'Ornitorrinco' }, { pista: 'Mar', palabra: 'Mediterráneo' },
];
exports.letrasRevueltasChileDificil = [
  { pista: 'Ciudad', palabra: 'Talcahuano' }, { pista: 'Ciudad', palabra: 'Quillota' },
  { pista: 'Región', palabra: 'Patagonia' }, { pista: 'Ciudad', palabra: 'Concepción' },
  { pista: 'Alga', palabra: 'Cochayuyo' }, { pista: 'Pueblo originario', palabra: 'Rapanui' },
];

// ---------------- Palabra oculta ----------------
exports.palabrasOcultas = [
  { pista: 'Objeto', palabra: 'Computador' }, { pista: 'Animal', palabra: 'Dinosaurio' },
  { pista: 'Estación del año', palabra: 'Primavera' }, { pista: 'Comida', palabra: 'Mantequilla' },
  { pista: 'Objeto', palabra: 'Paraguas' }, { pista: 'Fiesta', palabra: 'Carnaval' },
  { pista: 'Ropa', palabra: 'Calcetín' }, { pista: 'Monumento', palabra: 'Pirámide' },
];
exports.palabrasOcultasChile = [
  { pista: 'Comida', palabra: 'Completo' }, { pista: 'Comida', palabra: 'Chorrillana' },
  { pista: 'Comida', palabra: 'Porotos granados' }, { pista: 'Cerro de Santiago', palabra: 'Santa Lucía' },
  { pista: 'Palacio', palabra: 'La Moneda' }, { pista: 'Isla', palabra: 'Rapa Nui' },
  { pista: 'Trago', palabra: 'Pisco sour' }, { pista: 'Parque nacional', palabra: 'Torres del Paine' },
];
exports.palabrasOcultasDificil = [
  { pista: 'Profesión', palabra: 'Otorrinolaringólogo' }, { pista: 'Ciencia', palabra: 'Biodiversidad' },
  { pista: 'Geometría', palabra: 'Circunferencia' }, { pista: 'Geometría', palabra: 'Paralelepípedo' },
  { pista: 'Examen médico', palabra: 'Electrocardiograma' }, { pista: 'Músculo del cuello', palabra: 'Esternocleidomastoideo' },
];
exports.palabrasOcultasChileDificil = [
  { pista: 'Lugar turístico', palabra: 'Valle de la Luna' }, { pista: 'Lugar turístico', palabra: 'Cajón del Maipo' },
  { pista: 'Ciudad', palabra: 'Puerto Natales' }, { pista: 'Parque nacional', palabra: 'Laguna San Rafael' },
  { pista: 'Escultura', palabra: 'Mano del Desierto' }, { pista: 'Glaciar', palabra: 'Glaciar Grey' },
];

// ---------------- ¿Quién soy? ----------------
exports.quienSoy = [
  { pistas: ['Vivo en colmenas', 'Bailo para avisar dónde hay flores', 'Fabrico miel'], respuestas: ['abeja'] },
  { pistas: ['Aparezco cuando llueve y hay sol', 'Tengo siete colores', 'Tengo forma de arco'], respuestas: ['arcoíris', 'arco iris'] },
  { pistas: ['Soy un ave, pero no vuelo', 'Nado muy bien', 'Parece que voy vestido de etiqueta'], respuestas: ['pingüino'] },
  { pistas: ['Uso casco y uniforme', 'Subo por escaleras muy largas', 'Apago incendios'], respuestas: ['bombero', 'bombera'] },
  { pistas: ['Tengo pantalla', 'Me llevas en el bolsillo', 'Sirvo para llamar y mandar mensajes'], respuestas: ['celular', 'teléfono', 'teléfono celular'] },
  { pistas: ['Puedo dormir durante siglos', 'Tengo un cráter', 'Expulso lava'], respuestas: ['volcán'] },
];
exports.quienSoyChile = [
  { pistas: ['Vivo en la cordillera', 'Tengo un collar de plumas blancas', 'Aparezco en el escudo de Chile'], respuestas: ['cóndor'] },
  { pistas: ['Me hornean o me fríen', 'Por dentro llevo pino, aceituna y huevo', 'No puedo faltar para el 18'], respuestas: ['empanada'] },
  { pistas: ['Me bailan con pañuelo', 'Tengo zapateo', 'Soy el baile nacional'], respuestas: ['cueca'] },
  { pistas: ['Estoy hecho de piedra volcánica', 'La mayoría miramos hacia el interior de la isla', 'Me encuentras en Rapa Nui'], respuestas: ['moái'] },
  { pistas: ['Uso chupalla', 'Llevo manta y espuelas', 'Soy el hombre de campo chileno'], respuestas: ['huaso'] },
  { pistas: ['Soy pequeño y tímido', 'Vivo en los bosques del sur', 'Soy uno de los ciervos más pequeños del mundo'], respuestas: ['pudú'] },
];
exports.quienSoyDificil = [
  { pistas: ['Pasé 27 años en prisión', 'Gané el Nobel de la Paz', 'Fui el primer presidente negro de Sudáfrica'], respuestas: ['nelson mandela', 'mandela'] },
  { pistas: ['Nací en Stratford-upon-Avon', 'Escribí sonetos y obras de teatro', 'Escribí «Romeo y Julieta»'], respuestas: ['william shakespeare', 'shakespeare'] },
  { pistas: ['Fui profesor en Cambridge', 'Construí un telescopio reflector', 'Formulé la ley de la gravitación universal'], respuestas: ['isaac newton', 'newton'] },
  { pistas: ['Fui piloto de pruebas', 'Viajé en el Apolo 11', 'Fui el primer ser humano en pisar la Luna'], respuestas: ['neil armstrong', 'armstrong'] },
  { pistas: ['Hablaba varios idiomas', 'Me relacioné con Julio César y Marco Antonio', 'Fui la última reina del Egipto ptolemaico'], respuestas: ['cleopatra'] },
];
exports.quienSoyChileDificil = [
  { pistas: ['Jugué en Peñarol y en el Internacional de Porto Alegre', 'Me eligieron tres veces el mejor jugador de América', 'Muchos me consideran el mejor defensa chileno de la historia'], respuestas: ['elías figueroa', 'figueroa'] },
  { pistas: ['Me apodaban «Bam Bam»', 'Jugué en el Real Madrid y en el Inter', 'Gané el bronce olímpico en Sídney 2000'], respuestas: ['iván zamorano', 'zamorano'] },
  { pistas: ['Fui médico', 'Fui senador durante muchos años', 'Fui presidente de Chile entre 1970 y 1973'], respuestas: ['salvador allende', 'allende'] },
  { pistas: ['Soy médica', 'Fui Alta Comisionada de la ONU para los Derechos Humanos', 'Fui la primera mujer presidenta de Chile'], respuestas: ['michelle bachelet', 'bachelet'] },
  { pistas: ['Fui comerciante', 'Como ministro organicé el Estado en el siglo XIX', 'Me fusilaron en 1837 cerca de Valparaíso'], respuestas: ['diego portales', 'portales'] },
];

// ---------------- Completa el refrán ----------------
exports.refranes = [
  { inicio: 'Más vale tarde…', finales: ['que nunca'] },
  { inicio: 'Al mal tiempo…', finales: ['buena cara'] },
  { inicio: 'Zapatero…', finales: ['a tus zapatos'] },
  { inicio: 'Ojo por ojo…', finales: ['diente por diente'] },
  { inicio: 'El que busca…', finales: ['encuentra'] },
  { inicio: 'Poco a poco…', finales: ['se anda lejos'] },
];
exports.refranesChile = [
  { inicio: 'Cada uno se rasca…', finales: ['con sus propias uñas'] },
  { inicio: 'A la fuerza…', finales: ['ni los zapatos entran'] },
  { inicio: 'El que roba a un ladrón…', finales: ['tiene cien años de perdón'] },
  { inicio: 'Más vale prevenir…', finales: ['que curar'] },
  { inicio: 'Guagua que no llora…', finales: ['no mama'] },
  { inicio: 'El que se pica…', finales: ['pierde'] },
];
exports.refranesDificil = [
  { inicio: 'Genio y figura…', finales: ['hasta la sepultura'] },
  { inicio: 'Por la boca…', finales: ['muere el pez'] },
  { inicio: 'A rey muerto…', finales: ['rey puesto'] },
  { inicio: 'Muerto el perro…', finales: ['se acabó la rabia'] },
];

// ---------------- Rueda final: dos ruedas normales más ----------------
exports.ruedas = [[
  L('A', 'empieza', 'Insecto que fabrica miel', 'abeja'),
  L('B', 'empieza', 'Calzado alto que se usa para la lluvia', 'bota', 'botas'),
  L('C', 'empieza', 'Lugar donde se ven películas en pantalla grande', 'cine'),
  L('D', 'empieza', 'Juego de fichas con puntos del 0 al 6', 'dominó'),
  L('E', 'empieza', 'Lugar donde estudian los niños', 'escuela'),
  L('F', 'empieza', 'Poste con una luz para alumbrar la calle', 'farol'),
  L('G', 'empieza', 'Ave macho que canta al amanecer', 'gallo'),
  L('H', 'empieza', 'Postre frío y cremoso', 'helado'),
  L('I', 'empieza', 'Reptil verde con una cresta en el lomo', 'iguana'),
  L('J', 'empieza', 'Persona que participa en un juego o deporte', 'jugador', 'jugadora'),
  L('K', 'empieza', 'Animal australiano que come hojas de eucalipto', 'koala'),
  L('L', 'empieza', 'Objeto con el que escribes y que se puede borrar', 'lápiz'),
  L('M', 'empieza', 'Fruta roja o verde del cuento de Blancanieves', 'manzana'),
  L('N', 'empieza', 'Parte de la cara con la que olemos', 'nariz'),
  L('Ñ', 'contiene', 'Lo que haces cuando duermes y ves imágenes', 'soñar'),
  L('O', 'empieza', 'Animal que nos da lana', 'oveja'),
  L('P', 'empieza', 'Comida italiana redonda con queso y salsa de tomate', 'pizza'),
  L('Q', 'empieza', 'Sombrilla grande para la playa', 'quitasol'),
  L('R', 'empieza', 'Anfibio verde que salta y croa', 'rana'),
  L('S', 'empieza', 'Fruta grande, verde por fuera y roja por dentro', 'sandía'),
  L('T', 'empieza', 'Pez grande con aletas y muchos dientes', 'tiburón'),
  L('U', 'empieza', 'El primer número natural', 'uno'),
  L('V', 'empieza', 'Abertura en la pared por donde entra la luz', 'ventana'),
  L('W', 'empieza', 'Conexión inalámbrica a internet', 'wifi', 'wi-fi'),
  L('X', 'contiene', 'Prueba que se da en el colegio', 'examen'),
  L('Y', 'empieza', 'Juguete que sube y baja por un hilo', 'yoyó', 'yoyo'),
  L('Z', 'empieza', 'Calzado deportivo', 'zapatilla', 'zapatillas'),
]];
exports.ruedasChile = [[
  L('A', 'empieza', 'Árbol del sur cuyas semillas son los piñones', 'araucaria'),
  L('B', 'empieza', 'Emblema nacional con una estrella blanca', 'bandera'),
  L('C', 'empieza', 'Maíz tierno, en Chile', 'choclo'),
  L('D', 'empieza', 'Mamífero marino inteligente; en Chile hay una especie propia', 'delfín'),
  L('E', 'empieza', 'La de la bandera chilena es blanca y solitaria', 'estrella'),
  L('F', 'empieza', 'Fruta roja que en otros países se llama fresa', 'frutilla'),
  L('G', 'empieza', 'Gran masa de hielo; abundan en la Patagonia', 'glaciar'),
  L('H', 'empieza', 'Comida de choclo molido envuelta en sus hojas', 'humita'),
  L('I', 'empieza', 'Isla de ___: también llamada Rapa Nui', 'isla de pascua', 'isla'),
  L('J', 'empieza', 'Ave carroñera negra muy común en Chile', 'jote'),
  L('K', 'empieza', 'Fruta de piel café peluda; Chile la exporta mucho', 'kiwi'),
  L('L', 'empieza', 'Animal del altiplano pariente del guanaco', 'llama'),
  L('M', 'empieza', 'Dulce de leche, en Chile', 'manjar'),
  L('N', 'empieza', '___ de Chillán: centro de esquí y termas', 'nevados', 'nevados de chillán'),
  L('Ñ', 'contiene', 'Semilla de la araucaria', 'piñón'),
  L('O', 'empieza', 'Marisco que se gratina con queso parmesano', 'ostión', 'ostiones'),
  L('P', 'empieza', 'Salsa de tomate, cebolla, cilantro y ají', 'pebre'),
  L('Q', 'empieza', 'Queso fresco, blanco y suave', 'quesillo'),
  L('R', 'empieza', 'Juego tradicional en que se lanzan tejos', 'rayuela'),
  L('S', 'empieza', 'Pez que se cría en el sur y Chile exporta', 'salmón'),
  L('T', 'empieza', 'Juguete que gira, típico de Fiestas Patrias', 'trompo'),
  L('U', 'empieza', 'Fruta con la que se hace el pisco', 'uva'),
  L('V', 'empieza', 'Montaña que puede hacer erupción; en Chile hay muchísimos', 'volcán'),
  L('W', 'contiene', 'Pan relleno; en Chile los hay de churrasco, lomito y pernil', 'sándwich', 'sandwich'),
  L('X', 'contiene', 'Lo que pides cuando necesitas ayuda', 'auxilio'),
  L('Y', 'empieza', 'Hembra del caballo', 'yegua'),
  L('Z', 'contiene', 'Sopa chilena con carne, papa y zapallo', 'cazuela'),
]];

// =====================================================================
// PRUEBAS NUEVAS
// =====================================================================

// ¿Qué fue antes? — a y b son dos hechos; antes: 'a' o 'b' (el que ocurrió primero)
exports.queFueAntes = [
  { a: 'Llegada del ser humano a la Luna', anioA: '1969', b: 'Caída del Muro de Berlín', anioB: '1989', antes: 'a' },
  { a: 'Imprenta de Gutenberg', anioA: 'c. 1440', b: 'Llegada de Colón a América', anioB: '1492', antes: 'a' },
  { a: 'Primer Mundial de fútbol', anioA: '1930', b: 'Inicio de la Primera Guerra Mundial', anioB: '1914', antes: 'b' },
  { a: 'Lanzamiento del primer iPhone', anioA: '2007', b: 'Creación de YouTube', anioB: '2005', antes: 'b' },
  { a: 'Revolución francesa', anioA: '1789', b: 'Independencia de Estados Unidos', anioB: '1776', antes: 'b' },
  { a: 'Construcción de la Torre Eiffel', anioA: '1889', b: 'Inauguración del Canal de Panamá', anioB: '1914', antes: 'a' },
  { a: 'Hundimiento del Titanic', anioA: '1912', b: 'Primer vuelo de los hermanos Wright', anioB: '1903', antes: 'b' },
  { a: 'Fundación de Roma', anioA: '753 a. C.', b: 'Gran Pirámide de Guiza', anioB: 'c. 2560 a. C.', antes: 'b' },
  { a: 'Primer viaje al espacio de Yuri Gagarin', anioA: '1961', b: 'Llegada del ser humano a la Luna', anioB: '1969', antes: 'a' },
  { a: 'Bombilla de Edison', anioA: '1879', b: 'Teléfono de Bell', anioB: '1876', antes: 'b' },
  { a: 'Creación de Facebook', anioA: '2004', b: 'Creación de Google', anioB: '1998', antes: 'b' },
  { a: 'Muerte de Napoleón', anioA: '1821', b: 'Batalla de Waterloo', anioB: '1815', antes: 'b' },
];
exports.queFueAntesChile = [
  { a: 'Fundación de Santiago', anioA: '1541', b: 'Fundación de Concepción', anioB: '1550', antes: 'a' },
  { a: 'Primera Junta de Gobierno', anioA: '1810', b: 'Batalla de Maipú', anioB: '1818', antes: 'a' },
  { a: 'Combate naval de Iquique', anioA: '1879', b: 'Terremoto de Valdivia', anioB: '1960', antes: 'a' },
  { a: 'Mundial de fútbol en Chile', anioA: '1962', b: 'Llegada del ser humano a la Luna', anioB: '1969', antes: 'a' },
  { a: 'Nobel de Pablo Neruda', anioA: '1971', b: 'Nobel de Gabriela Mistral', anioB: '1945', antes: 'b' },
  { a: 'Inauguración del Metro de Santiago', anioA: '1975', b: 'Mundial de fútbol en Chile', anioB: '1962', antes: 'b' },
  { a: 'Primera Copa América de Chile', anioA: '2015', b: 'Terremoto del 27F', anioB: '2010', antes: 'b' },
  { a: 'Creación de la región de Ñuble', anioA: '2018', b: 'Creación de la región de Los Ríos', anioB: '2007', antes: 'b' },
  { a: 'Guerra del Pacífico', anioA: '1879', b: 'Guerra civil de 1891', anioB: '1891', antes: 'a' },
  { a: 'Fundación de Valdivia', anioA: '1552', b: 'Fundación de La Serena', anioB: '1544', antes: 'b' },
  { a: 'Rescate de los 33 mineros', anioA: 'octubre de 2010', b: 'Terremoto del 27F', anioB: 'febrero de 2010', antes: 'b' },
  { a: 'Plebiscito del «Sí» y el «No»', anioA: '1988', b: 'Oscar de «Una mujer fantástica»', anioB: '2018', antes: 'a' },
];

// Adivina la cifra — gana el equipo que más se acerque (exacto: más segundos)
exports.cifras = [
  { pregunta: '¿Cuántos metros mide la Torre Eiffel, con sus antenas?', respuesta: 330, unidad: 'metros' },
  { pregunta: '¿En qué año se inauguró el Canal de Panamá?', respuesta: 1914, unidad: '' },
  { pregunta: '¿Cuántos países son miembros de la ONU?', respuesta: 193, unidad: 'países' },
  { pregunta: '¿Cuántos kilómetros mide el diámetro de la Tierra?', respuesta: 12742, unidad: 'km' },
  { pregunta: '¿A cuántos kilómetros está la Luna de la Tierra, en promedio?', respuesta: 384400, unidad: 'km' },
  { pregunta: '¿Cuántas teclas tiene un piano estándar?', respuesta: 88, unidad: 'teclas' },
  { pregunta: '¿Cuántos dientes tiene una dentadura adulta completa?', respuesta: 32, unidad: 'dientes' },
  { pregunta: '¿En qué año se hundió el Titanic?', respuesta: 1912, unidad: '' },
  { pregunta: '¿Cuántos metros de altura tiene el monte Everest?', respuesta: 8849, unidad: 'metros' },
  { pregunta: '¿Cuántas casillas tiene un tablero de ajedrez?', respuesta: 64, unidad: 'casillas' },
  { pregunta: '¿Cuántos grados suman los ángulos de un triángulo?', respuesta: 180, unidad: 'grados' },
  { pregunta: '¿Cuántos metros mide una maratón?', respuesta: 42195, unidad: 'metros' },
];
exports.cifrasChile = [
  { pregunta: '¿Cuántos kilómetros de largo tiene Chile continental, aproximadamente?', respuesta: 4270, unidad: 'km' },
  { pregunta: '¿Cuántos metros de altura tiene el Aconcagua?', respuesta: 6961, unidad: 'metros' },
  { pregunta: '¿En qué año se fundó Santiago?', respuesta: 1541, unidad: '' },
  { pregunta: '¿Cuántos mineros quedaron atrapados en la mina San José en 2010?', respuesta: 33, unidad: 'mineros' },
  { pregunta: '¿Cuántos días estuvieron atrapados los 33 mineros?', respuesta: 69, unidad: 'días' },
  { pregunta: '¿Qué magnitud tuvo el terremoto de Valdivia de 1960?', respuesta: 9.5, unidad: '' },
  { pregunta: '¿Cuántos metros mide la Gran Torre Santiago?', respuesta: 300, unidad: 'metros' },
  { pregunta: '¿En qué año se jugó el Mundial de fútbol en Chile?', respuesta: 1962, unidad: '' },
  { pregunta: '¿A cuántos kilómetros de la costa chilena está Rapa Nui, aproximadamente?', respuesta: 3700, unidad: 'km' },
  { pregunta: '¿Cuántos moáis hay en Rapa Nui, aproximadamente?', respuesta: 887, unidad: 'moáis' },
  { pregunta: '¿En qué año recibió Pablo Neruda el Premio Nobel?', respuesta: 1971, unidad: '' },
  { pregunta: '¿Cuántos metros de altura tiene el volcán Ojos del Salado?', respuesta: 6893, unidad: 'metros' },
];

// Adivinanzas tradicionales
exports.adivinanzas = [
  { texto: 'Blanca por dentro, verde por fuera; si quieres que te lo diga, espera.', respuestas: ['pera'] },
  { texto: 'Oro parece, plata no es; el que no lo adivine, bien tonto es.', respuestas: ['plátano'] },
  { texto: 'Tiene dientes y no come, tiene barbas y no es hombre.', respuestas: ['ajo'] },
  { texto: 'Agua pasa por mi casa, cate de mi corazón.', respuestas: ['aguacate', 'palta'] },
  { texto: 'Vuela sin alas, silba sin boca, empuja sin manos y no se ve ni se toca.', respuestas: ['viento', 'aire'] },
  { texto: 'Cuanto más lava, más sucia queda.', respuestas: ['agua'] },
  { texto: 'Tengo agujas y no sé coser, tengo números y no sé leer.', respuestas: ['reloj'] },
  { texto: 'Mientras más le quitas, más grande se hace.', respuestas: ['hoyo', 'agujero', 'pozo'] },
  { texto: 'Redondo, redondo, barril sin fondo.', respuestas: ['anillo'] },
  { texto: 'Lana sube, lana baja.', respuestas: ['navaja'] },
  { texto: 'Si dices mi nombre, me rompes.', respuestas: ['silencio'] },
  { texto: 'Tiene ojos y no ve, tiene agua y no la bebe, tiene carne y no la come.', respuestas: ['coco'] },
  { texto: 'Tiene cuello pero no cabeza, tiene brazos pero no manos.', respuestas: ['camisa', 'polera'] },
  { texto: 'Todos me pisan a mí, pero yo no piso a nadie.', respuestas: ['calle', 'camino', 'suelo', 'piso'] },
  { texto: 'En el campo me crié, atada con verdes lazos, y aquel que llora por mí me está partiendo en pedazos.', respuestas: ['cebolla'] },
  { texto: 'Llevo mi casa a cuestas, camino sin tener patas y voy dejando mi huella con un hilito de plata.', respuestas: ['caracol'] },
  { texto: 'Larga y delgada, con un solo ojo; hago vestidos aunque no me los pongo.', respuestas: ['aguja'] },
  { texto: 'Sale de la sala, entra en la cocina, meneando la cola como una gallina.', respuestas: ['escoba'] },
  { texto: 'Cuanto más grande es, menos se ve.', respuestas: ['oscuridad'] },
  { texto: 'Tiene hojas y no es árbol, tiene lomo y no es caballo.', respuestas: ['libro'] },
];

// Siglas — hay que decir qué significan
exports.siglas = [
  { sigla: 'ONU', respuestas: ['organización de las naciones unidas'] },
  { sigla: 'ADN', respuestas: ['ácido desoxirribonucleico'] },
  { sigla: 'FIFA', respuestas: ['federación internacional de fútbol asociación'] },
  { sigla: 'OMS', respuestas: ['organización mundial de la salud'] },
  { sigla: 'UE', respuestas: ['unión europea'] },
  { sigla: 'ONG', respuestas: ['organización no gubernamental'] },
  { sigla: 'OVNI', respuestas: ['objeto volador no identificado'] },
  { sigla: 'IVA', respuestas: ['impuesto al valor agregado', 'impuesto al valor añadido'] },
  { sigla: 'GPS', respuestas: ['sistema de posicionamiento global', 'global positioning system'] },
  { sigla: 'OEA', respuestas: ['organización de los estados americanos'] },
  { sigla: 'PIB', respuestas: ['producto interno bruto'] },
  { sigla: 'UNICEF', respuestas: ['fondo de las naciones unidas para la infancia'] },
];
exports.siglasChile = [
  { sigla: 'PDI', respuestas: ['policía de investigaciones'] },
  { sigla: 'SII', respuestas: ['servicio de impuestos internos'] },
  { sigla: 'AFP', respuestas: ['administradora de fondos de pensiones'] },
  { sigla: 'CONAF', respuestas: ['corporación nacional forestal'] },
  { sigla: 'SAG', respuestas: ['servicio agrícola y ganadero'] },
  { sigla: 'RUT', respuestas: ['rol único tributario'] },
  { sigla: 'ANFP', respuestas: ['asociación nacional de fútbol profesional'] },
  { sigla: 'SERNAC', respuestas: ['servicio nacional del consumidor'] },
  { sigla: 'TVN', respuestas: ['televisión nacional de chile', 'televisión nacional'] },
  { sigla: 'ENAP', respuestas: ['empresa nacional del petróleo'] },
  { sigla: 'CODELCO', respuestas: ['corporación nacional del cobre', 'corporación nacional del cobre de chile'] },
  { sigla: 'FONASA', respuestas: ['fondo nacional de salud'] },
  { sigla: 'INE', respuestas: ['instituto nacional de estadísticas'] },
  { sigla: 'JUNAEB', respuestas: ['junta nacional de auxilio escolar y becas'] },
];
