import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Plans";
import YourAccount from "./pages/Youraccount";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import VIPcontent from "./pages/VIPcontent";
import FreeContent from "./pages/FreeContent";
import AdminPainel from "./pages/AdminPainel";
import SupportPage from "./pages/SupportPage";
import RecommendContent from "./pages/RecommendContent";
import ViewStats from "./pages/Viewstats";
import ViewRequests from "./pages/ViewRequests";

const App = () => {
  const token = localStorage.getItem("Token");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {token ? <HeaderLogged /> : <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FreeContent />} />
            <Route path="/vip" element={<VIPcontent />} />
            <Route path="/admin/settings" element={<AdminPainel />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<YourAccount />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/recommend" element={<RecommendContent />} />
            <Route path="/admin/stats" element={<ViewStats />} />
            <Route path="/admin/requests" element={<ViewRequests />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
