import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import Publicrouteslist from "../../routes/Publicrouteslist";

const FrontendLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          {Publicrouteslist.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default FrontendLayout;








































// import React from "react";
// import { Routes, Route } from 'react-router-dom';
// import Navbar from "../../layouts/frontend/Navbar";

// import Publicrouteslist from "../../routes/Publicrouteslist";

// const FrontendLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <div>
//         <Routes>
//           {Publicrouteslist.map((routedata, idx) => {
//             return (
//               routedata.component && (
//                 <Route
//                   key={idx}
//                   path={routedata.path}
//                   exact={routedata.exact}
//                   render={(props)=>{
//                     <routedata.component {...props}/>
//                   }}

//                 />
//               )
//             );
//           })}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default FrontendLayout;
