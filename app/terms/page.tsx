import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | UDrive Rental Service Nepal',
  description: 'Rental guidelines and terms of service for UDrive Rental Service in Nepal.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6 text-sm text-slate-700 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Rental Guidelines
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight mt-1">
          Rental Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <section className="space-y-3 pt-4 border-t border-slate-200">
        <h2 className="font-heading text-lg font-bold text-midnight">1. Booking Request Nature</h2>
        <p>
          Submitting a booking form on the UDrive website represents a reservation request. An approved booking reference does not become a confirmed handover until our operations team verifies vehicle readiness and confirms the handover directly with the renter.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">2. Driver Eligibility & Documentation</h2>
        <p>
          The primary driver must be at least 21 years of age and hold a valid driver’s license recognized in Nepal (Nepalese Driver’s License or an International Driving Permit). A valid government ID or passport must be presented at vehicle collection.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">3. Pricing & Rental Packages</h2>
        <p>
          All published rates are in Nepalese Rupees (NPR). The standard 24-hour cycle begins at the scheduled pickup time. Rental packages (7-day, 15-day, and 30-day rates) include predetermined discounts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">4. Vehicle Operation in Nepal</h2>
        <p>
          Vehicles must be operated strictly in accordance with Nepal traffic regulations. Off-road driving in unauthorized riverbeds or restricted border regions is prohibited unless explicitly agreed upon in writing for 4x4 vehicles.
        </p>
      </section>
    </div>
  );
}
