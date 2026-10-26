'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    <header className="sticky top-0 z-50 bg-midnight/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-electric flex items-center justify-center text-midnight font-black shadow-lg shadow-electric/20 group-hover:scale-105 transition-transform">
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
                Rental Service
              </span>
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
                      ? 'text-electric bg-white/5 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 opacity-75" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded border border-slate-800 hover:border-slate-700 flex items-center gap-1 transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            <Link
              href="/booking"
              className="bg-electric hover:bg-electric-hover text-midnight font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-electric/20 hover:shadow-electric/30 transition-all flex items-center gap-2 group"
            >
              <span>Book a Car</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/booking"
              className="bg-electric text-midnight font-bold text-xs px-3.5 py-2 rounded-lg"
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
        <div className="lg:hidden bg-midnight-card border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-electric/15 text-electric font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {link.icon && <link.icon className="w-5 h-5 text-slate-400" />}
                  {link.name}
                </span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-electric text-midnight font-bold py-3 rounded-xl text-center shadow-lg shadow-electric/20"
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
