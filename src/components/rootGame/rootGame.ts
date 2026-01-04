import { Component, EventEmitter, Signal, viewChild } from '@angular/core';
import { ChildActivationEnd, RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { Asker } from "../../classes/Asker";
import { MatDialog, } from '@angular/material/dialog';
import { MoveAmountDialog } from '../dialog/moveAmountDialog';
import { Observable } from 'rxjs/internal/Observable';
import { GameWorkflowStateEnum, RaceEnum } from '../../classes/models/Enums';
import { race } from 'rxjs';
import { MatSelectModule } from "@angular/material/select";
import { RacePickingSectionComponent } from '../startupPanel/racePickingSection'
import { ClearingHelper } from '../../classes/helpers/ClearingHelper';
import { PlayerBoardComponent } from '../playerBoard/playerBoard';
import { CommonModule } from '@angular/common';
import { AddDecreeDialog } from '../dialog/eyrieAddCardToDecreeDialog';
import { TArray } from '../../classes/types/TArray';
import { ExtensionFaker } from '../../classes/helpers/ExtensionFaker';
import { RaceHelper } from '../../classes/helpers/RaceHelper';
import { MoveResult } from '../../classes/models/MoveResult';
import { AskerPromptOption } from '../../classes/models/Option';
import { IngamePrompt } from '../../components/board/ingameprompt'
import { GeneralHelper } from '../../classes/helpers/GeneralHelper';

@Component({
    selector: 'rootGame',
    standalone: true,
    imports: [CommonModule, BoardComponent, MatSelectModule, RacePickingSectionComponent, PlayerBoardComponent, IngamePrompt],
    //templateUrl: './game.html',
    template: `
    <table>
       <tbody>
        <tr>
            <td>
                <board id="boardWrapper" [clearings]="this.GetGS().Clearings" [clickEventEmitter]="clearingClickHandler" ></board>
                <div id="message">{{messageText}}</div>
                <div id="askDiv"><ingameprompt #askerPrompt [OptionSelectedEmitter]="AskerPromptOptionSelectedHandler"></ingameprompt></div>
                <p></p>
                 <div id="debugButtonsPanel">
                    <!-- <div><button (click)="Start()">Start</button></div> -->
                    <!-- <div><button (click)="Reset()">Reset</button></div> -->
                    <div><button (click)="MoveButtonClick()">{{getMoveBtnText()}}</button></div>
                    <div>
                        <button  (click)="Execute(cmd.value)">Execute</button>
                        <input #cmd type="text" id="cmd">
                    </div>
                    <div><button #can id="cancel" (click)="this.CancelButtonClickHandler.emit(-1)">cancel</button></div>
                    <div><button (click)="Test()">Test</button></div>
                </div>
                <div>

                </div>
               
            </td>
            <td>
                @if(ShowPlayerRacePicker())
                {
                    <racePickingSection (StartClicked)="Start()" />
                }
                <div>
                    <ul>
                        <li *ngFor="let l of this.GetGS().History">{{l}}</li>
                    </ul>
                </div>
                <div>
                    <p>Draw Deck:{{this.GetGS().DrawDeck.length-1}}</p>
                </div>
                <div>
                    <player-board  *ngFor="let p of this.GetGS().Players" [player]="p" ></player-board>
                </div>
            </td>
        </tr>
        <tr>
            <td>
           
            </td>
        </tr>
       </tbody>
    </table>
   
    
    `,
    styleUrl: './rootGame.css'
})
export class GameComponent
{
    clearingClickHandler: EventEmitter<number>;
    CancelButtonClickHandler: EventEmitter<number>;
    AskerPromptOptionSelectedHandler: EventEmitter<number>;
    messageText!: string;
    moveMode: MoveMode;
    Asker: Asker;
    History: string[];
    AskPromptOptions!: AskerPromptOption[];
    AskerPromptElement: Signal<IngamePrompt> = viewChild.required(IngamePrompt);

    constructor(public dialog: MatDialog)
    {
        this.clearingClickHandler = new EventEmitter<number>();
        this.CancelButtonClickHandler = new EventEmitter<number>();
        this.AskerPromptOptionSelectedHandler = new EventEmitter<number>;
        this.moveMode = MoveMode.None;
        this.History = [];
        // this.AskPromptOptions = [new AskerPromptOption("t", 1)];
        this.Asker = new Asker(
            this,
            (c?: boolean, question?: string) =>                                 { return this.GetNextClearingClickAsync(c, question); },
            (allowedIds: number[], question?: string, c?: boolean) =>           { return this.GetNextClearingClickFilteredAsync(allowedIds, question, c); },
            (canCancel: boolean) =>                                             { return this.AskerAddDecree(canCancel); },
            (canCancel?: boolean, allowedIds?: number[], question?: string) =>  { return this.Move(canCancel, allowedIds, question); },
            (question: string, options: AskerPromptOption[], canCancel: boolean) => this.AskTest(question, options, canCancel)
        );



    }

    //#region GAME LOOP
    /**
     * Main start of game
     * @param players 
     */
    async Start()
    {
        console.log("GameComponent.Start");

        GameManager.GameState.GameWorkflowState = GameWorkflowStateEnum.PlayerSetup;
        GameManager.GameState.Clearings = ClearingHelper.InitClearings();

        //setup players
        let usedStartingClearings: number[] = [];
        console.log("setup start");

        for (let index = 0; index < GameManager.GameState.Players.length; index++)
        {
            const p = GameManager.GameState.Players[index];

            for (let index = 0; index < 3; index++)
            {
                p.Hand.Draw(GameManager.DrawCard());
            }
            this.Log(`Setuping ${RaceHelper.RaceNameAsText(p.RaceEnum)} start.`);
            p.SetRace();
            var sc = await p.Race.Setup(this.Asker, usedStartingClearings);
            usedStartingClearings.push(sc);
        }

        GameManager.GameState.GameWorkflowState = GameWorkflowStateEnum.Game;

        for (let index = 0; true; index++)
        {
            this.Log(`Round ${index} start.`);

            for (let index = 0; index < GameManager.GameState.Players.length; index++)
            {
                var p = GameManager.GameState.Players[index];
                this.Log(`${RaceHelper.RaceNameAsText(p.RaceEnum)} start.`);
                this.Log(`${RaceHelper.RaceNameAsText(p.RaceEnum)} MORNING start.`);
                await p.Race.Morning();
                this.Log(`${RaceHelper.RaceNameAsText(p.RaceEnum)} DAY start.`);
                await p.Race.Day();
                this.Log(`${RaceHelper.RaceNameAsText(p.RaceEnum)} EVENING start.`);
                await p.Race.Evening();
            }
        }



    }
    //#endregion


    async AskTest(question: string, options: AskerPromptOption[], canCancel: boolean): Promise<number>
    {
        this.AskerPromptElement().addOptions(options);

        if (canCancel)
            this.AskerPromptElement().addOptions([new AskerPromptOption("Cancel", -1)]);

        this.messageText = question;
        var retVal: number = 0;
        await new Promise<number>(async callback =>
        {
            var s = this.AskerPromptOptionSelectedHandler.subscribe(i =>
            {
                s.unsubscribe();
                callback(i);
            });
        }).then(a => retVal = a);
        return retVal;

    }
    //#region PRIVATE

    GetGS()
    {
        return GameManager.GameState;
    }

    getMoveBtnText()
    {
        if (this.moveMode === MoveMode.None) return "Move";
        else
            return "Cancel Move";
    }

    MoveButtonClick()
    {
        if (this.moveMode === MoveMode.None)
        {
            this.moveMode = MoveMode.Selecting;
            this.Move();
        }
        else
        {
            this.CancelButtonClickHandler.emit(-1);
        }
    }

    //#endregion
    //#region DEBUG METHODS

    SetMessageText(text: string): void
    {
        this.messageText = text;
    }

    Test()
    {
        // this.AskTest("t");
        // console.log(GameManager.GameState);
        //var q = this.Asker.AskPrompt("kolko?",["1","2"],false);
        //console.log(q);
    }
    Reset() { }
    async Execute(command: string)
    {
        // var q = await this.GetNextCle`aringClickAsync();
        // console.log(q);
        // var id = Number(command);
        // var r = GameManager.GetClearingById(id).GetWhoRulesClearing();

        // console.log(`Clearing[${id}] is ruled by [${r === null ? "noone" : RaceEnum[r]}]`)

        // GameManager.ExecCommand(command);
    }
    //#endregion


    async Move(cancelable?: boolean, availableClearingsToMoveFrom?: number[], question?: string): Promise<MoveResult | null>
    {
        var canceled = false;

        while (!cancelable || !canceled)
        {
            canceled = false;

            //if we get no clearing ids use all
            availableClearingsToMoveFrom = availableClearingsToMoveFrom || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            var availableClearingsToMoveFromTArray = new TArray<number>();
            var movingPlayer = GameManager.GetActivePlayer();

            var availableMovementOptions: number[][] = [];
            for (let index = 0; index < availableClearingsToMoveFrom.length; index++)
            {

                var q = ClearingHelper.GetPossibleMoveOptionsFromThisClearing(movingPlayer.Race.RaceEnum, availableClearingsToMoveFrom[index]);

                availableMovementOptions.push(...q.filter(v => v[0] !== -1));

                // availableClearingsToMoveFromTArray.push(availableClearingsToMoveFrom[index]);
            }

            console.log("can move from");
            console.log(availableClearingsToMoveFromTArray);

            let mt = this.messageText;
            let mm = this.moveMode;
            let ResetMoveMode = function (wasCanceled: boolean = true)
            {
                mt = "";
                mm = MoveMode.None;
                if (wasCanceled) console.log("move cancelled");
            }

            console.info("in move");
            var moveFrom: number = -1;
            var moveTo: number = -1;

            var finalStaringCl = ExtensionFaker.Distinct(availableMovementOptions.map((v) => v[0]));

            var pFrom = this.GetNextClearingClickFilteredAsync(finalStaringCl, undefined, cancelable).then(i => moveFrom = i);
            this.messageText = "select clearing to move from";
            await pFrom;
            console.log("after getting from");
            if (moveFrom === -1)
            {
                ResetMoveMode();
                canceled = true;
                continue;//cancelled action
            }

            var finalDestCl = ExtensionFaker.Distinct(availableMovementOptions.filter((v) => v[0] === moveFrom).map(v => v[1]));

            //todo filter where can move to
            var pMoveTo = this.GetNextClearingClickFilteredAsync(finalDestCl, undefined, cancelable).then(i => moveTo = i);
            this.messageText = `moving from [${moveFrom}] select clearing to move into`;
            await pMoveTo;
            console.log("after getting to");
            if (moveTo === -1)
            {
                ResetMoveMode();
                canceled = true;
                continue;
                //return;//cancelled action
            }

            console.log(`user selected to move from [${moveFrom}] and to [${moveTo}]`);

            let dialogRef = this.dialog.open(MoveAmountDialog, {
                data: ClearingHelper.GetClearingById(moveFrom).GetAmountOfWarOfPlayer(GameManager.GetActivePlayer().RaceEnum)
            });

            var amountMoving: number = -1;
            var qwe = this.getNextValueFromSub(dialogRef.afterClosed()).then(i =>
            {
                if (i === undefined)
                    amountMoving = -1;
                else
                    amountMoving = Number(i);
            });

            await qwe;
            console.log(`output from modal is ${amountMoving} `);

            if (amountMoving === -1)
            {
                ResetMoveMode();
                canceled = true;
                continue;
            }

            GameManager.Move(moveFrom, moveTo, amountMoving);
            this.Log(`${RaceHelper.RaceNameAsText(movingPlayer.Race.RaceEnum)} moving ${amountMoving} warrior/s from [${moveFrom}] to [${moveTo}]`)
            return new MoveResult(moveFrom, moveTo, amountMoving);
        }

        return null;
    }

    public Log(message: string): void
    {
        this.GetGS().Log(message);
    }


    public async GetNextClearingClickAsync(cancelable?: boolean, question?: string)
    {
        console.log("entered game.GetNextClearingClickAsync");

        GameManager.ToggleClearingHighlight("all", true);
        if (question !== null) this.messageText = question as string;

        var retVal: number = -1;
        var p = this._getNextClearingClick(cancelable ?? false).then(i => 
        {
            retVal = i;
            GameManager.ToggleClearingHighlight("all", false);
            this.messageText = "";
        }
        );

        await p;
        console.log("after await game.GetNextClearingClickAsync");

        return retVal;
    }

    //#region ASKER METHODS

    async AskerMoveAmount(moveFrom: number)
    {
        let dialogRef = this.dialog.open(MoveAmountDialog, {
            data: ClearingHelper.GetClearingById(moveFrom).GetAmountOfWarOfPlayer(GameManager.GetActivePlayer().RaceEnum)
        });
    }

    async AskerAddDecree(canCancel: boolean)
    {
        let dialogRef = this.dialog.open(AddDecreeDialog, {
            data: { player: GameManager.GetActivePlayer(), cancelable: canCancel }
        });

        let retVal: string = "";
        var p = this.getNextValueFromSub(dialogRef.afterClosed()).then(i =>
        {
            retVal = i;
        });

        await p;
        return retVal;
    }
    //#endregion


    async GetNextClearingClickFilteredAsync(allowedIds: number[], question?: string, cancelable?: boolean)
    {
        GameManager.ToggleClearingHighlight(allowedIds, true);
        if (question !== null) this.messageText = question as string;
        var retVal: number = -1;
        var p = this._getNextClearingClickFiltered(allowedIds, cancelable ?? false).then(i => 
        {
            retVal = i;
            GameManager.ToggleClearingHighlight("all", false);
            this.messageText = "";
        }
        );
        await p;
        return retVal;
    }






    private async _getNextClearingClickFiltered(allowedIds: number[], cancelable: boolean = false): Promise<number>
    {

        // allowedIds.forEach(i =>
        //     {
        //         ClearingHelper.GetClearingById(i).Highlighted = false;
        //     });

        return new Promise<number>(async callback =>
        {
            let value = -1;

            while (true)
            {
                var promise = this._getNextClearingClick(cancelable).then(i =>
                {
                    value = i;
                });
                await promise;
                console.log(`got ${value}`);

                if (allowedIds.includes(value) || (cancelable && value === -1))
                {
                    console.log(`got valid value ${value},callingback`);
                    break;
                }
            }

            allowedIds.forEach(i =>
            {
                ClearingHelper.GetClearingById(i).Highlighted = false;
            });

            callback(value);
        })
    }

    /**
     * get next click on clearing
     */
    private async _getNextClearingClick(cancelable: boolean = false): Promise<number>
    {
        return new Promise<number>(async callback =>
        {
            var r = cancelable ? race(this.clearingClickHandler, this.CancelButtonClickHandler) : this.clearingClickHandler;
            var s = r.subscribe(i =>
            {
                s.unsubscribe();
                callback(i);
            });
        });
    }


    async getNextValueFromSub<T>(o: Observable<T>): Promise<T>
    {
        return new Promise<T>(async callback =>
        {
            var s = o.subscribe(i =>
            {
                s.unsubscribe();
                callback(i);
            });
        });
    }

    ShowPlayerRacePicker(): boolean
    {
        return GameManager.GameState.GameWorkflowState === GameWorkflowStateEnum.PlayersPickingRaces;
    }
    ShowPlayerBoards()
    {
        return GameManager.GameState.GameWorkflowState === GameWorkflowStateEnum.Game;
    }
}

export enum MoveMode
{
    None,
    Selecting
}
