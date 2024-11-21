import ProductsDbSource from '../../api/products-api';
import SearchDbSource from '../../api/search-api';
// import footerGsapJs from '../../utility/animation/home-page/footer-gsap';
import Loading from '../../utility/loading';
import { createProductItemTemplate } from '../templates/template-creator';

const renderProdukt = async (list) => {
  const productContainer = document.querySelector('#products');
  productContainer.innerHTML = '';
  list.forEach((product) => {
    productContainer.innerHTML += createProductItemTemplate(product);
    document.querySelector('.addImageFormProd').remove();
    document.querySelector('.prod-buttons').remove();
  });
};

const ListProduct = {
  async render() {
    return `
      <section id="explore" class="exploreProd">
        <search-bar></search-bar>
        <div class="explore-con">
          <div id="products" class="products"></div>
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
    await renderProdukt(allProductList);
    // footerGsapJs();
    // --------------------------------------------
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    searchInput.addEventListener('input', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      const filteredProducts = await SearchDbSource.search(query);
      await renderProdukt(filteredProducts.products);
    });

    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      const filteredProducts = await SearchDbSource.search(query);
      await renderProdukt(filteredProducts.products);
    });
  },
};

export default ListProduct;
