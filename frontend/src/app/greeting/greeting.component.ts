import { Component, EventEmitter, Output } from '@angular/core';
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
	@Output() submittedName = new EventEmitter<string>();

  greet() {
    if (this.name.trim() !== '') {
      this.greeting = `¡Hello, ${this.name}!`;
			let name = this.name;
			this.submittedName.emit(name);
			this.name = '';
    } else {
      this.greeting = '¡Hello, world!';
    }
		alert(this.greeting);
  }
}
