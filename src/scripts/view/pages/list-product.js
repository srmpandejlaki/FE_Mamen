import ProductsDbSource from '../../api/products-api';
import { createProductItemTemplate } from '../templates/template-creator';

const ListProduct = {
  async render() {
    return `
      <section id="explore" class="exploreProd">
      <div>
          <div class="separator"></div>
        </div>
        <div class="explore-con">
          <div id="products" class="products"></div>
        </div>
        <div>
          <div class="separator"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // RENDER PRODUCT
    const productContainer = document.querySelector('#products');
    productContainer.innerHTML = '';
    const products = await ProductsDbSource.getProducts();

    if (products.length === 0) {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    } else {
      products.forEach((product) => {
        productContainer.innerHTML += createProductItemTemplate(product);
        document.querySelector('.addImageFormProd').remove();
        document.querySelector('.prod-buttons').remove();
      });
    }

    // --------------------------------------------
  },
};

export default ListProduct;
