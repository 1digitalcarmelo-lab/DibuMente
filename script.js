/* ============================================================
   DibuMente 30 — script.js
   App educativa de 30 días: matemática + dibujo + inglés.
   Sin frameworks, sin backend. Todo el progreso vive en
   localStorage, en el dispositivo del chico/a que juega.
   ============================================================ */

/* ------------------------------------------------------------
   1) DATOS: los 30 retos
   Cada reto tiene un cálculo distinto por nivel (mathByLevel),
   una consigna de dibujo, una palabra en inglés con su
   traducción y una frase simple en inglés.
   ------------------------------------------------------------ */
const CHALLENGES = [
  { day: 1, title: "Monstruo matemático", theme: "criaturas", emoji: "👹",
    mathByLevel: { explorador: { question: "8 + 7", answer: 15 }, creador: { question: "24 ÷ 3", answer: 8 }, genio: { question: "12 x 3 - 6", answer: 30 } },
    drawingPrompt: "Dibujá un monstruo con 8 ojos, bien raro y divertido.",
    englishWord: "Eye", spanishTranslation: "ojo", englishSentence: "The monster has 8 eyes." },

  { day: 2, title: "Robot espacial", theme: "espacio", emoji: "🤖",
    mathByLevel: { explorador: { question: "9 + 8", answer: 17 }, creador: { question: "36 ÷ 4", answer: 9 }, genio: { question: "7 x 6 - 12", answer: 30 } },
    drawingPrompt: "Dibujá un robot espacial con antenas y botones brillantes.",
    englishWord: "Space", spanishTranslation: "espacio", englishSentence: "The robot flies in space." },

  { day: 3, title: "Dragón de fuego", theme: "fantasía", emoji: "🐉",
    mathByLevel: { explorador: { question: "14 - 6", answer: 8 }, creador: { question: "7 x 5", answer: 35 }, genio: { question: "9 x 4 + 8", answer: 44 } },
    drawingPrompt: "Dibujá un dragón escupiendo fuego de colores.",
    englishWord: "Fire", spanishTranslation: "fuego", englishSentence: "The dragon breathes fire." },

  { day: 4, title: "Ciudad futurista", theme: "futuro", emoji: "🌆",
    mathByLevel: { explorador: { question: "12 + 9", answer: 21 }, creador: { question: "45 ÷ 5", answer: 9 }, genio: { question: "6 x 7 - 10", answer: 32 } },
    drawingPrompt: "Dibujá una ciudad futurista con autos voladores.",
    englishWord: "City", spanishTranslation: "ciudad", englishSentence: "The city has flying cars." },

  { day: 5, title: "Animal inventado", theme: "criaturas", emoji: "🦄",
    mathByLevel: { explorador: { question: "16 - 7", answer: 9 }, creador: { question: "6 x 6", answer: 36 }, genio: { question: "8 x 5 - 15", answer: 25 } },
    drawingPrompt: "Inventá un animal nuevo y dibujalo con por lo menos 3 colores.",
    englishWord: "Tail", spanishTranslation: "cola", englishSentence: "My animal has a long tail." },

  { day: 6, title: "Superhéroe secreto", theme: "aventura", emoji: "🦸",
    mathByLevel: { explorador: { question: "13 + 8", answer: 21 }, creador: { question: "9 x 4", answer: 36 }, genio: { question: "48 ÷ 4 + 9", answer: 21 } },
    drawingPrompt: "Dibujá un superhéroe con un poder secreto y su traje.",
    englishWord: "Power", spanishTranslation: "poder", englishSentence: "The hero has a secret power." },

  { day: 7, title: "Mapa del tesoro", theme: "aventura", emoji: "🗺️",
    mathByLevel: { explorador: { question: "18 - 9", answer: 9 }, creador: { question: "8 x 3", answer: 24 }, genio: { question: "54 ÷ 6 + 7", answer: 16 } },
    drawingPrompt: "Dibujá un mapa del tesoro con una isla y una X marcada.",
    englishWord: "Treasure", spanishTranslation: "tesoro", englishSentence: "The map shows the treasure." },

  { day: 8, title: "Planeta desconocido", theme: "espacio", emoji: "🪐",
    mathByLevel: { explorador: { question: "11 + 9", answer: 20 }, creador: { question: "42 ÷ 6", answer: 7 }, genio: { question: "5 x 9 - 20", answer: 25 } },
    drawingPrompt: "Dibujá un planeta desconocido con anillos de color.",
    englishWord: "Planet", spanishTranslation: "planeta", englishSentence: "The planet has purple rings." },

  { day: 9, title: "Nave espacial", theme: "espacio", emoji: "🚀",
    mathByLevel: { explorador: { question: "15 - 8", answer: 7 }, creador: { question: "7 x 7", answer: 49 }, genio: { question: "6 x 8 - 18", answer: 30 } },
    drawingPrompt: "Dibujá una nave espacial con luces y ventanas redondas.",
    englishWord: "Ship", spanishTranslation: "nave", englishSentence: "The ship travels through space." },

  { day: 10, title: "Castillo imposible", theme: "fantasía", emoji: "🏰",
    mathByLevel: { explorador: { question: "17 + 6", answer: 23 }, creador: { question: "56 ÷ 8", answer: 7 }, genio: { question: "9 x 6 - 24", answer: 30 } },
    drawingPrompt: "Dibujá un castillo con formas imposibles, como escaleras que no terminan nunca.",
    englishWord: "Castle", spanishTranslation: "castillo", englishSentence: "The castle has no end." },

  { day: 11, title: "Criatura submarina", theme: "criaturas", emoji: "🐙",
    mathByLevel: { explorador: { question: "12 + 8", answer: 20 }, creador: { question: "8 x 6", answer: 48 }, genio: { question: "7 x 5 + 10", answer: 45 } },
    drawingPrompt: "Dibujá una criatura submarina con tentáculos brillantes.",
    englishWord: "Ocean", spanishTranslation: "océano", englishSentence: "The creature lives in the ocean." },

  { day: 12, title: "Bosque mágico", theme: "fantasía", emoji: "🌳",
    mathByLevel: { explorador: { question: "19 - 7", answer: 12 }, creador: { question: "63 ÷ 7", answer: 9 }, genio: { question: "8 x 7 - 26", answer: 30 } },
    drawingPrompt: "Dibujá un bosque mágico con árboles que brillan en la oscuridad.",
    englishWord: "Forest", spanishTranslation: "bosque", englishSentence: "The forest glows at night." },

  { day: 13, title: "Máquina del tiempo", theme: "futuro", emoji: "⏰",
    mathByLevel: { explorador: { question: "14 + 9", answer: 23 }, creador: { question: "9 x 5", answer: 45 }, genio: { question: "6 x 9 - 22", answer: 32 } },
    drawingPrompt: "Dibujá una máquina del tiempo con relojes y engranajes.",
    englishWord: "Time", spanishTranslation: "tiempo", englishSentence: "The machine travels through time." },

  { day: 14, title: "Villano divertido", theme: "aventura", emoji: "🦹",
    mathByLevel: { explorador: { question: "16 - 9", answer: 7 }, creador: { question: "72 ÷ 8", answer: 9 }, genio: { question: "8 x 8 - 34", answer: 30 } },
    drawingPrompt: "Dibujá un villano gracioso con un plan ridículo.",
    englishWord: "Villain", spanishTranslation: "villano", englishSentence: "The villain has a silly plan." },

  { day: 15, title: "Mascota alienígena", theme: "espacio", emoji: "👽",
    mathByLevel: { explorador: { question: "13 + 9", answer: 22 }, creador: { question: "7 x 8", answer: 56 }, genio: { question: "9 x 7 - 38", answer: 25 } },
    drawingPrompt: "Dibujá una mascota alienígena con una forma bien extraña.",
    englishWord: "Alien", spanishTranslation: "alienígena", englishSentence: "The alien pet is very friendly." },

  { day: 16, title: "Isla flotante", theme: "fantasía", emoji: "🏝️",
    mathByLevel: { explorador: { question: "17 - 8", answer: 9 }, creador: { question: "81 ÷ 9", answer: 9 }, genio: { question: "7 x 9 - 33", answer: 30 } },
    drawingPrompt: "Dibujá una isla flotante en el cielo, con cascadas que caen hacia las nubes.",
    englishWord: "Island", spanishTranslation: "isla", englishSentence: "The island floats in the sky." },

  { day: 17, title: "Portal dimensional", theme: "misterio", emoji: "🌀",
    mathByLevel: { explorador: { question: "15 + 9", answer: 24 }, creador: { question: "9 x 6", answer: 54 }, genio: { question: "8 x 6 - 13", answer: 35 } },
    drawingPrompt: "Dibujá un portal dimensional con colores que giran en espiral.",
    englishWord: "Portal", spanishTranslation: "portal", englishSentence: "The portal leads to another world." },

  { day: 18, title: "Laboratorio secreto", theme: "misterio", emoji: "🧪",
    mathByLevel: { explorador: { question: "18 - 9", answer: 9 }, creador: { question: "64 ÷ 8", answer: 8 }, genio: { question: "9 x 8 - 42", answer: 30 } },
    drawingPrompt: "Dibujá un laboratorio secreto con frascos burbujeantes de colores.",
    englishWord: "Lab", spanishTranslation: "laboratorio", englishSentence: "The lab is full of colors." },

  { day: 19, title: "Zapatillas futuristas", theme: "futuro", emoji: "👟",
    mathByLevel: { explorador: { question: "19 + 6", answer: 25 }, creador: { question: "8 x 9", answer: 72 }, genio: { question: "7 x 8 - 26", answer: 30 } },
    drawingPrompt: "Dibujá unas zapatillas futuristas con luces y propulsores.",
    englishWord: "Shoes", spanishTranslation: "zapatillas", englishSentence: "The shoes can fly." },

  { day: 20, title: "Torre de cristal", theme: "fantasía", emoji: "💎",
    mathByLevel: { explorador: { question: "14 + 8", answer: 22 }, creador: { question: "96 ÷ 8", answer: 12 }, genio: { question: "9 x 9 - 51", answer: 30 } },
    drawingPrompt: "Dibujá una torre de cristal que refleja todos los colores del arcoíris.",
    englishWord: "Tower", spanishTranslation: "torre", englishSentence: "The tower shines like crystal." },

  { day: 21, title: "Tren volador", theme: "futuro", emoji: "🚂",
    mathByLevel: { explorador: { question: "16 + 9", answer: 25 }, creador: { question: "9 x 7", answer: 63 }, genio: { question: "8 x 9 - 42", answer: 30 } },
    drawingPrompt: "Dibujá un tren volador con vagones de formas distintas.",
    englishWord: "Train", spanishTranslation: "tren", englishSentence: "The train flies over the city." },

  { day: 22, title: "Invento absurdo", theme: "misterio", emoji: "⚙️",
    mathByLevel: { explorador: { question: "13 + 7", answer: 20 }, creador: { question: "84 ÷ 7", answer: 12 }, genio: { question: "7 x 9 - 28", answer: 35 } },
    drawingPrompt: "Dibujá un invento absurdo que resuelve un problema tonto.",
    englishWord: "Invention", spanishTranslation: "invento", englishSentence: "The invention is very strange." },

  { day: 23, title: "Cueva brillante", theme: "aventura", emoji: "💠",
    mathByLevel: { explorador: { question: "17 + 9", answer: 26 }, creador: { question: "9 x 9", answer: 81 }, genio: { question: "8 x 7 - 21", answer: 35 } },
    drawingPrompt: "Dibujá una cueva brillante llena de cristales de colores.",
    englishWord: "Cave", spanishTranslation: "cueva", englishSentence: "The cave shines with crystals." },

  { day: 24, title: "Explorador del hielo", theme: "aventura", emoji: "❄️",
    mathByLevel: { explorador: { question: "15 + 7", answer: 22 }, creador: { question: "72 ÷ 9", answer: 8 }, genio: { question: "9 x 6 - 19", answer: 35 } },
    drawingPrompt: "Dibujá un explorador con traje de hielo y herramientas raras.",
    englishWord: "Ice", spanishTranslation: "hielo", englishSentence: "The explorer walks on ice." },

  { day: 25, title: "Ciudad bajo el mar", theme: "criaturas", emoji: "🌊",
    mathByLevel: { explorador: { question: "18 + 9", answer: 27 }, creador: { question: "9 x 8", answer: 72 }, genio: { question: "8 x 8 - 27", answer: 37 } },
    drawingPrompt: "Dibujá una ciudad bajo el mar con burbujas y peces de colores.",
    englishWord: "Sea", spanishTranslation: "mar", englishSentence: "The city is under the sea." },

  { day: 26, title: "Biblioteca infinita", theme: "misterio", emoji: "📚",
    mathByLevel: { explorador: { question: "19 + 8", answer: 27 }, creador: { question: "90 ÷ 9", answer: 10 }, genio: { question: "9 x 7 - 33", answer: 30 } },
    drawingPrompt: "Dibujá una biblioteca infinita con libros que flotan en el aire.",
    englishWord: "Book", spanishTranslation: "libro", englishSentence: "The library has no end." },

  { day: 27, title: "Comida mutante", theme: "criaturas", emoji: "🍔",
    mathByLevel: { explorador: { question: "14 + 13", answer: 27 }, creador: { question: "88 ÷ 8", answer: 11 }, genio: { question: "9 x 8 - 39", answer: 33 } },
    drawingPrompt: "Dibujá una comida mutante con ojos y patas.",
    englishWord: "Food", spanishTranslation: "comida", englishSentence: "The food can walk." },

  { day: 28, title: "Universo miniatura", theme: "espacio", emoji: "🌌",
    mathByLevel: { explorador: { question: "16 + 12", answer: 28 }, creador: { question: "99 ÷ 9", answer: 11 }, genio: { question: "9 x 9 - 48", answer: 33 } },
    drawingPrompt: "Dibujá un universo miniatura guardado dentro de un frasco de vidrio.",
    englishWord: "Universe", spanishTranslation: "universo", englishSentence: "The universe fits in a jar." },

  { day: 29, title: "Guardián del cielo", theme: "fantasía", emoji: "🕊️",
    mathByLevel: { explorador: { question: "17 + 12", answer: 29 }, creador: { question: "9 x 6", answer: 54 }, genio: { question: "8 x 9 - 35", answer: 37 } },
    drawingPrompt: "Dibujá un guardián del cielo con alas enormes.",
    englishWord: "Sky", spanishTranslation: "cielo", englishSentence: "The guardian protects the sky." },

  { day: 30, title: "Obra final del genio creativo", theme: "aventura", emoji: "🏆",
    mathByLevel: { explorador: { question: "18 + 13", answer: 31 }, creador: { question: "108 ÷ 9", answer: 12 }, genio: { question: "9 x 9 - 45", answer: 36 } },
    drawingPrompt: "Dibujá tu obra final: una escena que combine lo que más te gustó crear este mes.",
    englishWord: "Creative", spanishTranslation: "creativo", englishSentence: "You are a creative genius." },
];

