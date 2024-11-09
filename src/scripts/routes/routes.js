import Home from '../view/pages/home';
import DetailUmkm from '../view/pages/detail-umkm';
import Login from '../view/pages/login';
import ListUmkm from '../view/pages/list-umkm';
import ListProduct from '../view/pages/list-product';
import DetailProduct from '../view/pages/detail-product';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/umkms': ListUmkm,
  '/umkms/:id': DetailUmkm,
  '/products': ListProduct,
  '/products/:id': DetailProduct,
  '/login': Login,

};

export default routes;
