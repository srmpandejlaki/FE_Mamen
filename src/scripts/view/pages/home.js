import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createUmkmItemTemplate, createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/webp"
            fetchpriority="high" 
            srcset="./images/hero-image2.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            fetchpriority="high" 
            srcset="./images/hero-image2-small.jpg">
          <img
            fetchpriority="high" 
            src='./images/hero-image2-large.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
      <section id="explore">
        <div class="explore-con">
          <div id="umkm-list"></div>
        </div>
        <div class="explore-con">
          <div id="product-list"></div>
        </div>
        <div class="explore-con">
          <div id="review-list"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // HEADER & FOOTER VISIBILITY
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    header.style.display = 'block';
    footer.style.display = 'flex';
    // --------------------------------------------

    // CLICK EVENTS
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('#explore');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });
    // --------------------------------------------

    // RENDER UMKM
    const umkmContainer = document.querySelector('#umkm-list');
    umkmContainer.innerHTML = '';
    const umkms = await UmkmsDbSource.getUmkms();

    umkms.forEach((umkm) => {
      umkmContainer.innerHTML += createUmkmItemTemplate(umkm);
    });

    if (umkmContainer.innerHTML === '') {
      umkmContainer.innerHTML = 'Tidak ada umkm untuk ditampilkan.';
    }
    // --------------------------------------------

    // RENDER PRODUCTS
    const productContainer = document.querySelector('#product-list');
    productContainer.innerHTML = '';
    const products = await ProductsDbSource.getProducts();

    products.forEach((product) => {
      productContainer.innerHTML += createProductItemTemplate(product);
    });

    if (productContainer.innerHTML === '') {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    }
    // --------------------------------------------

    // RENDER REVIEWS
    const reviewContainer = document.querySelector('#review-list');
    reviewContainer.innerHTML = '';
    const reviews = await ReviewsDbSource.getReviews();

    reviews.forEach((review) => {
      reviewContainer.innerHTML += createReviewItemTemplate(review);
    });

    if (reviewContainer.innerHTML === '') {
      reviewContainer.innerHTML = 'Tidak ada review untuk ditampilkan.';
    }
    // --------------------------------------------
  },
};

export default Home;
