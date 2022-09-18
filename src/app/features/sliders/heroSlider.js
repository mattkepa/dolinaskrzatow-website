export function initHeroSlider() {
  const slides = [...document.querySelectorAll('.hero-slider__slide')];
  let activeSlideIdx = 0;
  let lastSlideIdx = slides.length - 1;

  const nextSlide = () => {
    slides[activeSlideIdx].classList.remove('hero-slider__slide--active');
    if (activeSlideIdx === lastSlideIdx) {
      activeSlideIdx = 0;
    } else {
      activeSlideIdx++;
    }
    slides[activeSlideIdx].classList.add('hero-slider__slide--active');
  };

  setInterval(nextSlide, 6000);
}
