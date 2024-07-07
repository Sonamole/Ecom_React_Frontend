import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home"
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";

axios.defaults.baseURL="http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path="/" element={<Home />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />

        <Route path="/admin/*" element={<MasterLayout />} />
        {/*path="/admin/*": This means any URL that starts with /admin, like /admin, /admin/settings, or /admin/users.element={<MasterLayout />}: This says to show the MasterLayout component whenever the URL matches the path. */}
        </Routes>

      </Router>

    </div>
  );
}

export default App;
