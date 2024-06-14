import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { MarquiseDeCatBoardComponent } from "./marquiseDeCatBoard";
import { EyrieDynastiesBoardComponent } from "./eyrieDynastiesBoard";

@Component({
    selector: 'player-board',
    standalone: true,
    template: `<div class="board">
       @switch (model.RaceEnum) 
       {
            @case (1) {
                <marquiseDeCatBoard [model]="this.model.Race"/>
            }
            @case (2) {
                <eyrieDynastiesBoard [model]="this.model"/>
            }
       }
    </div>`,
    imports: [CommonModule, MarquiseDeCatBoardComponent, EyrieDynastiesBoardComponent]
})
export class PlayerBoardComponent
{
    @Input() model!: Player;

    type: RaceEnum;

    constructor()
    {
        this.type = this.model.RaceEnum;

        //     MarquiseDeCat,
        // EyrieDynasties,
        // WoodlandAlliance,
        // Vagabond,
        // LizardCult,
        // RiverfolkCompany,
        // UndergroundDuchy,
        // CorvidConspiracy,
        // LordOfTheHundreds,
        // KeepersInIron
    }
}