import { Link } from "react-router-dom";
import { Flame, Sparkles, Menu } from 'lucide-react';
const Footer = () => {

  
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
        <Link to="/" className="group flex items-center">
          <Flame className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-all duration-300 transform group-hover:scale-110" />
          <div className="ml-2 text-2xl font-black bg-gradient-to-r from-blue-500 via-blue-400 pb-3 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:via-blue-300 hover:to-blue-400 transition duration-300">
            SEVENXLEAKS
          </div>
        </Link>
          <p className="text-gray-400">© {new Date().getFullYear()} SEVENXLEAKS. All rights reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-400">Contact: <a href="mailto:dmca@sevenxleaks.com" className="text-blue-400 hover:underline">dmca@sevenxleaks.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;