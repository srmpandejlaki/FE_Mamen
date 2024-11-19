import { jwtDecode } from 'jwt-decode';
import UrlParser from '../../routes/url-parser';
import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import Loading from '../../utility/loading';
import CategoriesDbSource from '../../api/categories-api';

const renderUmkm = async (umkm) => {
  const umkmContainer = document.querySelector('#umkms');
  const umkmItem = document.createElement('umkm-freedetail');
  umkmItem.umkmw = umkm;
  umkmContainer.innerHTML = '';
  umkmContainer.append(umkmItem);
};

const renderCategories = async (umkmId) => {
  const categoriesContainer = document.querySelector('#listCategory');
  const categories = await CategoriesDbSource.getCategoriesByUmkm(umkmId);
  categoriesContainer.innerHTML = '';
  // RENDER CATEGORIES BY UMKM
  if (categories.length === 0) {
    categoriesContainer.innerHTML = 'Belum terdapat kategori. Silahkan menambah terlebih dahulu';
  } else {
    categoriesContainer.innerHTML = categories.map((category) => `
          <div class="category" data-id="${category.id}">
            <p>${category.name}</p>
          </div>`)
      .join('');
  }
};

const renderProducts = async (umkmId) => {
  const productContainer = document.querySelector('#products');

  const products = await ProductsDbSource.getProductsByUmkm(umkmId);
  productContainer.innerHTML = '';
  try {
    productContainer.innerHTML = products.length > 0
      ? products.sort((a, b) => a.name.localeCompare(b.name))
        .map((productItem) => createProductItemTemplate(productItem))
        .join('') : 'Belum ada produk untuk ditampilkan.';

    document.querySelectorAll('.addImageFormProd').forEach((item) => {
      item.remove();
    });
    document.querySelectorAll('.prod-buttons').forEach((item) => {
      item.remove();
    });
  } catch {
    productContainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
  }
};

const renderReviews = async (umkmId) => {
  const reviewContainer = document.querySelector('#reviews');

  const reviews = await ReviewsDbSource.getReviewsByUmkm(umkmId);
  reviewContainer.innerHTML = '';
  try {
    reviewContainer.innerHTML = reviews.length > 0
      ? reviews.map((review) => createReviewItemTemplate(review)).join('')
      : 'Tidak ada review yang ditampilkan.';
  } catch {
    reviewContainer.innerHTML = 'Terjadi kesalahan saat memuat ulasan.';
  }
};

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
    const pageload = document.querySelector('.pageload');
    if (pageload) {
      pageload.remove();
    }

    // RENDER UMKM DETAILS
    renderUmkm(umkmById);
    // RENDER CATEGORIES BY UMKM
    renderCategories(url.id);
    // RENDER PRODUCTS BY UMKM
    renderProducts(url.id);
    // RENDER REVIEWS BY UMKM
    renderReviews(url.id);

    // OTORISASI OWNER FOR ADD REVIEW
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const userId = jwtDecode(accessToken);

      if (umkmById.owner === userId.id) {
        const formReview = document.querySelector('form-review');
        formReview.style.display = 'none';
      }
    }

    // ADD REVIEW
    const formNewReview = document.getElementById('formReview');
    formNewReview.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('namaReviewer').value;
      const review = document.getElementById('reviewBody').value;
      const user_rating = document.getElementById('userRating').value;

      const newReview = { name, review, user_rating };
      const umkmId = url.id;

      ReviewsDbSource.postReview(umkmId, newReview).then(async () => {
        await ReviewsDbSource.getReviewsByUmkm(umkmId).then(async () => {
          await renderReviews(umkmId);
        }).then(async () => {
          const umkm = await UmkmsDbSource.getUmkmById(umkmId);
          renderUmkm(umkm);
        });
      });
      formNewReview.reset();
    });

    // ADD REVIEW
  },
};

export default DetailUmkm;
