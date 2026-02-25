import { AUTO, BET_OPTIONS } from "../globals/constans";
import { SlotViewModel } from "../state/SlotViewModel";

export class UI {
  private spinBtn = document.getElementById("spin-btn") as HTMLButtonElement;
  private stopBtn = document.getElementById("stop-btn") as HTMLButtonElement;
  private autoBtn = document.getElementById("auto-btn") as HTMLButtonElement;
  private betSel = document.getElementById("bet-select") as HTMLSelectElement;
  private info = document.getElementById("ui-info") as HTMLDivElement;

  constructor(private viewModel: SlotViewModel) {
    this.init();
    viewModel.subscribe(() => this.render());
  }

  private init() {
    this.spinBtn.onclick = () => this.viewModel.spin();
    this.stopBtn.onclick = () => this.viewModel.stop();
    this.autoBtn.onclick = () => this.viewModel.startAuto(AUTO.DEFAULT_COUNT);

    BET_OPTIONS.forEach(v => {
      const o = document.createElement("option");
      o.value = String(v);
      o.text = String(v);
      this.betSel.appendChild(o);
    });

    this.betSel.onchange = () => this.viewModel.setBet(+this.betSel.value);
  }

  private render() {
    this.spinBtn.disabled = !this.viewModel.canSpin;
    this.stopBtn.disabled = this.viewModel.phase !== "spinning";

    this.info.innerText =
      `Balance: ${this.viewModel.balance}   Bet: ${this.viewModel.bet}   Win: ${this.viewModel.lastWin}   Phase: ${this.viewModel.phase}   Auto: ${this.viewModel.autoSpinsLeft}`;
  }
}