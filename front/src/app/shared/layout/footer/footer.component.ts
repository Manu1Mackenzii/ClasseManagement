import { Component, OnInit } from '@angular/core';
import { SearchCategory } from '@core/models/category';
import { SearchService } from '@core/services/search/search.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  today: Date = new Date();
  appVersion: string = environment.appVersion;

  categoryList$: Observable<SearchCategory[]>;

  constructor(
    private searchService: SearchService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.categoryList$ = this.searchService.getPopularCategories();
  }

  translate(key: string) {
    return this.translateService.instant(key);
  }

}
