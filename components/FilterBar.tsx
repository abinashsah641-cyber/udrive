'use client';

import React from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  totalCount: number;
  filteredCount: number;
  category: string;
  setCategory: (val: string) => void;
  bodyStyle: string;
  setBodyStyle: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  totalCount,
  filteredCount,
  category,
  setCategory,
  bodyStyle,
  setBodyStyle,
  searchQuery,
  setSearchQuery,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onReset,
}: FilterBarProps) {
  const isFiltered =
    category !== 'all' ||
    bodyStyle !== 'all' ||
    searchQuery.trim() !== '' ||
    maxPrice < 20000 ||
    sortBy !== 'featured';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      {/* Top Search & Results Counter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by model name, color, year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-midnight transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Counter & Sort dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-midnight">{filteredCount}</strong> of {totalCount} cars
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-midnight"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Newest Year</option>
          </select>

          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills Row */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Power:
          </span>
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'electric', label: 'Electric' },
            { id: 'fuel', label: 'Fuel / Petrol' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setCategory(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                category === pill.id
                  ? 'bg-midnight text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Body Style Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Style:
          </span>
          {[
            { id: 'all', label: 'All Styles' },
            { id: 'SUV', label: 'SUV' },
            { id: 'Hatchback', label: 'Hatchback' },
            { id: 'Pickup', label: 'Pickup Truck' },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setBodyStyle(style.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bodyStyle === style.id
                  ? 'bg-electric text-midnight shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Daily Price Slider */}
        <div className="flex items-center gap-2 text-xs text-slate-600 min-w-[200px]">
          <span className="font-semibold text-slate-500 whitespace-nowrap">
            Max Daily:
          </span>
          <input
            type="range"
            min="5000"
            max="18000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-midnight"
          />
          <span className="font-mono font-bold text-midnight whitespace-nowrap">
            NPR {maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
