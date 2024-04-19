import { Component, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';
import { GameManager } from '../../classes/GameManager';
import { GameState } from '../../classes/GameState';


@Component({
  selector: 'game',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './game.html',
 
  styleUrl: './game.css'
})

export class GameComponent 
{
   gs:GameState;
    
    constructor()
    {
        this.gs = GameManager.GetGameData();
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
        GameManager.gameState.Clearings = [];
    }
}
