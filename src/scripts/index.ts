import { Carousel } from "./Carousel";
import { ICarousel } from "./interfaces/ICarousel";

const carouselElement = document.getElementById("carousel");
const carousel: ICarousel = new Carousel(carouselElement, {
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: false,
	pauseOnHover: false,
	speed: 200,
	autoplaySpeed: 2000,
});

document.getElementById("carouselPrev").addEventListener("click", () => {
	carousel.prev();
});

document.getElementById("carouselNext").addEventListener("click", () => {
	carousel.next();
});

document.getElementById("carouselGoToStart").addEventListener("click", () => {
	carousel.goTo(0);
});

document.getElementById("carouselGoToEnd").addEventListener("click", () => {
	carousel.goTo(carousel.length - 1);
});

document.getElementById("carouselPause").addEventListener("click", () => {
	carousel.pause();
});

document.getElementById("carouselPlay").addEventListener("click", () => {
	carousel.play();
});

carousel.on("beforeChange", (_carousel: ICarousel, currentSlide: number, nextSlide: number) => {
	console.group("BEFORE_CHANGE");
	console.log("Current slide:", currentSlide);
	console.log("Next slide:", nextSlide);
	console.groupEnd();
});

carousel.on("afterChange", (carousel: ICarousel, currentSlide: number) => {
	console.group("AFTER_CHANGE");
	console.log("Current slide:", currentSlide);
	console.groupEnd();
});
