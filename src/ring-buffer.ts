export function createRingBuffer<T>(initialCapacity = 1000) {
    const buffer = new Array<T>(initialCapacity);

    let headIndex = -1;
    let tailIndex = -1;

    function add(entry: T) {
        if (headIndex == -1) {
            headIndex = tailIndex = 0;
            buffer[headIndex] = entry;
            return;
        }
        if (length() === capacity()) {
            extend();
        }
        headIndex = (headIndex + 1) % capacity();
        buffer[headIndex] = entry;
    }

    function extend() {
        if (headIndex > tailIndex) {
            buffer.length *= 2;
            return;
        }
        const amountToCopy = capacity() - tailIndex;
        buffer.length *= 2;
        let i = capacity() - amountToCopy;
        let j = tailIndex;
        while (i < capacity()) {
            buffer[i] = buffer[j];
            i++;
            j++;
        }
        tailIndex = capacity() - amountToCopy;
    }

    function capacity() {
        return buffer.length;
    }

    function length(): number {
        if (headIndex === -1) {
            return 0;
        }
        if (headIndex >= tailIndex) {
            return headIndex - tailIndex + 1;
        }
        return headIndex + 1 + capacity() - tailIndex;
    }

    function trim(i: number) {
        tailIndex = index(i);
    }

    function index(i: number) {
        if (i < 0 || i >= length()) {
            throw new Error('Index out of bounds');
        }

        if(headIndex >= tailIndex) {
            return tailIndex + i;
        }

        return (tailIndex + i) % capacity();
    }

    function at(i: number): T {
        return buffer[index(i)];
    }

    function head(): T {
        return headIndex === -1 ? undefined : buffer[headIndex];
    }

    function tail(): T {
        return tailIndex === -1 ? undefined : buffer[tailIndex];
    }

    return {
        add,
        head,
        tail,
        length,
        capacity,
        trim,
        at,
        getState: () => ({headIndex, tailIndex, capacity: buffer.length, length: length()})
    }
}