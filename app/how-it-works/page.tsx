import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Car, Send, CheckCircle2, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | UDrive Rental Service Nepal',
  description: 'Learn how to book and rent a vehicle with UDrive in Nepal in 4 simple steps.',
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Rental Guide
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          How Rental Booking Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          From trip planning in Kathmandu to returning your vehicle, our 4-step workflow is transparent and straightforward.
        </p>
      </div>

      <div className="space-y-8">
        {[
          {
            num: '01',
            title: 'Select Dates & Locations',
            desc: 'Choose your desired pickup and drop-off dates, times, and delivery hubs (such as Tribhuvan International Airport, Thamel, or Pokhara Lakeside).',
            detail: 'Our date engine calculates exact days in Nepal local time (Asia/Kathmandu).',
            icon: Calendar,
          },
          {
            num: '02',
            title: 'Choose From 19 Verified Models',
            desc: 'Filter our fleet between modern electric vehicles (with up to 485 km range) and manual/fuel cars with high ground clearance.',
            detail: 'Every card shows exact daily rates and automatically discounted weekly and monthly packages.',
            icon: Car,
          },
          {
            num: '03',
            title: 'Submit Your Booking Request',
            desc: 'Fill in your full name, phone number, and communication preference (WhatsApp, phone, or email).',
            detail: 'No online payment or credit card is required to submit your reservation request.',
            icon: Send,
          },
          {
            num: '04',
            title: 'Receive Confirmation & Vehicle Handover',
            desc: 'Our dispatch team validates vehicle availability, confirms your booking reference, and arranges handover.',
            detail: 'Present your valid driving license and national ID at vehicle pickup.',
            icon: CheckCircle2,
          },
        ].map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-midnight text-electric font-mono font-black text-2xl flex items-center justify-center shrink-0">
              {step.num}
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-heading text-xl font-bold text-midnight">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              <p className="text-xs text-slate-400 font-mono pt-1">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-midnight rounded-3xl p-8 sm:p-10 text-center text-white space-y-4">
        <h3 className="font-heading text-2xl font-bold">Ready to Start Your Journey in Nepal?</h3>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Explore our available fleet or calculate pricing for your specific dates.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/vehicles"
            className="bg-electric hover:bg-electric-hover text-midnight font-bold px-7 py-3 rounded-xl text-sm transition-all"
          >
            Browse Fleet
          </Link>
          <Link
            href="/booking"
            className="border border-slate-700 hover:border-slate-500 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors"
          >
            Start Booking
          </Link>
        </div>
      </div>
    </div>
  );
}
