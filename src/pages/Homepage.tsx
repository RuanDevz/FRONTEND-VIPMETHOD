import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Homepage = () => {
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
        // Verifica autenticação
        const authResponse = await fetch("http://localhost:3001/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token"); // Corrigido a chave aqui
          setIsAuthenticated(false);
        }

        // Verifica status VIP
        const vipResponse = await fetch(`http://localhost:3001/auth/is-vip/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await vipResponse.json();
        setIsVip(data.isVip);
      } catch (error) {
        console.error("Erro ao verificar autenticação ou status VIP:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndVipStatus();
  }, [token]);

  const handleAccessClick = async (path = "") => {
    if (isVip) {
      navigate("/vip-content");
    } else if (!token) {
      navigate('/login');
    } else {
      try {
        const response = await fetch("http://localhost:3001/pay/vip-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar a sessão de pagamento");
        }

        const { url } = await response.json(); 
        window.location.href = url; 
      } catch (error) {
        console.error("Erro ao criar a sessão de pagamento:", error);
        alert("Ocorreu um erro ao processar seu pedido. Tente novamente.")
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative">
        <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
          <h2 className="text-lg font-semibold">FREE CONTENT</h2>
          <p className="text-gray-500">(LAST 90 DAYS WITH ADS)</p>
          <p className="text-4xl font-bold text-black mt-2">USD 0.00</p>
          <ul className="text-left list-disc list-inside mt-4">
            <li>Free access to content from the last 90 days.</li>
            <li>Content displayed with ads.</li>
          </ul>
          <Link to="/free-content">
            <Button>Access Free Content</Button>
          </Link>
        </div>

        <div className="relative">
          <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
            <h2 className="text-lg font-semibold">VIP ALL CONTENT ACCESS</h2>
            <p className="text-gray-500">(3 YEARS OF CONTENT)</p>
            <p className="text-4xl font-bold text-black mt-2">USD 5.00 / month</p>
            <ul className="text-left list-disc list-inside mt-4 flex flex-col gap-2">
              <li>Access to 3 years of content with no ads.</li>
              <li>Access to all content before it's posted for free users.</li>
              <li>VIP badge on our Discord community.</li>
              <li>Early access to exclusive content and special newsletters.</li>
              <li>Priority support for viewing and accessing all content.</li>
              <li>Exclusive Q&A sessions, webinars, and personalized content.</li>
            </ul>
            <Button onClick={handleAccessClick}>Get VIP Access</Button>
          </div>
        </div>

        <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
          <h2 className="text-lg font-semibold">ALL MY PREVIOUS CONTENT</h2>
          <p className="text-gray-500">(3 YEARS OF CONTENT)</p>
          <p className="text-4xl font-bold text-black mt-2">USD 0.00</p>
          <ul className="text-left list-disc list-inside mt-4">
            <li>Access to all previous content.</li>
            <li>Content displayed with ads.</li>
          </ul>
          <Button onClick={() => handleAccessClick("/previous-content")}>Access Previous Content</Button>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
