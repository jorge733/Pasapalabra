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
