export function initLogotypesSlider() {
  const logotypesSlider = document.getElementById('partners-logos-slider');

  const slider = new Glider(logotypesSlider, {
    slidesToScroll: 1,
    slidesToShow: 1,
    draggable: true,
    scrollLock: true,
    rewind: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  const autoplayDelay = 6000;

  let autoplay = setInterval(() => {
    slider.scrollItem('next');
  }, autoplayDelay);

  logotypesSlider.addEventListener(
    'mouseover',
    event => {
      if (autoplay != null) {
        clearInterval(autoplay);
        autoplay = null;
      }
    },
    300
  );
  logotypesSlider.addEventListener(
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
