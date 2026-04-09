const STORAGE_KEY = "sfxVolume";
/** Alapérték ~30%, mert a hangfájlok hangosak */
const DEFAULT = 0.3;

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* pl. privát mód / kvóta — a hangerő így is működik a sessionben */
  }
}

export function getSfxVolume() {
  const raw = safeGetItem(STORAGE_KEY);
  if (raw == null) return DEFAULT;
  const v = parseFloat(raw);
  if (!Number.isFinite(v)) return DEFAULT;
  return Math.min(1, Math.max(0, v));
}

export function setSfxVolume(v) {
  const clamped = Math.min(1, Math.max(0, v));
  safeSetItem(STORAGE_KEY, String(clamped));
}

/**
 * @param {() => void} [onChange] — pl. winAudio.volume frissítése
 */
export function initSfxVolumeUI(onChange) {
  function bind() {
    const slider = document.getElementById("sfxVolumeSlider");
    const apply = () => {
      if (!slider) {
        onChange?.();
        return;
      }
      const pct = parseInt(slider.value, 10);
      const v = Number.isFinite(pct) ? pct / 100 : DEFAULT;
      setSfxVolume(v);
      onChange?.();
    };

    if (!slider) {
      onChange?.();
      return;
    }

    slider.value = String(Math.round(getSfxVolume() * 100));
    apply();
    slider.addEventListener("input", apply);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
}
