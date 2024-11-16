import UmkmsDbSource from '../api/umkms-api';
import ProductsDbSource from '../api/products-api';
import { createProductItemTemplate } from '../view/templates/template-creator';

async function tambahProduk() {
  const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
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
    // Close popup after submission
    popupForm.style.display = 'none';
    await ProductsDbSource.postProduct(umkmDetailByUser[0].id, product);

    const produkkontainer = document.querySelector('#products');

    const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmDetailByUser[0].id);

    if (productListByUmkm.length === 0) {
      produkkontainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productListByUmkm
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((productItem) => createProductItemTemplate(productItem))
        .join('');
    }
  });
}

async function editProduct(id) {
  const produkkontainer = document.querySelector('#products');
  const productById = await ProductsDbSource.getProductById(id);

  const renderEditform = async (prod) => {
    const productEditForm = document.createElement('editproduct-form');
    productEditForm.productw = prod;
    produkkontainer.appendChild(productEditForm);
  };
  await renderEditform(productById);

  const productEditForm = document.querySelector('editproduct-form');
  const closeFormButton = document.getElementById(`closeFormButtonProdEdit-${id}`);

  document.getElementById(`nameprodedit-${id}`).value = productById.name;
  document.getElementById(`typeedit-${id}`).value = productById.product_type;
  document.getElementById(`descriptionprodedit-${id}`).value = productById.description;
  document.getElementById(`priceedit-${id}`).value = productById.price;

  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmByUser[0].id;
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
    // Close popup after submission
    productEditForm.style.display = 'none';
    await ProductsDbSource.putProductById(umkmId, id, product);
    productEditForm.remove();

    const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);

    if (productListByUmkm.length === 0) {
      produkkontainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productListByUmkm
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((productItem) => createProductItemTemplate(productItem))
        .join('');
    }
  }
  const form = document.getElementById(`productFormEdit-${id}`);
  // Close the form popup
  closeFormButton.addEventListener('click', () => {
    productEditForm.style.display = 'none';
    form.removeEventListener('submit', handleSubmit);
    productEditForm.remove();
  });

  // Remove any existing submit listener
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function deleteProduct(id) {
  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
  const umkmId = umkmByUser[0].id;

  await ProductsDbSource.deleteProductById(umkmId, id);

  const produkkontainer = document.querySelector('#products');

  const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);

  if (productListByUmkm.length === 0) {
    produkkontainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
  } else {
    document.querySelector('#products').innerHTML = productListByUmkm
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((productItem) => createProductItemTemplate(productItem))
      .join('');
  }
}

async function productImage(id) {
  const productById = await ProductsDbSource.getProductById(id);
  const umkmByUser = await UmkmsDbSource.getUmkmByUser();
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
    productImg.src = `${productById.cover_url ? productById.cover_url : './images/template-product-img.png'}`;
  });

  addImgForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const coverUrl = fileInput.files[0];
    await ProductsDbSource.postProductCover(umkmByUser[0].id, id, coverUrl);
    labelAddImg.style.display = 'inline-block';
    resetImg.style.display = 'none';
    submitImg.style.display = 'none';

    const produkkontainer = document.querySelector('#products');

    const productListByUmkm = await ProductsDbSource.getProductsByUmkm(umkmByUser[0].id);

    if (productListByUmkm.length === 0) {
      produkkontainer.innerHTML = 'Tidak ada produk yang ditampilkan.';
    } else {
      document.querySelector('#products').innerHTML = productListByUmkm
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((productItem) => createProductItemTemplate(productItem))
        .join('');
    }
  });
}

export {
  tambahProduk, editProduct, deleteProduct, productImage,
};
