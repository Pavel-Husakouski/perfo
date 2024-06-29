import { counter } from '../src';
import { setTimeout } from 'timers/promises';

const c = counter();

async function main() {
    while (true) {
        c.write(0 | (Math.random() * 1000));

        await setTimeout(0 | (Math.random() * 1000));

        console.log(c.read());
    }
}

main();