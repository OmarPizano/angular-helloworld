import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();

  private userLoginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  userLoginData$: Observable<any> = this.userLoginDataSubject.asObservable();

  authenticateUserCredentials(username: string, password: string): void {
    this.http.post<{ token: string }>(API_URL + '/auth', {username, password}).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.loadUserData();
      },
      error: () => {
        this.resetUserData();
      }
    });
  }

  verifyCurrentToken(): void {
    this.http.get(API_URL + '/auth/verify').subscribe({
      next: () => {
        this.loadUserData();
      },
      error: (err) => {
        // sólo borrar el token cuando es inválido
        // TODO: reparar este fix temporal para cuando caduca el token
        if (err.status === 422 || err.status === 401) {
          this.removeTokenAndUserData();
        }
      }
    });
  }

  getToken(): string|null {
    return localStorage.getItem('token');
  }

  removeTokenAndUserData(): void {
    localStorage.removeItem('token');
    this.resetUserData();
  }

  private loadUserData(): void {
    this.http.get(API_URL + '/auth/data').subscribe({
      next: (data) => {
        this.userLoggedInSubject.next(true);
        this.userLoginDataSubject.next(data);
      }
    })
  }

  private resetUserData(): void {
    this.userLoggedInSubject.next(false);
    this.userLoginDataSubject.next({});
  }
}
