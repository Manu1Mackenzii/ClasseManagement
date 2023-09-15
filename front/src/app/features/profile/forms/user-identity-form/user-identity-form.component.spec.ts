import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentityFormComponent } from './user-identity-form.component';

describe('UserIdentityFormComponent', () => {
  let component: UserIdentityFormComponent;
  let fixture: ComponentFixture<UserIdentityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIdentityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIdentityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
