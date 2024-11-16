import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/login.scss';
import '../styles/popup.scss';
import '../styles/detail-umkm.scss';
import '../styles/detail-product.scss';
import '../styles/umkm-slider.scss';
import '../styles/list-product.scss';
import '../styles/list-umkm.scss';
import '../styles/list-review.scss';
import '../styles/form-review.scss';
import '../styles/info-home.scss';
import './components/footer-bar';
import './components/header-bar';
import './components/hero-section';
import './components/umkm-form';
import './components/product-form';
import './components/editUmkm-form';
import './components/editProduct-form';
import './components/review-form';
import './components/umkm-detail';
import './components/product-detail';
import './components/umkm-slider';
import './utility/navbar-tambahan';
import './utility/header';
import './utility/umkmFunction';
import './utility/productFunction';

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
