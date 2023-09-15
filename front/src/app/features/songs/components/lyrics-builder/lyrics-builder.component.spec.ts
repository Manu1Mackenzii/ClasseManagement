import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsBuilderComponent } from './lyrics-builder.component';

describe('LyricsBuilderComponent', () => {
  let component: LyricsBuilderComponent;
  let fixture: ComponentFixture<LyricsBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
