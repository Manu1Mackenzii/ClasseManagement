
export enum ModeEnum {
    MAJOR = 'M',
    MINOR = 'm'
}

export interface ModeInterface {
    label: ModeEnum,
    symbol: 'M' | 'm' | 'maj'
    toString(): string;
}

export class ModeMajor implements ModeInterface {
    label: ModeEnum = ModeEnum.MAJOR;
    symbol: 'M';

    toString(): string {
        return this.symbol;
    }
}

export class ModeMinor implements ModeInterface {
    label: ModeEnum = ModeEnum.MINOR;
    symbol: 'm';

    toString(): string {
        return this.symbol;
    }
}