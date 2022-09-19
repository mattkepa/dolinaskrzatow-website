import 'wicg-inert';
import { trapTabKey } from '../utils';
import { videoModal } from '../app';

const closeVideoModalBtn = document.getElementById('close-video-btn');

let lastElementFocused;
let firstTabStop;
let lastTabStop;

const handleTabPress = e => trapTabKey(e, firstTabStop, lastTabStop);

function openVideoModal() {
  // Accessibility and focus
  // Save current focus
  lastElementFocused = document.activeElement;
  // Make elements focusable for keyboard tab users when modal show
  videoModal.inert = false;

  // Find all focusable children
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  const focusableElements = [
    ...videoModal.querySelectorAll(focusableElementsString),
  ];

  firstTabStop = focusableElements[0];
  lastTabStop = focusableElements[focusableElements.length - 1];

  // Listen for and trap the keyboard
  videoModal.addEventListener('keydown', handleTabPress);

  document.body.classList.add('lock-scroll');
  videoModal.setAttribute('aria-hidden', 'false');
  videoModal.classList.remove('is-hidden');

  closeVideoModalBtn.addEventListener('click', closeVideoModal);

  // Focus first child
  firstTabStop.focus();
}

function closeVideoModal() {
  // Unregister event listeners from modal and close button
  videoModal.removeEventListener('keydown', handleTabPress);
  closeVideoModalBtn.removeEventListener('click', closeVideoModal);

  // Hide modal
  document.body.classList.remove('lock-scroll');
  videoModal.setAttribute('aria-hidden', 'true');
  videoModal.classList.add('is-hidden');

  // Set focus back to element that had it before the modal was opened
  lastElementFocused.focus();
  // Make elements unfocusable for keyboard tab users when modal hidden
  videoModal.inert = true;
}

export { openVideoModal, closeVideoModal };
