import React from "react";
import { BrowserRouter as Router,Routes,Route,Redirect } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home"
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";

axios.defaults.baseURL="http://127.0.0.1:8000/";//This line sets the base URL for all Axios requests. axios.defaults.baseURL is a property provided by Axios that allows you to set a default base URL for all HTTP requests. In this case, http://127.0.0.1:8000/ is set as the base URL, which is typically the address where your Laravel backend server is running locally during development (127.0.0.1 refers to the localhost).
axios.defaults.headers.post['Content-Type']='application/json';//Here, you are setting the Content-Type header for POST requests. Axios allows you to set default headers for different types of HTTP requests (post in this case). The Content-Type header specifies the media type of the resource being sent to the server. In this case, application/json indicates that the content being sent is in JSON format.
axios.defaults.headers.post['Accept']='application/json';//: This line sets the Accept header for POST requests. The Accept header informs the server about the types of content that the client is able to understand. Here, it specifies that the client (axios in this case) expects JSON in response to its POST requests.
axios.defaults.withCredentials = true;//By setting axios.defaults.withCredentials to true, you are enabling credentials (like cookies, authorization headers) to be sent with cross-origin requests. This is important when your frontend (possibly running on a different domain or port) needs to make requests to your backend API (http://127.0.0.1:8000/ in this case) and wants to include credentials for authentication or session handling purposes.

// axios.interceptors.request.user(function(config){
//   const token =localStorage.getItem('auth_token');
//   config.headers.Authorization=token ? `Bearer ${token}`:'';
//   return config;
// });

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path="/" element={<Home />} />

         <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />

        {/* <Route  path="/login">
          {localStorage.getItem('auth_token') ? <Redirect to ='/' />:<Login/>}
        </Route>

        <Route  path="/register">
          {localStorage.getItem('auth_token') ? <Redirect to ='/' />:<Register/>}
        </Route> */}

        <Route path="/admin/*" element={<MasterLayout />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
