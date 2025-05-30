import { Component, EventEmitter, Input, OnInit, Output, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManager } from '../../classes/GameManager';
import { Observable, observable } from 'rxjs';
import { AskerPromptOption } from "../../classes/models/Option";
import { BrowserModule } from '@angular/platform-browser';

@Component({
    standalone: true,
    selector: 'ingameprompt',
    //templateUrl: './board.html',
    template: `
    <div id="ingameprompt">
        <button class="askos" #o  *ngFor="let o of options" (click)="OptionClick(o.Id)" >{{o.Text}}</button>
         <!-- <button  >testingamepromtp</button> -->
    </div>
    `,
    styles: `
    @ingameprompt{border:1px solid black}`,
    imports: [CommonModule]
})
export class IngamePrompt
{
    options: AskerPromptOption[];
    @Input() OptionSelectedEmitter:EventEmitter<number> = new EventEmitter<number>();

    constructor()
    {
        this.options =[];
    }

    addOptions(o:AskerPromptOption[])
    {
        this.options.push(...o);
    }

    OptionClick(n:number)
    {
        this.OptionSelectedEmitter.emit(n);
        this.clear();
    }
    clear()
    {
        this.options = [];
    }



}