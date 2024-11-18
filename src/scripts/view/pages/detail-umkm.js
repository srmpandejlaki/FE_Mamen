import UrlParser from '../../routes/url-parser';
import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import Loading from '../../utility/loading';

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
      <div class="section-title">
          <h2>Products</h2>
        </div>
      <div id="products" class="list-products scroll">
      </div>
      <div>
        <div class="separator"></div>
      </div>
      <div class="section-title">
          <h2>Reviews</h2>
      </div>
      <div id="reviews" class="reviews">
      </div>
      <form-review></form-review>
      <div>
          <div class="separator"></div>
        </div>
     </div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const umkmContainer = document.querySelector('#umkms');
    await Loading.loadingPage(umkmContainer);
    const umkmById = await UmkmsDbSource.getUmkmById(url.id);

    document.querySelector('.pageload').remove();
    const renderDetailUmkm = async (umkm) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkm;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
      document.getElementById('addImageForm').remove();
      document.getElementById('edit-detail').remove();
      document.getElementById('addCategory').remove();
    };
    await renderDetailUmkm(umkmById);

    // RENDER PRODUCTS BY UMKM
    const productListByUmkm = await ProductsDbSource.getProductsByUmkm(url.id);
    if (productListByUmkm.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productListByUmkm.map((product) => createProductItemTemplate(product)).join('');
      document.querySelectorAll('.addImageFormProd').forEach((item) => {
        item.remove();
      });
      document.querySelectorAll('.prod-buttons').forEach((item) => {
        item.remove();
      });
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
