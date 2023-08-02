function factorsOf(n: number): number[] {
    const factors = [];

    for (let divisor = 2; n > 1; divisor++) {
        for (; n % divisor === 0; n /= divisor) {
            factors.push(divisor);
        }
    }

    return factors;
}
test('factors', () => {
    expect(factorsOf(1)).toStrictEqual([]);
    expect(factorsOf(2)).toStrictEqual([2]);
    expect(factorsOf(3)).toStrictEqual([3]);
    expect(factorsOf(4)).toStrictEqual([2, 2]);
    expect(factorsOf(5)).toStrictEqual([5]);
    expect(factorsOf(6)).toStrictEqual([2, 3]);
    expect(factorsOf(7)).toStrictEqual([7]);
    expect(factorsOf(8)).toStrictEqual([2, 2, 2]);
    expect(factorsOf(9)).toStrictEqual([3, 3]);
});
