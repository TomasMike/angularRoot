import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { EyrieDynastiesRace } from "../../races/EyrieDynastiesRace";

@Component({
    selector: 'eyrieDynastiesBoard',
    standalone: true,
    template: `<div class="board">
        <table id="eye">
          <tr>
            <td></td>
          </tr>
        </table>
    </div>`,
    imports: [CommonModule]
})
export class EyrieDynastiesBoardComponent
{
    @Input() model!: Player;
    race: EyrieDynastiesRace;
    type: RaceEnum;

    constructor()
    {
        this.type = this.model.RaceEnum;
        this.race = this.model.Race as EyrieDynastiesRace;
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