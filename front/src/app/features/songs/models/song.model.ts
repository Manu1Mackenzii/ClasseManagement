import { BehaviorSubject } from "rxjs";
import { MajorScale, MinorScale, Scale } from "./chord.model";
import { Note, NoteEnum, NoteMap } from "./note.model";

export const CHORD_REGEX = /(\[.*?\])/igm;
export const CHORD_BREAKPOINT_REGEX = /\[.*?\]/
export const LINE_BREAKPOINT = "\n";
export const PART_REGEX = /(\{.*?\})/igm;

export enum SongPartEnum {
    INTRO = 'Intro',
    VERSE = 'Verse',
    REFRAIN = 'Refrain',
    PRE_CHORUS = 'Pre-Chorus',
    CHORUS = 'Chorus',
    BRIDGE = 'Bridge',
    OUTRO = 'Outro',
    HOOK = 'Hook',
    SOLO = 'Solo',
    INTERLUDE = 'Interlude',
    VAMP = 'Vamp'
}

export enum SongLangEnum {
    FRENCH = 'Français',
    ENGLISH = 'Anglais',
    SPANISH = 'Espagnol'
}

/**
 * Song class
 */
export class Song {

    title: string;
    author: string;
    parts: Array<SongPart> = [];
    originalKey: Scale;
    originalLang: SongLangEnum;
    lang: SongLangEnum;
    version: string;
    parentId: string;
    lyricist: string;
    translatedBy: string;
    copyright: string;

    private _chordProFormatText: string;

    constructor(data?: any) {
        if (data) {
            this.parse(data);
        }
    }

    set chordProFormatText(content: string) {

    }

    get chordProFormatText() {
        return this._chordProFormatText;
    }

    // private extractProp(propName: string) {
    //     const regex = new RegExp(`(\{${propName.toLowerCase()}.*?\})`,'igm');
    //     console.log('regex');
    // }

    addPart(part: SongPart) {
        this.parts.push(part);
    }

    removePart(part: SongPart) {
        // const index = this.parts.findIndex(part);
        // this.parts.splice()
    }

    transpose() { }

    /**
     * Convert json to object
     * @param json
     */
    parse(json: any) {
        this.title = json.title ?? '';
        this.author = json.author ?? '';
        this.originalLang = json.originalLang ?? '';
        this.lang = json.lang ?? '';
        this.version = json.version ?? '';
        this.parentId = json.parentId ?? '';
        this.lyricist = json.lyricist ?? '';
        this.translatedBy = json.translatedBy ?? '';
        this.copyright = json.copyright ?? '';

        /** Convert parts */
        if (json.parts) {
            json.parts.forEach((part: any) => {
                this.parts.push(new SongPart(part))
            });
        }

        /** Convert key */
        if (json.originalKey) {
            const note = NoteMap.get(NoteEnum[json.originalKey]);

            if (note) {
                this.originalKey = note.isSharp() ? new MajorScale(note) : new MinorScale(note);
            }
        }
    }
}

/**
 * Song part class
 */
export class SongPart {

    type: SongPartEnum;
    text: string;
    private _textWithChords: string;
    lines: SongLine[] = [];

    // Edition mode
    editMode: boolean = false;
    chordEditMode: boolean = false;
    editText: string;

    private _editTextWithChords: string;
    onPreviewChordsUpdated: BehaviorSubject<string> = new BehaviorSubject<string>('');
    previewPart: SongPart | null;

    constructor(part?: any) {
        if (part) {
            this.parse(part);
        }
    }

    isEditMode() {
        return this.editMode || this.chordEditMode;
    }

    addLine(line: SongLine) {
        this.lines.push(line);
    }

    removeLine(line: SongLine) {

    }

    getChordList(): string[] {
        const chords: string[] = [];
        this.lines.forEach((line: SongLine) => {
            line.segments.forEach((segment: SongLineSegment) => {
                if (segment.chordText) {
                    chords.push(segment.chordText);
                }
            })
        })
        return chords;
    }

    parse(json: any) {
        this.type = json.type ?? '';
        this.text = json.text ?? '';
        this.textWithChords = json.textWithChords ?? json.text ?? '';
        this.editMode = json.editMode ?? true;
        this.chordEditMode = json.chordEditMode ?? false;
    }

    get textWithChords(): string {
        return this._textWithChords;
    }

    /**
     * Set text with chords
     */
    set textWithChords(value: string) {
        this.lines = [];
        this._textWithChords = value;

        // Split lines
        const chordLines = value.split(LINE_BREAKPOINT);

        // For every line, split chord segments and create map
        chordLines.forEach((line: string) => {
            const sl = new SongLine('', line);
            this.lines.push(sl);
        });
    }

    set editTextWithChords(value: string) {
        this._editTextWithChords = value;
        this.onPreviewChordsUpdated.next(value);
    }

    get editTextWithChords(): string {
        return this._editTextWithChords;
    }

    // toString() {
    //     let content = '';
    //     this.lines.forEach((line, index) => {
    //         content += line.toString();
    //         if (index != (this.lines.length - 1)) {
    //             content += '<br>';
    //         }
    //     });
    //     return content;
    // }
}


/**
 * Song line
 */
export class SongLine {
    text: string;
    private _textWithChords: string;
    segments: SongLineSegment[] = [];

    /**
     * Add key mapping || index of char in string => note
     * Add chord mapping
     */
    constructor(simpleLyrics: string, chordLyrics: string) {
        if (simpleLyrics) {
            this.text = simpleLyrics;
        }
        if (chordLyrics) {
            this.textWithChords = chordLyrics;
        }
    }

    /**
     * Set text tine with chords [..]
     */
    set textWithChords(value: string) {
        this._textWithChords = value;

        // Split line into chord segments
        const matchedChords = value.match(CHORD_REGEX);
        const chordSegments = value.split(CHORD_BREAKPOINT_REGEX);

        // Prepare chords map
        if (chordSegments && matchedChords) {
            chordSegments.forEach((element: string, index: number) => {
                const chord = matchedChords[index - 1] ?? '';
                if (chord !== '' || element !== '') {
                    const lineSegment = new SongLineSegment(chord, element);
                    this.segments.push(lineSegment);
                }
            });
        } else if (value.length > 1 && !matchedChords) {
            // Has line without chords
            this.segments.push(new SongLineSegment('', value));
        }
    }

    get textWithChords(): string {
        return this._textWithChords;
    }

    // toString() {
    //     let content = '';
    //     this.segments.forEach((line, index) => {
    //         content += line.toString();
    //         if (index != (this.segments.length - 1)) {
    //             content += '<br>';
    //         }
    //     });
    //     return content;
    // }
}


/**
 * Song word...
 * Part of the line referenced by chords
 */
export class SongLineSegment {
    private _lyricSegment: string;
    private _chordText: string;
    private _note: Note;
    private _chord: Scale;
    private _beat: number;

    constructor(chord: string, text: string) {
        this.chordText = chord;
        this.lyricSegment = text;
    }

    set chordText(value: string) {
        this._chordText = value.replace('[', '').replace(']', '');
    }

    get chordText(): string {
        return this._chordText;
    }

    set lyricSegment(value: string) {
        this._lyricSegment = value !== '' ? value.replace(/ /g, '&nbsp;') : '&nbsp;'
    }

    get lyricSegment(): string {
        return this._lyricSegment;
    }

    get note(): Note {
        return this._note;
    }

    get chord(): Scale {
        return this._chord;
    }

    set beat(value: number) {
        this._beat = value;
    }

    get beat(): number {
        return this._beat;
    }
}

