import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiURL;

  private loggedInUsernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public loggedInUsername$: Observable<string> = this.loggedInUsernameSubject.asObservable();

  constructor(private http: HttpClient) { }

  authCredentials(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth`, {username, password});
  }

  checkSession(): void {
    const status = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    if ( status && username ) {
      this.loggedInUsernameSubject.next(username);
    }
  }

  createSession(username: string, token: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    this.loggedInUsernameSubject.next(username);
  }

  getToken(): string|null {
    // usado por httpinterceptor
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.loggedInUsernameSubject.next('');
  }
}
