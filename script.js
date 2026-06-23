/* ============================================================
   Bauti: Creador de Personajes — script.js
   Sin frameworks. Sin backend. Sin datos personales.
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   §1  CONSTANTES Y DATOS
   ───────────────────────────────────────────────────────────── */

const STORAGE_KEY = "bauti_lab_v1";

const LEVELS = {
  explorador: { label: "Explorador", emoji: "🧭", desc: "Sumas y restas con números chicos. ¡Ideal para empezar!" },
  creador:    { label: "Creador",    emoji: "🛠️", desc: "Sumas, restas, multiplicaciones y divisiones simples." },
  genio:      { label: "Genio",      emoji: "🧠", desc: "Operaciones combinadas. Para mentes despiertas." },
};

const MODE_DEFS = {
  character: { label: "Crear Personaje",   emoji: "🦸", color: "violet", desc: "Resolvé cuentas para descubrir cómo es tu personaje y después dibujalo." },
  world:     { label: "Crear Mundo",       emoji: "🌍", color: "cyan",   desc: "Diseñá un planeta, ciudad o escenario fantástico." },
  story:     { label: "Crear Historia",    emoji: "📖", color: "mint",   desc: "Resolvé desafíos para armar una mini historia loca." },
  invention: { label: "Invento Imposible", emoji: "⚙️", color: "amber",  desc: "Creá una máquina absurda con poderes rarísimos." },
  daily:     { label: "Desafío del Día",   emoji: "⚡", color: "special",desc: "Misión mezclada con más puntos y medalla especial." },
};

// ─── Tablas de resolución creativa ───────────────────────────

const T = {
  // ── Personaje (simple, visual, para dibujar) ─────────────
  charType:  [
    "monstruito simpático",
    "robot colorido",
    "dragón chiquito",
    "alien curioso",
    "superhéroe raro",
    "animal inventado",
    "duende del bosque",
    "mascota mágica",
    "fantasmita travieso",
    "explorador valiente",
  ],
  headShape: [
    "cabeza redonda y grande",
    "cabeza triangular",
    "cabeza cuadrada con antenas",
    "cabeza grandota",
    "cabeza chiquita y ovalada",
  ],
  eyeColors: [
    "azules", "verdes", "rojos", "amarillos", "violetas",
    "negros brillantes", "anaranjados", "rosas", "celestes", "de colores",
  ],
  hairType: [
    "pelo verde cortito",
    "pelado con una estrella pintada",
    "pelo azul con rulos",
    "pelo rojo despeinado",
    "gorra amarilla grandota",
    "anteojos de sol en la cabeza",
    "orejas enormes como de conejo",
    "cuernitos pequeños",
    "antenas con bolitas en la punta",
    "capucha violeta",
  ],
  mouthType: [
    "sonrisa enorme",
    "dos dientitos blancos",
    "boca chiquita con bigotes",
    "dientes que brillan",
    "boca con lengua afuera",
    "sonrisa que llega a las orejas",
    "colmillos simpáticos",
    "boca de robot cuadrada",
    "boca feliz de oreja a oreja",
    "boca de círculo sorprendida",
  ],
  bodyColor: [
    "violeta con manchas amarillas",
    "verde con rayas negras",
    "azul cielo liso",
    "rojo con puntitos blancos",
    "naranja con parches",
    "rosado brillante",
    "amarillo con corazones",
    "celeste con estrellitas",
    "negro con brillos",
    "de todos los colores mezclados",
  ],
  legsFull: [
    "2 piernas cortitas",
    "4 piernas rápidas",
    "2 piernas muy largas",
    "2 piernas con resortes",
    "4 patas de dinosaurio",
    "2 piernas con zapatillas coloridas",
    "6 patas finitas",
    "2 piernas saltarinas",
  ],
  accessory: [
    "anteojos redondos",
    "gorra con hélice",
    "capa azul corta",
    "mochila con alas",
    "bufanda de lunares",
    "zapatillas de cohete",
    "sombrero gigante",
    "auriculares de colores",
  ],
  power: [
    "saltar muy pero muy alto",
    "volar dando vueltas",
    "hacer aparecer pizza de la nada",
    "correr más rápido que un auto",
    "hablar con todos los animales",
    "cambiar de color cuando quiere",
    "hacer reír a todos con una mirada",
    "hacerse muy chiquito",
    "hacerse muy grande",
    "tirar rayitos de colores",
  ],
  weakness: [
    "se tienta con cosquillas",
    "le dan miedo las arañas chiquitas",
    "se duerme con música lenta",
    "se distrae mirando dibujos",
    "no puede dejar de bailar",
    "estornuda con purpurina",
    "se ríe cuando cuenta hasta diez",
    "se olvida dónde dejó la mochila",
    "se cae si corre muy rápido",
    "se pone nervioso si ve brócoli",
  ],

  // ── Mundo (sin cambios) ──────────────────────────────────
  worldType:   ["planeta gaseoso flotante","mundo subterráneo con cielo propio","dimensión paralela con física rara","isla estelar a la deriva","universo en miniatura dentro de un frasco","ciudad orbital que gira sola","planeta cristalino que resuena","mundo de niebla densa habitable","planeta invertido (tierra arriba)","dimensión temporal congelada"],
  skyColor:    ["verde eléctrico","violeta profundo","naranja metálico","azul de tormenta permanente","dorado brillante con grietas negras","rosado fluorescente","blanco con venas negras visibles"],
  terrainType: ["islas que flotan y rebotan","cristales gigantes como rascacielos","espirales de metal que crecen solas","llanuras de neón parpadeante","montañas de vidrio que tintinean"],
  climate:     ["lluvia de estrellas frías","tormenta de colores sin viento","niebla musical constante","viento de recuerdos ajenos","nieve pixelada que no derrite","calor invisible que sí se siente","lluvia de datos visuales","vendaval de ideas sueltas","granizo de burbujas jabonosas","sol con sonido propio"],
  creature:    ["peces que vuelan en formación","robots-planta fotosintéticos","nubes con personalidad irascible","tortugas de cristal traslúcido","pájaros de fuego frío azul","medusas del cielo que fulguran","lobos electromagnéticos en manada","mariposas de metal cantoras"],
  danger:      ["puertas invisibles que aparecen al azar","gravedad que cambia cada hora en punto","eco que borra fragmentos de memoria","sombras que copian movimientos con retraso","números que se hablan entre ellos","espejos que muestran el futuro incómodo","suelos que cambian de color sin aviso","viento que susurra preguntas sin respuesta","lluvia que da ideas raras al azar","silencio que hace un ruido molesto"],
  treasure:    ["cristal de memoria comprimida","semilla de universo sin plantar","reloj que para el tiempo local","llave que abre 7 dimensiones a la vez","libro que se escribe solo con tus deseos","frasco de tiempo concentrado (peligroso)"],
  worldRule:   ["nadie puede caminar en línea recta","los colores cambian según el estado de ánimo","las matemáticas funcionan al revés (y funciona)","todo lo que se nombra tres veces aparece","nadie puede mentir (pero pueden cantar)","la gravedad es opcional antes del mediodía","el tiempo pasa más rápido mientras dormís","los sueños se vuelven edificios al amanecer","los números tienen sabor (el 7 es salado)","las sombras son portales unidireccionales"],

  // ── Historia (sin cambios) ───────────────────────────────
  protagonist: ["un robot perdido sin mapa de regreso","una chica que puede ver un segundo al futuro","un científico con memoria perfecta pero selectiva","un monstruo amigable rechazado por los monstruos","un explorador sin brújula ni destino","una máquina que aprendió a soñar","un chico cuyos poderes funcionan al revés","una artista que dibuja cosas que luego existen","un guardián del tiempo jubilado antes de tiempo","un alienígena en su primer día en la Tierra"],
  storyPlace:  ["una biblioteca infinita con libros que se mueven","una ciudad completamente bajo el agua","un laberinto de cristal que cambia solo","la última estación del tren espacial intergaláctico","un bosque que aparece y desaparece según el humor","una escuela que flota y nunca aterriza","el último piso de una torre sin fin conocida"],
  problem:     ["perdió algo que nunca tuvo pero extraña igual","debe resolver un misterio sin ninguna pista real","necesita llegar a un lugar que no existe todavía","alguien borró su historia de todos los registros","el tiempo se está acabando (literalmente, el reloj se encoge)","encontró una puerta y olvidó por qué la buscaba","tiene el poder pero no recuerda cómo usarlo","el mapa dice que ya llegó pero no hay nada","debe elegir entre dos caminos igualmente imposibles","descubrió que es el personaje de alguien más"],
  ally:        ["una criatura que solo habla en ecuaciones","un fantasma matemático muy ansioso","una mochila parlante que da consejos (siempre malos)","un robot que tiene miedo de los robots","una sombra con personalidad totalmente opuesta","un libro que interrumpe en el momento menos oportuno"],
  magicObject: ["una llave que abre preguntas en lugar de puertas","un espejo que muestra el futuro imperfecto","un reloj que va para atrás (nunca para adelante)","una lapicera que escribe sola lo que deberías decir","un mapa que siempre está equivocado pero lleva al destino","un número secreto que cambia todo al pronunciarlo","una piedra que graba fragmentos de recuerdos ajenos","un libro con páginas en blanco que ya tiene respuestas","una botella con tiempo concentrado (caduca pronto)","un portal de bolsillo (solo funciona de noche)"],
  enemy:       ["un dragón invisible que se nota por el olor a humo","el guardián del olvido que borra nombres","una máquina que hace preguntas sin respuesta conocida","una sombra que copia todo con un segundo de retraso","el Señor del Error Matemático","una nube que borra palabras cuando llueve","el Algoritmo Rebelde que reescribe las reglas","un espejo que atrapa reflejos y los usa como ejército"],
  twist:       ["resulta que el enemigo era un aliado disfrazado sin saberlo","el lugar en realidad ES el personaje principal","el objeto mágico tenía las instrucciones al revés","todo era un sueño dentro de otro sueño (dentro de otro)","el final era en realidad el comienzo de todo","el protagonista ya había estado antes sin recordarlo","la solución era no resolverlo y esperar","el aliado era el verdadero villano desde el principio","existía una tercera opción que nadie consideró","la historia no termina: continúa en el dibujo"],
  ending:      ["encontró lo que buscaba pero ya no lo necesitaba","la aventura terminó pero el portal siguió abierto","ganaron pero el mundo ya no era exactamente igual","el misterio se resolvió y apareció uno más grande"],

  // ── Invento (sin cambios) ────────────────────────────────
  invFunction: ["ordenar pensamientos en carpetas invisibles","traducir emociones a código ejecutable","predecir el próximo error antes de cometerlo","convertir el aburrimiento en energía cinética","copiar habilidades por exactamente 10 minutos","crear puentes entre ideas incompatibles","detectar mentiras matemáticas con sonido","guardar sueños en formato comprimido portátil","ampliar el tiempo libre un 40%","resolver el problema antes de que ocurra"],
  invShape:    ["mochila con paneles laterales","casco esférico transparente","guante con pantalla táctil integrada","caja con ruedas y antenas","anillo gigante ajustable","torre plegable de bolsillo"],
  invSize:     ["microscópico (necesitás lupa)","del tamaño de un lápiz grueso","como una mochila escolar","del tamaño de una persona adulta","como una casa pequeña","como un edificio de 3 pisos","gigante (necesitás equipo para moverlo)","invisible pero enorme (calculado)","cambia de tamaño según quién lo usa","exactamente del tamaño de un bolsillo"],
  invMaterial: ["cristal de energía azul autocargable","metal que aprende y se adapta","plástico del futuro (no existe todavía)","madera eléctrica de árbol raro","luz comprimida en estado sólido","tiempo solidificado (delicado)","sonido endurecido a temperatura ambiente","matemáticas en estado sólido (pesadas)"],
  invEnergy:   ["risas genuinas (sin falsas)","confusión resuelta correctamente","sueños de medianoche específicos","preguntas sin respuesta conocida","energía de la primera idea del día","silencio de exactamente 3 segundos","ruido de fondo de cafetería","ecuaciones correctas completadas","creatividad pura sin filtro","la energía del '¡Ajá!' espontáneo"],
  invEffect:   ["hace flotar los zapatos del usuario","convierte el habla en música 8-bit","hace aparecer números en el aire alrededor","cambia el color del cabello según el humor","hace que objetos cercanos hablen brevemente","multiplica el hambre por 3 de golpe","activa una melodía cuando alguien miente cerca"],
  invUser:     ["exploradores despistados con ideas","matemáticos creativos sin papel","artistas con exceso de ideas simultáneas","inventores sin taller disponible","chicos que se aburren fácil en cualquier lugar","personas con demasiadas preguntas a la vez","soñadores sin hora de dormir fija","científicos que se ríen de sus propios errores","dibujantes que necesitan inspiración urgente","cualquiera que quiera cambiar algo del mundo"],
};

