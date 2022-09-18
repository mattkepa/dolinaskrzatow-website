import 'wicg-inert';
import { handleResizeWindow, getNextWeekendDate } from './utils';
import { openMainMenu } from './features/mainMenu';
import { expandImportantInfo } from './features/importantInfo';
import { initHeroSlider } from './features/sliders/heroSlider';

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

function initApp() {
  // Make elements unfocusable for keyboard tab users when modal hidden
  importantInfoBlock.inert = true;

  if (window.innerWidth >= 992) {
    if (nav.hasAttribute('hidden')) {
      nav.removeAttribute('hidden');
    }
  }

  getNextWeekendDate();

  // Initialize sliders
  initHeroSlider();

  // Add event listeners to elements
  window.addEventListener('resize', handleResizeWindow);
  hamburgerBtn.addEventListener('click', openMainMenu);
  importantInfoBtn.addEventListener('click', expandImportantInfo);
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
};
