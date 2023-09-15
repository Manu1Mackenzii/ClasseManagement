import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_ERROR, LOGIN_USER, User } from '@core/models/user.model';
import { LoginType } from '@features/auth/models/login.type';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  user$: Observable<User>;

  allowedUsers = ['']

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    super(http);
    this.initUser();
  }

  /**
   * Login api
   * @param data
   * @returns
   */
  login(data: LoginType): Observable<any> {
    // return this.post('/login', data)
      // .pipe(
        // tap((res: any) => this.setSession(res))
      // );

    /***** FOR TESTING PURPOSE ONLY */

    if (data.email === environment.allowedUser &&
        data.password === environment.password) {
      this.setSession(LOGIN_USER);
      return of(LOGIN_USER);
    } else {
      return of(LOGIN_ERROR);
    }
  }

  redirectToLogin() {
    const currentUrl = this.router.url;
    const redirectUrl = `/auth/login?redirect_uri=${currentUrl}`;
    this.router.navigateByUrl(redirectUrl);
  }

  redirectToProfile() {
    this.router.navigateByUrl('admin/classrooms');
  }

  redirectWindowLocation(url: string) {
    window.location.href = url;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigateByUrl('/auth/login');
  }


  /**
   * Decode user
   * @param jwtToken
   */
  private decodeUser(jwtToken: string) {
    const decodedUser = jwt_decode(jwtToken);
    if (decodedUser) {
      this.user$ = of(decodedUser as User);
    }
  }

  /**
   * Set user session
   * @param authResult
   */
  private setSession(authResult: any) {
    this.decodeUser(authResult.token);
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = expiration ? JSON.parse(expiration) : null;
    return moment(expiresAt);
  }

  initUser() {
    const token = localStorage.getItem('id_token');
    if (token) {
      this.decodeUser(token);
    } else {
      // User not found, logout
      this.logout();
    }
  }
}
