import { initDevTools, addDevBorder, removeDevBorder } from "./devTools.js";

const ACTIVATE_CODE = ["d", "e", "v", "9", "2"];
const DEACTIVATE_CODE = ["d", "e", "v", "0", "0"];

let buffer = [];

// CSS animációk
const style = document.createElement("style");
style.textContent = `
@keyframes devPulse {
  from { width: 20px; height: 20px; opacity: 1; }
  to { width: 200vw; height: 200vw; opacity: 0; }
}

@keyframes devPulseOff {
  from { width: 20px; height: 20px; opacity: 1; }
  to { width: 200vw; height: 200vw; opacity: 0; }
}
`;
document.head.appendChild(style);

export function initDevMode() {
  // Desktop: billentyűkód
  window.addEventListener("keydown", (e) => {
    buffer.push(e.key.toLowerCase());
    if (buffer.length > 5) buffer.shift();

    const code = buffer.join("");

    if (code === ACTIVATE_CODE.join("")) {
      localStorage.setItem("devMode", "on");
      playDevActivationAnimation();
      setTimeout(() => initDevTools(), 600);
    }

    if (code === DEACTIVATE_CODE.join("")) {
      localStorage.removeItem("devMode");
      playDevDeactivationAnimation();
      setTimeout(() => location.reload(), 600);
    }
  });

  // Mobil: bal felső 5 tap = ON, jobb felső 5 tap = OFF
  registerMobileDevActivator();
  registerMobileDevDeactivator();

  // Ha már aktív volt
  if (localStorage.getItem("devMode") === "on") {
    addDevBorder();
    initDevTools();
  }
}

/* ---------------- ANIMÁCIÓ ---------------- */

function playDevActivationAnimation() {
  const wave = document.createElement("div");
  wave.style = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(255,0,0,0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    pointer-events: none;
    animation: devPulse 0.6s ease-out forwards;
  `;
  document.body.appendChild(wave);

  addDevBorder();
}

function playDevDeactivationAnimation() {
  const wave = document.createElement("div");
  wave.style = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    pointer-events: none;
    animation: devPulseOff 0.6s ease-out forwards;
  `;
  document.body.appendChild(wave);

  removeDevBorder();
}

/* ---------------- MOBILE DEV ACTIVATION ---------------- */

let tapCount = 0;
let lastTap = 0;

function registerMobileDevActivator() {
  const zone = document.createElement("div");
  zone.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    z-index: 99998;
    background: transparent;
  `;
  document.body.appendChild(zone);

  zone.addEventListener("touchstart", () => {
    const now = Date.now();

    if (now - lastTap < 400) {
      tapCount++;
    } else {
      tapCount = 1;
    }

    lastTap = now;

    if (tapCount >= 5) {
      localStorage.setItem("devMode", "on");
      playDevActivationAnimation();
      setTimeout(() => initDevTools(), 600);
      tapCount = 0;
    }
  });
}

/* ---------------- MOBILE DEV DEACTIVATION ---------------- */

function registerMobileDevDeactivator() {
  const zone = document.createElement("div");
  zone.style = `
    position: fixed;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    z-index: 99998;
    background: transparent;
  `;
  document.body.appendChild(zone);

  let taps = 0;
  let last = 0;

  zone.addEventListener("touchstart", () => {
    const now = Date.now();

    if (now - last < 400) {
      taps++;
    } else {
      taps = 1;
    }

    last = now;

    if (taps >= 5) {
      localStorage.removeItem("devMode");
      playDevDeactivationAnimation();
      setTimeout(() => location.reload(), 600);
      taps = 0;
    }
  });
}
