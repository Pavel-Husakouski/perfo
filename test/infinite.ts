import { counter } from '../src';
import { setTimeout } from 'timers/promises';

const c = counter();

while (true) {
    c.write(0 | (Math.random() * 1000));

    setTimeout(0 | (Math.random() * 1000));

    console.log(c.read());
}