import { Component } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { EnumHelper, RaceEnum } from "../../classes/models/Enums";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Player } from "../../classes/Player";

@Component({
    selector: 'playerPicker',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    template: `
    <div id="startupPanel">
           
    <mat-form-field>
            <mat-label>Race</mat-label>
            <mat-select name="raceasi" >
                @for (item of races; track item) {
                    <mat-option [value]="item.value">{{item.text}}</mat-option>
                }
            </mat-select>
        </mat-form-field>
    </div>
    <!-- <mat-form-field>
        <mat-label>Favorite food</mat-label>
        <mat-select [(ngModel)]="selectedValue" name="food">
            @for (food of foods; track food) {
                <mat-option [value]="food.value">{{food.viewValue}}</mat-option>
            }
        </mat-select>
  </mat-form-field> -->
   <span>{{selectedValue}}</span>
       `,
})
export class PlayerPickerComponent
{
    selectedValue: string = "";
    races: { value: RaceEnum, text: string }[] = EnumHelper.GetEnumArray(RaceEnum);
  

    players:Player[];

    constructor()
{
    this.players = [];
    this.players.push(new Player(1,RaceEnum.MarquiseDeCat));
}
}

