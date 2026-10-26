import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | UDrive Rental Service Nepal',
  description: 'Privacy policy and data handling guidelines for UDrive Rental Service.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6 text-sm text-slate-700 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Legal Template
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <section className="space-y-3 pt-4 border-t border-slate-200">
        <h2 className="font-heading text-lg font-bold text-midnight">1. Information We Collect</h2>
        <p>
          UDrive Rental Service collects only personal information necessary to process vehicle rental requests in Nepal. This includes your full name, telephone contact number, optional email address, pickup and return locations, and trip schedule details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">2. Use of Your Information</h2>
        <p>
          We use your information exclusively to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>Verify vehicle availability and schedule pickup windows.</li>
          <li>Communicate regarding your booking status via WhatsApp, phone, or email.</li>
          <li>Comply with traffic and transport regulatory requirements in Nepal.</li>
        </ul>
        <p>
          We do not sell, rent, or lease customer contact lists to third-party marketing companies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">3. Data Security & Storage</h2>
        <p>
          Customer booking requests and references are stored securely using access-restricted database policies. Administrative access requires authenticated credentials.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-midnight">4. Contacting Us</h2>
        <p>
          If you have questions regarding your data or wish to request deletion of past booking records, please contact our support desk via our official contact channels.
        </p>
      </section>
    </div>
  );
}
