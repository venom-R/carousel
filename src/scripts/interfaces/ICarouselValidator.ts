import { ICarouselOptions } from "./ICarouselOptions";

export interface ICarouselValidator {
	setDefaults(options: Partial<ICarouselOptions>): ICarouselOptions;
	validate(options: ICarouselOptions): void;
}
