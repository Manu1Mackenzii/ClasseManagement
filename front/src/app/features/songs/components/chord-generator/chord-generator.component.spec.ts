import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordGeneratorComponent } from './chord-generator.component';

describe('ChordGeneratorComponent', () => {
  let component: ChordGeneratorComponent;
  let fixture: ComponentFixture<ChordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChordGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
