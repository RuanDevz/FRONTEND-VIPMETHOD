import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from '@react-spring/web';
import { EditIcon, TrashIcon, SearchIcon } from "lucide-react";

// Types
type LinkItem = {
  id: number;
  name: string;
  link: string;
  category: string; 
  createdAt: string;
};

const AdminPainel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState({ name: "", link: "", category: "", createdAt: "" });
  const [categories, setCategories] = useState<string[]>([]); 
  const [newCategory, setNewCategory] = useState<string>(""); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`);
      
      const uniqueCategories = [
        ...new Set(response.data.map((link) => link.category)),
      ];
  
      setCategories(uniqueCategories);  // Armazena as categorias únicas
      setLinks(response.data);  // Armazena todos os links
  
    } catch (error) {
      console.error("Error fetching links:", error);
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Função para adicionar um link
  const handleAddLink = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, newLink);
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
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
      setNewLink({ name: linkToEdit.name, link: linkToEdit.link, category: linkToEdit.category, createdAt: linkToEdit.createdAt });
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
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
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

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/categories`, { name: newCategory });
      setNewCategory(""); 
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
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
        {/* Seleciona a categoria */}
        <select
          value={newLink.category}
          onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="Asian">Asian</option>
          <option value="Teen">Teen</option>
          <option value="Big Tits">Big Tits</option>
          <option value="Tiktok">Tiktok</option>
          <option value="Instagram">Instagram</option>
        </select>
        <input
          type="date"
          value={newLink.createdAt || ""}
          onChange={(e) => setNewLink({ ...newLink, createdAt: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <animated.button
          onClick={isEditing ? handleUpdateLink : handleAddLink}
          style={buttonAnimation}
          className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isEditing ? "Update Link" : "Add Link"}
        </animated.button>
      </div>
  
      {/* Links list */}
      <div className="links-list w-full max-w-4xl">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredLinks.map((link) => (
            <div key={link.id} className="link-item flex justify-between items-center mb-4 p-3 border-b border-gray-200">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{link.name}</span>
                <span className="text-sm text-gray-500">{link.link}</span>
                <span className="text-xs text-gray-400">{link.category}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEditLink(link.id)} className="p-2 bg-yellow-500 text-white rounded-md">
                  <EditIcon size={20} />
                </button>
                <button onClick={() => handleDeleteLink(link.id)} className="p-2 bg-red-500 text-white rounded-md">
                  <TrashIcon size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
  

export default AdminPainel
