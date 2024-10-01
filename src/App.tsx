import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import PreviousContent from "./pages/PreviousContent";
import YourAccount from "./pages/Youraccount";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import VIPContentPage from "./pages/VIPcontentPage";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        {token ? <HeaderLogged /> : <Header />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="vip-content" element={<VIPContentPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/previous-content" element={<PreviousContent />} />
          <Route path="/account" element={<YourAccount />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
