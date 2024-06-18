import { createQueue } from './array-queue';

export function counter(period = 10000) {
  let queue = createQueue(period);

  return { read, write, reset };

  function read() {
    if (queue.length() === 0) {
      return { throughput: 0, rps: 0 };
    }

    if(queue.length() === 1) {
      return {throughput: Infinity, rps: Infinity };
    }

    const start = queue.first().time;
    const end = queue.last().time;
    const totalThroughput = queue.reduce((acc, { size }) => acc + size, 0);
    const duration = end - start;

    return {
      throughput: totalThroughput / (duration / 1000),
      rps: queue.length() / (duration / 1000),
    };
  }

  function write(size: number) {
    queue.add({ size, time: Date.now() });
  }

  function reset() {
    queue = createQueue(period);
  }
}
