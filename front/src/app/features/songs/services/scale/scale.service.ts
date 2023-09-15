import { Injectable } from '@angular/core';
import { ChordMajor, ChordMinor, MajorScale } from '@features/songs/models/chord.model';
import { ChromaticScale, ChromaticScaleFlat, Note } from '@features/songs/models/note.model';
import { SongLangEnum } from '@features/songs/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  chromaticScale      = ChromaticScale;
  chromaticScaleFlat  = ChromaticScaleFlat;

  constructor() { }

  getEquivalentFlatNote(index: number): Note | null {
    return this.chromaticScaleFlat[index] || null;
  }

  getEquivalentSharpNote(index: number): Note | null {
    return this.chromaticScale[index] || null;
  }

  getMajorChord(note: Note, flatScale = false): string {
    return (new ChordMajor(note, flatScale)).toString();
  }

  getMinorChord(note: Note, flatScale = false): string {
    return (new ChordMinor(note, flatScale)).toString();
  }

  getMajorScale(note: Note, flatScale = false): string {
    return (new MajorScale(note, flatScale)).toString();
  }
}
