import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService implements OnInit {

  private readonly documentIsAccessible: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.documentIsAccessible = isPlatformBrowser(this.platformId)
  }

  ngOnInit(): void {

  }


  /**
   *
   * @param name
   * @returns
   */
  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

  /**
   *
   * @param encodeURI
   * @returns
   */
  private static safeDecodedURIComponent(encodeURI: string): string {
    try {
      return decodeURIComponent(encodeURI);
    } catch {
      return encodeURI;
    }
  }

  /**
   *
   * @param name
   * @returns
   */
  check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }
    const regExp: RegExp = CookieService.getCookieRegExp(name);
    return regExp.test(this.document.cookie);
  }

  /**
   *
   * @param name
   * @returns
   */
  get(name: string): string {

    name = encodeURIComponent(name);

    if (this.documentIsAccessible && this.check(name)) {

      const regExp: RegExp = CookieService.getCookieRegExp(name)
      const result: RegExpExecArray | null = regExp.exec(this.document.cookie);

      return result != null && result[1] ? CookieService.safeDecodedURIComponent(result[1]) : ''
    } else {
      return '';
    }
  }

  /**
   * Set cookie
   */
  set(name: string, value: string): boolean {
    if (this.documentIsAccessible) {
      this.document.cookie = `${name}=${value}`;
      return true;
    }
    return false;
  }

  /**
   * Delete cookie
   */
  delete(name: string) {
    if (this.documentIsAccessible) {
      document.cookie = name + "=; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      return true;
    }
    return false;
  }
}
