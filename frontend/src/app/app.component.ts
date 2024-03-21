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

  userLoggedIn: boolean = false;
  userData: any = {}

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getToken() != null) {
      this.authService.userLoggedIn$.subscribe( userStatus => this.userLoggedIn = userStatus );
      this.authService.userLoginData$.subscribe( userData => this.userData = userData );
      this.authService.verifyCurrentToken().subscribe(
        () => {
          this.authService.getUserLoginData();
        }
      )
    }
  }
  
  logout(): void {
    this.authService.removeTokenAndUserData();
    this.userLoggedIn = false;
    this.userData = {};
    this.router.navigateByUrl('/')
  }

}
