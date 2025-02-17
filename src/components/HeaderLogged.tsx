import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/HeaderLogged/UserMenu";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (token && email) {
        try {
          const vipResponse = await axios.get(
            `https://backend-vip.vercel.app/auth/is-vip/${email}`
          );
          setIsVip(vipResponse.data.isVip);

          const adminResponse = await axios.get(
            `https://backend-vip.vercel.app/auth/is-admin/${email}`
          );
          setIsAdmin(adminResponse.data.isAdmin);
        } catch (error) {
          console.error("Error checking user status:", error);
        }
      }
    };

    checkUserStatus();
  }, [token, email]);

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-base lg:text-2xl font-extrabold text-blue-500 hover:text-blue-400 transition duration-300">
            SEVENXLEAKS
          </div>
        </Link>

        <div className="ml-4">
          {isVip ? (
            <Link
              to="/vip"
              className="text-sm inline-block py-2 px-4 lg:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-shine"
            >
              VIP Access
            </Link>
          ) : (
            <Link
              to="/plans"
              className=" text-sm inline-block py-2 px-4 lg:text-lg font-semibold bg-black text-white rounded-lg border-2 border-gray-700 hover:border-blue-500 transition duration-300 ease-in-out"
            >
              Become VIP
            </Link>
          )}
        </div>
        <UserMenu
          name={name}
          isMenuOpen={isMenuOpen}
          handleMenuToggle={handleMenuToggle}
          isVip={isVip}
          isAdmin={isAdmin}
        />
      </div>
    </header>
  );
};

export default HeaderLogged;
