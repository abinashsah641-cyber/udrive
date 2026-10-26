import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import VehiclesManagerClient from './VehiclesManagerClient';

export const metadata: Metadata = {
  title: 'Fleet Management | UDrive Admin',
};



export default async function AdminVehiclesPage() {
  const vehicles = await getAllVehicles({ all: true } as any);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Inventory Control
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-midnight tracking-tight mt-1">
          Vehicle Fleet Management
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Review and edit pricing packages, ground clearances, operational statuses, and visibility for all 19 fleet vehicles.
        </p>
      </div>

      <VehiclesManagerClient initialVehicles={vehicles} />
    </div>
  );
}
