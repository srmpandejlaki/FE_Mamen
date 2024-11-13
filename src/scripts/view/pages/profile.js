import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import { createProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import CategoriesDbSource from '../../api/categories-api';

const Profile = {
  async render() {
    return `
      <section id="detailContainer">
      <umkm-form></umkm-form>
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
    const container = document.querySelector('#detailContainer');
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();

    // JIKA USER BELUM MEMPUNYAI UMKM TAMPILKAN TOMBOL TAMBAH UMKM
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
    } else {
      // JIKA USER MEMPUNYAI UMKM TAMPILKAN DETAIL UMKM
      const umkmContainer = document.querySelector('#umkms');
      const renderDetail = async (umkm) => {
        const umkmItem = document.createElement('umkm-detail');
        umkmItem.umkmw = umkm;

        umkmContainer.innerHTML = '';
        umkmContainer.append(umkmItem);
      };
      await renderDetail(umkmDetails[0]);

      // DI DALAM PROFILE DITAMBAHKAN EDIT BUTTON DI DETAIL UMKM
      const formEdit = document.createElement('editumkm-form');
      container.append(formEdit);

      const editUmkmButton = document.querySelector('#edit-detail');
      editUmkmButton.addEventListener('click', () => {
        document.querySelector('#popupFormEdit').style.display = 'flex';
      });

      // UPLOAD GAMBAR UMKM
      const labelAddImg = document.getElementById('addImgLabel');
      const resetImg = document.getElementById('resetImg');
      const submitImg = document.getElementById('submitImg');
      const addImgForm = document.getElementById('addImageForm');
      const fileInput = document.getElementById('addimage');
      const umkmImg = document.getElementById('umkm-img');
      fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
          umkmImg.src = URL.createObjectURL(file);
          labelAddImg.style.display = 'none';
          resetImg.style.display = 'inline-block';
          submitImg.style.display = 'inline-block';
        } else {
          labelAddImg.style.display = 'inline-block';
          resetImg.style.display = 'none';
          submitImg.style.display = 'none';
        }
      });
      addImgForm.addEventListener('reset', () => {
        fileInput.value = '';
        labelAddImg.style.display = 'inline-block';
        resetImg.style.display = 'none';
        submitImg.style.display = 'none';
        umkmImg.src = `${umkmDetails[0].cover_url ? umkmDetails[0].cover_url : './images/hero-image2.webp'}`;
      });

      addImgForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const coverUrl = fileInput.files[0];
        await UmkmsDbSource.postUmkmCover(umkmDetails[0].id, coverUrl);
        labelAddImg.style.display = 'inline-block';
        resetImg.style.display = 'none';
        submitImg.style.display = 'none';
      });

      // TAMBAH KATEGORI
      const addCategoryBtn = document.getElementById('addCategory');
      const addCategoryForm = document.getElementById('form-addCategory');
      const inputCategory = document.getElementById('input-category');

      addCategoryBtn.addEventListener('click', () => {
        addCategoryForm.style.display = 'flex';
        addCategoryBtn.style.display = 'none';
      });

      addCategoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = inputCategory.value;
        const category = { name };
        await CategoriesDbSource.postCategory(umkmDetails[0].id, category);
        addCategoryForm.style.display = 'none';
        inputCategory.value = '';
        addCategoryBtn.style.display = 'block';
      });

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
    }
  },
};

export default Profile;
