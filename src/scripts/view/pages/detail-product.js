import UrlParser from '../../routes/url-parser';
import ProductsDbSource from '../../api/products-api';
import { createProductItemTemplate } from '../templates/template-creator';

const DetailProduct = {
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
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const productDetails = await ProductsDbSource.getProductById(url.id);
    document.querySelector('#product-list').innerHTML = createProductItemTemplate(productDetails);
  },
};

export default DetailProduct;
