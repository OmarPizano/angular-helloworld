import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Helloworld App';

  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInUsername$.subscribe(
      (username) => {
        this.username = username.toUpperCase();
        if (username !== '') {
          this.isLoggedIn = true;
        }
      })
    this.authService.checkSession();
  }
}
