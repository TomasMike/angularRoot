import { Component, Input, OnInit } from "@angular/core";
import { ClearingModel, ClearingSuitEnum } from "../../classes/models/ClearingModel";
import { CommonModule } from "@angular/common";
import { PieceGrouping } from "../../classes/models/WarriorPieceModel";
// import { PieceGroupingComponent } from "../piece/pieceGrouping";


@Component({
    standalone: true,
    selector: "clearing",
    template: `
    <!-- <div id="{{Clearing.Id}}" class="clearing {{Clearing.Suit}}Clearing" style="top:{{Clearing.Top}}px;left:{{Clearing.Left}}px;"><p>{{Clearing.Id}}-{{Clearing.Suit}}</p>
    </div> -->
    `,
    styles: `
    .clearing{
        width:50px;
        height:50px;
        border-width:2px;
        border-style:solid;
        position:absolute;
        color:black;
        background-color:white;
        font-size:9px;
    }
    .FoxClearing {
        border-color:red;
    }
    .RabbitClearing {
        border-color:yellow;
    }
    .MouseClearing {
        border-color:orange;
    }
    p{
        margin:0px;
    }
    `,
    imports: [CommonModule]
})
export class ClearingComponent implements OnInit {
    @Input() Clearing!: ClearingModel;

    // GetGroupings():PieceGrouping[]
    // {
    //     var d: PieceGrouping[]= [];
    //     this.Clearing.Pieces.forEach(piece => 
    //     {
    //         var q =  d.find(a => a.type === piece.ComponentCode());
             
    //         if(q === undefined)
    //             d.push(new PieceGrouping(piece.ComponentCode()))
    //         else
    //             q.count = q?.count + 1;
    //     });

    //     return d;
    // }

    ngOnInit(): void {
        // var canvas = <HTMLCanvasElement>document.getElementById('i');
        // var context = canvas.getContext('2d');
        // canvas.height = 500;
        // canvas.width = 500;
        // context!.beginPath();
        // context!.moveTo(100, 150);
        // context!.lineTo(450, 50);
        // context!.stroke();
    }

    private qwe()
    {
        var d = [];

    }



}