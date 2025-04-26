import React, { useState } from "react";
import { Heart, Search, Filter, X } from "lucide-react";
import { FavoriteContent } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";

interface FavoritesSectionProps {
  favorites: FavoriteContent[];
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ favorites }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredFavorites = favorites.filter(favorite => 
    favorite.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            isDark ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-600"
          }`}>
            <Heart size={20} />
          </div>
          <h3 className="text-xl font-semibold">Favorite Content</h3>
        </div>
      </div>
      
      <div className="p-6">
        {favorites.length > 0 && (
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className={isDark ? "text-gray-500" : "text-gray-400"} />
            </div>
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-10 py-2 rounded-lg ${
                isDark 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
              } border focus:outline-none focus:ring-2 ${
                isDark ? "focus:ring-pink-500/40" : "focus:ring-pink-500/30"
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={16} className={isDark ? "text-gray-500" : "text-gray-400"} />
              </button>
            )}
          </div>
        )}
        
        {filteredFavorites.length > 0 ? (
          <div className="grid gap-2">
            {filteredFavorites.map((content) => (
              <div
                key={content.id}
                className={`p-3 rounded-lg flex items-center justify-between group transition-all duration-200 ${
                  isDark 
                    ? "bg-gray-700/50 hover:bg-gray-700" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart 
                    size={16} 
                    className={`transition-colors duration-200 ${
                      isDark ? "text-pink-400 group-hover:text-pink-300" : "text-pink-600 group-hover:text-pink-700"
                    }`} 
                    fill="currentColor"
                  />
                  <span className="font-medium">{content.title}</span>
                </div>
                <button className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full ${
                  isDark 
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-300" 
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }`}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-8 rounded-lg border ${
            isDark 
              ? "border-gray-700 bg-gray-800/30" 
              : "border-gray-200 bg-gray-50"
          } flex flex-col items-center justify-center text-center`}>
            <Heart 
              size={48} 
              className={`mb-3 ${isDark ? "text-gray-600" : "text-gray-400"}`} 
            />
            <p className="text-lg font-medium mb-1">No favorites yet</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Content you mark as favorite will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;