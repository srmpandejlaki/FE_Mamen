import ProductsDbSource from '../../api/products-api';
import { createProductItemTemplate } from '../templates/template-creator';

const ListProduct = {
  async render() {
    return `
      <section id="explore">
        <div class="explore-con">
          <div id="product-list"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // RENDER PRODUCT
    const productContainer = document.querySelector('#product-list');
    productContainer.innerHTML = '';
    const products = await ProductsDbSource.getProducts();

    products.forEach((product) => {
      productContainer.innerHTML += createProductItemTemplate(product);
    });

    if (productContainer.innerHTML === '') {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    }
    // --------------------------------------------
  },
};

export default ListProduct;
