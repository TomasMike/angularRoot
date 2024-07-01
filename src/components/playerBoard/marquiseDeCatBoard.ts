import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { MarquiseDeCatRace } from "../../races/MarquiseDeCatRace";
import { IRace } from "../../races/IRace";
import { GameManager } from "../../classes/GameManager";
import { retry } from "rxjs";

@Component({
    selector: 'marquiseDeCatBoard',
    standalone: true,
    template: `<div class="MarquiseDeCat">
        <table>
            @if (this.Race !== undefined && this.Race !== null) 
            {
                <tr>
                    <td>WoodReserve:</td>
                    <td>{{this.Race.WoodReserve}}</td>
                </tr>
                <tr>
                    <td>WarriorsReserve:</td>
                    <td>{{this.Race.WarriorsReserve}}/25</td>
                </tr>
                <tr>
                    <td>RecruiterReserve:</td>
                    <td>{{this.Race.RecruiterReserve}}</td>
                </tr>
                <tr>
                    <td>WorkshopReserve:</td>
                    <td>{{this.Race.WorkshopReserve}}</td>
                </tr>
                <tr>
                    <td>SawmillReserve:</td>
                    <td>{{this.Race.SawmillReserve}}</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button (click)="Battle()" disabled="this.CanBattle()" >Battle</button>
                        <button (click)="March()">March</button>
                        <button (click)="Recruit()">Recruit</button>
                        <button (click)="Build()">Build</button>
                        <button (click)="Overwork()">Overwork</button>
                        <button (click)="Battle()">Battle</button>
                    </td>
                </tr>
            }
         </table>
    </div>`,
    imports: [CommonModule]
})
export class MarquiseDeCatBoardComponent
{
    @Input() player!: Player;
    race!: MarquiseDeCatRace;

    get Race(): MarquiseDeCatRace | null
    {
        return this.player === undefined ? null : this.player.Race as MarquiseDeCatRace;
    }



    type!: RaceEnum;

    constructor()
    {



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



    CanBattle(): boolean
    {
        return this.Race == null ? false : GameManager.GameState.Clearings.some(c => c.CanRaceFightHere(this.Race!.RaceEnum));
    }
    Battle()
    {
        console.log(this.race);
    }
    March()
    {

    }
    Recruit()
    {

    }
    Build()
    {

    }
    Overwork()
    {

    }
}