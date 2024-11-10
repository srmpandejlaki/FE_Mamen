import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import CategoriesDbSource from '../../api/categories-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createUmkmItemTemplate, createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const Profile = {
  async render() {
    return `
      <section id="explore">
        <div class="explore-con">
          <div id="umkm-list"></div>
        </div>
        <div class="explore-con">
          <div id="category-list"></div>
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
    document.querySelector('#umkm-list').innerHTML = '';
    document.querySelector('#category-list').innerHTML = '';
    document.querySelector('#product-list').innerHTML = '';
    document.querySelector('#review-list').innerHTML = '';
    // RENDER UMKM DETAILS
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();

    if (!umkmDetails[0]) {
      document.querySelector('#umkm-list').innerHTML = 'Tidak ada UMKM yang ditemukan. Silahkan menambah UMKM terlebih dahulu.';
      return;
    }
    document.querySelector('#umkm-list').innerHTML = createUmkmItemTemplate(umkmDetails[0]);

    // RENDER CATEGORIES BY UMKM
    const categories = await CategoriesDbSource.getCategoriesByUmkm(umkmDetails[0].id);
    document.querySelector('#category-list').innerHTML = categories.categories.map((category) => `<p>${category.name}</p>`).join('');

    if (categories.length === 0) {
      document.querySelector('#category-list').innerHTML = 'Tidak ada kategori yang ditampilkan.';
    }

    // RENDER PRODUCTS BY UMKM
    const productDetails = await ProductsDbSource.getProductsByUmkm(umkmDetails[0].id);
    document.querySelector('#product-list').innerHTML = productDetails.map((product) => createProductItemTemplate(product)).join('');

    if (productDetails.length === 0) {
      document.querySelector('#product-list').innerHTML = 'Tidak ada produk yang ditampilkan.';
    }

    // RENDER REVIEWS BY UMKM
    const reviewDetails = await ReviewsDbSource.getReviewsByUmkm(umkmDetails[0].id);
    document.querySelector('#review-list').innerHTML = reviewDetails.map((review) => createReviewItemTemplate(review)).join('');

    if (reviewDetails.length === 0) {
      document.querySelector('#review-list').innerHTML = 'Tidak ada review yang ditampilkan.';
    }
  },
};

export default Profile;
