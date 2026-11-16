// Contenido de las pruebas del Pasapalabra chileno (Chilevisión):
// Una de cuatro, Deletrea, Tuti Fruti (el bachillerato), El Quitaletras, La palabra vertical y La Memoria.
// Se suma al resto del contenido desde contenido.js. Cada prueba tiene una versión general y otra chilena
// («…Chile»); «…Dificil» es contenido propio del nivel difícil (si falta, se usa el normal).

// Una de cuatro — un tema, una pista y cuatro alternativas (la primera es la correcta; se barajan al jugar)
exports.unaDeCuatro = [
  { tema: 'Ríos del mundo', pista: 'Es el río más caudaloso del planeta', opciones: ['Amazonas', 'Nilo', 'Danubio', 'Misisipi'] },
  { tema: 'Planetas', pista: 'Lo llaman «el planeta rojo»', opciones: ['Marte', 'Venus', 'Júpiter', 'Saturno'] },
  { tema: 'Pintores', pista: 'Pintó «La noche estrellada»', opciones: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Salvador Dalí'] },
  { tema: 'Instrumentos', pista: 'Tiene 88 teclas blancas y negras', opciones: ['Piano', 'Acordeón', 'Arpa', 'Violín'] },
  { tema: 'Animales', pista: 'Es el único mamífero capaz de volar de verdad', opciones: ['Murciélago', 'Ardilla voladora', 'Pingüino', 'Colibrí'] },
  { tema: 'Idiomas', pista: 'Es la lengua oficial de Brasil', opciones: ['Portugués', 'Español', 'Francés', 'Italiano'] },
  { tema: 'Cuerpo humano', pista: 'Es el hueso más largo del cuerpo', opciones: ['Fémur', 'Tibia', 'Húmero', 'Peroné'] },
  { tema: 'Capitales', pista: 'Es la capital de Australia', opciones: ['Canberra', 'Sídney', 'Melbourne', 'Perth'] },
  { tema: 'Química', pista: 'Su símbolo es Au', opciones: ['Oro', 'Plata', 'Aluminio', 'Argón'] },
  { tema: 'Deportes', pista: 'Se juega con raqueta y un volante de plumas', opciones: ['Bádminton', 'Tenis', 'Squash', 'Pádel'] },
  { tema: 'Mitología griega', pista: 'Dios del mar, armado con un tridente', opciones: ['Poseidón', 'Hades', 'Apolo', 'Hermes'] },
  { tema: 'Literatura', pista: 'Escribió «Cien años de soledad»', opciones: ['Gabriel García Márquez', 'Mario Vargas Llosa', 'Julio Cortázar', 'Jorge Luis Borges'] },
  { tema: 'Música clásica', pista: 'Su Novena Sinfonía incluye el «Himno de la alegría»', opciones: ['Beethoven', 'Mozart', 'Bach', 'Chopin'] },
  { tema: 'Océanos', pista: 'Es el océano más grande del mundo', opciones: ['Pacífico', 'Atlántico', 'Índico', 'Ártico'] },
  { tema: 'Inventos', pista: 'Johannes Gutenberg la perfeccionó hacia 1450', opciones: ['La imprenta', 'La brújula', 'El telescopio', 'El reloj'] },
];
exports.unaDeCuatroChile = [
  { tema: 'Poetas chilenos', pista: 'Primera persona de Latinoamérica en ganar el Nobel de Literatura', opciones: ['Gabriela Mistral', 'Pablo Neruda', 'Vicente Huidobro', 'Nicanor Parra'] },
  { tema: 'Regiones de Chile', pista: 'Su capital es Punta Arenas', opciones: ['Magallanes', 'Aysén', 'Los Lagos', 'Los Ríos'] },
  { tema: 'Comida chilena', pista: 'Lleva choclo molido sobre pino de carne y se hornea en greda', opciones: ['Pastel de choclo', 'Humita', 'Charquicán', 'Cazuela'] },
  { tema: 'Volcanes', pista: 'El volcán que se ve desde Pucón', opciones: ['Villarrica', 'Osorno', 'Llaima', 'Calbuco'] },
  { tema: 'Música chilena', pista: 'Compuso y cantó «Gracias a la vida»', opciones: ['Violeta Parra', 'Margot Loyola', 'Isabel Parra', 'Mon Laferte'] },
  { tema: 'Fauna chilena', pista: 'El ciervo que aparece en el escudo de Chile', opciones: ['Huemul', 'Pudú', 'Guanaco', 'Vicuña'] },
  { tema: 'Historia de Chile', pista: 'Héroe del Combate Naval de Iquique', opciones: ['Arturo Prat', "Bernardo O'Higgins", 'Manuel Rodríguez', 'José Miguel Carrera'] },
  { tema: 'Islas de Chile', pista: 'Famosa por sus moáis', opciones: ['Isla de Pascua', 'Chiloé', 'Juan Fernández', 'Isla Mocha'] },
  { tema: 'Fiestas Patrias', pista: 'Es el baile nacional de Chile', opciones: ['Cueca', 'Cumbia', 'Refalosa', 'Trote'] },
  { tema: 'Deportistas chilenos', pista: 'Ganó dos medallas de oro en tenis en Atenas 2004', opciones: ['Nicolás Massú', 'Fernando González', 'Marcelo Ríos', 'Nicolás Jarry'] },
  { tema: 'Árboles nativos', pista: 'Su fruto es el piñón', opciones: ['Araucaria', 'Canelo', 'Quillay', 'Peumo'] },
  { tema: 'Paisajes de Chile', pista: 'Sus torres de granito son el símbolo de la Patagonia chilena', opciones: ['Torres del Paine', 'Cerro Castillo', 'Valle de la Luna', 'Cajón del Maipo'] },
  { tema: 'Ciudades', pista: 'Su símbolo es La Portada, un arco de roca en el mar', opciones: ['Antofagasta', 'Iquique', 'Arica', 'Calama'] },
  { tema: 'Santiago', pista: 'Cerro donde Pedro de Valdivia fundó la ciudad en 1541', opciones: ['Santa Lucía', 'San Cristóbal', 'Manquehue', 'Renca'] },
  { tema: 'Bebidas típicas', pista: 'Se sirve en Navidad con aguardiente, leche y café', opciones: ['Cola de mono', 'Chicha', 'Ponche a la romana', 'Navegado'] },
];
exports.unaDeCuatroDificil = [
  { tema: 'Filosofía', pista: 'Autor de «Así habló Zaratustra»', opciones: ['Friedrich Nietzsche', 'Immanuel Kant', 'Arthur Schopenhauer', 'Søren Kierkegaard'] },
  { tema: 'Química', pista: 'Es el elemento más abundante del universo', opciones: ['Hidrógeno', 'Helio', 'Oxígeno', 'Carbono'] },
  { tema: 'Historia', pista: 'Último zar de Rusia', opciones: ['Nicolás II', 'Alejandro III', 'Pedro el Grande', 'Iván el Terrible'] },
  { tema: 'Geografía', pista: 'Es el lago más profundo del mundo', opciones: ['Baikal', 'Tanganica', 'Titicaca', 'Superior'] },
  { tema: 'Arte', pista: 'Pintó «El jardín de las delicias»', opciones: ['El Bosco', 'Pieter Brueghel', 'El Greco', 'Durero'] },
  { tema: 'Biología', pista: 'Orgánulo donde se produce la fotosíntesis', opciones: ['Cloroplasto', 'Mitocondria', 'Ribosoma', 'Aparato de Golgi'] },
];
exports.unaDeCuatroChileDificil = [
  { tema: 'Historia de Chile', pista: 'Batalla de 1818 que selló la independencia de Chile', opciones: ['Maipú', 'Chacabuco', 'Rancagua', 'Cancha Rayada'] },
  { tema: 'Literatura chilena', pista: 'Autor de «Hijo de ladrón»', opciones: ['Manuel Rojas', 'José Donoso', 'Alberto Blest Gana', 'Baldomero Lillo'] },
  { tema: 'Geografía de Chile', pista: 'El río más largo que corre íntegramente por Chile', opciones: ['Loa', 'Biobío', 'Maule', 'Baker'] },
  { tema: 'Ciencia en Chile', pista: 'Observatorio de radioastronomía en el llano de Chajnantor', opciones: ['ALMA', 'Paranal', 'La Silla', 'Tololo'] },
];

// Deletrea — una definición; en la tele solo se ve la primera letra y las casillas. Hay que decirla letra por letra.
exports.deletrea = [
  { definicion: 'Ave nocturna de grandes ojos que gira la cabeza', palabra: 'búho' },
  { definicion: 'Lugar donde se guardan y se prestan libros', palabra: 'biblioteca' },
  { definicion: 'Arco de colores que aparece en el cielo después de la lluvia', palabra: 'arcoíris' },
  { definicion: 'Hortaliza naranja que les encanta a los conejos', palabra: 'zanahoria' },
  { definicion: 'Reptil que cambia de color para camuflarse', palabra: 'camaleón' },
  { definicion: 'Vehículo de dos ruedas que se mueve pedaleando', palabra: 'bicicleta' },
  { definicion: 'Bolitas de hielo que caen del cielo durante una tormenta', palabra: 'granizo' },
  { definicion: 'Embarcación que navega bajo el agua', palabra: 'submarino' },
  { definicion: 'Herramienta para clavar clavos', palabra: 'martillo' },
  { definicion: 'Instrumento óptico para observar los astros', palabra: 'telescopio' },
  { definicion: 'Fruto del olivo', palabra: 'aceituna' },
  { definicion: 'Insecto que produce miel', palabra: 'abeja' },
  { definicion: 'Aparato que sirve para medir la temperatura', palabra: 'termómetro' },
  { definicion: 'Persona que juega en la portería de un equipo de fútbol', palabra: 'arquero' },
];
exports.deletreaChile = [
  { definicion: 'Flor nacional de Chile', palabra: 'copihue' },
  { definicion: 'Fruto de la araucaria', palabra: 'piñón' },
  { definicion: 'Durazno deshidratado que se sirve con mote', palabra: 'huesillo' },
  { definicion: 'Ciervo nativo de Chile, de los más pequeños del mundo', palabra: 'pudú' },
  { definicion: 'Instrumento de cuerdas típico del norte, a veces hecho con caparazón de quirquincho', palabra: 'charango' },
  { definicion: 'Manta corta y elegante que usa el huaso', palabra: 'chamanto' },
  { definicion: 'Ave del escudo de Chile que vuela sobre la cordillera', palabra: 'cóndor' },
  { definicion: 'Masa frita de zapallo que se come los días de lluvia', palabra: 'sopaipilla' },
  { definicion: 'Archipiélago famoso por sus iglesias de madera y sus palafitos', palabra: 'Chiloé' },
  { definicion: 'Fruta de cáscara verde y pulpa blanca y cremosa', palabra: 'chirimoya' },
  { definicion: 'Guiso de charqui o carne con papas y zapallo', palabra: 'charquicán' },
  { definicion: 'Pan crujiente que se parte en cuatro «colas»', palabra: 'marraqueta' },
  { definicion: 'Ciudad del sur que se reconstruyó tras el terremoto de 1960 y tiene un famoso mercado fluvial', palabra: 'Valdivia' },
  { definicion: 'Comida de Chiloé que se cocina en un hoyo con piedras calientes', palabra: 'curanto' },
];
exports.deletreaDificil = [
  { definicion: 'Persona que habla dos idiomas con fluidez', palabra: 'bilingüe' },
  { definicion: 'Miedo intenso a los espacios cerrados', palabra: 'claustrofobia' },
  { definicion: 'Ciencia que estudia los seres vivos del pasado a partir de sus fósiles', palabra: 'paleontología' },
  { definicion: 'Gas imprescindible para la respiración', palabra: 'oxígeno' },
  { definicion: 'Muestra pública de obras de arte u objetos', palabra: 'exhibición' },
  { definicion: 'Persona que cría abejas', palabra: 'apicultor' },
  { definicion: 'Que deja pasar la luz y permite ver a través de él', palabra: 'transparente' },
  { definicion: 'Estudio del origen de las palabras', palabra: 'etimología' },
  { definicion: 'Que no se puede evitar', palabra: 'inevitable' },
  { definicion: 'Desconfianza excesiva y enfermiza hacia los demás', palabra: 'paranoia' },
  { definicion: 'Palabra o frase que se lee igual de izquierda a derecha que al revés', palabra: 'palíndromo' },
  { definicion: 'Arbusto del desierto o planta con espinas y tallo carnoso', palabra: 'cactus' },
];

// Tuti Fruti (el bachillerato) — en cada ronda se sortea una letra y se eligen categorías que tengan palabras con ella.
// Las listas sirven para corregir solas: una respuesta que empieza por la letra pero no está en la lista vale igual
// (sale con «?» en la tele) salvo que el presentador la rechace desde su panel.
const P = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);
exports.tutiFruti = [
  { categoria: 'Nombre', palabras: P(`Alberto, Alejandro, Alicia, Ana, Andrés, Antonia, Agustín, Amanda, Arturo, Benjamín, Bárbara, Beatriz, Bernardo, Blanca, Bruno,
    Camila, Carlos, Carolina, Catalina, Cristián, Claudia, Constanza, Daniel, Daniela, David, Diego, Dolores, Domingo, Elena, Emilia, Eduardo, Emilio, Enrique, Esteban, Eva,
    Fernanda, Fernando, Felipe, Florencia, Francisca, Francisco, Gabriel, Gabriela, Gaspar, Gloria, Gonzalo, Guillermo, Gustavo, Ignacio, Isabel, Isidora, Iván,
    Javiera, Jorge, José, Josefa, Juan, Julia, Laura, Leonardo, Lorena, Lucas, Lucía, Luis, Luisa, Manuel, Margarita, María, Martín, Martina, Matías, Mercedes, Miguel,
    Natalia, Nicolás, Noelia, Norma, Octavio, Olga, Olivia, Óscar, Pablo, Patricia, Paula, Pedro, Pilar, Rafael, Ramón, Raúl, Ricardo, Roberto, Rocío, Rodrigo, Rosa,
    Samuel, Santiago, Sara, Sebastián, Sergio, Silvia, Sofía, Sonia, Tamara, Teresa, Tomás, Trinidad, Valentina, Vicente, Victoria`) },
  { categoria: 'Animal', palabras: P(`abeja, águila, alce, alpaca, anaconda, araña, ardilla, armadillo, asno, atún, avestruz, avispa, ballena, búfalo, búho, burro, caballo,
    cabra, camello, canguro, castor, cebra, cerdo, chancho, ciervo, cisne, cocodrilo, conejo, cóndor, coyote, cuervo, chimpancé, delfín, dromedario, elefante, erizo, escarabajo,
    escorpión, foca, flamenco, gallina, gato, gaviota, gorila, gorrión, grillo, guanaco, gusano, halcón, hámster, hiena, hipopótamo, hormiga, iguana, impala, jabalí, jaguar,
    jirafa, koala, langosta, león, leopardo, liebre, llama, lobo, loro, mapache, mariposa, medusa, mono, mosca, murciélago, nutria, ñandú, oca, orca, oso, oveja, pájaro,
    paloma, pantera, pato, pavo, pelícano, perro, pez, pingüino, pulpo, puma, rana, ratón, rinoceronte, salamandra, sapo, sardina, serpiente, tiburón, tigre, topo, tortuga,
    trucha, tucán, urraca, vaca, venado, víbora, yegua, zorro`) },
  { categoria: 'País', palabras: P(`Alemania, Argentina, Australia, Austria, Argelia, Arabia Saudita, Angola, Bélgica, Bolivia, Brasil, Bulgaria, Bangladés, Canadá, Chile, China,
    Colombia, Corea del Sur, Costa Rica, Croacia, Cuba, Camerún, Dinamarca, Ecuador, Egipto, El Salvador, Escocia, Eslovaquia, Eslovenia, España, Estados Unidos, Estonia, Etiopía,
    Filipinas, Finlandia, Francia, Gabón, Ghana, Grecia, Guatemala, Guinea, Haití, Honduras, Hungría, India, Indonesia, Inglaterra, Irak, Irán, Irlanda, Islandia, Israel, Italia,
    Jamaica, Japón, Jordania, Kenia, Letonia, Líbano, Libia, Lituania, Luxemburgo, Madagascar, Malasia, Marruecos, México, Mongolia, Mozambique, Nepal, Nicaragua, Nigeria,
    Noruega, Nueva Zelanda, Omán, Países Bajos, Pakistán, Panamá, Paraguay, Perú, Polonia, Portugal, Reino Unido, República Dominicana, Rumania, Rusia, Senegal, Serbia, Singapur,
    Siria, Sudáfrica, Suecia, Suiza, Tailandia, Tanzania, Túnez, Turquía, Ucrania, Uganda, Uruguay, Venezuela, Vietnam`) },
  { categoria: 'Ciudad del mundo', palabras: P(`Ámsterdam, Atenas, Asunción, Barcelona, Berlín, Bogotá, Bruselas, Buenos Aires, Bangkok, Cairo, Caracas, Chicago, Copenhague, Cuzco, Córdoba,
    Dublín, Dakar, Delhi, Dubái, Edimburgo, Estambul, Florencia, Fráncfort, Ginebra, Guadalajara, Guayaquil, Hamburgo, La Habana, Helsinki, Hong Kong, Kioto, Lima, Lisboa,
    Londres, Los Ángeles, Lyon, La Paz, Madrid, Medellín, Melbourne, Miami, Milán, Montevideo, Moscú, Múnich, Nápoles, Nueva York, Niza, Oslo, Ottawa, Oporto, París, Pekín, Praga,
    Quito, Río de Janeiro, Roma, Rosario, Santiago, São Paulo, Sevilla, Seúl, Sídney, Shanghái, Tokio, Toronto, Toledo, Turín, Valencia, Venecia, Viena, Varsovia, Zúrich`) },
  { categoria: 'Fruta o verdura', palabras: P(`acelga, aceituna, aguacate, ajo, alcachofa, apio, arándano, arveja, banana, berenjena, betarraga, brócoli, calabaza, cebolla, cereza, champiñón,
    choclo, chirimoya, ciruela, coco, coliflor, damasco, dátil, durazno, espárrago, espinaca, frambuesa, frutilla, fresa, granada, guinda, guayaba, haba, higo, kiwi, lechuga,
    limón, lima, mandarina, mango, manzana, maracuyá, melón, membrillo, mora, nabo, naranja, níspero, nuez, papa, palta, papaya, pepino, pera, pimentón, piña, plátano, pomelo,
    porotos, puerro, rábano, repollo, sandía, tomate, tuna, uva, zanahoria, zapallo, zapallo italiano`) },
  { categoria: 'Color', palabras: P(`amarillo, azul, añil, beige, blanco, burdeo, café, calipso, carmesí, celeste, cian, coral, crema, dorado, esmeralda, fucsia, granate, gris,
    índigo, lila, lavanda, magenta, marrón, morado, mostaza, naranjo, naranja, negro, ocre, oro, plateado, púrpura, rojo, rosado, rosa, salmón, sepia, terracota, turquesa,
    verde, violeta`) },
  { categoria: 'Profesión u oficio', palabras: P(`abogado, abogada, actor, actriz, agricultor, albañil, arquitecto, arquitecta, astronauta, azafata, bailarín, bailarina, bombero, bombera,
    barbero, biólogo, cajero, camarero, carpintero, cartero, carnicero, chofer, cocinero, cocinera, contador, contadora, dentista, diseñador, diseñadora, doctor, doctora,
    electricista, enfermero, enfermera, escritor, escritora, escultor, florista, fotógrafo, futbolista, garzón, gásfiter, granjero, guardia, historiador, ingeniero, ingeniera,
    jardinero, joyero, juez, jueza, locutor, maestro, maestra, mecánico, médico, médica, minero, músico, nutricionista, niñera, odontólogo, obrero, panadero, panadera, peluquero,
    peluquera, periodista, piloto, pintor, policía, profesor, profesora, psicólogo, psicóloga, químico, recepcionista, reportero, sastre, secretario, secretaria, soldado,
    taxista, técnico, tenista, traductor, traductora, veterinario, veterinaria, vendedor, vendedora, zapatero`) },
  { categoria: 'Cosa u objeto', palabras: P(`abanico, aguja, alfombra, anillo, anteojos, armario, auto, avión, balde, banco, bicicleta, billetera, bolso, botella, brocha, bufanda, cama,
    cámara, candado, cartera, cepillo, computador, cuaderno, cuchara, cuchillo, dado, destornillador, diccionario, disco, ducha, escalera, escoba, espejo, estufa, florero,
    foco, fósforo, guitarra, gorro, goma, grifo, hacha, hilo, horno, imán, impresora, jarra, jabón, lámpara, lápiz, libro, linterna, llave, maleta, martillo, mesa, mochila,
    olla, palo, pantalla, paraguas, peine, pelota, plato, puerta, radio, regla, reloj, sartén, silla, sillón, sombrero, sofá, taza, teléfono, televisor, tenedor, tijera,
    toalla, vaso, vela, ventana, ventilador, zapato`) },
  { categoria: 'Parte del cuerpo', palabras: P(`boca, brazo, cabeza, cadera, cara, ceja, cejas, cerebro, codo, corazón, costilla, cuello, dedo, diente, espalda, estómago, frente, garganta,
    hígado, hombro, hueso, labio, lengua, mano, mejilla, muñeca, músculo, muslo, nariz, nuca, ojo, oreja, ombligo, pecho, pelo, pestaña, pie, piel, pierna, pulmón, riñón,
    rodilla, talón, tobillo, uña, vena`) },
  { categoria: 'Marca', palabras: P(`Adidas, Apple, Audi, BMW, Bimbo, Canon, Casio, Coca-Cola, Colgate, Dell, Disney, Ferrari, Fiat, Ford, Gillette, Google, Honda, HP, Huawei, Hyundai,
    IKEA, Kia, LEGO, Lenovo, LG, McDonald's, Mercedes-Benz, Microsoft, Mitsubishi, Motorola, Nestlé, Netflix, Nike, Nintendo, Nissan, Nokia, Olympus, Omega, Puma, Peugeot,
    Pepsi, Philips, Renault, Reebok, Rolex, Samsung, Seat, Sony, Suzuki, Toyota, Twitter, Volkswagen, Volvo, Xiaomi, Yamaha, Zara`) },
];
exports.tutiFrutiChile = [
  { categoria: 'Ciudad o comuna de Chile', palabras: P(`Ancud, Angol, Antofagasta, Arica, Arauco, Buin, Bulnes, Calama, Cauquenes, Castro, Chillán, Chiguayante, Coquimbo, Concepción, Constitución,
    Copiapó, Coyhaique, Curicó, Colina, Conchalí, Dalcahue, Diego de Almagro, El Bosque, El Quisco, El Tabo, Ercilla, Estación Central, Florida, Freire, Frutillar, Graneros,
    Hualpén, Huechuraba, Huasco, Illapel, Independencia, Iquique, Isla de Maipo, La Serena, Los Ángeles, Linares, Lota, Los Andes, La Ligua, Lebu, Lautaro, La Florida,
    Las Condes, La Reina, Lo Barnechea, Maipú, Macul, Melipilla, Mejillones, Molina, Mulchén, Nacimiento, Navidad, Ñuñoa, Osorno, Ovalle, Olmué, Puerto Montt, Punta Arenas,
    Pucón, Providencia, Peñalolén, Puente Alto, Pichilemu, Puerto Varas, Puerto Natales, Quilpué, Quillota, Quintero, Quellón, Quilicura, Rancagua, Recoleta, Renca, Rengo,
    San Antonio, San Bernardo, San Fernando, San Felipe, Santiago, Santa Cruz, Talca, Talcahuano, Temuco, Tocopilla, Tomé, Valdivia, Vallenar, Valparaíso, Vicuña, Villarrica,
    Viña del Mar, Victoria, Vitacura`) },
  { categoria: 'Comida o bebida chilena', palabras: P(`ajiaco, alfajor, ají, asado, berlín, budín, cazuela, charquicán, completo, curanto, chorrillana, chapalele, calzones rotos, churrasco,
    choripán, chupe, caldillo de congrio, carbonada, chancho en piedra, cochayuyo, chilenitos, calugas, chacarero, chicha, cola de mono, cuchuflí, empanada, ensalada chilena,
    escabeche, guatitas, humita, huesillo, hallulla, leche asada, lomito, locos, marraqueta, mote con huesillo, merkén, mermelada, milcao, mote, mostaza, navegado, once, pastel de choclo,
    pebre, pan amasado, paila marina, pantrucas, pequén, pichanga, pisco, pisco sour, plateada, porotos, porotos granados, prietas, picarones, ponche, queso de cabeza, queque,
    reineta, ravioles, sopaipilla, sánguche, terremoto, tomaticán, torta de mil hojas, tutti frutti, valdiviano`) },
  { categoria: 'Animal o planta de Chile', palabras: P(`alerce, araucaria, avellano, boldo, canelo, chilco, chinchilla, cóndor, copihue, coigüe, culpeo, chucao, degú, flamenco, guanaco, güiña,
    huemul, huillín, lenga, loica, lingue, litre, maqui, mañío, monito del monte, ñandú, ñirre, peumo, picaflor, pingüino, pudú, puma, quillay, queltehue, quirquincho, raulí,
    roble, ruil, tagua, tenca, tiuque, tordo, ulmo, vicuña, vizcacha, zorro chilla, zorzal`) },
  { categoria: 'Chilenismo', palabras: P(`al tiro, achuntar, bacán, cachar, cachureo, cahuín, carrete, chela, choro, cuico, copuchar, cabro chico, dieciochero, embarrarla, fome, flaite,
    gallo, guagua, guata, harto, huevear, lolo, luca, longi, malulo, mina, once, pega, pololo, polola, pucha, pituto, quiltro, quiubo, rasca, regalón, sapear, taco, tincar,
    tuto, achacarse, apitutado, apañar, buena onda, cuático, mano, nanai`) },
];

