import { Component } from '@angular/core';
import { MenuItem } from '@core/models/menu-item.model';
import { MenuAdminOptions } from '@features/admin-board/models/menu-admin.config';

@Component({
  selector: 'app-admin-main-container',
  templateUrl: './admin-main-container.component.html',
  styleUrls: ['./admin-main-container.component.scss']
})
export class AdminMainContainerComponent {

  menuLinks: MenuItem[] = MenuAdminOptions;
  defaultMenu: string = 'paiementsId';
}
