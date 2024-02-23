import { Component, OnInit } from '@angular/core';
import { NamesService } from './services/names.service';
import { Name } from './models/name';
import { NameListComponent } from './name-list/name-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NameListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Helloworld App';
  names: Name[] = [];
	
  constructor(private namesService: NamesService) {}

  ngOnInit(): void {
    this.getNames();
  }

  getNames(): void {
    this.namesService.getNames().subscribe(names => this.names = names);
  }

  addName(name: string) {
    this.namesService.createName(name).subscribe(
      (newName) => this.names.push(newName)
    );
  }

  deleteName(id: number) {
    this.namesService.deleteName(id).subscribe(
      (deletedName) => {
        const index = this.names.findIndex(item => item.id === deletedName.id);
        if (index !== -1) {
          this.names.splice(index, 1);
        }
      }
    )
  }

  updateName(name: Name) {
    this.namesService.updateName(name.id, name.name).subscribe(
      (updatedName) => {
        const index = this.names.findIndex(item => item.id === updatedName.id);
        if (index !== -1) {
          this.names[index].name = updatedName.name;
        }
      }
    )
  }
}
