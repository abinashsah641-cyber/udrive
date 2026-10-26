'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types';
import { formatNPR, calculateRentalPricing } from '@/lib/pricing';
import { getTodayNepal, getTomorrowNepal, calculateRentalDays } from '@/lib/date-utils';
import {
  Zap,
  Fuel,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Navigation,
  Info,
  Car,
} from 'lucide-react';

const DEFAULT_LOCATIONS = [
  'Tribhuvan International Airport (TIA), Kathmandu',
  'Thamel, Kathmandu',
  'Lazimpat, Kathmandu',
  'Jhamsikhel / Sanepa, Lalitpur',
  'Lakeside, Pokhara',
];

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  similarVehicles: Vehicle[];
}

export default function VehicleDetailClient({
  vehicle,
  similarVehicles,
}: VehicleDetailClientProps) {
  const router = useRouter();

  // Booking widget state
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(getTodayNepal());
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(getTomorrowNepal());
  const [returnTime, setReturnTime] = useState('10:00');

  // Quick duration presets (1 day, 7 days, 15 days, 30 days)
  const [activeDurationPreset, setActiveDurationPreset] = useState<number | null>(null);

  // Calculate live rental days and pricing
  const { days: rentalDays, error: dateError } = calculateRentalDays(
    pickupDate,
    pickupTime,
    returnDate,
    returnTime
  );

  const effectiveDays = activeDurationPreset || rentalDays;
  const pricing = calculateRentalPricing(vehicle, effectiveDays);

  const isElectric = vehicle.category === 'electric';
  const isAvailable = vehicle.isAvailable && vehicle.maintenanceStatus === 'operational';

  const handleApplyPreset = (days: number) => {
    setActiveDurationPreset(days);
    const pDate = new Date(pickupDate);
    pDate.setDate(pDate.getDate() + days);
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    setReturnDate(formatter.format(pDate));
  };

  const handleProceedToBooking = () => {
    const query = new URLSearchParams({
      vehicle: vehicle.id,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      days: effectiveDays.toString(),
    });
    router.push(`/booking?${query.toString()}`);
  };

  return (
    <div className="space-y-16">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-midnight">
          Home
        </Link>
        <span>/</span>
        <Link href="/vehicles" className="hover:text-midnight">
          Vehicles
        </Link>
        <span>/</span>
        <Link
          href={isElectric ? '/vehicles/electric' : '/vehicles/fuel'}
          className="hover:text-midnight"
        >
          {isElectric ? 'Electric' : 'Fuel'}
        </Link>
        <span>/</span>
        <span className="text-midnight font-bold">{vehicle.name}</span>
      </nav>

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (Images, Specs, Details) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual Display */}
          <div className="relative rounded-3xl bg-midnight border border-slate-800 shadow-xl overflow-hidden aspect-[16/10]">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                  isElectric
                    ? 'bg-electric text-midnight shadow-md shadow-electric/20'
                    : 'bg-amber-400 text-midnight shadow-md shadow-amber-400/20'
                }`}
              >
                {isElectric ? <Zap className="w-3.5 h-3.5 fill-current" /> : <Fuel className="w-3.5 h-3.5" />}
                {isElectric ? 'Electric Vehicle' : 'Fuel Vehicle'}
              </span>

              <span className="bg-slate-900/80 backdrop-blur-sm text-slate-200 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-700">
                {vehicle.bodyStyle}
              </span>

              <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 text-xs font-mono px-2.5 py-1 rounded-md border border-slate-700">
                {vehicle.year} Model
              </span>
            </div>

            {/* Availability pill */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border ${
                  isAvailable
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                  }`}
                />
                {isAvailable ? 'Available for Booking' : 'Currently Unavailable'}
              </span>
            </div>

            {/* Real Vehicle Photograph */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={vehicle.image || '/images/vehicles/fallback-car.svg'}
                alt={`${vehicle.name} ${vehicle.color}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
            </div>
          </div>

          {/* Vehicle Identity & Overview */}
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Registered Color: <strong className="text-slate-800">{vehicle.color}</strong> • Year: {vehicle.year}
            </p>

            {vehicle.description && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                {vehicle.description}
              </p>
            )}

            {/* Verification Note if present */}
            {vehicle.verificationNote && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 mt-3">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Catalog Verification Note:</strong>
                  <span>{vehicle.verificationNote}</span>
                </div>
              </div>
            )}
          </div>

          {/* Official Rate Architecture Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-midnight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-midnight" />
              <span>Published Rates & Official Packages</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Daily</span>
                <span className="font-heading text-lg font-bold text-midnight block mt-1">
                  {formatNPR(vehicle.dailyRate)}
                </span>
                <span className="text-[10px] text-slate-400">per 24 hours</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">7 Days</span>
                <span className="font-heading text-lg font-bold text-midnight block mt-1">
                  {formatNPR(vehicle.weeklyRate)}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">5% Discounted</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">15 Days</span>
                <span className="font-heading text-lg font-bold text-midnight block mt-1">
                  {formatNPR(vehicle.fifteenDayRate)}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">10% Discounted</span>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 block uppercase font-bold">30 Days</span>
                <span className="font-heading text-lg font-bold text-emerald-700 block mt-1">
                  {formatNPR(vehicle.monthlyRate)}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">15% Max Saving</span>
              </div>
            </div>
          </div>

          {/* Verified Technical Specs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-midnight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-midnight" />
              <span>Verified Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Ground Clearance</span>
                <strong className="text-midnight text-sm font-heading block mt-0.5">
                  {vehicle.groundClearance}
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">
                  {isElectric ? 'Certified EV Range' : 'Fuel Mileage'}
                </span>
                <strong className="text-midnight text-sm font-heading block mt-0.5">
                  {vehicle.rangeVerified ? vehicle.rangeOrMileage : 'Pending Confirmation'}
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Category & Style</span>
                <strong className="text-midnight text-sm font-heading block mt-0.5">
                  {vehicle.category === 'electric' ? 'Electric' : 'Fuel'} {vehicle.bodyStyle}
                </strong>
              </div>

              {vehicle.specs?.map((spec, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">{spec.label}</span>
                  <strong className="text-midnight text-sm font-heading block mt-0.5">
                    {spec.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Booking Calculator Sidebar (Sticky) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Starting From
                </span>
                <div className="font-heading text-3xl font-extrabold text-midnight">
                  {formatNPR(vehicle.dailyRate)}
                  <span className="text-xs font-normal text-slate-500"> / day</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-md bg-electric/20 text-midnight text-xs font-bold font-mono">
                  Up to 15% OFF
                </span>
              </div>
            </div>

            {/* Quick Duration Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Quick Duration Presets
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 7, 15, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleApplyPreset(days)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      effectiveDays === days
                        ? 'bg-midnight text-white border-midnight'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Pickup & Return Form */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-midnight" />
                  Pickup & Drop-off Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => {
                    setPickupLocation(e.target.value);
                    setReturnLocation(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                >
                  {DEFAULT_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    min={getTodayNepal()}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      setActiveDurationPreset(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    min={pickupDate}
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                      setActiveDurationPreset(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Calculated Rental Duration</span>
                <span className="font-mono text-midnight">
                  {effectiveDays} {effectiveDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              {/* Line Items */}
              <div className="space-y-1 pt-2 border-t border-slate-200 text-xs">
                {pricing.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-600">
                    <span>
                      {item.count > 1 ? `${item.count} × ` : ''}
                      {item.label}
                    </span>
                    <span className="font-medium text-slate-900">{formatNPR(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              {/* Savings callout if applicable */}
              {pricing.savings > 0 && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span>Transparent Package Saving ({pricing.savingsPercent}%)</span>
                  <span>- {formatNPR(pricing.savings)}</span>
                </div>
              )}

              {/* Total Subtotal */}
              <div className="pt-2 border-t border-slate-300 flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Estimated Rental Total
                </span>
                <span className="font-heading text-2xl font-extrabold text-midnight">
                  {formatNPR(pricing.subtotal)}
                </span>
              </div>
            </div>

            {/* Booking Action */}
            <button
              type="button"
              onClick={handleProceedToBooking}
              disabled={!isAvailable}
              className={`w-full py-4 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 font-heading ${
                isAvailable
                  ? 'bg-electric hover:bg-electric-hover text-midnight shadow-electric/20 hover:scale-[1.01]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{isAvailable ? 'Proceed to Booking Request' : 'Vehicle Unavailable'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400 leading-relaxed">
              No immediate card payment required. Submitting reserves your place while our team confirms vehicle preparation in Kathmandu.
            </p>
          </div>
        </div>
      </div>

      {/* Similar Available Vehicles */}
      {similarVehicles.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl font-bold text-midnight">
              Similar Available Vehicles
            </h3>
            <Link
              href="/vehicles"
              className="text-xs font-bold text-midnight hover:text-slate-600 flex items-center gap-1"
            >
              <span>View Full Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-24 h-16 bg-midnight rounded-xl overflow-hidden p-1 flex items-center justify-center shrink-0">
                  <img
                    src={v.image || '/images/vehicles/fallback-car.svg'}
                    alt={v.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm font-bold text-midnight truncate">{v.name}</h4>
                  <p className="text-xs text-slate-500">{v.color}</p>
                  <p className="text-xs font-bold text-midnight mt-1">
                    {formatNPR(v.dailyRate)} <span className="font-normal text-[10px]">/ day</span>
                  </p>
                </div>
                <Link
                  href={`/vehicles/${v.slug}`}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 text-slate-700"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
