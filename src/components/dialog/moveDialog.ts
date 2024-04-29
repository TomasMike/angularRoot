import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
<h2 mat-dialog-title>March</h2>
<mat-dialog-content>
    <div>
        <button [disabled]="this.val <= 1" (click)="change(-1)">-</button>{{this.val}}<button [disabled]="this.val >= this.moveMaxAmount" (click)="change(1)">+</button>
    </div>
</mat-dialog-content>
    <mat-dialog-actions>
  <button mat-button [mat-dialog-close]="-1">Cancel Move</button>
  <button mat-button [mat-dialog-close]="val">Ok</button>
  </mat-dialog-actions>
    `,
    standalone: true,
    imports: [
        MatDialogContent,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class MoveDialog
{
    val: number = 1;
    moveMaxAmount!: number;

    constructor(
        public dialogRef: MatDialogRef<MoveDialog>,
        @Inject(MAT_DIALOG_DATA) public data: number,
    )
    {
        this.moveMaxAmount = data;
    }

    change(n: number)
    {
        this.val = this.val + n;
    }
}