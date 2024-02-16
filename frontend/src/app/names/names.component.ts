import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NamesService } from "../names.service";

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
  styleUrl: './names.component.css'
})
export class NamesComponent {
  names: string[] = [];

  constructor(private namesService: NamesService) {}

  ngOnInit(): void {
	  this.getNames();
  }

  getNames(): void {
	  this.names = this.namesService.getNames();
  }
}
