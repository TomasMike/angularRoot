import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingModel, ClearingSuit } from "./models/ClearingModel";

@Injectable({
    providedIn: "root"
})
export class GameManager {
    static gameState: GameState = new GameState();

    constructor(){
    }

    static GetGameData(): GameState {
        console.log("GameManager.GetGameData");
        return this.gameState;
    }

    static Start(): void {
        console.log("GameManager.Start");

        this.gameState.Clearings = [
            new ClearingModel( 1, ClearingSuit.Fox,    40,  40 ),
            new ClearingModel( 2, ClearingSuit.Mouse,  420, 90 ),
            new ClearingModel( 3, ClearingSuit.Rabbit, 390, 390),
            new ClearingModel( 4, ClearingSuit.Rabbit, 40,  360),
            new ClearingModel( 5, ClearingSuit.Rabbit, 250, 40 ),
            new ClearingModel( 6, ClearingSuit.Fox,    440, 220),
            new ClearingModel( 7, ClearingSuit.Mouse,  270, 320),
            new ClearingModel( 8, ClearingSuit.Fox,    170, 400),
            new ClearingModel( 9, ClearingSuit.Mouse,  30,  170),
            new ClearingModel(10, ClearingSuit.Rabbit, 200, 110),
            new ClearingModel(11, ClearingSuit.Mouse,  300, 200),
            new ClearingModel(12, ClearingSuit.Fox,    130, 230),
        ]
    }

}