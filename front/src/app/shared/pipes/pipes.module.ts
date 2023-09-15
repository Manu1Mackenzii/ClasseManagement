import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe/safe.pipe';
import { ChordHighlighterPipe } from './chord-highlighter/chord-highlighter.pipe';



@NgModule({
  declarations: [
    SafePipe,
    ChordHighlighterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafePipe,
    ChordHighlighterPipe
  ]
})
export class PipesModule { }
