'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Car, Zap, Fuel, Calendar, HelpCircle, Phone, Menu, X, ArrowRight, Shield } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Electric Vehicles', href: '/vehicles?category=electric', icon: Zap },
    { name: 'Fuel Vehicles', href: '/vehicles?category=fuel', icon: Fuel },
    { name: 'Rental Packages', href: '/pricing', icon: Calendar },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080A0D]/95 backdrop-blur-md border-b border-[#242933] text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official U Drive Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none py-2">
            <div className="relative h-12 w-48 sm:w-56 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/logo/udrive-logo-dark.svg"
                alt="U Drive - Every Ride A New Story"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    active
                      ? 'text-[#FFD83D] bg-white/5 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 opacity-75 text-[#28618F]" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg border border-[#242933] hover:border-slate-600 flex items-center gap-1.5 transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#28618F]" />
              <span>Admin</span>
            </Link>

            <Link
              href="/booking"
              className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#FFD83D]/15 hover:shadow-[#FFD83D]/25 transition-all flex items-center gap-2 group"
            >
              <span>Book a Car</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/booking"
              className="bg-[#FFD83D] text-[#080A0D] font-bold text-xs px-3.5 py-2 rounded-lg"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12161F] border-b border-[#242933] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#FFD83D]/15 text-[#FFD83D] font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {link.icon && <link.icon className="w-5 h-5 text-[#28618F]" />}
                  {link.name}
                </span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#242933] flex flex-col gap-2.5">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#FFD83D] text-[#080A0D] font-bold py-3 rounded-xl text-center shadow-lg shadow-[#FFD83D]/20"
            >
              Start Booking Request
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs text-slate-400 hover:text-white"
            >
              Access Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
