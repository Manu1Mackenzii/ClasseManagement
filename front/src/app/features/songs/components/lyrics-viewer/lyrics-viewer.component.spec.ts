import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsViewerComponent } from './lyrics-viewer.component';

describe('LyricsViewerComponent', () => {
  let component: LyricsViewerComponent;
  let fixture: ComponentFixture<LyricsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
