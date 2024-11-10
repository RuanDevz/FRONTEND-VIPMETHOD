import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from '@react-spring/web';
import { EditIcon, TrashIcon, SearchIcon } from "lucide-react"; // Icons from Lucide React

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
  const [newLink, setNewLink] = useState({ name: "", link: "", createdAt: "" });
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  // Função para buscar os links
  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`);
      setLinks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching links:", error);
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para adicionar um link
  const handleAddLink = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, newLink);
      setNewLink({ name: "", link: "", createdAt: "" }); 
      fetchLinks();
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para editar um link
  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink({ name: linkToEdit.name, link: linkToEdit.link, createdAt: linkToEdit.createdAt });
      setIsEditing(id);
    }
  };

  // Função para atualizar um link
  const handleUpdateLink = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}${endpoint}/${isEditing}`, newLink);
      setIsEditing(null);
      setNewLink({ name: "", link: "", createdAt: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error updating link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar um link
  const handleDeleteLink = async (id: number) => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${endpoint}/${id}`);
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtra os links pelo nome
  const filteredLinks = links
    .filter((link) => link.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Animação dos botões
  const buttonAnimation = useSpring({
    opacity: isLoading ? 0.6 : 1,
    transform: isLoading ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 180, friction: 12 },
  });

  return (
    <div className="admin-panel p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col items-center">
      {/* Barra de Pesquisa */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center border rounded-md overflow-hidden">
          <SearchIcon className="text-gray-400 ml-2" size={20} />
          <input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-transparent border-none focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">Admin Panel</h1>

      {/* Abas */}
      <div className="tabs flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("free")}
          className={`px-6 py-2 text-lg rounded-tl-lg ${activeTab === "free" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        >
          Free Content
        </button>
        <button
          onClick={() => setActiveTab("vip")}
          className={`px-6 py-2 text-lg rounded-tr-lg ${activeTab === "vip" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        >
          VIP Content
        </button>
      </div>

      <div className="form mb-6 w-full max-w-lg flex flex-col justify-center space-y-4">
        <input
          type="text"
          placeholder="Link Name"
          value={newLink.name}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Link URL"
          value={newLink.link}
          onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={newLink.createdAt || ""}
          onChange={(e) => setNewLink({ ...newLink, createdAt: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Botões */}
        {isEditing ? (
          <animated.button
            onClick={handleUpdateLink}
            className="bg-green-500 text-white px-6 py-3 rounded-lg w-full"
            style={buttonAnimation}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Link"}
          </animated.button>
        ) : (
          <animated.button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full"
            style={buttonAnimation}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Link"}
          </animated.button>
        )}
      </div>

      <ul className="link-list w-full max-w-xl">
        {filteredLinks.map((link) => (
          <li key={link.id} className="flex justify-between items-center p-4 bg-white shadow-sm mb-4 rounded-lg">
            <div>
              <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                {link.name}
              </a>
              <p className="text-sm text-gray-500">{new Date(link.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <animated.button
                onClick={() => handleEditLink(link.id)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                style={buttonAnimation}
                disabled={isLoading}
              >
                <EditIcon size={16} />
              </animated.button>
              <animated.button
                onClick={() => handleDeleteLink(link.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
                style={buttonAnimation}
                disabled={isLoading}
              >
                <TrashIcon size={16} />
              </animated.button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPainel;
