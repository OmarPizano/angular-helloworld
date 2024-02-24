import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-name.component.html',
})
export class UpdateNameComponent implements OnInit {
  newName: string = '';
  @Output() updateButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();
  @Input() name: string = '';
  title = '';

  ngOnInit(): void {
    this.title = `Update Name: ${this.name}`;
  }

  updateName() {
    this.updateButton.emit(this.newName);
  }

  cancelUpdate() {
    this.cancelButton.emit();
  }
}
