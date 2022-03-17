const hamburger = document.querySelector('.header__hamburger');
const headerNav = document.querySelector('.header__nav');
const headerButtonLogin1 = document.querySelector('.header__button-login_1');
const headerButtonLogin2 = document.querySelector('.header__button-login_2');
const headerList = document.querySelector('.header__list');
const headerCross = document.querySelector('.header__cross');

window.addEventListener('keydown', handleKey);

function handleKey(e) {
  if (e.keyCode === 9) {
    let focusable = headerNav.querySelectorAll('div,li,button');
    if (focusable.length) {
      let first = focusable[0];
      let last = focusable[focusable.length - 1];
      let shift = e.shiftKey;
      if (shift) {
        if (e.target === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (e.target === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }
}

function hamburgerFunc(e) {
  headerNav.classList.add('header__nav_visible');
}

headerList.addEventListener('click', (e) => e.stopPropagation());

function closeHeaderMenu(e) {
  headerNav.classList.remove('header__nav_visible');
}

headerNav.addEventListener('click', (e) => closeHeaderMenu(e));
headerCross.addEventListener('click', (e) => closeHeaderMenu(e));

hamburger.addEventListener('click', (e) => hamburgerFunc(e));
