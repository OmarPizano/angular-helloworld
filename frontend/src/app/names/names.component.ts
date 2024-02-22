import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Name } from '../name';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
})
export class NamesComponent {
  @Input() names: Name[] = [];
  @Output() deletedName = new EventEmitter<number>();
  title = 'Name List'

  delete(id: number) {
    this.deletedName.emit(id);
  }
}
