import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title: string = 'Login';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(username: string, password: string): void {
    this.authService.authCredentials(username, password).subscribe(
      (token) => {
        this.authService.setToken(token.token);
        this.router.navigateByUrl('/');
      }
    )
  }
}

