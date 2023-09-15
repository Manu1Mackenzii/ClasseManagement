import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth/auth.service';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {

  let mockAuthService = jasmine.createSpyObj(AuthService, ['redirectToLogin']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptor,
      {
        provide: AuthService,
        useValue: mockAuthService
      }
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
