import {
  header,
  nav,
  hamburgerBtn,
  navList,
  navItems,
  navItemsReversed,
} from '../app';

import { trapTabKey } from '../utils';

let lastElementFocused;
let firstTabStop;
let lastTabStop;

const handleTabPress = e => trapTabKey(e, firstTabStop, lastTabStop);

function openMainMenu() {
  // Accessibility and focus
  // Save current focus
  lastElementFocused = document.activeElement;

  hamburgerBtn.setAttribute('aria-expanded', true);
  // Unregister hamburger button from current event listener
  hamburgerBtn.removeEventListener('click', openMainMenu);
  // Register new event listener to close main menu
  hamburgerBtn.addEventListener('click', closeMainMenu);

  // Find all focusable children
  const focusableElements = [
    hamburgerBtn,
    ...document.querySelectorAll('.globalnav__item a'),
  ];

  firstTabStop = focusableElements[0];
  lastTabStop = focusableElements[focusableElements.length - 1];

  // Listen for and trap the keyboard
  header.addEventListener('keydown', handleTabPress);

  // Openinig transition
  document.body.classList.add('lock-scroll');
  hamburgerBtn.classList.add('is-active');
  header.classList.add('mobile-navbar-expanded');
  nav.removeAttribute('hidden');
  /*
      Force a browser re-paint so the browser will realize the
      element is no longer `hidden` and allow transitions.
  */
  const reflow = nav.offsetHeight;

  navList.classList.add('is-visible');
  navItemsReversed.forEach((link, idx) => {
    setTimeout(() => {
      link.classList.add('is-visible');
    }, (idx / 15 + 0.2) * 1000);
  });

  // Focus first child
  firstTabStop.focus();
}

function closeMainMenu() {
  // Accessibility stuff
  setTimeout(() => {
    nav.setAttribute('hidden', true);
  }, 400);
  document.body.classList.remove('lock-scroll');
  hamburgerBtn.setAttribute('aria-expanded', false);

  // Closing transition
  hamburgerBtn.classList.remove('is-active');
  navItems.forEach((link, idx) => {
    setTimeout(() => {
      link.classList.remove('is-visible');
    }, (idx / 10 + 0.1) * 1000);
  });
  setTimeout(() => {
    header.classList.remove('mobile-navbar-expanded');
  }, 200);
  setTimeout(() => {
    navList.classList.remove('is-visible');
  }, 100);

  // Set focus back to element that had it before the modal was opened
  lastElementFocused.focus();

  // Event listeners reset
  header.removeEventListener('keydown', handleTabPress);
  hamburgerBtn.removeEventListener('click', closeMainMenu);
  hamburgerBtn.addEventListener('click', openMainMenu);
}

export { openMainMenu, closeMainMenu };
