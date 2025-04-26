import React from "react";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { Userdatatypes } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";

interface UserProfileSectionProps {
  userData: Userdatatypes;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ userData }) => {
  const { theme } = useTheme();
  
  const isDark = theme === "dark";
  
  return (
    <div className={`overflow-hidden rounded-2xl transition-all duration-300 ${
      isDark 
        ? "bg-gray-800/60 border border-gray-700 shadow-lg shadow-indigo-500/10" 
        : "bg-white border border-gray-200 shadow-lg shadow-indigo-500/5"
    }`}>
      <div className={`w-full h-32 ${isDark ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30" : "bg-gradient-to-r from-indigo-100 to-purple-100"}`}></div>
      
      <div className="p-6 -mt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className={`relative rounded-full w-24 h-24 overflow-hidden border-4 ${
            isDark ? "border-gray-800" : "border-white"
          }`}>
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt={userData.username} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <User className={`w-12 h-12 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              </div>
            )}
            
            <button className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isDark 
                ? "bg-indigo-500 hover:bg-indigo-600" 
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white transition-colors duration-200`}>
              <Edit className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 pt-2 sm:pt-0">
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {userData.username}
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Member since {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-white" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}>
            Edit Profile
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <Mail className={isDark ? "text-indigo-400" : "text-indigo-600"} size={18} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email Address</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {userData.email || "No email provided"}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <Calendar className={isDark ? "text-indigo-400" : "text-indigo-600"} size={18} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Account Status</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {userData.isVip ? "VIP Member" : "Free Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;