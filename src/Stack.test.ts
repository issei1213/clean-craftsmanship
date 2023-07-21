import { Stack }  from './Stack'

test('canCreateStack', () => {
    const stack = new Stack()

    expect(stack.isEmpty()).toEqual(true)
})
