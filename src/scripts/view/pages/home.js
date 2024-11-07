import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
import CategoriesDbSource from '../../api/categories-api';

const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/webp"
            fetchpriority="high" 
            srcset="./images/hero-image2.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            fetchpriority="high" 
            srcset="./images/hero-image2-small.jpg">
          <img
            fetchpriority="high" 
            src='./images/hero-image2-large.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
      <section id="explore"></section>
    `;
  },

  async afterRender() {
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('#explore');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });

    const ambilDataUmkm = async () => {
      const dataUmkm = await UmkmsDbSource.getUmkms();
      console.log(dataUmkm);
    };

    const ambilDetailUmkm = async (id) => {
      const dataUmkm = await UmkmsDbSource.getUmkmById(id);
      console.log(dataUmkm);
    };

    const ambilDataProduk = async () => {
      const dataProduk = await ProductsDbSource.getProductsByUmkm('umkm-gf-bJ-nnnYsYk3Vu');
      console.log(dataProduk);
    };

    const ambilDataReview = async () => {
      const dataReview = await ReviewsDbSource.getReviewsByUmkm('umkm-gf-bJ-nnnYsYk3Vu');
      console.log(dataReview);
    };

    const ambilDataKategori = async () => {
      const dataKategori = await CategoriesDbSource.getCategoriesByUmkm('umkm-gf-bJ-nnnYsYk3Vu');
      console.log(dataKategori);
    };

    await ambilDataUmkm();
    await ambilDetailUmkm('umkm-gf-bJ-nnnYsYk3Vu');
    await ambilDataProduk();
    await ambilDataReview();
    await ambilDataKategori();
  },
};

export default Home;
