import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Loading from "../../components/Loading/Loading";
import DownloadOptions from "../../components/DownloadOptions";

type ContentItem = {
  id: number;
  name: string;
  link: string;
  linkP: string;
  linkG: string;
  category: string;
  postDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

const VIPContentDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("Token");
        const response = await axios.get<ContentItem>(
          `${import.meta.env.VITE_BACKEND_URL}/vipcontent/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching content details:", error);
        setError("Failed to load content details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchContentDetails();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{error}</p>
          <Link 
            to="/vip" 
            className={`mt-6 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VIP content
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/vip" 
            className={`mt-6 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VIP content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/vip" 
          className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to VIP content
        </Link>

        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl`}>
          <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'} px-8 py-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {content.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formatDate(content.postDate)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                  {content.category}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Download Options
            </h2>
            
            <DownloadOptions
              primaryLinks={{
                mega: content.link,
                pixeldrain: content.linkP,
                gofile: content.linkG
              }}
              mirrorLinks={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPContentDetails;