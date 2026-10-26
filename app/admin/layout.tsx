import React from 'react';
import Link from 'next/link';
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
      <aside className="w-full md:w-64 bg-midnight text-white flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-electric text-midnight flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-tight text-white block">
                UDrive Admin
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Fleet Operations</span>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-electric" />
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

        <div className="p-6 border-t border-slate-800">
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
