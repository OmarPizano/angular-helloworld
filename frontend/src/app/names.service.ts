import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Name } from './name';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NamesService {

  private namesUrl = 'http://127.0.0.1:5000';  

  constructor(private http: HttpClient) { }

  getNames(): Observable<Name[]> {
    return this.http.get<Name[]>(`${this.namesUrl}/`);
  }
	
  createName(name: string): Observable<Name> {
    return this.http.post<Name>(`${this.namesUrl}/create`, {name});
  }

  deleteName(id: number): Observable<Name> {
    return this.http.delete<Name>(`${this.namesUrl}/delete/${id}`);
  }

  updateName(id: number, newName: string): Observable<Name> {
    return this.http.put<Name>(`${this.namesUrl}/update/${id}`, {newName});
  }
}
