import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ViewProduct from "../components/frontend/collections/ViewProduct";


const Publicrouteslist = [

  { path: "/", exact: true, name: 'Home', component: Home },
  { path: "/about", exact: true, name: 'About', component: About },
  { path: "/contact", exact: true, name: 'Contact', component: Contact },
  { path: "/collections", exact: true, name: 'ViewCategory', component: ViewCategory },
  { path: "/collections/:slug", exact: true, name: 'ViewProduct', component: ViewProduct },



];

export default Publicrouteslist;


