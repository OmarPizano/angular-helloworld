import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NamesService } from '../names.service';

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
	@Output() sendName = new EventEmitter<string>();

  constructor(private nameService: NamesService) {}
  
  greet() {
    if (this.name.trim() !== '') {
      this.greeting = `¡Hello, ${this.name}!`;
      // TODO: llamar al backend para guardar nombre
			// TODO: se guarda, pero no se actualiza en el componente names
			this.nameService.saveName(this.name).subscribe( () => this.sendName.emit(this.name) );
    } else {
      this.greeting = '¡Hello, world!';
    }
  }

}
