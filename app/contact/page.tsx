import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | UDrive Rental Service Nepal',
  description:
    'Contact UDrive Rental Service in Nepal. Find pickup hubs in Kathmandu and Pokhara, or reach us on Facebook and WhatsApp.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return <ContactClient settings={settings} />;
}
