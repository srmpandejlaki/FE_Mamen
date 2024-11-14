// ADD BLUR TO HEADER //
const headercon = document.querySelector('header');
const header = document.querySelector('.navbar-con');
const navbar = document.querySelector('.navbar');
const blurHeader = () => {
  // When the scroll is greater than 50 viewport height, add the blur-header class
  if (window.scrollY >= 50) {
    header.style.backdropFilter = 'blur(15px)';
    navbar.style.borderBottom = '0px solid rgba(255, 255, 255, 0.482)';
  } else {
    header.style.backdropFilter = 'blur(0px)';
    navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.482)';
  }
};
window.addEventListener('scroll', blurHeader);

const shadowHeader = () => {
  if (window.location.hash === '/' || window.location.hash === '#/home') {
    headercon.style.boxShadow = '';
    navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.482)';
  } else {
    headercon.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
    navbar.style.borderBottom = '0px solid rgba(255, 255, 255, 0.482)';
  }
};
window.addEventListener('hashchange', shadowHeader);
