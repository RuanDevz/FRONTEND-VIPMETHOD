import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";  // Importando o axios
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
import AdminVipUsers from "./pages/AdminVipUsers"; // Importando a página AdminVipUsers
import SupportPage from "./pages/SupportPage";
import RecommendContent from "./pages/RecommendContent";
import ViewStats from "./pages/Viewstats";
import ViewRequests from "./pages/ViewRequests";
import AccessDenied from "./pages/AccessDenied"; // Importando a página de acesso negado

interface User {
  isAdmin: boolean;
  isVip: boolean;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const [hasPermission, setHasPermission] = useState({ vip: false, admin: false });
  const token = localStorage.getItem("Token");

  useEffect(() => {
    // Verificando permissões via API
    const checkPermissions = async () => {
      if (!token) {
        setHasPermission({ vip: false, admin: false });
        return;
      }

      try {
        // Fazendo a requisição para verificar as permissões do usuário
        const response = await axios.get(`https://backend-vip.vercel.app/auth/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { isAdmin, isVip } = response.data;

        setHasPermission({ vip: isVip, admin: isAdmin });
      } catch (error) {
        console.error("Erro ao verificar permissões:", error);
        setHasPermission({ vip: false, admin: false });
      }
    };

    // Chama a função para verificar as permissões
    checkPermissions();
  }, [token]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {token ? <HeaderLogged /> : <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FreeContent />} />
            
            {/* Rota VIP - apenas usuários VIP podem acessar */}
            <Route 
              path="/vip" 
              element={
                hasPermission.vip ? (
                  <VIPcontent />
                ) : (
                  <AccessDenied message="You are not a VIP to access this page." />
                )
              } 
            />
            
            {/* Rota Admin - apenas administradores podem acessar */}
            <Route 
              path="/admin/settings" 
              element={
                hasPermission.admin ? (
                  <AdminPainel />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin/stats" 
              element={
                hasPermission.admin ? (
                  <ViewStats />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin/requests" 
              element={
                hasPermission.admin ? (
                  <ViewRequests />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="admin-vip-users" 
              element={
                hasPermission.admin ? (
                  <AdminVipUsers />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            
            {/* Outras rotas acessíveis para todos */}
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;