import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, addVehicle } from '@/lib/db';
import { Vehicle } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as 'electric' | 'fuel' | null;
    const bodyStyle = searchParams.get('bodyStyle') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sortBy') as any;
    const onlyPublished = searchParams.get('all') === 'true' ? false : true;

    const vehicles = await getAllVehicles({
      category: category || undefined,
      bodyStyle,
      minPrice,
      maxPrice,
      search,
      sortBy,
      onlyPublished,
    });

    return NextResponse.json({ success: true, vehicles, count: vehicles.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.dailyRate || !body.category) {
      return NextResponse.json({ success: false, error: 'Missing required vehicle fields' }, { status: 400 });
    }

    const vehicle: Vehicle = {
      ...body,
      id: body.id || body.slug || `veh_${Date.now()}`,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await addVehicle(vehicle);
    return NextResponse.json({ success: true, vehicle: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
