import { Component, EventEmitter, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { GameState } from '../../classes/GameState';
import { MatDialog, } from '@angular/material/dialog';
import { MoveDialog } from '../dialog/moveDialog';
import { Observable } from 'rxjs/internal/Observable';
import { Dictionary } from '../../classes/types/Dictionary';
import { ComponentInfo } from '../../classes/ComponentInfo';
import KeyValuePair from '../../classes/types/KeyValuePair';
import { ComponentHelper } from '../../classes/helpers/ComponentHelper';
import { ComponentTypeEnum, RaceEnum } from '../../classes/models/Enums';
import { mergeAll } from 'rxjs';


@Component({
    selector: 'game',
    standalone: true,
    imports: [RouterOutlet, BoardComponent],
    //templateUrl: './game.html',
    template: `
    <board id="boardWrapper" [clearings]="this.gs.Clearings" [clickEventEmitter]="clearingClickHandler" ></board>
    <div id="message">{{messageText}}</div>
    <div id="buttonsPanel">
        <div><button (click)="Start()">Start</button></div>
        <!-- <div><button (click)="Reset()">Reset</button></div> -->
        <div><button (click)="Spawn()">Spawn</button></div>
        <div><button (click)="Move()">Move</button></div>
        <div>
            <button  (click)="Execute(cmd.value)">Execute</button>
            <input #cmd type="text" id="cmd">
        </div>
    </div>
       `,
    styleUrl: './game.css'
})

export class GameComponent
{
    gs: GameState;
    messageText!: string;
    clearingClickHandler: EventEmitter<number>;

    constructor(public dialog: MatDialog)
    {
        this.gs = GameManager.GetGameData();

        this.clearingClickHandler = new EventEmitter<number>();

        //malo by byt volane az po button-Start
        GameManager.Start();
        console.log("GameComponent.constructor");
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
        if(r === null)

        console.log(`Clearing[${id}] is ruled by [${r === null ? "noone": RaceEnum[r]}]`)
        
        GameManager.ExecCommand(command);
    }

    async Move()
    {
        var moveFrom: number = -1;
        var moveTo: number = -1;

        this.messageText = "select clearing to move from";

        var p = this.getNextClickFiltered([1, 2, 3]).then(i => moveFrom = i);
        await p;

        var promise = this.getNextClick().then(i =>
        {
            moveFrom = i;
        });

        await promise;

        console.log("after await in move,from is  " + moveFrom);

        this.messageText = "select clearing to move into";

        var promise = this.getNextClick().then(i =>
        {
            moveTo = i;
        });

        await promise;

        console.log(`user selected to move from [${moveFrom}] and to [${moveTo}]`);

        let dialogRef = this.dialog.open(MoveDialog, {
            data: GameManager.GetClearingById(moveFrom).GetAmountOfWarOfPlayer(GameManager.GetActivePlayer().Race)
        });

        var qq: number = -1;
        var promise = this.getNextValueFromSub(dialogRef.afterClosed()).then(i =>
        {
            qq = Number(i);
        });

        await promise;
        this.messageText = "output from modal is " + qq;

        GameManager.Move(moveFrom, moveTo, qq);

    }

    /**
     * get next click on clearing
     */
    async getNextClick(): Promise<number>
    {
        return new Promise<number>(async callback =>
        {
            var s = this.clearingClickHandler.subscribe(i =>
            {

                s.unsubscribe();
                callback(i);
            });
        });
    }

    async getNextClickFiltered(allowedIds: number[]): Promise<number>
    {

        mergeAll()
        return new Promise<number>(async callback =>
        {
            let value = -1;

            do
            {
                console.log(`waiting for click in filtered`);

                var promise = this.getNextClick().then(i =>
                {
                    value = i;
                });
                await promise;
                console.log(`got ${value}`);
            } while (!allowedIds.includes(value))

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
