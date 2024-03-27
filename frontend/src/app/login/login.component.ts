import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title: string = 'Login';

  invalidCredentials: boolean = false;

  loginForm = this.fb.group({
    username: ['', [
      Validators.required
    ]],
    password: ['', [
      Validators.required
    ]]
  })

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value['username'] || '';
      const password = this.loginForm.value['password'] || '';
      this.authService.generateUserToken(username, password).subscribe({
        next: (data) => {
          this.authService.saveToken(data.token);
          this.authService.getUserLoginData();
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.invalidCredentials = true;
        }
      });
    } else {
      // si el form no es valido, marcamos todos los elementos como "tocados"
      // para que se muestren sus errores, si los hay
      this.loginForm.markAllAsTouched();
    }
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}

