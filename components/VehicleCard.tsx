'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { formatNPR } from '@/lib/pricing';
import { Zap, Fuel, ShieldAlert, ArrowRight, Gauge, Navigation } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export default function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const isElectric = vehicle.category === 'electric';
  const isAvailable = vehicle.isAvailable && vehicle.maintenanceStatus === 'operational';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Vehicle Media Header */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 items-center">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
              isElectric
                ? 'bg-electric text-midnight shadow-md shadow-electric/20'
                : 'bg-amber-400 text-midnight shadow-md shadow-amber-400/20'
            }`}
          >
            {isElectric ? <Zap className="w-3 h-3 fill-current" /> : <Fuel className="w-3 h-3" />}
            {isElectric ? 'Electric' : 'Fuel'}
          </span>

          <span className="bg-slate-900/80 backdrop-blur-sm text-slate-200 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-700">
            {vehicle.bodyStyle}
          </span>

          <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[11px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
            {vehicle.year}
          </span>
        </div>

        {/* Real Availability Indicator */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
              isAvailable
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Vehicle Real Photo with smooth zoom */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={vehicle.image || '/images/vehicles/fallback-car.svg'}
            alt={`${vehicle.name} ${vehicle.color}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
          />
          {/* Subtle bottom shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Subdued color label */}
        <span className="absolute bottom-2 right-3 text-[10px] text-white/90 font-mono font-medium drop-shadow-md">
          {vehicle.color}
        </span>
      </div>

      {/* Vehicle Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Color */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-heading text-lg font-bold text-midnight tracking-tight group-hover:text-slate-900">
                {vehicle.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{vehicle.color}</p>
            </div>
          </div>

          {/* Verification Notice if flagged */}
          {!vehicle.rangeVerified && (
            <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Range specs pending owner technical confirmation</span>
            </div>
          )}

          {/* Key Verified Specs Grid */}
          <div className="grid grid-cols-2 gap-2 my-3 py-2.5 border-y border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>
                <strong className="text-slate-800">
                  {vehicle.rangeVerified ? vehicle.rangeOrMileage : 'Range TBA'}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Navigation className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Clearance: <strong className="text-slate-800">{vehicle.groundClearance}</strong>
              </span>
            </div>
          </div>

          {/* Pricing Table Snapshot */}
          <div className="my-3 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Daily Rate
              </span>
              <span className="font-heading text-xl font-bold text-midnight">
                {formatNPR(vehicle.dailyRate)}
                <span className="text-xs font-normal text-slate-500"> / day</span>
              </span>
            </div>

            {/* Package Rates Grid */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[10px]">7 Days (5% off)</span>
                <span className="font-semibold text-slate-800">{formatNPR(vehicle.weeklyRate)}</span>
              </div>
              <div className="flex flex-col border-x border-slate-200 px-1.5">
                <span className="text-slate-500 text-[10px]">15 Days (10% off)</span>
                <span className="font-semibold text-slate-800">{formatNPR(vehicle.fifteenDayRate)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-500 text-[10px]">30 Days (15% off)</span>
                <span className="font-semibold text-emerald-600 font-bold">{formatNPR(vehicle.monthlyRate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card CTA Actions */}
        <div className="pt-4 flex items-center gap-2">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            View Details
          </Link>

          <Link
            href={`/booking?vehicle=${vehicle.id}`}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isAvailable
                ? 'bg-electric hover:bg-electric-hover text-midnight shadow-md shadow-electric/20 hover:scale-[1.02]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed pointer-events-none'
            }`}
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
