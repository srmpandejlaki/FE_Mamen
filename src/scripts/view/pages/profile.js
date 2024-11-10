import UmkmsDbSource from '../../api/umkms-api';
import ProductsDbSource from '../../api/products-api';
import CategoriesDbSource from '../../api/categories-api';
import ReviewsDbSource from '../../api/reviews-api';

const Profile = {
  async render() {
    return `
      <section id="explore">
      </section>
    `;
  },

  async afterRender() {
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();
    console.log(umkmDetails);

    const productDetails = await ProductsDbSource.getProductsByUmkm(umkmDetails[0].id);
    console.log(productDetails);

    const categoryDetails = await CategoriesDbSource.getCategoriesByUmkm(umkmDetails[0].id);
    console.log(categoryDetails);

    const reviewDetails = await ReviewsDbSource.getReviewsByUmkm(umkmDetails[0].id);
    console.log(reviewDetails);
  },
};

export default Profile;
