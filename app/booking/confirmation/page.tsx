import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getBookingByReference, getSiteSettings } from '@/lib/db';
import ConfirmationClient from './ConfirmationClient';

export const metadata: Metadata = {
  title: 'Booking Request Received | UDrive Rental Service Nepal',
  description: 'Your vehicle rental request has been received by UDrive Rental Service in Nepal.',
};

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  if (!ref) {
    redirect('/booking');
  }

  const booking = await getBookingByReference(ref);
  if (!booking) {
    notFound();
  }

  const settings = await getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <ConfirmationClient booking={booking} whatsappNumber={settings.whatsappNumber || ''} />
    </div>
  );
}
