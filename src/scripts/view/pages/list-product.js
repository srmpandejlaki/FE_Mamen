import ProductsDbSource from '../../api/products-api';
import Loading from '../../utility/loading';
import { createProductItemTemplate } from '../templates/template-creator';

const ListProduct = {
  async render() {
    return `
      <section id="explore" class="exploreProd">
      <div>
          <div class="separator"></div>
        </div>
        <search-bar></search-bar>
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
    await Loading.loadingPage(productContainer);
    const allProductList = await ProductsDbSource.getProducts();
    const pageload = document.querySelector('.pageload');
    if (pageload) {
      pageload.remove();
    }
    if (allProductList.length === 0) {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    } else {
      allProductList.forEach((product) => {
        productContainer.innerHTML += createProductItemTemplate(product);
        document.querySelector('.addImageFormProd').remove();
        document.querySelector('.prod-buttons').remove();
      });
    }

    // --------------------------------------------
  },
};

export default ListProduct;
