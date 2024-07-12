import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute"
import Page403 from "./components/error/Page403";
import Page404 from "./components/error/Page404";
import PublicRoute from "./PublicRoute";

// Axios configuration
axios.defaults.baseURL = "http://127.0.0.1:8000/"; // This line sets the base URL for all Axios requests. axios.defaults.baseURL is a property provided by Axios that allows you to set a default base URL for all HTTP requests. In this case, http://127.0.0.1:8000/ is set as the base URL, which is typically the address where your Laravel backend server is running locally during development (127.0.0.1 refers to the localhost).
axios.defaults.headers.post['Content-Type'] = 'application/json'; // Here, you are setting the Content-Type header for POST requests. Axios allows you to set default headers for different types of HTTP requests (post in this case). The Content-Type header specifies the media type of the resource being sent to the server. In this case, application/json indicates that the content being sent is in JSON format.
axios.defaults.headers.post['Accept'] = 'application/json'; // This line sets the Accept header for POST requests. The Accept header informs the server about the types of content that the client is able to understand. Here, it specifies that the client (axios in this case) expects JSON in response to its POST requests.
axios.defaults.withCredentials = true; // By setting axios.defaults.withCredentials to true, you are enabling credentials (like cookies, authorization headers) to be sent with cross-origin requests. This is important when your frontend (possibly running on a different domain or port) needs to make requests to your backend API (http://127.0.0.1:8000/ in this case) and wants to include credentials for authentication or session handling purposes.

axios.interceptors.request.use(function (config) {//This line adds a function that will run every time you make a request with Axios
  const token = localStorage.getItem('auth_token'); //get the auth_token from the browser's local storage.
  config.headers.Authorization = token ? `Bearer ${token}` : ''; //config.headers: This is where you can set headers for the HTTP request.Set the Authorization header to Bearer followed by the token. For example, if the token is abc123, it becomes Bearer abc123.
  return config; //This line sends the modified request settings back to Axios so it can continue with the request.
});

//A Bearer Token is a type of access token. The term "Bearer" means "give access to the bearer of this token." Essentially, whoever has this token can use it to access resources on the server.
//This tells the server that the request is being made by someone who has the token, and the server can then verify if the token is valid and if the bearer has the necessary permissions.



function App() {
  const isAuthenticated = !!localStorage.getItem('auth_token'); //retrieves the value associated with the key 'auth_token' from the browser's local storage.if exists, it returns the token value (usually a string).

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminPrivateRoute />}/>
          <Route path="*" name="Home" element={<PublicRoute/>}/>
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />

           {/*Any path that starts with /admin/.... followed by anything will match this route.(Eg:localhost:3000/admin/dashboard,localhost:3000/admin/profile ).it will go to AdminPrivateRoute.js */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
































