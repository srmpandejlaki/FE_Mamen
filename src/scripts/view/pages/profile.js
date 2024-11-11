import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';

import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const Profile = {
  async render() {
    return `
      <section id="detailContainer">
     <div id="umkmDetail">
      <div id="umkms" class="umkms">
      </div>
      <div id="products" class="products">
      </div>
       <div id="reviews" class="reviews">
       </div>
     </div>
    </section>
    `;
  },

  async afterRender() {
    // RENDER UMKM DETAILS
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();

    if (!umkmDetails[0]) {
      document.querySelector('#umkmDetail').innerHTML = `
      <div class="blank-profile">
      <p>Tidak ada UMKM yang ditemukan. Silahkan menambah UMKM terlebih dahulu.</p>
      <button id="new-umkm">Tambah UMKM</button>
      </div>`;

      const newUmkmButton = document.querySelector('#new-umkm');
      newUmkmButton.addEventListener('click', () => {
        document.querySelector('.popup-form').style.display = 'flex';
      });
      return;
    }
    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkm) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkm;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetails[0]);

    // RENDER PRODUCTS BY UMKM
    const productDetails = await ProductsDbSource.getProductsByUmkm(umkmDetails[0].id);
    document.querySelector('#products').innerHTML = productDetails.map((product) => createProductItemTemplate(product)).join('');

    if (productDetails.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    }

    // RENDER REVIEWS BY UMKM
    const reviewDetails = await ReviewsDbSource.getReviewsByUmkm(umkmDetails[0].id);
    document.querySelector('#reviews').innerHTML = reviewDetails.map((review) => createReviewItemTemplate(review)).join('');

    if (reviewDetails.length === 0) {
      document.querySelector('#reviews').innerHTML = 'Tidak ada review yang ditampilkan.';
    }
  },
};

export default Profile;
