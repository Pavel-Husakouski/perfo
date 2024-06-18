import { Chunk } from './chunk';

export interface Queue {
    add(entry: Chunk): void;
    first(): Chunk;
    last(): Chunk;
    length(): number;
    reduce<U>(fn: (acc: U, current: Chunk) => U, initial: U): U;
}
