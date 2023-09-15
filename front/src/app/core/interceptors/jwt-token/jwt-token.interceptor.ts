import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new header.
    let authReq = req.clone();
    const token = localStorage.getItem('id_token');

    if (token) {
      authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
    return next.handle(authReq);
  }
}
