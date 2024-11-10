import UrlParser from '../../routes/url-parser';
import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createUmkmItemTemplate, createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const DetailUmkm = {
  async render() {
    return `
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
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    // RENDER UMKM DETAILS
    const umkmDetails = await UmkmsDbSource.getUmkmById(url.id);
    document.querySelector('#umkm-list').innerHTML = createUmkmItemTemplate(umkmDetails);

    // RENDER PRODUCTS BY UMKM
    const productDetails = await ProductsDbSource.getProductsByUmkm(url.id);
    document.querySelector('#product-list').innerHTML = productDetails.map((product) => createProductItemTemplate(product)).join('');

    // RENDER REVIEWS BY UMKM
    const reviewDetails = await ReviewsDbSource.getReviewsByUmkm(url.id);
    document.querySelector('#review-list').innerHTML = reviewDetails.map((review) => createReviewItemTemplate(review)).join('');
  },
};

export default DetailUmkm;
