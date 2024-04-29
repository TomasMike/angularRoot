import { Component, EventEmitter, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { GameState } from '../../classes/GameState';
import { WarriorPieceModel } from '../../classes/models/WarriorPieceModel';
import { RaceEnum } from '../../classes/models/ClearingModel';
import { MatDialog, } from '@angular/material/dialog';
import { DialogData, MoveDialog } from '../dialog/moveDialog';
import { Observable } from 'rxjs/internal/Observable';


@Component({
    selector: 'game',
    standalone: true,
    imports: [RouterOutlet, BoardComponent],
    //templateUrl: './game.html',
    template: `
    <board [clearings]="this.gs.Clearings" [clickEventEmitter]="clearingClickHandler" ></board>
    <div id="message">{{messageText}}</div>
    <div>
        <div><button (click)="Start()">Start</button></div>
        <div><button (click)="Reset()">Reset</button></div>
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

export class GameComponent {
    gs: GameState;
    messageText!: string;



    clearingClickHandler: EventEmitter<number>;

    constructor(public dialog: MatDialog) {
        this.gs = GameManager.GetGameData();

        this.clearingClickHandler = new EventEmitter<number>();

        //malo by byt volane az po button-Start
        GameManager.Start();
        console.log("GameComponent.constructor");
    }

    Start() {
        console.log("GameComponent.Start");
        GameManager.Start();

    }
    Reset() {
        //GameManager.gameState.Clearings = [];
        // console.log(this.nieco());
    }
    Spawn() {
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.MarquiseDeCat), 1);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.EyrieDynasties), 2);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.WoodlandAlliance), 3);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.Vagabond), 4);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.LizardCult), 5);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.RiverfolkCompany), 6);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.UndergroundDuchy), 7);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.CorvidConspiracy), 8);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.LordOfTheHundreds), 9);
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.KeepersInIron), 10);
    }
    async Execute(command: string) {
        // GameManager.ExecCommand(command);
       
       
    }

    async Move() {

        var moveFrom: number = -1;
        var moveTo: number = -1;

        this.messageText = "select clearing to move from";

        var promise = this.getNextClick().then(i => {
            moveFrom = i;
        });

        await promise;

        console.log("after await in move,from is  " + moveFrom);

        this.messageText = "select clearing to move into";

        var promise = this.getNextClick().then(i => {
            moveTo = i;
        });

        await promise;

        console.log(`user selected to move from [${moveFrom}] and to [${moveTo}]`);

        let dialogRef = this.dialog.open(MoveDialog,{
            data: new DialogData(4)
        });

        var qq:number = -1;
        var promise = this.getNextValueFromSub(dialogRef.afterClosed()).then(i => {
            qq = Number(i);
        });

        await promise;
        this.messageText = "output from modal is " + qq;

    }

    /**
     * get next click on clearing
     */
    async getNextClick(): Promise<number> {
        return new Promise<number>(async callback => {
            var s = this.clearingClickHandler.subscribe(i => {
                s.unsubscribe();
                callback(i);
            });
        });
    }

    async getNextValueFromSub<T>(o: Observable<T>): Promise<T> {
        return new Promise<T>(async callback => {
            var s = o.subscribe(i => {
                s.unsubscribe();
                callback(i);
            });
        });
    }
}
