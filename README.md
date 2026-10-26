# UDrive Rental Service - Nepal

A full-stack, production-ready automotive rental web platform for **UDrive Rental Service** in Nepal. Features all 19 registered vehicle models (13 Electric Vehicles and 6 Manual/Fuel Vehicles), an automated pricing engine with published package discounts (5% weekly, 10% 15-day, 15% monthly), an animated hero section with an embedded booking widget, a multi-step booking request flow, WhatsApp integration, and a secure administrative dashboard.

---

## 🌟 Key Highlights

- **Complete 19-Vehicle Fleet**: Full catalog with individual model-specific visual assets, ground clearance, fuel/powertrain ratings, and exact published rates in Nepalese Rupees (NPR).
- **Exact Pricing Mathematics**: Built-in pricing engine adhering strictly to authorized discounts (5% weekly, 10% 15-day, 15% monthly) and finding the least expensive eligible package combination for arbitrary booking durations (e.g. 22-day booking automatically combines 15-day and 7-day rates).
- **Kathmandu Localized**: Timezone handling in `Asia/Kathmandu` (UTC +05:45), date validation preventing invalid returns, and preconfigured pickup locations in Kathmandu and Pokhara.
- **5-Step Booking Workflow**: Trip schedule selection ➔ Vehicle choice ➔ Customer details ➔ Review with line items ➔ Submission generating a unique reference (e.g. `UDR-2026-XXXXX`) and "Booking Request Received" status.
- **WhatsApp Direct Integration**: Instant "Continue on WhatsApp" option with prefilled trip details and total cost, with graceful configuration guidance if unconfigured.
- **Protected Admin Portal**: Protected `/admin` dashboard with real database-derived analytics, vehicle inventory management (edit rates, specifications, availability, feature/publish toggles), and booking management with double-booking prevention.
- **Hybrid Storage & PostgreSQL Schema**: Complete Supabase PostgreSQL schema, migration, and seed files in `supabase/`, combined with an automatic file-backed JSON store (`.data/udrive-store.json`) for zero-configuration out-of-the-box local operation.

---

## 🚗 Authorized Fleet Inventory

### Electric Vehicles (13 Models)
| # | Vehicle | Year | Ground Clearance | EV Range | Daily (NPR) | 7 Days (-5%) | 15 Days (-10%) | 30 Days (-15%) |
|---|---|---|---|---|---|---|---|---|
| 1 | BYD Atto 1 (Spark-Green) | 2025 | 175 mm | 280–300 km | 6,500 | 43,225 | 87,750 | 165,750 |
| 2 | BYD Atto 2 (Black) | 2026 | 200 mm | 420 km | 9,000 | 59,850 | 121,500 | 229,500 |
| 3 | BYD Atto 3 (Blue) | 2024 | 175 mm | 420 km+ | 9,500 | 63,175 | 128,250 | 242,250 |
| 4 | Nevo E5 (Blue, Sunroof) | 2022 | 205 mm | 300 km | 6,500 | 43,225 | 87,750 | 165,750 |
| 5 | Omoda E5 (Dark, Sunroof) | 2025 | 191 mm | 400 km+ | 9,500 | 63,175 | 128,250 | 242,250 |
| 6 | Omoda E5 Pro (Cloud Blue) | 2026 | 191 mm | 420 km+ | 10,000 | 66,500 | 135,000 | 255,000 |
| 7 | Ridard (Serene Blue Pickup) | 2026 | 225 mm | 425 km+ | 15,000 | 99,750 | 202,500 | 382,500 |
| 8 | Jaeco J5 (White) | 2025 | 185 mm | 400 km | 10,000 | 66,500 | 135,000 | 255,000 |
| 9 | Naami Vigo (White, Moonroof) | 2025 | 190 mm | 380 km | 8,500 | 56,525 | 114,750 | 216,750 |
| 10 | Naami Box (Blue) | 2025 | 196 mm | 280–300 km | 7,000 | 46,550 | 94,500 | 178,500 |
| 11 | i-caur (White)* | 2026 | 195 mm | Flagged (400+500) | 10,000 | 66,500 | 135,000 | 255,000 |
| 12 | Deepal S05 (Black/White) | 2025 | 175 mm | 405 km | 9,000 | 59,850 | 121,500 | 229,500 |
| 13 | Deepal S07 (White/Blue/Green) | 2025 | 175 mm | 485 km | 13,000 | 86,450 | 175,500 | 331,500 |

