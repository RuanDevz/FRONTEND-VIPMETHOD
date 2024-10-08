import React from "react";
import Button from "../Button";

type PlanCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
};

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, features, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white p-10 shadow-lg rounded-lg text-center flex flex-col justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500">{description}</p>
      <p className="text-4xl font-bold text-black mt-2">{price}</p>
      <ul className="text-left list-disc list-inside mt-4 flex flex-col gap-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button className="mt-4 p-3" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default PlanCard;
