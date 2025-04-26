import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Sparkles, Flame, Disc as Discord, Menu, X } from 'lucide-react';
import UserMenu from "../components/HeaderLogged/UserMenu";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; // Certifique-se de importar o ThemeToggle corretamente

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700/50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <Flame className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-all duration-300 transform group-hover:scale-110" />
          <div className="ml-2 text-xl md:text-2xl font-black bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:via-blue-300 hover:to-blue-400 transition duration-300">
            SEVENXLEAKS
          </div>
        </Link>
        <div className="flex xl:hidden">
          <ThemeToggle/>
        </div>
  
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Premium Banner (Botão ajustado) */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-center flex items-center space-x-3 border border-gray-700/50 shadow-xl">
            <button
              onClick={() => window.open("https://sevenxhub.com", "_blank")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
            >
              WATCH HERE PREMIUM VIDEOS FOR FREE
            </button>
          </div>
  
          {/* VIP/Discord Buttons */}
          <div className="flex items-center space-x-4">
            {isVip ? (
              <Link
                to="/vip"
                className="relative group overflow-hidden px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>VIP Access</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
              </Link>
            ) : (
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
            )}
  
            <a
              href="https://discord.com/invite/95BKaYTPPS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-bold bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Discord className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>
  
          {/* User Menu */}
          <UserMenu
            name={name}
            isMenuOpen={isMenuOpen}
            handleMenuToggle={handleMenuToggle}
            isVip={isVip}
            isAdmin={isAdmin}
          />
  
          {/* ThemeToggle aligned to the right */}
          <ThemeToggle />
        </div>
  
        {/* Mobile Menu Button */}
        <button
          onClick={handleMobileMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
  
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "500px" }}  // Ajuste para um valor fixo de maxHeight
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Premium Banner */}
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm px-4 py-3 rounded-lg text-center flex items-center justify-center space-x-3 border border-gray-700/50 shadow-xl">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                <a
                  href="https://sevexhub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-300 font-semibold"
                >
                  WATCH HERE PREMIUM VIDEOS FOR FREE
                </a>
              </div>
  
              {/* Mobile VIP Button */}
              {isVip ? (
                <Link
                  to="/vip"
                  className="relative group overflow-hidden px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 transition-all duration-300 text-center"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>VIP Access</span>
                  </span>
                </Link>
              ) : (
                <Link
                  to="/plans"
                  className="px-4 py-3 rounded-lg font-bold bg-black text-white border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-900 transition-all duration-300 text-center"
                >
sssss                </Link>
              )}
  
              {/* Mobile Discord Button */}
              <a
                href="https://discord.com/invite/95BKaYTPPS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-bold bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300"
              >
                <Discord className="w-5 h-5" />
                <span>Join Discord</span>
              </a>
  
              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-700">
                <UserMenu
                  name={name}
                  isMenuOpen={true}
                  handleMenuToggle={() => {}}
                  isVip={isVip}
                  isAdmin={isAdmin}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </header>
  
  );
};

export default HeaderLogged;
