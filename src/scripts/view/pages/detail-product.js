import UrlParser from '../../routes/url-parser';
import ProductsDbSource from '../../api/products-api';

const DetailProduct = {
  async render() {
    return `
      <section id="detailContainer">
     <div id="productDetail">
      <div id="detailProduct" class="detailProduct">
      </div>
      <div>
          <div class="separator"></div>
        </div>
     </div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const productDetails = await ProductsDbSource.getProductById(url.id);

    const productContainer = document.querySelector('#detailProduct');
    const renderDetail = async (product) => {
      const productItem = document.createElement('product-detail');
      productItem.productw = product;

      productContainer.innerHTML = '';
      productContainer.append(productItem);
    };
    await renderDetail(productDetails);
  },
};

export default DetailProduct;
