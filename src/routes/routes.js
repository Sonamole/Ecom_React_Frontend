import React from 'react';
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';

const routes = [
  {
    path: "dashboard", // URL path for the Dashboard route
    exact: true, // Should match exactly with "/dashboard"
    name: 'Dashboard', // Name or title for this route (optional)
    component: Dashboard, /// Component to render when this route is active
  },
  {
    path: "profile",
    exact: true,
    name: 'Profile',
    component: Profile,
  }
];

export default routes;


// This code defines an array named routes that contains route configuration objects. Each object represents a route
// in your React application, specifying details like the URL path, whether it should match exactly (exact), a name for
//  the route, and the component that should be rendered when the route is active.