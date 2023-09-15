import { Component } from '@angular/core';
import { JSON_SONG_JIREH } from '@features/songs/models/mocks/part.mock';
import { CHORD_REGEX, Song, SongLine, SongPart, SongPartEnum } from '@features/songs/models/song.model';
import { LyricsService } from '@features/songs/services/lyrics/lyrics.service';
import { ScaleService } from '@features/songs/services/scale/scale.service';

@Component({
  selector: 'app-lyrics-editor',
  templateUrl: './lyrics-editor.component.html',
  styleUrls: ['./lyrics-editor.component.scss']
})
export class LyricsEditorComponent {

  song: Song = new Song(JSON_SONG_JIREH);

  partContext = { title: 'Ajouter une partie', action: 'PART' };

  constructor(
    public scaleService: ScaleService,
    public lyricService: LyricsService
  ) {
    console.log('SONG', this.song);
  }

  save() {
    console.log('SONG', this.song);
  }

  addPart() {
    const partSong = new SongPart();
    partSong.editMode = true;
    this.song.addPart(partSong)
  }

  addLine(part: SongPart) {
    // part.addLine(new SongLine());
  }

  add(action: string, entity?: any) {
    switch (action) {
      case 'PART':
        this.addPart();
        break;
      // case 'LINE':
      //   this.addLine(entity);
      //   break;
    }
  }

  getLineContext(part: SongPart) {
    return { title: 'Ajouter un vers', action: 'LINE', entity: part };
  }

  /**
   * Actions on part
   */

  savePart(part: SongPart) {
    if (part.chordEditMode) {
      part.textWithChords = part.editTextWithChords;
    } else {
      part.text = part.editText;
    }

    // Deactivate edit mode
    part.editMode = false;
    part.chordEditMode = false;
  }

  editPart(part: SongPart) {
    part.editMode = true;
    part.editText == part.text;
  }

  cancelEdit(part: SongPart) {
    part.editMode = false;
    part.chordEditMode = false;
    part.editText = '';
    part.editTextWithChords = '';
    part.previewPart = null;
  }

  editChords(part: SongPart) {
    if (!part.textWithChords && part.text) {
      part.textWithChords = part.text;
    }
    // Init tmp edit content so we won't loose when cancelled
    part.editTextWithChords = part.textWithChords;

    part.editMode = true;
    part.chordEditMode = true;

    // Connect to part changes to preview
    part.previewPart = new SongPart();
    part.onPreviewChordsUpdated.subscribe((text: string) => {
      if (part.previewPart) {
        part.previewPart.textWithChords = text;
      }
      console.log('chords have changed', text, part.previewPart);
    })

  }

  duplicatePart(part: SongPart) {
    this.song.addPart(part);
  }

  previewLyrics() {
    // Open dialog to display lyricsAndChord category
  }

  /**
   * When we edit chord lyrics. remove strip tags and save to tmp value
   * @param value
   * @param part
   */
  onChordTextUpdated(value: any, part: SongPart) {
    let v = value?.innerHTML;
    console.log('value changes', v);
    v = this.removeTags(v);
    const matchedChords = v.match(CHORD_REGEX);

    // If there are chords, and text has been updated
    // Condition to avoid
    if (v && matchedChords && part.editTextWithChords !== v) {
      console.log('chord detected', matchedChords);
      part.editTextWithChords = v;
    }
  }

  removeTags(str: string) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replaceAll('<br>', "\n")
      .replace(/(<([^>]+)>)/ig, '');
  }
}
