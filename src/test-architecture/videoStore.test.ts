import { RentalCalculator, VideoRegistry } from './videoStore';

function setup() {
    const customer = new RentalCalculator();

    VideoRegistry.addMovie('RegularMovie', 'REGULAR');
    VideoRegistry.addMovie('ChildrenMovie', 'CHILDRENS');

    return { customer };
}
// 要件1: 通常の映画は初日は1.5ドルでレンタルできる。また、1日ごとに1レンタルポイントを獲得できる
test('RegularMovie_OneDay', () => {
    const { customer } = setup();
    customer.addRental('RegularMovie', 1);

    expect(customer.getRentalFee()).toBe(150);
    expect(customer.getRenterPoints()).toBe(1);
});

// 要件2: 通常の映画は2日目と3日目は無料でレンタルできる。なお二日目と３日目はポイントを獲得できない。
test('RegularMovie_SecondDayAndThirdDayFree', () => {
    const { customer } = setup();

    customer.addRental('RegularMovie', 2);
    expect(customer.getRentalFee()).toBe(150);
    expect(customer.getRenterPoints()).toBe(1);
});

test('RegularMovie_SecondDayFree', () => {
    const { customer } = setup();

    customer.addRental('RegularMovie', 3);
    expect(customer.getRentalFee()).toBe(150);
    expect(customer.getRenterPoints()).toBe(1);
});
// 要件4: 子供向けの映画は１日１ドルでレンタルできる。また、１レンタルポイントを獲得できる。
test('ChildrenMovie_OneDay', () => {
    const { customer } = setup();

    customer.addRental('ChildrenMovie', 1);
    expect(customer.getRentalFee()).toBe(100);
    expect(customer.getRenterPoints()).toBe(1);
});

test('ChildrenMovie_FourDays', () => {
    const { customer } = setup();

    customer.addRental('ChildrenMovie', 4);
    expect(customer.getRentalFee()).toBe(400);
    expect(customer.getRenterPoints()).toBe(1);
});

// 複数の映画を扱えるようにする
test('OneRegularOneChildrens_FourDays', () => {
    const { customer } = setup();

    customer.addRental('RegularMovie', 4);
    customer.addRental('ChildrenMovie', 4);
    expect(customer.getRentalFee()).toBe(700);
    expect(customer.getRenterPoints()).toBe(3);
});
