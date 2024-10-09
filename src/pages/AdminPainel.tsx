import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "../components/AdminPainel/Tabs";
import SearchBar from "../components/SearchBar";
import LinkForm from "../components/AdminPainel/LinkForm";
import LinkList from "../components/AdminPainel/LinkList";

// Types
type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
};

const AdminPainel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState({ name: "", link: "" });
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  const fetchLinks = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(
        `http://localhost:3001${endpoint}`
      );
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleAddLink = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`http://localhost:3001${endpoint}`, newLink);
      setNewLink({ name: "", link: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink({ name: linkToEdit.name, link: linkToEdit.link });
      setIsEditing(id);
    }
  };

  const handleUpdateLink = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.put(`http://localhost:3001${endpoint}/${isEditing}`, newLink);
      setIsEditing(null);
      setNewLink({ name: "", link: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`http://localhost:3001${endpoint}/${id}`);
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  // Filter links based on search term
  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Admin Panel
      </h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <LinkForm
        newLink={newLink}
        setNewLink={setNewLink}
        isEditing={isEditing}
        handleAddLink={handleAddLink}
        handleUpdateLink={handleUpdateLink}
      />
      <LinkList
        links={filteredLinks}
        handleEditLink={handleEditLink}
        handleDeleteLink={handleDeleteLink}
      />
    </div>
  );
};

export default AdminPainel;
