import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import type { SearchFilters } from '../types';
import { categories, years, batches } from '../data/projects';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onQueryChange: (query: string) => void;
  resultsCount?: number;
  totalCount?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFiltersChange,
  onQueryChange,
  resultsCount,
  totalCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.query);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onQueryChange(query);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({ [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      category: 'all',
      year: 'all',
      batch: 'all',
      status: 'all',
    });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.year !== 'all') count++;
    if (filters.batch !== 'all') count++;
    if (filters.status !== 'all') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleQueryChange}
          placeholder="Search projects by title, description, tags, team members, or supervisor..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
        />
      </div>

      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Results Count */}
        {resultsCount !== undefined && totalCount !== undefined && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {resultsCount} of {totalCount} projects
          </div>
        )}

        {/* Clear Filters */}
        {(activeFiltersCount > 0 || filters.query) && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Year
            </label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Batch
            </label>
            <select
              value={filters.batch}
              onChange={(e) => handleFilterChange('batch', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
            >
              <option value="all">All Batches</option>
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Proposal">Proposal</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;