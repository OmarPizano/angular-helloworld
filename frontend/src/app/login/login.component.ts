import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  authenticateCredentials(): void {
    // llama al backend
  }
}

