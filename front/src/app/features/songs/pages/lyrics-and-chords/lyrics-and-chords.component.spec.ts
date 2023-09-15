import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsAndChordsComponent } from './lyrics-and-chords.component';

describe('LyricsAndChordsComponent', () => {
  let component: LyricsAndChordsComponent;
  let fixture: ComponentFixture<LyricsAndChordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsAndChordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsAndChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
