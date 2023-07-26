import { Stack, Underflow } from './Stack';

test('canCreateStack', () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);
});

test('afterOnePush_isNotEmpty', () => {
    const stack = new Stack();
    stack.push(0);

    expect(stack.isEmpty()).toBe(false);
});

test('afterOnePushAndOnePop_isEmpty', () => {
    const stack = new Stack();

    stack.push(0);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
});

test('afterTwoPushes_sizeIsTwo', () => {
    const stack = new Stack();

    stack.push(0);
    stack.push(0);
    expect(stack.getSize()).toBe(2);
});

test('afterOnePushAndOnePop_isEmpty', () => {
    const stack = new Stack();

    stack.push(0);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.getSize()).toBe(0);
});

test('afterOnePush_isNotEmpty', () => {
    const stack = new Stack();

    stack.push(0);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.getSize()).toBe(1);
});

test('poppingEmptyStack_throwsUnderflow', () => {
    const stack = new Stack();

    expect(() => stack.pop()).toThrow(Underflow);
});

test('afterPushingX_willPopX', () => {
    const stack = new Stack();

    stack.push(99);
    expect(stack.pop()).toBe(99);
    stack.push(88);
    expect(stack.pop()).toBe(88);
});

test('afterPushingXAndY_willPopYthenX', () => {
    const stack = new Stack();

    stack.push(99);
    stack.push(88);
    expect(stack.pop()).toBe(88);
    expect(stack.pop()).toBe(99);
});
