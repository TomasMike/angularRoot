import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { Asker } from "../../classes/Asker";
import { MatDialog, } from '@angular/material/dialog';
import { MoveDialog } from '../dialog/moveDialog';
import { Observable } from 'rxjs/internal/Observable';
import { GameWorkflowStateEnum, RaceEnum } from '../../classes/models/Enums';
import { race } from 'rxjs';
import { MatSelectModule } from "@angular/material/select";
import { RacePickingSectionComponent } from '../startupPanel/racePickingSection'
import { ClearingHelper } from '../../classes/helpers/ClearingHelper';
import { PlayerBoardComponent } from '../playerBoard/playerBoard';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'game',
    standalone: true,
    imports: [CommonModule, RouterOutlet, BoardComponent, MatSelectModule, RacePickingSectionComponent, PlayerBoardComponent],
    //templateUrl: './game.html',
    template: `
    <board id="boardWrapper" [clearings]="this.GetGS().Clearings" [clickEventEmitter]="clearingClickHandler" ></board>
    <div id="message">{{messageText}}</div>
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
    @if(ShowPlayerRacePicker())
    {
        <racePickingSection (StartClicked)="Start()" />
    }
    <div>
        <ul>
            <li *ngFor="let l of Log">{{l}}</li>
        </ul>
    </div>
    <div>
        <player-board  *ngFor="let p of this.GetGS().Players" [player]="p" ></player-board>
    </div>
    `,
    styleUrl: './game.css'
})
export class GameComponent
{
    messageText!: string;
    clearingClickHandler: EventEmitter<number>;
    moveMode: MoveMode;
    CancelButtonClickHandler: EventEmitter<number>;
    Asker: Asker;
    Log: string[];

    constructor(public dialog: MatDialog)
    {
        this.clearingClickHandler = new EventEmitter<number>();
        this.CancelButtonClickHandler = new EventEmitter<number>();
        this.moveMode = MoveMode.None;
        this.Log = [];

        this.Asker = new Asker(
            this,
            (c?: boolean, question?: string) => 
            {
                return this.GetNextClearingClickAsync(c, question);
            },
            (allowedIds: number[], question?: string, c?: boolean) => 
            {
                return this.GetNextClearingClickFilteredAsync(allowedIds, question, c);
            });

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

    SetMessageText(text: string): void
    {
        this.messageText = text;
    }

    Test()
    {
        console.log(GameManager.GameState);
        //var q = this.Asker.AskPrompt("kolko?",["1","2"],false);
        //console.log(q);
    }





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
                p.Hand.push(GameManager.DrawCard());
                p.Hand.push(GameManager.DrawCard());
                p.Hand.push(GameManager.DrawCard());
            }

            p.SetRace();
            var sc = await p.Race.Setup(this.Asker, usedStartingClearings);
            usedStartingClearings.push(sc);
        }

        GameManager.GameState.GameWorkflowState = GameWorkflowStateEnum.Game;

        for (let index = 0; true; index++)
        {
            this.Log.push(`Round ${index} start.`);

            for (let index = 1; index < GameManager.GameState.Players.length; index++)
            {
                
                var p = GameManager.GameState.Players[index];
                this.Log.push(`${RaceEnum[p.RaceEnum]} start.`);

                p.Race.Morning();


            }
        }



    }

    Reset() { }



    async Execute(command: string)
    {
        // var q = await this.GetNextClearingClickAsync();
        // console.log(q);
        // var id = Number(command);
        // var r = GameManager.GetClearingById(id).GetWhoRulesClearing();

        // console.log(`Clearing[${id}] is ruled by [${r === null ? "noone" : RaceEnum[r]}]`)

        // GameManager.ExecCommand(command);
    }

    ResetMoveMode(wasCanceled: boolean = true)
    {
        this.messageText = "";
        this.moveMode = MoveMode.None;
        if (wasCanceled) console.log("move cancelled");
    };


    async Move()
    {
        console.info("in move");
        var moveFrom: number = -1;
        var moveTo: number = -1;

        var availableClearingsToMoveFrom = [1, 2, 3]; //temp
        var pFrom = this._getNextClearingClickFiltered(availableClearingsToMoveFrom, true).then(i => moveFrom = i);
        this.messageText = "select clearing to move from";
        await pFrom;

        if (moveFrom === -1)
        {
            this.ResetMoveMode();
            return;//cancelled action
        }

        //todo filter where can move to
        var pMoveTo = this._getNextClearingClick().then(i => moveTo = i);
        this.messageText = "select clearing to move into";
        await pMoveTo;

        if (moveTo === -1)
        {
            this.ResetMoveMode();
            return;//cancelled action
        }

        console.log(`user selected to move from [${moveFrom}] and to [${moveTo}]`);

        let dialogRef = this.dialog.open(MoveDialog, {
            data: GameManager.GetClearingById(moveFrom).GetAmountOfWarOfPlayer(GameManager.GetActivePlayer().RaceEnum)
        });

        var qq: number = -1;
        var qwe = this.getNextValueFromSub(dialogRef.afterClosed()).then(i =>
        {
            if (i === undefined)
                qq = -1;
            else
                qq = Number(i);
        });

        await qwe;
        console.log(`output from modal is ${qq} `);

        if (qq === -1)
        {
            this.ResetMoveMode();
            return;
        }

        GameManager.Move(moveFrom, moveTo, qq);
        this.ResetMoveMode(false);
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

    private async _getNextClearingClickFiltered(allowedIds: number[], cancelable: boolean = false): Promise<number>
    {


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
                GameManager.GetClearingById(i).Highlighted = false;
            });

            callback(value);
        })
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
