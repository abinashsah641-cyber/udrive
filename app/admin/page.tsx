import React from 'react';
import Link from 'next/link';
import { getAdminStats, getAllBookings, getAllVehicles } from '@/lib/db';
import { formatNPR } from '@/lib/pricing';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Car,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';



export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const recentBookings = await getAllBookings();
  const vehicles = await getAllVehicles({ all: true } as any);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
            UDrive Administration
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-midnight tracking-tight mt-1">
            Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/vehicles"
            className="bg-midnight hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all font-heading"
          >
            Manage Fleet
          </Link>
          <Link
            href="/admin/bookings"
            className="bg-[#FFD83D] hover:bg-[#F0C828] text-[#080A0D] font-bold text-xs px-4 py-2.5 rounded-xl transition-all font-heading"
          >
            View Bookings
          </Link>
        </div>
      </div>

      {/* Database Derived Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Requests</span>
            <FileText className="w-4 h-4 text-midnight" />
          </div>
          <div className="font-heading text-3xl font-bold text-midnight">
            {stats.totalBookings}
          </div>
          <p className="text-[11px] text-slate-400">Total requests logged in database</p>
        </div>

        {/* Pending Requests */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Action</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-heading text-3xl font-bold text-amber-900">
            {stats.pendingBookings}
          </div>
          <p className="text-[11px] text-amber-700">Awaiting owner review</p>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-3xl font-bold text-emerald-900">
            {stats.confirmedBookings}
          </div>
          <p className="text-[11px] text-emerald-700">Vehicles scheduled for handover</p>
        </div>

        {/* Confirmed Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Confirmed Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-midnight font-mono">
            {formatNPR(stats.confirmedRevenue)}
          </div>
          <p className="text-[11px] text-slate-400">From confirmed & completed rentals</p>
        </div>
      </div>

      {/* Fleet Status Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Total Fleet Models</span>
          <span className="font-heading text-2xl font-bold text-midnight block">
            {stats.totalVehicles} Vehicles
          </span>
          <span className="text-[11px] text-slate-400">13 Electric • 6 Fuel / Manual</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Operational & Available</span>
          <span className="font-heading text-2xl font-bold text-emerald-600 block">
            {stats.operationalVehicles} Active
          </span>
          <span className="text-[11px] text-slate-400">Available for customer reservations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Maintenance / Blocked</span>
          <span className="font-heading text-2xl font-bold text-amber-600 block">
            {stats.maintenanceVehicles} Unavailable
          </span>
          <span className="text-[11px] text-slate-400">Under service inspection</span>
        </div>
      </div>

      {/* Recent Booking Requests Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-midnight">
            Recent Booking Requests
          </h2>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-midnight hover:text-slate-600 flex items-center gap-1"
          >
            <span>View All ({recentBookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Vehicle</th>
                  <th className="py-3 px-3">Dates</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-midnight">{b.reference}</td>
                    <td className="py-3 px-3 font-medium">
                      <div>{b.customerName}</div>
                      <div className="text-[10px] text-slate-500">{b.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-medium">{b.vehicleName}</td>
                    <td className="py-3 px-3 text-slate-600">
                      {b.pickupDate} to {b.returnDate} ({b.rentalDays}d)
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-midnight">
                      {formatNPR(b.pricing?.subtotal || 0)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            No booking requests logged yet. As customers book vehicles, they will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
