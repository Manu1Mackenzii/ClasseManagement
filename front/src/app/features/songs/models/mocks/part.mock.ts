
import { Song, SongPart, SongPartEnum } from "../song.model";

const SONG_JIREH_LYRICS = {
    verse: "Rien ne pourra changer, Ton amour pour moi\nTu m’as toujours aimé, sans relâche (et) Ton amour n’abandonne pas\nBien que je sois imparfait, Tu es fier de moi\nRien ne pourra changer, Ton amour pour moi\n\nAucune tempête, ne m’arrêtera\nAu milieu des vents, Je reconnais le son de Ta voix m'appeller à Toi\nTu traverserais les mers, si je me noyais\nRien ne t’empêchera de me protéger",
    refrain: "Jireh, je n'ai que toi\nJireh, je n'ai que toi\nEn toute circonstance, je serai comblé\nJireh, je n'ai que toi",
    refrainWithChords: "[SOL]Ji[Lam]reh, je n'ai que [FA]toi [DO/Mi]\n[SOL]Ji[Lam]reh, je n'ai que [FA]toi [DO/Mi]\nEn [SOL]toute circons[LAm]tance, je [REm]serai com[DO]blé\n[SOL]Ji[Lam]reh, je n'ai que [FA]toi [DO/Mi]",
    interlude: "Je n’ai que Toi\nJe n’ai que Toi\nJe n’ai que Toi\nJe n’ai que Toi\nJe n’ai que Toi\nJe n’ai que Toi\n",
    bridge: "Je sais que Tu m’aimes\nEt que Tu m’as choisi\nJe sais qui Tu es\nAlors je sais qui je suis\nJe sais que Tu m’aimes\nPlus que je ne l’imagine\n(Et) je n’ai que Toi\n"
}

/**
 * Init sample song
 */
export const MOCK_SONG: Song = new Song;

const partIntro = new SongPart;
partIntro.editMode = false;
partIntro.type = SongPartEnum.INTRO;
partIntro.text = '';
MOCK_SONG.addPart(partIntro);

const partVerse = new SongPart;
partVerse.editMode = false;
partVerse.type = SongPartEnum.VERSE;
partVerse.text = SONG_JIREH_LYRICS.verse;
MOCK_SONG.addPart(partVerse);

const partRefrain = new SongPart;
partRefrain.editMode = false;
partRefrain.type = SongPartEnum.REFRAIN;
partRefrain.text = SONG_JIREH_LYRICS.refrain;
MOCK_SONG.addPart(partRefrain);

const partInterlude = new SongPart;
partInterlude.editMode = false;
partInterlude.type = SongPartEnum.INTERLUDE;
partInterlude.text = SONG_JIREH_LYRICS.interlude;
MOCK_SONG.addPart(partInterlude);

const partBridge = new SongPart;
partBridge.editMode = false;
partBridge.type = SongPartEnum.BRIDGE;
partBridge.text = SONG_JIREH_LYRICS.bridge;
MOCK_SONG.addPart(partBridge);

export const JSON_SONG_JIREH = {
    title: 'JIREH',
    author: 'Elevation Worship',
    originalKey: 'RE&#9837',
    originalLang: 'ENGLISH',
    lang: 'FRENCH',
    version: '1.0',
    parentId: null,
    lyricist: 'Steven Furtick, Chris Brown, Naomi Raine, Chandler Moore',
    translatedBy: 'Traducteur : Collectif LTC : Daniel Calange',
    copyright: 'Â© 2021 Traduction franÃ§aise par Collectif LTC autorisÃ©e. Asaph Media 33 / For Humans Publishing, Maverick City Publishing, Music by Elevation Worship Publishing (Admin. Sony Music Publishing France) / Heritage Worship Music Publishing, Maverick City Publishing, Naomi Raine Music',
    parts: [
        {
            type: SongPartEnum.VERSE,
            text: SONG_JIREH_LYRICS.verse,
            editMode: false,
            chordEditMode: false
        },
        {
            type: SongPartEnum.REFRAIN,
            text: SONG_JIREH_LYRICS.refrain,
            textWithChords: SONG_JIREH_LYRICS.refrainWithChords,
            editMode: false,
            chordEditMode: false
        },
        {
            type: SongPartEnum.INTERLUDE,
            text: SONG_JIREH_LYRICS.interlude,
            editMode: false,
            chordEditMode: false
        },
        {
            type: SongPartEnum.BRIDGE,
            text: SONG_JIREH_LYRICS.bridge,
            editMode: false,
            chordEditMode: false
        },
    ],
}