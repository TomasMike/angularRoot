import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PieceGroupingModel } from "../../classes/models/PieceGroupingModel";

@Component({
    selector: 'piece-grouping',
    standalone: true,
    template:`<p class="pieceGrouping {{model.GetComponentRaceText()}}">{{model.count}} {{model.GetComponentTypeText()}}</p>`,
    imports: [CommonModule]
  })
  export class PieceGroupingComponent{
    @Input() model!:PieceGroupingModel;
    
}