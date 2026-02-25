export type SceneState = "idle" | "spinning" | "stopping" | "showWin";

export class SlotFSM {
    state: SceneState = "idle";

    set(state: SceneState) {
      this.state = state;
    }

    is(s: SceneState) {
      return this.state === s;
    }
}