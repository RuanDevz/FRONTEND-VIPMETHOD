import React, { useEffect, useState } from "react";
import UserDetails from "../components/YourAccount/UserDetails";
import VIPBenefits from "../components/YourAccount/VIPBenefits";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import {
  Userdatatypes,
  Transaction,
  FavoriteContent,
} from "../../types/Userdatatypes";

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
    return (
      <ErrorMessage message="User not found or unable to fetch user data." />
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Account</h1>
      <UserDetails userData={userData} />

      <div className="my-6">
        <h2 className="text-lg font-semibold mb-2">Subscription Management</h2>
        <p>Current Subscription: {userData.isVip ? "VIP" : "Free"}</p>
        <p>
          Next Billing Date:
          {new Date(userData.vipExpirationDate).toLocaleDateString()}
        </p>
        <Link to="/plans">
          <button className="btn btn-primary mt-2">
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

      {/* Favorites */}
      <div className="my-6">
        {userData.favorites.length > 0 ? (
          <ul className="list-disc list-inside">
            {userData.favorites.map((content: FavoriteContent) => (
              <li key={content.id}>{content.title}</li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default YourAccount;
