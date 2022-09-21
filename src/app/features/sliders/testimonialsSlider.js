export function initTesimonialsSlider() {
  const testimonialsSlider = document.getElementById('testimonials-slider');

  const slider = new Glider(testimonialsSlider, {
    slidesToScroll: 1,
    slidesToShow: 1,
    draggable: true,
    scrollLock: true,
    rewind: true,
    dots: '#dots',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });

  const autoplayDelay = 15000;

  let autoplay = setInterval(() => {
    slider.scrollItem('next');
  }, autoplayDelay);

  testimonialsSlider.addEventListener(
    'mouseover',
    event => {
      if (autoplay != null) {
        clearInterval(autoplay);
        autoplay = null;
      }
    },
    300
  );
  testimonialsSlider.addEventListener(
    'mouseout',
    event => {
      if (autoplay == null) {
        autoplay = setInterval(() => {
          slider.scrollItem('next');
        }, autoplayDelay);
      }
    },
    300
  );
}
