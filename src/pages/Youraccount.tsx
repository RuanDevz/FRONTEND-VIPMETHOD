import React, { useEffect, useState } from "react";

type Userdatatypes = {
  name: string,
  email: string
  isVip: boolean,
  vipExpirationDate: number
}

const YourAccount = () => {
  const [userData, setUserData] = useState<Userdatatypes>();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const calculateDaysLeft = (expirationDate) => {
    const currentDate = new Date();
    const expDate = new Date(expirationDate);
    const timeDiff = expDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Account</h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>VIP Status:</strong> {userData.isVip ? "Yes" : "No"}</p>
      </div>

      {userData.isVip && (
        <div>
          <h2 className="text-lg font-semibold">Benefits:</h2>
          <ul className="list-disc list-inside">
            <li>Access to 3 years of content with no ads.</li>
            <li>Access to all content before it's posted for free users.</li>
            <li>VIP badge on our Discord community.</li>
            <li>Early access to exclusive content and special newsletters.</li>
            <li>Priority support for viewing and accessing all content.</li>
            <li>Exclusive Q&A sessions, webinars, and personalized content.</li>
          </ul>
          <p className="mt-4">
            <strong>Days until VIP expiration:</strong>{" "}
            {calculateDaysLeft(userData.vipExpirationDate)} days
          </p>
        </div>
      )}
    </div>
  );
};

export default YourAccount;
