import { Component, Input, OnInit } from "@angular/core";
import { ClearingModel, ClearingSuit } from "../../classes/models/ClearingModel";
import { CommonModule } from "@angular/common";


@Component({
    standalone: true,
    selector: "clearing",
    imports: [CommonModule],
    template: `
    <!-- <div>test</div> -->
    <div id="{{clearing.Id}}" class="clearing {{clearing.Suit}}Clearing" style="top:{{clearing.Top}}px;left:{{clearing.Left}}px;">{{clearing.Id}}-{{clearing.Suit}}
<canvas id="i"></canvas>
    </div>
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
    `
})
export class ClearingComponent implements OnInit {
    @Input() clearing!: ClearingModel;

    
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




}