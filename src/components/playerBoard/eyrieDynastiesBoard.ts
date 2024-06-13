import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";

@Component({
    selector: 'eyrieDynastiesBoard',
    standalone: true,
    template: `<div class="board">
        <table id="mar">
            @if (this.type === 1) 
            {
            <tr>
                <td>{{model.Race}}</td>
            </tr>

            }
            <tr>
                <td>{{model.Race}}</td>
            </tr>
        </table>
    </div>`,
    imports: [CommonModule]
})
export class EyrieDynastiesBoardComponent
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