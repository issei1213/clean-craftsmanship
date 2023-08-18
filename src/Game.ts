export class Game {
    private rolls: number[] = [];
    private currentRoll: number = 0;
    roll(pins: number) {
        this.rolls[this.currentRoll++] = pins;
    }

    score() {
        let score = 0;
        let frameIndex = 0;

        // 10フレーム分のスコアを計算する
        for (let frame = 0; frame < 10; frame++) {
            if (this.isStrike(frameIndex)) {
                score += 10 + this.strikeBonus(frameIndex);
                frameIndex++;
            } else if (this.isSpare(frameIndex)) {
                // スペアの場合
                score += 10 + this.spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                // スペアでない場合
                score += this.twoBallsInFrame(frameIndex);
                frameIndex += 2;
            }
        }
        return score;
    }

    private isSpare(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
    }

    private isStrike(frameIndex: number) {
        return this.rolls[frameIndex] === 10;
    }

    private strikeBonus(frameIndex: number) {
        return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
    }

    private spareBonus(frameIndex: number) {
        return this.rolls[frameIndex + 2];
    }

    private twoBallsInFrame(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
    }
}
