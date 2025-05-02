import React from "react";
import { Mail, MessageSquare, Phone, ExternalLink } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ContactSection: React.FC = () => {
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
            isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
          }`}>
            <MessageSquare size={20} />
          </div>
          <h3 className="text-xl font-semibold">Contact Information</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <div className="flex items-center gap-3 mb-1">
              <Mail className={isDark ? "text-blue-400" : "text-blue-600"} size={18} />
              <h4 className="font-medium">Customer Support</h4>
            </div>
            <a 
              href="mailto:support@sevenxleaks.com" 
              className={`flex items-center gap-1 text-sm ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              https://discord.com/invite/95BKaYTPPS
              <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          
          <div className={`p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <div className="flex items-center gap-3 mb-1">
              <Mail className={isDark ? "text-blue-400" : "text-blue-600"} size={18} />
              <h4 className="font-medium">DMCA Requests</h4>
            </div>
            <a 
              href="mailto:DMCA@sevenxleaks.com" 
              className={`flex items-center gap-1 text-sm ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              DMCA@sevenxleaks.com
              <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          
          <div className={`p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <div className="flex items-center gap-3 mb-1">
              <Phone className={isDark ? "text-blue-400" : "text-blue-600"} size={18} />
              <h4 className="font-medium">Phone Support</h4>
            </div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Available for VIP members only
            </p>
          </div>
        </div>
        
        <div className={`mt-4 p-3 rounded-lg ${
          isDark ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-100"
        }`}>
          <p className={`text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            Our support team typically responds within 24 hours. VIP members receive priority support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;