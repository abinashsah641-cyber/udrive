import { NextRequest, NextResponse } from 'next/server';
import { getVehicleBySlug, updateVehicle } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vehicle = await getVehicleBySlug(slug);

    if (!vehicle) {
      return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, vehicle });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const updated = await updateVehicle(slug, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Vehicle not found to update' }, { status: 404 });
    }

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
