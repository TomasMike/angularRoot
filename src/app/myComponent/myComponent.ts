import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    selector:'my-comp',
    template:'<h1>Hello world!</h1>'
})
export class MyAppComponent {
    @Input() name!: string;
    
    title = 'your-angular-project';
  }