// El Quitaletras — la palabra viene revuelta y con una letra de más; hay que quitarla y ordenar el resto
exports.quitaletras = [
  { pista: 'Animal', palabra: 'tortuga', sobra: 'b' },
  { pista: 'Instrumento', palabra: 'guitarra', sobra: 'p' },
  { pista: 'Planeta', palabra: 'saturno', sobra: 'l' },
  { pista: 'Fruta', palabra: 'naranja', sobra: 'e' },
  { pista: 'Deporte', palabra: 'natación', sobra: 'r' },
  { pista: 'Profesión', palabra: 'bombero', sobra: 't' },
  { pista: 'Prenda de vestir', palabra: 'camisa', sobra: 'o' },
  { pista: 'Paisaje', palabra: 'montaña', sobra: 'e' },
  { pista: 'Mueble', palabra: 'armario', sobra: 's' },
  { pista: 'Fruta', palabra: 'plátano', sobra: 's' },
  { pista: 'Color', palabra: 'amarillo', sobra: 's' },
  { pista: 'Insecto', palabra: 'hormiga', sobra: 'u' },
  { pista: 'En la cocina', palabra: 'cuchara', sobra: 'e' },
  { pista: 'En el colegio', palabra: 'cuaderno', sobra: 'l' },
];
exports.quitaletrasChile = [
  { pista: 'Comida típica', palabra: 'empanada', sobra: 's' },
  { pista: 'Ciudad del sur', palabra: 'Valdivia', sobra: 'r' },
  { pista: 'Baile nacional', palabra: 'cueca', sobra: 's' },
  { pista: 'Árbol nativo', palabra: 'araucaria', sobra: 's' },
  { pista: 'Flor nacional', palabra: 'copihue', sobra: 'r' },
  { pista: 'Ciudad del norte', palabra: 'Iquique', sobra: 'a' },
  { pista: 'Ave del escudo', palabra: 'cóndor', sobra: 'a' },
  { pista: 'Animal del escudo', palabra: 'huemul', sobra: 'a' },
  { pista: 'Archipiélago', palabra: 'Chiloé', sobra: 's' },
  { pista: 'Bebida de las Fiestas Patrias', palabra: 'chicha', sobra: 'o' },
  { pista: 'Pan', palabra: 'marraqueta', sobra: 's' },
  { pista: 'Hombre de campo', palabra: 'huaso', sobra: 'n' },
];
exports.quitaletrasDificil = [
  { pista: 'Ciencia', palabra: 'astronomía', sobra: 'l' },
  { pista: 'Poesía', palabra: 'soneto', sobra: 'l' },
  { pista: 'Química', palabra: 'molécula', sobra: 'r' },
  { pista: 'Historia', palabra: 'independencia', sobra: 't' },
  { pista: 'Geografía', palabra: 'meridiano', sobra: 's' },
  { pista: 'Música', palabra: 'partitura', sobra: 'e' },
  { pista: 'Filosofía', palabra: 'metafísica', sobra: 'r' },
];
exports.quitaletrasChileDificil = [
  { pista: 'Batalla de la Independencia', palabra: 'Chacabuco', sobra: 'r' },
  { pista: 'Poeta chileno', palabra: 'Huidobro', sobra: 'a' },
  { pista: 'Desierto', palabra: 'Atacama', sobra: 'l' },
  { pista: 'Río del sur', palabra: 'Biobío', sobra: 'n' },
];

