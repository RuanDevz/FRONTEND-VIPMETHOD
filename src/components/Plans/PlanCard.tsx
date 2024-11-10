import React, { useState } from "react";
import { CheckCircleIcon } from "lucide-react"; // Importando o ícone de check-circle

type PlanCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: any;
  isPopular: boolean;
};

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  isPopular,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true); // Inicia o loading
    try {
      await onButtonClick(); // Aguarda a resposta da função passada
    } catch (error) {
      console.error("Error during button click:", error);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  return (
    <div
      className={`${
        isPopular
          ? "bg-yellow-100 shadow-lg border-2 border-yellow-300"
          : "bg-white shadow-lg border-2 border-gray-300"
      } p-8 rounded-lg text-center flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-blue-500 relative`}
    >
      {isPopular && (
        <span className="bg-yellow-300 text-black text-sm font-bold px-3 py-1 rounded-full absolute top-4 right-4">
          Popular
        </span>
      )}
      <h2 className="text-2xl font-semibold text-black">{title}</h2>
      <p className="text-gray-500 mb-4">{description}</p>
      <p className="text-4xl font-bold text-black mt-2">{price}</p>

      <ul className="mt-4 flex flex-col gap-2 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircleIcon className="text-green-500" /> {/* Check Circle Icon */}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${
          isPopular ? "bg-yellow-500 text-white" : "bg-blue-600 text-white"
        } mt-4 p-3 rounded-lg transition duration-300 hover:bg-opacity-80 focus:outline-none`}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
