import { Chunk } from './chunk';
import { Queue } from './queue';

export function createQueue(period: number): Queue {
    let queue: Chunk[] = [];

    function add(entry: Chunk) {
        queue.push(entry);
    }

    function head() {
        return queue.at(-1);
    }

    function tail() {
        return queue.at(0);
    }

    function length() {
        return queue.length;
    }

    function reduce<U>(fn: (acc: U, current: Chunk) => U, initial: U): U {
        queue = trim(queue, period);

        return queue.reduce(fn, initial);
    }

    return {
        add,
        head,
        tail,
        length,
        reduce
    };
}

function trim(timeSeries: Chunk[], threshold: number) {
    const position = findPositionFromStart(timeSeries, threshold);

    if (position === 0) {
        return timeSeries;
    }

    return timeSeries.slice(position);
}

function findPositionFromStart(timeSeries: Chunk[], threshold: number) {
    if (timeSeries.length < 2) {
        return 0;
    }

    const start = timeSeries.at(-1);
    const endTime = start.time - threshold;
    let left = 0;
    let right = timeSeries.length - 2;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (timeSeries[mid].time >= endTime) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}
