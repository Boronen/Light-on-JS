import { LANG } from "./language.js";
import { unlockAchievement, renderAchievementList } from "./achievements.js";

export function initDevTools() {
  console.log("%cDEV MODE ENABLED", "color: lime; font-size: 16px;");

  addDevBorder();
  enableDevHUD();
  enableGridOverlay();
  enableDevCommands();
  enableDevLangButton();
}

/* ---------------- DEV HUD ---------------- */

function enableDevHUD() {
  const hud = document.createElement("div");
  hud.id = "devHud";
  hud.style = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.5);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(hud);

  setInterval(() => {
    const lang = localStorage.getItem("forceLang") || "auto";
    const steps = document.getElementById("lepesek")?.textContent || "-";
    const time = document.getElementById("ido")?.textContent || "-";

    hud.innerHTML = `
      <b>DEV HUD</b><br>
      Lang: ${lang}<br>
      Browser: ${navigator.language}<br>
      Steps: ${steps}<br>
      Time: ${time}
    `;
  }, 500);
}

/* ---------------- GRID OVERLAY ---------------- */

function enableGridOverlay() {
  const style = document.createElement("style");
  style.textContent = `
    .lampa-dev-idx {
      position: absolute;
      top: 1px;
      left: 2px;
      z-index: 3;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      pointer-events: none;
      text-shadow: 0 0 3px #000, 0 0 6px #000;
    }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => {
    document.querySelectorAll(".lampa").forEach((l, i) => {
      l.classList.add("dev");
      l.setAttribute("data-index", i);
      if (!l.querySelector(":scope > .lampa-dev-idx")) {
        const idx = document.createElement("span");
        idx.className = "lampa-dev-idx";
        idx.textContent = String(i);
        l.prepend(idx);
      }
    });
  });

  const jatekter = document.getElementById("jatekter");
  if (jatekter) {
    observer.observe(jatekter, {
      childList: true,
      subtree: true,
    });
  }
}

/* ---------------- DEV CONSOLE COMMANDS ---------------- */

function enableDevCommands() {
  window.dev = {
    setLang: (l) => {
      if (LANG[l]) {
        localStorage.setItem("forceLang", l);
        location.reload();
      } else {
        console.warn("Unknown language:", l);
      }
    },

    clearLang: () => {
      localStorage.removeItem("forceLang");
      location.reload();
    },

    allUP: () => {
      if (!window.jatekTer) return;

      window.jatekTer.setAllLamps(true);
      window.jatekTer.ellenorizMegoldas?.();
    },

    win: () => {
      if (!window.jatekTer) return;

      window.jatekTer.setAllLamps(false);
      window.jatekTer.ellenorizMegoldas?.();
    },

    /* ---------------- ÚJ: WIN COUNT ÁTÍRÁSA ---------------- */
    setWins: (n) => {
      const num = parseInt(n);
      if (isNaN(num) || num < 0) {
        console.warn("Invalid win count:", n);
        return;
      }

      localStorage.setItem("winCount", num);
      console.log(`Win count set to ${num}`);

      renderAchievementList();

      if (num >= 1) {
        unlockAchievement({
          id: "FIRST_WIN",
          title: "Első siker",
          desc: "Először mentetted meg a Földet!",
          sound: null,
        });
      }

      if (num >= 33) {
        unlockAchievement({
          id: "EXPEDITION_33",
          title: "Expedition 33",
          desc: "33 alkalommal mentetted meg a Földet!",
          sound: "./expedition33.mp3",
        });
      }
    }
  };

  console.log("%cDev commands available as window.dev", "color: cyan;");
}

/* ---------------- DEV LANG BUTTON ---------------- */

function enableDevLangButton() {
  const btn = document.createElement("button");
  btn.id = "devLangBtn";
  btn.textContent = "🌐";
  btn.style = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: 0.2;
    background: #333;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    z-index: 9999;
  `;
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    const codes = Object.keys(LANG).join(", ");
    const newLang = prompt(`Enter language code:\n${codes}`);

    if (!newLang) return;

    if (LANG[newLang]) {
      localStorage.setItem("forceLang", newLang);
      location.reload();
    } else {
      alert("Unknown language code!");
    }
  });
}

/* ---------------- BORDER ---------------- */

export function addDevBorder() {
  document.body.style.boxShadow = "0 0 0 6px red inset";
}

export function removeDevBorder() {
  document.body.style.boxShadow = "none";
}
