import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token === null) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
