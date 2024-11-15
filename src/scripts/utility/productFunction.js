import UmkmsDbSource from '../api/umkms-api';
import ProductsDbSource from '../api/products-api';
import { createProductItemTemplate } from '../view/templates/template-creator';

async function tambahProduk() {
  const umkm = await UmkmsDbSource.getUmkmByUser();
  const closeFormButton = document.getElementById('closeFormButtonProd');
  const popupForm = document.querySelector('product-form');
  const formContent = document.querySelector('.popup-contentProd');

  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
  });

  // Close the form when clicking outside the content area
  window.addEventListener('click', (event) => {
    if (event.target === popupForm || event.target === formContent) {
      popupForm.style.display = 'none';
    }
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
    await ProductsDbSource.postProduct(umkm[0].id, product);

    // Close popup after submission
    popupForm.style.display = 'none';
    const productDetails = await ProductsDbSource.getProductsByUmkm(umkm[0].id);
    if (productDetails.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productDetails.map((productItem) => createProductItemTemplate(productItem)).join('');
    }
  });
}

async function editProduct(id) {
  const productById = await ProductsDbSource.getProductById(id);

  const closeFormButton = document.getElementById('closeFormButtonProdEdit');
  const popupForm = document.querySelector('editproduct-form');

  document.getElementById('nameprodedit').value = productById.name;
  document.getElementById('typeedit').value = productById.product_type;
  document.getElementById('descriptionprodedit').value = productById.description;
  document.getElementById('priceedit').value = productById.price;

  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmByUser[0].id;
  // Form submission handler
  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('nameprodedit').value;
    const product_type = document.getElementById('typeedit').value;
    const description = document.getElementById('descriptionprodedit').value;
    const price = document.getElementById('priceedit').value;
    const product = {
      name, product_type, description, price,
    };
    await ProductsDbSource.putProductById(umkmId, id, product);

    // Close popup after submission
    popupForm.style.display = 'none';

    const productDetails = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);
    if (productDetails.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productDetails.map((productItem) => createProductItemTemplate(productItem)).join('');
    }
  }
  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
    const form = document.getElementById('productFormEdit');
    form.removeEventListener('submit', handleSubmit);
  });

  // Remove any existing submit listener
  const form = document.getElementById('productFormEdit');
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function deleteProduct(id) {
  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmByUser[0].id;

  await ProductsDbSource.deleteProductById(umkmId, id);
  const productDetailss = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);
  if (productDetailss.length === 0) {
    document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
  } else {
    document.querySelector('#products').innerHTML = productDetailss.map((productItem) => createProductItemTemplate(productItem)).join('');
  }
}

async function productImage(id) {
  const productDetails = await ProductsDbSource.getProductById(id);
  const umkmDetails = await UmkmsDbSource.getUmkmByUser();
  // UPLOAD GAMBAR UMKM
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
    productImg.src = `${productDetails.cover_url ? productDetails.cover_url : './images/template-product-img.png'}`;
  });

  addImgForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const coverUrl = fileInput.files[0];
    await ProductsDbSource.postProductCover(umkmDetails[0].id, id, coverUrl);
    labelAddImg.style.display = 'inline-block';
    resetImg.style.display = 'none';
    submitImg.style.display = 'none';

    const productDetail = await ProductsDbSource.getProductsByUmkm(umkmDetails[0].id);
    if (productDetail.length === 0) {
      document.querySelector('#products').innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productDetail.map((productItem) => createProductItemTemplate(productItem)).join('');
    }
  });
}

export {
  tambahProduk, editProduct, deleteProduct, productImage,
};
