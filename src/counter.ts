import { createQueue } from './ring-buffer-queue';

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

    const totalThroughput = queue.reduce((acc, { size }) => acc + size, 0);
    const first = queue.head().time;
    const last = queue.tail().time;
    const duration = first - last;

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
