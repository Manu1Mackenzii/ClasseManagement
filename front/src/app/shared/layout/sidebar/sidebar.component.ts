import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MenuLink, SubMenuItem } from '@core/models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    class: 'sidebar'
  }
})
export class SidebarComponent implements OnInit {
  @Input() menuOptions: MenuItem[];
  @Input() defaultMenuId: string;

  selectedItemId: string;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.selectedItemId = this.defaultMenuId;
  }

  selectItem(item: MenuItem | SubMenuItem | MenuLink) {
    if (!item.disabled) {
      if (item.id) {
        this.selectedItemId = item.id;
      }
      this.router.navigate([`.${item.url}`], { relativeTo: this.activatedRoute })
    }
  }

  isSelectedItem(id: string) {
    return this.selectedItemId == id;
  }
}
