import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleGlossaryComponent } from './scale-glossary.component';

describe('ScaleGlossaryComponent', () => {
  let component: ScaleGlossaryComponent;
  let fixture: ComponentFixture<ScaleGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleGlossaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaleGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
