-- ============================================================
-- UDRIVE RENTAL SERVICE DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('electric', 'fuel')),
    body_style TEXT NOT NULL CHECK (body_style IN ('Hatchback', 'SUV', 'Pickup')),
    fuel_type TEXT NOT NULL CHECK (fuel_type IN ('Electric', 'Petrol', 'Diesel')),
    year INTEGER NOT NULL,
    color TEXT NOT NULL,
    ground_clearance TEXT NOT NULL,
    range_or_mileage TEXT NOT NULL,
    range_verified BOOLEAN NOT NULL DEFAULT true,
    daily_rate NUMERIC NOT NULL,
    weekly_rate NUMERIC NOT NULL,
    fifteen_day_rate NUMERIC NOT NULL,
    monthly_rate NUMERIC NOT NULL,
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    maintenance_status TEXT NOT NULL DEFAULT 'operational' CHECK (maintenance_status IN ('operational', 'maintenance', 'unavailable')),
    verification_note TEXT,
    specs JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE NOT NULL,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE RESTRICT,
    vehicle_name TEXT NOT NULL,
    vehicle_image TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    notes TEXT,
    preferred_contact TEXT NOT NULL DEFAULT 'whatsapp' CHECK (preferred_contact IN ('whatsapp', 'phone', 'email')),
    pickup_location TEXT NOT NULL,
    return_location TEXT NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL DEFAULT '10:00:00',
    return_date DATE NOT NULL,
    return_time TIME NOT NULL DEFAULT '10:00:00',
    rental_days INTEGER NOT NULL CHECK (rental_days >= 1),
    pricing JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Vehicle Maintenance & Blocked Dates Table
CREATE TABLE IF NOT EXISTS public.vehicle_maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    business_name TEXT NOT NULL DEFAULT 'UDrive Rental Service',
    phone TEXT DEFAULT '',
    whatsapp_number TEXT DEFAULT '',
    email TEXT DEFAULT '',
    facebook_url TEXT NOT NULL DEFAULT 'https://www.facebook.com/profile.php?id=61584871988112',
    pickup_locations TEXT[] NOT NULL DEFAULT '{"Kathmandu Airport (TIA)", "Thamel, Kathmandu", "Lazimpat, Kathmandu", "Jhamsikhel, Lalitpur", "Pokhara Lakeside"}',
    minimum_rental_days INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Indexes for High Performance Queries
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON public.vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_published ON public.vehicles(is_published);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON public.vehicles(is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_dates ON public.bookings(vehicle_id, pickup_date, return_date, status);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(reference);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- 7. Row Level Security (RLS)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_maintenance ENABLE ROW LEVEL SECURITY;

-- Vehicles: Public can read published vehicles
CREATE POLICY "Public can view published vehicles" ON public.vehicles
    FOR SELECT USING (is_published = true);

-- Vehicles: Admin full access
CREATE POLICY "Admins have full access to vehicles" ON public.vehicles
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Bookings: Anyone can submit a booking request
CREATE POLICY "Public can insert bookings" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Bookings: Only authenticated admins can view and update bookings
CREATE POLICY "Admins have full access to bookings" ON public.bookings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site Settings: Anyone can read settings
CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Site Settings: Only authenticated admins can modify settings
CREATE POLICY "Admins can update site settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