/* ------------------------------------------------------------
   2) CONFIGURACIÓN: niveles y medallas
   Separado en objetos de configuración para que sea fácil
   sumar un nivel nuevo o una medalla nueva más adelante.
   ------------------------------------------------------------ */
const LEVELS = {
  explorador: { label: "Explorador", emoji: "🧭", description: "Sumas y restas con números chicos. Ideal para entrar en calor." },
  creador:    { label: "Creador",    emoji: "🛠️", description: "Sumas, restas, multiplicaciones y divisiones simples." },
  genio:      { label: "Genio",      emoji: "🧠", description: "Cuentas combinadas y números más grandes. Para mentes despiertas." },
};

const BADGE_DEFS = [
  { threshold: 1,  id: "day1",  title: "Primer trazo",       emoji: "✏️" },
  { threshold: 5,  id: "day5",  title: "Mente en marcha",    emoji: "🧠" },
  { threshold: 10, id: "day10", title: "Creador constante",  emoji: "🎨" },
  { threshold: 15, id: "day15", title: "Mitad del camino",   emoji: "🌟" },
  { threshold: 20, id: "day20", title: "Artista lógico",     emoji: "🔭" },
  { threshold: 25, id: "day25", title: "Casi leyenda",       emoji: "🏅" },
  { threshold: 30, id: "day30", title: "Genio creativo",     emoji: "👑" },
];

