import UrlParser from '../../routes/url-parser';
import ProductsDbSource from '../../api/products-api';

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
    console.log(productDetails);
  },
};

export default DetailProduct;
