'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getTodayNepal, getTomorrowNepal, calculateRentalDays } from '@/lib/date-utils';
import { HERO_VEHICLES, HeroSlideVehicle } from '@/components/HeroSlider';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const DEFAULT_LOCATIONS = [
  'Tribhuvan International Airport (TIA), Kathmandu',
  'Thamel, Kathmandu',
  'Lazimpat, Kathmandu',
  'Jhamsikhel / Sanepa, Lalitpur',
  'Lakeside, Pokhara',
];

const AUTO_MOVE_INTERVAL = 4000; // 4 seconds per slide for lively auto-move

export default function Hero() {
  const router = useRouter();

  // Full Screen Slider State
  const [filter, setFilter] = useState<'all' | 'electric' | 'fuel'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Filtered vehicles
  const filteredVehicles = HERO_VEHICLES.filter((v) => {
    if (filter === 'all') return true;
    return v.category === filter;
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const activeVehicle: HeroSlideVehicle = filteredVehicles[currentIndex] || filteredVehicles[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredVehicles.length);
  }, [filteredVehicles.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredVehicles.length) % filteredVehicles.length);
  }, [filteredVehicles.length]);

  // Continuous auto-move through all vehicles (does not pause on mouse hover)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_MOVE_INTERVAL);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  // Search widget state
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(getTodayNepal());
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(getTomorrowNepal());
  const [returnTime, setReturnTime] = useState('10:00');
  const [searchCategory, setSearchCategory] = useState('all');
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
      category: searchCategory,
    });

    router.push(`/vehicles?${query.toString()}`);
  };

  return (
    <section className="relative bg-[#080A0D] text-white overflow-hidden">
      {/* =========================================================================
          FULL-SCREEN CINEMATIC AUTO-MOVING HERO VEHICLE SHOWCASE
          All car images automove smoothly across the full screen!
         ========================================================================= */}
      <div
        className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-Screen Vehicle Background Images with Smooth Cross-Fade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {filteredVehicles.map((vehicle, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={vehicle.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.name} - U Drive Vehicle Rental Nepal`}
                  fill
                  priority={idx < 2}
                  sizes="100vw"
                  className="object-cover object-center scale-[1.01]"
                />
              </div>
            );
          })}

          {/* Deep Cinematic Gradient Overlays for High Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/55 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/95 via-[#080A0D]/65 to-transparent max-w-4xl z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D]/80 via-transparent to-transparent h-44 z-10 pointer-events-none" />
        </div>

        {/* Top Floating Controls Bar: Fleet Filters & Live Auto Status */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080A0D]/80 backdrop-blur-md border border-[#242933] text-xs font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#FFD83D] animate-pulse" />
            <span className="font-bold text-[#FFD83D] uppercase tracking-wider text-[11px]">U Drive Nepal</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 italic hidden sm:inline">Every Ride A New Story</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Category Filter Pills (No counts) */}
            <div className="flex items-center gap-1 bg-[#080A0D]/85 backdrop-blur-md p-1 rounded-xl border border-[#242933]">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Fleet
              </button>
              <button
                type="button"
                onClick={() => setFilter('electric')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  filter === 'electric'
                    ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-[#28618F]" />
                <span>Electric</span>
              </button>
              <button
                type="button"
                onClick={() => setFilter('fuel')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  filter === 'fuel'
                    ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Fuel className="w-3 h-3 text-slate-400" />
                <span>Fuel</span>
              </button>
            </div>

            {/* Live Auto Status Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-[#080A0D]/85 backdrop-blur-md px-3 py-1 rounded-xl border border-[#242933] text-xs font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 text-[11px] font-semibold">Auto-Moving Showcase</span>
            </div>
          </div>
        </div>

        {/* Center / Left Editorial Headline */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] text-white">
              Your Next Drive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD83D] via-white to-[#FFD83D]">
                Starts Here.
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed max-w-xl">
              Find the right car for every journey. Explore premium electric vehicles and dependable fuel cars with transparent published rental packages across Nepal.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/vehicles"
                className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-xl shadow-xl shadow-[#FFD83D]/20 hover:scale-[1.02] transition-all flex items-center gap-2 group font-heading"
              >
                <span>Explore Our Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#booking-widget"
                className="px-5 sm:px-6 py-3 rounded-xl border border-white/20 hover:border-white/50 bg-black/60 backdrop-blur-md text-white font-semibold text-sm sm:text-base hover:bg-black/80 transition-colors"
              >
                Search & Reserve
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Floating Glassmorphic Vehicle Showcase Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-[#080A0D]/85 backdrop-blur-md border border-[#242933] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Active Vehicle Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                    activeVehicle.category === 'electric'
                      ? 'bg-[#FFD83D] text-[#080A0D]'
                      : 'bg-[#28618F] text-white'
                  }`}
                >
                  {activeVehicle.category === 'electric' ? (
                    <>
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Electric</span>
                    </>
                  ) : (
                    <>
                      <Fuel className="w-3 h-3" />
                      <span>{activeVehicle.fuelType}</span>
                    </>
                  )}
                </span>
                <span className="font-heading text-lg sm:text-xl font-bold text-white truncate">
                  {activeVehicle.name}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  • {activeVehicle.color}
                </span>
              </div>

              {/* Specs badges */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-[#60A5FA] bg-[#28618F]/20 border border-[#28618F]/40 px-2.5 py-1 rounded-lg">
                  {activeVehicle.rangeOrMileage}
                </span>
                <span className="text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                  {activeVehicle.groundClearance} Clearance
                </span>
                <span className="text-slate-400 hidden md:inline">
                  {activeVehicle.year}
                </span>
              </div>
            </div>

            {/* Rate & Direct CTAs */}
            <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto shrink-0 border-t lg:border-t-0 border-[#242933] pt-3 lg:pt-0">
              <div className="text-left lg:text-right">
                <span className="block text-[11px] text-slate-400">Published Rate</span>
                <span className="text-[#FFD83D] font-extrabold text-lg sm:text-xl font-heading">
                  NPR {activeVehicle.dailyRate.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ day</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/booking?vehicle=${activeVehicle.slug}`}
                  className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-[1.02] font-heading whitespace-nowrap"
                >
                  Book This Car
                </Link>
                <Link
                  href={`/vehicles/${activeVehicle.slug}`}
                  className="border border-[#242933] hover:border-slate-500 bg-white/5 text-slate-200 hover:text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Minimalist Dots Indicator */}
          <div className="flex items-center justify-center gap-1 mt-3 flex-wrap">
            {filteredVehicles.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 bg-[#FFD83D]'
                    : 'w-1 bg-[#242933] hover:bg-slate-400'
                }`}
                title={v.name}
                aria-label={`Go to ${v.name}`}
              />
            ))}
          </div>
        </div>

        {/* Left & Right Edge Navigation Chevrons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-[#FFD83D] text-white hover:text-[#080A0D] border border-white/15 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md"
          aria-label="Previous Vehicle"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-[#FFD83D] text-white hover:text-[#080A0D] border border-white/15 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md"
          aria-label="Next Vehicle"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Animated Full-Width Road Progress Line */}
        <div className="relative w-full h-1 bg-[#1A202C] overflow-hidden z-20">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-[#28618F] via-[#FFD83D] to-[#FFD83D]"
            style={{
              animation: `progressAnim ${AUTO_MOVE_INTERVAL}ms linear`,
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          INTEGRATED BOOKING SEARCH WIDGET
          Positioned directly beneath the cinematic full-screen hero canvas!
         ========================================================================= */}
      <div id="booking-widget" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-20">
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E4E5E2] text-[#080A0D]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#080A0D] tracking-tight">
                Find & Reserve Your Vehicle
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Instant availability and transparent package discounts across Kathmandu, Pokhara & airports.
              </p>
            </div>

            {/* Category Filter Tabs (No numbers) */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'electric', label: 'Electric Vehicles' },
                { id: 'fuel', label: 'Fuel Vehicles' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSearchCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    searchCategory === tab.id
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

            {/* Footer row of widget */}
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
    </section>
  );
}
