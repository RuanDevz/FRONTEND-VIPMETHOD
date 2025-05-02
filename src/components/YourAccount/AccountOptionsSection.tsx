import React from "react";
import { Settings, Download, Trash2, LogOut, Shield, AlertTriangle } from "lucide-react";
import { Userdatatypes } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";

interface AccountOptionsSectionProps {
  userData: Userdatatypes;
}

const AccountOptionsSection: React.FC<AccountOptionsSectionProps> = ({ userData }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`overflow-hidden rounded-2xl transition-colors duration-300 ${
      isDark 
        ? "bg-gray-800/60 border border-gray-700" 
        : "bg-white border border-gray-200"
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
          }`}>
            <Settings size={20} />
          </div>
          <h3 className="text-xl font-semibold">Account Options</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-100"
        }`}>
          <AlertTriangle className={isDark ? "text-amber-400" : "text-amber-600"} size={20} />
          <div>
            <p className={`font-medium ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              System Maintenance
            </p>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Some features are currently under maintenance and will be available soon:
            </p>
            <ul className={`text-sm mt-2 space-y-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <li>• Profile image upload</li>
              <li>• Banner image customization</li>
              <li>• Edit profile information</li>
              <li>• New content alerts</li>
              <li>• Change password functionality</li>
              <li>• Automatic subscription cancellation</li>
              <li>• Logout process optimization</li>
              <li>• Data export functionality</li>
              <li>• Account deletion process</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {/* Security */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className={isDark ? "text-purple-400" : "text-purple-600"} />
              <h4 className="font-medium">Security</h4>
            </div>
            
            <button className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 ${
              isDark 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}>
              Change password
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings size={18} className={isDark ? "text-purple-400" : "text-purple-600"} />
              <h4 className="font-medium">More Options</h4>
            </div>

            <button className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
              isDark 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}>
              <Download size={16} />
              <span>Download my data</span>
            </button>

            <button className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
              isDark 
                ? "text-red-400 hover:bg-red-500/10" 
                : "text-red-600 hover:bg-red-50"
            }`}>
              <Trash2 size={16} />
              <span>Delete account</span>
            </button>

            <button className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
              isDark 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}>
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOptionsSection;
