import fs from 'fs';
import path from 'path';
import { INITIAL_VEHICLES } from '@/data/initial-vehicles';
import { Vehicle, BookingRequest, SiteSettings, BookingStatus } from '@/types';
import { calculateRentalPricing } from './pricing';
import { doDateRangesOverlap } from './date-utils';

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'udrive-store.json');

export interface UDriveDataStore {
  vehicles: Vehicle[];
  bookings: BookingRequest[];
  settings: SiteSettings;
}

const DEFAULT_SETTINGS: SiteSettings = {
  businessName: 'U Drive Rental Service',
  phone: '+977-9800899505',
  whatsappNumber: '9800899505', // Official WhatsApp line
  email: 'udriverentalcarservice@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61584871988112',
  instagramUrl: 'https://www.instagram.com/udrivve?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==',
  pickupLocations: [
    'Tribhuvan International Airport (TIA), Kathmandu',
    'Thamel, Kathmandu',
    'Lazimpat, Kathmandu',
    'Jhamsikhel / Sanepa, Lalitpur',
    'Lakeside, Pokhara',
  ],
  minimumRentalDays: 1,
};

function ensureStore(): UDriveDataStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial: UDriveDataStore = {
        vehicles: INITIAL_VEHICLES,
        bookings: [],
        settings: {
          ...DEFAULT_SETTINGS,
          whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9800899505',
          phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+977-9800899505',
          email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'udriverentalcarservice@gmail.com',
        },
      };
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as UDriveDataStore;
    
    // Check if vehicles are present, if not seed them
    if (!parsed.vehicles || parsed.vehicles.length === 0) {
      parsed.vehicles = INITIAL_VEHICLES;
      fs.writeFileSync(STORE_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error accessing data store, falling back to memory seed:', err);
    return {
      vehicles: INITIAL_VEHICLES,
      bookings: [],
      settings: DEFAULT_SETTINGS,
    };
  }
}

function saveStore(data: UDriveDataStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save data store:', err);
  }
}

// ----------------- VEHICLE OPERATIONS -----------------

export async function getAllVehicles(options?: {
  category?: 'electric' | 'fuel';
  bodyStyle?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'year-desc' | 'featured';
  onlyPublished?: boolean;
}): Promise<Vehicle[]> {
  const store = ensureStore();
  let list = [...store.vehicles];

  if (options?.onlyPublished !== false) {
    list = list.filter((v) => v.isPublished);
  }

  if (options?.category) {
    list = list.filter((v) => v.category === options.category);
  }

  if (options?.bodyStyle && options.bodyStyle !== 'All') {
    list = list.filter((v) => v.bodyStyle.toLowerCase() === options.bodyStyle?.toLowerCase());
  }

  if (options?.minPrice !== undefined) {
    list = list.filter((v) => v.dailyRate >= options.minPrice!);
  }

  if (options?.maxPrice !== undefined) {
    list = list.filter((v) => v.dailyRate <= options.maxPrice!);
  }

  if (options?.search) {
    const term = options.search.toLowerCase().trim();
    list = list.filter(
      (v) =>
        v.name.toLowerCase().includes(term) ||
        v.color.toLowerCase().includes(term) ||
        v.bodyStyle.toLowerCase().includes(term) ||
        v.year.toString().includes(term)
    );
  }

  if (options?.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        list.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'year-desc':
        list.sort((a, b) => b.year - a.year);
        break;
      case 'featured':
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return list;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const store = ensureStore();
  const v = store.vehicles.find((item) => item.slug === slug || item.id === slug);
  return v || null;
}

export async function updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
  const store = ensureStore();
  const index = store.vehicles.findIndex((v) => v.id === id);
  if (index === -1) return null;

  const current = store.vehicles[index];
  const updated: Vehicle = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.vehicles[index] = updated;
  saveStore(store);
  return updated;
}

export async function addVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const store = ensureStore();
  store.vehicles.push(vehicle);
  saveStore(store);
  return vehicle;
}

// ----------------- AVAILABILITY CHECK -----------------

export async function checkVehicleAvailability(
  vehicleId: string,
  pickupDate: string,
  returnDate: string
): Promise<{ isAvailable: boolean; reason?: string }> {
  const store = ensureStore();
  const vehicle = store.vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return { isAvailable: false, reason: 'Vehicle does not exist' };
  }

  if (!vehicle.isAvailable || vehicle.maintenanceStatus !== 'operational') {
    return {
      isAvailable: false,
      reason:
        vehicle.maintenanceStatus === 'maintenance'
          ? 'Vehicle is currently scheduled for routine maintenance'
          : 'Vehicle is currently unavailable for booking',
    };
  }

  // Check against confirmed bookings
  const conflicting = store.bookings.find((b) => {
    if (b.vehicleId !== vehicleId) return false;
    if (b.status === 'cancelled') return false;
    return doDateRangesOverlap(pickupDate, returnDate, b.pickupDate, b.returnDate);
  });

  if (conflicting) {
    return {
      isAvailable: false,
      reason:
        conflicting.status === 'confirmed'
          ? 'This vehicle is already booked for the selected dates'
          : 'A booking request is currently pending for these dates',
    };
  }

  return { isAvailable: true };
}

