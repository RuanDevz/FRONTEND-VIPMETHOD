import { Crown, LogOut, Star, User2Icon, Settings } from "lucide-react"; // Adiciona o ícone de Settings
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Novo estado para admin
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.reload();
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (token && email) {
        try {
          // Verifica se o usuário é VIP
          const vipResponse = await axios.get(`http://localhost:3001/auth/is-vip/${email}`);
          setIsVip(vipResponse.data.isVip);

          // Verifica se o usuário é admin
          const adminResponse = await axios.get(`http://localhost:3001/auth/is-admin/${email}`);
          setIsAdmin(adminResponse.data.isAdmin);
        } catch (error) {
          console.error("Erro ao verificar status do usuário:", error);
        }
      }
    };

    checkUserStatus();
  }, [token, email]);

  return (
    <header className="bg-black text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-bold">VIP METHOD</div>
        </Link>
        <Link to='/plans'>
          <button className="py-3 px-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Buy VIP Access
          </button>
        </Link>
        <nav className="relative">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={handleMenuToggle}
          >
            <User2Icon />
            <p>{name}</p>
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-white text-black rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <Link
                    to="/account"
                    className="px-4 py-2 hover:bg-gray-200 flex gap-2"
                  >
                    <User2Icon />
                    Your Account
                  </Link>
                </li>
                {isVip && (
                  <li>
                    <Link
                      to="/VIP"
                      className="px-4 py-2 hover:bg-gray-200 flex gap-2"
                    >
                      <Crown />
                      Access VIP
                    </Link>
                  </li>
                )}
                {isAdmin && ( // Verifica se o usuário é admin
                  <li>
                    <Link
                      to="/admin"
                      className="px-4 py-2 hover:bg-gray-200 flex gap-2"
                    >
                      <Settings />
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="px-4 py-2 flex gap-2">
                  <Star />
                  Status: {isVip ? "VIP" : "Regular"}
                </li>
                <li
                  onClick={Logout}
                  className="px-4 py-2 hover:bg-gray-200 flex gap-2 cursor-pointer"
                >
                  <LogOut />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderLogged;
