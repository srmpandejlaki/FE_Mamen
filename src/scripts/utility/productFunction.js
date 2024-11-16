import Swal from 'sweetalert2';
import UmkmsDbSource from '../api/umkms-api';
import ProductsDbSource from '../api/products-api';
import { createProductItemTemplate } from '../view/templates/template-creator';
import Loading from './loading';

async function renderProductList(umkmId) {
  const produkkontainer = document.querySelector('#products');
  await Loading.loadingPage(produkkontainer);
  const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmId);

  produkkontainer.innerHTML = '';
  if (productListByUmkm.length === 0) {
    produkkontainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
  } else {
    produkkontainer.innerHTML = productListByUmkm
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((productItem) => createProductItemTemplate(productItem))
      .join('');
  }
}

async function tambahProduk() {
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmDetailByUser[0].id;
  const closeFormButton = document.getElementById('closeFormButtonProd');
  const popupForm = document.querySelector('product-form');

  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
  });

  // Form submission handler
  document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('nameprod').value;
    const product_type = document.getElementById('type').value;
    const description = document.getElementById('descriptionprod').value;
    const price = document.getElementById('price').value;
    const product = {
      name, product_type, description, price,
    };

    try {
      popupForm.style.display = 'none';

      await ProductsDbSource.postProduct(umkmId, product);
      await renderProductList(umkmId);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Produk berhasil ditambahkan!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  });
}

async function editProduct(id) {
  const produkkontainer = document.querySelector('#products');
  const productById = await ProductsDbSource.getProductById(id);
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmDetailByUser[0].id;

  const renderEditForm = async (prod) => {
    const productEditForm = document.createElement('editproduct-form');
    productEditForm.productw = prod;
    produkkontainer.appendChild(productEditForm);
  };
  await renderEditForm(productById);

  const productEditForm = document.querySelector('editproduct-form');
  const closeFormButton = document.getElementById(`closeFormButtonProdEdit-${id}`);

  // Set values in the form
  document.getElementById(`nameprodedit-${id}`).value = productById.name;
  document.getElementById(`typeedit-${id}`).value = productById.product_type;
  document.getElementById(`descriptionprodedit-${id}`).value = productById.description;
  document.getElementById(`priceedit-${id}`).value = productById.price;

  // Form submission handler
  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById(`nameprodedit-${id}`).value;
    const product_type = document.getElementById(`typeedit-${id}`).value;
    const description = document.getElementById(`descriptionprodedit-${id}`).value;
    const price = document.getElementById(`priceedit-${id}`).value;
    const product = {
      name, product_type, description, price,
    };

    try {
      productEditForm.style.display = 'none';

      await ProductsDbSource.putProductById(umkmId, id, product);
      await renderProductList(umkmId);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Produk berhasil diperbarui!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
      console.log(error);
    }
  }

  const form = document.getElementById(`productFormEdit-${id}`);

  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    productEditForm.style.display = 'none';
    form.removeEventListener('submit', handleSubmit);
    productEditForm.remove();
  });

  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function deleteProduct(id) {
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmDetailByUser[0].id;

  try {
    await ProductsDbSource.deleteProductById(umkmId, id);
    await renderProductList(umkmId);

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Produk berhasil dihapus!',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: `Terjadi kesalahan: ${error.message}`,
    });
  }
}

async function productImage(id) {
  const productById = await ProductsDbSource.getProductById(id);
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmDetailByUser[0].id;

  // UPLOAD GAMBAR PRODUK
  const labelAddImg = document.getElementById(`addImgLabelProd-${id}`);
  const resetImg = document.getElementById(`resetImgProd-${id}`);
  const submitImg = document.getElementById(`submitImgProd-${id}`);
  const addImgForm = document.getElementById(`addImageFormProd-${id}`);
  const fileInput = document.getElementById(`addimageprod-${id}`);
  const productImg = document.getElementById(`product-imgs-${id}`);

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      productImg.src = URL.createObjectURL(file);
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
    productImg.src = productById.cover_url || './images/template-product-img.png';
  });

  addImgForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const coverUrl = fileInput.files[0];

    try {
      await ProductsDbSource.postProductCover(umkmId, id, coverUrl);

      labelAddImg.style.display = 'inline-block';
      resetImg.style.display = 'none';
      submitImg.style.display = 'none';

      await renderProductList(umkmId);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Gambar produk berhasil diunggah!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  });
}

export {
  tambahProduk, editProduct, deleteProduct, productImage,
};
