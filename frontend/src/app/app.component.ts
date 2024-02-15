import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
