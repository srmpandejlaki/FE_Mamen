import Home from '../view/pages/home';
import Detail from '../view/pages/detail';
import Login from '../view/pages/login';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/detail/:id': Detail,
  '/login': Login,

};

export default routes;
