import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chordHighlighter'
})
export class ChordHighlighterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const regex = /(\[[^\s]*?\])/igm;
    value = value.replace(regex, '<span class="highlighted-chord-text">$1</span>')
    return value;
  }

}
