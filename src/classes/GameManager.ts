import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingModel, ClearingSuitEnum, RaceEnum } from "./models/ClearingModel";
import { IPieceModel } from "./models/IPieceModel";
import { WarriorPieceModel } from "./models/WarriorPieceModel";
import { ClearingHelper } from "./helpers/ClearingHelper";

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
    }

    static Setup(startingClearingId: number, race: RaceEnum): void
    {
        switch (race)
        {
            case RaceEnum.MarquiseDeCat:
                let opositeClearing = ClearingHelper.GetOppositeClearingId(startingClearingId);

                for (let index = 1; index <= 12; index++)
                {
                    if (index === opositeClearing)
                        continue;

                    this.SpawnPiece(new WarriorPieceModel(RaceEnum.MarquiseDeCat), index);
                }
        }
    }

    static Move(from: number, to: number, amount: number)
    {
        this.GetClearing(from)

    }



    static SpawnPiece(piece: IPieceModel, clearingId: number): void
    {

        var c = this.gameState.Clearings.find(_ => _.Id === clearingId);

        if (c === undefined)
        {
            throw new Error;
        }
        else
        {
            c.Pieces.push(piece);
        }
    }

    static ExecCommand(command: string): void
    {

    }


}