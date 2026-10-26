import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/db';
import BookingWizard from './BookingWizard';

export const metadata: Metadata = {
  title: 'Book a Car | UDrive Rental Service Nepal',
  description:
    'Submit your vehicle rental request in Nepal. Transparent daily and package rates with fast confirmation from UDrive.',
};



export default async function BookingPage() {
  const vehicles = await getAllVehicles({ onlyPublished: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          UDrive Reservation Desk
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight mt-1">
          Vehicle Rental Booking Request
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Select your dates, car model, and contact preferences. Receive transparent rates with no online payment needed to submit.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading booking form...</div>}>
        <BookingWizard vehicles={vehicles} />
      </Suspense>
    </div>
  );
}
