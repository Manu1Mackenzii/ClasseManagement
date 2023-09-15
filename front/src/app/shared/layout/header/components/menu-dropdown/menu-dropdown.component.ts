import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MenuItem, SubMenuItem, MenuLink } from '@core/models/menu-item.model';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent {

  @Input() menuItem: MenuItem;
  @Output() onSubMenuSelected: EventEmitter<SubMenuItem> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  selectedSubMenu: SubMenuItem | null = null;

  constructor(
    private elementRef: ElementRef<any>
  ) { }

  isSelected(item: any, selectedItem: any) {
    return item?.id && item.id == selectedItem?.id
  }

  selectSubMenu(item: SubMenuItem) {
    if (this.selectedSubMenu?.id != item.id && item?.options?.length) {
      this.selectedSubMenu = item;
      this.onSubMenuSelected.emit(this.selectedSubMenu);
    }
  }

  getMenuOptions(): Array<MenuLink[]> {
    if (this.selectedSubMenu) {
      return this.selectedSubMenu.options || [];
    } else {
      return this.menuItem.options || [];
    }
  }

}