// ─── Etiquetas para galería (cuando mission = null) ──────────
const FEATURE_LABELS = {
  charType: "Tipo", headShape: "Cabeza", eyesFull: "Ojos", hairType: "Pelo",
  mouthType: "Boca", bodyColor: "Cuerpo", armsFull: "Brazos", legsFull: "Piernas",
  clothing: "Ropa", accessory: "Accesorio", power: "Poder",
  worldType: "Tipo de mundo", skyColor: "Cielo", moonCount: "Lunas",
  terrainType: "Terreno", climate: "Clima", creature: "Criaturas",
  danger: "Peligro", treasure: "Tesoro", worldRule: "Regla extraña",
  protagonist: "Protagonista", storyPlace: "Lugar", problem: "El problema",
  ally: "Aliado", magicObject: "Objeto especial", enemy: "Antagonista",
  twist: "Giro", ending: "Final",
  invFunction: "Función", invShape: "Forma", invSize: "Tamaño",
  invMaterial: "Material", buttonCount: "Botones", invEnergy: "Energía",
  invEffect: "Efecto", invUser: "Para quién",
};

// ─── Palabras en inglés ───────────────────────────────────────
const ENGLISH_POOL = {
  character: [
    { word: "Eyes",   translation: "ojos",    sentence: "My character has big colorful eyes.",      hint: "Contá los eyes de tu personaje y decilo en inglés." },
    { word: "Arms",   translation: "brazos",  sentence: "Extra arms make any job easier.",          hint: "Describí los arms de tu personaje en inglés." },
    { word: "Power",  translation: "poder",   sentence: "My hero has a very special power.",        hint: "Decile a alguien qué power tiene tu personaje." },
    { word: "Head",   translation: "cabeza",  sentence: "The creature has a very strange head.",    hint: "Describí la head de tu personaje en inglés." },
    { word: "Legs",   translation: "piernas", sentence: "Long legs help you run very fast.",        hint: "¿Cuántas legs tiene tu personaje? Decilo en inglés." },
    { word: "Color",  translation: "color",   sentence: "What color is your character's body?",    hint: "Decí el color de tu personaje en inglés." },
  ],
  world: [
    { word: "World",   translation: "mundo",   sentence: "This world has very strange rules.",     hint: "Describí una regla de tu world en inglés." },
    { word: "Star",    translation: "estrella", sentence: "Every star in this sky has a name.",    hint: "Inventá 3 nombres de stars en inglés." },
    { word: "Ocean",   translation: "océano",  sentence: "The ocean has its own weather system.",  hint: "Nombrá 3 criaturas de tu ocean en inglés." },
    { word: "Forest",  translation: "bosque",  sentence: "The forest grows upside down here.",     hint: "Nombrá 3 cosas raras de tu forest." },
    { word: "Light",   translation: "luz",     sentence: "Light travels differently in this world.",hint: "¿De qué color es el light de tu mundo?" },
    { word: "Crystal", translation: "cristal", sentence: "Crystal stores memories and light.",     hint: "¿De qué color es el crystal de tu mundo?" },
  ],
  story: [
    { word: "Story",  translation: "historia", sentence: "A good story always has a twist.",       hint: "Resumí tu story en una oración en inglés." },
    { word: "Key",    translation: "llave",    sentence: "The key opens a door to the future.",    hint: "¿Qué encierra la key de tu historia?" },
    { word: "Door",   translation: "puerta",   sentence: "Behind every door is a new world.",      hint: "¿Qué hay detrás de la door de tu historia?" },
    { word: "Friend", translation: "amigo",    sentence: "A true friend helps in weird times.",    hint: "Describí al friend de tu historia en inglés." },
    { word: "Enemy",  translation: "enemigo",  sentence: "The enemy was right all along.",         hint: "Describí al enemy de tu historia en inglés." },
    { word: "Secret", translation: "secreto",  sentence: "Every great story has a secret.",        hint: "¿Cuál es el secret de tu historia?" },
  ],
  invention: [
    { word: "Machine", translation: "máquina",  sentence: "This machine can think for itself.",   hint: "Listá 3 funciones de tu machine en inglés." },
    { word: "Speed",   translation: "velocidad",sentence: "Speed is nothing without control.",    hint: "¿Qué tan rápido va tu invento? Describilo." },
    { word: "Time",    translation: "tiempo",   sentence: "Time moves differently in this device.",hint: "¿Cómo cambia el time con tu invento?" },
    { word: "Space",   translation: "espacio",  sentence: "Space inside the machine is infinite.", hint: "¿Cuánto space tiene tu invento adentro?" },
    { word: "Fire",    translation: "fuego",    sentence: "The fire in this engine burns cold.",   hint: "¿Usa fire tu invento? ¿Cómo?" },
    { word: "Ice",     translation: "hielo",    sentence: "The ice here never melts.",             hint: "¿Usa ice tu invento? ¿Para qué?" },
  ],
  daily: [
    { word: "Dragon",  translation: "dragón",  sentence: "The dragon guards the crystal tower.", hint: "Describí a tu dragon en 3 palabras en inglés." },
    { word: "Castle",  translation: "castillo",sentence: "The castle has no doors, only windows.",hint: "Describí tu castle en inglés." },
    { word: "Map",     translation: "mapa",    sentence: "The map shows a hidden treasure.",     hint: "Marcá 3 puntos de tu world con nombres en inglés." },
    { word: "Monster", translation: "monstruo",sentence: "The monster is friendly and creative.",hint: "Describí tu monster en inglés." },
    { word: "Robot",   translation: "robot",   sentence: "The robot can solve any problem.",     hint: "Nombrá 3 partes de tu robot en inglés." },
    { word: "City",    translation: "ciudad",  sentence: "The city floats above the clouds.",    hint: "Nombrá 3 lugares de tu city en inglés." },
  ],
};

