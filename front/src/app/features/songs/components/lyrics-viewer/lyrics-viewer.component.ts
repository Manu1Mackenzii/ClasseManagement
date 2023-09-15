import { Component, Input, OnInit } from '@angular/core';
import { SongPart } from '@features/songs/models/song.model';

@Component({
  selector: 'app-lyrics-viewer',
  templateUrl: './lyrics-viewer.component.html',
  styleUrls: ['./lyrics-viewer.component.scss']
})
export class LyricsViewerComponent implements OnInit {

  @Input() lyrics: string;
  @Input() songPart: SongPart | null;

  ngOnInit(): void {}
}
