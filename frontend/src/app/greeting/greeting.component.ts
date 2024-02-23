import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'Create Name'
  name: string = '';
  @Output() createButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();

  createName() {
    this.createButton.emit(this.name);
  }

  cancelCreate() {
    this.cancelButton.emit();
  }
}
