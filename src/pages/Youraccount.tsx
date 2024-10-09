import React, { useEffect, useState } from "react";
import UserDetails from "../components/YourAccount/UserDetails";
import VIPBenefits from "../components/YourAccount/VIPBenefits";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Userdatatypes } from "../../types/Userdatatypes";

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const calculateDaysLeft = (expirationDate: number) => {
    const currentDate = new Date();
    const expDate = new Date(expirationDate);
    const timeDiff = expDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  if (loading) return <Loading />;

  if (!userData) return <ErrorMessage />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Account</h1>
      <UserDetails userData={userData} />
      {userData.isVip && (
        <VIPBenefits
          vipExpirationDate={userData.vipExpirationDate}
          calculateDaysLeft={calculateDaysLeft}
        />
      )}
    </div>
  );
};

export default YourAccount;
