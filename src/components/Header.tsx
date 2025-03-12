import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to="/">
          <div className="text-3xl font-extrabold text-blue-500 hover:text-blue-400 transition duration-300">
           SEVENXLEAKS
          </div>
        </Link>
        <div>
          <Link
            to="/plans"
            className="text-sm inline-block py-2 px-4 lg:text-lg font-semibold text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-pulse-brightness"
          >
            Become Vip
          </Link>
        </div>
        <nav className="space-x-8 hidden md:flex">
          <Link
            to="/login"
            className="text-lg font-semibold hover:text-gray-400 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-lg font-semibold hover:text-gray-400 transition duration-300"
          >
            Register
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none transform transition-transform duration-300"
            onClick={toggleMenu}
            style={{ transform: isMenuOpen ? "rotate(90deg)" : "rotate(0)" }}
          >
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 space-y-2 transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <Link
          to="/login"
          className="block py-2 text-lg font-semibold text-center hover:text-gray-400 transition duration-300"
          onClick={toggleMenu}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block py-2 text-lg font-semibold text-center hover:text-gray-400 transition duration-300"
          onClick={toggleMenu}
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
