import { LANG } from "./language.js";
import { BoardModel } from "../game/BoardModel.js";
import { BoardView } from "./BoardView.js";
import {
  renderAchievementList,
  unlockAchievement,
  incrementWinCounterAndAchievements,
} from "./achievements.js";
import { winAudio } from "../main.js";
import { getSfxVolume } from "./sfxvolume.js";

let timer = null;
let ido = 0;

export function createGameSession(meret, jatekterElem, lang) {
  const model = new BoardModel(meret);
  model.veletlenKezdoFeny();

  const gyozelmiFolyamat = () => {
    const overlay = document.getElementById("victoryOverlay");
    const text = document.getElementById("victoryText");
    text.textContent = LANG[lang].solved;
    overlay.style.display = "flex";

    winAudio.src = "./win.mp3";
    winAudio.currentTime = 0;
    winAudio.volume = getSfxVolume();
    winAudio.play();

    incrementWinCounterAndAchievements(unlockAchievement);
  };

  const view = new BoardView(jatekterElem, model, {
    lang,
    megoldva: gyozelmiFolyamat,
  });

  view.megjelenit();

  return {
    model,
    view,
    runVictoryFlow: gyozelmiFolyamat,
    renderAchievementList,
    unlockAchievement,
    ellenorizMegoldas() {
      if (model.megoldvaE()) gyozelmiFolyamat();
    },
    setAllLamps(on) {
      model.mindetAllit(on);
      view.szinkronModellbol();
    },
  };
}

export function initGameStarter(lang) {
  document.addEventListener("lampthemeupdate", () => {
    window.jatekTer?.view?.alkalmazTemaSzineket();
  });

  const input = document.getElementById("meretInput");
  const btn = document.getElementById("startBtn");
  const jatekterElem = document.getElementById("jatekter");

  btn.addEventListener("click", () => {
    const meret = parseInt(input.value, 10);

    if (isNaN(meret) || meret < 2) {
      alert(LANG[lang].invalidSize);
      return;
    }
    if (meret > 99) {
      alert(LANG[lang].tooBig);
      return;
    }

    jatekterElem.innerHTML = "";
    document.getElementById("lepesek").textContent = `${LANG[lang].steps}: 0`;
    document.getElementById("ido").textContent = `${LANG[lang].time}: 0 mp`;

    if (timer) clearInterval(timer);
    ido = 0;
    timer = setInterval(() => {
      ido++;
      document.getElementById("ido").textContent =
        `${LANG[lang].time}: ${ido} mp`;
    }, 1000);

    window.jatekTer = createGameSession(meret, jatekterElem, lang);
    window.jatekTer.renderAchievementList();
  });
}
