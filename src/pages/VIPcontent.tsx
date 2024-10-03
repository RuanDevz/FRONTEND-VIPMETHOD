import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LinkItem = {
  id: number;
  name: string;
  author: string;
  link: string;
  createdAt: string;
  views: number;
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
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [isVip, setIsVip] = useState<boolean>(false);
  
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const checkVipStatus = async () => {
      if (token && email) {
        try {
          const response = await axios.get(
            `http://localhost:3001/auth/is-vip/${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.isVip) {
            setIsVip(true);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error checking VIP status:", error);
          navigate("/login");
        }
      }
    };

    checkVipStatus();
  }, [token, email, navigate]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get<LinkItem[]>(
          "http://localhost:3001/vipcontent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLinks(response.data);
        setFilteredLinks(response.data);
      } catch (error) {
        console.error("Error fetching VIP content:", error);
      }
    };

    if (isVip) {
      fetchLinks();
    }
  }, [isVip, token]);

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
      case "mostViewed":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredLinks(filtered);
  }, [searchName, selectedMonth, sortOption, links]);

  const recentLinks = filteredLinks.slice(0, 5);

  if (!isVip) {
    return <p>Loading...</p>;
  }

  const groupedLinks: { [key: string]: LinkItem[] } = {};
  filteredLinks.forEach((link) => {
    const date = new Date(link.createdAt).toLocaleDateString("pt-BR");
    if (!groupedLinks[date]) {
      groupedLinks[date] = [];
    }
    groupedLinks[date].push(link);
  });

  return (
    <div className="vip-content-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        VIP Content
      </h1>

      <div className="filters flex justify-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Filter by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="mostViewed">Most Viewed</option>
        </select>
      </div>

      <div className="link-boxes flex flex-col max-w-screen-lg mx-auto">
        {Object.keys(groupedLinks).length > 0 ? (
          Object.keys(groupedLinks).map((date) => (
            <div key={date} className="mb-4">
              <p className="text-gray-600 font-bold text-lg mb-2">{date}</p>
              {groupedLinks[date].map((link) => (
                <div
                  key={link.id}
                  className="link-box p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
          <p className="col-span-full text-center text-gray-600">
            No content found.
          </p>
        )}
      </div>
    </div>
  );
};

export default VIPcontent;
