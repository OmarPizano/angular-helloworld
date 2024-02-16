import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './names.component.html',
  styleUrl: './names.component.css'
})
export class NamesComponent {
  names = ['nombre1', 'nombre2', 'nombre3'];
}
