import { ECarouselEvent } from "./enums/ECarouselEvent";
import { ICarouselTimer } from "./interfaces/ICarouselTimer";
import { Emitter } from "./services/Emitter";

type TTimerOptions = {
	autoplaySpeed: number;
};

export class CarouselTimer implements ICarouselTimer {
	protected readonly _emitter: Emitter = new Emitter();
	protected readonly _timerOptions: TTimerOptions;
	protected _isPlaying: boolean = false;
	protected _isPaused: boolean = true;
	protected _lastUpdate: number;

	constructor(timerOptions: TTimerOptions) {
		this._timerOptions = timerOptions;
	}

	public init(): void {
		this.startTimer();
	}

	public play(): void {
		this._isPaused = false;
		this._isPlaying = true;
	}

	public pause(): void {
		this._isPaused = true;
		this._isPlaying = false;
	}

	public get isPlaying(): boolean {
		return this._isPlaying;
	}

	public get isPaused(): boolean {
		return this._isPaused;
	}

	public onTick(listener: () => any): void {
		this._emitter.on(ECarouselEvent.TIMER_TICK, listener);
	}

	protected startTimer(): void {
		this._lastUpdate = new Date().getTime();
		this.carouselLoop();
	}

	protected onUpdateFrame(): void {
		const currentTime = new Date().getTime();
		const delta = currentTime - this._lastUpdate;
		if (delta >= this._timerOptions.autoplaySpeed) {
			this._lastUpdate = currentTime;
			if (this.isPlaying) {
				this._emitter.emit(ECarouselEvent.TIMER_TICK);
			}
		}
	}

	protected carouselLoop(): void {
		this.onUpdateFrame();
		requestAnimationFrame(() => {
			this.carouselLoop();
		});
	}
}
