'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { formatNPR, calculateRentalPricing } from '@/lib/pricing';
import { Zap, Fuel, Calendar, Search, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

interface PricingClientProps {
  vehicles: Vehicle[];
}

export default function PricingClient({ vehicles }: PricingClientProps) {
  const [filter, setFilter] = useState<'all' | 'electric' | 'fuel'>('all');
  const [calcVehicleId, setCalcVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [calcDays, setCalcDays] = useState<number>(7);

  const filteredVehicles = vehicles.filter((v) => {
    if (filter === 'all') return true;
    return v.category === filter;
  });

  const selectedVehicle = vehicles.find((v) => v.id === calcVehicleId) || vehicles[0];
  const calculation = selectedVehicle ? calculateRentalPricing(selectedVehicle, calcDays) : null;

  return (
    <div className="space-y-12">
      {/* Interactive Arbitrary Duration Calculator Card */}
      <div className="bg-midnight text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric/20 text-electric text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Live Pricing Engine</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              Calculate Custom Rental Duration
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select any vehicle and arbitrary number of days to inspect the exact package combination.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">Discounts Built-in</span>
            <span className="text-electric text-sm font-bold">5% (7d) • 10% (15d) • 15% (30d)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Vehicle
            </label>
            <select
              value={calcVehicleId}
              onChange={(e) => setCalcVehicleId(e.target.value)}
              className="w-full bg-midnight-card border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.category === 'electric' ? 'EV' : 'Fuel'}) - {formatNPR(v.dailyRate)}/d
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Duration (Days): <span className="text-electric font-mono text-sm">{calcDays}</span>
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={calcDays}
              onChange={(e) => setCalcDays(Math.max(1, Number(e.target.value)))}
              className="w-full bg-midnight-card border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>

          {/* Result Subtotal */}
          <div className="md:col-span-4 bg-midnight-card/80 border border-slate-700/80 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400">Calculated Subtotal</span>
              <div className="font-heading text-2xl font-black text-electric mt-0.5">
                {calculation ? formatNPR(calculation.subtotal) : 'NPR 0'}
              </div>
            </div>

            {calculation && calculation.savings > 0 && (
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                You save {formatNPR(calculation.savings)} ({calculation.savingsPercent}%) vs daily rate!
              </p>
            )}

            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              {calculation?.breakdown.map((b, i) => (
                <span key={i} className="inline-block mr-2">
                  • {b.count > 1 ? `${b.count}×` : ''} {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-midnight tracking-tight">
            Official Published Rate Schedule (19 Models)
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Exact prices in Nepalese Rupees (NPR). All package discounts already incorporated.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          {[
            { id: 'all', label: 'All Fleet (19)' },
            { id: 'electric', label: 'Electric (13)' },
            { id: 'fuel', label: 'Fuel (6)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-midnight text-white shadow-sm'
                  : 'text-slate-700 hover:text-midnight'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Authoritative Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800 font-heading">
                <th className="py-4 px-4 font-bold">Vehicle Model</th>
                <th className="py-4 px-3 font-bold">Type</th>
                <th className="py-4 px-3 font-bold">Clearance</th>
                <th className="py-4 px-3 font-bold">Range / Mileage</th>
                <th className="py-4 px-4 font-bold text-right">Daily (1d)</th>
                <th className="py-4 px-4 font-bold text-right text-emerald-400">7 Days (-5%)</th>
                <th className="py-4 px-4 font-bold text-right text-emerald-400">15 Days (-10%)</th>
                <th className="py-4 px-4 font-bold text-right text-electric">30 Days (-15%)</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map((v) => {
                const isEV = v.category === 'electric';
                return (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-7 bg-midnight rounded p-0.5 shrink-0 flex items-center justify-center">
                          <img
                            src={v.image || '/images/vehicles/fallback-car.svg'}
                            alt={v.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-bold block text-midnight">{v.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {v.color} ({v.year})
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                          isEV ? 'bg-electric/20 text-midnight' : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {isEV ? 'Electric' : 'Fuel'} {v.bodyStyle}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700">{v.groundClearance}</td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {v.rangeVerified ? (
                        v.rangeOrMileage
                      ) : (
                        <span className="text-amber-700 font-semibold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">
                          Verify Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-midnight font-mono">
                      {formatNPR(v.dailyRate)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-800 font-mono">
                      {formatNPR(v.weeklyRate)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-800 font-mono">
                      {formatNPR(v.fifteenDayRate)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600 font-mono">
                      {formatNPR(v.monthlyRate)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/booking?vehicle=${v.id}`}
                        className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors"
                      >
                        Book
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
