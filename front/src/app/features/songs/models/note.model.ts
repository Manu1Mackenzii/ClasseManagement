import { Alteration } from "./alteration.model";

export enum NoteEnum {
    DO = <any> 'DO',
    DO_SHARP = <any> 'DO&#9839',
    RE = <any> 'RE',
    RE_FLAT = <any> 'RE&#9837',
    RE_SHARP = <any> 'RE&#9839',
    MI = <any> 'MI',
    MI_FLAT = <any> 'MI&#9837',
    FA = <any> 'FA',
    FA_SHARP = <any> 'FA&#9839',
    SOL = <any> 'SOL',
    SOL_FLAT = <any> 'SOL&#9837',
    SOL_SHARP = <any> 'SOL&#9839',
    LA = <any> 'LA',
    LA_FLAT = <any> 'LA&#9837',
    LA_SHARP = <any> 'LA&#9839',
    SI = <any> 'SI',
    SI_FLAT = <any> 'SI&#9837'
}

export enum NoteEnglishEnum {
    C = 'C',
    C_SHARP = 'C&#9839',
    D = 'D',
    D_FLAT = 'D&#9837',
    D_SHARP = 'D&#9839',
    E = 'E',
    E_FLAT = 'E&#9837',
    E_SHARP = 'E&#9839',
    F = 'F',
    F_FLAT = 'F&#9837',
    F_SHARP = 'F&#9839',
    G = 'G',
    G_FLAT = 'G&#9837',
    G_SHARP = 'G&#9839',
    A = 'A',
    A_FLAT = 'A&#9837',
    A_SHARP = 'A&#9839',
    B = 'B',
    B_FLAT = 'B&#9837',
}


/**
 * Class to define Note
 */
export class Note {

    index: number;
    label: NoteEnum;
    labelEn: NoteEnglishEnum;
    alteration?: Alteration;

    constructor(note: NoteEnum, alteration?: Alteration) {
        this.label = note;
        if (alteration) {
            this.alteration = alteration;
        }
    }

    hasAlteration(): boolean {
        return this.alteration ? true : false;
    }

    isSharp(): boolean {
        return this.alteration == Alteration.SHARP;
    }

    getLabel(lang = 'fr') {
        return lang == 'fr' ? this.label : this.labelEn;
    }

    toString(lang = 'fr') {
        let value = '' + this.getLabel(lang);
        if (this.alteration) {
            value += this.alteration;
        }
        return value;
    }
}

/**
 * Déclaration des classes des notes
 */
export const SI_Sharp = new Note(NoteEnum.SI, Alteration.SHARP);
export const DO = new Note(NoteEnum.DO);

export const DO_Sharp = new Note(NoteEnum.DO, Alteration.SHARP);
export const RE_Flat = new Note(NoteEnum.RE, Alteration.FLAT);

export const RE = new Note(NoteEnum.RE);

export const RE_Sharp = new Note(NoteEnum.RE, Alteration.SHARP);
export const MI_Flat = new Note(NoteEnum.MI, Alteration.FLAT);

export const MI = new Note(NoteEnum.MI);
export const FA_Flat = new Note(NoteEnum.FA, Alteration.FLAT);

export const MI_Sharp = new Note(NoteEnum.MI, Alteration.SHARP);
export const FA = new Note(NoteEnum.FA);


export const FA_Sharp = new Note(NoteEnum.FA, Alteration.SHARP);
export const SOL_Flat = new Note(NoteEnum.SOL, Alteration.FLAT);


export const SOL = new Note(NoteEnum.SOL);

export const SOL_Sharp = new Note(NoteEnum.SOL, Alteration.SHARP);
export const LA_Flat = new Note(NoteEnum.LA, Alteration.FLAT);


export const LA = new Note(NoteEnum.LA);

export const LA_Sharp = new Note(NoteEnum.LA, Alteration.SHARP);
export const SI_Flat = new Note(NoteEnum.SI, Alteration.FLAT);

export const SI = new Note(NoteEnum.SI);
export const DO_Flat = new Note(NoteEnum.DO, Alteration.FLAT);


/**
 * Gamme chromatique montante
 */
export const ChromaticScale: Note[] =
    [DO, DO_Sharp, RE, RE_Sharp, MI, FA, FA_Sharp, SOL, SOL_Sharp, LA, LA_Sharp, SI];


/**
 * Gamme chromatique descendante
 */
export const ChromaticScaleFlat: Note[] =
    [DO, RE_Flat, RE, MI_Flat, MI, FA, SOL_Flat, SOL, LA_Flat, LA, SI_Flat, SI];

/**
 * Note mapping
 */
export const NoteMap: Map<string, Note> = new Map([
    [NoteEnum[NoteEnum.DO], DO],
    [NoteEnum[NoteEnum.DO_SHARP], DO_Sharp],
    [NoteEnum[NoteEnum.RE], RE],
    [NoteEnum[NoteEnum.RE_FLAT], RE_Flat],
    [NoteEnum[NoteEnum.RE_SHARP], RE_Sharp],
    [NoteEnum[NoteEnum.MI], MI],
    [NoteEnum[NoteEnum.MI_FLAT], MI_Flat],
    [NoteEnum[NoteEnum.FA], FA],
    [NoteEnum[NoteEnum.FA_SHARP], FA_Sharp],
    [NoteEnum[NoteEnum.SOL], SOL],
    [NoteEnum[NoteEnum.SOL_FLAT], SOL_Flat],
    [NoteEnum[NoteEnum.SOL_SHARP], SOL_Sharp],
    [NoteEnum[NoteEnum.LA], LA],
    [NoteEnum[NoteEnum.LA_FLAT], LA_Flat],
    [NoteEnum[NoteEnum.LA_SHARP], LA_Sharp],
    [NoteEnum[NoteEnum.SI], SI],
    [NoteEnum[NoteEnum.SI_FLAT], SI_Flat],
]);

/**
 * Note Translate Mapping
 */
