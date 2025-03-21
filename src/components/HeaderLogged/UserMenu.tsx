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
        className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-all duration-200"
        onClick={handleMenuToggle}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <User2Icon className="w-5 h-5 text-white" />
        </div>
        <p className="font-medium text-gray-200">{name}</p>
      </div>

      {isMenuOpen && (
        <motion.div
          className="absolute right-0 mt-4 w-64 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User2Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-200">{name}</p>
                <p className="text-sm text-gray-400">
                  Status: {isVip ? (
                    <span className="text-yellow-400 font-medium">VIP</span>
                  ) : (
                    <span className="text-gray-400">Regular</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <ul className="py-2">
            <li>
              <Link
                to="/account"
                className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                onClick={handleMenuToggle}
              >
                <User2Icon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">Your Account</span>
              </Link>
            </li>

            {isVip && (
              <>
                <li>
                  <Link
                    to="/recommend"
                    className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <BadgePlus className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-200">Recommend Content</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/VIP"
                    className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200 group"
                    onClick={handleMenuToggle}
                  >
                    <div className="relative">
                      <Crown className="w-5 h-5 text-yellow-400 group-hover:animate-pulse" />
                      <div className="absolute inset-0 bg-yellow-400/20 blur-sm rounded-full animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-gray-200">Access VIP</span>
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li className="pt-2 pb-1 px-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Controls</div>
                </li>
                <li>
                  <Link
                    to="/admin/requests"
                    className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <UserSearch className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">View Requests</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/stats"
                    className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <Waypoints className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-200">View Stats</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                    onClick={handleMenuToggle}
                  >
                    <Settings className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-medium text-gray-200">Admin Settings</span>
                  </Link>
                </li>
              </>
            )}

            <li className="border-t border-gray-700/50 mt-2">
              <Link
                to="https://discord.gg/95BKaYTPPS"
                className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 transition-all duration-200"
                onClick={handleMenuToggle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Support</span>
              </Link>
            </li>

            <li
              onClick={() => {
                Logout();
                handleMenuToggle();
              }}
              className="px-4 py-3 hover:bg-gray-800/50 flex items-center gap-3 cursor-pointer transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              <span className="text-sm font-medium text-gray-200 group-hover:text-gray-100">Logout</span>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default UserMenu;