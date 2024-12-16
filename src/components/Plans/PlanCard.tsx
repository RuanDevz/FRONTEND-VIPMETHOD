import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react"; // Importando os ícones necessários

const PlanCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: any;
  isPopular: boolean;
  unPopular?: boolean;
}> = ({
  title,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  isPopular,
  unPopular,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      await onButtonClick();
    } catch (error) {
      console.error("Error during button click:", error);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${
        isPopular
          ? "bg-yellow-100 shadow-lg border-2 border-yellow-300"
          : unPopular
          ? "bg-red-100 shadow-lg border-2 border-red-300"
          : "bg-white shadow-lg border-2 border-gray-300"
      } p-8 rounded-lg text-center flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-blue-500 relative`}
    >
      {isPopular && (
        <span className="bg-yellow-300 text-black text-sm font-bold px-3 py-1 rounded-full absolute top-4 right-4">
          Popular
        </span>
      )}
      {unPopular && (
        <span className="bg-red-300 text-black text-sm font-bold px-3 py-1 rounded-full absolute top-4 right-4">
          Unpopular
        </span>
      )}
      <h2 className="text-2xl font-semibold text-black">{title}</h2>
      <p className="text-gray-500 mb-4">{description}</p>
      <p className="text-4xl font-bold text-black mt-2">{price}</p>

      <ul className="mt-4 flex flex-col gap-2 text-left">
        {features.map((feature, index) => {
          // Determina se a feature deve ser negada (exemplo genérico para "unPopular")
          const isFeatureDenied = unPopular && index > 1; // Exemplo: as features após a segunda serão negadas
          return (
            <li key={index} className="flex items-center gap-2 text-left">
              {isFeatureDenied ? (
                <>
                  <XCircleIcon className="text-red-500 h-6 w-6" /> {/* Ícone "X" vermelho */}
                  <span className="text-red-500">{feature}</span> {/* Texto vermelho para feature negada */}
                </>
              ) : (
                <>
                  <CheckCircleIcon className="text-green-500 h-6 w-6" /> {/* Ícone "check" verde */}
                  <span className="text-black">{feature}</span> {/* Texto preto para feature permitida */}
                </>
              )}
            </li>
          );
        })}
      </ul>

      <button
        className={`${
          isPopular
            ? "bg-yellow-500 text-white"
            : unPopular
            ? "bg-red-500 text-white"
            : "bg-blue-600 text-white"
        } mt-4 p-3 rounded-lg transition duration-300 hover:bg-opacity-80 focus:outline-none`}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
