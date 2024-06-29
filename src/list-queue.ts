import { Queue } from './queue';
import { Chunk } from './chunk';

interface Entry {
    value: Chunk;
    next: Entry
}

interface List {
    length: number;
    head: Entry;
    tail: Entry;
}

export function createQueue(period: number): Queue {
    const queue: List = {
        length: 0,
        head: null,
        tail: null,
    };

    function add(value: Chunk) {
        const entry: Entry = {
            value,
            next: null,
        };
        if(queue.head != null) {
            queue.head.next = entry;
        }
        queue.head = entry;
        if(queue.tail == null) {
            queue.tail = entry;
        }
        queue.length++;

        trim(queue, period);
    }

    function head() {
        return queue.head?.value;
    }

    function tail() {
        return queue.tail?.value;
    }

    function length() {
        return queue.length;
    }

    function time(entry: Entry) {
        return entry.value.time;
    }

    function trim(queue: List, period: number) {
        if(queue.tail == null) {
            // an impossible case
            return;
        }

        let current = queue.tail;
        let headTime = time(queue.head);
        let count = 0;

        while (current != queue.head) {
            if(time(current) - headTime > period) {
                current = current.next;
                count++;
            } else {
                break;
            }
        }

        queue.tail = current;
        queue.length -= count;
    }

    function reduce<U>(fn: (acc: U, current: Chunk) => U, initial: U): U {
        let acc = initial;
        let current = queue.tail;

        while(current != null) {
            acc = fn(acc, current.value);
            current = current.next;
        }

        return acc;
    }

    return {
        add,
        head,
        tail,
        length,
        reduce
    }
}
