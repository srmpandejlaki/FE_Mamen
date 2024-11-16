import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/jpeg" 
            srcset="./images/hero-image2.jpg">
          <source 
            type="image/webp"
            srcset="./images/hero-image2.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            srcset="./images/hero-image2-small.jpg">
          <img
            src='./images/hero-image2.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
      <section id="explore">
        <section class="explore-con">
          <div class="infoUMKM">
            <div class="infoImage">
              <img class="img1" src="./images/info-image1.jpeg" alt=""> 
              <img class="img2" src="./images/info-image2.jpeg" alt=""> 
            </div>
            <div class="info">
              <div class="judul">
                <h2><i class="fa-sharp fa-solid fa-lightbulb"></i>  Ingpo</h2>
              </div>
              <div class="infoDesc">
                <p>
                  UMKM (Usaha Mikro, Kecil, dan Menengah) <br> 
                  merupakan tulang punggung perekonomian yang berperan penting dalam mendorong perekonomian lokal, termasuk di Manado, yang kaya akan potensi kuliner, kerajinan tangan, dan pariwisata. <br>
                  Dengan memanfaatkan sumber daya lokal, seperti hasil laut dan budaya khas Minahasa, UMKM di Manado mampu menciptakan produk unik yang tidak hanya memenuhi kebutuhan pasar domestik,
                  tetapi juga berpotensi menembus pasar internasional. <br>
                  Dari berbagai sumber daya yang tersedia, UMKM di Manado dapat menciptakan produk yang terjamin kualitas, harganya terjangkau, dan tersedia di pasar global.
                </p>
              </div>
              <div class="btnInfo">
                <a href="#">list umkm</a>
              </div>
            </div>
          </div>
        </section>
        <div class="explore-con">
          <div id="umkm-list">
            <umkm-slider></umkm-slider>
          </div>
        </div>
        <section class="explore-con">
          <div id="products" class="products"></div>
        </section>
        <section class="explore-con">
          <div id="reviews" class="reviews"></div>
        </section>
        <div>
          <div class="separator"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // CLICK EVENTS
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('#explore');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });
    // --------------------------------------------

    // RENDER PRODUCTS
    const productContainer = document.querySelector('#products');
    productContainer.innerHTML = '';
    const products = await ProductsDbSource.getProducts();

    if (products.length === 0) {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    } else {
      products.forEach((product) => {
        productContainer.innerHTML += createProductItemTemplate(product);
        document.querySelector('.addImageFormProd').remove();
        document.querySelector('.prod-buttons').remove();
      });
    }

    // --------------------------------------------

    // RENDER REVIEWS
    const reviewContainer = document.querySelector('#reviews');
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
