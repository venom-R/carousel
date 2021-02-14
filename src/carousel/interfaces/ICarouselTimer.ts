export interface ICarouselTimer {
	isPlaying: boolean;
	isPaused: boolean;
	init(): void;
	play(): void;
	pause(): void;
	onTick(listener: () => any): void;
}
