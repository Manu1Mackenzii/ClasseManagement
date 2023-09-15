import { Component } from '@angular/core';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.authService.user$.subscribe({
      next: (res) => {
        this.user = res;
      }
    })
  }

}
