import { expect } from 'chai';
import { createQueue } from '../lib/ring-buffer-queue';

describe('queue', () => {
    it('create', () => {
        const queue = createQueue(10, 10);

        expect(queue.getState()).to.deep.equal({
            headIndex: -1,
            tailIndex: -1,
            capacity: 10,
            length: 0
        })
    });

    it('add', () => {
        const queue = createQueue(10, 10);

        queue.add({time: 1, size: 1});
        expect(queue.getState()).to.deep.equal({
            headIndex: 0,
            tailIndex: 0,
            capacity: 10,
            length: 1
        });
    });

    it('do not extend until full', () => {
        const queue = createQueue(10, 5);

        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});

        expect(queue.getState()).to.deep.equal({
            headIndex: 4,
            tailIndex: 0,
            capacity: 5,
            length: 5
        });
    });

    it('extend when full', () => {
        const queue = createQueue(10, 5);

        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});
        queue.add({time: 1, size: 1});

        expect(queue.getState()).to.deep.equal({
            headIndex: 5,
            tailIndex: 0,
            capacity: 10,
            length: 6
        });
    });

    it('trim', () => {
        const queue = createQueue(2, 5);

        queue.add({time: 1, size: 1});
        queue.add({time: 2, size: 1});
        queue.add({time: 3, size: 1});
        queue.add({time: 4, size: 1});
        queue.add({time: 10, size: 1});
        queue.add({time: 12, size: 1});

        expect(queue.getState()).to.deep.equal({
            headIndex: 0,
            tailIndex: 4,
            capacity: 5,
            length: 2
        });
    });

    it('reduce', () => {
        const queue = createQueue(2, 5);

        queue.add({time: 1, size: 1});
        queue.add({time: 2, size: 1});
        queue.add({time: 3, size: 1});
        queue.add({time: 4, size: 1});
        queue.add({time: 10, size: 1});
        queue.add({time: 12, size: 1});

        const result = queue.reduce((acc, chunk) => [...acc, chunk], []);

        expect(result).to.deep.equal([{time: 10, size: 1}, {time: 12, size: 1}]);
    });

});
