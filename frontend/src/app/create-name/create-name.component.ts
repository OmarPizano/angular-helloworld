import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-name.component.html',
})
export class CreateNameComponent {
  @Output() createButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();
  title: string = 'Create Name'
  name: string = '';

  createName(): void {
    this.createButton.emit(this.name);
  }

  cancelCreate(): void {
    this.cancelButton.emit();
  }
}
