import { Game } from './Game';

function setup() {
    const g = new Game();

    const rollMany = (n: number, pins: number) => {
        for (let i = 0; i < n; i++) {
            g.roll(pins);
        }
    };

    // スペアを取る
    const rollSpare = () => {
        rollMany(2, 5);
    };

    const rollStrike = () => {
        g.roll(10);
    };

    return { g, rollMany, rollSpare, rollStrike };
}

test('gutterGame', () => {
    const { g, rollMany } = setup();
    rollMany(20, 0);

    expect(0).toEqual(g.score());
});

test('allOnes', () => {
    const { g, rollMany } = setup();
    rollMany(20, 1);

    expect(20).toEqual(g.score());
});

test('oneSpare', () => {
    const { g, rollSpare, rollMany } = setup();
    rollSpare(); // スペア
    g.roll(7); // スペアボーナス
    rollMany(17, 0); // ガーター

    expect(24).toEqual(g.score());
});

test('oneStrike', () => {
    const { g, rollMany, rollStrike } = setup();
    rollStrike(); // ストライク
    g.roll(3); // ストライクボーナス
    g.roll(4); // ストライクボーナス
    rollMany(16, 0); // ガーター

    expect(24).toEqual(g.score());
});

test('perfectGame', () => {
    const { g, rollMany } = setup();
    rollMany(12, 10);

    expect(300).toEqual(g.score());
});