/* Bancos de mensajes de feedback. Tono: amable, motivador, sin infantilizar. */
const MESSAGES = {
  correct: [
    "¡Correcto! Desbloqueaste tu reto creativo.",
    "¡Exacto! Tu mente está entrenando fuerte.",
    "¡Genial! Ahí tenés tu consigna de dibujo.",
  ],
  wrongEarly: [
    "Casi. Revisá el cálculo una vez más.",
    "Le erraste por poco. Probá de nuevo.",
    "Buen intento. Fijate bien la operación.",
  ],
  wrongMid: [
    "Buen intento. Probá separar la cuenta en pasos.",
    "Pista: fijate si tenés que sumar, restar, multiplicar o dividir.",
    "Tomate un segundo y volvé a leer el cálculo con calma.",
  ],
  completion: [
    "Hoy sumaste una estrella creativa.",
    "Tu mente y tu imaginación están entrenando juntas.",
    "No hace falta que el dibujo sea perfecto. Lo importante es crear.",
  ],
};

const STORAGE_KEY = "dibumente30_progress";
const TOTAL_DAYS = CHALLENGES.length;

/* ------------------------------------------------------------
   3) ESTADO
   `state` es lo único que se persiste en localStorage.
   Las variables sueltas de abajo son estado transitorio de la
   sesión actual (no se guardan): cuántos intentos llevás hoy, etc.
   ------------------------------------------------------------ */
