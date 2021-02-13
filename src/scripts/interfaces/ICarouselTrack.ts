export interface ICarouselTrack {
	currentSlide: number;
	length: number;
	init(): void;
	prev(): void;
	next(): void;
	goTo(slideIndex: number): void;
	on(event: string, listener: (...args: any[]) => any): void;
}
