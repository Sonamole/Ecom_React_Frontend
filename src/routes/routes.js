import React from 'react';
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';

const routes = [
  {
    path: "dashboard", // URL path for the Dashboard route
    exact: true, // Should match exactly with "/dashboard"
    name: 'Dashboard', // Name or title for this route (optional)
    component: Dashboard, /// Component to render when this route is active
  },

  {path: "profile", exact: true, name: 'Profile', component: Profile },
  {path: "add-category", exact: true, name: 'Category', component: Category},
  {path: "view-category", exact: true, name: 'ViewCategory', component: ViewCategory},
  {path: "edit-category/:id", exact: true, name: 'EditCategory', component: EditCategory},
  {path: "add-product", exact: true, name: 'AddProduct', component: AddProduct},
  {path: "view-product", exact: true, name: 'ViewProduct', component: ViewProduct},
  {path: "edit-product/:id", exact: true, name: 'EditProduct', component: EditProduct},

];

export default routes;


// This code defines an array named routes that contains route configuration objects. Each object represents a route
// in your React application, specifying details like the URL path, whether it should match exactly (exact), a name for
//  the route, and the component that should be rendered when the route is active.