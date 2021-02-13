import { carouselOptionRules } from "./carouselOptionRules";
import { CarouselFiniteTrack } from "./CarouselFiniteTrack";
import { CarouselInfiniteTrack } from "./CarouselInfiniteTrack";
import { CarouselTimer } from "./CarouselTimer";
import { CarouselValidator } from "./CarouselValidator";
import { ICarouselTimer } from "./interfaces/ICarouselTimer";
import { ICarouselTrack } from "./interfaces/ICarouselTrack";
import { ECarouselSelectors } from "./enums/ECarouselSelectors";
import { ICarousel } from "./interfaces/ICarousel";
import { ICarouselOptions } from "./interfaces/ICarouselOptions";
import { ICarouselValidator } from "./interfaces/ICarouselValidator";

export class Carousel implements ICarousel {
	protected readonly _target: HTMLElement;
	protected readonly _options: ICarouselOptions;
	protected readonly _track: ICarouselTrack;
	protected readonly _validator: ICarouselValidator;
	protected readonly _timer: ICarouselTimer;
	protected _isPlaying: boolean = false;

	constructor(target: HTMLElement, options: Partial<ICarouselOptions>) {
		this._target = target;
		this._validator = new CarouselValidator(carouselOptionRules);
		this._options = this.mergeOptionsWithDefaults(options);
		this._validator.validate(this._options);
		this._timer = new CarouselTimer({
			autoplaySpeed: options.autoplaySpeed,
		});
		const trackElement = this._target.querySelector<HTMLElement>(ECarouselSelectors.TRACK);
		this._track = this._options.infinite
			? new CarouselInfiniteTrack(trackElement, this._options)
			: new CarouselFiniteTrack(trackElement, this._options);
		this.init();
	}

	public on(event: string, listener: (...args: any[]) => any): void {
		this._track.on(event, listener);
	}

	public get currentSlide(): number {
		return this._track.currentSlide;
	}

	public get length(): number {
		return this._track.length;
	}

	public goTo(slideIndex: number): void {
		this._track.goTo(slideIndex);
	}

	public prev(): void {
		this._track.prev();
	}

	public next(): void {
		this._track.next();
	}

	public pause(): void {
		this._isPlaying = false;
		this._timer.pause();
	}

	public play(): void {
		this._isPlaying = true;
		this._timer.play();
	}

	protected init(): void {
		this._track.init();
		this._timer.init();
		if (this._options.autoplay) {
			this._timer.play();
		}
		this.addListeners();
	}

	protected addListeners(): void {
		this._timer.onTick(() => {
			this.next();
		});
		if (this._options.pauseOnHover) {
			this._target.addEventListener("mouseover", () => {
				if (this._timer.isPlaying && this._isPlaying) {
					this._timer.pause();
				}
			});
			this._target.addEventListener("mouseleave", () => {
				if (this._timer.isPaused && this._isPlaying) {
					this._timer.play();
				}
			});
		}
	}

	protected mergeOptionsWithDefaults(options: Partial<ICarouselOptions>): ICarouselOptions {
		return {
			infinite: options.infinite ?? true,
			slidesToShow: options.slidesToShow ?? 1,
			slidesToScroll: options.slidesToScroll ?? 1,
			autoplay: options.autoplay ?? false,
			pauseOnHover: options.pauseOnHover ?? true,
			speed: options.speed ?? 300,
			autoplaySpeed: options.autoplaySpeed ?? 3000,
		};
	}
}
