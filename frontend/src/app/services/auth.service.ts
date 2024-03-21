import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiURL;

  constructor(private http: HttpClient) { }

  authCredentials(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth`, {username, password});
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string|null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
