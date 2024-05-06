import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingHelper } from "./helpers/ClearingHelper";
import { Player } from "./Player";
import { TArray } from "./types/TArray";
import { ClearingModel } from "./models/ClearingModel";
import { ComponentTypeEnum, RaceEnum } from "./models/Enums";
import { ComponentHelper } from "./helpers/ComponentHelper";

@Injectable({
    providedIn: "root"
})
export class GameManager
{
    static gameState: GameState = new GameState();

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

        let a: TArray<number> = new TArray<number>();
        a.push(1);
        a.push(2);
        a.push(3);
        a.push(4);
        let b = a.First(_ => _ === 3);

        //let c = a.First(_ => _ === 5);

        console.log("GameManager.Start");

        this.gameState.Clearings = ClearingHelper.GetClearings();


        this.gameState.Players.push(new Player(1, RaceEnum.MarquiseDeCat));
    }

    static SpawnPiece(type: ComponentTypeEnum, clearingId: number): void
    {
        var c = this.GetClearingById(clearingId);

        c.AddPieces(type);
    }

    static ExecCommand(command: string): void
    {


    }

    static Move(idFrom: number, idTo: number, amount: number)
    {
        var activePlayerRace = GameManager.GetActivePlayer().Race;
        var wType = ComponentHelper.GetWarriorComponentTypeByRace(activePlayerRace);

        this.GetClearingById(idFrom).RemovePieces(wType, amount);
        this.GetClearingById(idTo).AddPieces(wType, amount);
        // var toPieces = this.GetClearingById(idTo).Pieces;


        // var piecesOnFromClearing = fromPieces.First(_ => _.GetComponentRace() === activePlayer.Race);
        // var piecesOnToClearing = toPieces.First(_ => _.GetComponentRace() === activePlayer.Race);        




    }

    static GetClearingById(id: number): ClearingModel
    {
        var c = this.gameState.Clearings.find(_ => _.Id === id);

        if (c === undefined)
            throw new Error(`Clearing with id=[${id}] doesnt exist.`);

        return c;
    }

    static GetActivePlayer(): Player
    {
        return this.gameState.Players.First(_ => _.Number === this.gameState.ActivePlayerId);
    }

    static GetAllowedMoveFromClearings()
    {

    }

}

