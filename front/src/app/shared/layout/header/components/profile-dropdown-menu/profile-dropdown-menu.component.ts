import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-dropdown-menu',
  templateUrl: './profile-dropdown-menu.component.html',
  styleUrls: ['./profile-dropdown-menu.component.scss']
})
export class ProfileDropdownMenuComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$
  }

  ngOnInit(): void {
  }

}
