import React from "react";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

const App = () => {
  const token = localStorage.getItem("Token");

  return (
    <Router>
      <div>
        {token ? <HeaderLogged /> : <Header />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
