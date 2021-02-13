import { ICarouselOptions } from "./interfaces/ICarouselOptions";
import { ICarouselValidator } from "./interfaces/ICarouselValidator";

export type TCarouselOptionRules<T> = { [K in keyof T]?: (value: T[K], options: T) => void };

export class CarouselValidator implements ICarouselValidator {
	protected _rules: TCarouselOptionRules<ICarouselOptions>;

	constructor(rules: TCarouselOptionRules<ICarouselOptions>) {
		this._rules = rules;
	}

	setDefaults(options: Partial<ICarouselOptions>): ICarouselOptions {
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

	public validate(options: ICarouselOptions): void {
		Object.entries(options).forEach(([propName, value]) => {
			if (propName in this._rules) {
				const validationFunction = this._rules[propName as keyof ICarouselOptions] as Function;
				validationFunction(value, options);
			}
		});
	}
}
