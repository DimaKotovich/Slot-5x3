import { REEL_CONFIG, SLOT_CONFIG } from "../globals/constans";
import * as PIXI from "pixi.js";

export class Reel extends PIXI.Container {
    private symbols: PIXI.Text[] = [];
    private spinning = false;

    constructor() {
      super();

      for (let i = 0; i < SLOT_CONFIG.ROWS; i++) {
        const t = new PIXI.Text("0", { fill: 0xffffff });
        t.y = i * REEL_CONFIG.SYMBOL_HEIGHT;
        this.symbols.push(t);
        this.addChild(t);
      }
    }

    start() {
      this.spinning = true;
    }

    stop(matrixCol: number[]) {
      this.spinning = false;
      matrixCol.forEach((v, i) => {
        this.symbols[i].text = String(v);
      });
    }

    update() {
      if (!this.spinning) return;

      this.symbols.forEach(s => {
        s.y += REEL_CONFIG.SPIN_SPEED;
        if (s.y > SLOT_CONFIG.ROWS * REEL_CONFIG.SYMBOL_HEIGHT) {
          s.y -= SLOT_CONFIG.ROWS * REEL_CONFIG.SYMBOL_HEIGHT;
        }
      });
    }
}