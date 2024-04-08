import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token !== null) {
      // TODO: no se espera, reparar este fix temporal para cuando caduca el token
      this.authService.verifyCurrentToken();
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
