import { ECarouselEvent } from "./enums/ECarouselEvent";
import { ECarouselSelectors } from "./enums/ECarouselSelectors";
import { ICarouselOptions } from "./interfaces/ICarouselOptions";
import { Emitter } from "./services/Emitter";

export abstract class CarouselAbstractTrack {
	protected _isTranslating: boolean;
	protected readonly _target: HTMLElement;
	protected readonly _options: ICarouselOptions;
	private readonly _emitter: Emitter;
	protected _slideElements: NodeListOf<HTMLElement>;
	protected _slideWidth: number;
	protected _currentSlide: number;

	constructor(target: HTMLElement, options: ICarouselOptions) {
		this._target = target;
		this._options = options;
		this._emitter = new Emitter();
		this._slideElements = this._target.querySelectorAll(ECarouselSelectors.SLIDE);
	}

	public init(): void {
		this._currentSlide = 0;
		this._isTranslating = false;
		this.setSlidesWidth();
	}

	public get currentSlide(): number {
		return this.normalizeNextSlideIndex(this._currentSlide);
	}

	public get length(): number {
		return this._slideElements.length;
	}

	public on(event: string, listener: (...args: any[]) => any): void {
		this._emitter.on(event, listener);
	}

	public prev() {
		if (!this._isTranslating) {
			this.changeSlide(this._currentSlide - this._options.slidesToScroll);
		}
	}

	public next(): void {
		if (!this._isTranslating) {
			this.changeSlide(this._currentSlide + this._options.slidesToScroll);
		}
	}

	public goTo(slideIndex: number): void {
		if (slideIndex >= this.length || slideIndex < 0) {
			throw new Error(`Index should be >= 0 and < ${this.length - 1}`);
		}
		if (!this._isTranslating) {
			this.changeSlide(slideIndex);
		}
	}

	protected normalizeNextSlideIndex(nextSlide: number): number {
		return nextSlide;
	}

	protected changeSlide(nextSlide: number): Promise<void> {
		if (nextSlide === this._currentSlide) {
			return Promise.resolve();
		}
		this._isTranslating = true;
		this._emitter.emit(
			ECarouselEvent.BEFORE_CHANGE,
			this,
			this.currentSlide,
			this.normalizeNextSlideIndex(nextSlide),
		);
		this._currentSlide = nextSlide;
		this.addTransition();
		this.translate();
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				this.removeTransition();
				this._isTranslating = false;
				this._emitter.emit(ECarouselEvent.AFTER_CHANGE, this, this.currentSlide);
				resolve();
			}, this._options.speed);
		});
	}

	protected get slideWidth(): number {
		if (this._slideWidth === undefined) {
			this._slideWidth = this._target.offsetWidth / this._options.slidesToShow;
		}
		return this._slideWidth;
	}

	protected addTransition(): void {
		this._target.style.transition = `transform ${this._options.speed}ms ease-out`;
	}

	protected removeTransition(): void {
		this._target.style.transition = "none";
	}

	protected get translatePosition(): number {
		return -this._currentSlide * this._slideWidth;
	}

	protected setSlidesWidth(): void {
		this._slideElements.forEach((slideElement) => {
			slideElement.style.width = `${this.slideWidth}px`;
		});
	}

	protected translate() {
		this._target.style.transform = `translateX(${this.translatePosition}px)`;
	}
}