*\*Note: The i-caur range specification is flagged in the catalog awaiting owner confirmation, preserving technical integrity.*

### Manual / Fuel Vehicles (6 Models)
| # | Vehicle | Fuel | Year | Ground Clearance | Mileage | Daily (NPR) | 7 Days (-5%) | 15 Days (-10%) | 30 Days (-15%) |
|---|---|---|---|---|---|---|---|---|---|
| 14 | Grand i10 (Silver) | Petrol | 2025 | 165 mm | 18–20 km/l | 6,500 | 43,225 | 87,750 | 165,750 |
| 15 | Nissan Magnite (Silver) | Petrol | 2021 | 205 mm | 18–20 km/l | 7,000 | 46,550 | 94,500 | 178,500 |
| 16 | i20 (Silver) | Petrol | 2010 | 170 mm | 16–18 km/l | 5,000 | 33,250 | 67,500 | 127,500 |
| 17 | Volkswagen Polo (White) | Petrol | 2014 | 165 mm | 16–18 km/l | 5,000 | 33,250 | 67,500 | 127,500 |
| 18 | Kia Sonet (White) | Petrol | 2021 | 205 mm | 16 km/l | 7,500 | 49,875 | 101,250 | 191,250 |
| 19 | Toyota Hilux 4x4 (White) | Diesel | 2020 | 310 mm | 12 km/l | 17,000 | 113,050 | 229,500 | 433,500 |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS v4 & custom automotive design tokens
- **Icons**: Lucide React
- **Animations**: CSS Transforms & Framer Motion with `prefers-reduced-motion` compliance
- **Database & Storage**: PostgreSQL / Supabase ready (`supabase/schema.sql` and `supabase/seed.sql`) with seamless zero-dependency local JSON file store fallback
- **Server API**: REST endpoints with server-side validation (`/api/bookings`, `/api/vehicles`, `/api/settings`, `/api/admin/login`)

---

## 🚀 Quick Start & Local Development

### 1. Installation
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default development values:
- `ADMIN_PASSWORD=udrive2026`
- `NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/profile.php?id=61584871988112`

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or your designated port) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Administrative Access

- **Admin URL**: `/admin` (or click "Admin" in top navigation)
- **Default Password**: `udrive2026` (configure via `ADMIN_PASSWORD` in `.env.local`)
- **Capabilities**:
  - Review and filter booking requests by status (Pending, Confirmed, Completed, Cancelled).
  - Update vehicle prices (Daily, 7d, 15d, 30d rates).
  - Toggle vehicle operational availability and maintenance flags.
  - Double booking protection: Confirmed bookings automatically block conflicting dates for the same vehicle.
  - Set official business WhatsApp number, contact phone, and pickup locations.

---

## 🗄️ Database Schema & Supabase Setup

To connect to a managed Supabase PostgreSQL instance:
1. Create a project in [Supabase](https://supabase.com).
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Run `supabase/seed.sql` to populate the 19 vehicles and settings.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

---

## ✅ Verified Test Matrix

The test suite in `scripts/verify-e2e.mjs` and `scripts/test-pricing.mjs` validates:
1. All 19 vehicles appear in the correct category (13 EV, 6 Fuel).
2. Daily, 7-day, 15-day, and 30-day prices match the exact authorized figures.
3. Arbitrary duration pricing selects the optimal package breakdown (tested with 1, 7, 15, 22, 30 days).
4. Date validation prevents return preceding pickup.
5. Inbound booking requests generate unique human-readable references (`UDR-2026-XXXXX`).
6. Overlapping confirmed bookings for the same vehicle are blocked.
7. Admin dashboard computes real revenue exclusively from confirmed/completed rentals.
8. SEO metadata, XML sitemap (`/sitemap.xml`), and robots rules (`/robots.txt`) render cleanly.
