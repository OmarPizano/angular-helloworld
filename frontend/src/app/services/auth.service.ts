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
  public userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();

  private userLoginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public userLoginData$: Observable<any> = this.userLoginDataSubject.asObservable();

  // login component
  generateUserToken(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + '/auth', {username, password});
  }

  // componente principal
  verifyCurrentToken(): Observable<any> {
    return this.http.get(API_URL + '/auth/verify');
  }

  // al iniciar sesión y al recargar
  getUserLoginData(): void {
    this.http.get(API_URL + '/auth/data').subscribe(
      (data) => {
        this.userLoggedInSubject.next(true);
        this.userLoginDataSubject.next(data);
      }
    )
  }

  // al iniciar sesión
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // httpinterceptor
  getToken(): string|null {
    return sessionStorage.getItem('token');
  }

  // logout
  removeTokenAndUserData(): void {
    sessionStorage.removeItem('token');
    this.userLoginDataSubject.next({});
    this.userLoggedInSubject.next(false);
  }
}
