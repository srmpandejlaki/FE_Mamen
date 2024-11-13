import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/login.scss';
import '../styles/popup.scss';
import '../styles/detail-umkm.scss';
<<<<<<< HEAD
import '../styles/reviews-home.scss';
=======
import '../styles/detail-product.scss';
>>>>>>> 289d494633bbdd185319afdd1d17ece87e7b02f8
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
