import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Name } from '../models/name';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  private url = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getNames(): Observable<Name[]> {
    return this.http.get<Name[]>(`${this.url}/names`);
  }

  createName(name: string): Observable<Name> {
    return this.http.post<Name>(`${this.url}/names`, { name });
  }

  deleteName(id: number): Observable<Name> {
    return this.http.delete<Name>(`${this.url}/names/${id}`);
  }

  updateName(id: number, newName: string): Observable<Name> {
    return this.http.put<Name>(`${this.url}/names/${id}`, { newName });
  }
}
