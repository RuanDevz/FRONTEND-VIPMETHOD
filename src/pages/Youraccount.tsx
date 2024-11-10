import React, { useEffect, useState } from "react";
import UserDetails from "../components/YourAccount/UserDetails";
import VIPBenefits from "../components/YourAccount/VIPBenefits";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { Userdatatypes, FavoriteContent } from "../../types/Userdatatypes";
import { CheckCircle, User, Star, Calendar, Heart } from "lucide-react"; // Adicionando ícones

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const calculateDaysLeft = (expirationDate: number): number => {
    const currentDate = new Date();
    const expDate = new Date(expirationDate);
    const timeDiff = expDate.getTime() - currentDate.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <ErrorMessage message="User not found or unable to fetch user data." />;
  }

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Account</h1>
      
      <UserDetails userData={userData} />

      {/* Subscription Management */}
      <div className="my-6 p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">Subscription Management</h2>
        <div className="flex items-center gap-3 mb-3">
          <Star className="text-yellow-400" />
          <p className="text-lg">{userData.isVip ? "VIP" : "Free"} Subscription</p>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-blue-500" />
          <p>Next Billing Date: {new Date(userData.vipExpirationDate).toLocaleDateString()}</p>
        </div>
        <Link to="/plans">
          <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg hover:shadow-lg transition-all">
            Upgrade or Change Plan
          </button>
        </Link>
      </div>

      {userData.isVip && (
        <VIPBenefits
          vipExpirationDate={userData.vipExpirationDate}
          calculateDaysLeft={calculateDaysLeft}
        />
      )}

      {/* Favorite Content */}
      <div className="my-6 p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">Favorite Content</h2>
        {userData.favorites.length > 0 ? (
          <ul className="space-y-3">
            {userData.favorites.map((content: FavoriteContent) => (
              <li key={content.id} className="flex items-center gap-2 text-lg">
                <Heart className="text-red-400" />
                {content.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">You have no favorite content.</p>
        )}
      </div>
    </div>
  );
};

export default YourAccount;

