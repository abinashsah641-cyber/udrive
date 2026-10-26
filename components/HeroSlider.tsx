'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Zap,
  Fuel,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface HeroSlideVehicle {
  id: string;
  slug: string;
  name: string;
  category: 'electric' | 'fuel';
  bodyStyle: string;
  fuelType: string;
  year: number;
  color: string;
  groundClearance: string;
  rangeOrMileage: string;
  dailyRate: number;
  image: string;
  tagline: string;
}

export const HERO_VEHICLES: HeroSlideVehicle[] = [
  // 13 Electric Vehicles
  {
    id: 'deepal-s07',
    slug: 'deepal-s07',
    name: 'Changan Deepal S07',
    category: 'electric',
    bodyStyle: 'Luxury SUV',
    fuelType: 'Electric',
    year: 2025,
    color: 'White / Blue / Green',
    groundClearance: '175 mm',
    rangeOrMileage: '485 km Range',
    dailyRate: 13000,
    image: '/images/hero-slider/deepal_s07_white_blue_green_nepal_hero.webp',
    tagline: 'Flagship Luxury EV with 485 km Range & Panoramic Vista',
  },
  {
    id: 'byd-atto-3',
    slug: 'byd-atto-3',
    name: 'BYD Atto 3',
    category: 'electric',
    bodyStyle: 'Premium SUV',
    fuelType: 'Electric',
    year: 2024,
    color: 'Metallic Blue',
    groundClearance: '175 mm',
    rangeOrMileage: '420 km+ Range',
    dailyRate: 9500,
    image: '/images/hero-slider/byd_atto3_blue_nepal_hero.webp',
    tagline: 'World-Leading Blade Battery Safety & Nepal Highway Comfort',
  },
  {
    id: 'byd-atto-2',
    slug: 'byd-atto-2',
    name: 'BYD Atto 2',
    category: 'electric',
    bodyStyle: 'High-Clearance SUV',
    fuelType: 'Electric',
    year: 2026,
    color: 'Midnight Black',
    groundClearance: '200 mm',
    rangeOrMileage: '420 km Range',
    dailyRate: 9000,
    image: '/images/hero-slider/byd_atto2_black_nepal_hero.webp',
    tagline: '200 mm High Ground Clearance for Varied Nepal Road Terrains',
  },
  {
    id: 'byd-atto-1',
    slug: 'byd-atto-1',
    name: 'BYD Atto 1',
    category: 'electric',
    bodyStyle: 'Urban Hatchback',
    fuelType: 'Electric',
    year: 2025,
    color: 'Spark-Green',
    groundClearance: '175 mm',
    rangeOrMileage: '280–300 km Range',
    dailyRate: 6500,
    image: '/images/hero-slider/byd_atto1_spark_green_nepal_hero.webp',
    tagline: 'Agile Urban Commuter in Vibrant Spark-Green',
  },
  {
    id: 'deepal-s05',
    slug: 'deepal-s05',
    name: 'Changan Deepal S05',
    category: 'electric',
    bodyStyle: 'Compact SUV',
    fuelType: 'Electric',
    year: 2025,
    color: 'Black / White',
    groundClearance: '175 mm',
    rangeOrMileage: '405 km Range',
    dailyRate: 9000,
    image: '/images/hero-slider/deepal_s05_black_white_nepal_hero.webp',
    tagline: 'Futuristic Intelligent Cabin with 405 km Pure Electric Range',
  },
  {
    id: 'omoda-e5-pro',
    slug: 'omoda-e5-pro',
    name: 'Omoda E5 Pro',
    category: 'electric',
    bodyStyle: 'Fastback Crossover',
    fuelType: 'Electric',
    year: 2026,
    color: 'Cloud Blue (Sunroof)',
    groundClearance: '191 mm',
    rangeOrMileage: '420 km+ Range',
    dailyRate: 10000,
    image: '/images/hero-slider/omoda_e5_pro_cloud_blue_nepal_hero.webp',
    tagline: 'Dynamic Cloud Blue Fastback Crossover with Sunroof',
  },
  {
    id: 'omoda-e5',
    slug: 'omoda-e5',
    name: 'Omoda E5',
    category: 'electric',
    bodyStyle: 'Fastback SUV',
    fuelType: 'Electric',
    year: 2025,
    color: 'Dark Obsidian',
    groundClearance: '191 mm',
    rangeOrMileage: '400 km+ Range',
    dailyRate: 9500,
    image: '/images/hero-slider/omoda_e5_dark_nepal_hero.webp',
    tagline: 'Sleek Aerodynamic Design with 191 mm High Clearance',
  },
  {
    id: 'ridard-pickup',
    slug: 'ridard-pickup',
    name: 'Geely Riddara RD6',
    category: 'electric',
    bodyStyle: '4WD Electric Pickup',
    fuelType: 'Electric',
    year: 2026,
    color: 'Serene Blue',
    groundClearance: '225 mm',
    rangeOrMileage: '425 km+ Range',
    dailyRate: 15000,
    image: '/images/hero-slider/riddara_serene_blue_nepal_hero.webp',
    tagline: 'High-Power Electric 4WD Pickup with 225 mm Ground Clearance',
  },
  {
    id: 'jaeco-j5',
    slug: 'jaeco-j5',
    name: 'Jaecoo J5',
    category: 'electric',
    bodyStyle: 'Premium SUV',
    fuelType: 'Electric',
    year: 2025,
    color: 'Glacier White',
    groundClearance: '185 mm',
    rangeOrMileage: '430 km Range',
    dailyRate: 10000,
    image: '/images/hero-slider/jaecoo_j5_white_nepal_hero.webp',
    tagline: 'Rugged Aesthetics & Refined Urban Sophistication',
  },
  {
    id: 'naami-vigo',
    slug: 'naami-vigo',
    name: 'Dongfeng Nammi 01 (Vigo)',
    category: 'electric',
    bodyStyle: 'Smart Crossover',
    fuelType: 'Electric',
    year: 2025,
    color: 'Pearl White (Moonroof)',
    groundClearance: '190 mm',
    rangeOrMileage: '380 km Range',
    dailyRate: 8500,
    image: '/images/hero-slider/naami_vigo_white_nepal_hero.webp',
    tagline: 'Chic Frameless Doors with Large Moonroof & 190 mm Clearance',
  },
  {
    id: 'naami-box',
    slug: 'naami-box',
    name: 'Dongfeng Nammi Box',
    category: 'electric',
    bodyStyle: 'Compact Hatchback',
    fuelType: 'Electric',
    year: 2025,
    color: 'Ocean Blue',
    groundClearance: '196 mm',
    rangeOrMileage: '280–300 km Range',
    dailyRate: 7000,
    image: '/images/hero-slider/naami_box_blue_nepal_hero.webp',
    tagline: 'Compact Efficiency with Class-Leading 196 mm Ground Clearance',
  },
  {
    id: 'i-caur',
    slug: 'i-caur',
    name: 'Chery iCar 03',
    category: 'electric',
    bodyStyle: 'All-Terrain 4WD EV',
    fuelType: 'Electric',
    year: 2026,
    color: 'Polar White',
    groundClearance: '195 mm',
    rangeOrMileage: '401 km Range',
    dailyRate: 10000,
    image: '/images/hero-slider/icar_white_nepal_hero.webp',
    tagline: 'Boxy Retro-Futuristic Electric SUV Built for Nepal Roads',
  },
  {
    id: 'nevo-e5',
    slug: 'nevo-e5',
    name: 'Tata Nexon EV / Nevo',
    category: 'electric',
    bodyStyle: 'Compact SUV',
    fuelType: 'Electric',
    year: 2022,
    color: 'Teal Blue (Sunroof)',
    groundClearance: '205 mm',
    rangeOrMileage: '312–465 km Range',
    dailyRate: 6500,
    image: '/images/hero-slider/tata_nexon_tea_blue_nepal_hero.webp',
    tagline: 'Proven Electric Hill Climber with 205 mm High Ground Clearance',
  },

  // 6 Fuel Vehicles
  {
    id: 'toyota-hilux-4x4',
    slug: 'toyota-hilux-4x4',
    name: 'Toyota Hilux 4x4 Double Cab',
    category: 'fuel',
    bodyStyle: 'Heavy-Duty 4x4 Pickup',
    fuelType: 'Diesel',
    year: 2020,
    color: 'Alpine White',
    groundClearance: '310 mm',
    rangeOrMileage: '12 km/litre Diesel',
    dailyRate: 17000,
    image: '/images/hero-slider/toyota_hilux_4x4_2020_white_diesel_nepal_hero.webp',
    tagline: 'Indomitable 4x4 Off-Road Legend with 310 mm Ground Clearance',
  },
  {
    id: 'kia-sonet',
    slug: 'kia-sonet',
    name: 'Kia Sonet Smart',
    category: 'fuel',
    bodyStyle: 'Compact SUV',
    fuelType: 'Petrol',
    year: 2021,
    color: 'Glacier White Pearl',
    groundClearance: '205 mm',
    rangeOrMileage: '16 km/litre Petrol',
    dailyRate: 7500,
    image: '/images/hero-slider/kia_sonet_2021_white_petrol_nepal_hero.webp',
    tagline: 'Modern Petrol Compact SUV with High Ground Clearance',
  },
  {
    id: 'nissan-magnite',
    slug: 'nissan-magnite',
    name: 'Nissan Magnite Turbo',
    category: 'fuel',
    bodyStyle: 'Compact SUV',
    fuelType: 'Petrol',
    year: 2021,
    color: 'Blade Silver',
    groundClearance: '205 mm',
    rangeOrMileage: '18–20 km/litre',
    dailyRate: 7000,
    image: '/images/hero-slider/nissan_magnite_silver_petrol_nepal_hero.webp',
    tagline: 'Economical Turbocharged Petrol SUV Built for Daily Travel',
  },
  {
    id: 'grand-i10',
    slug: 'grand-i10',
    name: 'Hyundai Grand i10 NIOS',
    category: 'fuel',
    bodyStyle: 'Hatchback',
    fuelType: 'Petrol',
    year: 2025,
    color: 'Typhoon Silver',
    groundClearance: '165 mm',
    rangeOrMileage: '18–20 km/litre',
    dailyRate: 6500,
    image: '/images/hero-slider/hyundai_grand_i10_silver_petrol_nepal_hero.webp',
    tagline: 'Nimble & Ultra-Efficient Kathmandu City Hatchback',
  },
  {
    id: 'hyundai-i20',
    slug: 'hyundai-i20',
    name: 'Hyundai i20',
    category: 'fuel',
    bodyStyle: 'Hatchback',
    fuelType: 'Petrol',
    year: 2010,
    color: 'Sleek Silver',
    groundClearance: '170 mm',
    rangeOrMileage: '16–18 km/litre',
    dailyRate: 5000,
    image: '/images/hero-slider/hyundai_i20_2010_silver_petrol_nepal_hero.webp',
    tagline: 'Budget-Friendly City Commuter at NPR 5,000 / day',
  },
  {
    id: 'vw-polo',
    slug: 'vw-polo',
    name: 'Volkswagen Polo GT',
    category: 'fuel',
    bodyStyle: 'Hatchback',
    fuelType: 'Petrol',
    year: 2014,
    color: 'Candy White',
    groundClearance: '165 mm',
    rangeOrMileage: '16–18 km/litre',
    dailyRate: 5000,
    image: '/images/hero-slider/volkswagen_polo_2014_white_petrol_nepal_hero.webp',
    tagline: 'Solid German Build & Highway Handling at NPR 5,000 / day',
  },
];

