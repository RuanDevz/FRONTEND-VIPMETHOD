import React from "react";

interface LinkFormProps {
  newLink: { name: string; link: string };
  setNewLink: React.Dispatch<React.SetStateAction<{ name: string; link: string }>>;
  isEditing: number | null;
  handleAddLink: () => void;
  handleUpdateLink: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({
  newLink,
  setNewLink,
  isEditing,
  handleAddLink,
  handleUpdateLink,
}) => {
  return (
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
  );
};

export default LinkForm;
