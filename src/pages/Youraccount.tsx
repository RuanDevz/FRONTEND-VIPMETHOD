import React, { useEffect, useState } from "react";
import UserDetails from "../components/YourAccount/UserDetails";
import VIPBenefits from "../components/YourAccount/VIPBenefits";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { Userdatatypes, FavoriteContent } from "../../types/Userdatatypes";
import { CheckCircle, User, Star, Calendar, Heart, XCircle, Crown, Sparkles } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // Importando o contexto de tema

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const token = localStorage.getItem("Token");

  // Usando o contexto de tema
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

          const storedCanceling = localStorage.getItem("isCanceling");
          if (storedCanceling === "true" || data.isSubscriptionCanceled) {
            setIsCanceling(true);
            localStorage.setItem("isCanceling", "true");
          }

          const daysLeft = calculateDaysLeft(data.vipExpirationDate);
          if (daysLeft === 0 && data.isVip && !data.isSubscriptionCanceled) {
            cancelSubscription();
          }
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

  const cancelSubscription = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/cancel-subscription`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData?.id }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsCanceling(true);
        localStorage.setItem("isCanceling", "true");

        setUserData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            stripeSubscriptionId: null,
          };
        });

        alert(
          `Your subscription has been canceled. You will retain VIP access until ${new Date(
            data.vipExpirationDate
          ).toLocaleDateString()}.`
        );
      } else {
        alert("Failed to cancel subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("An error occurred while canceling your subscription.");
    } finally {
      setShowCancelModal(false);
    }
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
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-blue-500/10 to-indigo-500/10' : 'from-blue-100/10 to-indigo-100/10'} rounded-3xl shadow-2xl p-8 border border-gray-700`}>
          <div className="flex items-center justify-center mb-8">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Your Account
            </h1>
          </div>

          <UserDetails userData={userData} />

          {/* Subscription Management */}
          <div className={`mt-12 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-2xl shadow-xl p-8 border border-gray-700`}>
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Subscription Management</h2>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <Star className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-lg font-semibold">{userData.isVip ? "VIP" : "Free"} Subscription</p>
                  <p className="text-sm text-gray-400">Current subscription status</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <Calendar className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-lg font-semibold">
                    {userData.isVip
                      ? new Date(userData.vipExpirationDate).toLocaleDateString()
                      : "No active subscription"}
                  </p>
                  <p className="text-sm text-gray-400">Next billing date</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/plans">
                <button className={`px-6 py-3 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-blue-200 to-indigo-200'} rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center gap-2`}>
                  <Sparkles className="w-5 h-5" />
                  Upgrade or Change Plan
                </button>
              </Link>

              {userData.isVip && isSubscriptionActive && !isCanceling && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-semibold hover:bg-red-500/20 transition-all duration-200 flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel VIP Subscription
                </button>
              )}
            </div>

            {isCanceling && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400">
                  Your subscription has been canceled. You will retain VIP access until{" "}
                  {new Date(userData.vipExpirationDate).toLocaleDateString()}.
                </p>
              </div>
            )}

            {userData.isVip && !isSubscriptionActive && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400">
                  Your VIP subscription has expired. You can renew it by upgrading your plan.
                </p>
              </div>
            )}
          </div>

          {userData.isVip && (
            <div className="mt-12">
              <VIPBenefits
                vipExpirationDate={userData.vipExpirationDate}
                calculateDaysLeft={calculateDaysLeft}
              />
            </div>
          )}

          {/* Favorite Content */}
          <div className={`mt-12 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-2xl shadow-xl p-8 border border-gray-700`}>
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-pink-400 mr-3" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-500'}`}>Favorite Content</h2>
            </div>

            {userData.favorites.length > 0 ? (
              <div className="grid gap-4">
                {userData.favorites.map((content: FavoriteContent) => (
                  <div
                    key={content.id}
                    className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex items-center gap-3 group hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <Heart className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-gray-200 group-hover:text-white transition-colors duration-200">
                      {content.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">You have no favorite content yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
              <div className="flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Cancel Subscription</h2>
              <div className="space-y-4 mb-8">
                <p className="text-gray-300">
                  Are you sure you want to cancel your VIP subscription?
                </p>
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-400">You will retain VIP access until:</p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(userData.vipExpirationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 bg-gray-800 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={cancelSubscription}
                  className="flex-1 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-semibold hover:bg-red-500/20 transition-all duration-200"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourAccount;
