import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title: string = 'Login';

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  login(): void {
    const username = this.loginForm.value['username'] || '';
    const password = this.loginForm.value['password'] || '';
    this.authService.generateUserToken(username, password).subscribe({
      next: (data) => {
        this.authService.saveToken(data.token);
        this.authService.getUserLoginData();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

