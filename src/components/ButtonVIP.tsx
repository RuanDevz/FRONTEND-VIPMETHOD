import React from "react";
import { useNavigate } from "react-router-dom";

type ButtonVIPProps = {
  isVip: boolean;
};

const ButtonVIP: React.FC<ButtonVIPProps> = ({ isVip }) => {
  const navigate = useNavigate();

  const handleVipClick = () => {
    if (isVip) {
      navigate("/vip-content");
    } else {
      alert("Você não tem acesso à área VIP.");
    }
  };

  return (
    <div>
      <button
        className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
        onClick={handleVipClick}
      >
        Access VIP
      </button>
    </div>
  );
};

export default ButtonVIP;
