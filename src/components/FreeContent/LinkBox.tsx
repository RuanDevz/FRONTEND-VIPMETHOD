import React from "react";

type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
};

type LinkBoxProps = {
  link: LinkItem;
  isNew: boolean;
  onClick: (link: string) => void; // Adicione esta linha
};

const LinkBox: React.FC<LinkBoxProps> = ({ link, isNew, onClick }) => (
  <div className="link-box p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <button
      onClick={() => onClick(link.link)} // Chama a função ao clicar
      className="text-blue-600 hover:underline text-lg font-semibold flex items-center"
    >
      {link.name}
      {isNew && (
        <span className="ml-2 text-red-500 animate-pulse font-bold">NEW</span>
      )}
    </button>
  </div>
);

export default LinkBox;
