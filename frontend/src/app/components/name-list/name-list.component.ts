import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { UpdateNameComponent } from './update-name/update-name.component';
import { SearchNamesComponent } from './search-names/search-names.component';
import { Name } from '../../models/name';
import { NamesService } from '../../services/names.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-list',
  standalone: true,
  imports: [NgFor, NgIf, UpdateNameComponent, SearchNamesComponent, RouterLink, FormsModule],
  templateUrl: './name-list.component.html',
})
export class NameListComponent implements OnInit {
  title: string = 'Name List';
  nameList: Name[] = [];
  createNameFormEnabled: boolean = false;
  updateNameFormEnabled: boolean = false;
  updatingName: Name = {id: 0, name: ''};
  creatingName: string = '';

  constructor(private namesService: NamesService) { }

  ngOnInit(): void {
    this.getNameList();
  }

  getNameList(): void {
    this.namesService.getNames().subscribe(names => this.nameList = names);
  }

  onSubmitName(): void {
    this.namesService.createName(this.creatingName).subscribe(
      (createdName) => this.nameList.push(createdName)
    );
    this.createNameFormEnabled = false;
    this.creatingName = '';
  }

  deleteName(id: number): void {
    this.namesService.deleteName(id).subscribe(
      (deletedName) => {
        const index = this.nameList.findIndex(item => item.id === id);
        if (index !== -1) {
          this.nameList.splice(index, 1);
        }
      }
    );
  }

  updateName(name: string): void {
    this.namesService.updateName(this.updatingName.id, name).subscribe(
      (updatedName) => {
        const index = this.nameList.findIndex(item => item.id === this.updatingName.id);
        if (index !== -1) {
          this.nameList[index].name = name;
        }
      }
    )
    this.updateNameFormEnabled = false;
  }

  searchNames(pattern: string): void {
    this.namesService.searchNameByName(pattern).subscribe(names => this.nameList = names);
  }

  showUpdateForm(name: Name): void {
    this.updateNameFormEnabled = true;
    this.createNameFormEnabled = false;
    this.updatingName = name;
  }

  cancelUpdate(): void {
    this.updateNameFormEnabled = false;
    this.updatingName = {id: 0, name: ''};
  }

  showCreateForm(): void {
    this.createNameFormEnabled = true;
    this.updateNameFormEnabled = false;
  }

  cancelCreate(): void {
    this.createNameFormEnabled = false;
    this.creatingName = '';
  }

  resetList(): void {
    this.getNameList();
  }
}
