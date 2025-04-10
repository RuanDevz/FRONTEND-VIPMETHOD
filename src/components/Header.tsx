import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Menu } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700/50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to="/" className="group flex items-center">
          <Flame className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-all duration-300 transform group-hover:scale-110" />
          <div className="ml-2 text-xl md:text-2xl font-black bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:via-blue-300 hover:to-blue-400 transition duration-300">
            SEVENXLEAKS
          </div>
        </Link>




        {/* Centered Theme Toggle for Mobile */}
        <div className="md:hidden flex justify-center flex-grow">
          <ThemeToggle />
        </div>

        {/* VIP Button */}
        <Link
          to="/plans"
          className="relative group overflow-hidden px-6 py-2 rounded-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 hidden sm:block"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Become VIP</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-lg font-semibold text-gray-300 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-lg font-semibold px-6 py-2 rounded-lg bg-black text-white border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Register
          </Link>
        </nav>


        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none transform transition-all duration-300 hover:text-blue-400"
          onClick={toggleMenu}
        >
          <Menu className={`w-8 h-8 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 border-t border-gray-700/50' : 'max-h-0'} overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-2 space-y-4">
          <div className="flex items-center justify-center space-x-3 py-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Join VIP for exclusive content</span>
          </div>
          <Link
            to="/login"
            className="block py-2 text-lg font-semibold text-center text-gray-300 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block py-2 text-lg font-semibold text-center text-gray-300 hover:text-white transition duration-300 mb-2"
            onClick={toggleMenu}
          >
            Register
          </Link>


          {/* Theme Toggle in Mobile Menu (Centered) */}
          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
