import 'wicg-inert';
import 'glider-js';
import { handleResizeWindow, getNextWeekendDate } from './utils';
import { openMainMenu } from './features/mainMenu';
import { expandImportantInfo } from './features/importantInfo';
import { initHeroSlider } from './features/sliders/heroSlider';
import { initTesimonialsSlider } from './features/sliders/testimonialsSlider';
import { openVideoModal } from './features/videoModal';

const header = document.getElementById('header');
const nav = document.querySelector('.globalnav');
const hamburgerBtn = document.getElementById('menu-btn');
const navList = document.querySelector('.globalnav__list');
const navItems = [...document.querySelectorAll('.globalnav__item')];
const navItemsReversed = [...navItems].reverse();
const importantInfoBtn = document.getElementById('important-info-btn');
const importantInfoBlock = document.getElementById('important-info');
const collapseImportantInfoBtn = document.getElementById(
  'collapse-important-info-btn'
);
const videoModalBtn = document.getElementById('video-modal-btn');
const videoModal = document.getElementById('video-modal');

function initApp() {
  // Make elements unfocusable for keyboard tab users when modal hidden
  importantInfoBlock.inert = true;
  videoModal.inert = true;

  if (window.innerWidth >= 992) {
    if (nav.hasAttribute('hidden')) {
      nav.removeAttribute('hidden');
    }
  }

  getNextWeekendDate();

  // Initialize sliders
  initHeroSlider();
  initTesimonialsSlider();

  // Add event listeners to elements
  window.addEventListener('resize', handleResizeWindow);
  hamburgerBtn.addEventListener('click', openMainMenu);
  importantInfoBtn.addEventListener('click', expandImportantInfo);
  videoModalBtn.addEventListener('click', openVideoModal);
}

export {
  initApp,
  header,
  nav,
  hamburgerBtn,
  navList,
  navItems,
  navItemsReversed,
  importantInfoBtn,
  importantInfoBlock,
  collapseImportantInfoBtn,
  videoModalBtn,
  videoModal,
};
