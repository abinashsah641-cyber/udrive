import React from 'react';
import { Metadata } from 'next';
import { getAllBookings, getSiteSettings } from '@/lib/db';
import BookingsManagerClient from './BookingsManagerClient';

export const metadata: Metadata = {
  title: 'Booking Requests | UDrive Admin',
};



export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Reservations Desk
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-midnight tracking-tight mt-1">
          Customer Booking Requests
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Review inbound rental requests, inspect customer itineraries, verify vehicle availability, and manage booking statuses.
        </p>
      </div>

      <BookingsManagerClient
        initialBookings={bookings}
        whatsappNumber={settings.whatsappNumber || ''}
      />
    </div>
  );
}
