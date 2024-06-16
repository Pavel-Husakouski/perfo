interface Chunk {
  size: number;
  time: number;
}

export function counter(period = 10000) {
  let queue: Array<Chunk> = [];

  return { read, write, reset };

  function read() {
    if (queue.length === 0) return { throughput: 0, rps: 0 };

    if(queue.length === 1) {
      return {throughput: Infinity, rps: Infinity };
    }

    const start = queue[0].time;
    const end = queue.slice(-1)[0].time;
    const totalThroughput = queue.reduce((acc, { size }) => acc + size, 0);
    const duration = end - start;

    return {
      throughput: totalThroughput / (duration / 1000),
      rps: queue.length / (duration / 1000),
    };
  }

  function trim() {
    const now = Date.now();

    queue = queue.filter(({ time }) => now - time < period); // an optimization is required to cut off the tail of the queue
  }

  function write(size: number) {
    queue.push({ size, time: Date.now() });

    trim();

    return read();
  }

  function reset() {
    queue = [];
  }
}
