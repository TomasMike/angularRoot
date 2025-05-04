import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingHelper } from "./helpers/ClearingHelper";
import { Player } from "./Player";
import { TArray } from "./types/TArray";
import { ClearingModel } from "./models/ClearingModel";
import { AskPlayerQuestionTypeEnum, ComponentTypeEnum, RaceEnum } from "./models/Enums";
import { ComponentHelper } from "./helpers/ComponentHelper";
import { Card } from "./models/Card";

@Injectable({
    providedIn: "root"
})
export class GameManager
{
    static GameState: GameState = new GameState();
    static History: string[] = [];

    constructor()
    {
    }

    static GetGameData(): GameState
    {
        return this.GameState;
    }



    static SpawnPiece(type: ComponentTypeEnum, clearingId: number, pNumber?: number): void
    {
        var c = ClearingHelper.GetClearingById(clearingId);

        //check race special conditions for spawwning ?
        var r = this.GameState.Players.First(_ => _.RaceEnum === ComponentHelper.GetRaceFromComponentTypeEnum(type)).Race;

        if (!r.HandleComponentSpawn(type))
        {
            return;
        }

        c.AddPieces(type, 1, pNumber);
    }

    static ExecCommand(command: string): void
    {


    }

    static test(a: number, b: number | null)
    {

    }

    static Move(idFrom: number, idTo: number, amount: number)
    {
        var activePlayer = GameManager.GetActivePlayer();
        var wType = ComponentHelper.GetWarriorComponentTypeByRace(activePlayer.RaceEnum);

        ComponentHelper.GetComponentInfo(wType);

        ClearingHelper.GetClearingById(idFrom).RemovePieces(wType, amount);
        ClearingHelper.GetClearingById(idTo).AddPieces(wType, amount, activePlayer.Number);
        // var toPieces = this.GetClearingById(idTo).Pieces;


        // var piecesOnFromClearing = fromPieces.First(_ => _.GetComponentRace() === activePlayer.Race);
        // var piecesOnToClearing = toPieces.First(_ => _.GetComponentRace() === activePlayer.Race);        




    }



    static GetActivePlayer(): Player
    {
        return this.GameState.Players.First(_ => _.Number === this.GameState.ActivePlayerId);
    }

    static DrawCard(): Card
    {
        if (this.GameState.DrawDeck.length === 0)
        {
            while (this.GameState.DiscardPile.length > 0)
            {
                this.GameState.DrawDeck.push(this.GameState.DiscardPile.pop() as Card);
            }

            this.GameState.DrawDeck.Randomize();

        }

        return this.GameState.DrawDeck.pop() as Card;
    }



    static ToggleClearingHighlight(a: number[] | string, b: boolean)
    {
        if (typeof a === 'string')
            GameManager._toggleClearingHighlight(a, b);
        else if (typeof a === 'object')
            GameManager._toggleClearingHighlight("", b, a);
    }

    private static _toggleClearingHighlight(which: string = "", onOff: boolean | null = null, some: number[] = [])
    {
        var setHighlight: (c: ClearingModel) => boolean = (c) =>
        {
            if (onOff == null)
                return !c.Highlighted;
            else if (onOff) return true;
            else return false;
        }

        if (which == "all")
        {
            this.GameState.Clearings.forEach(c => c.Highlighted = setHighlight(c));
        }
        else if (which == "")
        {
            if (some.length > 0)
            {
                this.GameState.Clearings.filter(c => some.includes(c.Id)).forEach(c => c.Highlighted = setHighlight(c));

            }

        }
    }



}

