import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyAppComponent } from '../myComponent/myComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyAppComponent],
  //templateUrl: './app.component.html',
  template:'',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
    
    title = 'your-angular-project';
}
