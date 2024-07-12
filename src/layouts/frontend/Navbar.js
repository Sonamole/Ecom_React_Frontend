import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post('api/logout').then((response) => {
      if (response.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", response.data.message, "success");
        navigate('/');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <Link className="navbar-brand" to="#">Navbar</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/collections">Collections</Link>
          </li>
          {!localStorage.getItem('auth_token') ? ( //checks if there is an auth_token stored in the browser's local storage.
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (// If the auth_token is present in the local storage (i.e., the user is logged in).The above links will be displayed.otherwise below link
            <li className="nav-item">
              <button
                type="button"
                onClick={logoutSubmit}
                className="nav-link btn btn-danger btn-sm text-white"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
























// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import swal from 'sweetalert'
// import { useNavigate } from 'react-router-dom'

// function Navbar() {

// const navigate=useNavigate();

// const logoutSubmit=(e)=>{
//   e.preventDefault();
//   axios.post('api/logout').then(response=>{
//     if(response.data.status===200)
//     {
//       localStorage.removeItem('auth_token');
//       localStorage.removeItem('auth_name');
//       swal("Sucess",response.data.message,"success")
//       navigate('/');
//     }
//   });
// }

//    var AuthButtons='';

//    if(!localStorage.getItem('auth_token')){
//       AuthButtons=(
//           <ul className='navbar-nav'>
//              <li className="nav-item">
//               <Link className="nav-link" to="/login">Login</Link>
//              </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/register">Register</Link>
//             </li>
//           </ul>

//       );
//    }
//    else{

//     AuthButtons=(
//       <li className="nav-item">
//       <button type='button' onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
//     </li>
//     );

//    }
//   return (

//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
//   <Link className="navbar-brand" to="#">Navbar</Link>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ms-auto">
//       <li className="nav-item active">
//         <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link" to="#">Collections</Link>
//       </li>
//        {AuthButtons}

//     </ul>

//   </div>
// </nav>
//   );
// }

// export default Navbar
