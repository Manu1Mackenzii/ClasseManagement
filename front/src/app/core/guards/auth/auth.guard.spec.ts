import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService = jasmine.createSpyObj(AuthService, ['isAuthenticated', 'redirectToLogin']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
