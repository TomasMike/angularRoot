import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { EyrieDynastiesRace } from "../../races/EyrieDynastiesRace";

@Component({
    selector: 'eyrieDynastiesBoard',
    standalone: true,
    template: `<div class="board EyrieDynasties">
        <table id="eye">
            @if (this.Race !== undefined && this.Race !== null) {
                <tr class="decreeRow">
                    <td>
                        @for (item of this.Race.Decree.recruit; track $index) {
                            <div class="{{item.SuitText}}"></div>
                        }
                    </td>
                    <td>
                        @for (item of this.Race.Decree.move; track $index) {
                            <div class="{{item.SuitText}}"></div>
                        }
                    </td>
                    <td>
                        @for (item of this.Race.Decree.battle; track $index) {
                            <div class="{{item.SuitText}}"></div>
                        }
                    </td>
                    <td>
                        @for (item of this.Race.Decree.build; track $index) {
                            <div class="{{item.Suit}}"></div>
                        }
                    </td>
                </tr>
                
                <tr>
                    <td colspan="2">Warrior Reserve:</td>
                    <td colspan="2">{{this.Race.WarriorsReserve }}</td>
                </tr>
                <tr>
                    <td colspan="2">Roost Reserve:</td>
                    <td colspan="2">{{this.Race.RoostReserve }}</td>
                </tr>
            }
        </table>
    </div>`,
    imports: [CommonModule]
})
export class EyrieDynastiesBoardComponent
{
    @Input() player!: Player;
    //race!: EyrieDynastiesRace;

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