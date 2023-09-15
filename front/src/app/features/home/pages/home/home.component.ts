import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (res: User) => {
        if (res) {
          this.user = res;
        }
      }
    })
  }

}