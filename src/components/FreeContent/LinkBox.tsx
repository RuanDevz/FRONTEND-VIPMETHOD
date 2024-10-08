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
};

const LinkBox: React.FC<LinkBoxProps> = ({ link, isNew }) => (
  <div className="link-box p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <a
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline text-lg font-semibold flex items-center"
    >
      {link.name}
      {isNew && (
        <span className="ml-2 text-red-500 animate-pulse font-bold">NEW</span>
      )}
    </a>
  </div>
);

export default LinkBox;
