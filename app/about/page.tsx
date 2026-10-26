import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Fuel, ShieldCheck, HeartHandshake, MapPin, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About U Drive | Every Ride A New Story - Rental Services in Nepal',
  description:
    'Learn about U Drive Rental Services Pvt. Ltd. (Nepal Reg. No. 387477/82/83), providing verified electric and fuel car rentals in Nepal with transparent package rates.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#28618F]/10 text-[#28618F] text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>About U Drive</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-semibold">Every Ride A New Story</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#080A0D] tracking-tight mt-1">
          U Drive Rental Services Pvt. Ltd.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
          U Drive is Nepal’s forward-thinking automotive rental service (Registration No. 387477/82/83). We empower travellers, business professionals, and residents with modern electric vehicles and dependable everyday fuel cars with complete transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-2xl border border-[#E4E5E2] shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-xl bg-[#FFD83D]/20 text-[#080A0D] flex items-center justify-center font-bold">
            <Zap className="w-5 h-5 text-[#DDA600] fill-current" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#080A0D]">EV Leadership in Nepal</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            With 13 electric vehicles spanning Deepal S07, BYD Atto 3, Omoda E5, Naami, and Ridard, we offer clean, whisper-quiet, and cost-efficient driving across Kathmandu and Nepal highways.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-[#E4E5E2] shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-xl bg-[#28618F]/15 text-[#28618F] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#080A0D]">Transparent Mathematics</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every rate is published clearly in Nepalese Rupees (NPR). Renters receive guaranteed 5%, 10%, and 15% discounts on 7-day, 15-day, and 30-day packages with zero hidden fees.
          </p>
        </div>
      </div>

      <div className="bg-[#EFEFE9] p-8 rounded-3xl border border-[#E4E5E2] space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#080A0D]">Our Fleet & Service Guarantee</h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Every vehicle in our catalog reflects verified technical metrics including ground clearance, EV certified range or fuel mileage, and model year. Whether you need an airport transfer at Tribhuvan International Airport or an expedition across Prithvi Highway to Pokhara, U Drive ensures your vehicle is clean, inspected, and ready.
        </p>
        <div className="pt-2">
          <Link
            href="/vehicles"
            className="inline-block bg-[#080A0D] hover:bg-[#12161F] text-[#FFD83D] font-bold text-xs px-6 py-3 rounded-xl transition-all font-heading shadow-md"
          >
            Explore Our Fleet
          </Link>
        </div>
      </div>
    </div>
  );
}
