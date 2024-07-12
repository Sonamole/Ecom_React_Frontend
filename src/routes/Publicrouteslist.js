import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ViewProduct from "../components/frontend/collections/ViewProduct";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";


const Publicrouteslist = [

  { path: "/", exact: true, name: 'Home', component: Home },
  { path: "/about", exact: true, name: 'About', component: About },
  { path: "/contact", exact: true, name: 'Contact', component: Contact },
  { path: "/collections", exact: true, name: 'ViewCategory', component: ViewCategory },
  { path: "/collections/:slug", exact: true, name: 'ViewProduct', component: ViewProduct },
  { path: "/collections/:category_slug/:product_slug", exact: true, name: 'ProductDetail', component: ProductDetail }, //Make sure the parameter names in the route configuration (:category_slug and :product_slug) match those used in useParams.
  { path: "/cart", exact: true, name: 'Cart', component: Cart },
  { path: "/checkout", exact: true, name: 'Checkout', component: Checkout },


];

export default Publicrouteslist;


