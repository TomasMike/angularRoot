import { Component, Input, inject } from '@angular/core';
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
    <board [clearings]="this.gs.Clearings" ></board>
    <div>
        <div><button (click)="Start()">Start</button></div>
        <div><button (click)="Reset()">Reset</button></div>
        <div><button (click)="Spawn()">Spawn</button></div>
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

    constructor() {
        this.gs = GameManager.GetGameData();

        //malo by byt volane az po button-Start
        GameManager.Start();
        console.log("GameComponent.constructor");
    }

    Start() {
        console.log("GameComponent.Start");
        GameManager.Start();

    }
    Reset() {
        GameManager.gameState.Clearings = [];
    }
    Spawn() {
        GameManager.SpawnPiece(new WarriorPieceModel(RaceEnum.MarquiseDeCat), 1);
    }
    Execute(command:string){
        GameManager.ExecCommand(command);
    }
}
