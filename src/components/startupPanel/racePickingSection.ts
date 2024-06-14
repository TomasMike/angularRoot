import { Component, EventEmitter, Input, input, Output } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { EnumHelper, RaceEnum } from "../../classes/models/Enums";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Player } from "../../classes/Player";
import { PlayerPickerStripComponent } from "./playerPickerStrip";
import { CommonModule } from "@angular/common";
import { GameManager } from "../../classes/GameManager";
import { TArray } from "../../classes/types/TArray";

@Component({
    selector: 'racePickingSection',
    standalone: true,
    imports: [PlayerPickerStripComponent, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule],
    template: `
    <div id="startupPanel">
        <div style="border-top:1px black solid">
            <playerPickerStrip  *ngFor="let c of this.players" [player]="c"  ></playerPickerStrip>
        </div>
        <button (click)="AddPlayer()">+</button>
        <button (click)="RemoveLast()">x</button>
    </div>
    <button (click)="Start()">Start</button>
    `,
})
export class RacePickingSectionComponent
{
    @Output() StartClicked = new EventEmitter();
    players: TArray<Player>;

    constructor()
    {
        //if(this.qwe == null) throw new Error();
        this.players = new TArray<Player>();
        this.players.push(new Player(1, RaceEnum.MarquiseDeCat));
    }

    AddPlayer()
    {
        let nextRace: RaceEnum = RaceEnum.MarquiseDeCat;
        while (this.players.some(p => p.RaceEnum === nextRace))
        {
            nextRace++;
        }

        this.players.push(new Player(this.players.length + 1, nextRace));
    }
    RemoveLast()
    {
        this.players.pop();
    }
    Start()
    {
        GameManager.GameState.Players = this.players;
        this.StartClicked.emit();
    }
}