// La palabra vertical — un concepto y varias filas relacionadas con él. Las iniciales de las respuestas forman la
// palabra vertical (también relacionada con el concepto). Cada fila: pista y respuestas válidas.
exports.palabraVertical = [
  { concepto: 'El mar', filas: [ // BARCO
    { pista: 'El animal más grande del planeta', respuestas: ['ballena', 'ballena azul'] },
    { pista: 'Pieza de hierro que se echa al fondo para que el barco no se mueva', respuestas: ['ancla'] },
    { pista: 'La lanza el pescador para atrapar peces', respuestas: ['red'] },
    { pista: 'Animal marino que forma arrecifes', respuestas: ['coral'] },
    { pista: 'Se forma en el agua con el viento y la aprovechan los surfistas', respuestas: ['ola'] },
  ] },
  { concepto: 'La cocina', filas: [ // PLATO
    { pista: 'Especia que suele acompañar a la sal', respuestas: ['pimienta'] },
    { pista: 'Verdura de hojas verdes, base de muchas ensaladas', respuestas: ['lechuga'] },
    { pista: 'Líquido de oliva o de maravilla que se usa para freír', respuestas: ['aceite'] },
    { pista: 'Cubierto con dientes', respuestas: ['tenedor'] },
    { pista: 'Recipiente hondo para cocer sopas y guisos', respuestas: ['olla'] },
  ] },
  { concepto: 'El sistema solar', filas: [ // MARTE
    { pista: 'El planeta más cercano al Sol', respuestas: ['mercurio'] },
    { pista: 'Roca que orbita, por ejemplo, entre Marte y Júpiter', respuestas: ['asteroide'] },
    { pista: 'Giro de un planeta sobre su propio eje', respuestas: ['rotación'] },
    { pista: 'El planeta donde vivimos', respuestas: ['tierra'] },
    { pista: 'Eso es el Sol', respuestas: ['estrella'] },
  ] },
  { concepto: 'El fútbol', filas: [ // ARCO
    { pista: 'Dirige el partido y toca el silbato', respuestas: ['árbitro', 'arbitro', 'árbitra'] },
    { pista: 'Tarjeta que expulsa a un jugador', respuestas: ['roja', 'tarjeta roja'] },
    { pista: 'Saque desde la esquina de la cancha', respuestas: ['córner', 'corner'] },
    { pista: 'Posición adelantada, en inglés', respuestas: ['offside', 'orsay'] },
  ] },
  { concepto: 'Animales', filas: [ // GATO
    { pista: 'El primate más grande', respuestas: ['gorila'] },
    { pista: 'Ave rapaz del escudo de México', respuestas: ['águila', 'aguila'] },
    { pista: 'Pez cartilaginoso de dientes afilados', respuestas: ['tiburón', 'tiburon'] },
    { pista: 'Pasa el invierno hibernando', respuestas: ['oso'] },
  ] },
  { concepto: 'El cuerpo humano', filas: [ // MANO
    { pista: 'Tejido que permite mover los huesos', respuestas: ['músculo', 'musculo'] },
    { pista: 'Vaso sanguíneo que sale del corazón', respuestas: ['arteria', 'aorta'] },
    { pista: 'Órgano del olfato', respuestas: ['nariz'] },
    { pista: 'Órgano de la vista', respuestas: ['ojo', 'ojos'] },
  ] },
];
exports.palabraVerticalChile = [
  { concepto: 'Fiestas Patrias', filas: [ // CHICHA
    { pista: 'El baile nacional', respuestas: ['cueca'] },
    { pista: 'Hombre de campo con chupalla y chamanto', respuestas: ['huaso'] },
    { pista: 'Lo que se celebra cada 18 de septiembre', respuestas: ['independencia'] },
    { pista: 'Pan con chorizo, infaltable en la parrilla', respuestas: ['choripán', 'choripan'] },
    { pista: 'Canción patria que se canta con la mano en el pecho', respuestas: ['himno', 'himno nacional'] },
    { pista: 'Carne a la parrilla para celebrar', respuestas: ['asado'] },
  ] },
  { concepto: 'Chile', filas: [ // ANDES
    { pista: 'El desierto más árido del mundo', respuestas: ['atacama'] },
    { pista: 'Poeta del «Canto general», Nobel en 1971', respuestas: ['neruda', 'pablo neruda'] },
    { pista: 'El día de las Fiestas Patrias: el ___ de septiembre', respuestas: ['dieciocho', '18'] },
    { pista: 'Se hace de pino y se hornea', respuestas: ['empanada'] },
    { pista: 'La capital', respuestas: ['santiago'] },
  ] },
  { concepto: 'Chilenismos', filas: [ // POLOLA
    { pista: 'El trabajo, en chileno', respuestas: ['pega'] },
    { pista: 'La merienda de la tarde, con té y pan', respuestas: ['once', 'onces'] },
    { pista: 'Mil pesos', respuestas: ['luca'] },
    { pista: '«Buena ___»: persona simpática', respuestas: ['onda'] },
    { pista: 'Adolescente', respuestas: ['lolo', 'lola'] },
    { pista: 'Inmediatamente: «___ ___»', respuestas: ['al tiro'] },
  ] },
  { concepto: 'El campo chileno', filas: [ // HUASO
    { pista: 'Pieza de hierro que se clava en el casco del caballo', respuestas: ['herradura'] },
    { pista: 'Parte de la vaca de la que se saca la leche', respuestas: ['ubre'] },
    { pista: 'Herramienta para abrir surcos en la tierra', respuestas: ['arado'] },
    { pista: 'Lo usa el huaso en la cabeza (la chupalla es uno)', respuestas: ['sombrero'] },
    { pista: 'Animal del que se saca la lana', respuestas: ['oveja'] },
  ] },
];

