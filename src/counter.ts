interface Chunk {
  size: number;
  time: number;
}

export function counter(period = 10000) {
  let queue: Array<Chunk> = [];

  return { read, write, reset };

  function read() {
    const now = Date.now();
    queue = queue.filter(({ time }) => now - time < period); // a linked list would be better for sure, but this is just a demo

    if (queue.length === 0) return { throughput: 0, rps: 0 };

    const start = queue[0]?.time ?? now;
    const end = queue.slice(-1)[0]?.time ?? now;
    const totalThroughput = queue.reduce((acc, { size }) => acc + size, 0);
    const duration = end - start;

    return {
      throughput: totalThroughput / (duration / 1000),
      rps: queue.length / (duration / 1000),
    };
  }

  function write(size: number) {
    queue.push({ size, time: Date.now() });

    const first = queue[0];
    const last = queue.slice(-1)[0];

    if (last.time - first.time > period) {
      queue.shift();
    }
  }

  function reset() {
    queue = [];
  }
}
