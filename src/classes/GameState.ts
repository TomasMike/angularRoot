import { ClearingSuit, ClearingModel } from "./models/ClearingModel";

export class GameState {
    Clearings: ClearingModel[];
    ClearingSize: number;

    constructor() {
        this.Clearings = [];
        this.ClearingSize = 50;
    }
}