import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NamesService } from "../names.service";
import { Name } from '../name';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
})
export class NamesComponent {
  @Input() names: Name[] = [];
}
