const STORAGE_KEY = "sfxVolume";
/** Alapérték ~30%, mert a hangfájlok hangosak */
const DEFAULT = 0.3;

export function getSfxVolume() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw == null) return DEFAULT;
  const v = parseFloat(raw);
  if (!Number.isFinite(v)) return DEFAULT;
  return Math.min(1, Math.max(0, v));
}

export function setSfxVolume(v) {
  const clamped = Math.min(1, Math.max(0, v));
  localStorage.setItem(STORAGE_KEY, String(clamped));
}

/**
 * @param {() => void} [onChange] — pl. winAudio.volume frissítése
 */
export function initSfxVolumeUI(onChange) {
  const slider = document.getElementById("sfxVolumeSlider");
  if (!slider) return;

  const apply = () => {
    const pct = parseInt(slider.value, 10);
    const v = Number.isFinite(pct) ? pct / 100 : DEFAULT;
    setSfxVolume(v);
    onChange?.();
  };

  slider.value = String(Math.round(getSfxVolume() * 100));
  apply();
  slider.addEventListener("input", apply);
}
