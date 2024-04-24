import { Component, EventEmitter, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { GameState } from '../../classes/GameState';
import { WarriorPieceModel } from '../../classes/models/WarriorPieceModel';
import { RaceEnum } from '../../classes/models/ClearingModel';



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
    messageText!:string;

    clearingClickHandler: EventEmitter<number>;

    constructor() {
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
        console.log(this.nieco());
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
    Execute(command:string){
        GameManager.ExecCommand(command);
    }
    async Move()
    {
        
        this.messageText="select clearing to move from";
        var s = this.clearingClickHandler.subscribe(
            i => {
                console.log("in game, got" + i);
                s.unsubscribe();
                this.messageText="select clearing to move into";

                var ss = this.clearingClickHandler.subscribe(
                    i => {
                        console.log("in game, got" + i);
                        ss.unsubscribe();
                        this.messageText="select clearing to move into";
                    });
            });
        
        console.log("out of move func");
    }

    async nieco():Promise<void>{
        var ss = this.clearingClickHandler.subscribe(
            i => {
                console.log("in nieco, got" + i);
                ss.unsubscribe();
                return i;
            });
    }
}
