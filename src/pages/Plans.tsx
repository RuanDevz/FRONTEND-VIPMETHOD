import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Plans: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const checkAuthAndVipStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const authResponse = await fetch(
          "http://localhost:3001/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (authResponse.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }

        const vipResponse = await fetch(
          `http://localhost:3001/auth/is-vip/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await vipResponse.json();
        setIsVip(data.isVip);
      } catch (error) {
        console.error("Error checking authentication or VIP status:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndVipStatus();
  }, [token]);

  const handleAccessClick = async (planType: 'monthly' | 'annual') => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/pay/vip-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, planType }),
      });

      if (!response.ok) {
        throw new Error("Error creating payment session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert("An error occurred while processing your request. Please try again.");
    }
  };

  const handleFreeContentClick = () => {
    if (isAuthenticated) {
      navigate("/free-content");
    } else {
      navigate("/login");
    }
  };

  const handlePreviousContentClick = () => {
    if (isAuthenticated) {
      navigate("/previous-content");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative">
        <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
          <h2 className="text-lg font-semibold">VIP ALL CONTENT ACCESS</h2>
          <p className="text-gray-500">(3 YEARS OF CONTENT)</p>
          <p className="text-4xl font-bold text-black mt-2">
            USD 10.00 / month
          </p>
          <ul className="text-left list-disc list-inside mt-4 flex flex-col gap-2">
            <li>Access to all content before it's posted for free users.</li>
            <li>VIP badge in our Discord community.</li>
            <li>Early access to exclusive content and special newsletters.</li>
            <li>Priority support for viewing and accessing all content.</li>
            <li>Exclusive Q&A sessions, webinars, and personalized content.</li>
          </ul>
          <Button className="mt-4 p-3" onClick={() => handleAccessClick('monthly')}>
            Get VIP Access
          </Button>
        </div>

        <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
          <h2 className="text-lg font-semibold">ANNUAL PLAN</h2>
          <p className="text-4xl font-bold text-black mt-2">USD 60.00 / Year</p>
          <ul className="text-left list-disc list-inside mt-4">
            <li>1 year of content access without ads.</li>
            <li>Access to all content before it's posted for free users.</li>
            <li>VIP badge in our Discord community.</li>
            <li>Early access to exclusive content and newsletters.</li>
            <li>Priority support for viewing and accessing all content.</li>
            <li>Exclusive Q&A sessions, webinars, and personalized content.</li>
            <li>50% discount on future content.</li>
          </ul>
          <Button className="mt-4 p-3" onClick={() => handleAccessClick('annual')}>
            Get Annual Plan
          </Button>
        </div>

        <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
          <h2 className="text-lg font-semibold">FREE CONTENT</h2>
          <p className="text-4xl font-bold text-black mt-2">USD $0</p>
          <ul className="text-left list-disc list-inside mt-4">
            <li>Free content with ads.</li>
          </ul>
          <Link to="https://rentry.co/sevenx" target="_blank">
            <Button className="mt-4 p-3" onClick={handleFreeContentClick}>
              Access Free Content
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Plans;