// ─── 30 misiones sugeridas ────────────────────────────────────
const DAILY_MISSIONS = [
  { day: 1,  title: "Monstruo espacial",     mode: "character",  desc: "Creá un monstruo del espacio exterior." },
  { day: 2,  title: "Planeta desconocido",   mode: "world",      desc: "Diseñá un planeta que nadie conoce todavía." },
  { day: 3,  title: "Robot inventor",        mode: "invention",  desc: "Inventá una máquina creada por un robot." },
  { day: 4,  title: "Biblioteca infinita",   mode: "story",      desc: "Una historia en una biblioteca que no termina." },
  { day: 5,  title: "Jefe del laboratorio",  mode: "daily",      desc: "Misión especial de alto voltaje creativo." },
  { day: 6,  title: "Criatura del océano",   mode: "character",  desc: "Creá una criatura de las profundidades." },
  { day: 7,  title: "Ciudad flotante",       mode: "world",      desc: "Diseñá una ciudad que flota en el cielo." },
  { day: 8,  title: "Invento absurdo",       mode: "invention",  desc: "Creá la máquina más rara del universo." },
  { day: 9,  title: "El mapa del tesoro",    mode: "story",      desc: "Una historia sobre un mapa que cambia solo." },
  { day: 10, title: "Desafío intermedio",    mode: "daily",      desc: "Misión especial: ¡llegaste a la décima!" },
  { day: 11, title: "Superhéroe secreto",    mode: "character",  desc: "Creá un héroe con poderes únicos." },
  { day: 12, title: "Mundo de cristal",      mode: "world",      desc: "Diseñá un mundo donde todo es de cristal." },
  { day: 13, title: "Máquina del tiempo",    mode: "invention",  desc: "Inventá una máquina que viaja en el tiempo." },
  { day: 14, title: "La puerta secreta",     mode: "story",      desc: "Una historia detrás de una puerta misteriosa." },
  { day: 15, title: "Desafío de la mitad",   mode: "daily",      desc: "¡Mitad del Lab! Misión épica especial." },
  { day: 16, title: "Dragón moderno",        mode: "character",  desc: "Creá un dragón adaptado a la vida urbana." },
  { day: 17, title: "Bosque magnético",      mode: "world",      desc: "Un bosque donde las plantas tienen campos magnéticos." },
  { day: 18, title: "Comida mutante",        mode: "invention",  desc: "Inventá un alimento que transforma a quien lo come." },
  { day: 19, title: "La ciudad perdida",     mode: "story",      desc: "Una historia sobre una ciudad que desapareció." },
  { day: 20, title: "Desafío avanzado",      mode: "daily",      desc: "Nivel avanzado. ¡Vamos!" },
  { day: 21, title: "Villano simpático",     mode: "character",  desc: "Creá un villano que no es tan malo en el fondo." },
  { day: 22, title: "Planeta de hielo",      mode: "world",      desc: "Diseñá un planeta completamente congelado." },
  { day: 23, title: "Zapatillas voladoras",  mode: "invention",  desc: "Inventá unas zapatillas con propulsores." },
  { day: 24, title: "El último guardián",    mode: "story",      desc: "Una historia sobre el guardián de una puerta." },
  { day: 25, title: "Desafío master",        mode: "daily",      desc: "Casi terminás. ¡Misión épica penúltima!" },
  { day: 26, title: "Mascota alienígena",    mode: "character",  desc: "Creá una mascota de otro planeta." },
  { day: 27, title: "Mundo submarino",       mode: "world",      desc: "Diseñá un mundo completamente bajo el agua." },
  { day: 28, title: "Invento del año",       mode: "invention",  desc: "Creá el invento más importante de la historia." },
  { day: 29, title: "La última misión",      mode: "story",      desc: "Una historia que termina con una pregunta abierta." },
  { day: 30, title: "Obra maestra del Lab",  mode: "daily",      desc: "La misión final. Tu obra maestra personal." },
];

// ─── Medallas ─────────────────────────────────────────────────
const BADGE_DEFS = [
  { id: "first",   emoji: "✏️", title: "Primera Creación",     desc: "Completaste tu primera misión.",  check: s => s.completedMissions >= 1 },
  { id: "m5",      emoji: "🌟", title: "5 Misiones",           desc: "5 misiones completadas.",         check: s => s.completedMissions >= 5 },
  { id: "m10",     emoji: "🧪", title: "Laboratorio Activo",   desc: "10 misiones completadas.",        check: s => s.completedMissions >= 10 },
  { id: "m15",     emoji: "🎨", title: "Mente Creativa",       desc: "15 misiones completadas.",        check: s => s.completedMissions >= 15 },
  { id: "m20",     emoji: "🔭", title: "Artista Lógico",       desc: "20 misiones completadas.",        check: s => s.completedMissions >= 20 },
  { id: "m25",     emoji: "🏅", title: "Casi Leyenda",         desc: "25 misiones completadas.",        check: s => s.completedMissions >= 25 },
  { id: "m30",     emoji: "👑", title: "Genio del Lab",        desc: "30 misiones completadas.",        check: s => s.completedMissions >= 30 },
  { id: "chars",   emoji: "🦸", title: "Maestro de Personajes",desc: "5 personajes creados.",           check: s => s.creations.filter(c => c.mode === "character").length >= 5 },
  { id: "worlds",  emoji: "🌍", title: "Arquitecto de Mundos", desc: "5 mundos creados.",               check: s => s.creations.filter(c => c.mode === "world").length >= 5 },
  { id: "invs",    emoji: "⚙️", title: "Inventor Imposible",   desc: "5 inventos creados.",             check: s => s.creations.filter(c => c.mode === "invention").length >= 5 },
  { id: "stories", emoji: "📖", title: "Narrador Creativo",    desc: "5 historias creadas.",            check: s => s.creations.filter(c => c.mode === "story").length >= 5 },
  { id: "math",    emoji: "🧠", title: "Mente Matemática",     desc: "50 respuestas correctas.",        check: s => (s.totalCorrect || 0) >= 50 },
];

const FB = {
  wrong1:  ["¡Bau, casi! Revisá la cuenta una vez más.", "Le erraste por poco. Probá de nuevo.", "Buen intento. Fijate bien en la operación."],
  wrong2:  ["Probá la cuenta por partes, de a poco.", "Tomátelo con calma: ¿cuál es la primera operación?", "Separalo en pasos más chicos y volvé a intentar."],
  correct: ["¡Correcto, Bau! Desbloqueaste una parte de tu personaje.", "Exacto. Aparece una nueva parte en tu ficha.", "¡Muy bien, Bau! Tu personaje acaba de ganar un detalle nuevo."],
};

// Tiempos del relojito por nivel (en segundos)
const TIMER_SECS = { explorador: 10, creador: 8, genio: 6 };

/* ─────────────────────────────────────────────────────────────
   §2  ESTADO
   ───────────────────────────────────────────────────────────── */

function defaultState() {
  return {
    selectedLevel: null,
    stars: 0,
    completedMissions: 0,
    completedDays: [],
    badges: [],
    creations: [],
    totalCorrect: 0,
    currentStreak: 0,
    lastPlayedDate: null,
  };
}

let state = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch { return defaultState(); }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn("No se pudo guardar:", e); }
}

