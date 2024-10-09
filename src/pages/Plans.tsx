import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/Plans/PlanCard";
import Loading from "../components/Loading";
const Plans: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const checkAuthAndVipStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const authResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (authResponse.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }

        const vipResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/is-vip/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
  }, [token, email]);

  const handleAccessClick = async (planType: "monthly" | "annual") => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pay/vip-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, planType }),
      });

      if (!response.ok) throw new Error("Error creating payment session");

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert(
        "An error occurred while processing your request. Please try again."
      );
    }
  };

  const handleFreeContentClick = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative">
        <PlanCard
          title="VIP ALL CONTENT ACCESS"
          price="USD 10.00 / month"
          description="(3 YEARS OF CONTENT)"
          features={[
            "Access to all content before it's posted for free users.",
            "VIP badge in our Discord community.",
            "Early access to exclusive content and special newsletters.",
            "Priority support for viewing and accessing all content.",
            "Exclusive Q&A sessions, webinars, and personalized content.",
          ]}
          buttonText="Get VIP Access"
          onButtonClick={() => handleAccessClick("monthly")}
        />

        <PlanCard
          title="ANNUAL PLAN"
          price="USD 60.00 / Year"
          description="(1 year of content access without ads)"
          features={[
            "Access to all content before it's posted for free users.",
            "VIP badge in our Discord community.",
            "Early access to exclusive content and newsletters.",
            "Priority support for viewing and accessing all content.",
            "Exclusive Q&A sessions, webinars, and personalized content.",
            "50% discount on future content.",
          ]}
          buttonText="Get Annual Plan"
          onButtonClick={() => handleAccessClick("annual")}
        />

        <PlanCard
          title="FREE CONTENT"
          price="USD $0"
          description=""
          features={["Free content with ads."]}
          buttonText="Access Free Content"
          onButtonClick={handleFreeContentClick}
        />
      </div>
    </main>
  );
};

export default Plans;
