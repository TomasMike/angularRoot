import { Component, EventEmitter, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { GameState } from '../../classes/GameState';
import { MatDialog, } from '@angular/material/dialog';
import { MoveDialog } from '../dialog/moveDialog';
import { Observable } from 'rxjs/internal/Observable';
import { ComponentTypeEnum, EnumHelper, RaceEnum } from '../../classes/models/Enums';
import { fromEvent, interval, mergeAll, race } from 'rxjs';
import { MatSelectModule } from "@angular/material/select";
import {StartupPanelComponent} from '../startupPanel/startupPanel'
@Component({
    selector: 'game',
    standalone: true,
    imports: [RouterOutlet, BoardComponent,MatSelectModule,StartupPanelComponent],
    //templateUrl: './game.html',
    template: `
    <board id="boardWrapper" [clearings]="this.gs.Clearings" [clickEventEmitter]="clearingClickHandler" ></board>
    <div id="message">{{messageText}}</div>
    <div id="debugButtonsPanel">
        <div><button (click)="Start()">Start</button></div>
        <!-- <div><button (click)="Reset()">Reset</button></div> -->
        <div><button (click)="Spawn()">Spawn</button></div>
        <div><button (click)="MoveButtonClick()">{{getMoveBtnText()}}</button></div>
        <div>
            <button  (click)="Execute(cmd.value)">Execute</button>
            <input #cmd type="text" id="cmd">
        </div>
        <div><button #can id="cancel" (click)="this.CancelButtonClickHandler.emit(-1)">cancel</button></div>
    </div>
    <startupPanel/>
       `,
    styleUrl: './game.css'
})



export class GameComponent
{
    gs: GameState;
    messageText!: string;
    clearingClickHandler: EventEmitter<number>;
    moveMode: MoveMode;
    CancelButtonClickHandler: EventEmitter<number>;



    constructor(public dialog: MatDialog)
    {
        this.gs = GameManager.GetGameData();

        this.clearingClickHandler = new EventEmitter<number>();
        this.CancelButtonClickHandler = new EventEmitter<number>();
        this.moveMode = MoveMode.None;

        //malo by byt volane az po button-Start
        GameManager.Start();
        console.log("GameComponent.constructor");
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

    Start()
    {
        console.log("GameComponent.Start");
        GameManager.Start();
    }

    Reset()
    {
        //GameManager.gameState.Clearings = [];
        // console.log(this.nieco());
    }

    Spawn()
    {
        GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Warrior, 1);
        GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Warrior, 2);
        GameManager.SpawnPiece(ComponentTypeEnum.WoodlandAlliance_Warrior, 3);
        GameManager.SpawnPiece(ComponentTypeEnum.Vagabond_Pawn, 4);
        GameManager.SpawnPiece(ComponentTypeEnum.RiverfolkCompany_Warrior, 5);
        GameManager.SpawnPiece(ComponentTypeEnum.LizardCult_Warrior, 6);
        GameManager.SpawnPiece(ComponentTypeEnum.UndergroundDuchy_Warrior, 7);
        GameManager.SpawnPiece(ComponentTypeEnum.CorvidConspiracy_Warrior, 8);
        GameManager.SpawnPiece(ComponentTypeEnum.LordOfTheHundreds_Warrior, 9);
        GameManager.SpawnPiece(ComponentTypeEnum.KeepersInIron_Warrior, 10);
    }

    async Execute(command: string)
    {
        var id = Number(command);
        var r = GameManager.GetClearingById(id).GetWhoRulesClearing();

        console.log(`Clearing[${id}] is ruled by [${r === null ? "noone" : RaceEnum[r]}]`)

        GameManager.ExecCommand(command);
    }

    ResetMoveMode(wasCanceled:boolean = true)
    {
        this.messageText = "";
        this.moveMode = MoveMode.None;
        if(wasCanceled)console.log("move cancelled");
    };

    async Move()
    {
        console.info("in move");
        var moveFrom: number = -1;
        var moveTo: number = -1;

        var availableClearingsToMoveFrom = [1, 2, 3]; //temp
        var pFrom = this.getNextClickFiltered(availableClearingsToMoveFrom, true).then(i => moveFrom = i);
        this.messageText = "select clearing to move from";
        await pFrom;

        if (moveFrom === -1)
        {
            this.ResetMoveMode();
            return;//cancelled action
        }

        //todo filter where can move to
        var pMoveTo = this.getNextClick().then(i => moveTo = i);
        this.messageText = "select clearing to move into";
        await pMoveTo;

        if (moveTo === -1)
        {
            this.ResetMoveMode();
            return;//cancelled action
        }

        console.log(`user selected to move from [${moveFrom}] and to [${moveTo}]`);

        let dialogRef = this.dialog.open(MoveDialog, {
            data: GameManager.GetClearingById(moveFrom).GetAmountOfWarOfPlayer(GameManager.GetActivePlayer().Race)
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

    /**
     * get next click on clearing
     */
    async getNextClick(cancelable: boolean = false): Promise<number>
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

    async getNextClickFiltered(allowedIds: number[], cancelable: boolean = false): Promise<number>
    {
        return new Promise<number>(async callback =>
        {
            let value = -1;

            while (true)
            {
                var promise = this.getNextClick(cancelable).then(i =>
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
}

export enum MoveMode
{
    None,
    Selecting
}
