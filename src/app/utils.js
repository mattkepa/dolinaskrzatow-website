import {
  header,
  nav,
  navList,
  navItems,
  hamburgerBtn,
  importantInfoBlock,
} from './app';
import { openMainMenu, closeMainMenu } from './features/mainMenu';

let lastViewportWidth = window.innerWidth;

function handleResizeWindow() {
  const currentViewportWidth = window.innerWidth;

  if (lastViewportWidth < 992 && currentViewportWidth >= 992) {
    // from mobile to desktop
    if (header.classList.contains('mobile-navbar-expanded')) {
      if (
        navList.classList.contains('is-visible') &&
        !importantInfoBlock.classList.contains('is-visible')
      ) {
        // only nav
        document.body.classList.remove('lock-scroll');
        nav.setAttribute('hidden', true);
        hamburgerBtn.setAttribute('aria-expanded', false);
        hamburgerBtn.classList.remove('is-active');
        navList.classList.remove('is-visible');
        navItems.forEach(link => {
          link.classList.remove('is-visible');
        });
        header.classList.remove('mobile-navbar-expanded');
        header.removeEventListener('keydown', trapTabKey);
        hamburgerBtn.removeEventListener('click', closeMainMenu);
        hamburgerBtn.addEventListener('click', openMainMenu);
      } else if (
        navList.classList.contains('is-visible') &&
        importantInfoBlock.classList.contains('is-visible')
      ) {
        // nav slided, block showed
        nav.setAttribute('hidden', true);
        navList.style = '';
        navList.classList.remove('is-visible');
        navList.classList.remove('is-slided-down');
        header.classList.remove('mobile-navbar-expanded');
        header.classList.add('desktop-navbar-expanded');
        header.removeEventListener('keydown', trapTabKey);
        hamburgerBtn.setAttribute('aria-expanded', false);
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.removeEventListener('click', closeMainMenu);
        hamburgerBtn.addEventListener('click', openMainMenu);
      } else {
        // only info block showed
        header.classList.remove('mobile-navbar-expanded');
        header.classList.add('desktop-navbar-expanded');
      }
    } else if (nav.hasAttribute('hidden')) {
      nav.removeAttribute('hidden');
    }
  } else if (lastViewportWidth >= 992 && currentViewportWidth < 992) {
    // from desktop to mobile
    if (header.classList.contains('desktop-navbar-expanded')) {
      header.classList.remove('desktop-navbar-expanded');
      header.classList.add('mobile-navbar-expanded');
    }
    nav.setAttribute('hidden', true);
  }

  lastViewportWidth = currentViewportWidth;
}

function trapTabKey(e, firstTab, lastTab) {
  console.log(e);
  console.log('First Tab: ', firstTab);
  console.log('Last Tab: ', lastTab);
  // Check for TAB key press
  if (e.keyCode === 9) {
    // SHIFT + TAB
    if (e.shiftKey) {
      if (document.activeElement === firstTab) {
        e.preventDefault();
        lastTab.focus();
      }

      // TAB
    } else {
      if (document.activeElement === lastTab) {
        e.preventDefault();
        firstTab.focus();
      }
    }
  }
}

function getNextWeekendDate() {
  function nextDayOfWeek(dayIdx) {
    function getNextDate() {
      const today = new Date();
      let nextDate = new Date();
      nextDate.setDate(
        today.getDate() + ((dayIdx - 1 - today.getDay() + 7) % 7) + 1
      );
      return nextDate;
    }
    return getNextDate;
  }
  const nextSaturday = nextDayOfWeek(6);
  const nextSunday = nextDayOfWeek(7);

  const dateHolder = document.getElementById('callout-info-date');

  let startOfWeekend;
  let endOfWeekend;
  const today = new Date();
  if (today.getDay() === 6) {
    // case: is Saturday
    startOfWeekend = new Date(today);
    endOfWeekend = new Date(today);
    endOfWeekend.setDate(today.getDate() + 1);
  } else if (today.getDate() === 0) {
    // case: is Sunday
    startOfWeekend = new Date(today);
    startOfWeekend.setDate(today.getDate() - 1);
    endOfWeekend = new Date(today);
  } else {
    // case: any other weekday
    startOfWeekend = new Date(nextSaturday());
    endOfWeekend = new Date(nextSunday());
  }

  if (startOfWeekend.getMonth() === endOfWeekend.getMonth()) {
    dateHolder.textContent = `(${startOfWeekend
      .getDate()
      .toString()
      .padStart(2, '0')}-${endOfWeekend
      .getDate()
      .toString()
      .padStart(2, '0')}.${(startOfWeekend.getMonth() + 1)
      .toString()
      .padStart(2, '0')})`;
  } else {
    dateHolder.textContent = `(${startOfWeekend
      .getDate()
      .toString()
      .padStart(2, '0')}.${(startOfWeekend.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${endOfWeekend
      .getDate()
      .toString()
      .padStart(2, '0')}.${(endOfWeekend.getMonth() + 1)
      .toString()
      .padStart(2, '0')})`;
  }
}

export { trapTabKey, handleResizeWindow, getNextWeekendDate };
