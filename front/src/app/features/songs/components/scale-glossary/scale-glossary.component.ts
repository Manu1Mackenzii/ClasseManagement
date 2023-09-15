import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LyricsService } from '@features/songs/services/lyrics/lyrics.service';
import { ScaleService } from '@features/songs/services/scale/scale.service';

@Component({
  selector: 'app-scale-glossary',
  templateUrl: './scale-glossary.component.html',
  styleUrls: ['./scale-glossary.component.scss']
})
export class ScaleGlossaryComponent {

  SCALES_TAB = 1;
  CHORDS_TAB = 2;

  selectedTab: number = this.SCALES_TAB;

  constructor(
    public scaleService: ScaleService,
    public lyricsService: LyricsService,
    private activatedRoute: ActivatedRoute
  ) {

    // Check query params tab

    this.activatedRoute.queryParams.subscribe({
      next: (queryParams: any) => {
        switch(queryParams['tab']) {
          case 'chords':
              this.selectedTab = this.CHORDS_TAB;
              break;
          case 'scale':
              this.selectedTab = this.SCALES_TAB;
              break;
        }
      }
    })
  }


  setTab(index: number) {
    if (index !== this.selectedTab) {
      this.selectedTab = index;
    }
  }

  isSelected(index: number): boolean {
    return this.selectedTab == index;
  }
}
