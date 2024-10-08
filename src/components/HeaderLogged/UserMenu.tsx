import React from "react";
import { Crown, LogOut, Star, User2Icon, Settings } from "lucide-react";
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
    window.location.reload();
  };

  return (
    <nav className="relative">
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
              <Link to="/account" className="px-4 py-2 hover:bg-gray-200 flex gap-2">
                <User2Icon />
                Your Account
              </Link>
            </li>
            {isVip && (
              <li>
                <Link to="/VIP" className="px-4 py-2 hover:bg-gray-200 flex gap-2">
                  <Crown />
                  Access VIP
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin" className="px-4 py-2 hover:bg-gray-200 flex gap-2">
                  <Settings />
                  Admin Panel
                </Link>
              </li>
            )}
            <li className="px-4 py-2 flex gap-2">
              <Star />
              Status: {isVip ? "VIP" : "Regular"}
            </li>
            <li
              onClick={Logout}
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
