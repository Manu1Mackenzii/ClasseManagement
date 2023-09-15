import { Injectable } from '@angular/core';
import { SongLangEnum, SongPartEnum } from '@features/songs/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  constructor() { }

  getLangOptions(): Array<SongLangEnum> {
    return Object.values(SongLangEnum);
  }

  getPartOptions(): Array<SongPartEnum> {
    return Object.values(SongPartEnum);
  }
}
