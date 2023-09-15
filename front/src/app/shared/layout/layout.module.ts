import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FooterComponent } from './footer/footer.component';
import { MenuDropdownComponent } from './header/components/menu-dropdown/menu-dropdown.component';
import { NavbarComponent } from './header/components/navbar/navbar.component';
import { ProfileDropdownMenuComponent } from './header/components/profile-dropdown-menu/profile-dropdown-menu.component';
import { QuickLinksInnerComponent } from './header/components/quick-links-inner/quick-links-inner.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { CartMenuItemComponent } from './header/components/cart-menu-item/cart-menu-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    MainMenuComponent,
    FooterComponent,
    ProfileDropdownMenuComponent,
    MenuDropdownComponent,
    NavbarComponent,
    QuickLinksInnerComponent,
    CartMenuItemComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    DirectivesModule,
    InlineSVGModule.forRoot(),
    TranslateModule
  ],
  exports: [
    MainMenuComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
