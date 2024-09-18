import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo e Direitos Autorais */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">VIP Method</h2>
          <p className="text-gray-400">© {new Date().getFullYear()} VIP Method. All rights reserved.</p>
        </div>

        {/* Links de navegação */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
        </div>

        {/* Redes Sociais */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
