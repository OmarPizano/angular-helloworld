import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  name: string = '';
  greeting: string = '';
  
  greet() {
    if (this.name.trim() !== '') {
      this.greeting = `¡Hello, ${this.name}!`;
      // TODO: llamar al backend para guardar nombre
    } else {
      this.greeting = '¡Hello, world!';
    }
  }

}
