import React from "react";
import SelectInput from "../SelectInput";

interface FilterControlsProps {
  searchName: string;
  selectedMonth: string;
  sortOption: string;
  setSearchName: (name: string) => void;
  setSelectedMonth: (month: string) => void;
  setSortOption: (option: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchName,
  selectedMonth,
  sortOption,
  setSearchName,
  setSelectedMonth,
  setSortOption,
}) => {
  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const sortOptions = [
    { value: "mostRecent", label: "Most Recent" },
    { value: "oldest", label: "Oldest" },
  ];

  return (
    <div className="filter-controls mb-8 max-w-[600px] mx-auto flex flex-col md:flex-row md:space-x-4 items-center justify-around mt-8 p-4">
      {/* Search Name Input */}
      <div className="mb-4 w-full md:w-1/3">
        <label className="block text-gray-700 font-medium mb-2">
          Search by Name
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search by name"
        />
      </div>

      {/* Filter by Month Select */}
      <div className="mb-4 w-full md:w-1/3">
        <SelectInput
          label="Filter by Month"
          value={selectedMonth}
          onChange={(e: any) => setSelectedMonth(e.target.value)}
          options={monthOptions}
        />
      </div>

      {/* Sort by Select */}
      <div className="mb-4 w-full md:w-1/3">
        <SelectInput
          label="Sort by"
          value={sortOption}
          onChange={(e: any) => setSortOption(e.target.value)}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

export default FilterControls;
