import UrlParser from '../../routes/url-parser';
import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const DetailUmkm = {
  async render() {
    return `
      <section id="detailContainer">
     <div id="umkmDetail">
      <div id="umkms" class="umkms">
      </div>
      <div>
        <div class="separator"></div>
      </div>
      <div id="products" class="products">
      </div>
      <div>
        <div class="separator"></div>
      </div>
      <div id="reviews" class="reviews">
      </div>
     </div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    // RENDER UMKM DETAILS
    const umkmDetails = await UmkmsDbSource.getUmkmById(url.id);

    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkm) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkm;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetails);

    // RENDER PRODUCTS BY UMKM
    const productDetails = await ProductsDbSource.getProductsByUmkm(url.id);
    document.querySelector('#products').innerHTML = productDetails.map((product) => createProductItemTemplate(product)).join('');

    if (productDetails.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    }

    // RENDER REVIEWS BY UMKM
    const reviewDetails = await ReviewsDbSource.getReviewsByUmkm(url.id);
    document.querySelector('#reviews').innerHTML = reviewDetails.map((review) => createReviewItemTemplate(review)).join('');

    if (reviewDetails.length === 0) {
      document.querySelector('#reviews').innerHTML = 'Tidak ada review yang ditampilkan.';
    }
  },
};

export default DetailUmkm;
