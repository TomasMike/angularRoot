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
        <span>Player {{player.Number}}</span><select name="test" id="">
            @for (item of races; track item) {
                <option [value]="item.value">{{item.text}}</option>
            }
        </select>
    </div>
    `,
})
export class PlayerPickerStripComponent
{
    @Input() player!: Player;
    
    //selectedValue: string = "";
    races: { value: RaceEnum, text: string }[] = EnumHelper.GetEnumArray(RaceEnum);





}

