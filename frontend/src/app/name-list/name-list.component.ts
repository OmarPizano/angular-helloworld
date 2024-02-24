import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateNameComponent } from '../create-name/create-name.component';
import { UpdateNameComponent } from '../update-name/update-name.component';
import { Name } from '../models/name';
import { NamesService } from '../services/names.service';

@Component({
  selector: 'app-name-list',
  standalone: true,
  imports: [NgFor, NgIf, UpdateNameComponent, CreateNameComponent],
  templateUrl: './name-list.component.html',
})
export class NameListComponent implements OnInit {
  names: Name[] = [];

  title = 'Name List'
  creating = false;
  updating = false;
  updatingID = 0;
  updatingName = '';
  
  constructor(private namesService: NamesService) {}
  
  ngOnInit(): void {
    this.getNames();
  }

  getNames(): void {
    this.namesService.getNames().subscribe(names => this.names = names);
  }

  createName(name: string) {
    this.namesService.createName(name).subscribe(
      (newName) => this.names.push(newName)
    );
    this.creating = false;
  }

  deleteName(id: number) {
    this.namesService.deleteName(id).subscribe(
      (deletedName) => {
        const index = this.names.findIndex(item => item.id === deletedName.id);
        if (index !== -1) {
          this.names.splice(index, 1);
        }
      }
    );
  }

  updateName(name: string) {
    this.namesService.updateName(this.updatingID, name).subscribe(
      (updatedName) => {
        const index = this.names.findIndex(item => item.id === updatedName.id);
        if (index !== -1) {
          this.names[index].name = updatedName.name;
        }
      }
    )
    this.updating = false;
  }

  showUpdateForm(name: Name) {
    this.updating = true;
    this.creating = false;
    this.updatingID = name.id;
    this.updatingName = name.name;
  }

  cancelUpdate() {
    this.updating = false;
    this.updatingID = 0;
    this.updatingName = '';
  }

  showCreateForm() {
    this.creating = true;
    this.updating = false;
  }

  cancelCreate() {
    this.creating = false;
  }
}
