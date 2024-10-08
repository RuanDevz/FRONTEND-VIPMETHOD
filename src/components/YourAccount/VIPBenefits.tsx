import React from "react";

type VIPBenefitsProps = {
  vipExpirationDate: number;
  calculateDaysLeft: (expirationDate: number) => number;
};

const VIPBenefits: React.FC<VIPBenefitsProps> = ({ vipExpirationDate, calculateDaysLeft }) => (
  <div>
    <h2 className="text-lg font-semibold">Benefits:</h2>
    <ul className="list-disc list-inside">
      <li>Access to 3 years of content with no ads.</li>
      <li>Access to all content before it's posted for free users.</li>
      <li>VIP badge on our Discord community.</li>
      <li>Early access to exclusive content and special newsletters.</li>
      <li>Priority support for viewing and accessing all content.</li>
      <li>Exclusive Q&A sessions, webinars, and personalized content.</li>
    </ul>
    <p className="mt-4">
      <strong>Days until VIP expiration:</strong>{" "}
      {calculateDaysLeft(vipExpirationDate)} days
    </p>
  </div>
);

export default VIPBenefits;
