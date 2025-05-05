import React, { useEffect, useState } from "react";
import { Userdatatypes } from "../../types/Userdatatypes";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useTheme } from "../contexts/ThemeContext";
import UserProfileSection from "../components/YourAccount/UserProfileSection";
import SubscriptionSection from "../components/YourAccount/SubscriptionSection";
import VIPBenefitsSection from "../components/YourAccount/VIPBenefitsSection";
import FavoritesSection from "../components/YourAccount/FavoritesSection";
import ContactSection from "../components/YourAccount/ContactSection";
import AccountOptionsSection from "../components/YourAccount/AccountOptionsSection";
import CancelSubscriptionModal from "../components/YourAccount/CancelSubscriptionModal";

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const token = localStorage.getItem("Token");
  const { theme } = useTheme();

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
        } // <- esse fechamento estava faltando
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

  const isSubscriptionActive = userData.vipExpirationDate
    ? new Date(userData.vipExpirationDate) > new Date()
    : false;

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className={`mb-12 text-center`}>
          <h1 className={`text-5xl font-bold bg-gradient-to-r ${
            theme === "dark" 
              ? "from-indigo-400 via-purple-400 to-pink-400" 
              : "from-indigo-600 via-purple-600 to-pink-600"
          } bg-clip-text text-transparent mb-2`}>
            Your Account
          </h1>
          <p className={`text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Manage your profile, subscription, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <UserProfileSection userData={userData} />
            
            <SubscriptionSection 
              userData={userData} 
              isSubscriptionActive={isSubscriptionActive}
              isCanceling={isCanceling}
              setShowCancelModal={setShowCancelModal}
            />
            
            {userData.isVip && (
              <VIPBenefitsSection
                vipExpirationDate={userData.vipExpirationDate}
                calculateDaysLeft={calculateDaysLeft}
              />
            )}
            
            <FavoritesSection favorites={userData.favorites} />
          </div>
          
          <div className="space-y-8">
            <ContactSection />
            <AccountOptionsSection userData={userData} />
          </div>
        </div>
      </div>
      
      {showCancelModal && (
        <CancelSubscriptionModal 
          onCancel={() => setShowCancelModal(false)}
          expirationDate={userData.vipExpirationDate}
        />
      )}
    </div>
  );
};

export default YourAccount;