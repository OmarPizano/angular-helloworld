import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Name } from '../name';
import { UpdateNameComponent } from '../update-name/update-name.component';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf, UpdateNameComponent],
  templateUrl: './names.component.html',
})
export class NamesComponent {
  @Input() names: Name[] = [];
  @Output() deletedName = new EventEmitter<number>();
  @Output() updatedName = new EventEmitter<Name>();

  title = 'Name List'
  updating = false;
  updatingID = 0;
  updatingName = '';

  delete(id: number) {
    this.deletedName.emit(id);
  }

  update(name: string) {
    let newName: Name = {id: this.updatingID, name: name};
    this.updatedName.emit(newName);
    this.updating = false;
  }

  showUpdateForm(name: Name) {
    this.updating = true;
    this.updatingID = name.id;
    this.updatingName = name.name;
  }

  cancelUpdate() {
    this.updating = false;
    this.updatingID = 0;
    this.updatingName = '';
  }
}
