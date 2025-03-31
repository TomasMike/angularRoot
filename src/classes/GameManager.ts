import { Injectable } from "@angular/core";
import { GameState } from "./GameState";
import { ClearingHelper } from "./helpers/ClearingHelper";
import { Player } from "./Player";
import { TArray } from "./types/TArray";
import { ClearingModel } from "./models/ClearingModel";
import { AskPlayerQuestionTypeEnum, ComponentTypeEnum, RaceEnum } from "./models/Enums";
import { ComponentHelper } from "./helpers/ComponentHelper";
import { Card } from "./models/Card";
import { GeneralHelper } from "./helpers/GeneralHelper";

@Injectable({
    providedIn: "root"
})
export class GameManager
{
    static GameState: GameState = new GameState();

    constructor()
    {
    }

    static GetGameData(): GameState
    {
        return this.GameState;
    }



    //static GetNextClearingClick: (cancelable?: boolean) => Promise<number>;
    // static GetNextClearingClickFiltered: (allowedIds: number[], cancelable?: boolean) => Promise<number>;
    // static SetMessageBoxText: (text: string) => void;

    // static Hook(getNextClearingClickMethod: (cancelable?: boolean) => Promise<number>, getNextClearingClickFilteredMethod: (allowedIds: number[], cancelable?: boolean) => Promise<number>, setMessageBoxText: (text: string) => void): void
    // {
    //     this.GetNextClearingClick = getNextClearingClickMethod;
    //     this.GetNextClearingClickFiltered = getNextClearingClickFilteredMethod;
    //     this.SetMessageBoxText = setMessageBoxText;
    // }



    // AskPlayer(question: string, questionType: AskPlayerQuestionTypeEnum)
    // {
    //     switch (questionType)
    //     {
    //         case AskPlayerQuestionTypeEnum.PickOneClearing:
    //             return GameManager.GetNextClearingClick(false);
    //         default: return null;
    //     }
    // }

    // AskPlayerAnyClearing(): Promise<number>
    // {
    //     var p = GameManager.GetNextClearingClick(false);
    //     //p.then(() => GameManager.SetMessageBoxText(""));
    //     return p;
    // }

    static SpawnPiece(type: ComponentTypeEnum, clearingId: number): void
    {
        var c = ClearingHelper.GetClearingById(clearingId);

        var r = this.GameState.Players.First(_ => _.RaceEnum === ComponentHelper.GetRaceFromComponentTypeEnum(type)).Race;

        if (!r.HandleComponentSpawn(type))
        {
            return;
        }

        c.AddPieces(type);
    }

    static ExecCommand(command: string): void
    {


    }

    static Move(idFrom: number, idTo: number, amount: number)
    {
        var activePlayerRace = GameManager.GetActivePlayer().RaceEnum;
        var wType = ComponentHelper.GetWarriorComponentTypeByRace(activePlayerRace);

        ClearingHelper.GetClearingById(idFrom).RemovePieces(wType, amount);
        ClearingHelper.GetClearingById(idTo).AddPieces(wType, amount);
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


    static GetAllowedMoveFromClearings()
    {
        // array.forEach(element => {

        // });
        // this.gameState.Clearings
        // this.gameState.ActivePlayerId
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

