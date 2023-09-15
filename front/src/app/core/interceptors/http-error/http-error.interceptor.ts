import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(
          (error : any) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.authService.redirectToLogin();
            }
            return throwError(() => error);
          }
        )
      );
  }
}
