import React from "react";

interface LinkItem {
  id: number;
  name: string;
  link: string;
  createdAt: string;
}

interface LinkListProps {
  links: LinkItem[];
  handleEditLink: (id: number) => void;
  handleDeleteLink: (id: number) => void;
}

const LinkList: React.FC<LinkListProps> = ({
  links,
  handleEditLink,
  handleDeleteLink,
}) => {
  return (
    <div className="link-list w-full max-w-3xl">
      {links.length > 0 ? (
        links.map((link) => (
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
  );
};

export default LinkList;
