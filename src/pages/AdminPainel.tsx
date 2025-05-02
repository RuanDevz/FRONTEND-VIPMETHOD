import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, AlertCircle } from "lucide-react";
import { LinkItem } from "./types";
import AdminFilterBar from "../components/Admin/AdminFilterBar";
import AdminLinkForm from "../components/Admin/AdminLinkForm";
import AdminLinkList from "../components/Admin/AdminLinkList";

const AdminPainel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState<LinkItem>({
    name: "",
    link: "",
    linkP: "",
    linkG: "",
    linkMV1: "",
    linkMV2: "",
    linkMV3: "",
    category: "",
    postDate: new Date().toISOString().split("T")[0],
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
      setError("Failed to fetch content. Please try again later.");
      console.error("Error fetching content:", error);
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
      resetForm();
      fetchLinks();
    } catch (error) {
      setError("Failed to add content. Please try again.");
      console.error("Error adding content:", error);
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
        linkP: linkToEdit.linkP || "",
        linkG: linkToEdit.linkG || "",
        linkMV1: linkToEdit.linkMV1 || "",
        linkMV2: linkToEdit.linkMV2 || "",
        linkMV3: linkToEdit.linkMV3 || "",
        category: linkToEdit.category,
        postDate: linkToEdit.postDate,
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
      resetForm();
      fetchLinks();
    } catch (error) {
      setError("Failed to update content. Please try again.");
      console.error("Error updating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this content?")) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`https://backend-vip.vercel.app${endpoint}/${id}`);
      fetchLinks();
    } catch (error) {
      setError("Failed to delete content. Please try again.");
      console.error("Error deleting content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewLink({
      name: "",
      link: "",
      linkP: "",
      linkG: "",
      linkMV1: "",
      linkMV2: "",
      linkMV3: "",
      category: "",
      postDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(null);
  };

  const filteredLinks = links
    .filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || link.category === selectedCategory)
    )
    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());

  const handleNavigateToUsers = () => {
    // Placeholder for navigation - would use useNavigate in a real app
    alert("This would navigate to VIP Users management");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigateToUsers}
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
          <AdminFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            categories={categories}
          />

          <AdminLinkForm 
            newLink={newLink}
            setNewLink={setNewLink}
            isLoading={isLoading}
            isEditing={isEditing}
            handleAddLink={handleAddLink}
            handleUpdateLink={handleUpdateLink}
            categories={categories}
          />

          <AdminLinkList 
            links={filteredLinks}
            isLoading={isLoading}
            handleEditLink={handleEditLink}
            handleDeleteLink={handleDeleteLink}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPainel;