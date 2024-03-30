import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  title: string = '';
  userData: any = {};

  changePasswordForm = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60)
    ]]
  })

  constructor(private userService: UserService, private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.authService.userLoginData$.subscribe( (userData) => {
      // verificar que los datos esten cargados
      if (userData.username != null) {
        this.userData = userData;
        this.title = `${userData.username.toUpperCase()}'s Dashboard`;
      }
    });
  }

  onSubmitChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.value['password'] || '';
      this.userService.changeUserPassword(this.userData.id, password);
      this.authService.removeTokenAndUserData();
      this.router.navigateByUrl('/login')
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  get password() {
    return this.changePasswordForm.controls.password;
  }
}
