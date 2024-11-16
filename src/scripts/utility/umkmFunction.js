/* eslint-disable no-param-reassign */
import Swal from 'sweetalert2';
import UmkmsDbSource from '../api/umkms-api';
import CategoriesDbSource from '../api/categories-api';
import Loading from './loading';

async function renderUmkmDetail(umkmContainer, umkmDetail) {
  const umkmItem = document.createElement('umkm-detail');
  umkmItem.umkmw = umkmDetail;
  umkmContainer.innerHTML = '';
  umkmContainer.append(umkmItem);
}

async function tambahUmkm() {
  const closeFormButton = document.getElementById('closeFormButton');
  const popupForm = document.querySelector('umkm-form');
  const umkmContainer = document.querySelector('#umkms');

  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const subdistrict = document.getElementById('subdistrict').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const year = document.getElementById('year').value;
    const umkm = {
      name, description, subdistrict, address, contact, year,
    };

    try {
      popupForm.style.display = 'none';
      await Loading.loadingPage(umkmContainer);

      await UmkmsDbSource.postUmkm(umkm);
      const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
      await renderUmkmDetail(umkmContainer, umkmDetailByUser[0]);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'UMKM berhasil ditambahkan!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  }

  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
    const form = document.getElementById('umkmForm');
    form.removeEventListener('submit', handleSubmit);
  });

  const form = document.getElementById('umkmForm');
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function editUmkm() {
  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmContainer = document.querySelector('#umkms');
  const closeFormButton = document.getElementById('closeFormButtonEdit');
  const popupForm = document.querySelector('editumkm-form');
  const { id } = umkmByUser[0];

  // Set form values from UMKM data
  document.getElementById('nameEdit').value = umkmByUser[0].name;
  document.getElementById('descriptionEdit').value = umkmByUser[0].description;
  document.getElementById('subdistrictEdit').value = umkmByUser[0].subdistrict;
  document.getElementById('addressEdit').value = umkmByUser[0].address;
  document.getElementById('contactEdit').value = umkmByUser[0].contact;
  document.getElementById('yearEdit').value = umkmByUser[0].year;

  // Form submission handler
  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('nameEdit').value;
    const description = document.getElementById('descriptionEdit').value;
    const subdistrict = document.getElementById('subdistrictEdit').value;
    const address = document.getElementById('addressEdit').value;
    const contact = document.getElementById('contactEdit').value;
    const year = document.getElementById('yearEdit').value;
    const umkm = {
      name, description, subdistrict, address, contact, year,
    };

    try {
      // Close popup while loading
      popupForm.style.display = 'none';

      // Update UMKM via API
      await UmkmsDbSource.putUmkmById(id, umkm);

      await Loading.loadingPage(umkmContainer);

      // Fetch updated data
      const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();

      await renderUmkmDetail(umkmContainer, umkmDetailByUser[0]);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data UMKM berhasil diperbarui!',
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  }

  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
    const form = document.getElementById('umkmFormEdit');
    form.removeEventListener('submit', handleSubmit);
  });

  // Ensure no duplicate listeners
  const form = document.getElementById('umkmFormEdit');
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function umkmImage() {
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmContainer = document.querySelector('#umkms');

  const labelAddImg = document.getElementById('addImgLabel');
  const resetImg = document.getElementById('resetImg');
  const submitImg = document.getElementById('submitImg');
  const addImgForm = document.getElementById('addImageForm');
  const fileInput = document.getElementById('addimage');
  const umkmImg = document.getElementById('umkm-img');

  fileInput.addEventListener('change', (event) => {
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
    umkmImg.src = umkmDetailByUser[0].cover_url || './images/hero-image2.jpg';
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const coverUrl = fileInput.files[0];

    try {
      await UmkmsDbSource.postUmkmCover(umkmDetailByUser[0].id, coverUrl);
      const updatedUmkmDetail = await UmkmsDbSource.getUmkmByUser();
      await renderUmkmDetail(umkmContainer, updatedUmkmDetail[0]);

      labelAddImg.style.display = 'inline-block';
      resetImg.style.display = 'none';
      submitImg.style.display = 'none';

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Gambar UMKM berhasil diunggah!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  }

  addImgForm.removeEventListener('submit', handleSubmit);
  addImgForm.addEventListener('submit', handleSubmit);
}

async function addCategory() {
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmContainer = document.querySelector('#umkms');

  const addCategoryBtn = document.getElementById('addCategory');
  const addCategoryForm = document.getElementById('form-addCategory');
  const inputCategory = document.getElementById('input-category');

  addCategoryBtn.addEventListener('click', () => {
    addCategoryForm.style.display = 'flex';
    addCategoryBtn.style.display = 'none';
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const name = inputCategory.value;

    try {
      await CategoriesDbSource.postCategory(umkmDetailByUser[0].id, { name });
      const updatedUmkmDetail = await UmkmsDbSource.getUmkmByUser();
      await renderUmkmDetail(umkmContainer, updatedUmkmDetail[0]);

      inputCategory.value = '';
      addCategoryForm.style.display = 'none';
      addCategoryBtn.style.display = 'block';

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Kategori berhasil ditambahkan!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  }

  addCategoryForm.removeEventListener('submit', handleSubmit);
  addCategoryForm.addEventListener('submit', handleSubmit);
}

export {
  tambahUmkm, umkmImage, addCategory, editUmkm,
};
