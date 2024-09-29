import React from "react";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import PreviousContent from "./pages/PreviousContent";
import Vipaccess from "./pages/VIPContent";
import FreeContent from "./pages/FreeContent";
import YourAccount from "./pages/Youraccount";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import VIPContent from "./pages/VIPContent";

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
          <Route path="/vip-content" element={<VIPContent />} />
          <Route path="/free-content" element={<FreeContent />} />
          <Route path="/account" element={<YourAccount />} />
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
