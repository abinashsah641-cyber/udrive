import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Rental Packages | UDrive Rental Service Nepal',
  description:
    'Transparent vehicle rental rates in Nepal with verified daily, 7-day, 15-day, and 30-day package pricing in Nepalese Rupees (NPR).',
};



export default async function PricingPage() {
  const vehicles = await getAllVehicles({ onlyPublished: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Transparent Rates in NPR
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          Vehicle Pricing & Rental Packages
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Compare our official daily rates alongside discounted 7-day (-5%), 15-day (-10%), and 30-day (-15%) rental packages. No hidden administration fees.
        </p>
      </div>

      <PricingClient vehicles={vehicles} />
    </div>
  );
}
