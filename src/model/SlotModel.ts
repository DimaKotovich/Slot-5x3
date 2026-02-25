import { SlotState, SpinResult } from "../globals/types";


export class SlotModel {
    private state: SlotState;

    constructor(initialBalance = 1000, initialBet = 10) {
      this.state = {
        balance: initialBalance,
        bet: initialBet,
        lastWin: 0,
      };
    }

    get snapshot(): SlotState {
      return { ...this.state };
    }

    setBet(bet: number) {
      this.state.bet = bet;
    }

    canSpin(): boolean {
      return this.state.balance >= this.state.bet;
    }

    applySpinStart() {
      if (!this.canSpin()) throw new Error("Not enough balance");
      this.state.balance -= this.state.bet;
      this.state.lastWin = 0;
    }

    applySpinResult(result: SpinResult) {
      this.state.balance += result.win;
      this.state.lastWin = result.win;
    }
}