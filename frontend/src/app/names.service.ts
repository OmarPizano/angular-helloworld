import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Name } from './name';

@Injectable({
  providedIn: 'root',
})
export class NamesService {

  constructor() { }

  getNames(): Observable<Name[]> {
	return of(
	  [{id:1, name:'Name_1'}, {id:2, name:'Name_2'}, {id:3, name:'Name_3'}]);
  }
}
