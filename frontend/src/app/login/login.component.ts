import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title: string = 'Login';

  invalidCredentials: boolean = false;
  submittedCredentials: boolean = false;

  loginForm = this.fb.group({
    username: ['', [
      Validators.required
    ]],
    password: ['', [
      Validators.required
    ]]
  })

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    // desde el principio, suscribirse para estar al pendiente del resultado onSubmit()
    this.authService.userLoggedIn$.subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.router.navigateByUrl('/');
        } else {
          if (this.submittedCredentials) {
            this.invalidCredentials = true;
          }
        }
      }
    )
  }

  onSubmit(): void {
    this.submittedCredentials = true;
    if (this.loginForm.valid) {
      const username = this.loginForm.value['username'] || '';
      const password = this.loginForm.value['password'] || '';
      // solicitar autenticación, el resto lo hace la suscripción en ngOnInit()
      this.authService.authenticateUserCredentials(username, password);
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

