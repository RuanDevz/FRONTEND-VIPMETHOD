import { Crown, LogOut, Star, User2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import ButtonVIP from "./ButtonVIP";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
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
    const checkVipStatus = async () => {
      if (token && email) {
        try {
          const response = await axios.get(`http://localhost:3001/auth/is-vip/${email}`);
          setIsVip(response.data.isVip);
        } catch (error) {
          console.error("Erro ao verificar status VIP:", error);
        }
      }
    };

    checkVipStatus();
  }, [token]);

  return (
    <header className="bg-black text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-bold">VIP METHOD</div>
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
                {isVip && ( // Adicionando a opção para acessar a área VIP
                  <li>
                    <Link
                      to="/vip-content"
                      className="px-4 py-2 hover:bg-gray-200 flex gap-2"
                    >
                      <Crown />
                      Access VIP
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