let state = null;
let currentAttempts = 0;
let mathSolved = false;
let solvedFirstTry = false;

function getDefaultState() {
  return {
    level: null,
    completed: {},        // { "1": { firstTry: true }, "2": { firstTry: false }, ... }
    stars: 0,
    streak: 0,
    lastActivityDate: null, // "YYYY-MM-DD"
    badges: [],
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    // Defensive merge por si en el futuro se suman propiedades nuevas.
    return Object.assign(getDefaultState(), parsed);
  } catch (err) {
    console.warn("No se pudo leer el progreso guardado, empiezo de cero.", err);
    return getDefaultState();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("No se pudo guardar el progreso.", err);
  }
}

function resetProgress() {
  const confirmed = confirm("¿Seguro querés reiniciar tu progreso? Esta acción no se puede deshacer.");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state = getDefaultState();
  currentAttempts = 0;
  mathSolved = false;
  solvedFirstTry = false;
  renderHome();
}

/* ------------------------------------------------------------
   4) HELPERS de progreso
   ------------------------------------------------------------ */
function getCompletedCount() {
  return Object.keys(state.completed).length;
}

function getCurrentDayNumber() {
  // El próximo día sin completar. Si ya están los 30, devuelve TOTAL_DAYS + 1.
  return getCompletedCount() + 1;
}

