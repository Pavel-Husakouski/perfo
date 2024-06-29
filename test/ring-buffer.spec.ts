import { createRingBuffer } from '../lib/ring-buffer';
import { expect } from 'chai';

describe('ring buffer', () => {
    it('create', () => {
        const buffer = createRingBuffer(10);

        expect(buffer.getState()).to.deep.equal({
            headIndex: -1,
            tailIndex: -1,
            capacity: 10,
            length: 0
        })
    });

    it('add', () => {
        const buffer = createRingBuffer(10);

        buffer.add(1);
        expect(buffer.getState()).to.deep.equal({
            headIndex: 0,
            tailIndex: 0,
            capacity: 10,
            length: 1
        });
    });

    it('trim', () => {
        const buffer = createRingBuffer(10);

        for (let i = 0; i < 10; i++) {
            buffer.add(i);
        }

        buffer.trim(7);

        expect(buffer.getState()).to.deep.equal({
            headIndex: 9,
            tailIndex: 7,
            capacity: 10,
            length: 3
        });
    });

    it('add trim add', () => {
        const buffer = createRingBuffer(10);

        for (let i = 0; i < 10; i++) {
            buffer.add(i);
        }

        buffer.trim(8);

        for (let i = 0; i < 5; i++) {
            buffer.add(i);
        }

        expect(buffer.getState()).to.deep.equal({
            headIndex: 4,
            tailIndex: 8,
            capacity: 10,
            length: 7
        });

        const entries = [];

        for(let i = 0; i < buffer.length(); i++) {
            entries.push(buffer.at(i));
        }

        expect(entries).to.deep.equal([8, 9, 0, 1, 2, 3, 4]);
    });
});