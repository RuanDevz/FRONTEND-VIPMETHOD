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
};

const LinkGroup: React.FC<LinkGroupProps> = ({ date, links, recentLinks }) => (
  <div className="mb-4">
    <p className="text-gray-600 font-bold text-base mb-2">{date}</p>
    {links.map((link) => (
      <LinkBox key={link.id} link={link} isNew={recentLinks.includes(link)} />
    ))}
  </div>
);

export default LinkGroup;
