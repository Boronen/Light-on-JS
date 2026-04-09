import { detectLanguage, applyLanguage } from "./ui/language.js";
import { initColorPicker } from "./ui/colorPicker.js";
import { initDevMode } from "./ui/devMode.js";
import { initGameStarter } from "./ui/gameStarter.js";
import { getSfxVolume, initSfxVolumeUI } from "./ui/audio-volume.js";

export let winAudio = new Audio();
winAudio.volume = getSfxVolume();

initSfxVolumeUI(() => {
  winAudio.volume = getSfxVolume();
});

document.getElementById("victoryBtn").addEventListener("click", () => {
  winAudio.pause();
  winAudio.currentTime = 0;

  document.getElementById("victoryOverlay").style.display = "none";
  document.getElementById("startBtn").click();
});

const lang = detectLanguage();
applyLanguage(lang);

initColorPicker();
initDevMode();
initGameStarter(lang);

let racsResizeTimer;
function frissitsRacsHaVanJatek() {
  window.jatekTer?.view?.frissitsRacsMeret?.();
}

window.addEventListener("resize", () => {
  clearTimeout(racsResizeTimer);
  racsResizeTimer = setTimeout(frissitsRacsHaVanJatek, 120);
});

window.visualViewport?.addEventListener("resize", () => {
  clearTimeout(racsResizeTimer);
  racsResizeTimer = setTimeout(frissitsRacsHaVanJatek, 120);
});

window.addEventListener("orientationchange", () => {
  setTimeout(frissitsRacsHaVanJatek, 280);
});

window.addEventListener("load", () => {
  const jt = window.jatekTer;
  if (jt) jt.renderAchievementList();
});

