import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NamesService } from "../names.service";
import { Name } from '../name';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
  styleUrl: './names.component.css'
})
export class NamesComponent implements OnInit, OnChanges {
  names: Name[] = [];
	@Input() newName = '';

  constructor(private namesService: NamesService) {}

  ngOnInit(): void {
	  this.getNames();
  }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['newName']) {
			// TODO: asignar bien el ID
			this.names.push({id: 7, name: this.newName})
		}
	}

  getNames(): void {
	  this.namesService.getNames().subscribe(names => this.names = names);
  }
}
