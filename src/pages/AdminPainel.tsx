import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  Users,
  AlertCircle,
  Loader2,
  ChevronDown,
  Filter,
  Calendar,
  Link as LinkIcon,
  Tag
} from "lucide-react";

// Types
interface LinkItem {
  id: number;
  name: string;
  link: string;
  category: string;
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState({
    name: "",
    link: "",
    category: "",
    createdAt: "",
  });
  const [categories] = useState<string[]>([
    "Asian",
    "Teen",
    "Big Tits",
    "Tiktok",
    "Instagram",
    "Banned"
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(
        `https://backend-vip.vercel.app${endpoint}`
      );
      setLinks(response.data);
    } catch (error) {
      setError("Failed to fetch links. Please try again later.");
      console.error("Error fetching links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.name || !newLink.link || !newLink.category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`https://backend-vip.vercel.app${endpoint}`, newLink);
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
      fetchLinks();
    } catch (error) {
      setError("Failed to add link. Please try again.");
      console.error("Error adding link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink({
        name: linkToEdit.name,
        link: linkToEdit.link,
        category: linkToEdit.category,
        createdAt: linkToEdit.createdAt,
      });
      setIsEditing(id);
    }
  };

  const handleUpdateLink = async () => {
    if (!newLink.name || !newLink.link || !newLink.category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.put(
        `https://backend-vip.vercel.app${endpoint}/${isEditing}`,
        newLink
      );
      setIsEditing(null);
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
      fetchLinks();
    } catch (error) {
      setError("Failed to update link. Please try again.");
      console.error("Error updating link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this link?")) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`https://backend-vip.vercel.app${endpoint}/${id}`);
      fetchLinks();
    } catch (error) {
      setError("Failed to delete link. Please try again.");
      console.error("Error deleting link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLinks = links
    .filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || link.category === selectedCategory)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin-vip-users")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            Manage VIP Users
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={() => setActiveTab(activeTab === "free" ? "vip" : "free")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "vip"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {activeTab === "vip" ? "VIP Content" : "Free Content"}
              </button>
            </div>
          </div>

          <div className="grid gap-4 mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Link Name"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={newLink.link}
                  onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={newLink.category}
                  onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={newLink.createdAt}
                  onChange={(e) => setNewLink({ ...newLink, createdAt: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={isEditing ? handleUpdateLink : handleAddLink}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-colors ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : isEditing
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isEditing ? "Update Link" : "Add New Link"}
            </motion.button>
          </div>

          <AnimatePresence>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{link.name}</h3>
                      <p className="text-gray-400 text-sm truncate">{link.link}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                          {link.category}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditLink(link.id)}
                        className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
                {filteredLinks.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No links found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;