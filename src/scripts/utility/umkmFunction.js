import UmkmsDbSource from '../api/umkms-api';
import CategoriesDbSource from '../api/categories-api';

async function tambahUmkm() {
  const closeFormButton = document.getElementById('closeFormButton');
  const popupForm = document.querySelector('umkm-form');
  const formContent = document.querySelector('#popup-content');
  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    document.querySelector('umkm-form').style.display = 'none';
  });

  // Close the form when clicking outside the content area
  window.addEventListener('click', (event) => {
    if (event.target === popupForm || event.target === formContent) {
      popupForm.style.display = 'none';
    }
  });

  // Form submission handler
  document.getElementById('umkmForm').addEventListener('submit', async (event) => {
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
    await UmkmsDbSource.postUmkm(umkm);
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();

    // Close popup after submission
    document.querySelector('umkm-form').style.display = 'none';

    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkms) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkms;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetails[0]);
  });
}

async function editUmkm() {
  const umkmByUser = await UmkmsDbSource.getUmkmByUser();

  const closeFormButton = document.getElementById('closeFormButtonEdit');
  const popupForm = document.querySelector('editumkm-form');

  const { id } = umkmByUser[0];
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
    await UmkmsDbSource.putUmkmById(id, umkm);
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();

    // Close popup after submission
    popupForm.style.display = 'none';

    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkms) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkms;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetails[0]);
  }
  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
    const form = document.getElementById('umkmFormEdit');
    form.removeEventListener('submit', handleSubmit);
  });

  const form = document.getElementById('umkmFormEdit');
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function umkmImage() {
  const umkmDetails = await UmkmsDbSource.getUmkmByUser();
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
    umkmImg.src = `${umkmDetails[0].cover_url ? umkmDetails[0].cover_url : './images/hero-image2.jpg'}`;
  });

  addImgForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const coverUrl = fileInput.files[0];
    await UmkmsDbSource.postUmkmCover(umkmDetails[0].id, coverUrl);
    labelAddImg.style.display = 'inline-block';
    resetImg.style.display = 'none';
    submitImg.style.display = 'none';

    const umkmDetailss = await UmkmsDbSource.getUmkmByUser();
    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkms) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkms;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetailss[0]);
  });
}

async function addCategory() {
  const umkmDetails = await UmkmsDbSource.getUmkmByUser();
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

    const umkmDetailss = await UmkmsDbSource.getUmkmByUser();
    const umkmContainer = document.querySelector('#umkms');
    const renderDetail = async (umkms) => {
      const umkmItem = document.createElement('umkm-detail');
      umkmItem.umkmw = umkms;

      umkmContainer.innerHTML = '';
      umkmContainer.append(umkmItem);
    };
    await renderDetail(umkmDetailss[0]);
  });
}

export {
  umkmImage, addCategory, tambahUmkm, editUmkm,
};
