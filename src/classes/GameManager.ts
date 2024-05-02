import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingModel, ClearingSuitEnum, ComponentTypeEnum, RaceEnum } from "./models/ClearingModel";
import { error } from "console";
import { PieceGroupingModel } from "./models/PieceGroupingModel";
import { ClearingHelper } from "./helpers/ClearingHelper";
import { Player } from "./Player";

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

        this.gameState.Clearings = ClearingHelper.GetClearings();


        this.gameState.Players.push(new Player(1,RaceEnum.MarquiseDeCat));
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
        this.gameState.Players

    }

    static GetClearingById(id: number): ClearingModel
    {
        var c = this.gameState.Clearings.find(_ => _.Id === id);

        if (c === undefined)
            throw new Error(`Clearing with id=[${id}] doesnt exist.`);

        return c;
    }
}