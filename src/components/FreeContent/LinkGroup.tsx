import React from "react";
import LinkBox from "./LinkBox";

type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
};

type LinkGroupProps = {
  date: string;
  links: LinkItem[];
  recentLinks: LinkItem[];
  onFirstLinkClick: (link: string) => void; // Adicione esta linha
};

const LinkGroup: React.FC<LinkGroupProps> = ({
  date,
  links,
  recentLinks,
  onFirstLinkClick, // Recebe a função como prop
}) => (
  <div className="mb-4">
    <p className="text-gray-600 font-bold text-base mb-2">{date}</p>
    {links.map((link, index) => (
      <LinkBox
        key={link.id}
        link={link}
        isNew={recentLinks.includes(link)}
        onClick={onFirstLinkClick} // Passa a função para cada 
      />
    ))}
  </div>
);

export default LinkGroup;
