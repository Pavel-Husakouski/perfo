import { Queue, State } from './queue';
import { Chunk } from './chunk';
import { createRingBuffer } from './ring-buffer';

export function createQueue(period: number, initialCapacity = 1000): Queue & State {
    const buffer = createRingBuffer<Chunk>(initialCapacity);

    function add(entry: Chunk) {
        buffer.add(entry);

        const index = findThatPosition()

        if(index != -1) {
            buffer.trim(index);
        }
    }

    function findThatPosition() {
        const start = buffer.head();
        const endTime = start.time - period;
        let begin = 0;
        let end = length() - 1;
        let result = -1;

        while (begin <= end) {
            const mid = Math.floor((begin + end) / 2);
            if (buffer.at(mid).time >= endTime) {
                result = mid;
                end = mid - 1;
            } else {
                begin = mid + 1;
            }
        }

        return result;
    }

    function head() {
        return buffer.head();
    }

    function tail() {
        return buffer.tail();
    }

    function length(): number {
        return buffer.length();
    }

    function reduce<U>(fn: (acc: U, current: Chunk) => U, initial: U): U {
        let acc = initial;

        for (let i = 0; i < length(); i++) {
            acc = fn(acc, buffer.at(i));
        }

        return acc;
    }

    return {
        add,
        head,
        tail,
        length,
        reduce,
        getState: () => buffer.getState()
    };
}
