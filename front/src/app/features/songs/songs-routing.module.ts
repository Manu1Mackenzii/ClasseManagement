import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaleGlossaryComponent } from './components/scale-glossary/scale-glossary.component';
import { LyricsAndChordsComponent } from './pages/lyrics-and-chords/lyrics-and-chords.component';
import { LyricsEditorComponent } from './pages/lyrics-editor/lyrics-editor.component';
import { SongLibraryComponent } from './pages/song-library/song-library.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scale-glossary',
    pathMatch: 'full'
  },
  {
    path: 'library',
    component: SongLibraryComponent
  },
  {
    path: 'scale-glossary',
    component: ScaleGlossaryComponent
  },
  {
    path: ':id/lyrics-and-chords',
    component: LyricsAndChordsComponent
  },
  {
    path: ':id/lyrics-editor',
    component: LyricsEditorComponent
  },
  {
    path: 'lyrics-editor',
    component: LyricsEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
