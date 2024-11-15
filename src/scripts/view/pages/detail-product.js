import UrlParser from '../../routes/url-parser';
import ProductsDbSource from '../../api/products-api';
import Loading from '../../utility/loading';

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
    const productContainer = document.querySelector('#detailProduct');
    await Loading.loadingPage(productContainer);
    const productDetails = await ProductsDbSource.getProductById(url.id);

    document.querySelector('.pageload').remove();
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
