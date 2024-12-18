import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

type LinkItem = {
  id: number;
  name: string;
  link: string;
  category: string;
  createdAt: string;
};

type Category = {
  id: string;
  name: string;
  category: string;
};

const months = [
  { value: "", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const VIPcontent: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await axios.get<LinkItem[]>(`https://backend-vip.vercel.app/vipcontent`);
        setLoading(false);
        setLinks(response.data);
        setFilteredLinks(response.data);

        const extractedCategories = Array.from(new Set(response.data.map((item) => item.category)))
          .map((category) => ({
            id: category,
            name: category,
            category: category,
          }));

        setCategories(extractedCategories);
      } catch (error) {
        console.error("Error fetching VIP content:", error);
        setLoading(false);
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

    if (selectedCategory) {
      filtered = filtered.filter((link) => link.category === selectedCategory);
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
  }, [searchName, selectedMonth, selectedCategory, sortOption, links]);

  const recentLinks = filteredLinks.slice(0, 5);

  const handleLinkClick = (link: string) => {
    window.open(link, "_blank");
  };

  const addOneDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate());  
    return newDate;
  };

  const groupedLinks: { [key: string]: LinkItem[] } = {};
  filteredLinks.forEach((link) => {
    let linkDate = new Date(link.createdAt);
    linkDate = addOneDay(linkDate);  
    const formattedDate = `${(linkDate.getMonth() + 1).toString().padStart(2, "0")}/${linkDate.getDate().toString().padStart(2, "0")}/${linkDate.getFullYear()}`;
    if (!groupedLinks[formattedDate]) {
      groupedLinks[formattedDate] = [];
    }
    groupedLinks[formattedDate].push(link);
  });

  const isNew = (createdAt: string) => {
    const currentDate = new Date();
    const linkDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - linkDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24); 
    return daysDifference <= 7;
  };

  return (
    <div className="vip-content-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">VIP Content</h1>

      <div className="filters flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Filter by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 w-full md:w-auto"
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 w-full md:w-auto"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="link-boxes flex flex-col max-w-screen-lg mx-auto">
        {loading ? (
          <Loading />
        ) : Object.keys(groupedLinks).length > 0 ? (
          Object.keys(groupedLinks).map((date) => (
            <div key={date} className="mb-6">
              <p className="text-gray-600 font-bold text-base mb-2">{date}</p> {/* Data no formato MM/DD/YYYY */}
              {groupedLinks[date].map((link) => (
                <div
                  key={link.id}
                  className="link-box p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-4"
                >
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-lg font-semibold flex items-center"
                  >
                    {link.name}
                    {recentLinks.includes(link) && (
                      <span className="ml-2 text-red-500 animate-pulse font-bold">
                        NEW
                      </span>
                    )}
                  </a>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-600">
            Content Not Found
          </div>
        )}
      </div>
    </div>
  );
};

export default VIPcontent;
