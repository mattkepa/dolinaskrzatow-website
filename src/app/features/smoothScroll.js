import jump from 'jump.js';

import { header } from '../app';
import { collapseImportantInfo } from './importantInfo';
import { closeMainMenu } from './mainMenu';

const navLinks = [...document.querySelectorAll('.globalnav__link')];
const scrollmeLink = document.getElementById('scrollme-link');
const skipLink = document.getElementById('skip-link');
const navbarLogoLink = document.querySelector('.navbar__logo a');

// Robert Penner's easeInOutQuad
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

function scrollToSection() {
  navLinks.forEach(link => {
    link.classList.add('disabled');
    setTimeout(() => {
      link.classList.remove('disabled');
    }, 1000);
  });
  if (window.innerWidth < 992) {
    closeMainMenu();
    jump(`#${this.getAttribute('data-target')}`, {
      duration: 1000,
      offset: -75,
      callback: undefined,
      easing: easeInOutQuad,
      a11y: false,
    });
  } else {
    if (header.classList.contains('desktop-navbar-expanded')) {
      collapseImportantInfo();
    }
    jump(`#${this.getAttribute('data-target')}`, {
      duration: 1000,
      offset: -100,
      callback: undefined,
      easing: easeInOutQuad,
      a11y: false,
    });
  }
}

function useSmoothScroll() {
  skipLink.addEventListener('click', scrollToSection);
  navbarLogoLink.addEventListener('click', scrollToSection);
  scrollmeLink.addEventListener('click', scrollToSection);
  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
}

export { useSmoothScroll };
