'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, Shield } from 'lucide-react';

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  'https://www.instagram.com/udrivve?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Simple, single-word, non-wrapping navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Electric', href: '/vehicles?category=electric' },
    { name: 'Fuel', href: '/vehicles?category=fuel' },
    { name: 'Packages', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080A0D]/95 backdrop-blur-md border-b border-[#242933] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Brand Logo - Small, sleek and refined */}
          <Link href="/" className="flex items-center shrink-0 py-1 focus:outline-none">
            <div className="relative h-6 sm:h-7 w-26 sm:w-30">
              <Image
                src="/images/logo/udrive-logo-dark.png"
                alt="U Drive - Every Ride A New Story"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Simple, Clean Desktop Navigation Links (No wrapping, no icons) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'text-[#FFD83D] bg-white/5 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Clean Action Items on Right */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Instagram Link */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-[#FFD83D] hover:bg-white/5 transition-colors"
              title="Follow @udrivve on Instagram"
              aria-label="U Drive Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+9779800899505"
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#FFD83D] px-2.5 py-1.5 rounded-lg border border-[#242933] hover:border-slate-600 bg-white/[0.02] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFD83D]" />
              <span>+977-9800899505</span>
            </a>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              title="Admin Portal"
            >
              Admin
            </Link>

            {/* Simple, Sleek Book CTA */}
            <Link
              href="/booking"
              className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-[#FFD83D]/15 hover:scale-[1.02] transition-all flex items-center gap-1.5 font-heading whitespace-nowrap"
            >
              <span>Book a Car</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-[#FFD83D]"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <Link
              href="/booking"
              className="bg-[#FFD83D] text-[#080A0D] font-bold text-xs px-3 py-1.5 rounded-lg"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12161F] border-b border-[#242933] px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#FFD83D]/15 text-[#FFD83D] font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#242933] flex flex-col gap-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#FFD83D] text-[#080A0D] font-bold py-2.5 rounded-xl text-center shadow-lg shadow-[#FFD83D]/20 text-sm font-heading"
            >
              Book a Car
            </Link>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1 px-1">
              <a href="tel:+9779800899505" className="flex items-center gap-1.5 hover:text-[#FFD83D]">
                <Phone className="w-3.5 h-3.5 text-[#FFD83D]" />
                <span>+977-9800899505</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#FFD83D]"
              >
                @udrivve
              </a>
            </div>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-white"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
