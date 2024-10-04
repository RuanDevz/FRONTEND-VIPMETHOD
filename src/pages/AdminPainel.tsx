import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para o termo de pesquisa
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

  // Filtrando links com base no termo de pesquisa
  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-end mb-4">
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/4" // Barra de pesquisa menor (1/4 da largura total)
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Admin Panel
      </h1>

      <div className="tabs flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("free")}
          className={`p-2 ${activeTab === "free" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Free Content
        </button>
        <button
          onClick={() => setActiveTab("vip")}
          className={`p-2 ${activeTab === "vip" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          VIP Content
        </button>
      </div>

      <div className="link-form mb-6">
        <input
          type="text"
          placeholder="Link Name"
          value={newLink.name}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Link URL"
          value={newLink.link}
          onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        {isEditing ? (
          <button
            onClick={handleUpdateLink}
            className="p-2 bg-green-500 text-white rounded"
          >
            Update Link
          </button>
        ) : (
          <button
            onClick={handleAddLink}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Link
          </button>
        )}
      </div>

      <div className="link-list w-full max-w-3xl">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <div
              key={link.id}
              className="p-4 bg-white rounded shadow mb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{link.name}</p>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link.link}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditLink(link.id)}
                  className="p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No links available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPainel;
