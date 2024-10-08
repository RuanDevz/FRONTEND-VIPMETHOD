import React from "react";

interface TabsProps {
  activeTab: "free" | "vip";
  setActiveTab: React.Dispatch<React.SetStateAction<"free" | "vip">>;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("free")}
        className={`p-2 ${
          activeTab === "free" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        Free Content
      </button>
      <button
        onClick={() => setActiveTab("vip")}
        className={`p-2 ${
          activeTab === "vip" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        VIP Content
      </button>
    </div>
  );
};

export default Tabs;
