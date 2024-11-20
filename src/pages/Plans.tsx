import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/Plans/PlanCard";
import Loading from "../components/Loading/Loading";

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
          localStorage.removeItem("Token");
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
        localStorage.removeItem("Token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndVipStatus();
  }, [token, email]);

  const handleAccessClick = async (
    planType: "monthly" | "annual"
  ): Promise<void> => {
    if (!token) {
      navigate("/login");
      return;
    }
    localStorage.setItem("selectedPlan", planType);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/pay/vip-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, planType }),
        }
      );

      if (!response.ok) throw new Error("Error creating payment session");

      const { url } = await response.json();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert("An error occurred while processing your request. Please try again.");
    }
  };

  const handleFreeContentClick = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const planType = urlParams.get("planType");
    const isCanceled = window.location.pathname.includes("/cancel");

    if (!email || !planType) {
      console.error("Email or planType is missing in the URL");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-vip-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            planType,
            isVip: !isCanceled,
          }),
        }
      );

      if (!response.ok) throw new Error("Error updating VIP status");

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative">
        <PlanCard
          title="VIP ALL CONTENT ACCESS"
          price="USD 10.00 / month"
          description="(1 MONTH OF CONTENT)"
          features={[
            "Access to all content before it's posted for free users.",
            "VIP badge in our Discord community.",
            "Early access to exclusive content and special newsletters.",
            "Priority support for viewing and accessing all content.",
            "Exclusive Q&A sessions, webinars",
            "No ads on the platform.",
            "Ability to recommend content to be posted.",
            "Priority in support requests.",
          ]}
          buttonText="Get VIP Access"
          onButtonClick={() => handleAccessClick("monthly")}
          isPopular={true}
        />

        <PlanCard
          title="ANNUAL PLAN"
          price="USD 5.00 / Per Month"
          description="(1 year of content access without ads)"
          features={[
            "Access to all content before it's posted for free users.",
            "VIP badge in our Discord community.",
            "Early access to exclusive content and newsletters.",
            "Priority support for viewing and accessing all content.",
            "Exclusive Q&A sessions, webinars",
            "50% discount on future content.",
            "No ads on the platform.",
            "Ability to recommend content to be posted.",
            "Priority in support requests.",
          ]}
          buttonText="Get Annual Plan"
          onButtonClick={() => handleAccessClick("annual")}
          isPopular={false}
        />

        <PlanCard
          title="FREE CONTENT"
          price="USD $0"
          description="(Free content with ads)"
          features={[
            "Free content with ads",
            "Access to all content before it's posted for free users.",
            "VIP badge in our Discord community.",
            "Early access to exclusive content and newsletters.",
            "Priority support for viewing and accessing all content.",
            "50% discount on future content.",
            "No ads on the platform.",
            "Ability to recommend content to be posted.",
            "Priority in support requests.",
          ]}
          buttonText="Access Free Content"
          onButtonClick={handleFreeContentClick}
          isPopular={false}
        />
      </div>
    </main>
  );
};

export default Plans;
