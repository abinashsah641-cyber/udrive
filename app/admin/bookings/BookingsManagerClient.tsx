'use client';

import React, { useState } from 'react';
import { BookingRequest, BookingStatus } from '@/types';
import { formatNPR } from '@/lib/pricing';
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Eye,
  X,
  Calendar,
  MapPin,
  Car,
} from 'lucide-react';

interface BookingsManagerClientProps {
  initialBookings: BookingRequest[];
  whatsappNumber: string;
}

export default function BookingsManagerClient({
  initialBookings,
  whatsappNumber,
}: BookingsManagerClientProps) {
  const [bookings, setBookings] = useState<BookingRequest[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.vehicleName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    setActionError(null);
    setActionSuccess(null);

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Failed to update booking status');
        return;
      }

      setBookings((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
      setActionSuccess(`Status updated to "${newStatus}"`);
      setTimeout(() => setActionSuccess(null), 2500);
    } catch (err: any) {
      setActionError('Network error while updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert notices */}
      {actionError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by reference, customer name, phone, car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'pending', label: 'Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === pill.id
                  ? 'bg-midnight text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800 font-heading">
                <th className="py-3.5 px-4 font-bold">Reference</th>
                <th className="py-3.5 px-3 font-bold">Customer</th>
                <th className="py-3.5 px-3 font-bold">Vehicle</th>
                <th className="py-3.5 px-3 font-bold">Rental Window</th>
                <th className="py-3.5 px-3 font-bold">Estimated Total</th>
                <th className="py-3.5 px-3 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-midnight">
                    {b.reference}
                  </td>

                  <td className="py-3.5 px-3">
                    <strong className="block text-slate-900">{b.customerName}</strong>
                    <div className="text-[11px] text-slate-500 font-mono">{b.customerPhone}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800 block">{b.vehicleName}</span>
                    <span className="text-[10px] text-slate-400">
                      {b.pickupLocation.split(',')[0]}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600">
                    <div className="font-medium text-slate-800">
                      {b.pickupDate} to {b.returnDate}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {b.rentalDays} {b.rentalDays === 1 ? 'Day' : 'Days'}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-midnight">
                    {formatNPR(b.pricing?.subtotal || 0)}
                  </td>

                  <td className="py-3.5 px-3">
                    <select
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) => handleUpdateStatus(b.id, e.target.value as BookingStatus)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : b.status === 'completed'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : b.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Inspection Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Booking Inspection
                </span>
                <h3 className="font-heading text-xl font-bold text-midnight font-mono">
                  {selectedBooking.reference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Customer Contact Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Customer Contact Information
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Name</span>
                    <strong className="text-midnight">{selectedBooking.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone</span>
                    <strong className="font-mono text-midnight">{selectedBooking.customerPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email</span>
                    <span>{selectedBooking.customerEmail || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Preferred Contact Channel</span>
                    <span className="font-semibold uppercase">{selectedBooking.preferredContact}</span>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block">Customer Trip Notes:</span>
                    <p className="text-slate-800 italic">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              {/* Trip Schedule */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Trip Schedule & Vehicle
                </span>
                <div className="space-y-1">
                  <div>
                    <strong>Vehicle:</strong> {selectedBooking.vehicleName}
                  </div>
                  <div>
                    <strong>Pickup:</strong> {selectedBooking.pickupLocation} on {selectedBooking.pickupDate} at {selectedBooking.pickupTime}
                  </div>
                  <div>
                    <strong>Return:</strong> {selectedBooking.returnLocation} on {selectedBooking.returnDate} at {selectedBooking.returnTime}
                  </div>
                  <div>
                    <strong>Duration:</strong> {selectedBooking.rentalDays} days
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Price Calculation
                </span>
                {selectedBooking.pricing?.breakdown?.map((item, i) => (
                  <div key={i} className="flex justify-between text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-medium text-slate-900">{formatNPR(item.subtotal)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-midnight text-sm pt-2 border-t border-slate-200">
                  <span>Subtotal Amount</span>
                  <span>{formatNPR(selectedBooking.pricing?.subtotal || 0)}</span>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${selectedBooking.customerPhone}`}
                  className="p-3 rounded-xl bg-slate-900 text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${selectedBooking.customerPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#25D366] text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
