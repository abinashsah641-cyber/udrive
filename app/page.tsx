import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { getAllVehicles } from '@/lib/db';
import {
  Zap,
  Fuel,
  Car,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Sliders,
  DollarSign,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { formatNPR } from '@/lib/pricing';



export default async function HomePage() {
  const vehicles = await getAllVehicles();
  const featuredVehicles = vehicles.filter((v) => v.isFeatured).slice(0, 6);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. Cinematic Hero Section with Embedded Booking Widget */}
      <Hero />

      {/* 2. Section A: Featured Fleet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              <Sparkles className="w-4 h-4 text-electric-hover text-midnight" />
              <span>Handpicked Highlights</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight">
              Featured Fleet in Nepal
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Top-rated electric and fuel vehicles prepared for city driving and highway exploration.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm font-bold text-midnight hover:text-slate-700 group"
          >
            <span>View All 19 Vehicles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 or 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredVehicles.map((vehicle, idx) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={idx < 3} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-midnight hover:bg-slate-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <span>Browse Complete Fleet (19 Models)</span>
            <ChevronRight className="w-4 h-4 text-electric" />
          </Link>
        </div>
      </section>

      {/* 3. Section B: Explore by Category */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight">
              Explore by Vehicle Category
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From zero-emission electric SUVs to high-clearance 4x4 pickups, choose the vehicle tailored to your route.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category 1: Electric */}
            <Link
              href="/vehicles?category=electric"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <h3 className="font-heading text-lg font-bold text-midnight">Electric Vehicles</h3>
                <p className="text-xs text-slate-500 mt-1">13 modern EV models with up to 485 km range.</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-midnight group-hover:text-emerald-600">
                <span>From NPR 6,500/d</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Category 2: SUVs */}
            <Link
              href="/vehicles?bodyStyle=SUV"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-midnight">SUVs & Crossovers</h3>
                <p className="text-xs text-slate-500 mt-1">High clearance up to 205 mm for Nepal terrain.</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-midnight group-hover:text-blue-600">
                <span>From NPR 7,000/d</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Category 3: Hatchbacks */}
            <Link
              href="/vehicles?bodyStyle=Hatchback"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-midnight">City Hatchbacks</h3>
                <p className="text-xs text-slate-500 mt-1">Nimble parking, compact dimensions, economical.</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-midnight group-hover:text-indigo-600">
                <span>From NPR 5,000/d</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Category 4: Pickup Trucks */}
            <Link
              href="/vehicles?bodyStyle=Pickup"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-midnight">Pickup Trucks</h3>
                <p className="text-xs text-slate-500 mt-1">Hilux 4x4 (310 mm) & Ridard Electric pickup.</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-midnight group-hover:text-orange-600">
                <span>From NPR 15,000/d</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Category 5: Fuel / Manual */}
            <Link
              href="/vehicles?category=fuel"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Fuel className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-midnight">Manual / Fuel</h3>
                <p className="text-xs text-slate-500 mt-1">6 dependable petrol and diesel everyday runners.</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-midnight group-hover:text-amber-600">
                <span>From NPR 5,000/d</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Section C: Transparent Rental Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-midnight rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/20 text-electric text-xs font-bold uppercase tracking-wider mb-3">
              <span>Transparent Rate Architecture</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
              Rent Longer, Save Transparently.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              We believe in honest mathematics. Every package uses a verified formula with no surprises or hidden add-ons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {/* 7 Days */}
              <div className="bg-midnight-card border border-slate-800 p-6 rounded-2xl">
                <span className="text-electric font-mono font-bold text-xs uppercase tracking-wider">
                  Weekly Package
                </span>
                <h3 className="font-heading text-2xl font-bold mt-1">7 Days</h3>
                <p className="text-emerald-400 font-semibold text-sm mt-1">5% Off 7 Daily Rates</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Best for week-long business visits, Kathmandu Valley exploration, or short family holidays.
                </p>
              </div>

              {/* 15 Days */}
              <div className="bg-midnight-card border border-electric/40 p-6 rounded-2xl relative shadow-lg shadow-electric/5">
                <div className="absolute -top-3 right-4 bg-electric text-midnight text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  Popular
                </div>
                <span className="text-electric font-mono font-bold text-xs uppercase tracking-wider">
                  Fortnight Package
                </span>
                <h3 className="font-heading text-2xl font-bold mt-1">15 Days</h3>
                <p className="text-emerald-400 font-semibold text-sm mt-1">10% Off 15 Daily Rates</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Ideal for round-trip itineraries covering Kathmandu, Pokhara, Chitwan, and beyond.
                </p>
              </div>

              {/* 30 Days */}
              <div className="bg-midnight-card border border-slate-800 p-6 rounded-2xl">
                <span className="text-electric font-mono font-bold text-xs uppercase tracking-wider">
                  Monthly Package
                </span>
                <h3 className="font-heading text-2xl font-bold mt-1">30 Days</h3>
                <p className="text-emerald-400 font-semibold text-sm mt-1">15% Off 30 Daily Rates</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Substantial savings for project assignments, corporate leasing, or extended personal stays.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/pricing"
                className="bg-electric hover:bg-electric-hover text-midnight font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <span>View Complete Rate Table for 19 Cars</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section D: Why Choose UDrive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight">
            Why Choose UDrive Rental Service
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Built on transparency, verified vehicle models, and direct local assistance in Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-electric/20 text-midnight flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-midnight" />
            </div>
            <h3 className="font-heading text-xl font-bold text-midnight">
              Accurate Vehicle Records
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every vehicle card reflects the exact model name, year, and published pricing. No guesswork or invented specifications.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-electric/20 text-midnight flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6 text-midnight" />
            </div>
            <h3 className="font-heading text-xl font-bold text-midnight">
              100% Transparent Mathematics
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our pricing engine automatically finds the least expensive combination of monthly, 15-day, weekly, and daily rates for your journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-electric/20 text-midnight flex items-center justify-center font-bold">
              <Clock className="w-6 h-6 text-midnight" />
            </div>
            <h3 className="font-heading text-xl font-bold text-midnight">
              Dedicated Communication
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Confirm your booking request online, or continue your reservation seamlessly on WhatsApp with prefilled trip details.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Section E: How It Works */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Simple 4-Step Process
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight mt-1">
              How Booking Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Select Dates & Route',
                desc: 'Choose your pickup and return locations, dates, and times in Kathmandu or Pokhara.',
              },
              {
                step: '02',
                title: 'Choose Your Car',
                desc: 'Compare electric and fuel cars with transparent line-item pricing and specs.',
              },
              {
                step: '03',
                title: 'Submit Booking Request',
                desc: 'Provide your name and contact details. No online card required at submission.',
              },
              {
                step: '04',
                title: 'Receive Confirmation',
                desc: 'Our team verifies availability, confirms your reference, and arranges vehicle pickup.',
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-mono text-3xl font-extrabold text-electric-hover text-midnight/30 block mb-2">
                  {item.step}
                </span>
                <h3 className="font-heading text-lg font-bold text-midnight mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section F: Nepal Setting Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-midnight text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <span className="text-electric text-xs font-bold uppercase tracking-wider">
              Driving in Nepal
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready for the Hills, Highways & City Streets.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nepal’s roads vary from smooth Kathmandu expressways to twisting Prithvi Highway bends. Our fleet includes high ground clearance models like the 310 mm Toyota Hilux 4x4, 225 mm Ridard electric pickup, and 205 mm SUVs to handle every gradient with confidence.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">
                ✓ Tribhuvan International Airport delivery
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">
                ✓ Pokhara Lakeside drop-off options
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative">
            <img
              src="/images/vehicles/toyota-hilux-4x4.jpg"
              alt="Toyota Hilux 4x4 310mm Ground Clearance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 8. Section G: FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Got Questions?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-midnight tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does package pricing work for my booking duration?',
              a: 'Our booking system automatically applies our official discounts: 5% off for 7-day bookings, 10% off for 15-day bookings, and 15% off for 30-day bookings. For custom durations (e.g. 22 days), the system combines the cheapest eligible packages and daily rates to ensure you always get the lowest published price.',
            },
            {
              q: 'What is the booking request process?',
              a: 'When you submit a request on our website, you receive a unique UDrive reference code. Your request is immediately marked as "Booking Request Received". Our operations team verifies vehicle readiness and confirms the reservation directly via WhatsApp, phone, or email.',
            },
            {
              q: 'Can I rent an electric vehicle for highway travel outside Kathmandu?',
              a: 'Yes! Our long-range EV models like the Deepal S07 (485 km), Ridard pickup (425+ km), and BYD Atto 3 (420+ km) are equipped to travel between major cities like Kathmandu, Pokhara, and Chitwan, where fast-charging infrastructure is widely accessible.',
            },
            {
              q: 'What documents are required to rent a vehicle?',
              a: 'Renters must possess a valid driving license (Nepalese driving license or International Driving Permit) and an official government ID or passport.',
            },
            {
              q: 'Can I continue or request a booking via WhatsApp?',
              a: 'Yes, after configuring your trip dates and car, you can click "Continue on WhatsApp" to message our team with your exact trip details prefilled.',
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 open:shadow-md transition-all cursor-pointer"
            >
              <summary className="font-heading text-base font-bold text-midnight list-none flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <span className="w-6 h-6 rounded-full bg-slate-100 group-open:bg-electric text-midnight flex items-center justify-center text-xs font-black transition-colors shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Section H: Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-midnight via-slate-900 to-midnight rounded-3xl p-10 sm:p-16 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
              The Road Is Yours. <br />
              <span className="text-electric">Choose Your Drive.</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Reserve your vehicle with transparent rates and local support across Nepal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/vehicles"
                className="bg-electric hover:bg-electric-hover text-midnight font-bold px-8 py-4 rounded-xl shadow-xl shadow-electric/20 hover:scale-[1.02] transition-all font-heading text-base"
              >
                Explore Vehicles
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-base transition-colors"
              >
                Contact UDrive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
