import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import VehiclesClient from '../VehiclesClient';

export const metadata: Metadata = {
  title: 'Electric Vehicles Fleet | UDrive Rental Service Nepal',
  description:
    'Rent premium electric vehicles in Nepal. 13 all-electric SUVs, hatchbacks, and pickups with up to 485 km range and transparent rental packages.',
};



export default async function ElectricVehiclesPage() {
  const vehicles = await getAllVehicles({ category: 'electric', onlyPublished: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-mono">
          Zero-Emission Mobility
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          Electric Vehicles Fleet
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Quiet, high-torque electric cars and SUVs from BYD, Deepal, Omoda, Naami, and more. Equipped for city convenience and long-distance highway travel across Nepal.
        </p>
      </div>

      <VehiclesClient initialVehicles={vehicles} initialCategory="electric" />
    </div>
  );
}
