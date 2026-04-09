import { LANG } from "./language.js";
import { selectedColor } from "./colorPicker.js";

function nezetSzelesseg() {
  if (typeof window === "undefined") return 1200;
  const vv = window.visualViewport;
  if (vv && vv.width > 0) return vv.width;
  return window.innerWidth;
}

export class BoardView {
  constructor(containerEl, model, options) {
    this.containerEl = containerEl;
    this.model = model;
    this.lang = options.lang;
    this.megoldva = options.megoldva;
    this.cellElems = [];
  }

  alkalmazTemaSzineket() {
    const c = selectedColor;
    document.documentElement.style.setProperty("--lamp-color", c);
    document.documentElement.style.setProperty("--lamp-color-glow", c + "55");
    document.documentElement.style.setProperty("--lamp-color-glow2", c + "33");
  }

  frissitsLepesCimket() {
    const el = document.getElementById("lepesek");
    if (el) {
      el.textContent = `${LANG[this.lang].steps}: ${this.model.steps}`;
    }
  }

  szinkronModellbol() {
    for (let i = 0; i < this.cellElems.length; i++) {
      const elem = this.cellElems[i];
      if (this.model.cells[i]) {
        elem.classList.add("on");
      } else {
        elem.classList.remove("on");
      }
    }
  }

  /**
   * Rács cellaméret nagy kijelzőhöz / kis nézethez (forgatás, méretváltás).
   */
  frissitsRacsMeret() {
    const size = this.model.size;
    if (!size || this.cellElems.length === 0) return;
    const { gap, cell, rowH, bulbW, bulbH } = BoardView._szamolRacs(size);
    this._alkalmazRacsValtozok(cell, rowH, bulbW, bulbH, gap, size);
  }

  static _szamolRacs(size) {
    const gap = 8;
    const pad = 56;
    const vw = nezetSzelesseg();
    const maxBoardPx = Math.min(vw * 0.92 - pad, 12000);
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const minCell = coarse ? 24 : 14;
    let cell = 36;
    const neededW = size * cell + Math.max(0, size - 1) * gap;
    if (size > 0 && neededW > maxBoardPx) {
      cell = Math.max(
        minCell,
        Math.floor((maxBoardPx - Math.max(0, size - 1) * gap) / size)
      );
    } else {
      cell = Math.max(minCell, 36);
    }
    const rowH = Math.round(cell * 1.22);
    const bulbW = Math.round(cell * 0.83);
    const bulbH = Math.round(cell * 0.78);
    return { gap, cell, rowH, bulbW, bulbH };
  }

  _alkalmazRacsValtozok(cell, rowH, bulbW, bulbH, gap, size) {
    const el = this.containerEl;
    el.style.setProperty("--board-gap", `${gap}px`);
    el.style.setProperty("--lamp-w", `${cell}px`);
    el.style.setProperty("--lamp-h", `${rowH}px`);
    el.style.setProperty("--lamp-bulb-w", `${bulbW}px`);
    el.style.setProperty("--lamp-bulb-h", `${bulbH}px`);
    el.style.gridTemplateColumns = `repeat(${size}, ${cell}px)`;
    el.style.gridAutoRows = `${rowH}px`;
  }

  megjelenit() {
    this.alkalmazTemaSzineket();

    const size = this.model.size;
    this.containerEl.innerHTML = "";

    const { gap, cell, rowH, bulbW, bulbH } = BoardView._szamolRacs(size);
    this._alkalmazRacsValtozok(cell, rowH, bulbW, bulbH, gap, size);

    this.cellElems = [];
    const n = this.model.cells.length;

    for (let i = 0; i < n; i++) {
      const div = document.createElement("div");
      div.classList.add("lampa");
      const index = i;
      div.addEventListener("click", () => this._cellaKattintas(index));
      this.containerEl.appendChild(div);
      this.cellElems.push(div);
    }

    this.szinkronModellbol();
    this.frissitsLepesCimket();
  }

  _cellaKattintas(index) {
    this.model.kapcsol(index);
    this.szinkronModellbol();
    this.frissitsLepesCimket();

    if (this.model.megoldvaE()) {
      this.megoldva();
    }
  }
}
