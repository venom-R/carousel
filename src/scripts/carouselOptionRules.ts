import { TCarouselOptionRules } from "./CarouselValidator";
import { ICarouselOptions } from "./interfaces/ICarouselOptions";

export const carouselOptionRules: TCarouselOptionRules<ICarouselOptions> = Object.freeze({
	slidesToShow(value, _options) {
		if (value < 0 || value > 12) {
			throw new Error("slideToScroll is not valid. Value should be greater than 0 and not greater than 12");
		}
	},
	slidesToScroll(value, options) {
		if (value > options.slidesToShow) {
			throw new Error(`slidesToScroll is not valid. Value should be not grater than ${options.slidesToShow}`);
		}
	},
	speed(value, _options) {
		if (value < 0 || value > 10000) {
			throw new Error("speed is not valid. Value should be greater than 0 and not greater than 10000");
		}
	},
	autoplaySpeed(value, options) {
		if (value < 0 || value > 60000) {
			throw new Error("autoplaySpeed is not valid. Value should be greater than 0 and not greater than 60000");
		}
		if (value < options.speed) {
			throw new Error(
				`autoplaySpeed is not valid. Value should be not lower than speed value (${options.speed})`,
			);
		}
	},
});
