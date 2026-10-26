import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | U Drive Nepal',
  description:
    'Answers to common questions regarding vehicle rental rates, EV charging, pickup locations, and booking procedures in Nepal with U Drive.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Pricing & Packages',
      items: [
        {
          q: 'How are multi-day rental discounts applied?',
          a: 'Our rental packages include 5% discount for 7-day rentals, 10% discount for 15-day rentals, and 15% discount for 30-day rentals. If you book an arbitrary duration (for example, 22 days), our pricing engine finds the lowest-cost valid combination of packages and remaining daily rates.',
        },
        {
          q: 'Are rates inclusive of fuel or EV charging?',
          a: 'Standard rental rates cover vehicle usage. Fuel (petrol/diesel) and public fast-charging costs are covered by the renter during their journey.',
        },
        {
          q: 'Is there any security deposit required?',
          a: 'Standard rental verification requires a refundable security hold or documentation at handover. Detailed deposit amounts are confirmed upon fleet verification.',
        },
      ],
    },
    {
      category: 'Electric Vehicles in Nepal',
      items: [
        {
          q: 'Can electric cars handle steep gradients and highway travel in Nepal?',
          a: 'Yes, modern electric vehicles produce instantaneous torque that makes climbing Himalayan highway gradients smooth and responsive. Models like the BYD Atto 3, Deepal S07, and Omoda E5 Pro are widely used on the Prithvi and Tribhuvan Highways.',
        },
        {
          q: 'How do I charge an EV during my trip?',
          a: 'Major highways between Kathmandu, Pokhara, Chitwan, and Biratnagar have CCS2 DC fast-charging stations operated by NEA and private charging networks. In addition, portable slow chargers (AC 220V) are provided with our electric fleet.',
        },
      ],
    },
    {
      category: 'Booking & Handover',
      items: [
        {
          q: 'Where can I collect and drop off the vehicle?',
          a: 'We offer pickup and drop-off at Tribhuvan International Airport (TIA), Thamel, Lazimpat, Jhamsikhel/Sanepa in Kathmandu Valley, and Lakeside in Pokhara.',
        },
        {
          q: 'What driving credentials are required in Nepal?',
          a: 'A valid Nepalese driving license or an International Driving Permit (IDP) accompanied by your original national passport is required.',
        },
        {
          q: 'What does "Booking Request Received" mean?',
          a: 'When you submit a request online, your dates and car selection are logged in our database and assigned a unique reference code. This is an initial request while our team confirms the car is prepared and ready for handover.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#28618F] bg-[#28618F]/10 px-3.5 py-1 rounded-full">
          Rental Knowledge Base
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#080A0D] tracking-tight mt-3">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Clear answers regarding pricing mathematics, vehicle handovers, and operating rentals across Nepal with U Drive.
        </p>
      </div>

      <div className="space-y-10">
        {faqs.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-[#080A0D] border-b border-[#E4E5E2] pb-2">
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-[#E4E5E2] p-5 open:shadow-md transition-all cursor-pointer"
                >
                  <summary className="font-heading text-base font-bold text-[#080A0D] list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 group-open:bg-[#FFD83D] text-[#080A0D] flex items-center justify-center text-xs font-black shrink-0 transition-colors">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#080A0D] text-white p-8 rounded-3xl border border-[#242933] text-center space-y-3 shadow-xl">
        <h3 className="font-heading text-xl font-bold">Have another question?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Reach our team directly for bespoke itineraries, corporate contracts, or specific vehicle requests.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-xs px-6 py-3 rounded-xl transition-all font-heading"
          >
            <span>Contact Customer Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
