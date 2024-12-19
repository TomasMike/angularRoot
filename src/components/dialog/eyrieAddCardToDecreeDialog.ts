import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from '@angular/material/input';
import { Player } from "../../classes/Player";
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from "@angular/common";
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'eyrieAddCardToDecreeDialog',
    template: `
<h2 mat-dialog-title>March</h2>
<mat-dialog-content>
    <div>
        <h3 >Pick decree column:</h3>
        <mat-radio-group aria-label="Select decree column" [(ngModel)]="selectedAction">
            <mat-radio-button value="0">Recruit</mat-radio-button>
            <mat-radio-button value="1">Move</mat-radio-button>
            <mat-radio-button value="2">Battle</mat-radio-button>
            <mat-radio-button value="3">Build</mat-radio-button>
        </mat-radio-group>

        <mat-divider></mat-divider>
        <h3 >Pick card to put in the column:</h3>
        <mat-radio-group aria-label="Select card" [(ngModel)]="selectedCardId"  >
            <mat-radio-button value="{{c.Id}}"  *ngFor="let c of this.player.Hand.GetCards();let i = index" >{{i+1}}. {{c.Name}},{{c.Id}}</mat-radio-button>
        </mat-radio-group>
        <!-- <button [disabled]="this.val <= 1" (click)="change(-1)">-</button>{{this.val}}<button [disabled]="this.val >= this.moveMaxAmount" (click)="change(1)">+</button> -->
    </div>
</mat-dialog-content>
<mat-dialog-actions>
    <!-- <button mat-button [mat-dialog-close]="{{this.selectedAction}};{{}}">OK</button> -->
    <button mat-button [disabled]="!this.cancelable" [mat-dialog-close]="-1">Cancel</button>
    <button mat-button [disabled]="selectedAction == null && selectedCardId == null" [mat-dialog-close]="selectedAction + ';' + selectedCardId">Ok</button>
</mat-dialog-actions>
    `,
    standalone: true,
    imports: [
        MatDividerModule,
        CommonModule,
        MatRadioModule,
        MatDialogContent,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class AddDecreeDialog
{
    player!: Player;
    cancelable:boolean;
    selectedAction!:number;
    selectedCardId!:number;

    constructor(
        public dialogRef: MatDialogRef<AddDecreeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { player: Player,cancelable:boolean },
    )
    {
        this.player = data.player;
        this.cancelable = data.cancelable ?? false;
    }

}