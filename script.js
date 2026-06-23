/* ============================================================
   DibuMente Lab — script.js
   App educativa: matemática + dibujo + inglés para 10-15 años.
   Sin frameworks, sin backend, sin datos personales.
   Todo el estado vive en localStorage (solo datos de progreso).
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   §1  CONSTANTES Y DATOS
   ───────────────────────────────────────────────────────────── */

const STORAGE_KEY = "Bauty: Creador de Personajes_v1";

const LEVELS = {
  explorador: { label: "Bau Explorador", emoji: "🧭", desc: "Sumas y restas con números chicos. Ideal para entrar en calor." },
  creador:    { label: "BauCreador",    emoji: "🛠️", desc: "Sumas, restas, multiplicaciones y divisiones simples." },
  genio:      { label: "Bau Genio",      emoji: "🧠", desc: "Operaciones combinadas y números más grandes. Para mentes despiertas." },
};

const MODE_DEFS = {
  character: { label: "Crear Personaje",  emoji: "🦸", color: "violet", desc: "Construí un personaje parte por parte usando resultados matemáticos." },
  world:     { label: "Crear Mundo",      emoji: "🌍", color: "cyan",   desc: "Diseñá un planeta, ciudad o escenario fantástico." },
  story:     { label: "Crear Historia",   emoji: "📖", color: "mint",   desc: "Resolvé desafíos para armar una mini historia loca." },
  invention: { label: "Invento Imposible",emoji: "⚙️", color: "amber",  desc: "Creá una máquina absurda con poderes rarísimos." },
  daily:     { label: "Desafío del Día",  emoji: "⚡", color: "special",desc: "Una misión mezclada con más puntos y medalla especial." },
};

// ─── Tablas de resolución creativa ───────────────────────────

const T = {
   charType:    ["monstruito dinosaurio","robot amigo","dragón chiquito","alien divertido","superhéroe raro","animal inventado","duende espacial","mascota mágica","villano simpático","explorador del bosque"],
  headShape:   ["cabeza redonda","cabeza triangular","cabeza cuadrada","cabeza grande","cabeza chiquita"],
  eyeStyle:    ["azules","verdes","gigantes","chiquitos","brillantes","redondos","amarillos","violetas","con pestañas","dormidos"],
  mouthType:   ["sonrisa grande","boca chiquita","dos dientitos","lengua afuera","sonrisa torcida","boca sorprendida","colmillos chiquitos","boca de robot","boca feliz","boca seria"],
  bodyType:    ["cuerpo violeta con manchas","cuerpo verde con rayas","cuerpo redondo","cuerpo flaco y alto","cuerpo bajito y fuerte","cuerpo de dinosaurio","cuerpo peludo","cuerpo con alas pequeñas"],
  legType:     ["piernas cortitas","piernas largas","patas de dinosaurio","piernas con zapatillas","piernas flacas","piernas fuertes","patas con garras","piernas saltarinas"],
  accessory:   ["anteojos redondos","gorra roja","capa azul","mochila amarilla","bufanda verde","zapatillas gigantes","remera con estrella","sombrero raro","pulsera mágica","auriculares grandes"],
  power:       ["saltar muy alto","correr rapidísimo","hacerse invisible","tirar rayos de colores","volar bajito","hablar con animales","convertir piedras en caramelos","hacer reír a todos","brillar en la oscuridad","cambiar de color"],
  weakness:    ["se tienta con cosquillas","le dan miedo las arañas chiquitas","se duerme cuando escucha música lenta","se distrae con dibujos","no puede dejar de bailar","estornuda con purpurina","se ríe cuando cuenta hasta diez","se olvida dónde dejó la mochila","se cae si corre muy rápido","se pone nervioso si ve brócoli"],
  worldType:   ["planeta gaseoso flotante","mundo subterráneo con cielo propio","dimensión paralela con física rara","isla estelar a la deriva","universo en miniatura dentro de un frasco","ciudad orbital que gira sola","planeta cristalino que resuena","mundo de niebla densa habitable","planeta invertido (tierra arriba)","dimensión temporal congelada"],
  skyColor:    ["verde eléctrico","violeta profundo","naranja metálico","azul de tormenta permanente","dorado brillante con grietas negras","rosado fluorescente","blanco con venas negras visibles"],
  terrainType: ["islas que flotan y rebotan","cristales gigantes como rascacielos","espirales de metal que crecen solas","llanuras de neón parpadeante","montañas de vidrio que tintinean"],
  climate:     ["lluvia de estrellas frías","tormenta de colores sin viento","niebla musical constante","viento de recuerdos ajenos","nieve pixelada que no derrite","calor invisible que sí se siente","lluvia de datos visuales","vendaval de ideas sueltas","granizo de burbujas jabonosas","sol con sonido propio"],
  creature:    ["peces que vuelan en formación","robots-planta fotosintéticos","nubes con personalidad irascible","tortugas de cristal traslúcido","pájaros de fuego frío azul","medusas del cielo que fulguran","lobos electromagnéticos en manada","mariposas de metal cantoras"],
  danger:      ["puertas invisibles que aparecen al azar","gravedad que cambia cada hora en punto","eco que borra fragmentos de memoria","sombras que copian movimientos con retraso","números que se hablan entre ellos","espejos que muestran el futuro incómodo","suelos que cambian de color sin aviso","viento que susurra preguntas sin respuesta","lluvia que da ideas raras al azar","silencio que hace un ruido molesto"],
  treasure:    ["cristal de memoria comprimida","semilla de universo sin plantar","reloj que para el tiempo local","llave que abre 7 dimensiones a la vez","libro que se escribe solo con tus deseos","frasco de tiempo concentrado (peligroso)"],
  worldRule:   ["nadie puede caminar en línea recta","los colores cambian según el estado de ánimo","las matemáticas funcionan al revés (y funciona)","todo lo que se nombra tres veces, aparece","nadie puede mentir (pero pueden cantar)","la gravedad es opcional antes del mediodía","el tiempo pasa más rápido mientras dormís","los sueños se vuelven edificios al amanecer","los números tienen sabor (el 7 es salado)","las sombras son portales unidireccionales"],

  protagonist: ["un robot perdido sin mapa de regreso","una chica que puede ver un segundo al futuro","un científico con memoria perfecta pero selectiva","un monstruo amigable rechazado por los monstruos","un explorador sin brújula ni destino","una máquina que aprendió a soñar","un chico cuyos poderes funcionan al revés","una artista que dibuja cosas que luego existen","un guardián del tiempo jubilado antes de tiempo","un alienígena en su primer día en la Tierra"],
  storyPlace:  ["una biblioteca infinita con libros que se mueven","una ciudad completamente bajo el agua","un laberinto de cristal que cambia solo","la última estación del tren espacial intergaláctico","un bosque que aparece y desaparece según el humor","una escuela que flota y nunca aterriza","el último piso de una torre sin fin conocida"],
  problem:     ["perdió algo que nunca tuvo pero extraña igual","debe resolver un misterio sin ninguna pista real","necesita llegar a un lugar que no existe todavía","alguien borró su historia de todos los registros","el tiempo se está acabando (literalmente, el reloj se encoge)","encontró una puerta y olvidó por qué la buscaba","tiene el poder pero no recuerda cómo usarlo","el mapa dice que ya llegó, pero no hay nada","debe elegir entre dos caminos igualmente imposibles","descubrió que es el personaje de alguien más"],
  ally:        ["una criatura que solo habla en ecuaciones","un fantasma matemático muy ansioso","una mochila parlante que da consejos (siempre malos)","un robot que tiene miedo de los robots","una sombra con personalidad totalmente opuesta","un libro que interrumpe en el momento menos oportuno"],
  magicObject: ["una llave que abre preguntas en lugar de puertas","un espejo que muestra el futuro imperfecto","un reloj que va para atrás (nunca para adelante)","una lapicera que escribe sola lo que deberías decir","un mapa que siempre está equivocado pero lleva al destino","un número secreto que cambia todo al pronunciarlo","una piedra que graba fragmentos de recuerdos ajenos","un libro con páginas en blanco que ya tiene respuestas","una botella con tiempo concentrado (caduca pronto)","un portal de bolsillo (solo funciona de noche)"],
  enemy:       ["un dragón invisible que se nota por el olor a humo","el guardián del olvido que borra nombres","una máquina que hace preguntas sin respuesta conocida","una sombra que copia todo con un segundo de retraso","el Señor del Error Matemático","una nube que borra palabras cuando llueve","el Algoritmo Rebelde que reescribe las reglas","un espejo que atrapa reflejos y los usa como ejército"],
  twist:       ["resulta que el enemigo era un aliado disfrazado sin saberlo","el lugar en realidad ES el personaje principal","el objeto mágico tenía las instrucciones al revés","todo era un sueño dentro de otro sueño (dentro de otro)","el final era en realidad el comienzo de todo","el protagonista ya había estado antes, sin recordarlo","la solución era no resolverlo y esperar","el aliado era el verdadero villano desde el principio","existía una tercera opción que nadie consideró","la historia no termina: continúa en el dibujo"],
  ending:      ["encontró lo que buscaba, pero ya no lo necesitaba","la aventura terminó, pero el portal siguió abierto","ganaron, pero el mundo ya no era exactamente igual","el misterio se resolvió y apareció uno más grande"],

  invFunction: ["ordenar pensamientos en carpetas invisibles","traducir emociones a código ejecutable","predecir el próximo error antes de cometerlo","convertir el aburrimiento en energía cinética","copiar habilidades por exactamente 10 minutos","crear puentes entre ideas incompatibles","detectar mentiras matemáticas con sonido","guardar sueños en formato comprimido portátil","ampliar el tiempo libre un 40%","resolver el problema antes de que ocurra"],
  invShape:    ["mochila con paneles laterales","casco esférico transparente","guante con pantalla táctil integrada","caja con ruedas y antenas","anillo gigante ajustable","torre plegable de bolsillo"],
  invSize:     ["microscópico (necesitás lupa)","del tamaño de un lápiz grueso","como una mochila escolar","del tamaño de una persona adulta","como una casa pequeña","como un edificio de 3 pisos","gigante (necesitás equipo para moverlo)","invisible pero enorme (calculado)","cambia de tamaño según quién lo usa","exactamente del tamaño de un bolsillo"],
  invMaterial: ["cristal de energía azul autocargable","metal que aprende y se adapta","plástico del futuro (no existe todavía)","madera eléctrica de árbol raro","luz comprimida en estado sólido","tiempo solidificado (delicado)","sonido endurecido a temperatura ambiente","matemáticas en estado sólido (pesadas)"],
  invEnergy:   ["risas genuinas (sin falsas)","confusión resuelta correctamente","sueños de medianoche específicos","preguntas sin respuesta conocida","energía de la primera idea del día","silencio de exactamente 3 segundos","ruido de fondo de cafetería","ecuaciones correctas completadas","creatividad pura sin filtro","la energía del '¡Ajá!' espontáneo"],
  invEffect:   ["hace flotar los zapatos del usuario","convierte el habla en música 8-bit","hace aparecer números en el aire alrededor","cambia el color del cabello según el humor","hace que objetos cercanos hablen brevemente","multiplica el hambre por 3 de golpe","activa una melodía cuando alguien miente cerca"],
  invUser:     ["exploradores despistados con ideas","matemáticos creativos sin papel","artistas con exceso de ideas simultáneas","inventores sin taller disponible","chicos que se aburren fácil en cualquier lugar","personas con demasiadas preguntas a la vez","soñadores sin hora de dormir fija","científicos que se ríen de sus propios errores","dibujantes que necesitan inspiración urgente","cualquiera que quiera cambiar algo del mundo"],
};

