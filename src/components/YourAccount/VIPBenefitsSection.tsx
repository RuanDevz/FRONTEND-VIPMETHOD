import React from "react";
import { Crown, CheckCircle, Clock, Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface VIPBenefitsSectionProps {
  vipExpirationDate: number;
  calculateDaysLeft: (expirationDate: number) => number;
}

const VIPBenefitsSection: React.FC<VIPBenefitsSectionProps> = ({
  vipExpirationDate,
  calculateDaysLeft,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const daysLeft = calculateDaysLeft(vipExpirationDate);
  
  const benefits = [
    "Unlimited access to premium content",
    "Early access to new releases",
    "Ad-free experience",
    "Priority support",
    "Exclusive downloads",
    "HD quality streaming"
  ];
  
  return (
    <div className={`overflow-hidden rounded-2xl transition-all duration-300 ${
      isDark 
        ? "bg-gray-800/60 border border-gray-700" 
        : "bg-white border border-gray-200"
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-600"
          }`}>
            <Star size={20} />
          </div>
          <h3 className="text-xl font-semibold">VIP Benefits</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-100"
        }`}>
          <Clock className={isDark ? "text-amber-400" : "text-amber-600"} size={18} />
          <div>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Time remaining:
            </p>
            <p className={`text-lg font-semibold ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              {daysLeft} days left
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <CheckCircle 
                size={16} 
                className={isDark ? "text-amber-400" : "text-amber-600"} 
              />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VIPBenefitsSection;