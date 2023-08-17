interface Chunk {
    size: number;
    time: number;
}

export function counter(period = 1000) {
    let queue: Array<Chunk> = [];

    return {read, write, reset};

    function read() {
        const now = Date.now();
        queue = queue.filter(({time}) => now - time < period); // a linked list would be better for sure, but this is just a demo

        return {
            throughput: queue.reduce((acc, {size}) => acc + size, 0),
            rps: queue.length
        }
    }

    function write(size: number) {
        queue.push({size, time: Date.now()});

        const first = queue[0];
        const last = queue.slice(-1)[0];

        if(last.time - first.time > period) {
            queue.shift();
        }
    }

    function reset() {
        queue = [];
    }
}
