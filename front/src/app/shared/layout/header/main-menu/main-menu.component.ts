import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuLink } from '@core/models/menu-item.model';
import { AuthService } from '@core/services/auth/auth.service';
import { MenuMainOptions } from 'src/app/shared/layout/header/config/menu-main.config';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  menuTitle: string = 'Class Management';
  menuOptions: MenuItem[] = MenuMainOptions;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }


}
