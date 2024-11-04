import React, { useState, useEffect } from "react";
import axios from "axios";

type LinkItem = {
  id: number;
  name: string;
  link: string;
  createdAt: string;
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

const FreeContent: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await axios.get<LinkItem[]>(`https://backend-vip.vercel.app/freecontent`);
        setLoading(false);
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

  return (
    <div className="free-content-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Free Content
      </h1>

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
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="link-boxes flex flex-col max-w-screen-lg mx-auto">
        {Object.keys(groupedLinks).length > 0 ? (
          Object.keys(groupedLinks).map((date) => (
            <div key={date} className="mb-4">
              <p className="text-gray-600 font-bold text-base mb-2">{date}</p>
              {groupedLinks[date].map((link) => (
                <div
                  key={link.id}
                  className="link-box p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-base font-semibold flex items-center"
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

export default FreeContent;
