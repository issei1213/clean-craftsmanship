export class Underflow extends Error {}
export class Stack {
    private empty: boolean = true;
    private size: number = 0;
    private elements: number[] = [];

    isEmpty() {
        return this.size === 0;
    }

    push(element: number) {
        this.size++;
        this.elements[this.size] = element;
    }

    pop() {
        if (this.size === 0) throw new Underflow();

        this.size--;
        return this.elements[this.size + 1];
    }

    getSize(): number {
        return this.size;
    }
}
