import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [FormsModule, AutofocusDirective],
  templateUrl: './update-name.component.html',
})
export class UpdateNameComponent {
  @Input() name: string = '';
  @Output() updateButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();
  title: string = 'Update Name';
  newName: string = '';

  updateName(): void {
    this.updateButton.emit(this.newName);
  }

  cancelUpdate(): void {
    this.cancelButton.emit();
  }
}
