import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingModel, ClearingSuitEnum } from "./models/ClearingModel";
import { IPieceModel } from "./models/IPieceModel";

@Injectable({
    providedIn: "root"
})
export class GameManager {
    static gameState: GameState = new GameState();

    constructor() {
        console.log("GameManager.constuctor");

    }

    static GetGameData(): GameState {
        console.log("GameManager.GetGameData");
        return this.gameState;
    }

    static Start(): void {
        console.log("GameManager.Start");

        this.gameState.Clearings = [
            new ClearingModel(1, ClearingSuitEnum.Fox, 40, 40),
            new ClearingModel(2, ClearingSuitEnum.Mouse, 420, 90),
            new ClearingModel(3, ClearingSuitEnum.Rabbit, 390, 390),
            new ClearingModel(4, ClearingSuitEnum.Rabbit, 40, 360),
            new ClearingModel(5, ClearingSuitEnum.Rabbit, 250, 40),
            new ClearingModel(6, ClearingSuitEnum.Fox, 440, 220),
            new ClearingModel(7, ClearingSuitEnum.Mouse, 270, 320),
            new ClearingModel(8, ClearingSuitEnum.Fox, 170, 400),
            new ClearingModel(9, ClearingSuitEnum.Mouse, 30, 170),
            new ClearingModel(10, ClearingSuitEnum.Rabbit, 200, 110),
            new ClearingModel(11, ClearingSuitEnum.Mouse, 300, 200),
            new ClearingModel(12, ClearingSuitEnum.Fox, 130, 230),
        ]
    }

    static SpawnPiece(piece: IPieceModel, clearingId: number): void {
        this.gameState.Clearings[clearingId].Pieces.push(piece);
    }

    static ExecCommand(command: string): void 
    {

    }

    static Move(idFrom:number,idTo:number){
        
    }

}