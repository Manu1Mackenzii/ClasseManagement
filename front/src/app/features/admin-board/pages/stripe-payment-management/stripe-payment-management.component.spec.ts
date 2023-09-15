import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentManagementComponent } from './stripe-payment-management.component';

describe('StripePaymentManagementComponent', () => {
  let component: StripePaymentManagementComponent;
  let fixture: ComponentFixture<StripePaymentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripePaymentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
