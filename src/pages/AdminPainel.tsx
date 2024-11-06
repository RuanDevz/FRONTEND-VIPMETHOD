import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from '@react-spring/web';

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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch links whenever the activeTab changes
  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  // Fetch links from the backend
  const fetchLinks = async () => {
    try {
      setIsLoading(true); // Set loading before fetching
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<LinkItem[]>(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`);
      setLinks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching links:", error);
      setLinks([]);
    } finally {
      setIsLoading(false); // Reset loading after fetching
    }
  };

  // Add new link
  const handleAddLink = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, newLink);
      setNewLink({ name: "", link: "" });
      fetchLinks(); // Re-fetch links after adding a new one
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit link
  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink({ name: linkToEdit.name, link: linkToEdit.link });
      setIsEditing(id);
    }
  };

  const handleUpdateLink = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}${endpoint}/${isEditing}`, newLink);
      setIsEditing(null);
      setNewLink({ name: "", link: "" });
      fetchLinks(); // Re-fetch links after updating
    } catch (error) {
      console.error("Error updating link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${endpoint}/${id}`);
      fetchLinks(); // Re-fetch links after deleting
    } catch (error) {
      console.error("Error deleting link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buttonAnimation = useSpring({
    opacity: isLoading ? 0.6 : 1,
    transform: isLoading ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 180, friction: 12 },
  });

  return (
    <div className="admin-panel p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Admin Panel</h1>

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

      <div className="form mb-4 flex flex-col w-72 lg:flex max-w-[800px]">
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
          <animated.button
            onClick={handleUpdateLink}
            className="bg-green-500 text-white px-4 py-2 rounded"
            style={buttonAnimation}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Link"}
          </animated.button>
        ) : (
          <animated.button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={buttonAnimation}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Link"}
          </animated.button>
        )}
      </div>

      <ul className="link-list w-full max-w-xl">
        {filteredLinks.map((link) => (
          <li key={link.id} className="flex justify-between items-center p-2 bg-white shadow-sm mb-2 rounded">
            <div>
              <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {link.name}
              </a>
              <p className="text-sm text-gray-500">{new Date(link.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <animated.button
                onClick={() => handleEditLink(link.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                style={buttonAnimation}
                disabled={isLoading}
              >
                Edit
              </animated.button>
              <animated.button
                onClick={() => handleDeleteLink(link.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
                style={buttonAnimation}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </animated.button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPainel;
