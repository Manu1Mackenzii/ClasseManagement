import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenuItemComponent } from './cart-menu-item.component';

describe('CartMenuItemComponent', () => {
  let component: CartMenuItemComponent;
  let fixture: ComponentFixture<CartMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