// La Memoria — tableros de 9 casillas (dibujo + nombre). Se muestran unos segundos, se tapan y se pregunta qué había
// en algunas casillas. «otras»: otras respuestas válidas.
const M = (emoji, nombre, ...otras) => ({ emoji, nombre, otras });
exports.memoria = [
  { tema: 'Objetos', elementos: [M('🍎', 'manzana'), M('🚲', 'bicicleta', 'bici'), M('🎸', 'guitarra'), M('🐘', 'elefante'), M('⌚', 'reloj'),
    M('☂️', 'paraguas'), M('🔑', 'llave'), M('🚀', 'cohete'), M('🍕', 'pizza')] },
  { tema: 'Animales', elementos: [M('🦁', 'león'), M('🐢', 'tortuga'), M('🦒', 'jirafa'), M('🐙', 'pulpo'), M('🦉', 'búho', 'lechuza'),
    M('🐝', 'abeja'), M('🦓', 'cebra'), M('🐊', 'cocodrilo', 'caimán', 'lagarto'), M('🦋', 'mariposa')] },
  { tema: 'Comida', elementos: [M('🍌', 'plátano', 'banana'), M('🧀', 'queso'), M('🥕', 'zanahoria'), M('🍩', 'dona', 'donut', 'rosquilla'), M('🍇', 'uvas', 'uva'),
    M('🥚', 'huevo'), M('🍔', 'hamburguesa'), M('🍦', 'helado'), M('🥐', 'medialuna', 'cruasán', 'croissant')] },
  { tema: 'Deportes y juegos', elementos: [M('⚽', 'pelota de fútbol', 'pelota', 'balón', 'fútbol'), M('🏀', 'básquetbol', 'pelota de básquetbol', 'basquetbol', 'básquet', 'baloncesto'),
    M('🎾', 'tenis', 'pelota de tenis'), M('🏓', 'ping pong', 'pimpón', 'tenis de mesa'), M('🎳', 'bolos', 'bowling'), M('♟️', 'ajedrez', 'peón'),
    M('🎯', 'diana', 'dardos'), M('🎲', 'dado', 'dados'), M('🪁', 'volantín', 'cometa', 'papalote')] },
  { tema: 'Transportes', elementos: [M('✈️', 'avión'), M('🚂', 'tren', 'locomotora'), M('🚁', 'helicóptero'), M('⛵', 'velero', 'barco', 'bote'), M('🚌', 'micro', 'bus', 'autobús'),
    M('🛴', 'scooter', 'monopatín'), M('🚑', 'ambulancia'), M('🚜', 'tractor'), M('🏍️', 'moto', 'motocicleta')] },
  { tema: 'La casa', elementos: [M('🛏️', 'cama'), M('🪑', 'silla'), M('🚪', 'puerta'), M('🛁', 'tina', 'bañera'), M('🕯️', 'vela'),
    M('🧹', 'escoba'), M('📺', 'televisor', 'tele', 'televisión'), M('🪞', 'espejo'), M('🔦', 'linterna')] },
];
exports.memoriaChile = [
  { tema: 'Chile', elementos: [M('🗿', 'moái', 'moai'), M('🥟', 'empanada'), M('🪁', 'volantín', 'cometa'), M('🥑', 'palta', 'aguacate'), M('🌽', 'choclo', 'maíz'),
    M('🌋', 'volcán'), M('🐧', 'pingüino'), M('🍷', 'vino', 'copa de vino'), M('🐴', 'caballo')] },
  { tema: 'Fiestas Patrias', elementos: [M('🇨🇱', 'bandera chilena', 'bandera', 'bandera de chile'), M('🥩', 'carne', 'asado'), M('🌭', 'choripán', 'completo', 'vienesa'),
    M('🎠', 'carrusel', 'juegos'), M('🍉', 'sandía'), M('🎺', 'trompeta'), M('💃', 'bailarina', 'baile', 'cueca'), M('🧣', 'pañuelo', 'bufanda'), M('🍾', 'botella', 'chicha', 'champaña')] },
  { tema: 'El sur de Chile', elementos: [M('🌲', 'pino', 'árbol', 'bosque'), M('🐑', 'oveja'), M('🌧️', 'lluvia', 'nube'), M('🦀', 'centolla', 'jaiba', 'cangrejo'), M('🛶', 'bote', 'canoa', 'lancha'),
    M('🏔️', 'montaña', 'cordillera', 'cerro'), M('🐟', 'pescado', 'pez', 'salmón'), M('🌈', 'arcoíris'), M('🍄', 'hongo', 'callampa')] },
];

