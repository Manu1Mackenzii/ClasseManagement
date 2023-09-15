import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public defaultLang: string = '';

  constructor(
    private cookieService: CookieService,
    private translate: TranslateService
  ) {
    this.initLangPreferences()
  }

  setLanguagePreferences(lang: string) {
    this.cookieService.set('lang', lang);
  }

  initLangPreferences() {
    this.defaultLang = this.cookieService.get('lang') || 'fr';

    // Set language params
    this.translate.addLangs(['en', 'fr']);

    if (!this.defaultLang) {
      this.defaultLang = this.translate.getBrowserLang() || 'fr';
    }

    if (!this.translate.currentLang) {
      this.translate.setDefaultLang(this.defaultLang);
      this.translate.use(this.defaultLang);
    }
  }

}
