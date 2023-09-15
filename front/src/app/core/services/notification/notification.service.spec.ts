import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockMatSnackBar = jasmine.createSpyObj(MatSnackBar, ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: mockMatSnackBar
        },
      ],
      imports: [
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
