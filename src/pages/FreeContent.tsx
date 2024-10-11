import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterControls from "../components/FreeContent/FilterControls";
import LinkGroup from "../components/FreeContent/LinkGroup";

type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
};

const FreeContent: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get<LinkItem[]>(`${import.meta.env.VITE_BACKEND_URL}/freecontent`);
        setLinks(response.data);
        setFilteredLinks(response.data);
      } catch (error) {
        console.error("Error fetching free content:", error);
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    let filtered = [...links];

    if (searchName) {
      filtered = filtered.filter((link) =>
        link.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter((link) => {
        const linkDate = new Date(link.createdAt);
        return linkDate.getMonth() === parseInt(selectedMonth) - 1;
      });
    }

    switch (sortOption) {
      case "mostRecent":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredLinks(filtered);
  }, [searchName, selectedMonth, sortOption, links]);

  const recentLinks = filteredLinks.slice(0, 5);

  const groupedLinks: { [key: string]: LinkItem[] } = {};
  filteredLinks.forEach((link) => {
    const date = new Date(link.createdAt).toLocaleDateString("pt-BR");
    if (!groupedLinks[date]) {
      groupedLinks[date] = [];
    }
    groupedLinks[date].push(link);
  });

  const openLinkInNewTab = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="vip-content-page p-6 bg-gray-100 min-h-screen flex">
      {/* Anúncios à esquerda */}
      <div className="hidden md:flex flex-col w-1/4">
        {/* Coloque aqui o espaço para os anúncios */}
      </div>

      <div className="link-boxes flex flex-col max-w-screen-lg mx-auto w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Free Content
        </h1>

        <FilterControls
          searchName={searchName}
          selectedMonth={selectedMonth}
          sortOption={sortOption}
          setSearchName={setSearchName}
          setSelectedMonth={setSelectedMonth}
          setSortOption={setSortOption}
        />

        {Object.keys(groupedLinks).length > 0 ? (
          Object.keys(groupedLinks).map((date) => (
            <LinkGroup
              key={date}
              date={date}
              links={groupedLinks[date]}
              recentLinks={recentLinks}
              onFirstLinkClick={openLinkInNewTab} // Passa a função para o LinkGroup
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No content found.
          </p>
        )}
      </div>

      {/* Anúncios à direita */}
      <div className="hidden md:flex flex-col w-1/4">
        {/* Coloque aqui o espaço para os anúncios */}
      </div>
    </div>
  );
};

export default FreeContent;
