import 'wicg-inert';
import {
  importantInfoBtn,
  importantInfoBlock,
  collapseImportantInfoBtn,
  header,
  navList,
  navItems,
  navItemsReversed,
  hamburgerBtn,
} from '../app';

import { trapTabKey } from '../utils';

let lastElementFocused;
let firstTabStop;
let lastTabStop;

const handleTabPress = e => trapTabKey(e, firstTabStop, lastTabStop);

function expandImportantInfo() {
  // Accessibility and focus
  // Save current focus
  lastElementFocused = document.activeElement;

  // Make elements focusable for keyboard tab users when block show
  importantInfoBlock.inert = false;

  importantInfoBtn.setAttribute('aria-expanded', true);
  // Unregister important info button from current event listener
  importantInfoBtn.removeEventListener('click', expandImportantInfo);
  // Register new event listener to important info button
  importantInfoBtn.addEventListener('click', collapseImportantInfo);
  collapseImportantInfoBtn.addEventListener('click', collapseImportantInfo);

  // Find all focusable children
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  const focusableElements = [
    ...importantInfoBlock.querySelectorAll(focusableElementsString),
  ];

  firstTabStop = focusableElements[0];
  lastTabStop = focusableElements[focusableElements.length - 1];

  // Listen for and trap the keyboard
  importantInfoBlock.addEventListener('keydown', handleTabPress);

  // Openinig transition
  if (header.classList.contains('mobile-navbar-expanded')) {
    navItemsReversed.forEach((item, idx) => {
      setTimeout(() => {
        item.classList.remove('is-visible');
      }, (idx / 10 + 0.1) * 1000);
    });
    navList.classList.add('is-slided-down');
    setTimeout(() => {
      navList.style.display = 'none';
      importantInfoBlock.classList.remove('is-hidden');
      importantInfoBlock.classList.add('is-visible');
    }, 450);
  } else if (window.innerWidth >= 992) {
    document.body.classList.add('lock-scroll');
    header.classList.add('desktop-navbar-expanded');
    importantInfoBlock.classList.remove('is-hidden');
    importantInfoBlock.classList.add('is-visible');
  } else {
    document.body.classList.add('lock-scroll');
    header.classList.add('mobile-navbar-expanded');
    importantInfoBlock.classList.remove('is-hidden');
    importantInfoBlock.classList.add('is-visible');
  }
  importantInfoBlock.setAttribute('aria-hidden', false);
  hamburgerBtn.setAttribute('hidden', true);
  hamburgerBtn.classList.add('is-hidden');

  // Focus first child
  firstTabStop.focus();
}

function collapseImportantInfo() {
  // Unregister event listeners from info block and collapse button
  importantInfoBlock.removeEventListener('keydown', handleTabPress);
  collapseImportantInfoBtn.removeEventListener('click', collapseImportantInfo);
  importantInfoBtn.removeEventListener('click', collapseImportantInfo);
  importantInfoBtn.addEventListener('click', expandImportantInfo);

  // Hide block
  if (navList.classList.contains('is-visible')) {
    setTimeout(() => {
      navList.style = '';
      /*
              Force a browser re-paint so the browser will realize the
              element is no longer `hidden` and allow transitions.
          */
      const reflow = navList.offsetHeight;

      navItems.forEach((item, idx) => {
        setTimeout(() => {
          item.classList.add('is-visible');
        }, (idx / 15 + 0.2) * 1000);
      });
      navList.classList.remove('is-slided-down');
      importantInfoBlock.classList.add('is-hidden');
      hamburgerBtn.setAttribute('hidden', false);
      hamburgerBtn.classList.remove('is-hidden');
    }, 300);
    importantInfoBlock.classList.remove('is-visible');
  } else if (window.innerWidth >= 992) {
    header.classList.remove('desktop-navbar-expanded');
    setTimeout(() => {
      importantInfoBlock.classList.add('is-hidden');
    }, 300);
    setTimeout(() => {
      importantInfoBlock.classList.remove('is-visible');
    }, 100);
    hamburgerBtn.setAttribute('hidden', false);
    hamburgerBtn.classList.remove('is-hidden');
    document.body.classList.remove('lock-scroll');
  } else {
    setTimeout(() => {
      importantInfoBlock.classList.add('is-hidden');
      hamburgerBtn.setAttribute('hidden', false);
      hamburgerBtn.classList.remove('is-hidden');
    }, 300);
    header.classList.remove('mobile-navbar-expanded');
    importantInfoBlock.classList.remove('is-visible');
    document.body.classList.remove('lock-scroll');
  }
  importantInfoBlock.setAttribute('aria-hidden', true);
  importantInfoBtn.setAttribute('aria-expanded', false);

  // Set focus back to element that had it before the modal was opened
  lastElementFocused.focus();
  // Make elements unfocusable for keyboard tab users when modal hidden
  importantInfoBlock.inert = true;
}

export { expandImportantInfo, collapseImportantInfo };
