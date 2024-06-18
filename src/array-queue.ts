import { Chunk } from './chunk';
import { Queue } from './queue';

export function createQueue(period: number): Queue {
    const queue: Chunk[] = [];

    function add(entry: Chunk) {
        queue.push(entry);

        trim(queue, period);
    }

    function first() {
        return queue.at(0);
    }

    function last() {
        return queue.at(-1);
    }

    function length() {
        return queue.length;
    }

    return {
        add,
        first,
        last,
        length,
        reduce: queue.reduce.bind(queue)
    }
}

function trim(timeSeries: Chunk[], threshold: number) {
    const position = findPositionFromStart(timeSeries, threshold);

    if(position === 0) {
        return timeSeries;
    }

    return timeSeries.slice(position);
}

function findPositionFromStart(timeSeries: Chunk[], threshold: number) {
    if(timeSeries.length < 2) {
        return 0;
    }

    const start = timeSeries.at(-1);
    const endTime = start.time-threshold;
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
