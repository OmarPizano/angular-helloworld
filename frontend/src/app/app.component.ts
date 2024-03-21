import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

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
  
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/')
    this.isLoggedIn = false;
  }

}