// ----------------- BOOKING OPERATIONS -----------------

export async function createBookingRequest(params: {
  vehicleId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  preferredContact?: 'whatsapp' | 'phone' | 'email';
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  rentalDays: number;
}): Promise<{ success: boolean; booking?: BookingRequest; error?: string }> {
  const store = ensureStore();
  const vehicle = store.vehicles.find((v) => v.id === params.vehicleId);

  if (!vehicle) {
    return { success: false, error: 'Selected vehicle was not found' };
  }

  // Prevent overlapping confirmed reservations
  const availability = await checkVehicleAvailability(params.vehicleId, params.pickupDate, params.returnDate);
  if (!availability.isAvailable) {
    return { success: false, error: availability.reason || 'Vehicle is not available for chosen dates' };
  }

  // Recalculate pricing strictly on server
  const pricing = calculateRentalPricing(vehicle, params.rentalDays);

  // Generate unique human-readable reference e.g. UDR-2026-A8F2K
  const refCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  const reference = `UDR-${new Date().getFullYear()}-${refCode}`;

  const booking: BookingRequest = {
    id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    reference,
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    vehicleImage: vehicle.image,
    customerName: params.customerName.trim(),
    customerPhone: params.customerPhone.trim(),
    customerEmail: params.customerEmail?.trim() || '',
    notes: params.notes?.trim() || '',
    preferredContact: params.preferredContact || 'whatsapp',
    pickupLocation: params.pickupLocation,
    returnLocation: params.returnLocation,
    pickupDate: params.pickupDate,
    pickupTime: params.pickupTime || '10:00',
    returnDate: params.returnDate,
    returnTime: params.returnTime || '10:00',
    rentalDays: params.rentalDays,
    pricing,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.bookings.unshift(booking);
  saveStore(store);

  return { success: true, booking };
}

export async function getAllBookings(options?: {
  status?: BookingStatus;
  search?: string;
}): Promise<BookingRequest[]> {
  const store = ensureStore();
  let list = [...store.bookings];

  if (options?.status) {
    list = list.filter((b) => b.status === options.status);
  }

  if (options?.search) {
    const term = options.search.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.reference.toLowerCase().includes(term) ||
        b.customerName.toLowerCase().includes(term) ||
        b.customerPhone.includes(term) ||
        b.vehicleName.toLowerCase().includes(term)
    );
  }

  return list;
}

export async function getBookingByReference(reference: string): Promise<BookingRequest | null> {
  const store = ensureStore();
  const b = store.bookings.find(
    (item) => item.reference.toUpperCase() === reference.toUpperCase() || item.id === reference
  );
  return b || null;
}

export async function updateBookingStatus(
  idOrRef: string,
  status: BookingStatus
): Promise<{ success: boolean; booking?: BookingRequest; error?: string }> {
  const store = ensureStore();
  const index = store.bookings.findIndex(
    (b) => b.id === idOrRef || b.reference.toUpperCase() === idOrRef.toUpperCase()
  );

  if (index === -1) {
    return { success: false, error: 'Booking not found' };
  }

  const target = store.bookings[index];

  // If setting to confirmed, verify no other confirmed booking overlaps for this vehicle!
  if (status === 'confirmed') {
    const conflict = store.bookings.find((other) => {
      if (other.id === target.id) return false;
      if (other.vehicleId !== target.vehicleId) return false;
      if (other.status !== 'confirmed') return false;
      return doDateRangesOverlap(target.pickupDate, target.returnDate, other.pickupDate, other.returnDate);
    });

    if (conflict) {
      return {
        success: false,
        error: `Cannot confirm booking: conflicting confirmed reservation exists (${conflict.reference}) for vehicle from ${conflict.pickupDate} to ${conflict.returnDate}.`,
      };
    }
  }

  target.status = status;
  target.updatedAt = new Date().toISOString();
  store.bookings[index] = target;
  saveStore(store);

  return { success: true, booking: target };
}

// ----------------- SITE SETTINGS -----------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const store = ensureStore();
  return store.settings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = ensureStore();
  store.settings = {
    ...store.settings,
    ...updates,
  };
  saveStore(store);
  return store.settings;
}

// ----------------- ADMIN DASHBOARD STATS -----------------

export async function getAdminStats() {
  const store = ensureStore();
  const totalBookings = store.bookings.length;
  const pendingBookings = store.bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = store.bookings.filter((b) => b.status === 'confirmed').length;
  const completedBookings = store.bookings.filter((b) => b.status === 'completed').length;
  const cancelledBookings = store.bookings.filter((b) => b.status === 'cancelled').length;

  const totalVehicles = store.vehicles.length;
  const publishedVehicles = store.vehicles.filter((v) => v.isPublished).length;
  const operationalVehicles = store.vehicles.filter((v) => v.maintenanceStatus === 'operational').length;
  const maintenanceVehicles = store.vehicles.filter((v) => v.maintenanceStatus !== 'operational').length;

  // Real confirmed revenue only from confirmed/completed rentals
  const confirmedRevenue = store.bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.pricing?.subtotal || 0), 0);

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalVehicles,
    publishedVehicles,
    operationalVehicles,
    maintenanceVehicles,
    confirmedRevenue,
  };
}
