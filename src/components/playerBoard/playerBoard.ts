import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";

@Component({
    selector: 'player-board',
    standalone: true,
    template:`<div class="board">
        <table>
            
            <tr>
                <td>{{model.Race}}
            </tr>
        </table>
    </div>`,
    imports: [CommonModule]
  })
  export class PlayerBoardComponent{
    @Input() model!:Player;
    
}