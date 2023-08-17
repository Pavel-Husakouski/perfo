import { expect } from 'chai';
import {counter} from "../lib";

describe('a counter', () => {
    it('empty counter should render zero', () => {
        const c = counter();

        expect(c.read()).to.deep.equal({throughput: 0, rps: 0});
    });

    it('single call', () => {
        const c = counter();

        c.write(1000);

        expect(c.read()).to.deep.equal({throughput: 1000, rps: 1});
    });

    it('multiple calls', () => {
        const c = counter();

        c.write(1000);
        c.write(100);
        c.write(10);
        c.write(1);

        expect(c.read()).to.deep.equal({throughput: 1111, rps: 4});
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

    it('multiple calls with delay', async function () {
        this.timeout(10000);

        const c = counter();

        c.write(1000);
        await delay(500);
        c.write(1000);
        await delay(500);
        c.write(1000);
        await delay(500);
        c.write(1000);

        expect(c.read()).to.deep.equal({throughput: 2000, rps: 2});
    });
});

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}