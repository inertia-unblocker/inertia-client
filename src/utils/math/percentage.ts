export class Percentage {
	max: number;

	constructor(max: number) {
		this.max = max;
	}

	getPercentage(value: number): number {
		return (value / this.max) * 100;
	}

	getRounded(value: number): number {
		return Math.round(this.getPercentage(value));
	}
}