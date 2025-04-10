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
    .clearing {
        &.highlightedClearing {
            outline: 10px solid cyan;
            animation: border-pulsate 2s infinite;
            
        }

        width: 50px;
        height: 50px;
        outline: solid black 2px;
        position: absolute;
        color: black;
        background-color: white;
        font-size: 9px;
    }

    @keyframes border-pulsate {
	0% {
		outline-color:red;
	}
	50% {
		border-color: rgba(22, 205, 89, 0.936);
	}
	100% {
		border-color: rgb(43, 0, 255);
	}
}

    .mouseClearing div.clearingSuit {
        background-color: orange;
    }

    .foxClearing div.clearingSuit {
        background-color: red;
    }

    .rabbitClearing div.clearingSuit {
        background-color: yellow;
    }

    .clearingHeaderWrapper div {
        /* display: inline-block; */
        border-bottom: 1px black solid;
    }

    .clearingHeaderWrapper div.clearingId {
        float: left;
        width: 15px;
        text-align: center;
    }

    .clearingHeaderWrapper div.clearingSuit {
        padding-left: 2px;
        overflow: hidden;
        text-align: center;
    }

    .pieceGrouping {
        padding-left: 2px;
    }

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

    GetRulingClass(): string
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