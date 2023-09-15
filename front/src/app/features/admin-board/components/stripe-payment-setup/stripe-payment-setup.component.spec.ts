import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentSetupComponent } from './stripe-payment-setup.component';

describe('StripePaymentSetupComponent', () => {
  let component: StripePaymentSetupComponent;
  let fixture: ComponentFixture<StripePaymentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripePaymentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
