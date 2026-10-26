import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db';
import SettingsManagerClient from './SettingsManagerClient';

export const metadata: Metadata = {
  title: 'Settings | UDrive Admin',
};



export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Configuration
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-midnight tracking-tight mt-1">
          Business & Site Settings
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Configure official WhatsApp phone number, contact details, social links, and pickup hubs across Nepal.
        </p>
      </div>

      <SettingsManagerClient initialSettings={settings} />
    </div>
  );
}
