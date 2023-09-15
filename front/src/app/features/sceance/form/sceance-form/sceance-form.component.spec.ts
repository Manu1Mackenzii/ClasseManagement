import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceanceFormComponent } from './sceance-form.component';

describe('SceanceFormComponent', () => {
  let component: SceanceFormComponent;
  let fixture: ComponentFixture<SceanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceanceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
