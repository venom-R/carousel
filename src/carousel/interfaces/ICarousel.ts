export interface ICarousel {
	currentSlide: number;
	length: number;
	on(event: string, listener: Function): void;
	goTo(slideIndex: number): void;
	next(): void;
	prev(): void;
	pause(): void;
	play(): void;
}
