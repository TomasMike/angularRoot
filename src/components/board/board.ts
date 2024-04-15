import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'board',
    templateUrl: './board.html',
    styleUrl: './board.css'
})
export class BoardComponent {
    @Input() name: string = "defaultHodnota";



    title = 'your-angular-project';
}