// ─── Palabras en inglés agrupadas por modo ───────────────────
const ENGLISH_POOL = {
  character: [
    { word: "Power",  translation: "poder",    sentence: "My character has a special power.",       hint: "Describí el poder de tu personaje en inglés." },
    { word: "Head",   translation: "cabeza",   sentence: "The creature has a very strange head.",   hint: "¿De qué forma es la head de tu personaje?" },
    { word: "Eyes",   translation: "ojos",     sentence: "Each eye sees a different dimension.",    hint: "Contá los eyes y usá ese número en la frase." },
    { word: "Arms",   translation: "brazos",   sentence: "Extra arms make any job easier.",         hint: "Describí qué hacen los arms de tu personaje." },
    { word: "Hero",   translation: "héroe",    sentence: "Every hero has a hidden weakness.",       hint: "¿Cuál es la hidden weakness de tu hero?" },
    { word: "Shadow", translation: "sombra",   sentence: "The shadow moves on its own.",            hint: "Describí qué hace la shadow de tu personaje." },
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
  { day: 1,  title: "Monstruo espacial",     mode: "character",  theme: "espacio",     desc: "Creá un monstruo del espacio exterior.",               bonusWord: "Monster"  },
  { day: 2,  title: "Planeta desconocido",   mode: "world",      theme: "planetas",    desc: "Diseñá un planeta que nadie conoce todavía.",          bonusWord: "World"    },
  { day: 3,  title: "Robot inventor",        mode: "invention",  theme: "tecnología",  desc: "Inventá una máquina creada por un robot.",             bonusWord: "Robot"    },
  { day: 4,  title: "Biblioteca infinita",   mode: "story",      theme: "misterio",    desc: "Una historia en una biblioteca que no termina.",       bonusWord: "Story"    },
  { day: 5,  title: "Jefe del laboratorio",  mode: "daily",      theme: "lab",         desc: "Misión especial de alto voltaje creativo.",            bonusWord: "Lab"      },
  { day: 6,  title: "Criatura del océano",   mode: "character",  theme: "agua",        desc: "Creá una criatura de las profundidades.",             bonusWord: "Ocean"    },
  { day: 7,  title: "Ciudad flotante",       mode: "world",      theme: "ciudades",    desc: "Diseñá una ciudad que flota en el cielo.",            bonusWord: "City"     },
  { day: 8,  title: "Invento absurdo",       mode: "invention",  theme: "inventos",    desc: "Creá la máquina más rara del universo.",              bonusWord: "Machine"  },
  { day: 9,  title: "El mapa del tesoro",    mode: "story",      theme: "aventura",    desc: "Una historia sobre un mapa que cambia solo.",         bonusWord: "Map"      },
  { day: 10, title: "Desafío intermedio",    mode: "daily",      theme: "lab",         desc: "Misión especial: ¡llegaste a la décima!",             bonusWord: "Star"     },
  { day: 11, title: "Superhéroe secreto",    mode: "character",  theme: "superhéroes", desc: "Creá un héroe con poderes únicos.",                   bonusWord: "Power"    },
  { day: 12, title: "Mundo de cristal",      mode: "world",      theme: "cristal",     desc: "Diseñá un mundo donde todo es de cristal.",           bonusWord: "Crystal"  },
  { day: 13, title: "Máquina del tiempo",    mode: "invention",  theme: "tiempo",      desc: "Inventá una máquina que viaja en el tiempo.",         bonusWord: "Time"     },
  { day: 14, title: "La puerta secreta",     mode: "story",      theme: "misterio",    desc: "Una historia detrás de una puerta misteriosa.",       bonusWord: "Door"     },
  { day: 15, title: "Desafío de la mitad",   mode: "daily",      theme: "lab",         desc: "¡Mitad del Lab! Misión épica especial.",              bonusWord: "Hero"     },
  { day: 16, title: "Dragón moderno",        mode: "character",  theme: "dragones",    desc: "Creá un dragón adaptado a la vida urbana.",           bonusWord: "Dragon"   },
  { day: 17, title: "Bosque magnético",      mode: "world",      theme: "naturaleza",  desc: "Un bosque donde las plantas tienen campos magnéticos.",bonusWord: "Forest"   },
  { day: 18, title: "Comida mutante",        mode: "invention",  theme: "comida",      desc: "Inventá un alimento que transforma a quien lo come.", bonusWord: "Fire"     },
  { day: 19, title: "La ciudad perdida",     mode: "story",      theme: "aventura",    desc: "Una historia sobre una ciudad que desapareció.",      bonusWord: "City"     },
  { day: 20, title: "Desafío avanzado",      mode: "daily",      theme: "lab",         desc: "Nivel avanzado. ¡Vamos!",                             bonusWord: "Space"    },
  { day: 21, title: "Villano simpático",     mode: "character",  theme: "villanos",    desc: "Creá un villano que no es tan malo en el fondo.",     bonusWord: "Shadow"   },
  { day: 22, title: "Planeta de hielo",      mode: "world",      theme: "frío",        desc: "Diseñá un planeta completamente congelado.",          bonusWord: "Ice"      },
  { day: 23, title: "Zapatillas voladoras",  mode: "invention",  theme: "transporte",  desc: "Inventá unas zapatillas con propulsores.",            bonusWord: "Speed"    },
  { day: 24, title: "El último guardián",    mode: "story",      theme: "fantasía",    desc: "Una historia sobre el guardián de una puerta.",       bonusWord: "Key"      },
  { day: 25, title: "Desafío master",        mode: "daily",      theme: "lab",         desc: "Casi terminás. ¡Misión épica penúltima!",             bonusWord: "Light"    },
  { day: 26, title: "Mascota alienígena",    mode: "character",  theme: "aliens",      desc: "Creá una mascota de otro planeta.",                   bonusWord: "Eyes"     },
  { day: 27, title: "Mundo submarino",       mode: "world",      theme: "agua",        desc: "Diseñá un mundo completamente bajo el agua.",         bonusWord: "Ocean"    },
  { day: 28, title: "Invento del año",       mode: "invention",  theme: "premios",     desc: "Creá el invento más importante de la historia.",      bonusWord: "Secret"   },
  { day: 29, title: "La última misión",      mode: "story",      theme: "cierre",      desc: "Una historia que termina con una pregunta abierta.",  bonusWord: "Story"    },
  { day: 30, title: "Obra maestra del Lab",  mode: "daily",      theme: "final",       desc: "La misión final. Tu obra maestra personal.",          bonusWord: "Creative" },
];

// ─── Medallas ─────────────────────────────────────────────────
const BADGE_DEFS = [
  { id: "first",       emoji: "✏️",  title: "Primera Creación",       desc: "Completaste tu primera misión.",      check: s => s.completedMissions >= 1 },
  { id: "m5",         emoji: "🌟",  title: "5 Misiones",              desc: "5 misiones completadas.",             check: s => s.completedMissions >= 5 },
  { id: "m10",        emoji: "🧪",  title: "Laboratorio Activo",      desc: "10 misiones completadas.",            check: s => s.completedMissions >= 10 },
  { id: "m15",        emoji: "🎨",  title: "Mente Creativa",          desc: "15 misiones completadas.",            check: s => s.completedMissions >= 15 },
  { id: "m20",        emoji: "🔭",  title: "Artista Lógico",          desc: "20 misiones completadas.",            check: s => s.completedMissions >= 20 },
  { id: "m25",        emoji: "🏅",  title: "Casi Leyenda",            desc: "25 misiones completadas.",            check: s => s.completedMissions >= 25 },
  { id: "m30",        emoji: "👑",  title: "Genio del Lab",           desc: "30 misiones completadas.",            check: s => s.completedMissions >= 30 },
  { id: "chars",      emoji: "🦸",  title: "Maestro de Personajes",   desc: "5 personajes creados.",               check: s => s.creations.filter(c => c.mode === "character").length >= 5 },
  { id: "worlds",     emoji: "🌍",  title: "Arquitecto de Mundos",    desc: "5 mundos creados.",                   check: s => s.creations.filter(c => c.mode === "world").length >= 5 },
  { id: "invs",       emoji: "⚙️",  title: "Inventor Imposible",      desc: "5 inventos creados.",                 check: s => s.creations.filter(c => c.mode === "invention").length >= 5 },
  { id: "stories",    emoji: "📖",  title: "Narrador Creativo",       desc: "5 historias creadas.",                check: s => s.creations.filter(c => c.mode === "story").length >= 5 },
  { id: "math",       emoji: "🧠",  title: "Mente Matemática",        desc: "50 respuestas correctas.",            check: s => (s.totalCorrect || 0) >= 50 },
];

// ─── Mensajes de feedback ─────────────────────────────────────
const FB = {
  wrong1: ["Bau! Casi. Revisá la cuenta una vez más.", "Le erraste por poco. Probá de nuevo.", "Buen intento! Fijate bien en la operación."],
  wrong2: ["Probá resolver la cuenta por partes.", "Tomátelo con calma: ¿qué operación es primero?", "Separalo en pasos más chicos y volvé a intentar."],
  correct: ["¡Correcto Bau! Desbloqueaste una parte de tu creación.", "Exacto. Sumaste una pieza al laboratorio.", "Buena Bau!. Tu dibujo acaba de ganar un detalle nuevo."],
};

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
  if (!confirm("¿Seguro querés reiniciar todo tu progreso? Esta acción no se puede deshacer.")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  mission = null;
  renderHome();
}

/* ─────────────────────────────────────────────────────────────
   §3  ESTADO DE MISIÓN (transient — no persiste en localStorage)
   ───────────────────────────────────────────────────────────── */

let mission = null;
/*
  mission = {
    mode, level, steps[], currentStepIdx, totalErrors,
    features: { key -> resultString },
    englishWord: { word, translation, sentence, hint },
    dailyHint: null | { day, title, bonusWord }
    stepsResolved: 0
  }
  step = { featureKey, featureName, question, answer, resolverFn }
*/

/* ─────────────────────────────────────────────────────────────
   §4  GENERACIÓN MATEMÁTICA
   ───────────────────────────────────────────────────────────── */

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateMathProblem(level) {
  if (level === "explorador") {
    const op = pickRandom(["+", "-", "×"]);

    if (op === "+") {
      const a = randInt(15, 60);
      const b = randInt(10, 50);
      return { question: `${a} + ${b}`, answer: a + b };
    }

    if (op === "-") {
      const b = randInt(10, 45);
      const a = randInt(b + 10, 90);
      return { question: `${a} - ${b}`, answer: a - b };
    }

    const a = randInt(2, 9);
    const b = randInt(2, 6);
    return { question: `${a} × ${b}`, answer: a * b };
  }

  if (level === "creador") {
    const op = pickRandom(["+", "-", "×", "÷", "mix1"]);

    if (op === "+") {
      const a = randInt(30, 120);
      const b = randInt(20, 90);
      return { question: `${a} + ${b}`, answer: a + b };
    }

    if (op === "-") {
      const b = randInt(20, 80);
      const a = randInt(b + 20, 160);
      return { question: `${a} - ${b}`, answer: a - b };
    }

    if (op === "×") {
      const a = randInt(4, 12);
      const b = randInt(3, 12);
      return { question: `${a} × ${b}`, answer: a * b };
    }

    if (op === "÷") {
      const b = randInt(2, 12);
      const r = randInt(3, 15);
      return { question: `${r * b} ÷ ${b}`, answer: r };
    }

    const a = randInt(3, 9);
    const b = randInt(2, 8);
    const c = randInt(5, 20);
    return { question: `${a} × ${b} + ${c}`, answer: a * b + c };
  }

  // Nivel genio
  const type = pickRandom(["mix1", "mix2", "mix3", "divisionMix", "doble"]);

  if (type === "mix1") {
    const a = randInt(5, 12);
    const b = randInt(4, 12);
    const c = randInt(10, 40);
    return { question: `${a} × ${b} + ${c}`, answer: a * b + c };
  }

  if (type === "mix2") {
    const a = randInt(6, 15);
    const b = randInt(4, 12);
    const c = randInt(10, 50);
    return { question: `${a} × ${b} - ${c}`, answer: a * b - c };
  }

  if (type === "mix3") {
    const a = randInt(20, 80);
    const b = randInt(10, 60);
    const c = randInt(2, 9);
    return { question: `${a} + ${b} × ${c}`, answer: a + b * c };
  }

  if (type === "divisionMix") {
    const b = randInt(3, 12);
    const r = randInt(5, 20);
    const c = randInt(10, 40);
    return { question: `${r * b} ÷ ${b} + ${c}`, answer: r + c };
  }

  const a = randInt(6, 12);
  const b = randInt(6, 12);
  const c = randInt(2, 9);
  const d = randInt(5, 30);
  return { question: `${a} × ${b} + ${c} × ${d}`, answer: a * b + c * d };
}

/* ─────────────────────────────────────────────────────────────
   §5  RESOLUCIÓN CREATIVA
   ─────────────────────────────────────────────────────────────
   Cada resolver recibe el número y devuelve una string descriptiva.
   ───────────────────────────────────────────────────────────── */

function ld(n)        { return Math.abs(n) % 10; }
function clamp(n,a,b) { return Math.min(b, Math.max(a, Math.abs(n))); }
function pick(arr, n) { return arr[Math.abs(n) % arr.length]; }

const RESOLVERS = {
  // ── Personaje ───────────────────────────────────────────────
  charType:    n => `${pick(T.charType, ld(n))}`,
  headShape:   n => `${pick(T.headShape, n % 5)}`,
  eyeCount:    n => { const c = clamp(n,1,10); return `${c} ojo${c!==1?"s":""} ${T.eyeStyle[ld(n)]}`; },
  mouthType:   n => `${pick(T.mouthType, ld(n))}`,
  bodyType:    n => `${pick(T.bodyType, n % 4)}`,
  armCount:    n => { const c = [2,4,6,8][n%4]; return `${c} brazo${c>1?"s":""} ${pick(["mecánicos","de energía","articulados","telescópicos"], n%4)}`; },
  legType:     n => `${pick(T.legType, n % 5)}`,
  accessory:   n => `${pick(T.accessory, ld(n))}`,
  power:       n => `${pick(T.power, n % 8)}`,
  weakness:    n => `${pick(T.weakness, ld(n))}`,
  // ── Mundo ───────────────────────────────────────────────────
  worldType:   n => `${pick(T.worldType, ld(n))}`,
  skyColor:    n => `${pick(T.skyColor, n % 7)}`,
  moonCount:   n => { const c = clamp(n,1,7); return `${c} luna${c>1?"s":""}`; },
  terrainType: n => `${pick(T.terrainType, n % 5)}`,
  climate:     n => `${pick(T.climate, ld(n))}`,
  creature:    n => `${pick(T.creature, n % 8)}`,
  danger:      n => `${pick(T.danger, ld(n))}`,
  treasure:    n => `${pick(T.treasure, n % 6)}`,
  worldRule:   n => `${pick(T.worldRule, ld(n))}`,
  // ── Historia ────────────────────────────────────────────────
  protagonist: n => `${pick(T.protagonist, ld(n))}`,
  storyPlace:  n => `${pick(T.storyPlace, n % 7)}`,
  problem:     n => `${pick(T.problem, ld(n))}`,
  ally:        n => `${pick(T.ally, n % 6)}`,
  magicObject: n => `${pick(T.magicObject, ld(n))}`,
  enemy:       n => `${pick(T.enemy, n % 8)}`,
  twist:       n => `${pick(T.twist, ld(n))}`,
  ending:      n => `${pick(T.ending, n % 4)}`,
  // ── Invento ─────────────────────────────────────────────────
  invFunction: n => `${pick(T.invFunction, ld(n))}`,
  invShape:    n => `${pick(T.invShape, n % 6)}`,
  invSize:     n => `${pick(T.invSize, ld(n))}`,
  invMaterial: n => `${pick(T.invMaterial, n % 8)}`,
  buttonCount: n => { const c = clamp(n,2,12); return `${c} botón${c>1?"es":""}`; },
  invEnergy:   n => `${pick(T.invEnergy, ld(n))}`,
  invEffect:   n => `${pick(T.invEffect, n % 7)}`,
  invUser:     n => `${pick(T.invUser, ld(n))}`,
};

// ─── Plantillas de pasos por modo ────────────────────────────
function getStepTemplates(mode) {
  const S = (featureKey, featureName) => ({ featureKey, featureName });
  const CHAR_STEPS = [
    S("charType",   "Tipo de personaje"),
    S("headShape",  "Forma de la cabeza"),
    S("eyeCount",   "Ojos"),
    S("mouthType",  "Boca"),
    S("bodyType",   "Cuerpo"),
    S("armCount",   "Brazos"),
    S("legType",    "Piernas"),
    S("accessory",  "Accesorio especial"),
    S("power",      "Superpoder"),
    S("weakness",   "Debilidad divertida"),
  ];
  const WORLD_STEPS = [
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
  const STORY_STEPS = [
    S("protagonist","Protagonista"),
    S("storyPlace", "Lugar de la historia"),
    S("problem",    "El problema"),
    S("ally",       "Aliado inesperado"),
    S("magicObject","Objeto especial"),
    S("enemy",      "El antagonista"),
    S("twist",      "Giro inesperado"),
    S("ending",     "El final (por ahora)"),
  ];
  const INV_STEPS = [
    S("invFunction","Función principal"),
    S("invShape",   "Forma del invento"),
    S("invSize",    "Tamaño"),
    S("invMaterial","Material"),
    S("buttonCount","Cantidad de botones"),
    S("invEnergy",  "Energía que usa"),
    S("invEffect",  "Efecto secundario"),
    S("invUser",    "Usuario ideal"),
  ];
  const DAILY_STEPS = [
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
  const pre = ["Vex","Zel","Kra","Mor","Dyx","Flux","Nox","Qua","Tri","Lum"];
  const suf = ["tron","ius","ara","oth","ex","rix","on","us","ael","ion"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||3);
}
function makeWorldName(seeds) {
  const pre = ["Luna","Xar","Kep","Vor","Nex","Zel","Tri","Mor","Vel","Qua"];
  const suf = ["ia","aria","on","us","ax","ix","ula","ara","ex","ion"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||2) + " " + (clamp(seeds[2]||5,1,99));
}
function makeInvName(seeds) {
  const pre = ["Bot","Digi","Quant","Flux","Kryp","Zap","Neuro","Turbo","Ultra","Mega"];
  const suf = ["izador","tron","ex","bot","matic","izer","scan","link","core","pulse"];
  return pick(pre, seeds[0]||0) + pick(suf, seeds[1]||1) + " " + clamp(seeds[2]||1,1000,9999);
}
function makeStoryTitle(seeds) {
  const adj = ["Último","Gran","Secreto","Pequeño","Invisible","Misterioso","Olvidado","Extraño"];
  const noun= ["Portal","Código","Mapa","Guardián","Monstruo","Viaje","Sueño","Laberinto"];
  return "El " + pick(adj, seeds[0]||0) + " " + pick(noun, seeds[1]||4);
}

/* ─────────────────────────────────────────────────────────────
   §6  ARRANCAR MISIÓN
   ───────────────────────────────────────────────────────────── */

function startMission(mode, dailyHint) {
  if (!state.selectedLevel) { renderLevelScreen(); return; }

  const templates = getStepTemplates(mode);
  const steps = templates.map(t => {
    const math = generateMathProblem(state.selectedLevel);
    return { ...t, question: math.question, answer: math.answer, resolved: false };
  });

  // Elegir palabra en inglés
  const pool = ENGLISH_POOL[mode] || ENGLISH_POOL["character"];
  const engWord = pickRandom(pool);

  mission = {
    mode,
    level: state.selectedLevel,
    steps,
    currentStepIdx: 0,
    totalErrors: 0,
    features: {},
    englishWord: engWord,
    dailyHint: dailyHint || null,
    seeds: [],   // guardaremos las respuestas para generar el nombre al final
  };

  renderActiveMission();
}

/* ─────────────────────────────────────────────────────────────
   §7  LÓGICA DE RESPUESTA
   ───────────────────────────────────────────────────────────── */

let stepAttempts = 0;

function checkAnswer() {
  if (!mission) return;
  const step = mission.steps[mission.currentStepIdx];
  const input = document.getElementById("answer-input");
  const fb    = document.getElementById("feedback-area");
  const val   = input ? input.value.trim() : "";

  if (val === "") { updateFeedback("Escribí un número para comprobar.", "info"); return; }

  const userAns = Number(val);
  if (isNaN(userAns)) { updateFeedback("Escribí solo números, sin letras.", "info"); return; }

  if (userAns === step.answer) {
    // ¡Correcto!
    stepAttempts = 0;
    mission.seeds.push(step.answer);
    state.totalCorrect = (state.totalCorrect || 0) + 1;
    const result = RESOLVERS[step.featureKey] ? RESOLVERS[step.featureKey](step.answer) : String(step.answer);
    step.resolved = true;
    mission.features[step.featureKey] = result;

    updateFeedback(pickRandom(FB.correct), "success");
    showUnlockBox(step.featureName, result);
    updateSheetPanel();

    const btnCheck = document.getElementById("btn-check");
    const btnNext  = document.getElementById("btn-next-step");
    if (btnCheck)  btnCheck.disabled = true;
    if (input)     input.disabled = true;
    if (btnNext)   btnNext.hidden = false;

    // Actualizar barra de progreso de misión
    const filled = document.getElementById("progress-fill");
    if (filled) {
      const pct = Math.round(((mission.currentStepIdx+1) / mission.steps.length)*100);
      filled.style.width = pct + "%";
      filled.setAttribute("aria-valuenow", pct);
    }
  } else {
    stepAttempts++;
    mission.totalErrors++;
    if (stepAttempts === 1) updateFeedback(pickRandom(FB.wrong1), "hint");
    else if (stepAttempts === 2) updateFeedback(pickRandom(FB.wrong2), "hint");
    else {
      // 3er intento: ayuda más clara (no revela respuesta directa sino un approach)
      const hints = {
        "+": "Sumá los dos números de a uno.",
        "-": "Empezá desde el número más grande y restá de a poco.",
        "×": "Multiplicar es sumar el mismo número varias veces.",
        "÷": "¿Cuántas veces entra el segundo número en el primero?",
      };
      let hintMsg = "Pista: revisá la operación lentamente, paso a paso.";
      for (const [op, msg] of Object.entries(hints)) {
        if (step.question.includes(op)) { hintMsg = `Pista: ${msg}`; break; }
      }
      updateFeedback(hintMsg, "hint");
      stepAttempts = 0; // reset para no spamear la misma pista
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
  const el = document.getElementById("feedback-area");
  if (!el) return;
  el.textContent = msg;
  el.className = "feedback feedback--" + type;
}

function showUnlockBox(featureName, result) {
  const box = document.getElementById("unlock-box");
  const fn  = document.getElementById("unlock-feature-name");
  const fr  = document.getElementById("unlock-result");
  if (!box || !fn || !fr) return;
  fn.textContent = featureName;
  fr.textContent = result;
  box.hidden = false;
  box.classList.add("unlock-flash");
  setTimeout(() => box.classList.remove("unlock-flash"), 800);
}

function updateSheetPanel() {
  const panel = document.getElementById("sheet-panel");
  if (!panel) return;
  panel.innerHTML = renderSheetPanelHTML();
}

/* ─────────────────────────────────────────────────────────────
   §8  COMPLETAR MISIÓN Y GUARDAR
   ───────────────────────────────────────────────────────────── */

function completeMission() {
  if (!mission) return;

  // Calcular estrellas
  const isDaily = mission.mode === "daily";
  const baseStars = isDaily ? 5 : 3;
  const bonusStars = mission.totalErrors <= 2 ? 1 : 0;
  const starsEarned = baseStars + bonusStars;
  state.stars += starsEarned;
  state.completedMissions++;

  if (mission.dailyHint) {
    const day = mission.dailyHint.day;
    if (!state.completedDays.includes(day)) state.completedDays.push(day);
  }

  // Actualizar racha
  const today = todayStr();
  if (state.lastPlayedDate === today) {
    // ya se jugó hoy, no cambia la racha
  } else {
    const prev = state.lastPlayedDate ? new Date(state.lastPlayedDate + "T00:00:00") : null;
    const now  = new Date(today + "T00:00:00");
    const diff = prev ? Math.round((now - prev) / 86400000) : 999;
    state.currentStreak = diff === 1 ? (state.currentStreak || 0) + 1 : 1;
    state.lastPlayedDate = today;
  }

  // Generar nombre y armar creación
  const seeds = mission.seeds;
  const creation = buildCreation(mission, starsEarned);

  state.creations.unshift(creation); // más reciente primero
  if (state.creations.length > 100) state.creations.length = 100;

    const newBadges = unlockBadges();
  saveState();

  renderCreationSheet(creation, starsEarned, newBadges);

  setTimeout(showLoveModal, 700);
}

function buildCreation(m, starsEarned) {
  const seeds = m.seeds;
  let name, drawingPrompt;
  const f = m.features;

  switch (m.mode) {
    case "character":
  name = makeCharName(seeds);
  drawingPrompt = `Dibujá a ${name} en una hoja. Usá la ficha que desbloqueaste: tipo de personaje, cabeza, ojos, boca, cuerpo, brazos y piernas. Después inventale un enemigo, un lugar donde vive y, si querés, un superpoder. No hace falta que sea perfecto: la misión es imaginarlo y dibujarlo a tu manera.`;
  break;
    case "world":
      name = makeWorldName(seeds);
      drawingPrompt = `Dibujá a ${name} en una hoja. Es un ${f.charType || "personaje inventado"}. Tiene ${f.headShape || "cabeza original"}, ${f.eyeCount || "ojos especiales"}, ${f.mouthType || "boca divertida"}, ${f.bodyType || "cuerpo raro"}, ${f.armCount || "brazos creativos"} y ${f.legType || "piernas curiosas"}. También usa ${f.accessory || "un accesorio simple"}. Su poder es ${f.power || "hacer algo increíble"}.`;
      break;
    case "story":
      name = makeStoryTitle(seeds);
      drawingPrompt = `Dibujá la escena más importante de "${name}". Incluí al protagonista (${f.protagonist||"personaje"}) y el ${f.magicObject||"objeto"}.`;
      break;
    case "invention":
      name = makeInvName(seeds);
      drawingPrompt = `Dibujá el ${name} con todos sus detalles: ${f.invShape||"forma"}, ${f.invMaterial||"material"} y sus ${f.buttonCount||"botones"}.`;
      break;
    case "daily":
      name = "Lab " + makeCharName(seeds) + " x " + makeWorldName(seeds.slice(4));
      drawingPrompt = `Dibujá la escena completa: el personaje (${f.charType||"héroe"}) con su ${f.power||"poder"} en un mundo con cielo ${f.skyColor||"raro"} y el ${f.magicObject||"objeto"} en el centro.`;
      break;
    default:
      name = "Creación Lab";
      drawingPrompt = "Dibujá lo que imaginaste durante la misión.";
  }

  return {
    id: Date.now().toString(),
    mode: m.mode,
    name,
    date: todayStr(),
    level: m.level,
    features: { ...m.features },
    englishWord: m.englishWord,
    drawingPrompt,
    starsEarned,
    dailyDay: m.dailyHint ? m.dailyHint.day : null,
  };
}

/* ─────────────────────────────────────────────────────────────
   §9  MEDALLAS
   ───────────────────────────────────────────────────────────── */

function unlockBadges() {
  const newly = [];
  BADGE_DEFS.forEach(b => {
    if (!state.badges.includes(b.id) && b.check(state)) {
      state.badges.push(b.id);
      newly.push(b);
    }
  });
  return newly;
}

/* ─────────────────────────────────────────────────────────────
   §10 RENDERS DE PANTALLAS
   ───────────────────────────────────────────────────────────── */

const app = document.getElementById("app-main");
const lvlChip = document.getElementById("level-chip");

function setScreen(html) {
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  mission = null; // limpiar misión activa al volver a home
  const creatCount = state.creations.length;
  const lvl = state.selectedLevel ? `${LEVELS[state.selectedLevel].emoji} ${LEVELS[state.selectedLevel].label}` : "Sin elegir";
  setScreen(`
    <section class="screen screen-home" aria-labelledby="home-title">
      <div class="card card-hero">
        <p class="eyebrow">🧪 Laboratorio Creativo</p>
        <h1 id="home-title">DibuMente Lab</h1>
        <p class="subtitle">Resolvé cuentas, desbloqueá ideas y creá personajes, mundos e historias.</p>
        <p class="lead">Cada resultado transforma tu dibujo. Tu misión es resolver, imaginar y crear.</p>
        <div class="button-row">
          <button class="btn btn-primary btn-lg" data-action="show-mode-select">Crear algo nuevo</button>
          <button class="btn btn-secondary" data-action="show-gallery">Ver galería</button>
          <button class="btn btn-ghost" data-action="show-progress">Ver progreso</button>
        </div>
      </div>

      <div class="stats-strip">
        <div class="stat-pill"><span class="stat-v">⭐ ${state.stars}</span><span class="stat-l">Estrellas</span></div>
        <div class="stat-pill"><span class="stat-v">🗂️ ${state.completedMissions}</span><span class="stat-l">Misiones</span></div>
        <div class="stat-pill"><span class="stat-v">${lvl}</span><span class="stat-l">Nivel</span></div>
        <div class="stat-pill"><span class="stat-v">🖼️ ${creatCount}</span><span class="stat-l">Creaciones</span></div>
      </div>

      <div class="card card-daily-strip" id="daily-strip"></div>

      <p class="privacy-note">🔒 Esta app no pide datos personales. Tu progreso y tus creaciones se guardan solo en este dispositivo.</p>
    </section>
  `);
  // Inyectar la sugerencia del día después del render
  renderDailyStrip();
}

function renderDailyStrip() {
  const strip = document.getElementById("daily-strip");
  if (!strip) return;
  const totalCompleted = state.completedDays.length;
  const nextDay = DAILY_MISSIONS.find(d => !state.completedDays.includes(d.day));
  if (!nextDay) {
    strip.innerHTML = `<p class="daily-done">🏆 ¡Completaste los 30 días del Lab! Podés seguir creando libremente.</p>`;
    return;
  }
  strip.innerHTML = `
    <div class="daily-inner">
      <p class="daily-label">📅 Misión del día (día ${nextDay.day}/30)</p>
      <p class="daily-title">${escHtml(nextDay.title)}</p>
      <p class="daily-desc">${escHtml(nextDay.desc)}</p>
      <div class="button-row">
        <button class="btn btn-accent" data-action="start-daily" data-day="${nextDay.day}">Hacer esta misión</button>
      </div>
    </div>
    <div class="daily-progress-mini">
      <p>${totalCompleted}/30 días</p>
      <div class="mini-bar"><div class="mini-fill" style="width:${Math.round(totalCompleted/30*100)}%"></div></div>
    </div>
  `;
}

// ─── SELECCIÓN DE NIVEL ───────────────────────────────────────
function renderLevelScreen() {
  const cards = Object.entries(LEVELS).map(([id, lv]) => `
    <div class="card level-card ${state.selectedLevel===id?"level-card--active":""}">
      <p class="level-icon" aria-hidden="true">${lv.emoji}</p>
      <h3>${lv.label}</h3>
      <p>${escHtml(lv.desc)}</p>
      <button class="btn ${state.selectedLevel===id?"btn-secondary":"btn-primary"}" data-action="choose-level" data-level="${id}">
        ${state.selectedLevel===id?"Nivel actual ✓":"Elegir este nivel"}
      </button>
    </div>
  `).join("");
  setScreen(`
    <section class="screen" aria-labelledby="level-title">
      <h1 id="level-title">Elegí tu nivel</h1>
      <p class="screen-intro">Podés cambiarlo cuando quieras. No afecta misiones ya completadas.</p>
      <div class="level-grid">${cards}</div>
      <div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>
    </section>
  `);
}

// ─── SELECTOR DE MODO ─────────────────────────────────────────
function renderModeSelect() {
  if (!state.selectedLevel) { renderLevelScreen(); return; }
  const cards = Object.entries(MODE_DEFS).map(([id, m]) => `
    <div class="card mode-card mode-card--${m.color}">
      <p class="mode-icon" aria-hidden="true">${m.emoji}</p>
      <h3>${m.label}</h3>
      <p>${escHtml(m.desc)}</p>
      <button class="btn btn-primary" data-action="start-mission" data-mode="${id}">${m.label}</button>
    </div>
  `).join("");
  setScreen(`
    <section class="screen" aria-labelledby="mode-title">
      <h1 id="mode-title">¿Qué vas a crear hoy?</h1>
      <p class="screen-intro">Cada modo genera una ficha distinta para dibujar al final.</p>
      <div class="mode-grid">${cards}</div>
      <div class="button-row">
        <button class="btn btn-ghost" data-action="show-level">Cambiar nivel</button>
        <button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
      </div>
    </section>
  `);
}

// ─── MISIÓN ACTIVA ────────────────────────────────────────────
function renderActiveMission() {
  if (!mission) return;
  const step    = mission.steps[mission.currentStepIdx];
  const stepNum = mission.currentStepIdx + 1;
  const total   = mission.steps.length;
  const pct     = Math.round((stepNum - 1) / total * 100);
  const modeDef = MODE_DEFS[mission.mode];

  stepAttempts = 0;

  setScreen(`
    <section class="screen screen-mission" aria-labelledby="mission-heading">
      <div class="mission-header">
        <div>
          <p class="eyebrow">${modeDef.emoji} ${modeDef.label}</p>
          <h1 id="mission-heading" class="mission-title">${mission.dailyHint ? escHtml(mission.dailyHint.title) : "Misión libre"}</h1>
        </div>
        <div class="mission-step-count">Paso <strong>${stepNum}</strong> / ${total}</div>
      </div>

      <div class="progress-bar-wrapper" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de la misión">
        <div class="progress-fill" id="progress-fill" style="width:${pct}%"></div>
      </div>

      <div class="mission-lab">
        <!-- Panel izquierdo: pregunta activa -->
        <div class="panel-question card">
          <p class="feature-eyebrow">Desbloqueando: <strong>${escHtml(step.featureName)}</strong></p>
          <p class="math-display">${escHtml(step.question)} = ?</p>
          <label for="answer-input" class="sr-only">Tu respuesta</label>
          <div class="answer-row">
            <input type="number" inputmode="numeric" id="answer-input" autocomplete="off" placeholder="Escribí tu respuesta">
            <button id="btn-check" class="btn btn-primary" data-action="check-answer">Comprobar</button>
          </div>
          <p class="feedback" id="feedback-area" aria-live="polite"></p>

          <div class="unlock-box" id="unlock-box" hidden>
            <p class="unlock-label">✅ Desbloqueado: <span id="unlock-feature-name"></span></p>
            <p class="unlock-result" id="unlock-result"></p>
          </div>

          <button id="btn-next-step" class="btn btn-primary btn-next" data-action="next-step" hidden>
            ${mission.currentStepIdx + 1 < mission.steps.length ? "Siguiente paso →" : "Ver mi creación 🎉"}
          </button>
        </div>

        <!-- Panel derecho: ficha en construcción -->
        <div class="panel-sheet card" id="sheet-panel">
          ${renderSheetPanelHTML()}
        </div>
      </div>

      <div class="button-row button-row--mission">
        <button class="btn btn-ghost btn-sm" data-action="abort-mission">Abandonar misión</button>
      </div>
    </section>
  `);
  const inp = document.getElementById("answer-input");
  if (inp) inp.focus();
}

function renderSheetPanelHTML() {
  if (!mission) return "";
  const steps = mission.steps;
  const cur   = mission.currentStepIdx;
  const rows  = steps.map((s, i) => {
    if (s.resolved) {
      return `<div class="sheet-row sheet-row--done">
        <span class="sheet-key">${escHtml(s.featureName)}:</span>
        <span class="sheet-val">${escHtml(mission.features[s.featureKey] || "")}</span>
      </div>`;
    } else if (i === cur) {
      return `<div class="sheet-row sheet-row--current">
        <span class="sheet-key">${escHtml(s.featureName)}:</span>
        <span class="sheet-val sheet-val--pending">resolviendo...</span>
      </div>`;
    } else {
      return `<div class="sheet-row sheet-row--locked">
        <span class="sheet-key">${escHtml(s.featureName)}:</span>
        <span class="sheet-val sheet-val--locked">🔒</span>
      </div>`;
    }
  }).join("");
  return `
    <p class="sheet-heading">📋 Ficha en construcción</p>
    <div class="sheet-rows">${rows}</div>
  `;
}

// ─── FICHA FINAL DE CREACIÓN ──────────────────────────────────
function renderCreationSheet(creation, starsEarned, newBadges) {
  const modeDef  = MODE_DEFS[creation.mode];
  const eng      = creation.englishWord;
  const badgeHtml = newBadges && newBadges.length
    ? `<div class="new-badges">${newBadges.map(b=>`<span class="badge-chip badge-chip--new">${b.emoji} ${escHtml(b.title)} ¡Desbloqueada!</span>`).join("")}</div>`
    : "";
  const featureRows = Object.entries(creation.features).map(([key, val]) => {
    const step = (mission ? mission.steps : []).find(s=>s.featureKey===key);
    const label = step ? step.featureName : key;
    return `<div class="sheet-row sheet-row--done"><span class="sheet-key">${escHtml(label)}:</span><span class="sheet-val">${escHtml(val)}</span></div>`;
  }).join("");

  setScreen(`
    <section class="screen screen-creation" aria-labelledby="creation-title">
      <div class="card card-creation">
        <p class="eyebrow">${modeDef.emoji} ${modeDef.label} — Misión completada</p>
        <h1 id="creation-title">${escHtml(creation.name)}</h1>
        <p class="stars-earned">+${starsEarned} ⭐ estrellas · Total: ${state.stars} ⭐</p>
        ${badgeHtml}

        <div class="sheet-rows creation-sheet-rows">${featureRows}</div>

        <div class="english-box">
          <p class="eng-word"><strong>${escHtml(eng.word)}</strong> = ${escHtml(eng.translation)}</p>
          <p class="eng-sentence">"${escHtml(eng.sentence)}"</p>
          <p class="eng-hint">💬 ${escHtml(eng.hint)}</p>
        </div>

        <div class="drawing-prompt">
          <p class="drawing-label">🎨 Tu consigna de dibujo</p>
          <p class="drawing-text">${escHtml(creation.drawingPrompt)}</p>
        </div>

        <p class="gallery-note">Esta ficha ya se guardó en tu galería.</p>

        <div class="button-row">
          <button class="btn btn-primary" data-action="show-mode-select">Crear algo nuevo</button>
          <button class="btn btn-secondary" data-action="show-gallery">Ver galería</button>
        </div>
        <div class="button-row">
          <button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
        </div>
      </div>
    </section>
  `);
}

// ─── GALERÍA ──────────────────────────────────────────────────
function renderGallery() {
  if (state.creations.length === 0) {
    setScreen(`
      <section class="screen" aria-labelledby="gallery-title">
        <h1 id="gallery-title">Galería de Creaciones</h1>
        <div class="card empty-state">
          <p class="empty-emoji" aria-hidden="true">🖼️</p>
          <p>Todavía no tenés creaciones guardadas.</p>
          <p>Completá tu primera misión y la ficha aparecerá acá.</p>
          <div class="button-row">
            <button class="btn btn-primary" data-action="show-mode-select">Crear algo nuevo</button>
          </div>
        </div>
        <div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>
      </section>
    `);
    return;
  }
  const cards = state.creations.map(c => {
    const md = MODE_DEFS[c.mode] || MODE_DEFS["character"];
    const topFeatures = Object.entries(c.features).slice(0,3).map(([k,v])=>`<li>${escHtml(v)}</li>`).join("");
    return `
      <div class="card gallery-card">
        <div class="gallery-card-header">
          <span class="gallery-mode">${md.emoji} ${md.label}</span>
          <span class="gallery-date">${escHtml(c.date)}</span>
        </div>
        <h3 class="gallery-name">${escHtml(c.name)}</h3>
        <ul class="gallery-features">${topFeatures}</ul>
        <p class="gallery-eng">🇬🇧 ${escHtml(c.englishWord.word)} = ${escHtml(c.englishWord.translation)}</p>
        <p class="gallery-stars">⭐ ${c.starsEarned} estrellas</p>
        <div class="button-row">
          <button class="btn btn-secondary btn-sm" data-action="show-creation" data-id="${c.id}">Ver ficha</button>
          <button class="btn btn-danger btn-sm" data-action="delete-creation" data-id="${c.id}">Borrar</button>
        </div>
      </div>
    `;
  }).join("");
  setScreen(`
    <section class="screen" aria-labelledby="gallery-title">
      <h1 id="gallery-title">Galería de Creaciones</h1>
      <p class="screen-intro gallery-note-intro">Esta galería guarda fichas de ideas, no dibujos ni fotos. (${state.creations.length} creaciones)</p>
      <div class="gallery-grid">${cards}</div>
      <div class="button-row">
        <button class="btn btn-primary" data-action="show-mode-select">Nueva creación</button>
        <button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
      </div>
    </section>
  `);
}

function renderCreationDetail(id) {
  const c = state.creations.find(x => x.id === id);
  if (!c) { renderGallery(); return; }
  const md  = MODE_DEFS[c.mode] || MODE_DEFS["character"];
  const eng = c.englishWord;
  const featureRows = Object.entries(c.features).map(([k,v])=>`
    <div class="sheet-row sheet-row--done">
      <span class="sheet-key">${escHtml(k)}:</span>
      <span class="sheet-val">${escHtml(v)}</span>
    </div>
  `).join("");
  setScreen(`
    <section class="screen" aria-labelledby="detail-title">
      <div class="card card-creation">
        <p class="eyebrow">${md.emoji} ${md.label}</p>
        <h1 id="detail-title">${escHtml(c.name)}</h1>
        <p class="gallery-meta">Nivel ${escHtml(c.level)} · ${escHtml(c.date)} · ⭐ ${c.starsEarned}</p>
        <div class="sheet-rows creation-sheet-rows">${featureRows}</div>
        <div class="english-box">
          <p class="eng-word"><strong>${escHtml(eng.word)}</strong> = ${escHtml(eng.translation)}</p>
          <p class="eng-sentence">"${escHtml(eng.sentence)}"</p>
          <p class="eng-hint">💬 ${escHtml(eng.hint)}</p>
        </div>
        <div class="drawing-prompt">
          <p class="drawing-label">🎨 Consigna de dibujo</p>
          <p class="drawing-text">${escHtml(c.drawingPrompt)}</p>
        </div>
        <div class="button-row">
          <button class="btn btn-secondary" data-action="show-gallery">Volver a galería</button>
          <button class="btn btn-danger btn-sm" data-action="delete-creation" data-id="${c.id}">Borrar esta creación</button>
        </div>
      </div>
    </section>
  `);
}

function deleteCreation(id) {
  if (!confirm("¿Borrar esta creación de la galería?")) return;
  state.creations = state.creations.filter(c => c.id !== id);
  saveState();
  renderGallery();
}

// ─── PROGRESO Y MEDALLAS ──────────────────────────────────────
function renderProgress() {
  const doneCount = state.completedDays.length;
  const pct       = Math.round(doneCount / 30 * 100);
  const badgesHtml = BADGE_DEFS.map(b => {
    const unlocked = state.badges.includes(b.id);
    return `<div class="badge-chip ${unlocked?"badge-chip--unlocked":"badge-chip--locked"}">
      <span aria-hidden="true">${unlocked ? b.emoji : "🔒"}</span>
      <span>${escHtml(b.title)}</span>
    </div>`;
  }).join("");

  const dayMap = DAILY_MISSIONS.map(d => {
    const done = state.completedDays.includes(d.day);
    const next = !done && !DAILY_MISSIONS.slice(0,d.day-1).some(prev=>!state.completedDays.includes(prev.day));
    return `<div class="day-node ${done?"day-node--done":next?"day-node--next":"day-node--locked"}" title="Día ${d.day}: ${d.title}">
      <span>${done?"✅":next?MODE_DEFS[d.mode]?.emoji||"⭐":"🔒"}</span>
      <span class="day-num">${d.day}</span>
    </div>`;
  }).join("");

  setScreen(`
    <section class="screen" aria-labelledby="progress-title">
      <h1 id="progress-title">Tu progreso</h1>
      <div class="stats-grid">
        <div class="card stat-card"><p class="sv">${state.stars}</p><p class="sl">Estrellas</p></div>
        <div class="card stat-card"><p class="sv">${state.completedMissions}</p><p class="sl">Misiones</p></div>
        <div class="card stat-card"><p class="sv">${state.currentStreak}</p><p class="sl">Racha</p></div>
        <div class="card stat-card"><p class="sv">${state.creations.length}</p><p class="sl">Creaciones</p></div>
      </div>

      <div class="card">
        <p class="card-section-title">Progreso de 30 días — ${doneCount}/30</p>
        <div class="progress-bar-wrapper" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <p class="pct-label">${pct}% del camino recorrido</p>
      </div>

      <div class="card">
        <p class="card-section-title">Mapa de misiones</p>
        <div class="day-map">${dayMap}</div>
      </div>

      <div class="card">
        <p class="card-section-title">Medallas</p>
        <div class="badge-grid">${badgesHtml}</div>
      </div>

      <div class="button-row">
        <button class="btn btn-primary" data-action="show-mode-select">Crear algo nuevo</button>
        <button class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
      </div>
      <div class="button-row">
        <button class="btn btn-danger" data-action="reset-progress">Reiniciar progreso</button>
      </div>
    </section>
  `);
}

// ─── AYUDA PARA ADULTOS ───────────────────────────────────────
function renderHelp() {
  setScreen(`
    <section class="screen" aria-labelledby="help-title">
      <h1 id="help-title">Información para adultos</h1>
      <div class="card">
        <h2>¿Qué es DibuMente Lab?</h2>
        <p>Es una app educativa para chicos de 10 a 15 años que combina matemática, creatividad e inglés a través de misiones de dibujo. No es una red social ni un juego en línea.</p>
        <h2>¿Qué datos guarda?</h2>
        <p>Solo guarda progreso local en el navegador (localStorage): estrellas, misiones completadas, medallas y fichas de creaciones textuales. No sube nada a ningún servidor.</p>
        <h2>¿Qué datos NO guarda?</h2>
        <p>No guarda ni pide: nombre completo, edad, email, ubicación, escuela, fotos ni dibujos.</p>
        <h2>¿Se pueden borrar los datos?</h2>
        <p>Sí. Desde "Ver progreso" → "Reiniciar progreso", o limpiando los datos del sitio desde el navegador.</p>
        <h2>¿Hay publicidad o compras?</h2>
        <p>No. La app no tiene publicidad, compras ni funciones sociales de ningún tipo.</p>
      </div>
      <div class="button-row"><button class="btn btn-ghost" data-action="go-home">Volver al inicio</button></div>
    </section>
  `);
}

/* ─────────────────────────────────────────────────────────────
   §11 MANEJO DE EVENTOS
   ───────────────────────────────────────────────────────────── */

function handleClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  switch (action) {
    case "go-home":           renderHome(); break;
    case "show-mode-select":  renderModeSelect(); break;
    case "show-level":        renderLevelScreen(); break;
    case "show-gallery":      renderGallery(); break;
    case "show-progress":     renderProgress(); break;
    case "show-help":         renderHelp(); break;
    case "choose-level":
      state.selectedLevel = btn.dataset.level;
      saveState();
      renderModeSelect();
      break;
    case "start-mission":
      startMission(btn.dataset.mode, null);
      break;
    case "start-daily": {
      const day = parseInt(btn.dataset.day);
      const dm  = DAILY_MISSIONS.find(d => d.day === day);
      if (dm) startMission(dm.mode, dm);
      else renderModeSelect();
      break;
    }
    case "check-answer":   checkAnswer(); break;
    case "next-step":      advanceStep(); break;
    case "abort-mission":
      if (confirm("¿Abandonar la misión actual? Tu progreso de esta misión se perderá.")) {
        mission = null; renderHome();
      }
      break;
    case "show-creation":  renderCreationDetail(btn.dataset.id); break;
    case "delete-creation": deleteCreation(btn.dataset.id); break;
    case "reset-progress": resetProgress(); break;
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
   §12 UTILIDADES
   ───────────────────────────────────────────────────────────── */

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function escHtml(s) {
  return String(s||"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ─────────────────────────────────────────────────────────────
   §13 INIT
   ───────────────────────────────────────────────────────────── */

function initApp() {
  state = loadState();
  // Escuchar en document para capturar botones del header y footer (fuera de #app-main)
  document.addEventListener("click", handleClick);
  app.addEventListener("keydown", handleKeydown);
  renderHome();
}

document.addEventListener("DOMContentLoaded", initApp);
