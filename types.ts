import {number} from "prop-types";

export type ProviderMapInterface = {
    [key: string]: Array<string>
}

export interface Game {
    id: string,
    created: any,
    name: string,
    players: string[],
    turns: {[P: number]: {isFinished: boolean, turnsRecord: {[P: string]: string}}}
}
