import { useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Success() {
  const email = localStorage.getItem("email");
  // Agora, o planType será uma string, não mais um objeto
  const planType = localStorage.getItem("selectedPlan");
  const navigate = useNavigate();

  useEffect(() => {
    const updateVipStatus = async () => {
      if (!email || !planType) {
        console.error("Missing email or planType");
        return;
      }

      try {
        const response = await fetch(`https://backend-vip.vercel.app/update-vip-status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, planType }), 
        });

        if (!response.ok) {
          throw new Error("Failed to update VIP status");
        }

        console.log("VIP status updated successfully");
      } catch (error) {
        console.error("Error updating VIP status:", error);
        alert("There was an error updating your VIP status. Please contact support.");
        navigate("/");
      }
    };

    if (email && planType) {
      updateVipStatus();
    } else {
      console.error("Email or planType not found in localStorage");
    }
  }, [email, planType, navigate]);

  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Successful!
          </h3>
          <p className="text-gray-600 my-2">
            Congratulations! Your payment has been completed, and you are now a VIP member.
          </p>
          <p className="text-gray-600 my-2">
            You can now enjoy all videos without ads and gain access to exclusive content!
          </p>
          <p>Thank you for joining us. Have a great experience!</p>

          <Button className="mt-5 py-3 px-6">
            <Link to="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
