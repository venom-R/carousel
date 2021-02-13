import { ICarouselOptions } from "./interfaces/ICarouselOptions";
import { ICarouselValidator } from "./interfaces/ICarouselValidator";

export type TCarouselOptionRules<T> = { [K in keyof T]?: (value: T[K], options: T) => void };

export class CarouselValidator implements ICarouselValidator {
	protected _rules: TCarouselOptionRules<ICarouselOptions>;

	constructor(rules: TCarouselOptionRules<ICarouselOptions>) {
		this._rules = rules;
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
