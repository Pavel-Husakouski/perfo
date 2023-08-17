# Perfo

A minimalist starter repository and a utility library for performance testing.

## Capabilities
* TypeScript
* mocha

## Usage

```javascript
import { counter } from 'perfo';
// ...
const c = counter();

channel.consume(queue, function (msg) {
    c.write(msg.content.length);

    const {throughput, rps} = c.read();

    console.log(" [x] Received %s", size, 'throughput:', throughput, 'bytes/s', 'rps:', rps, 'msg/s');

    channel.ack(msg);
}, {
    noAck: false
});
```