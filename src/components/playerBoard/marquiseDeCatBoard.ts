import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";

@Component({
    selector: 'marquiseDeCatBoard',
    standalone: true,
    template: `<div class="board">
        <table id="mar">
           
        </table>
    </div>`,
    imports: [CommonModule]
})
export class MarquiseDeCatBoardComponent
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