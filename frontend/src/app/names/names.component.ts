import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NamesService } from "../names.service";
import { Name } from '../name';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
  styleUrl: './names.component.css'
})
export class NamesComponent {
  names: Name[] = [];

  constructor(private namesService: NamesService) {}

  ngOnInit(): void {
	  this.getNames();
  }

  getNames(): void {
	  this.namesService.getNames().subscribe(names => this.names = names);
  }
}
