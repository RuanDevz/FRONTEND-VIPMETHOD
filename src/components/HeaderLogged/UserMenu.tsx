import React from "react";
import { Crown, LogOut, Star, User2Icon, Settings, HelpCircle, BadgePlus, UserSearch, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        className="flex gap-2 items-center cursor-pointer text-white hover:text-gray-300"
        onClick={handleMenuToggle}
      >
        <User2Icon className="text-white" />
        <p className="font-semibold text-white">{name}</p> {/* Nome do usuário em branco */}
      </div>

      {/* Mostra o menu somente quando isMenuOpen for true */}
      {isMenuOpen && (
        <motion.div
          className="absolute right-0 mt-5 w-56 bg-black text-white rounded-lg shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-2">
            <li>
              <Link
                to="/account"
                className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                onClick={handleMenuToggle}
              >
                <User2Icon className="text-white" />
                <span className="text-sm font-medium">Your Account</span>
              </Link>
            </li>

            {/* Link "Recommend Content" só é mostrado para usuários VIP */}
            {isVip && (
              <li>
                <Link
                  to="/recommend"
                  className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                  onClick={handleMenuToggle}
                >
                  <BadgePlus className="text-yellow-500" />
                  <span className="text-sm font-medium">Recommend Content</span>
                </Link>
              </li>
            )}

            {/* Link "Access VIP" só é mostrado para usuários VIP */}
            {isVip && (
              <li>
                <Link
                  to="/VIP"
                  className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                  onClick={handleMenuToggle}
                >
                  <Crown className="text-yellow-400" />
                  <span className="text-sm font-medium">Access VIP</span>
                </Link>
              </li>
            )}

            {/* Links para administradores */}
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/requests"
                    className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <UserSearch className="text-blue-500" />
                    <span className="text-sm font-medium">View Requests</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/stats"
                    className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <Waypoints className="text-green-500" />
                    <span className="text-sm font-medium">View Stats</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <Settings className="text-indigo-500" />
                    <span className="text-sm font-medium">Admin Settings</span>
                  </Link>
                </li>
              </>
            )}

            {/* Status do usuário */}
            <li className="px-6 py-3 flex items-center gap-3 text-sm font-medium text-gray-400">
              <Star className="text-yellow-400" />
              <span>Status: {isVip ? "VIP" : "Regular"}</span>
            </li>

            {/* Link para Suporte */}
            <li>
              <Link
                to="/support"
                className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg transition-all duration-200"
                onClick={handleMenuToggle}
              >
                <HelpCircle className="text-gray-400" />
                <span className="text-sm font-medium">Support</span>
              </Link>
            </li>

            {/* Botão de Logout */}
            <li
              onClick={() => {
                Logout();
                handleMenuToggle();
              }}
              className="px-6 py-3 hover:bg-gray-700 flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200"
            >
              <LogOut className="text-red-500" />
              <span className="text-sm font-medium">Logout</span>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default UserMenu;
