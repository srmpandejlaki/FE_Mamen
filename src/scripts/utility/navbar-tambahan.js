const navList = document.querySelector('.nav-list');
const navLink = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('#nav-toggle');

const linkAction = () => {
  navList.classList.remove('active');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

const linkBlur = () => {
  navList.style.top = '';
};
navLink.forEach((n) => n.addEventListener('blur', linkBlur));

navToggle.addEventListener('blur', () => {
  navList.classList.remove('active');
});
