import React, { useState } from "react";
import { XCircle, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Userdatatypes } from "../../../types/Userdatatypes";

interface CancelSubscriptionModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  expirationDate: number;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  onCancel,
  onConfirm,
  expirationDate,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [userData, setUserData] = useState<Userdatatypes | null>(null);



  const cancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) {
      alert("You have already canceled your subscription");
      return;
    }
  
    const token = localStorage.getItem("Token");
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error");
      }
  
      const result = await response.json();
    } catch (error) {
      alert("Erro ao cancelar: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div 
        className={`w-full max-w-md mx-4 overflow-hidden rounded-2xl transition-colors duration-300 ${
          isDark 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-200"
        }`}
      >
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"
            }`}>
              <XCircle size={20} />
            </div>
            <h3 className="text-xl font-semibold">Cancel Subscription</h3>
          </div>
          
          <button 
            onClick={onCancel}
            className={`p-2 rounded-full ${
              isDark 
                ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Are you sure you want to cancel your VIP subscription? You'll lose access to exclusive content and benefits once your current subscription period ends.
          </p>
          
          <div className={`mb-6 p-4 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your VIP access will remain active until:
            </p>
            <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {new Date(expirationDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className={`mb-6 p-4 rounded-lg ${
            isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-100"
          }`}>
            <p className={`text-sm ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              You can reactivate your subscription at any time before the expiration date to maintain uninterrupted access.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-white" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Keep My VIP
            </button>
            
            <button
              onClick={cancelSubscription}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDark
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
                  : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              }`}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;