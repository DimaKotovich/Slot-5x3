import { SlotModel } from "../model/SlotModel";
import { SlotScene } from "../scene/SlotScene";
import { SlotViewModel } from "../state/SlotViewModel";
import { UI } from "../ui/UI";
import * as PIXI from "pixi.js";

export class App {
    private canvasContainerId: string = "slot-stage";
    model: SlotModel;
    viewModel: SlotViewModel;
    scene: SlotScene;
    ui: UI;
    app: PIXI.Application;

    constructor() {
        this.model = new SlotModel(1000, 10);
        this.viewModel = new SlotViewModel(this.model);
        this.scene = new SlotScene(this.viewModel);
        this.ui = new UI(this.viewModel);

        this.app = new PIXI.Application({
            width: 500,
            height: 250,
            background: "#222"
        });
        // globalThis.__PIXI_APP__ = this.app;
        const domContainer = document.getElementById(this.canvasContainerId) as HTMLInputElement;
    
        const canvas = this.app.view as HTMLCanvasElement;

        domContainer.innerHTML = '';
        domContainer.appendChild(canvas);

        this.app.stage.addChild(this.scene);
        this.app.ticker.add(()=>this.scene.update());
    }
}