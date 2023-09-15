import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuLink } from '@core/models/menu-item.model';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() title: string;
  @Input() titleUrl: string;
  @Input() menuOptions: MenuItem[];

  selectedMenu: any = null;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }


  ngOnInit(): void {
    this.resetMenus();
  }

  openMenu(menuItem: MenuItem, $event: any) {
    if (this.selectedMenu?.id != menuItem.id && this.hasDropdown(menuItem)) {
      this.selectedMenu = menuItem;
      $event.stopPropagation();
    } else if (menuItem?.url) {
      this.router.navigateByUrl(menuItem.url);
    } else if (menuItem.id == this.selectedMenu?.id) {
      this.resetMenus();
    }
  }

  isSelected(menuItem: any, selectedMenu: any) {
    return menuItem?.id && menuItem.id == selectedMenu?.id
  }

  hasDropdown(menuItem: MenuItem) {
    return menuItem?.dropdowns?.length || menuItem?.options?.length;
  }

  resetMenus() {
    this.selectedMenu = null;
  }

  closeDropdown() {
    this.resetMenus();
  }
}
