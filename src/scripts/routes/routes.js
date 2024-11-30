import Home from '../view/pages/home';
import DetailUmkm from '../view/pages/detail-umkm';
import Login from '../view/pages/login';
import ListUmkm from '../view/pages/list-umkm';
import ListProduct from '../view/pages/list-product';
import Profile from '../view/pages/profile';
import AboutUs from '../view/pages/about';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/umkms': ListUmkm,
  '/umkms/:id': DetailUmkm,
  '/products': ListProduct,
  '/login': Login,
  '/profile': Profile,
  '/about': AboutUs,
};

export default routes;
