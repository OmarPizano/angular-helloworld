import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  changeUserPassword(id: number, password: string): void {
    this.http.put(API_URL + '/users/' + id, {password}).subscribe({
      next: () => {
        console.log('contraseña cambiada');
      },
      error: () => {
        console.log('error cambiando el password');
      }
    });
  }
}