// Un tablero más para La Memoria (cada equipo elige entre dos temas)
exports.memoriaChile.push({ tema: 'La once', elementos: [M('🍞', 'pan', 'marraqueta', 'hallulla'), M('🫖', 'tetera'), M('☕', 'taza', 'café', 'té'), M('🥑', 'palta', 'aguacate'),
  M('🧈', 'mantequilla'), M('🍯', 'miel', 'manjar'), M('🧀', 'queso'), M('🍅', 'tomate'), M('🥚', 'huevo')] });

// Letra a letra — cada equipo recibe dos letras: todas sus palabras contienen esas dos letras. Una pista por palabra.
exports.letraALetra = [
  { letras: 'RS', palabras: [
    { pista: 'Flor con espinas, símbolo del amor', palabra: 'rosa' },
    { pista: 'Mes en que empieza la primavera en Chile', palabra: 'septiembre' },
    { pista: 'Gesto de alegría que se hace con los labios', palabra: 'sonrisa' },
    { pista: 'Planeta famoso por sus anillos', palabra: 'Saturno' },
    { pista: 'Herramienta para cortar papel', palabra: 'tijeras' },
    { pista: 'Persona que enseña en el colegio', palabra: 'profesor', otras: ['profesora'] },
    { pista: 'Lo contrario de pobres', palabra: 'ricos', otras: ['ricas'] },
    { pista: 'Insecto que antes fue oruga', palabra: 'mariposa' },
    { pista: 'Fruta roja con las semillas por fuera (en España)', palabra: 'fresa' },
    { pista: 'Lo que sientes cuando algo no te lo esperabas', palabra: 'sorpresa' },
  ] },
  { letras: 'CL', palabras: [
    { pista: 'Golosina hecha de cacao', palabra: 'chocolate' },
    { pista: 'Animal que lleva su casa a cuestas', palabra: 'caracol' },
    { pista: 'Lugar donde estudian los niños', palabra: 'colegio' },
    { pista: 'Color del cielo despejado', palabra: 'celeste' },
    { pista: 'Vehículo de dos ruedas que se mueve pedaleando', palabra: 'bicicleta' },
    { pista: 'Hortaliza blanca que parece un árbol pequeño', palabra: 'coliflor' },
    { pista: 'Parte del cuerpo que une la cabeza con el tronco', palabra: 'cuello' },
    { pista: 'Animal del desierto con jorobas', palabra: 'camello' },
    { pista: 'Aparato para hacer operaciones matemáticas', palabra: 'calculadora' },
    { pista: 'Adorno que se pone alrededor del cuello', palabra: 'collar' },
  ] },
  { letras: 'PE', palabras: [
    { pista: 'Animal que ladra', palabra: 'perro' },
    { pista: 'Fruta con forma de gota', palabra: 'pera' },
    { pista: 'Objeto en el que te miras', palabra: 'espejo' },
    { pista: 'Lugar donde despegan y aterrizan los aviones', palabra: 'aeropuerto' },
    { pista: 'Animal que vive en el agua y respira por branquias', palabra: 'pez' },
    { pista: 'Hoja en la que se escribe', palabra: 'papel' },
    { pista: 'Parte del cuerpo con la que caminamos', palabra: 'pie' },
    { pista: 'Lo que escribe un poeta', palabra: 'poema' },
    { pista: 'Utensilio para peinarse', palabra: 'peine' },
    { pista: 'Cuerpo celeste que gira alrededor de una estrella', palabra: 'planeta' },
  ] },
  { letras: 'TN', palabras: [
    { pista: 'Aparato en el que se ven los programas', palabra: 'televisión' },
    { pista: 'Abertura en la pared para mirar afuera', palabra: 'ventana' },
    { pista: 'Lo que se le cae a un niño para que pase el Ratón Pérez', palabra: 'diente' },
    { pista: 'Lo que hace un pintor', palabra: 'pintura' },
    { pista: 'Ruido fuerte que se oye en una tormenta', palabra: 'trueno' },
    { pista: 'Local donde se venden cosas', palabra: 'tienda' },
    { pista: 'Planeta de los anillos', palabra: 'Saturno' },
    { pista: 'Máquina que circula por las vías', palabra: 'tren' },
    { pista: 'Deportista que juega con raqueta en una cancha con malla', palabra: 'tenista' },
    { pista: 'Niño o niña que va a la escuela', palabra: 'estudiante' },
  ] },
];
exports.letraALetraChile = [
  { letras: 'CH', palabras: [
    { pista: 'Bebida de las Fiestas Patrias hecha de uva o manzana', palabra: 'chicha' },
    { pista: 'Manta corta y elegante del huaso', palabra: 'chamanto' },
    { pista: 'Isla grande del sur, con palafitos e iglesias de madera', palabra: 'Chiloé' },
    { pista: 'Carne seca y salada', palabra: 'charqui' },
    { pista: 'Guiso de charqui o carne con papas y zapallo', palabra: 'charquicán' },
    { pista: 'Fruta de cáscara verde y pulpa blanca y cremosa', palabra: 'chirimoya' },
    { pista: 'Papas fritas con carne, cebolla y huevo', palabra: 'chorrillana' },
    { pista: 'Capital de la región de Ñuble', palabra: 'Chillán' },
    { pista: 'Pan con chorizo, infaltable en el asado', palabra: 'choripán' },
    { pista: 'Alga comestible de las costas chilenas', palabra: 'cochayuyo' },
  ] },
  { letras: 'AR', palabras: [
    { pista: 'La ciudad más al norte de Chile', palabra: 'Arica' },
    { pista: 'Árbol cuyo fruto es el piñón', palabra: 'araucaria' },
    { pista: 'Ciudad a orillas del estrecho de Magallanes', palabra: 'Punta Arenas' },
    { pista: 'Puerto de los cerros, los ascensores y las casas de colores', palabra: 'Valparaíso' },
    { pista: 'Larga trompeta mapuche hecha de caña', palabra: 'trutruka', otras: ['trutruca'] },
    { pista: 'Lugar de comida y baile en las Fiestas Patrias', palabra: 'ramada' },
    { pista: 'Barco histórico que se conserva en Talcahuano', palabra: 'Huáscar' },
    { pista: 'Héroe del Combate Naval de Iquique', palabra: 'Arturo Prat', otras: ['prat'] },
    { pista: 'Pan crujiente que se parte en cuatro', palabra: 'marraqueta' },
    { pista: 'Cadena de montañas que recorre Chile por el este', palabra: 'cordillera' },
  ] },
];

// Palabras cruzadas — cada palabra está partida en dos; la tele muestra las mitades en dos columnas desordenadas
const X = (pista, a, b, ...otras) => ({ pista, partes: [a, b], otras });
exports.palabrasCruzadas = [
  { tema: 'Animales', palabras: [X('Tiene trompa y grandes orejas', 'ele', 'fante'), X('El animal más alto del mundo', 'ji', 'rafa'),
    X('Antes de volar fue oruga', 'mari', 'posa'), X('Lleva su caparazón a todas partes', 'tor', 'tuga'), X('Orejas largas; le encantan las zanahorias', 'co', 'nejo'),
    X('Mamífero marino muy inteligente que salta en el agua', 'del', 'fín'), X('Lleva a su cría en una bolsa', 'cangu', 'ro'), X('Ave que no vuela y vive en el frío', 'pin', 'güino')] },
  { tema: 'Países', palabras: [X('País del tango y de Messi', 'argen', 'tina'), X('El país más grande de Sudamérica', 'bra', 'sil'),
    X('País de los canguros', 'aus', 'tralia'), X('El país del sol naciente', 'ja', 'pón'), X('Su capital es Berlín', 'ale', 'mania'),
    X('Su capital es Lisboa', 'portu', 'gal'), X('País africano cuya capital es Rabat', 'marrue', 'cos'), X('Su bandera tiene una hoja de arce', 'cana', 'dá')] },
  { tema: 'Instrumentos', palabras: [X('Seis cuerdas; se toca con los dedos o una uñeta', 'gui', 'tarra'), X('Se toca con arco y se apoya en el hombro', 'vio', 'lín'),
    X('Tiene 88 teclas blancas y negras', 'pia', 'no'), X('De metal, con tres pistones', 'trom', 'peta'), X('Conjunto de tambores y platillos', 'bate', 'ría'),
    X('De viento, se toca de lado (traversa)', 'flau', 'ta'), X('Tiene fuelle y teclado', 'acor', 'deón'), X('Instrumento de viento de metal típico del jazz', 'saxo', 'fón', 'saxofon', 'saxo')] },
  { tema: 'Profesiones', palabras: [X('Apaga incendios', 'bom', 'bero'), X('Cuida tus dientes', 'den', 'tista'), X('Reparte las cartas', 'car', 'tero'),
    X('Hace el pan', 'pana', 'dero'), X('Trabaja la madera', 'carpin', 'tero'), X('Viaja al espacio', 'astro', 'nauta'),
    X('Escribe las noticias', 'perio', 'dista'), X('Médico de los animales', 'veteri', 'nario')] },
];
exports.palabrasCruzadasChile = [
  { tema: 'Comida chilena', palabras: [X('Se hace de pino y se hornea', 'empa', 'nada'), X('Choclo molido envuelto en sus hojas', 'hu', 'mita'),
    X('Caldo con presa, papa, zapallo y choclo', 'cazue', 'la'), X('Masa frita de zapallo para los días de lluvia', 'sopai', 'pilla'),
    X('Guiso con charqui, papas y zapallo', 'charqui', 'cán'), X('Se cocina en un hoyo con piedras calientes en Chiloé', 'cu', 'ranto'),
    X('Pan crujiente que se parte en cuatro', 'marra', 'queta'), X('Papas fritas con carne, cebolla y huevo', 'cho', 'rrillana')] },
  { tema: 'Lugares de Chile', palabras: [X('El desierto más árido del mundo', 'ata', 'cama'), X('Puerto de los cerros y los ascensores', 'valpa', 'raíso'),
    X('Isla de los palafitos', 'chi', 'loé'), X('Ciudad turística a los pies del volcán Villarrica', 'pu', 'cón'),
    X('Ciudad del norte con zona franca', 'iqui', 'que'), X('Capital de La Araucanía', 'te', 'muco'),
    X('Región del extremo sur, de glaciares y estepas', 'pata', 'gonia'), X('Nombre originario de la Isla de Pascua', 'rapa', 'nui')] },
];

