import { NextRequest, NextResponse } from 'next/server';
import { createBookingRequest, getAllBookings, getAdminStats } from '@/lib/db';
import { calculateRentalDays } from '@/lib/date-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    const search = searchParams.get('search') || undefined;
    const statsOnly = searchParams.get('stats') === 'true';

    if (statsOnly) {
      const stats = await getAdminStats();
      return NextResponse.json({ success: true, stats });
    }

    const bookings = await getAllBookings({ status, search });
    return NextResponse.json({ success: true, bookings, count: bookings.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      vehicleId,
      customerName,
      customerPhone,
      customerEmail,
      notes,
      preferredContact,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    } = body;

    // Strict validation
    if (!vehicleId || !customerName || !customerPhone || !pickupLocation || !returnLocation || !pickupDate || !returnDate) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required booking fields.' },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = customerPhone.replace(/\s+/g, '');
    if (cleanPhone.length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number so our team can reach you.' },
        { status: 400 }
      );
    }

    // Date validation
    const { days, error: dateError } = calculateRentalDays(pickupDate, pickupTime, returnDate, returnTime);
    if (dateError || days <= 0) {
      return NextResponse.json(
        { success: false, error: dateError || 'Return date must follow pickup date.' },
        { status: 400 }
      );
    }

    const result = await createBookingRequest({
      vehicleId,
      customerName,
      customerPhone,
      customerEmail,
      notes,
      preferredContact,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime: pickupTime || '10:00',
      returnDate,
      returnTime: returnTime || '10:00',
      rentalDays: days,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      message: 'Booking request received successfully',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
