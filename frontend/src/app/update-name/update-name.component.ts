import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-name.component.html',
})
export class UpdateNameComponent {
  newName: string = '';
  @Output() updateButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();
  @Input() name: string = '';

  updateName() {
    this.updateButton.emit(this.newName);
  }

  cancelUpdate() {
    this.cancelButton.emit();
  }
}
