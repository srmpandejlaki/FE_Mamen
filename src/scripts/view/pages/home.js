import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import homeGsapJs from '../../utility/animation/home-page/home-gsap';
import homeProdukGsapJs from '../../utility/animation/home-page/home-produk-gsap';
import homeReviewGsapJs from '../../utility/animation/home-page/home-review-gsap';
import { createFreeProductItemTemplate, createHomeReviewItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/jpeg" 
            srcset="./images/hero-image.jpeg">
          <source 
            type="image/webp"
            srcset="./images/hero-image.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            srcset="./images/hero-image-small.jpg">
          <img
            src='./images/hero-image.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
      <headline-section></headline-section>
        <section id="infoUmkmCon">
          <div class="infoUMKM">
            <div class="info">
              <div class="judul">
                <h3><span>Ayo</span> cari tahu</h3>
              </div>
              <div class="infoDesc">
                <p>
                  UMKM (Usaha Mikro, Kecil, dan Menengah)
                  merupakan tulang punggung perekonomian yang memiliki peran penting dalam 
                  mendorong perekonomian lokal, termasuk di Kota Manado.
                </p>
              </div>
              <div class="btnInfo">
                <a href="#/umkms">List UMKM</a>
              </div>
            </div>
            <div id="umkm-list">
                <umkm-slider></umkm-slider>
              </div>
          </div>
        </section>
        <dataline-section></dataline-section>
        <section class="product-home-con">
          <div id="products" class="scroll"></div>
        </section>
        <section class="explore-con">
          <h2 class="titleReview">Jejak Pendapat Pelanggan</h2>
          <div id="reviews" class="infinite-scroll"></div>
        </section>
    `;
  },

  async afterRender() {
    homeGsapJs();
    // CLICK EVENTS
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('headline-section');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });
    // --------------------------------------------

    // RENDER PRODUCTS
    const productContainer = document.querySelector('#products');
    productContainer.innerHTML = '';
    const allProductList = await ProductsDbSource.getProducts();

    if (allProductList.length === 0) {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    } else {
      allProductList.forEach((product) => {
        productContainer.innerHTML += createFreeProductItemTemplate(product);
      });
    }
    homeProdukGsapJs();

    // --------------------------------------------

    // RENDER REVIEWS
    const reviewContainer = document.querySelector('#reviews');
    reviewContainer.innerHTML = '';
    const reviews = await ReviewsDbSource.getReviews();

    reviews.forEach((review) => {
      reviewContainer.innerHTML += createHomeReviewItemTemplate(review);
    });

    if (reviewContainer.innerHTML === '') {
      reviewContainer.innerHTML = 'Tidak ada review untuk ditampilkan.';
    }
    // --------------------------------------------
    homeReviewGsapJs();
  },
};

export default Home;
