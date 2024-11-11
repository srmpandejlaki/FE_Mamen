import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.scss';
import '../styles/login.scss';
import '../styles/profile.scss';
import './components/footer-bar';
import './components/header-bar';
import './components/hero-section';
import './components/umkm-form';
import './utility/navbar-tambahan';
import './utility/blur-header';

import App from './view/app';
import swRegister from './utility/sw-register';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#nav-toggle'),
  drawer: document.querySelector('#nav-list'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