// Pistas que despistan — un personaje o cosa secreta y cinco pistas, de la más difícil a la más fácil
exports.pistasQueDespistan = [
  { pistas: ['Nací en Alemania en 1879', 'Trabajé en una oficina de patentes en Suiza', 'Gané el Premio Nobel de Física en 1921', 'Mi pelo despeinado es famoso', 'Mi fórmula más conocida es E = mc²'], respuestas: ['albert einstein', 'einstein'] },
  { pistas: ['Nací en Coyoacán', 'Un accidente de bus marcó mi vida', 'Me casé dos veces con Diego Rivera', 'Pinté muchos autorretratos', 'Soy la pintora mexicana de las cejas unidas'], respuestas: ['frida kahlo', 'frida'] },
  { pistas: ['Nací en Los Ángeles en 1974', 'Empecé actuando de niño en la televisión', 'Gané el Óscar con «El renacido»', 'Fui Jack en una película de 1997', 'En «Titanic» no cupe en la tabla con Rose'], respuestas: ['leonardo dicaprio', 'dicaprio'] },
  { pistas: ['Nací en Rosario', 'De niño me trataron por un problema de crecimiento', 'Jugué casi toda mi carrera en el Barcelona', 'Gané el Mundial de Catar 2022', 'Soy el capitán argentino con ocho Balones de Oro'], respuestas: ['lionel messi', 'messi', 'leo messi'] },
  { pistas: ['Nací en Barranquilla', 'Mi nombre significa «llena de gracia» en árabe', 'Canté «Waka Waka» en un Mundial', 'Fui pareja de Gerard Piqué', 'Canté que mis caderas no mienten'], respuestas: ['shakira'] },
  { pistas: ['Vivía en una alacena bajo la escalera', 'Mi lechuza se llama Hedwig', 'Juego de buscador en quidditch', 'Tengo una cicatriz con forma de rayo', 'Soy el mago creado por J. K. Rowling'], respuestas: ['harry potter'] },
  { pistas: ['Me construyeron para una exposición universal en 1889', 'Muchos artistas pidieron que me demolieran', 'Mido unos 330 metros', 'Estoy hecha de hierro', 'Soy el símbolo de París'], respuestas: ['torre eiffel', 'la torre eiffel'] },
  { pistas: ['Probablemente nací en Génova', 'Los Reyes Católicos financiaron mi viaje', 'Mis barcos eran la Niña, la Pinta y la Santa María', 'Creí que había llegado a la India', 'Llegué a América en 1492'], respuestas: ['cristobal colon', 'colon'] },
  { pistas: ['Aparecí en 1928 en «Steamboat Willie»', 'Mi novia se llama Minnie', 'Mi perro se llama Pluto', 'Tengo grandes orejas redondas', 'Soy el ratón más famoso de Disney'], respuestas: ['mickey mouse', 'mickey', 'raton mickey'] },
  { pistas: ['Empecé cantando con mis hermanos en los Jackson 5', 'Mi rancho se llamaba Neverland', 'Usaba un solo guante blanco', 'Mi disco «Thriller» es el más vendido de la historia', 'Me llamaban el Rey del Pop'], respuestas: ['michael jackson'] },
];
exports.pistasQueDespistanChile = [
  { pistas: ['Mi nombre real era Lucila Godoy', 'Nací en Vicuña en 1889', 'Fui profesora rural', 'Gané el Nobel de Literatura en 1945', 'Estoy en el billete de 5.000 pesos'], respuestas: ['gabriela mistral'] },
  { pistas: ['Mi nombre real era Ricardo Neftalí Reyes', 'Nací en Parral', 'Tuve casas en Isla Negra, Valparaíso y Santiago', 'Escribí «Veinte poemas de amor y una canción desesperada»', 'Gané el Nobel de Literatura en 1971'], respuestas: ['pablo neruda', 'neruda'] },
  { pistas: ['Nací en San Carlos, en Ñuble', 'Recorrí Chile recopilando folclor', 'Mis tapices se expusieron en el Louvre', 'Mis hijos Isabel y Ángel también fueron músicos', 'Compuse «Gracias a la vida»'], respuestas: ['violeta parra'] },
  { pistas: ['Fui abogado además de marino', 'Nací en Ninhue en 1848', 'Comandaba la Esmeralda', 'Grité «¡Al abordaje, muchachos!»', 'Soy el héroe del Combate Naval de Iquique'], respuestas: ['arturo prat', 'prat'] },
  { pistas: ['Nací en Tocopilla', 'De niño lavaba autos para ayudar a mi familia', 'Jugué en el Barcelona, el Arsenal y el Inter', 'Soy el máximo goleador de la selección chilena', 'Me apodan «el Niño Maravilla»'], respuestas: ['alexis sanchez', 'alexis'] },
  { pistas: ['Nací en 1949 en una revista', 'Vivo en Pelotillehue', 'Mi novia se llama Yayita', 'Mi sobrino es Coné', 'Cuando alguien cuenta un mal chiste, digo «¡Plop!»'], respuestas: ['condorito'] },
  { pistas: ['Nací en Chillán en 1778', 'Mi padre fue virrey del Perú', 'Me derrotaron en el Desastre de Rancagua', 'Crucé los Andes con San Martín', 'Fui el primer Director Supremo de Chile'], respuestas: ["bernardo o'higgins", "o'higgins", 'ohiggins'] },
  { pistas: ['Mi nombre real es Mario Kreutzberger', 'Nací en Talca', 'Animé «Sábado Gigante» durante más de 50 años', 'Mi grito de guerra es «¡Vamos!»', 'Soy el animador de la Teletón'], respuestas: ['don francisco', 'mario kreutzberger'] },
  { pistas: ['Somos casi mil', 'Nos tallaron en piedra volcánica del Rano Raraku', 'Algunos llevamos un pukao en la cabeza', 'Casi todos miramos hacia el interior de la isla', 'Somos las estatuas gigantes de Rapa Nui'], respuestas: ['moai', 'moais', 'los moais'] },
  { pistas: ['Nací en Santiago en 1975', 'Soy zurdo', 'Me apodaban «el Chino»', 'Gané Indian Wells y Miami el mismo año', 'Fui el primer latinoamericano número uno del ranking ATP'], respuestas: ['marcelo rios', 'rios', 'chino rios'] },
];

// --- Ajustes según el capítulo de estreno de 2026 (Chilevisión) ---
// Letra a letra: 15 palabras por equipo, como en el programa
const masLetras = {
  RS: [['Persona que vende flores', 'florista'], ['Capital de Francia', 'París'], ['El número que va después del dos', 'tres'],
    ['Lugar donde se estudia una carrera después del colegio', 'universidad'], ['El oso blanco del Polo Norte', 'oso polar']],
  CL: [['Deporte de canastas y balón naranjo', 'baloncesto'], ['Fiesta del día en que naciste', 'cumpleaños'], ['Lugar donde aprenden los niños', 'escuela'],
    ['Instrumento de viento de madera con llaves', 'clarinete'], ['El único mamífero que vuela', 'murciélago']],
  PE: [['Persona que escribe poemas', 'poeta'], ['Se patea en el fútbol', 'pelota'], ['Deporte con raqueta y paredes de vidrio', 'pádel'],
    ['Lo que ves en el cine', 'película'], ['Ave que abre su cola como un abanico', 'pavo real']],
  TN: [['El número que va después del diecinueve', 'veinte'], ['Prenda que cubre las dos piernas', 'pantalón'], ['Pez de dientes afilados', 'tiburón'],
    ['Médico de los dientes', 'dentista'], ['Mal tiempo con lluvia, viento y relámpagos', 'tormenta']],
  CH: [['Guiso espeso de jaibas o locos con pan y queso', 'chupe'], ['Pájaro del bosque del sur, de pecho rojizo, que canta fuerte', 'chucao'],
    ['Mina de cobre a tajo abierto cerca de Calama', 'Chuquicamata'], ['Sándwich con carne, porotos verdes, tomate y ají', 'chacarero'], ['Palabra chilena para preguntar si entendiste', 'cachai']],
  AR: [['Nombre originario de la Isla de Pascua', 'Rapa Nui'], ['Capital de la región de O\'Higgins', 'Rancagua'], ['Cerro de Santiago con una gran Virgen en la cima', 'San Cristóbal'],
    ['Ciudad del faro monumental, en la región de Coquimbo', 'La Serena'], ['Fiesta, en chileno', 'carrete']],
};
for (const set of [...exports.letraALetra, ...exports.letraALetraChile])
  for (const [pista, palabra, ...otras] of masLetras[set.letras] || []) set.palabras.push({ pista, palabra, otras });

// Palabras cruzadas: 9 palabras por panel, como en el programa
const novena = { 'Animales': X('El rey de la selva', 'le', 'ón'), 'Países': X('El país de las pirámides', 'egip', 'to'),
  'Instrumentos': X('Instrumento de cuerdas grande que se toca sentado y con arco', 'violon', 'chelo'), 'Profesiones': X('Diseña casas y edificios', 'arqui', 'tecto'),
  'Comida chilena': X('Carne a la parrilla', 'asa', 'do'), 'Lugares de Chile': X('Capital de la región de O\'Higgins', 'ranca', 'gua') };
