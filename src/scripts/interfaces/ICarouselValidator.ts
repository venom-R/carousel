import { ICarouselOptions } from "./ICarouselOptions";

export interface ICarouselValidator {
	validate(options: ICarouselOptions): void;
}
