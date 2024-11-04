import React, { useState, useEffect } from "react";
import axios from "axios";

// Tipos
type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
};

interface LinkvertiseOptions {
  whitelist: string[];
  blacklist: string[];
}

interface Linkvertise {
  (id: number, options: LinkvertiseOptions): void;
}

// Declare a interface para o objeto global
declare global {
  interface Window {
    linkvertise: Linkvertise;
  }
}

const AdminPainel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState({ name: "", link: "" });
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    fetchLinks();
    loadLinkvertiseScript();
  }, [activeTab]);

  const loadLinkvertiseScript = () => {
    const script = document.createElement("script");
    script.src = "https://publisher.linkvertise.com/cdn/linkvertise.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.linkvertise) {
        window.linkvertise(518238, {
          whitelist: [],
          blacklist: ["mega.nz", "pixeldrain.com"]
        });
      }
    };
  };

  const fetchLinks = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(`https://backend-vip.vercel.app${endpoint}`);
      if (Array.isArray(response.data)) {
        setLinks(response.data);
      } else {
        console.error("Expected an array of links but got:", response.data);
        setLinks([]);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
      setLinks([]);
    }
  };

  const handleAddLink = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`https://backend-vip.vercel.app${endpoint}`, newLink);
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
      await axios.put(`https://backend-vip.vercel.app${endpoint}/${isEditing}`, newLink);
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
      await axios.delete(`https://backend-vip.vercel.app${endpoint}/${id}`);
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Admin Panel
      </h1>
      <div className="tabs flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("free")}
          className={`px-4 py-2 ${activeTab === "free" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Free Content
        </button>
        <button
          onClick={() => setActiveTab("vip")}
          className={`px-4 py-2 ${activeTab === "vip" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          VIP Content
        </button>
      </div>

      <div className="form mb-4">
        <input
          type="text"
          placeholder="Link Name"
          value={newLink.name}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Link URL"
          value={newLink.link}
          onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
          className="p-2 border border-gray-300 rounded mb-2"
        />
        {isEditing ? (
          <button
            onClick={handleUpdateLink}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Link
          </button>
        ) : (
          <button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Link
          </button>
        )}
      </div>

      <ul className="link-list w-full max-w-xl">
        {filteredLinks.map((link) => (
          <li
            key={link.id}
            className="flex justify-between items-center p-2 bg-white shadow-sm mb-2 rounded"
          >
            <div>
              <a
                href={link.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {link.name}
              </a>
              <p className="text-sm text-gray-500">{new Date(link.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditLink(link.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPainel;
