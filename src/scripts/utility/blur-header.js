// ADD BLUR TO HEADER //
const blurHeader = () => {
  const header = document.querySelector('.navbar-con');
  const navbar = document.querySelector('.navbar');
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
