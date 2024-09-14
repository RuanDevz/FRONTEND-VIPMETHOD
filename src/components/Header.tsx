import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/'>
          <div className="text-2xl font-bold">VIP METHOD</div>
        </Link>

        <nav className="space-x-6 hidden md:flex">
          <a href="/login" className="hover:text-gray-400">
            Login
          </a>
          <a href="/register" className="hover:text-gray-400">
            Register
          </a>
        </nav>

        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

      <div className="md:hidden mt-4 space-y-2">
        <a href="/login" className="block hover:text-gray-400">
          Login
        </a>
        <a href="/register" className="block hover:text-gray-400">
          Register
        </a>
      </div>
    </header>
  );
};

export default Header;
