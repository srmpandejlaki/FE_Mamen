import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/login.scss';
import '../styles/detail.scss';
import '../styles/detail-umkm.scss';
import './components/footer-bar';
import './components/header-bar';
import './components/hero-section';
import './components/umkm-form';
import './components/editUmkm-form';
import './components/umkm-detail';
import './components/product-detail';
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