function resetProgress() {
  if (!confirm("¿Seguro querés reiniciar todo el progreso? Esta acción no se puede deshacer.")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  mission = null;
  renderHome();
}

/* ─────────────────────────────────────────────────────────────
   §3  MISIÓN (transient — no persiste en localStorage)
   ───────────────────────────────────────────────────────────── */

let mission = null;

/* ─────────────────────────────────────────────────────────────
   §4  RELOJITO POR CUENTA
   ───────────────────────────────────────────────────────────── */

let timerInterval = null;
let timerSecondsLeft = 0;

function startTimer() {
  stopTimer();
  timerSecondsLeft = TIMER_SECS[state.selectedLevel] || 10;
  updateTimerDisplay();
  timerInterval = setInterval(function () {
    timerSecondsLeft--;
    updateTimerDisplay();
    if (timerSecondsLeft <= 0) {
      stopTimer();
      onTimerExpired();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const el = document.getElementById("step-timer");
  if (!el) return;
  el.textContent = "⏱️ " + timerSecondsLeft + "s";
  if (timerSecondsLeft <= 3) {
    el.classList.add("timer-danger");
  } else {
    el.classList.remove("timer-danger");
  }
}

function onTimerExpired() {
  if (mission) mission.totalErrors++;
  updateFeedback("⏱️ ¡Tiempo! Ahora resolvela tranqui, sin apuro.", "hint");
}

/* ─────────────────────────────────────────────────────────────
   §5  GENERACIÓN MATEMÁTICA
   ───────────────────────────────────────────────────────────── */

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateMathProblem(level) {
  if (level === "explorador") {
    const op = pickRandom(["+", "-"]);
    if (op === "+") { const a = randInt(1, 15), b = randInt(1, 15); return { question: a + " + " + b, answer: a + b }; }
    else            { const b = randInt(1, 10), a = randInt(b, 20); return { question: a + " - " + b, answer: a - b }; }
  }
  if (level === "creador") {
    const op = pickRandom(["+", "-", "×", "÷"]);
    if (op === "+") { const a = randInt(10, 50), b = randInt(5, 40); return { question: a + " + " + b, answer: a + b }; }
    if (op === "-") { const b = randInt(5, 30),  a = randInt(b+5, 70); return { question: a + " - " + b, answer: a - b }; }
    if (op === "×") { const a = randInt(2, 9),   b = randInt(2, 9);   return { question: a + " × " + b, answer: a * b }; }
    /* ÷ */         { const b = randInt(2, 9),   r = randInt(2, 12);  return { question: (r*b) + " ÷ " + b, answer: r }; }
  }
  /* genio */
  const type = pickRandom(["am", "ms", "da", "mas"]);
  if (type === "am")  { const a = randInt(2,8), b = randInt(2,8), c = randInt(2,10); return { question: a+" × "+b+" + "+c, answer: a*b+c }; }
  if (type === "ms")  { const a = randInt(3,9), b = randInt(3,9), c = randInt(2, Math.floor(a*b/2)||2); return { question: a+" × "+b+" - "+c, answer: a*b-c }; }
  if (type === "da")  { const b = randInt(2,8), r = randInt(3,12), c = randInt(5,20); return { question: (r*b)+" ÷ "+b+" + "+c, answer: r+c }; }
  /* mas */           { const a = randInt(2,6), b = randInt(2,6), c = randInt(2,10), d = randInt(1,c||1); return { question: a+" × "+b+" + "+c+" - "+d, answer: a*b+c-d }; }
}

/* ─────────────────────────────────────────────────────────────
   §6  RESOLUCIÓN CREATIVA
   ───────────────────────────────────────────────────────────── */

function ld(n)        { return Math.abs(n) % 10; }
function clamp(n,a,b) { return Math.min(b, Math.max(a, Math.abs(n))); }
function pick(arr, n) { return arr[Math.abs(n) % arr.length]; }

const RESOLVERS = {
  // ── Personaje (simple y visual) ─────────────────────────
  charType:  function(n) { return pick(T.charType, ld(n)); },
  headShape: function(n) { return pick(T.headShape, n % 5); },
  eyesFull:  function(n) {
    var c = clamp(n, 1, 6);
    return c + " ojo" + (c > 1 ? "s" : "") + " " + pick(T.eyeColors, ld(n));
  },
  hairType:  function(n) { return pick(T.hairType, ld(n)); },
  mouthType: function(n) { return pick(T.mouthType, ld(n)); },
  bodyColor: function(n) { return pick(T.bodyColor, ld(n)); },
  armsFull:  function(n) {
    var opts = [
      "2 brazos largos",
      "4 brazos cortitos",
      "2 brazos con guantes enormes",
      "3 brazos musculosos",
      "6 brazos finitos",
      "2 brazos grandotes",
    ];
    return pick(opts, n % 6);
  },
  legsFull:  function(n) { return pick(T.legsFull, n % 8); },
  clothing:  function(n) {
    var opts = [
      "remera roja con estrella",
      "buzo azul grandote",
      "remera de rayas",
      "camiseta con número 7",
      "mameluco verde",
      "remera con corazón",
      "campera amarilla",
      "pijama de puntos",
      "remera con cohetes",
      "sin ropa (sólo pintura en la panza)",
    ];
    return pick(opts, ld(n));
  },
  accessory: function(n) { return pick(T.accessory, n % 8); },
  power:     function(n) { return pick(T.power, ld(n)); },

  // ── Mundo ───────────────────────────────────────────────
  worldType:   function(n) { return pick(T.worldType, ld(n)); },
  skyColor:    function(n) { return pick(T.skyColor, n % 7); },
  moonCount:   function(n) { var c = clamp(n,1,7); return c + " luna" + (c > 1 ? "s" : ""); },
  terrainType: function(n) { return pick(T.terrainType, n % 5); },
  climate:     function(n) { return pick(T.climate, ld(n)); },
  creature:    function(n) { return pick(T.creature, n % 8); },
  danger:      function(n) { return pick(T.danger, ld(n)); },
  treasure:    function(n) { return pick(T.treasure, n % 6); },
  worldRule:   function(n) { return pick(T.worldRule, ld(n)); },

  // ── Historia ────────────────────────────────────────────
  protagonist: function(n) { return pick(T.protagonist, ld(n)); },
  storyPlace:  function(n) { return pick(T.storyPlace, n % 7); },
  problem:     function(n) { return pick(T.problem, ld(n)); },
  ally:        function(n) { return pick(T.ally, n % 6); },
  magicObject: function(n) { return pick(T.magicObject, ld(n)); },
  enemy:       function(n) { return pick(T.enemy, n % 8); },
  twist:       function(n) { return pick(T.twist, ld(n)); },
  ending:      function(n) { return pick(T.ending, n % 4); },

  // ── Invento ─────────────────────────────────────────────
  invFunction: function(n) { return pick(T.invFunction, ld(n)); },
  invShape:    function(n) { return pick(T.invShape, n % 6); },
  invSize:     function(n) { return pick(T.invSize, ld(n)); },
  invMaterial: function(n) { return pick(T.invMaterial, n % 8); },
  buttonCount: function(n) { var c = clamp(n,2,12); return c + " botón" + (c > 1 ? "es" : ""); },
  invEnergy:   function(n) { return pick(T.invEnergy, ld(n)); },
  invEffect:   function(n) { return pick(T.invEffect, n % 7); },
  invUser:     function(n) { return pick(T.invUser, ld(n)); },
};

// ─── Plantillas de pasos por modo ────────────────────────────
function getStepTemplates(mode) {
  function S(featureKey, featureName) { return { featureKey: featureKey, featureName: featureName }; }

  var CHAR_STEPS = [
    S("charType",  "Tipo de personaje"),
    S("headShape", "Cabeza"),
    S("eyesFull",  "Ojos"),
    S("hairType",  "Pelo / Cabeza"),
    S("mouthType", "Boca"),
    S("bodyColor", "Color del cuerpo"),
    S("armsFull",  "Brazos"),
    S("legsFull",  "Piernas"),
    S("clothing",  "Ropa"),
    S("accessory", "Accesorio"),
    S("power",     "Poder"),
  ];
  var WORLD_STEPS = [
    S("worldType",  "Tipo de mundo"),
    S("skyColor",   "Color del cielo"),
    S("moonCount",  "Lunas"),
    S("terrainType","Terreno"),
    S("climate",    "Clima"),
    S("creature",   "Criaturas que viven ahí"),
    S("danger",     "Peligro principal"),
    S("treasure",   "Tesoro escondido"),
    S("worldRule",  "Regla extraña"),
  ];
  var STORY_STEPS = [
    S("protagonist","Protagonista"),
    S("storyPlace", "Lugar de la historia"),
    S("problem",    "El problema"),
    S("ally",       "Aliado inesperado"),
    S("magicObject","Objeto especial"),
    S("enemy",      "El antagonista"),
    S("twist",      "Giro inesperado"),
    S("ending",     "El final (por ahora)"),
  ];
  var INV_STEPS = [
    S("invFunction","Función principal"),
    S("invShape",   "Forma del invento"),
    S("invSize",    "Tamaño"),
    S("invMaterial","Material"),
    S("buttonCount","Cantidad de botones"),
    S("invEnergy",  "Energía que usa"),
    S("invEffect",  "Efecto secundario"),
    S("invUser",    "Usuario ideal"),
  ];
  var DAILY_STEPS = [
    S("charType",   "Tipo de personaje"),
    S("headShape",  "Cabeza del personaje"),
    S("power",      "Superpoder"),
    S("accessory",  "Accesorio"),
    S("worldType",  "Tipo de mundo"),
    S("skyColor",   "Color del cielo"),
    S("terrainType","Terreno del mundo"),
    S("danger",     "Peligro del mundo"),
    S("protagonist","Rol del protagonista"),
    S("magicObject","Objeto especial"),
    S("enemy",      "El antagonista"),
    S("twist",      "El giro de la historia"),
  ];

  switch (mode) {
    case "character": return CHAR_STEPS;
    case "world":     return WORLD_STEPS;
    case "story":     return STORY_STEPS;
    case "invention": return INV_STEPS;
    case "daily":     return DAILY_STEPS;
    default:          return CHAR_STEPS;
  }
}

// ─── Generadores de nombre ────────────────────────────────────
function makeCharName(seeds) {
  var pre = ["Vex","Zel","Kra","Mor","Dyx","Flux","Nox","Qua","Tri","Lum"];
  var suf = ["tron","ius","ara","oth","ex","rix","on","us","ael","ion"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||3);
}
function makeWorldName(seeds) {
  var pre = ["Luna","Xar","Kep","Vor","Nex","Zel","Tri","Mor","Vel","Qua"];
  var suf = ["ia","aria","on","us","ax","ix","ula","ara","ex","ion"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||2) + " " + (clamp(seeds[2]||5,1,99));
}
function makeInvName(seeds) {
  var pre = ["Bot","Digi","Quant","Flux","Kryp","Zap","Neuro","Turbo","Ultra","Mega"];
  var suf = ["izador","tron","ex","bot","matic","izer","scan","link","core","pulse"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||1) + " " + clamp(seeds[2]||1,1000,9999);
}
function makeStoryTitle(seeds) {
  var adj  = ["Último","Gran","Secreto","Pequeño","Invisible","Misterioso","Olvidado","Extraño"];
  var noun = ["Portal","Código","Mapa","Guardián","Monstruo","Viaje","Sueño","Laberinto"];
  return "El " + pick(adj, seeds[0]||0) + " " + pick(noun, seeds[1]||4);
}

/* ─────────────────────────────────────────────────────────────
   §7  ARRANCAR MISIÓN
   ───────────────────────────────────────────────────────────── */

function startMission(mode, dailyHint) {
  if (!state.selectedLevel) { renderLevelScreen(); return; }

  var templates = getStepTemplates(mode);
  var steps = templates.map(function(t) {
    var math = generateMathProblem(state.selectedLevel);
    return { featureKey: t.featureKey, featureName: t.featureName, question: math.question, answer: math.answer, resolved: false };
  });

  var pool    = ENGLISH_POOL[mode] || ENGLISH_POOL["character"];
  var engWord = pickRandom(pool);

  mission = {
    mode: mode,
    level: state.selectedLevel,
    steps: steps,
    currentStepIdx: 0,
    totalErrors: 0,
    features: {},
    englishWord: engWord,
    dailyHint: dailyHint || null,
    seeds: [],
  };

  renderActiveMission();
}

/* ─────────────────────────────────────────────────────────────
   §8  LÓGICA DE RESPUESTA
   ───────────────────────────────────────────────────────────── */

var stepAttempts = 0;

function checkAnswer() {
  if (!mission) return;
  var step  = mission.steps[mission.currentStepIdx];
  var input = document.getElementById("answer-input");
  var val   = input ? input.value.trim() : "";

  if (val === "") { updateFeedback("Escribí un número para comprobar.", "info"); return; }

  var userAns = Number(val);
  if (isNaN(userAns)) { updateFeedback("Escribí solo números, sin letras.", "info"); return; }

  if (userAns === step.answer) {
    // ¡Correcto!
    stopTimer();
    stepAttempts = 0;
    mission.seeds.push(step.answer);
    state.totalCorrect = (state.totalCorrect || 0) + 1;

    var result = RESOLVERS[step.featureKey] ? RESOLVERS[step.featureKey](step.answer) : String(step.answer);
    step.resolved = true;
    mission.features[step.featureKey] = result;

    updateFeedback(pickRandom(FB.correct), "success");
    showUnlockBox(step.featureName, result);
    updateSheetPanel();

    var btnCheck = document.getElementById("btn-check");
    var btnNext  = document.getElementById("btn-next-step");
    if (btnCheck) btnCheck.disabled = true;
    if (input)    input.disabled = true;
    if (btnNext)  btnNext.hidden = false;

    var filled = document.getElementById("progress-fill");
    if (filled) {
      var pct = Math.round(((mission.currentStepIdx + 1) / mission.steps.length) * 100);
      filled.style.width = pct + "%";
      filled.setAttribute("aria-valuenow", pct);
    }
  } else {
    stepAttempts++;
    mission.totalErrors++;
    if (stepAttempts === 1) {
      updateFeedback(pickRandom(FB.wrong1), "hint");
    } else if (stepAttempts === 2) {
      updateFeedback(pickRandom(FB.wrong2), "hint");
    } else {
      var hints = { "+": "Sumá los dos números de a uno.", "-": "Empezá desde el número más grande y restá de a poco.", "×": "Multiplicar es sumar el mismo número varias veces.", "÷": "¿Cuántas veces entra el segundo número en el primero?" };
      var hintMsg = "Pista: revisá la operación lentamente, paso a paso.";
      for (var op in hints) {
        if (step.question.indexOf(op) !== -1) { hintMsg = "Pista: " + hints[op]; break; }
      }
      updateFeedback(hintMsg, "hint");
      stepAttempts = 0;
    }
    if (input) { input.focus(); input.select(); }
  }
}

function advanceStep() {
  if (!mission) return;
  mission.currentStepIdx++;
  stepAttempts = 0;
  if (mission.currentStepIdx >= mission.steps.length) {
    completeMission();
  } else {
    renderActiveMission();
  }
}

function updateFeedback(msg, type) {
  var el = document.getElementById("feedback-area");
  if (!el) return;
  el.textContent = msg;
  el.className = "feedback feedback--" + type;
}

function showUnlockBox(featureName, result) {
  var box = document.getElementById("unlock-box");
  var fn  = document.getElementById("unlock-feature-name");
  var fr  = document.getElementById("unlock-result");
  if (!box || !fn || !fr) return;
  fn.textContent = featureName;
  fr.textContent = result;
  box.hidden = false;
  box.classList.add("unlock-flash");
  setTimeout(function() { box.classList.remove("unlock-flash"); }, 800);
}

function updateSheetPanel() {
  var panel = document.getElementById("sheet-panel");
  if (!panel) return;
  panel.innerHTML = renderSheetPanelHTML();
}

/* ─────────────────────────────────────────────────────────────
   §9  COMPLETAR MISIÓN Y GUARDAR
   ───────────────────────────────────────────────────────────── */

function completeMission() {
  if (!mission) return;
  stopTimer();

  var isDaily    = mission.mode === "daily";
  var baseStars  = isDaily ? 5 : 3;
  var bonusStars = mission.totalErrors <= 2 ? 1 : 0;
  var starsEarned = baseStars + bonusStars;

  state.stars += starsEarned;
  state.completedMissions++;

  if (mission.dailyHint) {
    var day = mission.dailyHint.day;
    if (!state.completedDays.includes(day)) state.completedDays.push(day);
  }

  var today = todayStr();
  if (state.lastPlayedDate !== today) {
    var prev = state.lastPlayedDate ? new Date(state.lastPlayedDate + "T00:00:00") : null;
    var now  = new Date(today + "T00:00:00");
    var diff = prev ? Math.round((now - prev) / 86400000) : 999;
    state.currentStreak = diff === 1 ? (state.currentStreak || 0) + 1 : 1;
    state.lastPlayedDate = today;
  }

  var creation = buildCreation(mission, starsEarned);
  state.creations.unshift(creation);
  if (state.creations.length > 100) state.creations.length = 100;

  var newBadges = unlockBadges();
  saveState();

  renderCreationSheet(creation, starsEarned, newBadges);
  setTimeout(showLoveModal, 700);
}

function buildCreation(m, starsEarned) {
  var seeds = m.seeds;
  var f     = m.features;
  var name, drawingPrompt;

  switch (m.mode) {
    case "character": {
      name = makeCharName(seeds);
      var cParts = [];
      if (f.eyesFull)   cParts.push(f.eyesFull);
      if (f.hairType)   cParts.push(f.hairType);
      if (f.bodyColor)  cParts.push("cuerpo " + f.bodyColor);
      if (f.armsFull)   cParts.push(f.armsFull);
      if (f.legsFull)   cParts.push(f.legsFull);
      var wParts = [];
      if (f.clothing)   wParts.push(f.clothing);
      if (f.accessory)  wParts.push(f.accessory);

      drawingPrompt = "Dibujá a " + name + " en una hoja.";
      if (f.charType)    drawingPrompt += " Es un " + f.charType + ".";
      if (cParts.length === 1) {
        drawingPrompt += " Tiene " + cParts[0] + ".";
      } else if (cParts.length > 1) {
        var last = cParts[cParts.length - 1];
        var rest = cParts.slice(0, -1);
        drawingPrompt += " Tiene " + rest.join(", ") + " y " + last + ".";
      }
      if (wParts.length) drawingPrompt += " Usa " + wParts.join(" y ") + ".";
      if (f.power)       drawingPrompt += " Su poder es " + f.power + ".";
      break;
    }
    case "world":
      name = makeWorldName(seeds);
      drawingPrompt = "Dibujá el mapa de " + name + ". Incluí el " + (f.terrainType || "terreno") + ", criaturas de " + (f.creature || "tu mundo") + " y el " + (f.treasure || "tesoro") + ".";
      break;
    case "story":
      name = makeStoryTitle(seeds);
      drawingPrompt = "Dibujá la escena más importante de \"" + name + "\". Incluí al protagonista (" + (f.protagonist || "personaje") + ") y el " + (f.magicObject || "objeto especial") + ".";
      break;
    case "invention":
      name = makeInvName(seeds);
      drawingPrompt = "Dibujá el " + name + " con todos sus detalles: " + (f.invShape || "forma") + ", " + (f.invMaterial || "material") + " y sus " + (f.buttonCount || "botones") + ".";
      break;
    case "daily":
      name = "Lab " + makeCharName(seeds) + " × " + makeWorldName(seeds.slice(4));
      drawingPrompt = "Dibujá la escena completa: el personaje " + (f.charType || "héroe") + " con su " + (f.power || "poder") + " en un mundo con cielo " + (f.skyColor || "raro") + " y el " + (f.magicObject || "objeto") + " en el centro.";
      break;
    default:
      name = "Creación Bauti";
      drawingPrompt = "Dibujá lo que imaginaste durante la misión.";
  }

  return {
    id:          Date.now().toString(),
    mode:        m.mode,
    name:        name,
    date:        todayStr(),
    level:       m.level,
    features:    Object.assign({}, m.features),
    englishWord: m.englishWord,
    drawingPrompt: drawingPrompt,
    starsEarned: starsEarned,
    dailyDay:    m.dailyHint ? m.dailyHint.day : null,
  };
}

/* ─────────────────────────────────────────────────────────────
   §10 MEDALLAS
   ───────────────────────────────────────────────────────────── */

function unlockBadges() {
  var newly = [];
  BADGE_DEFS.forEach(function(b) {
    if (!state.badges.includes(b.id) && b.check(state)) {
      state.badges.push(b.id);
      newly.push(b);
    }
  });
  return newly;
}

/* ─────────────────────────────────────────────────────────────
   §11 MODAL ESPECIAL BAUTI
   ───────────────────────────────────────────────────────────── */

var ticklePhrases = [
  "¡Cosquillas, cosquillas, cosquillas!",
  "Ehhh, falta una parte 😜",
  "Decilo completo 💛",
  "¡Así no valeee! 😄",
  "JAJAJA, cosquillas activadas 😂",
  "Venga, intentá de nuevo 😄",
  "¡Eso no cuenta, Bau! 😂",
];

function showLoveModal() {
  var modal    = document.getElementById("love-modal");
  var title    = document.getElementById("love-title");
  var msg      = document.getElementById("love-message");
  var actions  = document.getElementById("love-actions");
  var tickle   = document.getElementById("tickle-zone");

  if (!modal) return;

  // Resetear estado
  if (title)   title.textContent = "Buenísimo, Bauti. Te amo mucho 💛";
  if (msg)     msg.textContent   = "Elegí con cuidado 😄";
  if (tickle)  tickle.innerHTML  = "";
  if (actions) actions.innerHTML = [
    '<button type="button" class="btn btn-ghost" data-action="tickle-me">Yo también</button>',
    '<button type="button" class="btn btn-primary" data-action="love-accepted">Yo también te amo</button>',
  ].join("");

  modal.classList.remove("hidden");
}

function hideLoveModal() {
  var modal = document.getElementById("love-modal");
  if (modal) modal.classList.add("hidden");
}

function triggerTickles() {
  var card   = document.getElementById("love-card");
  var msg    = document.getElementById("love-message");
  var tickle = document.getElementById("tickle-zone");

  if (msg)   msg.textContent = pickRandom(ticklePhrases);

  if (card) {
    card.classList.remove("tickle");
    void card.offsetWidth; // forzar reflow para reiniciar animación
    card.classList.add("tickle");
  }

  if (tickle) {
    var pop = document.createElement("span");
    pop.className   = "tickle-pop";
    pop.textContent = pickRandom(["💥 cosquillas 😂", "✨ jajaja ✨", "💛 cosquillas 💛", "😂 cosquillas 💥"]);
    tickle.appendChild(pop);
    setTimeout(function() { if (pop.parentNode) pop.parentNode.removeChild(pop); }, 1800);
  }
}

function acceptLoveMessage() {
  var title   = document.getElementById("love-title");
  var msg     = document.getElementById("love-message");
  var actions = document.getElementById("love-actions");
  var tickle  = document.getElementById("tickle-zone");

  if (title)   title.textContent = "Awww 💛";
  if (msg)     msg.textContent   = "Yo también te amo muchísimo, Bauti 💛";
  if (tickle)  tickle.innerHTML  = '<span class="tickle-pop">💛 abrazo virtual 💛</span>';
  if (actions) actions.innerHTML = '<button type="button" class="btn btn-primary" data-action="close-love-modal">Seguir jugando</button>';
}

/* ─────────────────────────────────────────────────────────────
   §12 RENDERS DE PANTALLAS
   ───────────────────────────────────────────────────────────── */

var app     = document.getElementById("app-main");
var lvlChip = document.getElementById("level-chip");

function setScreen(html) {
  if (!app) return;
  app.innerHTML = html;
  if (typeof window.scrollTo === "function") window.scrollTo({ top: 0, behavior: "smooth" });
  if (lvlChip) {
    if (state.selectedLevel && LEVELS[state.selectedLevel]) {
      lvlChip.textContent = LEVELS[state.selectedLevel].emoji + " " + LEVELS[state.selectedLevel].label;
      lvlChip.hidden = false;
    } else {
      lvlChip.hidden = true;
    }
  }
}

// ─── HOME ────────────────────────────────────────────────────
function renderHome() {
  stopTimer();
  mission = null;
  var creatCount = state.creations.length;
  var lvl = state.selectedLevel ? LEVELS[state.selectedLevel].emoji + " " + LEVELS[state.selectedLevel].label : "Sin elegir";
  setScreen(
    '<section class="screen screen-home" aria-labelledby="home-title">' +
    '  <div class="card card-hero">' +
    '    <p class="eyebrow">🎨 Laboratorio de Bauti</p>' +
    '    <h1 id="home-title">Bauti: Creador de Personajes</h1>' +
    '    <p class="subtitle">Resolvé cuentas para descubrir tu personaje y después dibujalo en papel.</p>' +
    '    <p class="lead">Cada cuenta desvela una parte. Al terminar, ¡a dibujar!</p>' +
    '    <div class="button-row">' +
    '      <button class="btn btn-primary btn-lg" data-action="show-mode-select">¡Crear personaje nuevo!</button>' +
    '      <button class="btn btn-secondary" data-action="show-gallery">Galería de Bauti</button>' +
    '      <button class="btn btn-ghost" data-action="show-progress">Mi progreso</button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="stats-strip">' +
    '    <div class="stat-pill"><span class="stat-v">⭐ ' + state.stars + '</span><span class="stat-l">Estrellas</span></div>' +
    '    <div class="stat-pill"><span class="stat-v">🗂️ ' + state.completedMissions + '</span><span class="stat-l">Misiones</span></div>' +
    '    <div class="stat-pill"><span class="stat-v">' + escHtml(lvl) + '</span><span class="stat-l">Nivel</span></div>' +
    '    <div class="stat-pill"><span class="stat-v">🖼️ ' + creatCount + '</span><span class="stat-l">Creaciones</span></div>' +
    '  </div>' +
    '  <div class="card card-daily-strip" id="daily-strip"></div>' +
    '  <p class="privacy-note">🔒 Esta app no pide datos personales. El progreso se guarda solo en este dispositivo.</p>' +
    '</section>'
  );
  renderDailyStrip();
}

function renderDailyStrip() {
  var strip = document.getElementById("daily-strip");
  if (!strip) return;
  var totalCompleted = state.completedDays.length;
  var nextDay = null;
  for (var i = 0; i < DAILY_MISSIONS.length; i++) {
    if (!state.completedDays.includes(DAILY_MISSIONS[i].day)) { nextDay = DAILY_MISSIONS[i]; break; }
  }
  if (!nextDay) {
    strip.innerHTML = '<p class="daily-done">🏆 ¡Completaste los 30 días! Podés seguir creando libremente.</p>';
    return;
  }
  strip.innerHTML =
    '<div class="daily-inner">' +
    '  <p class="daily-label">📅 Misión del día (día ' + nextDay.day + '/30)</p>' +
    '  <p class="daily-title">' + escHtml(nextDay.title) + '</p>' +
    '  <p class="daily-desc">' + escHtml(nextDay.desc) + '</p>' +
    '  <div class="button-row"><button class="btn btn-accent" data-action="start-daily" data-day="' + nextDay.day + '">Hacer esta misión</button></div>' +
    '</div>' +
    '<div class="daily-progress-mini">' +
    '  <p>' + totalCompleted + '/30 días</p>' +
    '  <div class="mini-bar"><div class="mini-fill" style="width:' + Math.round(totalCompleted/30*100) + '%"></div></div>' +
    '</div>';
}

// ─── NIVEL ───────────────────────────────────────────────────
function renderLevelScreen() {
  var cards = Object.keys(LEVELS).map(function(id) {
    var lv = LEVELS[id];
    var active = state.selectedLevel === id;
    return '<div class="card level-card ' + (active ? "level-card--active" : "") + '">' +
      '<p class="level-icon" aria-hidden="true">' + lv.emoji + '</p>' +
      '<h3>' + lv.label + '</h3>' +
      '<p>' + escHtml(lv.desc) + '</p>' +
      '<button class="btn ' + (active ? "btn-secondary" : "btn-primary") + '" data-action="choose-level" data-level="' + id + '">' +
        (active ? "Nivel actual ✓" : "Elegir este nivel") +
      '</button></div>';
  }).join("");
  setScreen(
    '<section class="screen" aria-labelledby="level-title">' +
    '<h1 id="level-title">Elegí tu nivel</h1>' +
    '<p class="screen-intro">Podés cambiarlo cuando quieras.</p>' +
    '<div class="level-grid">' + cards + '</div>' +
    '<div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>' +
    '</section>'
  );
}

// ─── MODO ────────────────────────────────────────────────────
function renderModeSelect() {
  if (!state.selectedLevel) { renderLevelScreen(); return; }
  var cards = Object.keys(MODE_DEFS).map(function(id) {
    var m = MODE_DEFS[id];
    return '<div class="card mode-card mode-card--' + m.color + '">' +
      '<p class="mode-icon" aria-hidden="true">' + m.emoji + '</p>' +
      '<h3>' + m.label + '</h3>' +
      '<p>' + escHtml(m.desc) + '</p>' +
      '<button class="btn btn-primary" data-action="start-mission" data-mode="' + id + '">' + m.label + '</button>' +
      '</div>';
  }).join("");
  setScreen(
    '<section class="screen" aria-labelledby="mode-title">' +
    '<h1 id="mode-title">¿Qué va a crear Bauti hoy?</h1>' +
    '<p class="screen-intro">Cada modo genera una ficha distinta para dibujar al final.</p>' +
    '<div class="mode-grid">' + cards + '</div>' +
    '<div class="button-row">' +
    '<button class="btn btn-ghost" data-action="show-level">Cambiar nivel</button>' +
    '<button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>' +
    '</div></section>'
  );
}

// ─── MISIÓN ACTIVA ────────────────────────────────────────────
function renderActiveMission() {
  if (!mission) return;
  stopTimer();
  var step    = mission.steps[mission.currentStepIdx];
  var stepNum = mission.currentStepIdx + 1;
  var total   = mission.steps.length;
  var pct     = Math.round((stepNum - 1) / total * 100);
  var modeDef = MODE_DEFS[mission.mode];
  stepAttempts = 0;

  setScreen(
    '<section class="screen screen-mission" aria-labelledby="mission-heading">' +
    '  <div class="mission-header">' +
    '    <div>' +
    '      <p class="eyebrow">' + modeDef.emoji + ' ' + modeDef.label + '</p>' +
    '      <h1 id="mission-heading" class="mission-title">' + (mission.dailyHint ? escHtml(mission.dailyHint.title) : "Misión libre") + '</h1>' +
    '    </div>' +
    '    <div class="mission-step-count">' +
    '      Paso <strong>' + stepNum + '</strong> / ' + total +
    '      <span id="step-timer" class="timer-display">⏱️ …</span>' +
    '    </div>' +
    '  </div>' +
    '  <div class="progress-bar-wrapper" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de la misión">' +
    '    <div class="progress-fill" id="progress-fill" style="width:' + pct + '%"></div>' +
    '  </div>' +
    '  <div class="mission-lab">' +
    '    <div class="panel-question card">' +
    '      <p class="feature-eyebrow">Desbloqueando: <strong>' + escHtml(step.featureName) + '</strong></p>' +
    '      <p class="math-display">' + escHtml(step.question) + ' = ?</p>' +
    '      <label for="answer-input" class="sr-only">Tu respuesta</label>' +
    '      <div class="answer-row">' +
    '        <input type="number" inputmode="numeric" id="answer-input" autocomplete="off" placeholder="Tu respuesta">' +
    '        <button id="btn-check" class="btn btn-primary" data-action="check-answer">Comprobar</button>' +
    '      </div>' +
    '      <p class="feedback" id="feedback-area" aria-live="polite"></p>' +
    '      <div class="unlock-box" id="unlock-box" hidden>' +
    '        <p class="unlock-label">✅ Desbloqueado: <span id="unlock-feature-name"></span></p>' +
    '        <p class="unlock-result" id="unlock-result"></p>' +
    '      </div>' +
    '      <button id="btn-next-step" class="btn btn-primary btn-next" data-action="next-step" hidden>' +
        (mission.currentStepIdx + 1 < mission.steps.length ? "Siguiente paso →" : "Ver mi personaje 🎉") +
    '      </button>' +
    '    </div>' +
    '    <div class="panel-sheet card" id="sheet-panel">' +
        renderSheetPanelHTML() +
    '    </div>' +
    '  </div>' +
    '  <div class="button-row button-row--mission">' +
    '    <button class="btn btn-ghost btn-sm" data-action="abort-mission">Abandonar misión</button>' +
    '  </div>' +
    '</section>'
  );

  var inp = document.getElementById("answer-input");
  if (inp) inp.focus();
  startTimer();
}

function renderSheetPanelHTML() {
  if (!mission) return "";
  var cur  = mission.currentStepIdx;
  var rows = mission.steps.map(function(s, i) {
    if (s.resolved) {
      return '<div class="sheet-row sheet-row--done">' +
        '<span class="sheet-key">' + escHtml(s.featureName) + ':</span>' +
        '<span class="sheet-val">' + escHtml(mission.features[s.featureKey] || "") + '</span>' +
        '</div>';
    } else if (i === cur) {
      return '<div class="sheet-row sheet-row--current">' +
        '<span class="sheet-key">' + escHtml(s.featureName) + ':</span>' +
        '<span class="sheet-val sheet-val--pending">resolviendo...</span>' +
        '</div>';
    } else {
      return '<div class="sheet-row sheet-row--locked">' +
        '<span class="sheet-key">' + escHtml(s.featureName) + ':</span>' +
        '<span class="sheet-val sheet-val--locked">🔒</span>' +
        '</div>';
    }
  }).join("");
  return '<p class="sheet-heading">📋 ' + (mission.mode === "character" ? "Tu personaje" : "Ficha en construcción") + '</p>' +
    '<div class="sheet-rows">' + rows + '</div>';
}

// ─── FICHA FINAL ─────────────────────────────────────────────
function renderCreationSheet(creation, starsEarned, newBadges) {
  var modeDef  = MODE_DEFS[creation.mode];
  var eng      = creation.englishWord;
  var badgeHtml = (newBadges && newBadges.length)
    ? '<div class="new-badges">' + newBadges.map(function(b) {
        return '<span class="badge-chip badge-chip--new">' + b.emoji + ' ' + escHtml(b.title) + ' ¡Desbloqueada!</span>';
      }).join("") + '</div>'
    : "";

  var featureRows = Object.entries(creation.features).map(function(pair) {
    var key = pair[0], val = pair[1];
    var step  = mission ? mission.steps.find(function(s) { return s.featureKey === key; }) : null;
    var label = step ? step.featureName : (FEATURE_LABELS[key] || key);
    return '<div class="sheet-row sheet-row--done">' +
      '<span class="sheet-key">' + escHtml(label) + ':</span>' +
      '<span class="sheet-val">' + escHtml(val) + '</span>' +
      '</div>';
  }).join("");

  setScreen(
    '<section class="screen screen-creation" aria-labelledby="creation-title">' +
    '<div class="card card-creation">' +
    '  <p class="eyebrow">' + modeDef.emoji + ' ' + modeDef.label + ' — ¡Misión completada!</p>' +
    '  <h1 id="creation-title">' + escHtml(creation.name) + '</h1>' +
    '  <p class="stars-earned">+' + starsEarned + ' ⭐ estrellas · Total: ' + state.stars + ' ⭐</p>' +
    badgeHtml +
    '  <div class="sheet-rows creation-sheet-rows">' + featureRows + '</div>' +
    '  <div class="english-box">' +
    '    <p class="eng-word"><strong>' + escHtml(eng.word) + '</strong> = ' + escHtml(eng.translation) + '</p>' +
    '    <p class="eng-sentence">"' + escHtml(eng.sentence) + '"</p>' +
    '    <p class="eng-hint">💬 ' + escHtml(eng.hint) + '</p>' +
    '  </div>' +
    '  <div class="drawing-prompt">' +
    '    <p class="drawing-label">🎨 Tu consigna de dibujo</p>' +
    '    <p class="drawing-text">' + escHtml(creation.drawingPrompt) + '</p>' +
    '  </div>' +
    '  <p class="gallery-note">Esta ficha ya se guardó en la Galería de Bauti.</p>' +
    '  <div class="button-row">' +
    '    <button class="btn btn-primary" data-action="show-mode-select">¡Crear otro personaje!</button>' +
    '    <button class="btn btn-secondary" data-action="show-gallery">Galería de Bauti</button>' +
    '  </div>' +
    '  <div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>' +
    '</div></section>'
  );
}

// ─── GALERÍA ──────────────────────────────────────────────────
function renderGallery() {
  if (state.creations.length === 0) {
    setScreen(
      '<section class="screen" aria-labelledby="gallery-title">' +
      '<h1 id="gallery-title">Galería de Bauti</h1>' +
      '<div class="card empty-state">' +
      '  <p class="empty-emoji" aria-hidden="true">🖼️</p>' +
      '  <p>Todavía no hay creaciones guardadas.</p>' +
      '  <p>Completá tu primera misión y la ficha aparecerá acá.</p>' +
      '  <div class="button-row"><button class="btn btn-primary" data-action="show-mode-select">¡Crear personaje nuevo!</button></div>' +
      '</div>' +
      '<div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>' +
      '</section>'
    );
    return;
  }
  var cards = state.creations.map(function(c) {
    var md  = MODE_DEFS[c.mode] || MODE_DEFS["character"];
    var top = Object.entries(c.features).slice(0, 3).map(function(p) { return '<li>' + escHtml(p[1]) + '</li>'; }).join("");
    return '<div class="card gallery-card">' +
      '<div class="gallery-card-header">' +
        '<span class="gallery-mode">' + md.emoji + ' ' + md.label + '</span>' +
        '<span class="gallery-date">' + escHtml(c.date) + '</span>' +
      '</div>' +
      '<h3 class="gallery-name">' + escHtml(c.name) + '</h3>' +
      '<ul class="gallery-features">' + top + '</ul>' +
      '<p class="gallery-eng">🇬🇧 ' + escHtml(c.englishWord.word) + ' = ' + escHtml(c.englishWord.translation) + '</p>' +
      '<p class="gallery-stars">⭐ ' + c.starsEarned + ' estrellas</p>' +
      '<div class="button-row">' +
        '<button class="btn btn-secondary btn-sm" data-action="show-creation" data-id="' + c.id + '">Ver ficha</button>' +
        '<button class="btn btn-danger btn-sm" data-action="delete-creation" data-id="' + c.id + '">Borrar</button>' +
      '</div></div>';
  }).join("");
  setScreen(
    '<section class="screen" aria-labelledby="gallery-title">' +
    '<h1 id="gallery-title">Galería de Bauti</h1>' +
    '<p class="screen-intro gallery-note-intro">Fichas de ideas, no dibujos. (' + state.creations.length + ' creaciones)</p>' +
    '<div class="gallery-grid">' + cards + '</div>' +
    '<div class="button-row">' +
      '<button class="btn btn-primary" data-action="show-mode-select">¡Crear personaje nuevo!</button>' +
      '<button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>' +
    '</div></section>'
  );
}

function renderCreationDetail(id) {
  var c = state.creations.find(function(x) { return x.id === id; });
  if (!c) { renderGallery(); return; }
  var md  = MODE_DEFS[c.mode] || MODE_DEFS["character"];
  var eng = c.englishWord;
  var featureRows = Object.entries(c.features).map(function(pair) {
    var k = pair[0], v = pair[1];
    return '<div class="sheet-row sheet-row--done">' +
      '<span class="sheet-key">' + escHtml(FEATURE_LABELS[k] || k) + ':</span>' +
      '<span class="sheet-val">' + escHtml(v) + '</span>' +
      '</div>';
  }).join("");
  setScreen(
    '<section class="screen" aria-labelledby="detail-title">' +
    '<div class="card card-creation">' +
    '  <p class="eyebrow">' + md.emoji + ' ' + md.label + '</p>' +
    '  <h1 id="detail-title">' + escHtml(c.name) + '</h1>' +
    '  <p class="gallery-meta">Nivel ' + escHtml(c.level) + ' · ' + escHtml(c.date) + ' · ⭐ ' + c.starsEarned + '</p>' +
    '  <div class="sheet-rows creation-sheet-rows">' + featureRows + '</div>' +
    '  <div class="english-box">' +
    '    <p class="eng-word"><strong>' + escHtml(eng.word) + '</strong> = ' + escHtml(eng.translation) + '</p>' +
    '    <p class="eng-sentence">"' + escHtml(eng.sentence) + '"</p>' +
    '    <p class="eng-hint">💬 ' + escHtml(eng.hint) + '</p>' +
    '  </div>' +
    '  <div class="drawing-prompt">' +
    '    <p class="drawing-label">🎨 Consigna de dibujo</p>' +
    '    <p class="drawing-text">' + escHtml(c.drawingPrompt) + '</p>' +
    '  </div>' +
    '  <div class="button-row">' +
    '    <button class="btn btn-secondary" data-action="show-gallery">Volver a galería</button>' +
    '    <button class="btn btn-danger btn-sm" data-action="delete-creation" data-id="' + c.id + '">Borrar esta creación</button>' +
    '  </div>' +
    '</div></section>'
  );
}

function deleteCreation(id) {
  if (!confirm("¿Borrar esta creación de la galería?")) return;
  state.creations = state.creations.filter(function(c) { return c.id !== id; });
  saveState();
  renderGallery();
}

// ─── PROGRESO ────────────────────────────────────────────────
function renderProgress() {
  var doneCount = state.completedDays.length;
  var pct       = Math.round(doneCount / 30 * 100);
  var badgesHtml = BADGE_DEFS.map(function(b) {
    var unlocked = state.badges.includes(b.id);
    return '<div class="badge-chip ' + (unlocked ? "badge-chip--unlocked" : "badge-chip--locked") + '">' +
      '<span aria-hidden="true">' + (unlocked ? b.emoji : "🔒") + '</span>' +
      '<span>' + escHtml(b.title) + '</span></div>';
  }).join("");

  var dayMap = DAILY_MISSIONS.map(function(d) {
    var done = state.completedDays.includes(d.day);
    var next = !done && !DAILY_MISSIONS.slice(0, d.day-1).some(function(prev) { return !state.completedDays.includes(prev.day); });
    return '<div class="day-node ' + (done ? "day-node--done" : next ? "day-node--next" : "day-node--locked") + '" title="Día ' + d.day + ': ' + escHtml(d.title) + '">' +
      '<span>' + (done ? "✅" : next ? (MODE_DEFS[d.mode] ? MODE_DEFS[d.mode].emoji : "⭐") : "🔒") + '</span>' +
      '<span class="day-num">' + d.day + '</span></div>';
  }).join("");

  setScreen(
    '<section class="screen" aria-labelledby="progress-title">' +
    '<h1 id="progress-title">Progreso de Bauti</h1>' +
    '<div class="stats-grid">' +
    '  <div class="card stat-card"><p class="sv">' + state.stars + '</p><p class="sl">Estrellas</p></div>' +
    '  <div class="card stat-card"><p class="sv">' + state.completedMissions + '</p><p class="sl">Misiones</p></div>' +
    '  <div class="card stat-card"><p class="sv">' + state.currentStreak + '</p><p class="sl">Racha</p></div>' +
    '  <div class="card stat-card"><p class="sv">' + state.creations.length + '</p><p class="sl">Creaciones</p></div>' +
    '</div>' +
    '<div class="card">' +
    '  <p class="card-section-title">Progreso de 30 días — ' + doneCount + '/30</p>' +
    '  <div class="progress-bar-wrapper" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100">' +
    '    <div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '  <p class="pct-label">' + pct + '% del camino recorrido</p>' +
    '</div>' +
    '<div class="card"><p class="card-section-title">Mapa de misiones</p><div class="day-map">' + dayMap + '</div></div>' +
    '<div class="card"><p class="card-section-title">Medallas</p><div class="badge-grid">' + badgesHtml + '</div></div>' +
    '<div class="button-row">' +
    '  <button class="btn btn-primary" data-action="show-mode-select">¡Crear personaje nuevo!</button>' +
    '  <button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>' +
    '</div>' +
    '<div class="button-row"><button class="btn btn-danger" data-action="reset-progress">Reiniciar progreso</button></div>' +
    '</section>'
  );
}

// ─── AYUDA ───────────────────────────────────────────────────
function renderHelp() {
  setScreen(
    '<section class="screen" aria-labelledby="help-title">' +
    '<h1 id="help-title">Información para adultos</h1>' +
    '<div class="card">' +
    '<h2>¿Qué es Bauti: Creador de Personajes?</h2>' +
    '<p>App educativa para chicos que combina matemática, creatividad e inglés. No es una red social ni un juego en línea.</p>' +
    '<h2>¿Qué datos guarda?</h2>' +
    '<p>Solo guarda progreso local en el navegador: estrellas, misiones y fichas de personajes. No sube nada a ningún servidor.</p>' +
    '<h2>¿Qué datos NO guarda?</h2>' +
    '<p>No guarda ni pide: nombre completo, edad, email, ubicación, fotos ni dibujos.</p>' +
    '<h2>¿Se puede borrar todo?</h2>' +
    '<p>Sí. Desde "Mi progreso" → "Reiniciar progreso", o limpiando los datos del sitio en el navegador.</p>' +
    '<h2>¿Hay publicidad o compras?</h2>' +
    '<p>No. La app no tiene publicidad, compras ni funciones sociales.</p>' +
    '</div>' +
    '<div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>' +
    '</section>'
  );
}

/* ─────────────────────────────────────────────────────────────
   §13 MANEJO DE EVENTOS
   ───────────────────────────────────────────────────────────── */

function handleClick(e) {
  var btn = e.target.closest("[data-action]");
  if (!btn) return;
  var action = btn.dataset.action;

  switch (action) {
    case "go-home":            renderHome(); break;
    case "show-mode-select":   renderModeSelect(); break;
    case "show-level":         renderLevelScreen(); break;
    case "show-gallery":       renderGallery(); break;
    case "show-progress":      renderProgress(); break;
    case "show-help":          renderHelp(); break;
    case "open-love-modal":    showLoveModal(); break;
    case "tickle-me":          triggerTickles(); break;
    case "love-accepted":      acceptLoveMessage(); break;
    case "close-love-modal":   hideLoveModal(); break;
    case "choose-level":
      state.selectedLevel = btn.dataset.level;
      saveState();
      renderModeSelect();
      break;
    case "start-mission":
      startMission(btn.dataset.mode, null);
      break;
    case "start-daily": {
      var day = parseInt(btn.dataset.day, 10);
      var dm  = DAILY_MISSIONS.find(function(d) { return d.day === day; });
      if (dm) startMission(dm.mode, dm); else renderModeSelect();
      break;
    }
    case "check-answer":   checkAnswer(); break;
    case "next-step":      advanceStep(); break;
    case "abort-mission":
      if (confirm("¿Abandonar la misión actual? Tu progreso de esta misión se perderá.")) {
        stopTimer(); mission = null; renderHome();
      }
      break;
    case "show-creation":     renderCreationDetail(btn.dataset.id); break;
    case "delete-creation":   deleteCreation(btn.dataset.id); break;
    case "reset-progress":    resetProgress(); break;
    default: break;
  }
}

function handleKeydown(e) {
  if (e.key === "Enter" && e.target && e.target.id === "answer-input") {
    e.preventDefault();
    checkAnswer();
  }
}

/* ─────────────────────────────────────────────────────────────
   §14 UTILIDADES
   ───────────────────────────────────────────────────────────── */

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function todayStr() {
  var d = new Date();
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}

function escHtml(s) {
  var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(s || "").replace(/[&<>"']/g, function(c) { return map[c]; });
}

/* ─────────────────────────────────────────────────────────────
   §15 INIT
   ───────────────────────────────────────────────────────────── */

function initApp() {
  state = loadState();
  document.addEventListener("click", handleClick);
  if (app) app.addEventListener("keydown", handleKeydown);
  renderHome();
}

document.addEventListener("DOMContentLoaded", initApp);
