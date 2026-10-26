'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookingRequest } from '@/types';
import { formatNPR } from '@/lib/pricing';
import {
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Car,
  FileCheck,
} from 'lucide-react';

interface ConfirmationClientProps {
  booking: BookingRequest;
  whatsappNumber: string;
}

export default function ConfirmationClient({ booking, whatsappNumber }: ConfirmationClientProps) {
  const [copied, setCopied] = useState(false);
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build prefilled WhatsApp message
  const prefilledMessage = encodeURIComponent(
    `Hello UDrive Rental Service! I have submitted a booking request on your website.\n\n` +
      `Booking Reference: ${booking.reference}\n` +
      `Vehicle: ${booking.vehicleName}\n` +
      `Pickup: ${booking.pickupDate} (${booking.pickupLocation})\n` +
      `Return: ${booking.returnDate} (${booking.returnLocation})\n` +
      `Duration: ${booking.rentalDays} days\n` +
      `Estimated Amount: ${formatNPR(booking.pricing.subtotal)}\n\n` +
      `Customer: ${booking.customerName} (${booking.customerPhone})\n\n` +
      `Could you please verify availability and confirm my reservation? Thank you!`
  );

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!whatsappNumber) {
      e.preventDefault();
      setShowConfigNotice(true);
    }
  };

  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = cleanNumber ? `https://wa.me/${cleanNumber}?text=${prefilledMessage}` : '#';

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Success Status Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-2">
          <FileCheck className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Status: Awaiting Owner Confirmation</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight">
          Booking Request Received
        </h1>

        <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{booking.customerName}</strong>. Your rental request has been securely persisted in our system. Our team is verifying vehicle availability and will reach out shortly.
        </p>

        {/* Unique Reference Code Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-between gap-3 mt-4">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Booking Reference
            </span>
            <span className="font-mono text-lg font-bold text-midnight tracking-wider">
              {booking.reference}
            </span>
          </div>

          <button
            onClick={handleCopyRef}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Action Notice if Unconfigured */}
      {showConfigNotice && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block font-semibold">WhatsApp Number Configuration Needed</strong>
            <p>
              The business owner has not yet provided the official WhatsApp phone number in the application settings. Our team has your contact number (<strong>{booking.customerPhone}</strong>) and will contact you directly.
            </p>
          </div>
        </div>
      )}

      {/* Primary Actions: Continue on WhatsApp or Browse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={whatsappUrl}
          target={cleanNumber ? '_blank' : '_self'}
          rel={cleanNumber ? 'noopener noreferrer' : undefined}
          onClick={handleWhatsAppClick}
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all group"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Continue on WhatsApp</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <Link
          href="/vehicles"
          className="bg-midnight hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all"
        >
          <Car className="w-4 h-4 text-electric" />
          <span>Explore More Vehicles</span>
        </Link>
      </div>

      {/* Itemized Booking Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-heading text-lg font-bold text-midnight pb-3 border-b border-slate-100">
          Booking Summary Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 font-semibold block">Vehicle Requested</span>
            <strong className="text-midnight text-sm block font-heading">{booking.vehicleName}</strong>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 font-semibold block">Rental Duration</span>
            <strong className="text-midnight text-sm block font-mono">
              {booking.rentalDays} {booking.rentalDays === 1 ? 'Day' : 'Days'}
            </strong>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 font-semibold block">Pickup Location & Date</span>
            <span className="text-slate-800 font-medium block">
              {booking.pickupLocation} • {booking.pickupDate} at {booking.pickupTime}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 font-semibold block">Return Location & Date</span>
            <span className="text-slate-800 font-medium block">
              {booking.returnLocation} • {booking.returnDate} at {booking.returnTime}
            </span>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Official Price Breakdown</span>
            <span>NPR Amount</span>
          </div>
          {booking.pricing?.breakdown?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-slate-600 pt-1">
              <span>{item.label}</span>
              <span className="font-medium text-slate-900">{formatNPR(item.subtotal)}</span>
            </div>
          ))}

          {booking.pricing?.savings > 0 && (
            <div className="flex items-center justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-200">
              <span>Transparent Package Saving</span>
              <span>- {formatNPR(booking.pricing.savings)}</span>
            </div>
          )}

          <div className="flex items-baseline justify-between text-sm font-bold text-midnight pt-2 border-t border-slate-300">
            <span>Estimated Total (NPR)</span>
            <span className="text-lg font-heading">{formatNPR(booking.pricing.subtotal)}</span>
          </div>
        </div>
      </div>

      {/* Next Steps Guide */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs text-slate-600">
        <h4 className="font-heading text-sm font-bold text-midnight uppercase tracking-wider">
          What Happens Next?
        </h4>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>
            <strong>Fleet Verification:</strong> Our dispatch officer inspects vehicle scheduling for your pickup window.
          </li>
          <li>
            <strong>Contact & Confirmation:</strong> We reach out via {booking.preferredContact} to verify flight or arrival details.
          </li>
          <li>
            <strong>Vehicle Handover:</strong> Present your driving license and national ID/passport at pickup in Kathmandu or Pokhara.
          </li>
        </ol>
      </div>
    </div>
  );
}
