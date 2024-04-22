import { Component, Input, OnInit, inject } from '@angular/core';
import { ClearingSuitEnum, ClearingModel } from '../../classes/models/ClearingModel';
import { ClearingComponent } from "../clearing/clearing";
import { CommonModule } from '@angular/common';
import { ExpressionStatement } from '@angular/compiler';
import { GameManager } from '../../classes/GameManager';

@Component({
    standalone: true,
    selector: 'board',
    //templateUrl: './board.html',
    template: `
    <div id="board">
        <clearing *ngFor="let c of clearings" [Clearing]="c" ></clearing>
    </div>
    `,
    styleUrl: './board.css',
    imports: [ClearingComponent, CommonModule]
})
export class BoardComponent implements OnInit {
    @Input() clearings!: ClearingModel[];
    GameManager = inject(GameManager);


    ngOnInit(): void {
        console.log("test");
        var data = GameManager.GetGameData();
        if (data != null) {

        }
    }





}
