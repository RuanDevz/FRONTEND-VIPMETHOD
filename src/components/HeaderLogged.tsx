import { LogOut, Star, User2Icon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderLogged = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isVip = true; 

  const name = localStorage.getItem("name")
  const email = localStorage.getItem("email")


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = () => {
    localStorage.removeItem("Token");
    window.location.reload();
  };

  return (
    <header className="bg-black text-white p-4">
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
                    className=" px-4 py-2 hover:bg-gray-200 flex gap-2"
                  >
                    <User2Icon />
                    Your Account
                  </Link>
                </li>
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
