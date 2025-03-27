import { Component, EventEmitter, Input, OnInit, Output, output } from "@angular/core";
import { ClearingModel } from "../../classes/models/ClearingModel";
import { CommonModule } from "@angular/common";
import { PieceGroupingComponent } from "../piece/pieceGrouping";
import { RaceEnum } from "../../classes/models/Enums";
// import { PieceGroupingComponent } from "../piece/pieceGrouping";


@Component({
    standalone: true,
    selector: "clearing",
    template: `
    <div id="{{Clearing.Id}}" class="{{GetHightlightClass()}} clearing {{Clearing.SuitText.toLocaleLowerCase()}}Clearing" style="top:{{Clearing.Top}}px;left:{{Clearing.Left}}px;" (click)="onClickHandler()">
        <div class="clearingHeaderWrapper">
            <div class="clearingId {{GetRulingClass()}}">{{Clearing.Id}}</div>
            <div class="clearingSuit">{{Clearing.Suit}}</div>
        </div>
        <!-- <piece-grouping [model]="q"] /> -->
        <piece-grouping *ngFor="let g of this.Clearing.Pieces" [model]="g" />

    </div>
    `,
    styles: `
    // .clearing{
    //     width:50px;
    //     height:50px;
    //     border-width:2px;
    //     border-style:solid;
    //     position:absolute;
    //     color:black;
    //     background-color:white;
    //     font-size:9px;
    // }

    p{
        margin:0px;
    }
    `,
    imports: [CommonModule, PieceGroupingComponent]
})
export class ClearingComponent implements OnInit
{
    @Input() Clearing!: ClearingModel;
    @Input() onClearingClickEmitter = new EventEmitter<number>();

    onClickHandler()
    {
        this.onClearingClickEmitter.emit(this.Clearing.Id);
    }

    GetHightlightClass(): string
    {
        return this.Clearing.Highlighted ? "highlightedClearing" : "";
    }

    GetRulingClass()
    {
        var r = this.Clearing.GetWhoRulesClearing();
        return r == null ? "" : RaceEnum[r];
    }


    ngOnInit(): void
    {
        //this.onClearingClickEmitter.subscribe(id => console.log("in subscribe i got[" + id + "]"));

        //this.q = new PieceGrouping("test");
        // var canvas = <HTMLCanvasElement>document.getElementById('i');
        // var context = canvas.getContext('2d');
        // canvas.height = 500;
        // canvas.width = 500;
        // context!.beginPath();
        // context!.moveTo(100, 150);
        // context!.lineTo(450, 50);
        // context!.stroke();
    }
}