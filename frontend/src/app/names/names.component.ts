import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Name } from '../name';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
})
export class NamesComponent {
  @Input() names: Name[] = [];
  title = 'Name List'
}
