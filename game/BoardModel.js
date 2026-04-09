export class BoardModel {
  constructor(size) {
    this.size = size;
    const n = size * size;
    this.cells = new Array(n).fill(false);
    this.steps = 0;
  }

  szomszedok(i) {
    const s = this.size;
    const sz = [];

    if (i % s !== 0) sz.push(i - 1);
    if (i % s !== s - 1) sz.push(i + 1);
    if (i - s >= 0) sz.push(i - s);
    if (i + s < this.cells.length) sz.push(i + s);

    return sz;
  }

  kapcsol(index) {
    this.steps++;
    this._kapcsolCella(index);
    const neighbors = this.szomszedok(index);
    for (let k = 0; k < neighbors.length; k++) {
      this._kapcsolCella(neighbors[k]);
    }
  }

  _kapcsolCella(i) {
    this.cells[i] = !this.cells[i];
  }

  allitsCella(i, bekapcsolva) {
    this.cells[i] = !!bekapcsolva;
  }

  mindetAllit(bekapcsolva) {
    const v = !!bekapcsolva;
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = v;
    }
  }

  megoldvaE() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i]) return false;
    }
    return true;
  }

  veletlenKezdoFeny() {
    if (Math.random() > 0.2) return;
    const index = Math.floor(Math.random() * this.cells.length);
    this.cells[index] = true;
  }
}
