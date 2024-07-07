import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import routes from "../../routes/routes";

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Routes>
              {
                routes.map((route,idx) => ( //iterates through an array of route objects (routes), where each object contains information about a specific route.
                  route.component && ( //checks if route.component exists (truthy). If it does, it renders a <Route> component.
                    <Route // For each route object in the routes array, a <Route> component is created
                      key={idx}//React requires a unique key prop when rendering arrays of components.
                      path={route.path}//Sets the path of the route based on the path
                      exact={route.exact}//Specifies whether the route should match exactly (true) or inclusively (false) for the path.
                      element={<route.component />}//Specifies the component to render when the route's path matches.
                    />
                  )
                ))
              }
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} /> {/* When users go to /admin, it navigates (redirects) them to /admin/dashboard. */}
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
