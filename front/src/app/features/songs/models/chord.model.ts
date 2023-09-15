import { Alteration } from "./alteration.model";
import { ModeInterface, ModeMajor, ModeMinor } from "./music-basics.model";
import { ChromaticScale, ChromaticScaleFlat, Note } from "./note.model";

export class Scale {

    _id: string;
    label_fr: string;
    label_en: string;
    mode: ModeInterface;
    formula: Array<number> = [];
    notes: Array<Note> = [];
    baseNote: Note;

    private MAX_NOTES_COUNT = 12;

    private chromaticScale: Note[];

    constructor(note: Note, formula: number[], mode: ModeInterface, flatScale?: boolean) {
        this.baseNote = note;
        this.formula = formula;
        this.mode = mode;

        if (flatScale == undefined) {
            flatScale = note.alteration == Alteration.FLAT ? true : false;
        }

        this.chromaticScale = !flatScale ? ChromaticScale : ChromaticScaleFlat;
        this.init();
    }

    init() {
        // Get base note index
        let noteIndex: number = this.chromaticScale.indexOf(this.baseNote);

        this.notes.push(this.baseNote);

        this.formula.forEach((i: number) => {
            noteIndex = (noteIndex + this.toSemitones(i)) % this.MAX_NOTES_COUNT;
            this.notes.push(this.chromaticScale[noteIndex]);
        });
    }

    toSemitones(value: number): number {
        return value / 0.5;
    }

    name(): string {
        return this.baseNote.toString() + this.mode.toString();
    }

    toString(): string {
        let res = '';
        this.notes.forEach((note: Note, index) => {
            res += (index ? ' - ' : '') + note.toString();
        });
        return res;
    }
}

/**
 * Major Chord class
 */
export class ChordMajor extends Scale {

    constructor(note: Note, flatScale = false) {
        const formula: number[] = [2, 1.5];
        const mode: ModeInterface = new ModeMajor;
        super(note, formula, mode, flatScale);
    }
}

/**
 * Minor Chord class
 */
export class ChordMinor extends Scale {

    constructor(note: Note, flatScale = false) {
        const formula: number[] = [1.5, 2];
        const mode: ModeInterface = new ModeMajor;
        super(note, formula, mode, flatScale);
    }
}

/**
 * Major scale class
 */
export class MajorScale extends Scale {

    constructor(note: Note, flatScale = false) {
        const formula: number[] = [1, 1, 0.5, 1, 1, 1, 0.5];
        const mode: ModeInterface = new ModeMajor;
        super(note, formula, mode, flatScale);
    }
}

/**
 * Minor scale class
 */
export class MinorScale extends Scale {

    constructor(note: Note, flatScale = false) {
        const formula: number[] = [1, 0.5, 1, 1, 0.5, 1, 1];
        const mode: ModeInterface = new ModeMinor;
        super(note, formula, mode, flatScale);
    }
}