for (const p of [...exports.palabrasCruzadas, ...exports.palabrasCruzadasChile]) if (novena[p.tema]) p.palabras.push(novena[p.tema]);
exports.palabrasCruzadasChile.push({ tema: 'Pescados', palabras: [
  X('Pescado azul muy común en las conservas', 'jur', 'el'), X('Pescado de carne rosada que se cría en el sur', 'sal', 'món'),
  X('Pescado blanco que se come frito en las caletas', 'mer', 'luza'), X('Pescado pequeño que viene en lata', 'sar', 'dina'),
  X('El pescado del famoso caldillo de Neruda', 'con', 'grio'), X('Pescado plano y plateado, muy pedido a la plancha', 'rei', 'neta'),
  X('Así le decimos en Chile al pez espada', 'alb', 'acora'), X('Pescado de estuario del sur, de carne blanca', 'rób', 'alo'),
  X('Pescado plano con los dos ojos del mismo lado', 'leng', 'uado')] });

// Pistas que despistan: no solo personajes; también objetos y conceptos (en el estreno salió un clip)
exports.pistasQueDespistan.push(
  { pistas: ['Un joven canadiense logró cambiar uno rojo por una casa', 'Me inventaron hace más de cien años', 'Estoy hecho de un alambre doblado', 'Un asistente de Office tenía mi forma', 'Sirvo para juntar hojas de papel'], respuestas: ['clip', 'clips', 'sujetapapeles'] },
  { pistas: ['Los caballeros ingleses me llevaban aunque no lloviera', 'Mary Poppins volaba conmigo', 'Tengo varillas y una tela', 'Dicen que abrirme dentro de la casa trae mala suerte', 'Me usas cuando llueve'], respuestas: ['paraguas'] },
  { pistas: ['Mi antepasado no tenía pedales y lo inventó un barón alemán en 1817', 'Tengo cadena', 'Mi carrera más famosa es el Tour de Francia', 'Tengo manubrio y sillín', 'Tengo dos ruedas y me mueves pedaleando'], respuestas: ['bicicleta', 'bici'] },
  { pistas: ['Los aztecas me tomaban amargo y con ají', 'Mis semillas sirvieron como moneda', 'Puedo ser blanco, con leche o amargo', 'En Pascua me regalan con forma de huevo', 'Me hacen con cacao'], respuestas: ['chocolate'] },
);
exports.pistasQueDespistanChile.push(
  { pistas: ['En China me usaban para mandar señales militares', 'Necesito viento', 'En Chile peleamos con hilo curado', 'Tengo cola y cuerpo de papel', 'Me elevas en septiembre en el cerro o la playa'], respuestas: ['volantin', 'cometa', 'pandorga'] },
  { pistas: ['Tengo un día nacional en Chile: el 4 de abril', 'Puedo ser de mariscos, de queso o de pino', 'Me hornean o me fríen', 'Tengo repulgue', 'Soy infaltable en las Fiestas Patrias'], respuestas: ['empanada'] },
  { pistas: ['El de 1960 en Valdivia es el más fuerte que se ha registrado', 'Después de mí vienen las réplicas', 'Me producen las placas tectónicas', 'Me miden en grados de magnitud', 'También soy un trago con pipeño y helado de piña'], respuestas: ['terremoto', 'sismo'] },
);

// La pista musical — el presentador pone la canción (Spotify, YouTube, la radio…) y los equipos dicen su nombre.
// Aquí solo están el título, el intérprete y tres pistas, de la más difícil a la más fácil (la 1.ª sale junto con la música).
const C = (titulo, artista, pistas, respuestas) => ({ titulo, artista, pistas, respuestas: respuestas || [titulo.toLowerCase()] });
exports.pistaMusical = [
  C('Despacito', 'Luis Fonsi y Daddy Yankee', ['Reguetón de 2017, uno de los videos más vistos de YouTube', 'La cantan un puertorriqueño de baladas y el «rey del reguetón»', 'Su título es un adverbio: lo contrario de «rapidito»']),
  C('Macarena', 'Los del Río', ['Éxito bailable de mediados de los 90', 'La canta un dúo de Sevilla', 'Tiene una coreografía famosa y es nombre de mujer']),
  C('La Bamba', 'Ritchie Valens', ['Rock and roll de 1958 basado en un son jarocho mexicano', 'La grabó Ritchie Valens, que murió a los 17 años', '«Para bailar … se necesita una poca de gracia»'], ['la bamba', 'bamba']),
  C('Bohemian Rhapsody', 'Queen', ['Rock de 1975 que dura casi seis minutos y no tiene estribillo', 'La canta Freddie Mercury con su banda', 'Su título mezcla «bohemio» con «rapsodia»'], ['bohemian rhapsody', 'rapsodia bohemia']),
  C('Thriller', 'Michael Jackson', ['Pop de 1982 con uno de los videoclips más famosos de la historia', 'La canta el «Rey del Pop»', 'En el video, el cantante se convierte en zombi']),
  C('Waka Waka (Esto es África)', 'Shakira', ['Canción oficial de un Mundial de fútbol', 'La canta una colombiana', 'El Mundial fue el de Sudáfrica 2010'], ['waka waka', 'esto es africa', 'waka waka esto es africa']),
  C('Livin\' la vida loca', 'Ricky Martin', ['Pop latino de 1999', 'La canta un puertorriqueño que antes estuvo en Menudo', 'Habla de una vida desenfrenada'], ['livin la vida loca', 'la vida loca', 'living la vida loca']),
  C('Gasolina', 'Daddy Yankee', ['Reguetón de 2004 que hizo famoso el género en el mundo', 'La canta Daddy Yankee', '«A ella le gusta la …»']),
  C('Let It Be', 'The Beatles', ['Balada rock de 1970', 'La cantan cuatro músicos de Liverpool', 'Su título dice «déjalo ser»'], ['let it be']),
  C('Imagine', 'John Lennon', ['Balada de 1971 tocada al piano', 'La canta un exintegrante de The Beatles', 'Pide imaginar un mundo sin guerras'], ['imagine', 'imagina']),
  C('Bailando', 'Enrique Iglesias', ['Pop latino de 2014', 'La canta el hijo de Julio Iglesias', 'Su título es un verbo en gerundio']),
  C('Smells Like Teen Spirit', 'Nirvana', ['Grunge de 1991', 'La canta Kurt Cobain con su banda', 'Su título habla del «espíritu adolescente»'], ['smells like teen spirit']),
  C('Dancing Queen', 'ABBA', ['Música disco de 1976', 'La canta un grupo sueco', 'Habla de una «reina del baile»'], ['dancing queen']),
  C('Vivir mi vida', 'Marc Anthony', ['Salsa de 2013', 'La canta un neoyorquino de origen puertorriqueño', '«Voy a reír, voy a bailar…»']),
  C('La camisa negra', 'Juanes', ['Pop rock de 2005', 'La canta un colombiano', 'Habla de una prenda de un color oscuro'], ['la camisa negra', 'camisa negra']),
  C('De música ligera', 'Soda Stereo', ['Rock argentino de 1990', 'La canta Gustavo Cerati con su banda', 'Su título habla de una música «poco pesada»'], ['de musica ligera', 'musica ligera']),
  C('Shape of You', 'Ed Sheeran', ['Pop de 2017', 'La canta un pelirrojo británico con su guitarra', 'Habla de la «forma» de alguien'], ['shape of you']),
  C('Billie Jean', 'Michael Jackson', ['Pop de 1983', 'En su presentación de 1983 se vio por primera vez el «moonwalk»', 'Es un nombre de mujer: Billie…'], ['billie jean']),
  C('Mamma Mia', 'ABBA', ['Pop de 1975', 'La canta un grupo sueco y también da nombre a un musical', 'Es una expresión italiana de sorpresa'], ['mamma mia', 'mama mia']),
  C('Rayando el sol', 'Maná', ['Rock pop mexicano de 1990', 'La canta Fher Olvera con su banda', '«… el sol, ¡oh, oh, oh!, desesperación»'], ['rayando el sol']),
];
exports.pistaMusicalChile = [
  C('Gracias a la vida', 'Violeta Parra', ['Canción de 1966', 'La compuso y cantó una folclorista nacida en San Carlos', 'Agradece por haber dado tanto']),
  C('Volver a los 17', 'Violeta Parra', ['Canción de 1966', 'La compuso la autora de «Gracias a la vida»', 'Habla de volver a ser adolescente'], ['volver a los 17', 'volver a los diecisiete']),
  C('Te recuerdo Amanda', 'Víctor Jara', ['Canción de 1969', 'La canta un cantautor de la Nueva Canción Chilena', 'Habla de una mujer que corre a la fábrica donde trabaja Manuel'], ['te recuerdo amanda']),
  C('El baile de los que sobran', 'Los Prisioneros', ['Rock chileno de 1986', 'La canta Jorge González con su banda de San Miguel', '«Únete al …»'], ['el baile de los que sobran', 'baile de los que sobran']),
  C('Tren al sur', 'Los Prisioneros', ['Rock chileno de 1990, del disco «Corazones»', 'La canta Jorge González con su banda', 'Habla de un viaje en ferrocarril']),
  C('Todos juntos', 'Los Jaivas', ['Canción de 1972, su primer gran éxito', 'La canta una banda de Viña del Mar que fusionó rock y folclor', 'Su título es un llamado a la unión']),
  C('Mira niñita', 'Los Jaivas', ['Canción de 1972', 'La canta la banda de «Alturas de Machu Picchu»', 'Le habla a una niña'], ['mira ninita', 'mira niñita']),
  C('La joya del Pacífico', 'Lucho Barrios', ['Vals porteño', 'La popularizó un cantante peruano muy querido en Chile', 'Le canta a Valparaíso'], ['la joya del pacifico', 'joya del pacifico']),
  C('Si vas para Chile', 'Los Huasos Quincheros', ['Canción de 1942 que se volvió un himno no oficial', 'La compuso Chito Faró', 'Le habla a un viajero que va a nuestro país']),
  C('Mi banderita chilena', 'Donato Román Heitman', ['Canción patria de 1935', 'Se canta en los colegios en septiembre', 'Le canta al emblema tricolor'], ['mi banderita chilena', 'banderita chilena']),
  C('Tu falta de querer', 'Mon Laferte', ['Balada de 2015', 'La canta una viñamarina que triunfó en México', 'Habla de la «falta de querer»']),
  C('Déjate caer', 'Los Tres', ['Rock chileno de 1995 que se hizo famoso en un MTV Unplugged', 'La canta Álvaro Henríquez con su banda de Concepción', 'Invita a «dejarse caer»'], ['dejate caer']),
  C('Mentira', 'La Ley', ['Canción de 2001 que estrenaron en su MTV Unplugged', 'La canta Beto Cuevas con su banda', 'Es lo contrario de la verdad']),
  C('El derecho de vivir en paz', 'Víctor Jara', ['Canción de 1971', 'La canta el autor de «Te recuerdo Amanda»', 'Está dedicada a Ho Chi Minh y a Vietnam'], ['el derecho de vivir en paz', 'derecho de vivir en paz']),
];
exports.pistaMusicalKids = [
  C('Cumpleaños feliz', 'Canción tradicional', ['Se canta en todo el mundo', 'Se canta una vez al año para alguien', 'Después se soplan las velas'], ['cumpleanos feliz', 'feliz cumpleanos']),
  C('Estrellita, ¿dónde estás?', 'Canción tradicional', ['Canción de cuna muy antigua', 'Mozart compuso variaciones con su melodía', 'Le pregunta a algo que brilla en el cielo'], ['estrellita donde estas', 'estrellita']),
  C('Libre soy', 'Frozen (Disney)', ['Canción de una película de Disney de 2013', 'La canta la reina Elsa', 'Su título habla de ser libre'], ['libre soy', 'let it go', 'suelta']),
  C('Hakuna Matata', 'El rey león (Disney)', ['Canción de una película de Disney de 1994', 'La cantan un suricato y un jabalí', 'Significa «no hay problema»']),
  C('Bajo el mar', 'La sirenita (Disney)', ['Canción de una película de Disney de 1989', 'La canta un cangrejo llamado Sebastián', 'Habla de la vida en el fondo del océano'], ['bajo el mar']),
  C('Baby Shark', 'Pinkfong', ['Video infantil coreano de 2016, el más visto de YouTube', 'Tiene un papá, una mamá y un abuelo', 'Es sobre una familia de tiburones'], ['baby shark', 'tiburon bebe']),
  C('Los pollitos dicen', 'Canción tradicional', ['Canción infantil tradicional en español', 'La gallina busca el maíz y el trigo', '«… pío, pío, pío»'], ['los pollitos dicen', 'los pollitos']),
  C('La vaca Lola', 'Canción infantil', ['Canción infantil muy famosa en internet', 'Su protagonista tiene cabeza y tiene cola', 'Hace «mu»'], ['la vaca lola', 'vaca lola']),
  C('Hay un amigo en mí', 'Toy Story (Disney · Pixar)', ['Canción de una película de 1995', 'Es la canción de un vaquero y un astronauta de juguete', 'Habla de la amistad'], ['hay un amigo en mi', 'yo soy tu amigo fiel', 'you ve got a friend in me']),
  C('Un elefante se balanceaba', 'Canción tradicional', ['Canción infantil para contar', 'Cada vez se suma uno más', 'Se balanceaban sobre la tela de una araña'], ['un elefante se balanceaba', 'los elefantes']),
];

