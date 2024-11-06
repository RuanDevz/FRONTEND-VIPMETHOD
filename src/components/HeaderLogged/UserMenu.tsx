import React from "react";
import { Crown, LogOut, Star, User2Icon, Settings, HelpCircle } from "lucide-react"; // Adicionando o ícone HelpCircle para Suporte
import { Link } from "react-router-dom";

interface UserMenuProps {
  name: string | null;
  isMenuOpen: boolean;
  handleMenuToggle: () => void;
  isVip: boolean;
  isAdmin: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  isMenuOpen,
  handleMenuToggle,
  isVip,
  isAdmin,
}) => {
  const Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = '/';
  };

  return (
    <nav className="relative z-50">
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
              <Link to="/account" className="px-4 py-2 hover:bg-gray-200 flex gap-2" onClick={handleMenuToggle}>
                <User2Icon />
                Your Account
              </Link>
            </li>
            {isVip && (
              <li>
                <Link to="/VIP" className="px-4 py-2 hover:bg-gray-200 flex gap-2" onClick={handleMenuToggle}>
                  <Crown />
                  Access VIP
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin" className="px-4 py-2 hover:bg-gray-200 flex gap-2" onClick={handleMenuToggle}>
                  <Settings />
                  Admin Panel
                </Link>
              </li>
            )}
            <li className="px-4 py-2 flex gap-2">
              <Star />
              Status: {isVip ? "VIP" : "Regular"}
            </li>

            {/* Adicionando o item de Suporte */}
            <li>
              <Link to="/support" className="px-4 py-2 hover:bg-gray-200 flex gap-2" onClick={handleMenuToggle}>
                <HelpCircle />
                Support
              </Link>
            </li>

            <li
              onClick={() => {
                Logout();
                handleMenuToggle(); 
              }}
              className="px-4 py-2 hover:bg-gray-200 flex gap-2 cursor-pointer"
            >
              <LogOut />
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserMenu;
