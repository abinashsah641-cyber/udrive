import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVehicleBySlug, getAllVehicles } from '@/lib/db';
import VehicleDetailClient from './VehicleDetailClient';
import { formatNPR } from '@/lib/pricing';



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return { title: 'Vehicle Not Found | UDrive Nepal' };
  }

  return {
    title: `${vehicle.name} (${vehicle.year}) Rental in Nepal | UDrive`,
    description: `Rent the ${vehicle.name} in ${vehicle.color}. Daily rate: ${formatNPR(
      vehicle.dailyRate
    )}. Ground clearance: ${vehicle.groundClearance}. Transparent weekly & monthly packages.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const allVehicles = await getAllVehicles({ onlyPublished: true });
  const similar = allVehicles
    .filter((v) => v.id !== vehicle.id && (v.category === vehicle.category || v.bodyStyle === vehicle.bodyStyle))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <VehicleDetailClient vehicle={vehicle} similarVehicles={similar} />
    </div>
  );
}
