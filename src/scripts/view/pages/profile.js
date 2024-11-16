import Swal from 'sweetalert2';
import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import { tambahUmkm } from '../../utility/umkmFunction';
import {
  tambahProduk, editProduct, deleteProduct, productImage,
} from '../../utility/productFunction';
import Loading from '../../utility/loading';

const renderUmkm = async (umkm) => {
  const umkmContainer = document.querySelector('#umkms');
  const umkmItem = document.createElement('umkm-detail');
  umkmItem.umkmw = umkm;
  umkmContainer.innerHTML = '';
  umkmContainer.append(umkmItem);
};

const renderProducts = async (umkmId) => {
  const productContainer = document.querySelector('#products');

  try {
    const products = await ProductsDbSource.getProductsByUmkm(umkmId);
    productContainer.innerHTML = products.length > 0
      ? products.map((product) => createProductItemTemplate(product)).join('')
      : 'Tidak ada produk yang ditampilkan.';
  } catch {
    productContainer.innerHTML = 'Terjadi kesalahan saat memuat produk.';
  }

  productContainer.addEventListener('click', (event) => {
    const target = event.target.parentElement;

    if (target.classList.contains('editProdBtn')) {
      const productId = target.dataset.id;
      editProduct(productId);
    }

    if (target.classList.contains('deleteProdBtn')) {
      const productId = target.dataset.id;
      deleteProduct(productId);
    }

    if (target.classList.contains('addImageFormProd')) {
      const { id } = target.dataset;
      productImage(id);
    }
  });
};

const renderReviews = async (umkmId) => {
  const reviewContainer = document.querySelector('#reviews');

  try {
    const reviews = await ReviewsDbSource.getReviewsByUmkm(umkmId);
    reviewContainer.innerHTML = reviews.length > 0
      ? reviews.map((review) => createReviewItemTemplate(review)).join('')
      : 'Tidak ada review yang ditampilkan.';
  } catch {
    reviewContainer.innerHTML = 'Terjadi kesalahan saat memuat ulasan.';
  }
};

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

    try {
      const umkmByUser = await UmkmsDbSource.getUmkmByUser();
      const pageload = document.querySelector('.pageload');
      if (pageload) {
        pageload.remove();
      }

      if (!umkmByUser[0]) {
        document.querySelector('#umkmDetail').innerHTML = `
          <div class="blank-profile">
            <p>Tidak ada UMKM yang ditemukan. Silahkan menambah UMKM terlebih dahulu.</p>
            <button id="new-umkm">Tambah UMKM</button>
          </div>`;
        document.querySelector('#new-umkm').addEventListener('click', () => {
          document.querySelector('umkm-form').style.display = 'block';
        });
        tambahUmkm();
      } else {
        const { id } = umkmByUser[0];

        await renderUmkm(umkmByUser[0]);

        const newProductButton = document.querySelector('#new-product');
        newProductButton.addEventListener('click', () => {
          document.querySelector('product-form').style.display = 'block';
        });
        tambahProduk();

        await renderProducts(id);
        await renderReviews(id);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat data profil.',
      });
    }
  },
};

export default Profile;
