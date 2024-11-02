import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-3xl font-bold">VIP METHOD</div>
        </Link>

        <nav className="space-x-8 hidden md:flex">
          <Link to="/login" className="hover:text-gray-400 text-lg">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-400 text-lg">
            Register
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden mt-4 space-y-2 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <Link to="/login" className="block hover:text-gray-400 text-lg" onClick={toggleMenu}>
          Login
        </Link>
        <Link to="/register" className="block hover:text-gray-400 text-lg" onClick={toggleMenu}>
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
