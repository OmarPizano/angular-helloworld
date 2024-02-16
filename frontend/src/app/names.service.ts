import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NamesService {

  constructor() { }

  getNames(): string[] {
	  return ['nombre1', 'nombre2', 'nombre3'];
  }
}
