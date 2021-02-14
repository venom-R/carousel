import { CarouselAbstractTrack } from "./CarouselAbstractTrack";
import { ICarouselTrack } from "./interfaces/ICarouselTrack";

export class CarouselInfiniteTrack extends CarouselAbstractTrack implements ICarouselTrack {
	public init(): void {
		super.init();
		if (this.length > this._options.slidesToShow) {
			this.setInitialShift();
			this.cloneSlides();
		}
	}

	protected normalizeNextSlideIndex(nextSlide: number): number {
		if (nextSlide >= this.length) {
			return nextSlide - this.length;
		} else if (nextSlide < 0) {
			return this.length + nextSlide;
		}
		return nextSlide;
	}

	protected setInitialShift(): void {
		const shiftValue = this._slideWidth * this._options.slidesToShow;
		this._target.style.marginLeft = `-${shiftValue}px`;
	}

	protected changeSlide(nextSlide: number): Promise<void> {
		return super.changeSlide(nextSlide).then(() => {
			if (this._currentSlide >= this.length) {
				this._currentSlide = this._currentSlide - this.length;
				this.translate();
			}
			if (this._currentSlide <= -this._options.slidesToShow) {
				this._currentSlide = this.length + this._currentSlide;
				this.translate();
			}
		});
	}

	protected cloneSlides(): void {
		if (this._options.slidesToScroll <= this.length) {
			const slides = Array.from(this._slideElements);
			// insert clones at the beginning
			const slidesToCloneAtBeginning = slides.splice(
				slides.length - this._options.slidesToShow,
				slides.length - 1,
			);
			slidesToCloneAtBeginning.forEach((slide) => {
				const clonedSlide = slide.cloneNode(true) as HTMLElement;
				clonedSlide.classList.add("cloned");
				this._target.insertBefore(clonedSlide, slides[0]);
			});
			// insert clones at the end
			this._slideElements.forEach((slide) => {
				const clone = slide.cloneNode(true) as HTMLElement;
				clone.classList.add("cloned");
				this._target.appendChild(clone);
			});
		}
	}
}
