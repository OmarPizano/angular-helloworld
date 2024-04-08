import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  brandName: string = 'Helloworld App';

  userLoggedIn: boolean = false;
  userData: any = {}

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userLoggedIn$.subscribe( userStatus => this.userLoggedIn = userStatus );
    this.authService.userLoginData$.subscribe( userData => this.userData = userData );
    if (this.authService.getToken() != null) {
      this.authService.verifyCurrentToken();
    }
  }
  
  logout(): void {
    this.authService.removeTokenAndUserData();
    this.userLoggedIn = false;
    this.userData = {};
    this.router.navigateByUrl('/')
  }
}
