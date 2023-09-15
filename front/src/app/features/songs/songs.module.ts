import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChordGeneratorComponent } from './components/chord-generator/chord-generator.component';
import { LyricsBuilderComponent } from './components/lyrics-builder/lyrics-builder.component';
import { LyricsViewerComponent } from './components/lyrics-viewer/lyrics-viewer.component';
import { LyricsAndChordsComponent } from './pages/lyrics-and-chords/lyrics-and-chords.component';
import { LyricsEditorComponent } from './pages/lyrics-editor/lyrics-editor.component';
import { ScaleGlossaryComponent } from './components/scale-glossary/scale-glossary.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { SongLibraryComponent } from './pages/song-library/song-library.component';
import { SongsRoutingModule } from './songs-routing.module';
import { PipesModule } from '@shared/pipes/pipes.module';


@NgModule({
  declarations: [
    LyricsAndChordsComponent,
    LyricsBuilderComponent,
    LyricsViewerComponent,
    ScaleGlossaryComponent,
    ChordGeneratorComponent,
    LyricsEditorComponent,
    SongLibraryComponent,
    SongDetailComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ]
})
export class SongsModule { }
