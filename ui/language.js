export const LANG = {
  hu: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Új játék",
    steps: "Lépések",
    time: "Idő",
    sizePlaceholder: "Méret (max 99)",
    colorLabel: "Szín kiválasztása:",
    solved: "Hurrá, meghosszabbítottad a Föld életét!",
    invalidSize: "Adj meg egy 2-nél nagyobb méretet!",
    tooBig: "Ki akarod nyírni a géped?",
    footer: "Készítette Kovács Kevin — "
  },

  en: {
    title: "Lights Out – Kovács Kevin",
    newGame: "New Game",
    steps: "Steps",
    time: "Time",
    sizePlaceholder: "Size (max 99)",
    colorLabel: "Choose color:",
    solved: "Hooray, you have extended the life of the Earth!",
    invalidSize: "Please enter a size greater than 2!",
    tooBig: "Do you want to destroy your computer?",
    footer: "Made by Kovács Kevin — "
  },

  de: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Neues Spiel",
    steps: "Schritte",
    time: "Zeit",
    sizePlaceholder: "Größe (max 99)",
    colorLabel: "Farbe auswählen:",
    solved: "Hurra, du hast das Leben der Erde verlängert!",
    invalidSize: "Bitte gib eine Zahl größer als 2 ein!",
    tooBig: "Willst du deinen Computer zerstören?",
    footer: "Erstellt von Kovács Kevin — "
  },

  fr: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nouvelle partie",
    steps: "Étapes",
    time: "Temps",
    sizePlaceholder: "Taille (max 99)",
    colorLabel: "Choisir une couleur :",
    solved: "Hourra, tu as prolongé la vie de la Terre !",
    invalidSize: "Veuillez entrer une valeur supérieure à 2 !",
    tooBig: "Voulez-vous détruire votre ordinateur ?",
    footer: "Créé par Kovács Kevin — "
  },

  es: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nuevo juego",
    steps: "Pasos",
    time: "Tiempo",
    sizePlaceholder: "Tamaño (máx 99)",
    colorLabel: "Elegir color:",
    solved: "¡Hurra, has prolongado la vida de la Tierra!",
    invalidSize: "¡Introduce un número mayor que 2!",
    tooBig: "¿Quieres destruir tu ordenador?",
    footer: "Creado por Kovács Kevin — "
  },

  it: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nuova partita",
    steps: "Passi",
    time: "Tempo",
    sizePlaceholder: "Dimensione (max 99)",
    colorLabel: "Scegli colore:",
    solved: "Evviva, hai prolungato la vita della Terra!",
    invalidSize: "Inserisci un numero maggiore di 2!",
    tooBig: "Vuoi distruggere il tuo computer?",
    footer: "Creato da Kovács Kevin — "
  },

  pl: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nowa gra",
    steps: "Kroki",
    time: "Czas",
    sizePlaceholder: "Rozmiar (max 99)",
    colorLabel: "Wybierz kolor:",
    solved: "Hurra, przedłużyłeś życie Ziemi!",
    invalidSize: "Podaj liczbę większą niż 2!",
    tooBig: "Chcesz zniszczyć swój komputer?",
    footer: "Stworzone przez Kovács Kevin — "
  },

  ro: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Joc nou",
    steps: "Pași",
    time: "Timp",
    sizePlaceholder: "Dimensiune (max 99)",
    colorLabel: "Alege culoarea:",
    solved: "Ura, ai prelungit viața Pământului!",
    invalidSize: "Introduceți un număr mai mare decât 2!",
    tooBig: "Vrei să-ți distrugi calculatorul?",
    footer: "Creat de Kovács Kevin — "
  },

  sk: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nová hra",
    steps: "Kroky",
    time: "Čas",
    sizePlaceholder: "Veľkosť (max 99)",
    colorLabel: "Vyberte farbu:",
    solved: "Hurá, predĺžil si život Zeme!",
    invalidSize: "Zadajte číslo väčšie ako 2!",
    tooBig: "Chceš zničiť svoj počítač?",
    footer: "Vytvoril Kovács Kevin — "
  },

  cs: {
    title: "Lights Out – Kovács Kevin",
    newGame: "Nová hra",
    steps: "Kroky",
    time: "Čas",
    sizePlaceholder: "Velikost (max 99)",
    colorLabel: "Vyberte barvu:",
    solved: "Hurá, prodloužil jsi život Země!",
    invalidSize: "Zadejte číslo větší než 2!",
    tooBig: "Chcete zničit svůj počítač?",
    footer: "Vytvořil Kovács Kevin — "
  },

  zhCN: {
    title: "Lights Out – Kovács Kevin",
    newGame: "新游戏",
    steps: "步数",
    time: "时间",
    sizePlaceholder: "大小 (最大 99)",
    colorLabel: "选择颜色：",
    solved: "好耶，你延长了地球的寿命！",
    invalidSize: "请输入大于 2 的数字！",
    tooBig: "你想让电脑爆炸吗？",
    footer: "由 Kovács Kevin 制作 — "
  },

  zhTW: {
    title: "Lights Out – Kovács Kevin",
    newGame: "新遊戲",
    steps: "步數",
    time: "時間",
    sizePlaceholder: "大小 (最多 99)",
    colorLabel: "選擇顏色：",
    solved: "好耶，你延長了地球的壽命！",
    invalidSize: "請輸入大於 2 的數字！",
    tooBig: "你想讓電腦爆炸嗎？",
    footer: "由 Kovács Kevin 製作 — "
  }
};

export function detectLanguage() {
  const forced = localStorage.getItem("forceLang");
  if (forced && LANG[forced]) return forced;

  const userLang = navigator.language.toLowerCase();

  if (userLang.startsWith("hu")) return "hu";
  if (userLang.startsWith("de")) return "de";
  if (userLang.startsWith("fr")) return "fr";
  if (userLang.startsWith("es")) return "es";
  if (userLang.startsWith("it")) return "it";
  if (userLang.startsWith("pl")) return "pl";
  if (userLang.startsWith("ro")) return "ro";
  if (userLang.startsWith("sk")) return "sk";
  if (userLang.startsWith("cs")) return "cs";
  if (userLang.startsWith("zh-cn")) return "zhCN";
  if (userLang.startsWith("zh-tw")) return "zhTW";
  if (userLang.startsWith("zh")) return "zhCN";

  return "en";
}

export function applyLanguage(lang) {
  document.querySelector("h1").textContent = LANG[lang].title;
  document.getElementById("startBtn").textContent = LANG[lang].newGame;
  document.getElementById("meretInput").placeholder =
    LANG[lang].sizePlaceholder;
  document.querySelector("#colorPickerContainer label").textContent =
    LANG[lang].colorLabel;
  document.getElementById("lepesek").textContent = `${LANG[lang].steps}: 0`;
  document.getElementById("ido").textContent = `${LANG[lang].time}: 0 mp`;
  document.getElementById("footer").innerHTML =
    `${LANG[lang].footer}<a href="https://github.com/boronen" target="_blank">GitHub</a>`;
}
