'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Vehicle, PricingCalculation } from '@/types';
import { formatNPR, calculateRentalPricing } from '@/lib/pricing';
import { getTodayNepal, getTomorrowNepal, calculateRentalDays } from '@/lib/date-utils';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  Fuel,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

const DEFAULT_LOCATIONS = [
  'Tribhuvan International Airport (TIA), Kathmandu',
  'Thamel, Kathmandu',
  'Lazimpat, Kathmandu',
  'Jhamsikhel / Sanepa, Lalitpur',
  'Lakeside, Pokhara',
];

interface BookingWizardProps {
  vehicles: Vehicle[];
}

export default function BookingWizard({ vehicles }: BookingWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Multi-step: 1 = Trip Details, 2 = Choose Car, 3 = Customer Info, 4 = Review & Submit
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Trip details
  const [pickupLocation, setPickupLocation] = useState(
    searchParams.get('pickupLocation') || DEFAULT_LOCATIONS[0]
  );
  const [returnLocation, setReturnLocation] = useState(
    searchParams.get('returnLocation') || DEFAULT_LOCATIONS[0]
  );
  const [pickupDate, setPickupDate] = useState(searchParams.get('pickupDate') || getTodayNepal());
  const [pickupTime, setPickupTime] = useState(searchParams.get('pickupTime') || '10:00');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || getTomorrowNepal());
  const [returnTime, setReturnTime] = useState(searchParams.get('returnTime') || '10:00');

  // Step 2: Selected Vehicle
  const initialVehicleId = searchParams.get('vehicle');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicleId || (vehicles.length > 0 ? vehicles[0].id : '')
  );

  // Step 3: Customer Information
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Calculated Days
  const { days: rentalDays, error: dateError } = calculateRentalDays(
    pickupDate,
    pickupTime,
    returnDate,
    returnTime
  );

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  const pricing: PricingCalculation = selectedVehicle
    ? calculateRentalPricing(selectedVehicle, rentalDays)
    : {
        totalDays: 1,
        dailyRate: 0,
        totalBeforeDiscount: 0,
        subtotal: 0,
        savings: 0,
        savingsPercent: 0,
        breakdown: [],
      };

  // Auto-advance to Step 2 or 3 if vehicle preselected via query
  useEffect(() => {
    if (initialVehicleId && currentStep === 1) {
      // If user came directly from "Book This Car", preselect and let them review dates
    }
  }, [initialVehicleId]);

  // Handlers for step progression
  const handleNextStep = () => {
    setSubmissionError(null);
    if (currentStep === 1) {
      if (dateError) {
        setSubmissionError(dateError);
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedVehicleId) {
        setSubmissionError('Please select a vehicle to proceed.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!customerName.trim()) {
        setSubmissionError('Please enter your full name.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.trim().length < 7) {
        setSubmissionError('Please enter a valid phone number for contact.');
        return;
      }
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    setSubmissionError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit Final Booking Request to Server API
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setSubmissionError('Please accept the rental terms and conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: selectedVehicle.id,
          customerName,
          customerPhone,
          customerEmail,
          notes,
          preferredContact,
          pickupLocation,
          returnLocation,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmissionError(data.error || 'Failed to submit booking request. Please check inputs.');
        setIsSubmitting(false);
        return;
      }

      // Navigate to confirmation page with reference
      router.push(`/booking/confirmation?ref=${data.booking.reference}`);
    } catch (err: any) {
      setSubmissionError('A network error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          {[
            { num: 1, label: '1. Trip Dates' },
            { num: 2, label: '2. Select Car' },
            { num: 3, label: '3. Your Details' },
            { num: 4, label: '4. Review' },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2 rounded-xl transition-all ${
                currentStep === s.num
                  ? 'bg-midnight text-white shadow-sm'
                  : currentStep > s.num
                  ? 'bg-[#FFD83D]/20 text-midnight font-bold'
                  : 'text-slate-400 bg-slate-50'
              }`}
            >
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Alert if any */}
      {submissionError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* STEP 1: Trip Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-heading text-2xl font-bold text-midnight tracking-tight">
              Step 1: Set Your Trip Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Specify your pickup and drop-off dates and preferred locations across Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-midnight" />
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              >
                {DEFAULT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Return Location
              </label>
              <select
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              >
                {DEFAULT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-midnight" />
                Pickup Date & Time
              </label>
              <div className="grid grid-cols-7 gap-2">
                <input
                  type="date"
                  value={pickupDate}
                  min={getTodayNepal()}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="col-span-4 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="col-span-3 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-midnight" />
                Return Date & Time
              </label>
              <div className="grid grid-cols-7 gap-2">
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="col-span-4 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="col-span-3 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Calculated Rental Duration:</span>
            <span className="font-mono text-sm font-bold text-midnight">
              {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-midnight hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-md transition-all font-heading"
            >
              <span>Continue to Vehicle Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose a Car */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight tracking-tight">
                Step 2: Choose Your Vehicle
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing all 19 vehicles with exact pricing calculated for {rentalDays} days.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg">
              Duration: {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[540px] overflow-y-auto pr-1">
            {vehicles.map((v) => {
              const vPrice = calculateRentalPricing(v, rentalDays);
              const isSelected = v.id === selectedVehicleId;
              const isEV = v.category === 'electric';

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? 'border-midnight bg-slate-50/80 shadow-md ring-1 ring-midnight'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-24 h-16 bg-midnight rounded-xl p-1 flex items-center justify-center shrink-0">
                    <img
                      src={v.image || '/images/vehicles/fallback-car.svg'}
                      alt={v.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          isEV ? 'bg-[#FFD83D] text-[#080A0D]' : 'bg-[#28618F] text-white'
                        }`}
                      >
                        {isEV ? 'EV' : 'Fuel'}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-midnight truncate">{v.name}</h4>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      {v.color} • {v.groundClearance}
                    </p>

                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-midnight">
                        {formatNPR(vPrice.subtotal)}
                      </span>
                      {vPrice.savings > 0 && (
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Save {formatNPR(vPrice.savings)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-midnight bg-midnight text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#FFD83D]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-bold text-slate-600 hover:text-midnight flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dates</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-midnight hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-md transition-all font-heading"
            >
              <span>Continue with {selectedVehicle?.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Customer Details */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-heading text-2xl font-bold text-midnight tracking-tight">
              Step 3: Customer Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              We need only essential contact details to verify vehicle availability and coordinate handover.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-midnight" />
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Shrestha"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-midnight" />
                  Phone Number (Nepal or International) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9801234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Preferred Communication Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'phone', label: 'Phone Call' },
                  { id: 'email', label: 'Email' },
                ].map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setPreferredContact(channel.id as any)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      preferredContact === channel.id
                        ? 'bg-midnight text-white border-midnight'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {channel.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Trip Notes / Special Requests (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Flight arrival details, child seat preference, or special itinerary notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-bold text-slate-600 hover:text-midnight flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Vehicles</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-midnight hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-md transition-all font-heading"
            >
              <span>Review Booking Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Submit */}
      {currentStep === 4 && (
        <form
          onSubmit={handleSubmitBooking}
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn"
        >
          <div>
            <h2 className="font-heading text-2xl font-bold text-midnight tracking-tight">
              Step 4: Review Your Booking Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verify your trip schedule and vehicle cost breakdown before submission.
            </p>
          </div>

          {/* Vehicle Snapshot Header */}
          <div className="p-4 rounded-2xl bg-midnight text-white flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 h-20 bg-midnight-card rounded-xl p-1 flex items-center justify-center shrink-0">
              <img
                src={selectedVehicle.image || '/images/vehicles/fallback-car.svg'}
                alt={selectedVehicle.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#FFD83D] text-[#080A0D]">
                {selectedVehicle.category === 'electric' ? 'Electric Vehicle' : 'Fuel Vehicle'}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                {selectedVehicle.name}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedVehicle.color} • {selectedVehicle.year} • Ground Clearance: {selectedVehicle.groundClearance}
              </p>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Daily Rate</span>
              <span className="font-heading text-xl font-bold text-[#FFD83D]">
                {formatNPR(selectedVehicle.dailyRate)}
              </span>
            </div>
          </div>

          {/* Summary Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Pickup Details
              </h4>
              <p className="text-slate-600">
                <strong>Location:</strong> {pickupLocation}
              </p>
              <p className="text-slate-600">
                <strong>Schedule:</strong> {pickupDate} at {pickupTime}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Return Details
              </h4>
              <p className="text-slate-600">
                <strong>Location:</strong> {returnLocation}
              </p>
              <p className="text-slate-600">
                <strong>Schedule:</strong> {returnDate} at {returnTime}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 sm:col-span-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Customer Information
              </h4>
              <p className="text-slate-600">
                <strong>Name:</strong> {customerName} • <strong>Phone:</strong> {customerPhone}
                {customerEmail ? ` • Email: ${customerEmail}` : ''} • <strong>Contact Via:</strong> {preferredContact}
              </p>
              {notes && (
                <p className="text-slate-600">
                  <strong>Notes:</strong> {notes}
                </p>
              )}
            </div>
          </div>

          {/* Price Breakdown Calculation */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 text-sm">
              <span>Rental Duration</span>
              <span className="font-mono">{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200">
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

            {pricing.savings > 0 && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-emerald-700 font-semibold">
                <span>Transparent Package Savings ({pricing.savingsPercent}%)</span>
                <span>- {formatNPR(pricing.savings)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-300 flex items-baseline justify-between text-base">
              <span className="font-bold text-slate-900">Total Estimated Amount</span>
              <span className="font-heading text-2xl font-extrabold text-midnight">
                {formatNPR(pricing.subtotal)}
              </span>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 accent-midnight"
              />
              <span>
                I agree to the UDrive rental guidelines and understand this is an initial booking request subject to vehicle verification by the fleet manager.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-bold text-slate-600 hover:text-midnight flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Details</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className={`bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#FFD83D]/20 hover:scale-[1.01] transition-all flex items-center gap-2 font-heading ${
                isSubmitting || !agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
