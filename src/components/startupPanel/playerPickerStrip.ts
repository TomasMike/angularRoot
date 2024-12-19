import { Component, EventEmitter, Input, Output, input } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { EnumHelper, RaceEnum } from "../../classes/models/Enums";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Player } from "../../classes/Player";

@Component({
    selector: 'playerPickerStrip',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    template: `
    <div>
        <span>Player {{player.Number}}</span>
        <select id="test" #o value="3" (change)="test(o.value)">
            <!-- @for (item of races; track item) {
                <option [value]="item.value" selected="{{player.RaceEnum == item.value ? "selected":""}}">{{player.RaceEnum}}{{item.text}} </option>
            } -->
             @for (item of races; track item) {
                <option [value]="item.value"    [selected]="player.RaceEnum == item.value">{{item.text}} </option>
            } 
        </select>
        <!-- <button (click)="test()">test</button> -->
    </div>
    `,
})
export class PlayerPickerStripComponent
{
    @Input() player!: Player;
    races: { value: RaceEnum, text: string }[] = [];
    constructor()
    {
        this.races  = EnumHelper.GetEnumArray(RaceEnum);
    }

    //selectedValue: string = "";
    



    test(t:string)
    {
        this.player.RaceEnum = Number(t);
    }

}

