import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path="/" element={<Home />} />
        <Route path="/admin/*" element={<MasterLayout />} />

            {/* <Route path="/admin" name="Admin" render={(props)}=><MasterLayout(...props) />}/> */}

        </Routes>

      </Router>

    </div>
  );
}

export default App;
