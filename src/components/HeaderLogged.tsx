import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/HeaderLogged/UserMenu";
import HeaderButton from "../components/HeaderLogged/HeaderButton";

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
        const vipResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/is-vip/${email}`);
        setIsVip(vipResponse.data.isVip);

        const adminResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/is-admin/${email}`);
        setIsAdmin(adminResponse.data.isAdmin);
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    }
  };

  //

  checkUserStatus();
}, [token, email]);

  return (
    <header className="bg-black text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-bold">VIP METHOD</div>
        </Link>
        <HeaderButton />
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
