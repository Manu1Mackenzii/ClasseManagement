import { Component, Input } from '@angular/core';
import { MenuLink } from '@core/models/menu-item.model';

@Component({
  selector: 'app-quick-links-inner',
  templateUrl: './quick-links-inner.component.html',
  styleUrls: ['./quick-links-inner.component.scss']
})
export class QuickLinksInnerComponent {

  @Input() title: string | undefined;
  @Input() menuLinks: MenuLink[] = [
    // {
    //   type: 'link',
    //   label: "navbar.MyAccount",
    //   icon: 'assets/media/icons/duotune/communication/com006.svg',
    //   url: '/profile/account',
    // },
    // {
    //   type: 'link',
    //   label: "navbar.Settings",
    //   icon: 'assets/media/icons/duotune/coding/cod001.svg',
    //   url: '/user/settings',
    // },
    // {
    //   type: 'link',
    //   label: "navbar.Services",
    //   icon: 'assets/media/icons/duotune/technology/teh002.svg',
    //   url: '/user/services',
    // },
    // {
    //   type: 'link',
    //   label: "navbar.Dashboard",
    //   icon: 'assets/media/icons/duotune/finance/fin006.svg',
    //   url: '/admin',
    // }
  ];

  @Input() footerLink: MenuLink = {
      type: 'link',
      label: "navbar.Logout",
      icon: 'fa-solid fa-arrow-right',
      url: '/logout'
  };

}
