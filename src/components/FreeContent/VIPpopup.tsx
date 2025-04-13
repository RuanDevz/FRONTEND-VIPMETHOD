import React from 'react';
import { X, Crown, Sparkles } from 'lucide-react';

interface VIPPopupProps {
  theme: string;
  onClose: () => void;
  onBecomeVIP: () => void;
}

export const VIPPopup: React.FC<VIPPopupProps> = ({ theme, onClose, onBecomeVIP }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100`}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
          <h2 className={`text-3xl font-bold text-center mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Unlock Premium Experience
          </h2>
          <p className={`text-center mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Upgrade to VIP for an ad-free experience and exclusive content.
          </p>
          <div className="space-y-4">
            <button
              onClick={onBecomeVIP}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <Sparkles className="w-6 h-6" />
              <span>Become VIP Now</span>
            </button>
            <button
              onClick={onClose}
              className={`w-full py-4 px-6 rounded-xl font-bold transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Continue with Ads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};