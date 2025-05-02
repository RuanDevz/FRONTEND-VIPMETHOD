import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Loader2,
  LinkIcon,
  Tag,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { LinkItem } from "../../utils/index";

interface AdminLinkFormProps {
  newLink: LinkItem;
  setNewLink: React.Dispatch<React.SetStateAction<LinkItem>>;
  isLoading: boolean;
  isEditing: number | null;
  handleAddLink: () => Promise<void>;
  handleUpdateLink: () => Promise<void>;
  categories: string[];
}

const AdminLinkForm: React.FC<AdminLinkFormProps> = ({
  newLink,
  setNewLink,
  isLoading,
  isEditing,
  handleAddLink,
  handleUpdateLink,
  categories,
}) => {
  const [showAdditionalLinks, setShowAdditionalLinks] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-4 mb-6 bg-gray-800/80 p-4 rounded-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-2">
        {isEditing ? "Edit Content" : "Add New Content"}
      </h2>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Content Name"
            name="name"
            value={newLink.name}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Primary Link"
            name="link"
            value={newLink.link}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors" 
           onClick={() => setShowAdditionalLinks(!showAdditionalLinks)}>
        {showAdditionalLinks ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        <span>Additional Links</span>
      </div>
      
      {showAdditionalLinks && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Link P"
                name="linkP"
                value={newLink.linkP}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Link G"
                name="linkG"
                value={newLink.linkG}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="MV Link 1"
                name="linkMV1"
                value={newLink.linkMV1}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="MV Link 2"
                name="linkMV2"
                value={newLink.linkMV2}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="MV Link 3"
                name="linkMV3"
                value={newLink.linkMV3}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            name="category"
            value={newLink.category}
            onChange={handleInputChange}
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
            name="postDate"
            value={newLink.postDate}
            onChange={handleInputChange}
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
        {isEditing ? "Update Content" : "Add New Content"}
      </motion.button>
    </div>
  );
};

export default AdminLinkForm;