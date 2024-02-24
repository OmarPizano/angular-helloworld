import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-name.component.html',
})
export class UpdateNameComponent implements OnInit {
  @Input() name: string = '';
  @Output() updateButton = new EventEmitter<string>();
  @Output() cancelButton = new EventEmitter();
  title: string = '';
  newName: string = '';

  ngOnInit(): void {
    this.title = `Update Name: ${this.name}`;
  }

  updateName(): void {
    this.updateButton.emit(this.newName);
  }

  cancelUpdate(): void {
    this.cancelButton.emit();
  }
}
