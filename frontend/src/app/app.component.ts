import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GreetingComponent } from './greeting/greeting.component';
import { NamesComponent } from './names/names.component';
import { Name } from './name';
import { NamesService } from './names.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, GreetingComponent, NamesComponent],
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
}
