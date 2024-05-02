import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingModel, ClearingSuitEnum, ComponentTypeEnum } from "./models/ClearingModel";
import { error } from "console";
import { PieceGroupingModel } from "./models/PieceGroupingModel";

@Injectable({
    providedIn: "root"
})
export class GameManager
{
    static gameState: GameState = new GameState();

    private static GetClearing(id: number): ClearingModel
    {
        var a = this.gameState.Clearings.find(c => c.Id === id);
        if (a === undefined)
            throw new Error(`nie je cleraing s id=${id}`);

        return a;
    }

    constructor()
    {
        console.log("GameManager.constuctor");

    }

    static GetGameData(): GameState
    {
        console.log("GameManager.GetGameData");
        return this.gameState;
    }

    static Start(): void
    {
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

    static SpawnPiece(type: ComponentTypeEnum, clearingId: number): void
    {
        var c = this.GetClearingById(clearingId);

        c.AddPiece(type);
    }

    static ExecCommand(command: string): void
    {
        // var c = command.split(' ');

        // switch (c[0]) {
        //     case "move":
        //         this.Move(Number(c[1]), Number(c[2]))
        //         break;
        // }
    }

    static Move(idFrom: number, idTo: number, amount: number)
    {
        var fromPieces = this.GetClearingById(idFrom).Pieces;
        //fromPieces = fromPieces.reduce
    }

    static GetClearingById(id: number): ClearingModel
    {
        var c = this.gameState.Clearings.find(_ => _.Id === id);

        if (c === undefined)
            throw new Error(`Clearing with id=[${id}] doesnt exist.`);

        return c;
    }
}