const AUTO_SCROLL_INTERVAL = 5500; // 5.5 seconds per slide

export default function HeroSlider() {
  const [filter, setFilter] = useState<'all' | 'electric' | 'fuel'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Filtered vehicles list
  const filteredVehicles = HERO_VEHICLES.filter((v) => {
    if (filter === 'all') return true;
    return v.category === filter;
  });

  // Ensure index stays in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const activeVehicle = filteredVehicles[currentIndex] || filteredVehicles[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredVehicles.length);
  }, [filteredVehicles.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredVehicles.length) % filteredVehicles.length);
  }, [filteredVehicles.length]);

  // Auto-scroll timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  return (
    <div
      className="relative rounded-3xl bg-[#0F131C] border border-[#242933] p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle architectural ambient lights */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD83D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#28618F]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Slider Header: Filter tabs + Slide Counter + Pause indicator */}
      <div className="relative z-10 flex items-center justify-between pb-3 sm:pb-4 border-b border-[#242933]/80 gap-2">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 bg-[#161B26] p-1 rounded-xl border border-[#242933]">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({HERO_VEHICLES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('electric')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              filter === 'electric'
                ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3 h-3 text-[#28618F]" />
            <span>EVs (13)</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('fuel')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              filter === 'fuel'
                ? 'bg-[#FFD83D] text-[#080A0D] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Fuel className="w-3 h-3 text-slate-400" />
            <span>Fuel (6)</span>
          </button>
        </div>

        {/* Counter & Status */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-mono font-semibold text-slate-400 bg-[#161B26] px-2.5 py-1 rounded-lg border border-[#242933]">
            <span className="text-[#FFD83D] font-bold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-600 mx-1">/</span>
            <span>{String(filteredVehicles.length).padStart(2, '0')}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-[#161B26] border border-[#242933] text-slate-400 hover:text-white transition-colors"
            title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Vehicle Canvas */}
      <div className="relative mt-3 sm:mt-4">
        {/* Vehicle Badge & Key Spec Overlay */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                activeVehicle.category === 'electric'
                  ? 'bg-[#FFD83D] text-[#080A0D]'
                  : 'bg-[#28618F] text-white'
              }`}
            >
              {activeVehicle.category === 'electric' ? (
                <>
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Electric</span>
                </>
              ) : (
                <>
                  <Fuel className="w-3 h-3" />
                  <span>{activeVehicle.fuelType}</span>
                </>
              )}
            </span>
            <span className="text-xs font-semibold text-white truncate">
              {activeVehicle.name}
            </span>
          </div>

          <span
            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
              activeVehicle.category === 'electric'
                ? 'text-[#60A5FA] border-[#28618F]/40 bg-[#28618F]/15'
                : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
            }`}
          >
            {activeVehicle.rangeOrMileage}
          </span>
        </div>

        {/* 16:9 Aspect Vehicle Photo Display */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-[#080A0D] border border-[#242933]">
          <Link href={`/vehicles/${activeVehicle.slug}`} className="block relative w-full h-full group/image">
            <Image
              key={activeVehicle.image}
              src={activeVehicle.image}
              alt={`${activeVehicle.name} - U Drive Nepal Vehicle Rental`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 max-w-[70%]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD83D] animate-ping" />
                <span className="truncate font-medium text-[11px] sm:text-xs">
                  {activeVehicle.tagline}
                </span>
              </div>

              <div className="bg-[#FFD83D] text-[#080A0D] font-bold px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs flex items-center gap-1 shadow-lg shrink-0">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 group-hover/image:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Navigation Chevron Buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#FFD83D] text-white hover:text-[#080A0D] border border-white/15 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
            aria-label="Previous Vehicle"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#FFD83D] text-white hover:text-[#080A0D] border border-white/15 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
            aria-label="Next Vehicle"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Road Progress Animation Bar */}
        <div className="relative w-full h-1 bg-[#1A202C] rounded-full overflow-hidden my-3">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-[#28618F] via-[#FFD83D] to-[#FFD83D] transition-all"
            style={{
              animation: isPaused ? 'none' : `progressAnim ${AUTO_SCROLL_INTERVAL}ms linear`,
              width: isPaused ? '100%' : '100%',
            }}
          />
        </div>

        {/* Vehicle Footer Specs & Price */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span>{activeVehicle.groundClearance} Clearance</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="hidden sm:inline-block text-slate-400">
              {activeVehicle.year} Model
            </span>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] text-slate-400">Daily Rate:</span>
            <span className="text-[#FFD83D] font-extrabold text-base font-heading">
              NPR {activeVehicle.dailyRate.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Quick Dots Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-[#242933]/60 flex-wrap">
          {filteredVehicles.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 bg-[#FFD83D]'
                  : 'w-1.5 bg-[#242933] hover:bg-slate-500'
              }`}
              title={v.name}
              aria-label={`Go to slide ${i + 1}: ${v.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
