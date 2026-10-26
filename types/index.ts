export type VehicleCategory = 'electric' | 'fuel';
export type BodyStyle = 'Hatchback' | 'SUV' | 'Pickup';
export type FuelType = 'Electric' | 'Petrol' | 'Diesel';

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  bodyStyle: BodyStyle;
  fuelType: FuelType;
  year: number;
  color: string;
  groundClearance: string;
  rangeOrMileage: string;
  rangeVerified: boolean;
  dailyRate: number;
  weeklyRate: number;     // 7 days
  fifteenDayRate: number; // 15 days
  monthlyRate: number;    // 30 days
  image: string;
  gallery?: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  maintenanceStatus: 'operational' | 'maintenance' | 'unavailable';
  verificationNote?: string;
  specs: {
    label: string;
    value: string;
  }[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageBreakdownItem {
  packageType: 'monthly' | 'fifteen_day' | 'weekly' | 'daily';
  label: string;
  count: number;
  daysCovered: number;
  unitRate: number;
  subtotal: number;
}

export interface PricingCalculation {
  totalDays: number;
  dailyRate: number;
  totalBeforeDiscount: number; // totalDays * dailyRate
  subtotal: number;
  savings: number;
  savingsPercent: number;
  breakdown: PackageBreakdownItem[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingRequest {
  id: string;
  reference: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:mm
  returnDate: string; // YYYY-MM-DD
  returnTime: string; // HH:mm
  rentalDays: number;
  pricing: PricingCalculation;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  businessName: string;
  phone: string;
  whatsappNumber: string; // E.g. "97798XXXXXXXX" or empty if unconfigured
  email: string;
  facebookUrl: string;
  instagramUrl?: string;
  pickupLocations: string[];
  minimumRentalDays: number;
}
