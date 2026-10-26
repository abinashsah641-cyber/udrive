import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Fuel, Calendar, ShieldCheck, MapPin, Clock, ExternalLink, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080A0D] text-slate-400 border-t border-[#242933] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <div className="relative h-6 sm:h-7 w-26 sm:w-30">
                <Image
                  src="/images/logo/udrive-logo-dark.png"
                  alt="U Drive - Every Ride A New Story"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-1">
              Every ride a new story. Premium electric vehicles and reliable fuel cars for hire across Nepal. Experience transparent pricing with daily, weekly, 15-day, and 30-day package rates.
            </p>

            {/* Direct Official Contact Information */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFD83D] shrink-0" />
                <span className="text-slate-400">Mobile / Call:</span>
                <a href="tel:+9779800899505" className="text-white hover:text-[#FFD83D] font-semibold transition-colors">
                  +977-9800899505
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-400">WhatsApp:</span>
                <a
                  href="https://wa.me/9779800899505?text=Hello%20U%20Drive!%20I%20would%20like%20to%20inquire%20about%20vehicle%20rental%20availability%20in%20Nepal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  +977 9800899505
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <span className="text-slate-400">Email:</span>
                <a href="mailto:udriverentalcarservice@gmail.com" className="text-slate-200 hover:text-[#FFD83D] transition-colors break-all">
                  udriverentalcarservice@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Links: Facebook & Instagram */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=61584871988112"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#28618F]/15 hover:bg-[#28618F]/25 text-[#60A5FA] border border-[#28618F]/30 text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://www.instagram.com/udrivve?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/25 text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram @udrivve</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5 text-[#FFD83D]" />
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
                <Link href="/vehicles?category=electric" className="hover:text-[#FFD83D] transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FFD83D]" />
                  <span>Electric Vehicles (13)</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=fuel" className="hover:text-[#FFD83D] transition-colors flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>Fuel Vehicles (6)</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=SUV" className="hover:text-[#FFD83D] transition-colors">
                  SUVs & Crossovers
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=Hatchback" className="hover:text-[#FFD83D] transition-colors">
                  City Hatchbacks
                </Link>
              </li>
              <li>
                <Link href="/vehicles?bodyStyle=Pickup" className="hover:text-[#FFD83D] transition-colors">
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
                <Link href="/pricing" className="hover:text-[#FFD83D] transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Transparent Rate Table</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing#weekly" className="hover:text-[#FFD83D] transition-colors">
                  7-Day Package (5% Discount)
                </Link>
              </li>
              <li>
                <Link href="/pricing#fifteen" className="hover:text-[#FFD83D] transition-colors">
                  15-Day Package (10% Discount)
                </Link>
              </li>
              <li>
                <Link href="/pricing#monthly" className="hover:text-[#FFD83D] transition-colors">
                  30-Day Monthly (15% Discount)
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#FFD83D] transition-colors">
                  How Booking Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-wider">
              U Drive Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#FFD83D] transition-colors">
                  About U Drive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD83D] transition-colors">
                  Contact & Assistance
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFD83D] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FFD83D] transition-colors">
                  Rental Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FFD83D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FFD83D] transition-colors flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#28618F]" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#242933] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} U Drive Rental Services Pvt. Ltd. Every Ride A New Story. Nepal Reg. No. 387477/82/83.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#28618F]" /> Kathmandu Hub</span>
            <span>•</span>
            <span>Pokhara Delivery</span>
            <span>•</span>
            <span>Airport Pickup</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
