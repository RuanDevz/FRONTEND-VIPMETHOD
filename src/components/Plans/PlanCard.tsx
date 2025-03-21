import React, { useState } from "react";
import { CheckCircle, XCircle, Crown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => Promise<void>;
  isPopular: boolean;
  unPopular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl overflow-hidden ${
        isPopular
          ? "bg-gradient-to-b from-yellow-50 to-yellow-100 border-2 border-yellow-300 transform scale-105"
          : unPopular
          ? "bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200"
          : "bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-200"
      } shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
          >
            <Crown className="w-3.5 h-3.5" />
            MOST POPULAR
          </motion.div>
        </div>
      )}

      <div className="p-8">
        <div className="flex flex-col items-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isPopular ? "text-yellow-900" : unPopular ? "text-gray-700" : "text-blue-900"
          }`}>
            {title}
          </h2>
          <p className="text-gray-600 text-sm text-center">{description}</p>
          <div className="mt-4 flex items-baseline">
            <span className={`text-4xl font-bold ${
              isPopular ? "text-yellow-900" : unPopular ? "text-gray-900" : "text-blue-900"
            }`}>
              {price}
            </span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => {
            const isFeatureDenied = unPopular && index > 0;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-3 ${
                  isFeatureDenied ? "opacity-50" : ""
                }`}
              >
                {isFeatureDenied ? (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    isPopular ? "text-yellow-500" : "text-green-500"
                  }`} />
                )}
                <span className={`text-sm ${
                  isFeatureDenied ? "text-gray-400 line-through" : "text-gray-700"
                }`}>
                  {feature}
                </span>
              </motion.li>
            );
          })}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading
              ? "opacity-75 cursor-not-allowed"
              : isPopular
              ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
              : unPopular
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            buttonText
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlanCard;