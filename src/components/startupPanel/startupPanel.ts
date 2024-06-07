import { Component, Input, Output, input } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { EnumHelper, RaceEnum } from "../../classes/models/Enums";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Player } from "../../classes/Player";
interface Food
{
    value: string;
    viewValue: string;
}
@Component({
    selector: 'startupPanel',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    template: `
    <mat-form-field>
        <mat-label>Race</mat-label>
        <mat-select name="raceasi" >
            @for (item of races; track item) {
                <mat-option [value]="item.value">{{item.text}}</mat-option>
            }
        </mat-select>
    </mat-form-field>
    `,
})
export class StartupPanelComponent
{
    @Input() pNumber!: number;
    //selectedValue: string = "";
    races: { value: RaceEnum, text: string }[] = EnumHelper.GetEnumArray(RaceEnum);

    player:Player;

    constructor()
{
    this.player = new Player();
    // this.players.push(new Player(1,RaceEnum.MarquiseDeCat));
}
}

