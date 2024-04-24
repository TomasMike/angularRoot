import { Component, Input } from "@angular/core";
import { IPieceModel } from "../../classes/models/IPieceModel";
import { PieceGrouping } from "../../classes/models/WarriorPieceModel";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'piece-grouping',
    standalone: true,
    template:`<p class="{{model.componentRaceText}}">{{model.count}} {{model.componentTypeText}}</p>`,
    imports: [CommonModule]
  })
  export class PieceGroupingComponent{
    @Input() model!:PieceGrouping;
    
}