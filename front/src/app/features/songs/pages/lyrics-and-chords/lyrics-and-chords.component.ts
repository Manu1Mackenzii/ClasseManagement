import { Component } from '@angular/core';
import { LyricsService } from '@features/songs/services/lyrics/lyrics.service';
import { ScaleService } from '@features/songs/services/scale/scale.service';

@Component({
  selector: 'app-lyrics-and-chords',
  templateUrl: './lyrics-and-chords.component.html',
  styleUrls: ['./lyrics-and-chords.component.scss']
})
export class LyricsAndChordsComponent {

  constructor(
    private scaleService: ScaleService,
    private lyricsService: LyricsService,
  ) {

  }


}
