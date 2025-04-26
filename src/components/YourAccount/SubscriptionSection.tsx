import React from "react";
import { Link } from "react-router-dom";
import { Crown, Calendar, CheckCircle, XCircle, Sparkles, AlertTriangle } from "lucide-react";
import { Userdatatypes } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";

interface SubscriptionSectionProps {
  userData: Userdatatypes;
  isSubscriptionActive: boolean;
  isCanceling: boolean;
  setShowCancelModal: (show: boolean) => void;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  userData,
  isSubscriptionActive,
  isCanceling,
  setShowCancelModal,
}) => {
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
            userData.isVip 
              ? isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-600"
              : isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
          }`}>
            <Crown size={20} />
          </div>
          <h3 className="text-xl font-semibold">Subscription Management</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <div className={`mt-1 ${
              userData.isVip 
                ? isDark ? "text-amber-400" : "text-amber-600"
                : isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              {userData.isVip ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div>
              <h4 className="font-medium mb-1">Current Plan</h4>
              <p className={`text-lg font-semibold ${
                userData.isVip
                  ? isDark ? "text-amber-400" : "text-amber-600"
                  : isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                {userData.isVip ? "VIP Subscription" : "Free Account"}
              </p>
              {userData.isVip && (
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Full access to all premium content
                </p>
              )}
            </div>
          </div>
          
          {userData.isVip && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              isDark ? "bg-gray-700/50" : "bg-gray-100"
            }`}>
              <div className={`mt-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="font-medium mb-1">Next Billing Date</h4>
                <p className="text-lg font-semibold">
                  {new Date(userData.vipExpirationDate).toLocaleDateString()}
                </p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {isCanceling ? "Subscription will not renew" : "Auto-renewal enabled"}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {isCanceling && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-100"
          }`}>
            <div className={isDark ? "text-amber-400" : "text-amber-600"}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                Subscription Canceled
              </p>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                You will retain VIP access until{" "}
                <span className="font-medium">
                  {new Date(userData.vipExpirationDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        )}
        
        {userData.isVip && !isSubscriptionActive && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-100"
          }`}>
            <div className={isDark ? "text-amber-400" : "text-amber-600"}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                Subscription Expired
              </p>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Your VIP subscription has expired. You can renew it by upgrading your plan.
              </p>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3">
          <Link to="/plans">
            <button className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
              isDark
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white" 
                : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white"
            }`}>
              <Sparkles size={16} />
              {userData.isVip ? "Change Plan" : "Upgrade to VIP"}
            </button>
          </Link>
          
          {userData.isVip && isSubscriptionActive && !isCanceling && (
            <button
              onClick={() => setShowCancelModal(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                isDark
                  ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" 
                  : "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
              }`}
            >
              <XCircle size={16} />
              Cancel Subscription
            </button>
          )}
          
          {isCanceling && (
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                isDark
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20" 
                  : "bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100"
              }`}
            >
              <CheckCircle size={16} />
              Reactivate Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;