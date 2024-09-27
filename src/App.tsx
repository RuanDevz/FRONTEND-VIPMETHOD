import React from "react";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import PreviousContent from "./pages/PreviousContent";
import Vipaccess from "./pages/Vipaccess";
import FreeContent from "./pages/FreeContent";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        {token ? <HeaderLogged /> : <Header />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/previous-content" element={<PreviousContent />} />
          <Route path="/vip-access" element={<Vipaccess />} />
          <Route path="/free-content" element={<FreeContent />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
