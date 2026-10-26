import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Settings,
  ExternalLink,
  Shield,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#080A0D] text-white flex flex-col justify-between shrink-0 border-r border-[#242933]">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-32">
              <Image
                src="/images/logo/udrive-logo-dark.png"
                alt="U Drive Admin"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#FFD83D]" />
              <span>Overview & Stats</span>
            </Link>

            <Link
              href="/admin/vehicles"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Car className="w-4 h-4 text-slate-400" />
              <span>Manage Vehicles (19)</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-slate-400" />
              <span>Booking Requests</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings & Contact</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-[#242933]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">{children}</main>
    </div>
  );
}
