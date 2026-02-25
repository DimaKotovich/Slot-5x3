import * as PIXI from "pixi.js";
import { SlotViewModel } from "../state/SlotViewModel";
import { Reel } from "./Reel";
import { SlotFSM } from "./SlotFSM";
import { mockSpin } from "../mock/SpinMock";
import { REEL_CONFIG, SLOT_CONFIG, TIMING } from "../globals/constans";

export class SlotScene extends PIXI.Container {
    private reels: Reel[] = [];
    private fsm = new SlotFSM();
    private resultMatrix: number[][] = [];

    constructor(private viewModel: SlotViewModel) {
      super();

      for (let i = 0; i < SLOT_CONFIG.REELS; i++) {
        const r = new Reel();
        r.x = i * (REEL_CONFIG.SYMBOL_HEIGHT + 20);
        this.reels.push(r);
        this.addChild(r);
      }

      viewModel.subscribe(() => this.reactvm());
    }

    private reactvm() {
      if (this.viewModel.phase === "spinning" && this.fsm.is("idle")) {
        this.startSpin();
      }

      if (this.viewModel.isStopping && this.fsm.is("spinning")) {
        this.stopSpin();
      }
    }

    private async startSpin() {
      this.fsm.set("spinning");
      this.reels.forEach(r => r.start());

      const result = await mockSpin();
      this.resultMatrix = result.matrix;

      setTimeout(
        () => this.stopSpin(result),
        this.viewModel.isStopping ? TIMING.TURBO_SPIN_DURATION : TIMING.SPIN_DURATION
      );
    }

    private stopSpin(result?: any) {
      this.fsm.set("stopping");

      const matrix = result?.matrix ?? this.resultMatrix;

      this.reels.forEach((r, i) => {
        setTimeout(() => {
          r.stop(matrix[i]);

          if (i === this.reels.length - 1) {
            this.showWin(result);
          }
        }, i * REEL_CONFIG.STOP_DELAY_BETWEEN_REELS);
      });
    }

    private showWin(result: any) {
      this.fsm.set("showWin");
      this.viewModel.sceneResult(result);

      setTimeout(() => {
        this.fsm.set("idle");
        this.viewModel.sceneIdle();
      }, TIMING.WIN_SHOW_DURATION);
    }

    update() {
      if (this.fsm.is("spinning")) {
        this.reels.forEach(r => r.update());
      }
    }
}