import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board';

@Component({
  selector: 'game',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './game.html',
 
  styleUrl: './game.css'
})

export class GameComponent {
  
    
    title = 'your-angular-project';
}
