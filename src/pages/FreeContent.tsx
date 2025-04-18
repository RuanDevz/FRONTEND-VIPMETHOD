import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { SearchFilters } from "../components/FreeContent/SearchFilters";
import { VIPPopup } from "../components/FreeContent/VIPpopup";
import { ContentList } from "../components/FreeContent/ContentList";
import { LinkItem, Category } from "../components/FreeContent/types/index";
import { months } from "../components/FreeContent/types/constants";

function FreeContent() {
  const { theme } = useTheme();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [openEmojiMenu, setOpenEmojiMenu] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userReactions, setUserReactions] = useState<{ [linkId: number]: string }>({});


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await axios.get<LinkItem[]>(
          `${import.meta.env.VITE_BACKEND_URL}/freecontent`
        );
        setLinks(response.data);
        setFilteredLinks(response.data);

        const extractedCategories = Array.from(
          new Set(response.data.map((item) => item.category))
        ).map((category) => ({
          id: category,
          name: category,
          category: category,
        }));

        setCategories(extractedCategories);
      } catch (error) {
        console.error("Error fetching free content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    const fetchEmojiCounts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/emojis`);
        const emojisByLink = response.data.reduce((acc: any, emoji: any) => {
          if (!acc[emoji.linkId]) acc[emoji.linkId] = [];
          acc[emoji.linkId].push({ name: emoji.name, count: emoji.count });
          return acc;
        }, {});
  
        setLinks((prevLinks) =>
          prevLinks.map((link) => {
            const reactions = emojisByLink[link.id] || [];
            const top5Reactions = reactions
              .sort((a: any, b: any) => b.count - a.count)
              .slice(0, 5)
              .reduce((acc: any, emoji: any) => {
                acc[emoji.name] = emoji.count;
                return acc;
              }, {});
            return { ...link, reactions: top5Reactions };
          })
        );
      } catch (error) {
        console.error("Error fetching emoji counts:", error);
      }
    };
  
    fetchEmojiCounts();
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

    if (selectedCategory) {
      filtered = filtered.filter((link) => link.category === selectedCategory);
    }

    switch (sortOption) {
      case "mostRecent":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    setFilteredLinks(filtered);
  }, [searchName, selectedMonth, selectedCategory, sortOption, links]);

  const handleEmojiReaction = async (linkId: number, emojiName: string) => {
    const token = localStorage.getItem("Token");
  
    if (!token) {
      alert("Você precisa estar logado para reagir.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/emoji/${emojiName}/react`,
        { linkId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setLinks((prevLinks) =>
          prevLinks.map((link) => {
            if (link.id === linkId) {
              const currentEmoji = userReactions[linkId];
  
              const updatedReactions = { ...link.reactions };
  
              // Remove 1 da reação anterior (se houver)
              if (currentEmoji && updatedReactions[currentEmoji]) {
                updatedReactions[currentEmoji] -= 1;
                if (updatedReactions[currentEmoji] <= 0) {
                  delete updatedReactions[currentEmoji];
                }
              }
  
              // Adiciona 1 na nova reação
              updatedReactions[emojiName] = (updatedReactions[emojiName] || 0) + 1;
  
              // Ordena e pega as 5 principais
              const sorted = Object.entries(updatedReactions)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5);
  
              return {
                ...link,
                reactions: Object.fromEntries(sorted),
              };
            }
            return link;
          })
        );
  
        // Atualiza o estado com a reação do usuário para esse conteúdo
        setUserReactions((prev) => ({ ...prev, [linkId]: emojiName }));
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Você já reagiu com esse emoji. Tente outro para trocar.");
      } else {
        console.error("Erro ao reagir com emoji:", error);
      }
    }
  
    setOpenEmojiMenu(null);
  };
  
  
  

  const groupedLinks: { [key: string]: LinkItem[] } = {};
  filteredLinks.forEach((link) => {
    let linkDate = new Date(link.createdAt);
    linkDate.setDate(linkDate.getDate());
    const formattedDate = `${(linkDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${linkDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${linkDate.getFullYear()}`;
    if (!groupedLinks[formattedDate]) {
      groupedLinks[formattedDate] = [];
    }
    groupedLinks[formattedDate].push(link);
  });

  const recentLinks = filteredLinks.slice(0, 5);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} zoom-80`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-6"></div>

        {showPopup && (
          <VIPPopup
            theme={theme}
            onClose={() => setShowPopup(false)}
            onBecomeVIP={() => navigate("/plans")}
          />
        )}

        <SearchFilters
          theme={theme}
          searchName={searchName}
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
          sortOption={sortOption}
          categories={categories}
          months={months}
          onSearchChange={setSearchName}
          onMonthChange={setSelectedMonth}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOption}
        />

<ContentList
  theme={theme}
  loading={loading}
  groupedLinks={groupedLinks}
  recentLinks={recentLinks}
  onEmojiReaction={handleEmojiReaction}
  openEmojiMenu={openEmojiMenu}
  setOpenEmojiMenu={setOpenEmojiMenu}
  userReactions={userReactions} // 👈 adiciona essa linha!
/>
      </div>
    </div>
  );
}

export default FreeContent;