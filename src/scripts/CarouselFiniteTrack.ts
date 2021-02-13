import { CarouselAbstractTrack } from "./CarouselAbstractTrack";
import { ICarouselTrack } from "./interfaces/ICarouselTrack";

export class CarouselFiniteTrack extends CarouselAbstractTrack implements ICarouselTrack {
	public prev(): void {
		if (this._currentSlide === 0) {
			return;
		}
		if (this._currentSlide - this._options.slidesToScroll < 0) {
			this.goTo(0);
		} else {
			super.prev();
		}
	}

	public next(): void {
		if (this._currentSlide === this.length - this._options.slidesToShow) {
			return;
		}
		if (this.length <= this._currentSlide + this._options.slidesToScroll + this._options.slidesToShow) {
			this.goTo(this.length - this._options.slidesToShow);
		} else {
			super.next();
		}
	}

	public goTo(slideIndex: number) {
		if (this.length <= slideIndex + this._options.slidesToShow) {
			super.goTo(this.length - this._options.slidesToShow);
		} else {
			super.goTo(slideIndex);
		}
	}
}
