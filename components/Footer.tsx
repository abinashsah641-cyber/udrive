import React from 'react';
import Link from 'next/link';
import { Car, Zap, Fuel, Calendar, ShieldCheck, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midnight text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-electric flex items-center justify-center text-midnight font-black shadow-lg shadow-electric/20">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  UDRIVE
                  <span className="text-[10px] uppercase tracking-widest bg-electric/20 text-electric px-1.5 py-0.5 rounded font-mono font-semibold">
                    NEPAL
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-sans tracking-wide">
                  Vehicle Rental Service
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Premium electric vehicles and reliable fuel cars for hire across Nepal. Experience transparent pricing with daily, weekly, 15-day, and 30-day package rates.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61584871988112"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Follow on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5 text-electric" />
              <span>Timezone: Asia/Kathmandu (NPT, UTC+5:45)</span>
            </div>
          </div>

          {/* Quick Fleet Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-wider">
              Fleet Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles?category=electric" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-electric" />
                  <span>Electric Vehicles (13)</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=fuel" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fuel Vehicles (6)</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=SUV" className="hover:text-electric transition-colors">
                  SUVs & Crossovers
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=Hatchback" className="hover:text-electric transition-colors">
                  City Hatchbacks
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=Pickup" className="hover:text-electric transition-colors">
                  Pickup Trucks (4x4 & EV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing & Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-wider">
              Rental Packages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Transparent Rate Table</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing#weekly" className="hover:text-electric transition-colors">
                  7-Day Package (5% Discount)
                </Link>
              </li>
              <li>
                <Link href="/pricing#fifteen" className="hover:text-electric transition-colors">
                  15-Day Package (10% Discount)
                </Link>
              </li>
              <li>
                <Link href="/pricing#monthly" className="hover:text-electric transition-colors">
                  30-Day Monthly (15% Discount)
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-electric transition-colors">
                  How Booking Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-wider">
              UDrive Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-electric transition-colors">
                  About UDrive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric transition-colors">
                  Contact & Assistance
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-electric transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-electric transition-colors">
                  Rental Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-electric transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-electric transition-colors flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UDrive Rental Service. All vehicle models, rates, and specifications registered in Nepal.</p>
          <p className="flex items-center gap-2">
            <span>Kathmandu & Pokhara Fleet Delivery Available</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
