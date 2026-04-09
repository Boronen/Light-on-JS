export let selectedColor = "#ffeb3b";

let hue = 50;
let saturation = 100;
let lightness = 50;

function notifyLampThemeUpdate() {
  document.dispatchEvent(new CustomEvent("lampthemeupdate"));
}

export function initColorPicker() {
  const hueSlider = document.getElementById("hueSlider");
  const slCanvas = document.getElementById("slCanvas");
  const hexInput = document.getElementById("hexInput");
  const preview = document.getElementById("colorPreview");
  const ctx = slCanvas.getContext("2d");

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return (
      "#" +
      [f(0), f(8), f(4)]
        .map((x) => Math.round(x * 255).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  function drawSL() {
    const w = slCanvas.width;
    const h = slCanvas.height;
    const gradSat = ctx.createLinearGradient(0, 0, w, 0);
    gradSat.addColorStop(0, "white");
    gradSat.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    ctx.fillStyle = gradSat;
    ctx.fillRect(0, 0, w, h);

    const gradLight = ctx.createLinearGradient(0, 0, 0, h);
    gradLight.addColorStop(0, "rgba(0,0,0,0)");
    gradLight.addColorStop(1, "black");
    ctx.fillStyle = gradLight;
    ctx.fillRect(0, 0, w, h);
  }

  function updateColor() {
    selectedColor = hslToHex(hue, saturation, lightness);
    preview.style.background = selectedColor;
    hexInput.value = selectedColor;
    notifyLampThemeUpdate();
  }

  function pickFromPointer(ev) {
    const rect = slCanvas.getBoundingClientRect();
    const x =
      ((ev.clientX - rect.left) / Math.max(rect.width, 1)) * slCanvas.width;
    const y =
      ((ev.clientY - rect.top) / Math.max(rect.height, 1)) * slCanvas.height;
    saturation = Math.round(
      Math.min(100, Math.max(0, (x / slCanvas.width) * 100))
    );
    lightness = Math.round(
      Math.min(100, Math.max(0, 100 - (y / slCanvas.height) * 100))
    );
    updateColor();
  }

  hueSlider.addEventListener("input", () => {
    hue = hueSlider.value;
    drawSL();
    updateColor();
  });

  slCanvas.addEventListener("pointerdown", (e) => {
    slCanvas.setPointerCapture(e.pointerId);
    pickFromPointer(e);
  });

  slCanvas.addEventListener("pointermove", (e) => {
    if (!slCanvas.hasPointerCapture(e.pointerId)) return;
    pickFromPointer(e);
  });

  slCanvas.addEventListener("pointerup", (e) => {
    if (slCanvas.hasPointerCapture(e.pointerId)) {
      slCanvas.releasePointerCapture(e.pointerId);
    }
  });

  slCanvas.addEventListener("pointercancel", (e) => {
    if (slCanvas.hasPointerCapture(e.pointerId)) {
      slCanvas.releasePointerCapture(e.pointerId);
    }
  });

  hexInput.addEventListener("input", () => {
    selectedColor = hexInput.value;
    preview.style.background = selectedColor;
    notifyLampThemeUpdate();
  });

  drawSL();
  updateColor();
}
