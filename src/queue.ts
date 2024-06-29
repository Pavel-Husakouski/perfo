import { Chunk } from './chunk';

export interface Queue {
    add(entry: Chunk): void;
    head(): Chunk;
    tail(): Chunk;
    length(): number;
    reduce<U>(fn: (acc: U, current: Chunk) => U, initial: U): U;
}

export type State = {
    getState(): {headIndex: number, tailIndex: number, capacity: number, length: number};
}

