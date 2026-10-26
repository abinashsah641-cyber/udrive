'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeroSlider from '@/components/HeroSlider';
import { getTodayNepal, getTomorrowNepal, calculateRentalDays } from '@/lib/date-utils';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Zap,
  Fuel,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Search,
  Sparkles,
} from 'lucide-react';

const DEFAULT_LOCATIONS = [
  'Tribhuvan International Airport (TIA), Kathmandu',
  'Thamel, Kathmandu',
  'Lazimpat, Kathmandu',
  'Jhamsikhel / Sanepa, Lalitpur',
  'Lakeside, Pokhara',
];

export default function Hero() {
  const router = useRouter();

  // Search widget state
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(getTodayNepal());
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(getTomorrowNepal());
  const [returnTime, setReturnTime] = useState('10:00');
  const [category, setCategory] = useState('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live duration calculation
  const { days: rentalDays, error: dateError } = calculateRentalDays(
    pickupDate,
    pickupTime,
    returnDate,
    returnTime
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) {
      setErrorMessage(dateError);
      return;
    }
    setErrorMessage(null);

    const query = new URLSearchParams({
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      category,
    });

    router.push(`/vehicles?${query.toString()}`);
  };

  return (
    <section className="relative bg-[#080A0D] text-white overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Architectural Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#28618F]/15 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-[#FFD83D]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F7F7F4] via-transparent to-transparent opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Layout: Copy + Real 19-Vehicle Showcase Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Hero Content Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151A24] border border-[#242933] text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#FFD83D] animate-pulse" />
              <span className="font-semibold text-[#FFD83D] uppercase tracking-wider text-[11px]">U Drive Nepal</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 italic">Every Ride A New Story</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Your Next Drive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD83D] via-white to-[#FFD83D]">
                Starts Here.
              </span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              Find the right car for every journey. Explore premium electric vehicles and reliable everyday cars with transparent rental pricing across Nepal.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/vehicles"
                className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-base px-7 py-3.5 rounded-xl shadow-xl shadow-[#FFD83D]/15 hover:scale-[1.02] transition-all flex items-center gap-2 group font-heading"
              >
                <span>Explore Fleet (19 Models)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#booking-widget"
                className="px-6 py-3.5 rounded-xl border border-[#242933] hover:border-slate-500 bg-[#12161F]/80 text-slate-200 hover:text-white font-semibold text-base transition-colors"
              >
                Book Your Ride
              </a>
            </div>

            {/* Value Indicators */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#242933] text-xs text-slate-400">
              <div>
                <span className="block text-white font-bold text-base font-heading">NPR 5,000+</span>
                <span>Clear published rates</span>
              </div>
              <div>
                <span className="block text-white font-bold text-base font-heading">Up to 15% Off</span>
                <span>Weekly & monthly savings</span>
              </div>
              <div>
                <span className="block text-white font-bold text-base font-heading">0 Hidden Fees</span>
                <span>Transparent security deposit</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Right: Interactive Auto-Scroll Vehicle Slider */}
          <div className="lg:col-span-6 relative">
            <HeroSlider />
          </div>
        </div>

        {/* Embedded Real Booking Search Widget */}
        <div id="booking-widget" className="relative scroll-mt-24">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E4E5E2] text-[#080A0D]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#080A0D] tracking-tight">
                  Find & Reserve Your Vehicle
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Instant availability and transparent package discounts in Nepal.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'all', label: 'All Fleet (19)' },
                  { id: 'electric', label: 'Electric Vehicles (13)' },
                  { id: 'fuel', label: 'Fuel / Manual (6)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      category === tab.id
                        ? 'bg-[#080A0D] text-[#FFD83D] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields Grid */}
            <form onSubmit={handleSearchSubmit} className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pickup Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#28618F]" />
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-[#F7F7F4] hover:bg-slate-100/70 border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D] transition-colors"
                  >
                    {DEFAULT_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Return Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Return Location
                  </label>
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full bg-[#F7F7F4] hover:bg-slate-100/70 border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D] transition-colors"
                  >
                    {DEFAULT_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup Date & Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#080A0D]" />
                    Pickup Date & Time
                  </label>
                  <div className="grid grid-cols-7 gap-1">
                    <input
                      type="date"
                      value={pickupDate}
                      min={getTodayNepal()}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="col-span-4 bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                      required
                    />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="col-span-3 bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-2 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                      required
                    />
                  </div>
                </div>

                {/* Return Date & Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#080A0D]" />
                    Return Date & Time
                  </label>
                  <div className="grid grid-cols-7 gap-1">
                    <input
                      type="date"
                      value={returnDate}
                      min={pickupDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="col-span-4 bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                      required
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="col-span-3 bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-2 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Error Message if date invalid */}
              {(errorMessage || dateError) && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage || dateError}</span>
                </div>
              )}

              {/* Footer row of widget: duration badge + Find My Car button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-mono">
                    Estimated Duration: {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                  </span>
                  {rentalDays >= 30 ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      ★ 15% Monthly Package discount applied
                    </span>
                  ) : rentalDays >= 15 ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      ★ 10% 15-day Package discount applied
                    </span>
                  ) : rentalDays >= 7 ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      ★ 5% Weekly Package discount applied
                    </span>
                  ) : (
                    <span>Standard daily calculation</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#FFD83D]/15 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-heading"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Find My Car</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
