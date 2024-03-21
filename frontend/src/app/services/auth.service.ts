import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiURL;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  authCredentials(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth`, {username, password});
  }

  setToken(token: string): void {
    this.cookies.set("token", token);
  }

  getToken(): string {
    return this.cookies.get("token");
  }

  logout(): void {
    this.cookies.delete("token");
  }
}
