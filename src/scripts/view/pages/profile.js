import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import { tambahUmkm } from '../../utility/umkmFunction';
import {
  tambahProduk, editProduct, deleteProduct, productImage,
} from '../../utility/productFunction';
import Loading from '../../utility/loading';

const Profile = {
  async render() {
    return `
      <section id="detailContainer">
      <umkm-form></umkm-form>
      <editumkm-form></editumkm-form>
      <product-form></product-form>
      <div id="umkmDetail" class="child-section">
        <div id="umkms" class="umkms"></div>
        <div class="product-separator">
          <div class="separator"></div>
        </div>
        <div class="section-title">
          <h2>Products</h2>
          <button id="new-product">Tambah Produk</button>
        </div>
        <div id="products" class="list-products"></div>
        <div>
          <div class="separator"></div>
        </div>
        <div class="section-title">
          <h2>Reviews</h2>
        </div>
        <div id="reviews" class="reviews"></div>
        <div>
          <div class="separator"></div>
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const container = document.querySelector('#umkmDetail');
    await Loading.loadingPage(container);
    const umkmByUser = await UmkmsDbSource.getUmkmByUser();

    document.querySelector('.pageload').remove();
    // JIKA USER BELUM MEMPUNYAI UMKM TAMPILKAN TOMBOL TAMBAH UMKM
    if (!umkmByUser[0]) {
      document.querySelector('#umkmDetail').innerHTML = `
      <div class="blank-profile">
      <p>Tidak ada UMKM yang ditemukan. Silahkan menambah UMKM terlebih dahulu.</p>
      <button id="new-umkm">Tambah UMKM</button>
      </div>`;

      const newUmkmButton = document.querySelector('#new-umkm');
      newUmkmButton.addEventListener('click', () => {
        document.querySelector('umkm-form').style.display = 'block';
      });
      tambahUmkm();
    } else {
      // JIKA USER MEMPUNYAI UMKM TAMPILKAN DETAIL UMKM
      const umkmContainer = document.querySelector('#umkms');
      const renderDetailUmkm = async (umkm) => {
        const umkmItem = document.createElement('umkm-detail');
        umkmItem.umkmw = umkm;

        umkmContainer.innerHTML = '';
        umkmContainer.append(umkmItem);
      };
      await renderDetailUmkm(umkmByUser[0]);

      // TAMBAH PRODUK
      const newProductButton = document.querySelector('#new-product');
      newProductButton.addEventListener('click', () => {
        document.querySelector('product-form').style.display = 'block';
      });
      tambahProduk();

      // RENDER PRODUCTS BY UMKM
      const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);
      if (productListByUmkm.length === 0) {
        document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
      } else {
        document.querySelector('#products').innerHTML = productListByUmkm
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product) => createProductItemTemplate(product))
          .join('');

        const productContainer = document.querySelector('#products');

        // TOMBOL EDIT DAN HAPUS PRODUK
        productContainer.addEventListener('click', async (event) => {
          const target = event.target.parentElement;

          if (target.classList.contains('editProdBtn')) {
            const productId = target.dataset.id;
            editProduct(productId);
          }

          if (target.classList.contains('deleteProdBtn')) {
            const productId = target.dataset.id;
            deleteProduct(productId);
          }
          // UPLOAD GAMBAR PRODUK
          if (target.classList.contains('addImageFormProd')) {
            const { id } = target.dataset;
            productImage(id);
          }
        });
      }

      // RENDER REVIEWS BY UMKM
      const reviewListByUmkm = await ReviewsDbSource.getReviewsByUmkm(umkmByUser[0].id);
      document.querySelector('#reviews').innerHTML = reviewListByUmkm.map((review) => createReviewItemTemplate(review)).join('');

      if (reviewListByUmkm.length === 0) {
        document.querySelector('#reviews').innerHTML = 'Tidak ada review yang ditampilkan.';
      }
    }
  },
};

export default Profile;
