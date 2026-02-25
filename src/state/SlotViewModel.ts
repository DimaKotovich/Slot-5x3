import { SlotModel } from "../model/SlotModel";
import { SpinResult } from "../globals/types";

export type SlotPhase = "idle" | "spinning" | "showWin";

type Listener = () => void;

export class SlotViewModel {
    private listeners = new Set<Listener>();

    private _phase: SlotPhase = "idle";
    private _autoSpinsLeft = 0;
    private _isStopping = false;
    private _currentMatrix: number[][] = [];

    constructor(private model: SlotModel) {}

    subscribe(fn: Listener) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }

    private notify() {
      this.listeners.forEach(l => l());
    }

    get balance() { 
      return this.model.snapshot.balance; 
    }

    get bet() { 
      return this.model.snapshot.bet; 
    }

    get lastWin() { 
      return this.model.snapshot.lastWin; 
    }

    get phase() { 
      return this._phase; 
    }

    get autoSpinsLeft() { 
      return this._autoSpinsLeft; 
    }

    get isStopping() { 
      return this._isStopping; 
    }

    get matrix() { 
      return this._currentMatrix; 
    }

    get canSpin() {
      return this._phase === "idle" && this.model.canSpin();
    }

    spin() {
      if (!this.canSpin) return;

      this.model.applySpinStart();
      this._phase = "spinning";
      this._isStopping = false;

      this.notify();
    }

    stop() {
      if (this._phase !== "spinning") return;

      this._isStopping = true;

      this._autoSpinsLeft = 0;

      this.notify();
    }

    setBet(bet: number) {
      this.model.setBet(bet);
      this.notify();
    }

    startAuto(count: number) {
      if (!this.canSpin) return;

      this._autoSpinsLeft = count;
      this.spin();
    }

    sceneResult(result: SpinResult) {
      this.model.applySpinResult(result);
      this._currentMatrix = result.matrix;
      this._phase = "showWin";
      this.notify();
    }

    sceneIdle() {
      this._phase = "idle";

      if (this._autoSpinsLeft > 0 && this.model.canSpin()) {
        this._autoSpinsLeft--;
        this.spin();
        return;
      }

      this.notify();
    }
}