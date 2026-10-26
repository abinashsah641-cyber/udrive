import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import VehiclesClient from './VehiclesClient';

export const metadata: Metadata = {
  title: 'All Vehicles Fleet | U Drive Nepal',
  description:
    'Browse our complete fleet of electric vehicles and fuel cars with transparent daily, weekly, 15-day, and 30-day rates in Nepal.',
};



export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    bodyStyle?: string;
    search?: string;
    pickupLocation?: string;
    returnLocation?: string;
    pickupDate?: string;
    returnDate?: string;
  }>;
}) {
  const params = await searchParams;
  const vehicles = await getAllVehicles({ onlyPublished: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#28618F] bg-[#28618F]/10 px-3 py-1 rounded-full font-mono">
          U Drive Nepal Fleet
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#080A0D] tracking-tight mt-3">
          Complete Vehicle Fleet
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Explore all 19 verified vehicle models with transparent daily rates and automatic package discounts for extended trips in Nepal.
        </p>
      </div>

      {/* Interactive Vehicles Client */}
      <VehiclesClient
        initialVehicles={vehicles}
        initialCategory={params.category || 'all'}
        initialBodyStyle={params.bodyStyle || 'all'}
        initialSearch={params.search || ''}
        tripInfo={{
          pickupLocation: params.pickupLocation,
          returnLocation: params.returnLocation,
          pickupDate: params.pickupDate,
          returnDate: params.returnDate,
        }}
      />
    </div>
  );
}
