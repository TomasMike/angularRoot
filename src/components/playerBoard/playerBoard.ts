import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Player } from "../../classes/Player";
import { RaceEnum } from "../../classes/models/Enums";
import { MarquiseDeCatBoardComponent } from "./marquiseDeCatBoard";
import { EyrieDynastiesBoardComponent } from "./eyrieDynastiesBoard";
import { IRace } from "../../races/IRace";

@Component({
    selector: 'player-board',
    standalone: true,
    template: `<div class="pBoard">
        <button (click)="C()" >t</button>
        @if(this.player !== undefined)
        {
            <div>test</div>
            <div>{{this.player.RaceEnum}}</div>
            @switch (this.player.RaceEnum) 
            {
                @case (0) {
                    <marquiseDeCatBoard [model]="this.player"/>
                }
                @case (1) {
                    <eyrieDynastiesBoard [model]="this.player"/>
                }
              @default {
                <div>default</div>
              }
            }
        }
      
    </div>`,
    imports: [CommonModule, MarquiseDeCatBoardComponent, EyrieDynastiesBoardComponent]
})
export class PlayerBoardComponent
{
    @Input() player!: Player;
    //p: Player|null;
    //type: RaceEnum;

    constructor()
    {
        // if(this.player !== undefined)
        //     this.p = this.player;
        // else
        // {
        //     this.p = null;
        // }
        console.log(`this.model is ${this.player}`);
        //this.type = this.model.RaceEnum;

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

    C()
    {
        console.log(this.player);
    }


}