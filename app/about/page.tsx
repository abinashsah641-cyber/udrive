import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Car, Zap, Fuel, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About UDrive Rental Service | Vehicle Rentals in Nepal',
  description:
    'Learn about UDrive Rental Service, offering verified electric and fuel car rentals in Nepal with transparent package rates.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Our Company
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          About UDrive Rental Service
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
          UDrive Rental Service is a vehicle rental service in Nepal, offering customers a diverse fleet of modern electric vehicles and dependable everyday fuel cars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-electric/20 text-midnight flex items-center justify-center font-bold">
            <Zap className="w-5 h-5 text-midnight" />
          </div>
          <h3 className="font-heading text-lg font-bold text-midnight">EV Leadership in Nepal</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            With 13 electric vehicles spanning BYD, Deepal, Omoda, Naami, and Ridard, we provide clean, quiet, and economical mobility across Nepal.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-electric/20 text-midnight flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-midnight" />
          </div>
          <h3 className="font-heading text-lg font-bold text-midnight">Transparent Pricing</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We publish every rate openly in Nepalese Rupees (NPR). Customers receive documented discounts on weekly, fortnight, and monthly bookings.
          </p>
        </div>
      </div>

      <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200/80 space-y-4">
        <h3 className="font-heading text-xl font-bold text-midnight">Our Fleet Commitment</h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Every vehicle in our catalog reflects verified technical information, including ground clearance, fuel or EV powertrain type, and model year. We do not invent vehicle capabilities and ensure our customers have clear expectations before setting off on Nepal’s roads.
        </p>
        <div className="pt-2">
          <Link
            href="/vehicles"
            className="inline-block bg-midnight hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all font-heading"
          >
            Explore the 19 Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
}
