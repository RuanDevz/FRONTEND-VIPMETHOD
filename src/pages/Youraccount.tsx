import React, { useEffect, useState } from "react";
import UserDetails from "../components/YourAccount/UserDetails";
import VIPBenefits from "../components/YourAccount/VIPBenefits";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { Userdatatypes, FavoriteContent } from "../../types/Userdatatypes";
import { CheckCircle, User, Star, Calendar, Heart, XCircle } from "lucide-react";

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
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

          // Verifica se há um estado de cancelamento armazenado no localStorage
          const storedCanceling = localStorage.getItem("isCanceling");
          if (storedCanceling === "true") {
            setIsCanceling(true);
          } else if (data.isSubscriptionCanceled) {
            setIsCanceling(true);
            localStorage.setItem("isCanceling", "true");
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
          if (!prevData) {
            return prevData; // Retorna undefined se prevData for undefined
          }

          // Retorna um novo objeto com as propriedades atualizadas
          return {
            ...prevData,
            stripeSubscriptionId: null, // Atualiza o stripeSubscriptionId
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

  // Verifica se a assinatura ainda está ativa
  const isSubscriptionActive = userData.vipExpirationDate
    ? new Date(userData.vipExpirationDate) > new Date()
    : false;

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg w-full h-full flex flex-col">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Account</h1>

      <UserDetails userData={userData} />

      {/* Subscription Management */}
      <div className="my-6 p-6 bg-gray-900 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">Subscription Management</h2>
        <div className="flex items-center gap-3 mb-3">
          <Star className="text-yellow-400" />
          <p className="text-lg">{userData.isVip ? "VIP" : "Free"} Subscription</p>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-blue-500" />
          <p>
            {userData.isVip
              ? `Next Billing Date: ${new Date(userData.vipExpirationDate).toLocaleDateString()}`
              : "No active subscription."}
          </p>
        </div>
        <Link to="/plans">
          <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg hover:shadow-lg transition-all">
            Upgrade or Change Plan
          </button>
        </Link>

        {/* Cancel Subscription Button */}
        {userData.isVip && isSubscriptionActive && !isCanceling && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:shadow-lg transition-all"
          >
            <XCircle className="inline-block mr-2" />
            Cancel VIP Subscription
          </button>
        )}

        {isCanceling && (
          <p className="mt-4 text-yellow-500">
            Your subscription has been canceled. You will retain VIP access until{" "}
            {new Date(userData.vipExpirationDate).toLocaleDateString()}.
          </p>
        )}

        {userData.isVip && !isSubscriptionActive && (
          <p className="mt-4 text-yellow-500">
            Your VIP subscription has expired. You can renew it by upgrading your plan.
          </p>
        )}
      </div>

      {userData.isVip && (
        <VIPBenefits
          vipExpirationDate={userData.vipExpirationDate}
          calculateDaysLeft={calculateDaysLeft}
        />
      )}

      {/* Favorite Content */}
      <div className="my-6 p-6 bg-gray-900 rounded-lg shadow-md w-full pb-36">
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

      {/* Modal de Cancelamento */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">Cancel Subscription</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to cancel your VIP subscription?<br />
              - You will retain VIP access until{" "}
              {new Date(userData.vipExpirationDate).toLocaleDateString()}.<br />
              - All future Stripe charges will be canceled.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={cancelSubscription}
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourAccount;