'use client';

import React, { useState, useMemo } from 'react';
import { Vehicle } from '@/types';
import VehicleCard from '@/components/VehicleCard';
import FilterBar from '@/components/FilterBar';
import { Zap, Fuel, Car, Info } from 'lucide-react';

interface VehiclesClientProps {
  initialVehicles: Vehicle[];
  initialCategory?: string;
  initialBodyStyle?: string;
  initialSearch?: string;
  tripInfo?: {
    pickupLocation?: string;
    returnLocation?: string;
    pickupDate?: string;
    returnDate?: string;
  };
}

export default function VehiclesClient({
  initialVehicles,
  initialCategory = 'all',
  initialBodyStyle = 'all',
  initialSearch = '',
  tripInfo,
}: VehiclesClientProps) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [bodyStyle, setBodyStyle] = useState<string>(initialBodyStyle);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    let result = [...initialVehicles];

    // Category
    if (category !== 'all') {
      result = result.filter((v) => v.category === category);
    }

    // Body Style
    if (bodyStyle !== 'all') {
      result = result.filter((v) => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase());
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.color.toLowerCase().includes(q) ||
          v.bodyStyle.toLowerCase().includes(q) ||
          v.year.toString().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }

    // Max Price
    result = result.filter((v) => v.dailyRate <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        result.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [initialVehicles, category, bodyStyle, searchQuery, maxPrice, sortBy]);

  const handleReset = () => {
    setCategory('all');
    setBodyStyle('all');
    setSearchQuery('');
    setMaxPrice(20000);
    setSortBy('featured');
  };

  return (
    <div className="space-y-8">
      {/* Trip notification if dates were passed from Hero */}
      {tripInfo?.pickupDate && tripInfo?.returnDate && (
        <div className="p-4 rounded-2xl bg-midnight text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-electric animate-ping" />
            <span className="text-xs sm:text-sm font-medium">
              Searching availability for: <strong>{tripInfo.pickupDate}</strong> to{' '}
              <strong>{tripInfo.returnDate}</strong> ({tripInfo.pickupLocation || 'Kathmandu'})
            </span>
          </div>
          <a
            href="/#booking-widget"
            className="text-xs font-bold text-electric hover:underline underline-offset-4"
          >
            Adjust Dates
          </a>
        </div>
      )}

      {/* Filter and Control Bar */}
      <FilterBar
        totalCount={initialVehicles.length}
        filteredCount={filteredVehicles.length}
        category={category}
        setCategory={setCategory}
        bodyStyle={bodyStyle}
        setBodyStyle={setBodyStyle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleReset}
      />

      {/* Vehicle Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm my-12">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-midnight">
            No matching vehicles found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any vehicle matching your current filter criteria. Try broadening your price range or resetting filters.
          </p>
          <button
            onClick={handleReset}
            className="bg-midnight hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
