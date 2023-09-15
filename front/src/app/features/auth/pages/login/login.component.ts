import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  SIGNUP_URL = '/signup';
  LOGOUT_URL = '/logout';
  LOGIN_TAB = 1;
  REGISTER_TAB = 2;

  selectedTab: number = this.LOGIN_TAB;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    // this.router.navigateByUrl('classrooms');
    // Set URL if signup
    const route = this.router.url;

    switch (this.router.url) {
      case this.SIGNUP_URL:
        this.selectedTab = this.REGISTER_TAB;
        break;
      case this.LOGOUT_URL:
        this.selectedTab = this.LOGIN_TAB;
        this.authService.logout();
        break;
    }

    if (authService.isLoggedIn()) {
      this.authService.redirectToProfile();
    }
    
  }

  setTab(index: number) {
    if (index !== this.selectedTab) {
      this.selectedTab = index;
    }
  }

  isSelected(index: number): boolean {
    return this.selectedTab == index;
  }
}
