import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { MarquiseDeCatRace } from "../../races/MarquiseDeCatRace";
import { IRace } from "../../races/IRace";
import { GameManager } from "../../classes/GameManager";

@Component({
    selector: 'marquiseDeCatBoard',
    standalone: true,
    template: `<div class="board">
        <div>WoodReserve:{{this.m.WoodReserve}}</div>
        <div>
            <button (click)="Battle()" disabled="this.CanBattle()" >Battle</button>
            <button (click)="March()">March</button>
            <button (click)="Recruit()">Recruit</button>
            <button (click)="Build()">Build</button>
            <button (click)="Overwork()">Overwork</button>
            <button (click)="Battle()">Battle</button>
        </div>

    </div>`,
    imports: [CommonModule]
})
export class MarquiseDeCatBoardComponent
{
    @Input() model!: IRace;
    m: MarquiseDeCatRace;


    type: RaceEnum;

    constructor()
    {
        this.type = this.model.RaceEnum;
        this.m = this.model as MarquiseDeCatRace;

        var q = this.m.WoodReserve;

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

    CanBattle():boolean
    {
        return GameManager.GameState.Clearings.some(c=>c.CanRaceFightHere(this.model.RaceEnum));
    }
    Battle()
    {

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