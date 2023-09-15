import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let mockMatDialog = jasmine.createSpyObj(MatDialog, ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useValue: mockMatDialog
        }
      ],
      imports: [
        MatDialogModule
      ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
