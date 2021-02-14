import { Carousel } from "./carousel";

const carouselElement = document.getElementById("carousel");
const carousel = new Carousel(carouselElement, {
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

carousel.on("beforeChange", (_carousel: Carousel, currentSlide: number, nextSlide: number) => {
	console.group("BEFORE_CHANGE");
	console.log("Current slide:", currentSlide);
	console.log("Next slide:", nextSlide);
	console.groupEnd();
});

carousel.on("afterChange", (carousel: Carousel, currentSlide: number) => {
	console.group("AFTER_CHANGE");
	console.log("Current slide:", currentSlide);
	console.groupEnd();
});