// Todos contra todos — el presentador pone la canción y hay que decir quién la canta (el intérprete).
// Como en el programa, en cada partida hay una de película o serie: ahí hay que decir la obra.
const T = (titulo, artista, respuestas) => ({ titulo, artista, respuestas });
const O = (titulo, obra, respuestas) => ({ titulo, obra, respuestas });
exports.todosContraTodos = [
  T('Hips Don\'t Lie', 'Shakira', ['shakira']),
  T('Beat It', 'Michael Jackson', ['michael jackson']),
  T('Like a Prayer', 'Madonna', ['madonna']),
  T('Rolling in the Deep', 'Adele', ['adele']),
  T('Uptown Funk', 'Mark Ronson y Bruno Mars', ['bruno mars', 'mark ronson']),
  T('Bad Romance', 'Lady Gaga', ['lady gaga']),
  T('Hotel California', 'Eagles', ['eagles', 'the eagles']),
  T('Wonderwall', 'Oasis', ['oasis']),
  T('Yellow Submarine', 'The Beatles', ['the beatles', 'beatles', 'los beatles']),
  T('(I Can\'t Get No) Satisfaction', 'The Rolling Stones', ['the rolling stones', 'rolling stones', 'los rolling stones', 'los rolling']),
  T('Corazón espinado', 'Santana y Maná', ['santana', 'carlos santana', 'mana']),
  T('Persiana americana', 'Soda Stereo', ['soda stereo']),
  T('La flaca', 'Jarabe de Palo', ['jarabe de palo']),
  T('Mariposa traicionera', 'Maná', ['mana']),
  T('Tusa', 'Karol G y Nicki Minaj', ['karol g', 'nicki minaj']),
  T('Blinding Lights', 'The Weeknd', ['the weeknd', 'weeknd']),
  T('Bad Guy', 'Billie Eilish', ['billie eilish']),
  T('Suavemente', 'Elvis Crespo', ['elvis crespo']),
  T('Danza Kuduro', 'Don Omar y Lucenzo', ['don omar', 'lucenzo']),
  T('Tití me preguntó', 'Bad Bunny', ['bad bunny']),
  T('Flowers', 'Miley Cyrus', ['miley cyrus']),
  T('Shake It Off', 'Taylor Swift', ['taylor swift']),
  T('Highway to Hell', 'AC/DC', ['ac/dc', 'acdc']),
  T('La incondicional', 'Luis Miguel', ['luis miguel']),
  T('Rata de dos patas', 'Paquita la del Barrio', ['paquita la del barrio', 'paquita']),
  T('Despacito', 'Luis Fonsi y Daddy Yankee', ['luis fonsi', 'daddy yankee', 'fonsi']),
];
exports.todosContraTodosChile = [
  T('Corazones rojos', 'Los Prisioneros', ['los prisioneros', 'prisioneros']),
  T('Un amor violento', 'Los Tres', ['los tres']),
  T('Amárrame', 'Mon Laferte', ['mon laferte']),
  T('Aquí', 'La Ley', ['la ley']),
  T('Run Run se fue pa\'l norte', 'Violeta Parra', ['violeta parra']),
  T('El cigarrito', 'Víctor Jara', ['victor jara']),
  T('Sube a nacer conmigo hermano', 'Los Jaivas', ['los jaivas', 'jaivas']),
  T('Arriba en la cordillera', 'Patricio Manns', ['patricio manns']),
  T('Te vas', 'Américo', ['americo']),
  T('Mágico', 'Joe Vasconcellos', ['joe vasconcellos']),
  T('Al siguiente nivel', 'Javiera Mena', ['javiera mena']),
  T('Muérdete la lengua', 'Francisca Valenzuela', ['francisca valenzuela']),
  T('El hombre que yo amo', 'Myriam Hernández', ['myriam hernandez']),
  T('Hambre', 'Gepe y Wendy Sulca', ['gepe', 'wendy sulca']),
  T('Llueve sobre la ciudad', 'Los Bunkers', ['los bunkers', 'bunkers']),
  T('Cuando respiro en tu boca', 'Lucybell', ['lucybell']),
  T('El pueblo unido jamás será vencido', 'Quilapayún', ['quilapayun']),
  T('Tú me haces falta', 'Los Vásquez', ['los vasquez']),
  T('Dame luz', 'Nicole', ['nicole']),
  T('Loca', 'Chico Trujillo', ['chico trujillo']),
  T('Candombe para José', 'Illapu', ['illapu']),
];
exports.todosContraTodosKids = [
  T('Baby Shark', 'Pinkfong', ['pinkfong']),
  T('Waka Waka', 'Shakira', ['shakira']),
  T('Happy', 'Pharrell Williams', ['pharrell williams', 'pharrell']),
  T('Shake It Off', 'Taylor Swift', ['taylor swift']),
  T('Despacito', 'Luis Fonsi y Daddy Yankee', ['luis fonsi', 'daddy yankee', 'fonsi']),
];
exports.todosContraTodosObra = [
  O('My Heart Will Go On', 'Titanic', ['titanic']),
  O('Eye of the Tiger', 'Rocky III', ['rocky', 'rocky 3', 'rocky iii']),
  O('Ghostbusters', 'Los cazafantasmas', ['los cazafantasmas', 'cazafantasmas', 'ghostbusters']),
  O('I\'ll Be There for You', 'Friends', ['friends']),
  O('Stayin\' Alive', 'Fiebre de sábado por la noche', ['fiebre de sabado por la noche', 'saturday night fever']),
  O('Shallow', 'Nace una estrella', ['nace una estrella', 'a star is born']),
];
exports.todosContraTodosObraChile = [
  O('Mi muñeca me habló', '31 minutos', ['31 minutos', 'treinta y un minutos']),
  O('Tangananica-Tanganana', '31 minutos', ['31 minutos', 'treinta y un minutos']),
  O('Yo nunca vi televisión', '31 minutos', ['31 minutos', 'treinta y un minutos']),
];
exports.todosContraTodosObraKids = [
  O('Hakuna Matata', 'El rey león', ['el rey leon', 'rey leon']),
  O('Bajo el mar', 'La sirenita', ['la sirenita', 'sirenita']),
  O('Libre soy', 'Frozen', ['frozen']),
  O('Hay un amigo en mí', 'Toy Story', ['toy story']),
  O('No se habla de Bruno', 'Encanto', ['encanto']),
];
