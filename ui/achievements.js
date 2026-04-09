import { getSfxVolume } from "./sfxVolume.js";

const ACHIEVEMENTS = {
  FIRST_WIN: {
    id: "FIRST_WIN",
    title: "Első siker",
    desc: "Először mentetted meg a Földet!",
    sound: null,
  },
  EXPEDITION_33: {
    id: "EXPEDITION_33",
    title: "Expedition 33",
    desc: "33 alkalommal mentetted meg a Földet!",
    sound: "./expedition33.mp3",
  },
};

export function getAchievementById(id) {
  return Object.values(ACHIEVEMENTS).find((a) => a.id === id);
}

export function incrementWinCounterAndAchievements(unlockAchievementFn) {
  let count = parseInt(localStorage.getItem("winCount") || "0", 10);
  count++;
  localStorage.setItem("winCount", String(count));

  if (count === 1) {
    unlockAchievementFn(ACHIEVEMENTS.FIRST_WIN);
  }
  if (count === 33) {
    unlockAchievementFn(ACHIEVEMENTS.EXPEDITION_33);
  }
}

export function unlockAchievement(ach) {
  const unlocked = JSON.parse(localStorage.getItem("achievements") || "[]");

  if (unlocked.includes(ach.id)) return;

  unlocked.push(ach.id);
  localStorage.setItem("achievements", JSON.stringify(unlocked));

  const box = document.createElement("div");
  box.className = "achievement";
  box.innerHTML = `<b>${ach.title}</b><br>${ach.desc}`;
  document.getElementById("achievements").appendChild(box);

  setTimeout(() => {
    box.style.opacity = 0;
    setTimeout(() => box.remove(), 500);
  }, 4000);

  if (ach.sound) {
    const audio = new Audio(ach.sound);
    audio.volume = getSfxVolume();
    audio.play();
  }

  renderAchievementList();
}

export function renderAchievementList() {
  const list = document.getElementById("achievementList");
  if (!list) return;

  const unlocked = JSON.parse(localStorage.getItem("achievements") || "[]");

  list.innerHTML = "<h3>Megnyert achievementek:</h3>";

  unlocked.forEach((id) => {
    const ach = getAchievementById(id);
    if (!ach) return;

    const item = document.createElement("div");
    item.className = "achItem";
    item.textContent = `${ach.title} – ${ach.desc}`;
    list.appendChild(item);
  });
}
