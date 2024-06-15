import { expect } from 'chai';
import {counter} from "../lib";
import {setTimeout} from "node:timers/promises";

describe('a counter', () => {
    it('empty counter should render zero', () => {
        const c = counter();

        expect(c.read()).to.deep.equal({throughput: 0, rps: 0});
    });

    it('single call', () => {
        const c = counter();

        c.write(1000);

        expect(c.read()).to.deep.equal({throughput: Infinity, rps: Infinity});
    });

    it('reset', () => {
        const c = counter();

        c.write(1000);
        c.write(100);
        c.write(10);
        c.write(1);
        c.reset();

        expect(c.read()).to.deep.equal({throughput: 0, rps: 0});
    });

    it('multiple calls with delay less that a second', async function () {
        this.timeout(10000);

        const c = counter();

        const start = Date.now();
        c.write(1000);
        await delay(500);
        c.write(1000);
        await delay(500);
        c.write(1000);
        await delay(500);
        c.write(1000);
        const end = Date.now();

        const duration = end - start;

        console.log('duration', duration);
        console.log(4000 / duration, 4 / (duration / 1000));

        const { throughput, rps } = c.read();

        console.log(throughput, rps);

        expect(throughput).to.greaterThan(2000).and.lessThan(3000);
        expect(rps).to.greaterThan(2).and.lessThan(3);
    });

    it('multiple calls with delay greater that a second', async function () {
        this.timeout(10000);

        const c = counter();

        const start = Date.now();
        c.write(1000);
        await delay(1300);
        c.write(1000);
        await delay(1300);
        c.write(1000);
        await delay(1300);
        c.write(1000);
        const end = Date.now();

        const duration = end - start;

        console.log('duration', duration);
        console.log(4000 / duration, 4 / (duration / 1000));

        const { throughput, rps } = c.read();

        console.log(throughput, rps);

        expect(throughput).to.greaterThan(1000).and.lessThan(1500);
        expect(rps).to.greaterThan(1).and.lessThan(1.5);
    });

    it('multiple calls with low rps', async function () {
        this.timeout(10000);

        const c = counter();

        const start = Date.now();
        c.write(1000);
        await delay(2300);
        c.write(1000);
        await delay(2300);
        c.write(1000);
        await delay(2300);
        c.write(1000);
        const end = Date.now();

        const duration = end - start;

        console.log('duration', duration);
        console.log(4000 / duration, 4 / (duration / 1000));

        const { throughput, rps } = c.read();

        console.log(throughput, rps);

        expect(throughput).to.greaterThan(500).and.lessThan(1000);
        expect(rps).to.greaterThan(0.5).and.lessThan(1);
    });
});

const delay = setTimeout;