function getCurrentChallenge() {
  const day = getCurrentDayNumber();
  if (day > TOTAL_DAYS) return null;
  return CHALLENGES[day - 1];
}

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function updateStreak() {
  const today = todayStr();
  if (!state.lastActivityDate) {
    state.streak = 1;
  } else if (state.lastActivityDate === today) {
    // Ya sumamos actividad hoy, no se duplica.
  } else {
    const prev = new Date(state.lastActivityDate + "T00:00:00");
    const now = new Date(today + "T00:00:00");
    const diffDays = Math.round((now - prev) / 86400000);
    state.streak = diffDays === 1 ? state.streak + 1 : 1;
  }
  state.lastActivityDate = today;
}

function unlockBadges() {
  const completedCount = getCompletedCount();
  const newlyUnlocked = [];
  BADGE_DEFS.forEach((b) => {
    if (completedCount >= b.threshold && !state.badges.includes(b.id)) {
      state.badges.push(b.id);
      newlyUnlocked.push(b);
    }
  });
  return newlyUnlocked;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/* ------------------------------------------------------------
   5) REFERENCIAS AL DOM Y NAVEGACIÓN
   ------------------------------------------------------------ */
const appMain = document.getElementById("app-main");
const levelChip = document.getElementById("level-chip");

function updateLevelChip() {
  if (!levelChip) return;
  if (state.level && LEVELS[state.level]) {
    levelChip.textContent = `${LEVELS[state.level].emoji} ${LEVELS[state.level].label}`;
    levelChip.hidden = false;
  } else {
    levelChip.hidden = true;
  }
}

function setScreen(html) {
  appMain.innerHTML = html;
  appMain.focus({ preventScroll: false });
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateLevelChip();
}

/* ------------------------------------------------------------
   6) PANTALLA: Bienvenida
   ------------------------------------------------------------ */
function renderHome() {
  const hasProgress = getCompletedCount() > 0;
  setScreen(`
    <section class="screen screen-home" aria-labelledby="home-title">
      <div class="card card-hero">
        <p class="eyebrow">🔬 Laboratorio creativo</p>
        <h1 id="home-title">DibuMente 30</h1>
        <p class="subtitle">30 días para entrenar tu mente, aprender inglés y crear dibujos increíbles.</p>
        <p class="lead">Resolvé cálculos, desbloqueá retos de dibujo y sumá estrellas creativas.</p>
        <div class="button-row">
          <button type="button" class="btn btn-primary" data-action="start-challenge">
            ${hasProgress ? "Seguir mi reto" : "Empezar reto"}
          </button>
          <button type="button" class="btn btn-secondary" data-action="show-progress">Ver progreso</button>
        </div>
      </div>

      <div class="card card-privacy">
        <p>🔒 Esta app no pide datos personales. Tu progreso se guarda solo en este dispositivo.</p>
      </div>
    </section>
  `);
}

/* ------------------------------------------------------------
   7) PANTALLA: Selección de nivel
   ------------------------------------------------------------ */
function renderLevelSelection() {
  const cards = Object.entries(LEVELS).map(([id, level]) => {
    const isActive = state.level === id;
    return `
      <div class="card level-card ${isActive ? "level-card--active" : ""}">
        <div class="level-card-icon" aria-hidden="true">${level.emoji}</div>
        <h3>${level.label}</h3>
        <p>${level.description}</p>
        <button type="button" class="btn ${isActive ? "btn-secondary" : "btn-primary"}" data-action="choose-level" data-level="${id}">
          ${isActive ? "Nivel actual ✓" : "Elegir este nivel"}
        </button>
      </div>
    `;
  }).join("");

  setScreen(`
    <section class="screen screen-level" aria-labelledby="level-title">
      <h1 id="level-title">Elegí tu nivel</h1>
      <p class="screen-intro">Podés cambiarlo cuando quieras, no afecta los días que ya completaste.</p>
      <div class="level-grid">${cards}</div>
      <div class="button-row">
        <button type="button" class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
      </div>
    </section>
  `);
}

/* ------------------------------------------------------------
   8) PANTALLA: Reto diario
   ------------------------------------------------------------ */
function renderChallenge() {
  if (!state.level) {
    renderLevelSelection();
    return;
  }
  const challenge = getCurrentChallenge();
  if (!challenge) {
    renderFinal();
    return;
  }
  currentAttempts = 0;
  mathSolved = false;
  solvedFirstTry = false;
  paintChallengeQuestion(challenge);
}

function paintChallengeQuestion(challenge) {
  const math = challenge.mathByLevel[state.level];
  setScreen(`
    <section class="screen screen-challenge" aria-labelledby="challenge-title">
      <p class="day-readout">Día ${String(challenge.day).padStart(2, "0")} / ${TOTAL_DAYS}</p>
      <div class="card card-challenge">
        <p class="theme-chip">${challenge.emoji} ${escapeHtml(challenge.theme)}</p>
        <h1 id="challenge-title">${escapeHtml(challenge.title)}</h1>

        <div class="math-box">
          <p class="math-question">${escapeHtml(math.question)} = ?</p>
          <label for="answer-input">Tu respuesta</label>
          <div class="answer-row">
            <input type="number" inputmode="numeric" id="answer-input" name="answer-input" autocomplete="off" placeholder="Escribí un número">
            <button type="button" class="btn btn-primary" data-action="check-answer">Comprobar respuesta</button>
          </div>
          <p class="feedback" id="feedback-area" aria-live="polite"></p>
        </div>

        <div class="creative-box hidden" id="creative-box">
          <h2>🎨 Tu reto creativo</h2>
          <p class="drawing-prompt">${escapeHtml(challenge.drawingPrompt)}</p>
          <div class="english-box">
            <p class="english-word">${escapeHtml(challenge.englishWord)} <span class="translation">= ${escapeHtml(challenge.spanishTranslation)}</span></p>
            <p class="english-sentence">“${escapeHtml(challenge.englishSentence)}”</p>
          </div>
          <button type="button" class="btn btn-primary" data-action="complete-challenge">Completé mi dibujo</button>
        </div>
      </div>

      <div class="button-row button-row--secondary">
        <button type="button" class="btn btn-ghost" data-action="change-level">Cambiar nivel</button>
        <button type="button" class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
      </div>
    </section>
  `);
  const input = document.getElementById("answer-input");
  if (input) input.focus();
}

/* ------------------------------------------------------------
   9) LÓGICA: comprobar respuesta
   ------------------------------------------------------------ */
function checkAnswer() {
  if (mathSolved) return;
  const challenge = getCurrentChallenge();
  if (!challenge) return;
  const input = document.getElementById("answer-input");
  const feedbackArea = document.getElementById("feedback-area");
  const raw = input.value.trim();

  if (raw === "") {
    feedbackArea.textContent = "Escribí un número para comprobar tu respuesta.";
    feedbackArea.className = "feedback feedback--info";
    return;
  }

  const userAnswer = Number(raw);
  const correctAnswer = challenge.mathByLevel[state.level].answer;
  currentAttempts += 1;

  if (userAnswer === correctAnswer) {
    mathSolved = true;
    solvedFirstTry = currentAttempts === 1;
    feedbackArea.textContent = pickRandom(MESSAGES.correct);
    feedbackArea.className = "feedback feedback--success";
    revealCreativeBox();
    return;
  }

  if (currentAttempts >= 3) {
    // Tercer intento fallido: ayudamos sin frustrar, mostrando la respuesta con calidez.
    mathSolved = true;
    solvedFirstTry = false;
    feedbackArea.textContent = `¡Tranqui! Esta te resolvemos juntos: la respuesta era ${correctAnswer}. Lo importante es que sigas pensando como un genio. ¡Vamos con el dibujo!`;
    feedbackArea.className = "feedback feedback--info";
    revealCreativeBox();
    return;
  }

  feedbackArea.textContent = currentAttempts === 1 ? pickRandom(MESSAGES.wrongEarly) : pickRandom(MESSAGES.wrongMid);
  feedbackArea.className = "feedback feedback--hint";
  input.focus();
  input.select();
}

function revealCreativeBox() {
  const box = document.getElementById("creative-box");
  const input = document.getElementById("answer-input");
  const checkBtn = document.querySelector('[data-action="check-answer"]');
  if (box) box.classList.remove("hidden");
  if (input) input.disabled = true;
  if (checkBtn) checkBtn.disabled = true;
  const creative = document.getElementById("creative-box");
  if (creative && typeof creative.scrollIntoView === "function") {
    creative.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/* ------------------------------------------------------------
   10) LÓGICA: completar el reto del día
   ------------------------------------------------------------ */
function completeChallenge() {
  if (!mathSolved) return;
  const day = getCurrentDayNumber();
  if (state.completed[String(day)]) return; // guarda defensiva

  state.completed[String(day)] = { firstTry: solvedFirstTry };
  const starsEarned = 1 + (solvedFirstTry ? 1 : 0);
  state.stars += starsEarned;
  updateStreak();
  const newBadges = unlockBadges();
  saveProgress();

  const isLastDay = getCurrentDayNumber() > TOTAL_DAYS;
  if (isLastDay) {
    renderFinal();
  } else {
    paintChallengeSuccess(starsEarned, newBadges);
  }
}

function paintChallengeSuccess(starsEarned, newBadges) {
  const badgeHtml = newBadges.length
    ? `<p class="badge-unlocked">${newBadges.map((b) => `${b.emoji} Medalla desbloqueada: <strong>${escapeHtml(b.title)}</strong>`).join("<br>")}</p>`
    : "";
  setScreen(`
    <section class="screen screen-success" aria-labelledby="success-title">
      <div class="card card-success">
        <p class="success-emoji" aria-hidden="true">🌟</p>
        <h1 id="success-title">¡Reto del día completado!</h1>
        <p>${pickRandom(MESSAGES.completion)}</p>
        <p class="stars-earned">+${starsEarned} estrella${starsEarned > 1 ? "s" : ""} creativa${starsEarned > 1 ? "s" : ""}</p>
        ${badgeHtml}
        <p class="totals">⭐ ${state.stars} estrellas en total · 🔥 racha de ${state.streak}</p>
        <div class="button-row">
          <button type="button" class="btn btn-primary" data-action="start-challenge">Siguiente reto</button>
          <button type="button" class="btn btn-secondary" data-action="show-progress">Ver progreso</button>
        </div>
        <div class="button-row">
          <button type="button" class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
        </div>
      </div>
    </section>
  `);
}

/* ------------------------------------------------------------
   11) PANTALLA: Progreso
   ------------------------------------------------------------ */
function renderProgress() {
  const completedCount = getCompletedCount();
  const percent = Math.round((completedCount / TOTAL_DAYS) * 100);
  const currentDay = getCurrentDayNumber();

  const mapNodes = CHALLENGES.map((c) => {
    const isDone = !!state.completed[String(c.day)];
    const isCurrent = !isDone && c.day === currentDay;
    let statusClass = "node--locked";
    let statusLabel = "Pendiente";
    if (isDone) { statusClass = "node--done"; statusLabel = "Completado"; }
    else if (isCurrent) { statusClass = "node--current"; statusLabel = "Reto de hoy"; }
    return `<div class="map-node ${statusClass}" title="Día ${c.day} — ${escapeHtml(c.title)} (${statusLabel})">
      <span class="map-node-emoji" aria-hidden="true">${isDone ? "✅" : isCurrent ? c.emoji : "🔒"}</span>
      <span class="map-node-num">${c.day}</span>
    </div>`;
  }).join("");

  const badgesHtml = BADGE_DEFS.map((b) => {
    const unlocked = state.badges.includes(b.id);
    return `<div class="badge-chip ${unlocked ? "badge-chip--unlocked" : "badge-chip--locked"}">
      <span aria-hidden="true">${unlocked ? b.emoji : "🔒"}</span>
      <span class="badge-chip-title">${escapeHtml(b.title)}</span>
    </div>`;
  }).join("");

  setScreen(`
    <section class="screen screen-progress" aria-labelledby="progress-title">
      <h1 id="progress-title">Tu progreso</h1>

      <div class="stats-grid">
        <div class="card stat-card">
          <p class="stat-value">${completedCount}/${TOTAL_DAYS}</p>
          <p class="stat-label">Días completados</p>
        </div>
        <div class="card stat-card">
          <p class="stat-value">${state.stars}</p>
          <p class="stat-label">Estrellas</p>
        </div>
        <div class="card stat-card">
          <p class="stat-value">${state.streak}</p>
          <p class="stat-label">Racha</p>
        </div>
        <div class="card stat-card">
          <p class="stat-value">${state.level ? LEVELS[state.level].emoji : "—"}</p>
          <p class="stat-label">${state.level ? LEVELS[state.level].label : "Sin nivel"}</p>
        </div>
      </div>

      <div class="card">
        <div class="progress-bar" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar-fill" style="width:${percent}%"></div>
        </div>
        <p class="progress-percent">${percent}% del camino recorrido</p>
      </div>

      <div class="card">
        <h2>Mapa de misiones</h2>
        <div class="mission-map">${mapNodes}</div>
      </div>

      <div class="card">
        <h2>Medallas</h2>
        <div class="badge-grid">${badgesHtml}</div>
      </div>

      <div class="button-row">
        <button type="button" class="btn btn-primary" data-action="start-challenge">${completedCount >= TOTAL_DAYS ? "Ver cierre del reto" : "Seguir mi reto"}</button>
        <button type="button" class="btn btn-secondary" data-action="change-level">Cambiar nivel</button>
      </div>
      <div class="button-row">
        <button type="button" class="btn btn-ghost" data-action="go-home">Volver al inicio</button>
        <button type="button" class="btn btn-danger" data-action="reset-progress">Reiniciar progreso</button>
      </div>
    </section>
  `);
}

/* ------------------------------------------------------------
   12) PANTALLA: Final (30/30 completado)
   ------------------------------------------------------------ */
function renderFinal() {
  const wordsLearned = CHALLENGES.map((c) => c.englishWord);
  const badgesHtml = BADGE_DEFS.filter((b) => state.badges.includes(b.id))
    .map((b) => `<span class="badge-chip badge-chip--unlocked"><span aria-hidden="true">${b.emoji}</span><span class="badge-chip-title">${escapeHtml(b.title)}</span></span>`)
    .join("");

  setScreen(`
    <section class="screen screen-final" aria-labelledby="final-title">
      <div class="card card-final">
        <p class="final-emoji" aria-hidden="true">🏆</p>
        <h1 id="final-title">¡Reto completado!</h1>
        <p class="final-message">Entrenaste tu mente, aprendiste nuevas palabras y creaste 30 dibujos únicos.</p>

        <div class="stats-grid">
          <div class="stat-card stat-card--inline">
            <p class="stat-value">${state.stars}</p>
            <p class="stat-label">Estrellas totales</p>
          </div>
          <div class="stat-card stat-card--inline">
            <p class="stat-value">${TOTAL_DAYS}</p>
            <p class="stat-label">Palabras aprendidas</p>
          </div>
          <div class="stat-card stat-card--inline">
            <p class="stat-value">${TOTAL_DAYS}</p>
            <p class="stat-label">Cálculos resueltos</p>
          </div>
        </div>

        <details class="words-details">
          <summary>Ver las 30 palabras en inglés que aprendiste</summary>
          <p class="words-list">${wordsLearned.map(escapeHtml).join(" · ")}</p>
        </details>

        <h2>Medallas conseguidas</h2>
        <div class="badge-grid">${badgesHtml || "<p>Todavía no hay medallas guardadas.</p>"}</div>

        <div class="button-row">
          <button type="button" class="btn btn-secondary" data-action="go-home">Volver al inicio</button>
          <button type="button" class="btn btn-danger" data-action="reset-progress">Reiniciar progreso</button>
        </div>
      </div>
    </section>
  `);
}

/* ------------------------------------------------------------
   13) NAVEGACIÓN ENTRE NIVELES
   ------------------------------------------------------------ */
function chooseLevel(levelId) {
  if (!LEVELS[levelId]) return;
  state.level = levelId;
  saveProgress();
  renderChallenge();
}

/* ------------------------------------------------------------
   14) EVENTOS (delegación en #app-main, sin volver a atar
   listeners cada vez que se re-renderiza una pantalla)
   ------------------------------------------------------------ */
function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case "start-challenge":
      renderChallenge();
      break;
    case "show-progress":
      renderProgress();
      break;
    case "choose-level":
      chooseLevel(target.dataset.level);
      break;
    case "change-level":
      renderLevelSelection();
      break;
    case "go-home":
      renderHome();
      break;
    case "check-answer":
      checkAnswer();
      break;
    case "complete-challenge":
      completeChallenge();
      break;
    case "reset-progress":
      resetProgress();
      break;
    default:
      break;
  }
}

function handleKeydown(event) {
  if (event.key !== "Enter") return;
  if (event.target && event.target.id === "answer-input") {
    event.preventDefault();
    checkAnswer();
  }
}

/* ------------------------------------------------------------
   15) INICIO DE LA APP
   ------------------------------------------------------------ */
function initApp() {
  state = loadProgress();
  appMain.addEventListener("click", handleClick);
  appMain.addEventListener("keydown", handleKeydown);
  renderHome();
}

document.addEventListener("DOMContentLoaded", initApp);

/* ------------------------------------------------------------
   16) GANCHOS PARA EL FUTURO (no usados en esta versión 1.0)
   La idea es que sumar funciones más adelante no implique
   reescribir lo de arriba:
   - Más idiomas: agregar un campo `englishWord` -> `wordsByLanguage`
     en cada reto y un selector de idioma guardado en `state.language`.
   - Más retos: extender el array CHALLENGES (day 31, 32, ...) y
     actualizar TOTAL_DAYS automáticamente (ya se calcula solo).
   - Modo oscuro: un toggle que agregue/quite una clase en <body>
     y guarde la preferencia en `state.theme`.
   - Exportar progreso: una función que arme un Blob con
     JSON.stringify(state) y dispare una descarga.
   - Versión imprimible: una hoja de estilos @media print aparte.
   - Más niveles: sumar una clave nueva al objeto LEVELS y su
     mathByLevel correspondiente en cada reto.
   ------------------------------------------------------------ */
