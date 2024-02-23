import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-name.component.html',
})
export class CreateNameComponent {
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
