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
    @Input() player!: Player;
    race!: EyrieDynastiesRace;

    get Race(): EyrieDynastiesRace | null
    {
        return this.player === undefined ? null:this.player.Race as EyrieDynastiesRace;
    }
    constructor()
    {
        // this.type = this.player.RaceEnum;
        // this.race = this.player.Race as EyrieDynastiesRace;
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