import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from '@core/services/config/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  showFooter: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appConfigService: AppConfigService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = this.activatedRoute.firstChild?.snapshot.data.showFooter !== false;
      }
    });
  }
}
