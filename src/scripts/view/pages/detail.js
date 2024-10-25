// import UrlParser from '../../routes/url-parser';
// import LikeButtonPresenter from '../../utility/like-button-presenter';

const Detail = {
  async render() {
    return `
    <section></section>
    `;
  },

  async afterRender() {
    // const url = UrlParser.parseActiveUrlWithoutCombiner();

    // LikeButtonPresenter.init({
    //   likeButtonContainer: document.querySelector('#likeButtonContainer'),
    //   favoriteResto: FavoriteRestoIdb,
    //   resto: {
    //     id: restoDetails.id,
    //     name: restoDetails.name,
    //     description: restoDetails.description,
    //     city: restoDetails.city,
    //     address: restoDetails.address,
    //     pictureId: restoDetails.pictureId,
    //     categories: restoDetails.categories,
    //     foods: restoMenus.foods,
    //     drinks: restoMenus.drinks,
    //     rating: restoDetails.rating,
    //     customerReviews: restoReviews,
    //   },
    // });
  },
};

export default Detail;
