type VideoType = 'REGULAR' | 'CHILDRENS';

export class RentalCalculator {
    private rentals: Rental[] = [];

    // レンタルする映画を追加する
    public addRental(title: string, days: number) {
        this.rentals.push(new Rental(title, days));
    }

    // レンタル料金を計算する
    public getRentalFee() {
        let fee = 0;

        for (const rental of this.rentals) {
            fee += rental.getFee();
        }

        return fee;
    }

    // レンタルポイントを計算する
    public getRenterPoints() {
        let points = 0;

        for (const rental of this.rentals) {
            points += rental.getPoints();
        }

        return points;
    }
}

class Rental {
    public days: number;
    public movie: Movie;

    constructor(title: string, days: number) {
        this.days = days;
        this.movie = VideoRegistry.getMovie(title);
    }

    public getTitle() {
        return this.movie.getTitle();
    }

    public getFee() {
        return this.movie.getFee(this.days, this);
    }

    public getPoints() {
        return this.movie.getPoints(this.days, this);
    }

    // 期間中のレンタル料金を計算する
    private static applyGracePeriod(amount: number, days: number, grace: number) {
        if (days > grace) {
            return amount + amount * (days - grace);
        }

        return amount;
    }
}

export class VideoRegistry {
    public static videoRegistry = new Map<string, VideoType>();

    public static getMovie(title: string) {
        switch (this.videoRegistry.get(title)) {
            case 'REGULAR':
                return new RegularMovie(title);
            case 'CHILDRENS':
                return new ChildrenMovie(title);
            default:
                throw new Error('Invalid video type');
        }
    }

    public static addMovie(title: string, type: VideoType) {
        this.videoRegistry.set(title, type);
    }
}

abstract class Movie {
    public constructor(private title: string) {}

    public getTitle() {
        return this.title;
    }

    public abstract getFee(days: number, rental: Rental): number;
    public abstract getPoints(days: number, rental: Rental): number;
    protected static applyGracePeriod(amount: number, days: number, grace: number) {
        if (days > grace) {
            return amount + amount * (days - grace);
        }

        return amount;
    }
}

class RegularMovie extends Movie {
    constructor(title: string) {
        super(title);
    }

    public getFee(days: number, rental: Rental) {
        return Movie.applyGracePeriod(150, days, 3);
    }

    public getPoints(days: number, rental: Rental) {
        return Movie.applyGracePeriod(1, days, 3);
    }
}

class ChildrenMovie extends Movie {
    constructor(title: string) {
        super(title);
    }

    public getFee(days: number, rental: Rental) {
        return days * 100;
    }

    public getPoints(days: number, rental: Rental) {
        return 1;
    }
}
