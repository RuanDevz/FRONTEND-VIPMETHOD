import React from 'react';
import { Search, Calendar, LayoutGrid, SortDesc } from 'lucide-react';
import { Category } from './types/index';

interface SearchFiltersProps {
  theme: string;
  searchName: string;
  selectedMonth: string;
  selectedCategory: string;
  sortOption: string;
  categories: Category[];
  months: Array<{ value: string; label: string }>;
  onSearchChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  theme,
  searchName,
  selectedMonth,
  selectedCategory,
  sortOption,
  categories,
  months,
  onSearchChange,
  onMonthChange,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl p-8 mb-12 border`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-400'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-gray-200'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <LayoutGrid className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-gray-200'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <SortDesc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-gray-200'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          >
            <option value="mostRecent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};