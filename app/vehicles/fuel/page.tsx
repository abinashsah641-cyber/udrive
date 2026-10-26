import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import VehiclesClient from '../VehiclesClient';

export const metadata: Metadata = {
  title: 'Manual & Fuel Vehicles | UDrive Rental Service Nepal',
  description:
    'Reliable petrol and diesel rental vehicles in Nepal, including Toyota Hilux 4x4, Hyundai i20, VW Polo, and Kia Sonet.',
};



export default async function FuelVehiclesPage() {
  const vehicles = await getAllVehicles({ category: 'fuel', onlyPublished: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">
          Everyday Practicality
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          Manual & Fuel Vehicles
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Dependable petrol and diesel options for everyday travel, mountain terrain, and remote off-road journeys across Nepal.
        </p>
      </div>

      <VehiclesClient initialVehicles={vehicles} initialCategory="fuel" />
    </div>
  );
}
