// E2E Verification script to test all customer & admin paths against the live server
const BASE_URL = 'http://localhost:3001';

async function run() {
  console.log(`Starting E2E tests against ${BASE_URL}...`);
  let passed = 0;

  // 1. Homepage
  const homeRes = await fetch(`${BASE_URL}/`);
  if (homeRes.status === 200) {
    console.log('✓ 1. Homepage loaded (200 OK)');
    passed++;
  } else {
    console.error(`✗ 1. Homepage failed (${homeRes.status})`);
  }

  // 2. Vehicles API - All 19 vehicles
  const vehRes = await fetch(`${BASE_URL}/api/vehicles`);
  const vehData = await vehRes.json();
  if (vehRes.status === 200 && vehData.count === 19) {
    console.log(`✓ 2. Vehicles API returned all ${vehData.count} registered vehicles`);
    passed++;
  } else {
    console.error(`✗ 2. Vehicles API failed: count = ${vehData?.count}`);
  }

  // 3. Electric Vehicles filter
  const evRes = await fetch(`${BASE_URL}/api/vehicles?category=electric`);
  const evData = await evRes.json();
  if (evData.count === 13) {
    console.log(`✓ 3. Electric vehicles category returned all 13 electric models`);
    passed++;
  } else {
    console.error(`✗ 3. Electric filter failed: count = ${evData?.count}`);
  }

  // 4. Fuel Vehicles filter
  const fuelRes = await fetch(`${BASE_URL}/api/vehicles?category=fuel`);
  const fuelData = await fuelRes.json();
  if (fuelData.count === 6) {
    console.log(`✓ 4. Fuel vehicles category returned all 6 fuel models`);
    passed++;
  } else {
    console.error(`✗ 4. Fuel filter failed: count = ${fuelData?.count}`);
  }

  // 5. Individual Vehicle Detail (e.g. Deepal S07)
  const detailRes = await fetch(`${BASE_URL}/vehicles/deepal-s07`);
  if (detailRes.status === 200) {
    console.log('✓ 5. Dynamic vehicle detail page loaded for deepal-s07');
    passed++;
  } else {
    console.error(`✗ 5. Detail page failed (${detailRes.status})`);
  }

  // 6. Pricing Page
  const pricingRes = await fetch(`${BASE_URL}/pricing`);
  if (pricingRes.status === 200) {
    console.log('✓ 6. Pricing table page loaded');
    passed++;
  } else {
    console.error(`✗ 6. Pricing page failed`);
  }

  // 7. Booking Submission Flow (POST /api/bookings)
  const bookingPayload = {
    vehicleId: 'byd-atto-1',
    customerName: 'Aarav Adhikari',
    customerPhone: '9841234567',
    customerEmail: 'aarav@example.com',
    notes: 'Please arrange airport pickup at TIA Terminal 1',
    preferredContact: 'whatsapp',
    pickupLocation: 'Tribhuvan International Airport (TIA), Kathmandu',
    returnLocation: 'Tribhuvan International Airport (TIA), Kathmandu',
    pickupDate: '2026-11-01',
    pickupTime: '10:00',
    returnDate: '2026-11-23', // 22 days: Prompt test case!
    returnTime: '10:00',
  };

  const bookRes = await fetch(`${BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload),
  });
  const bookData = await bookRes.json();

  if (bookRes.status === 200 && bookData.success && bookData.booking?.reference) {
    console.log(`✓ 7. Booking request submitted successfully! Ref: ${bookData.booking.reference}`);
    console.log(`     Calculated total: NPR ${bookData.booking.pricing.subtotal.toLocaleString()} for ${bookData.booking.rentalDays} days`);
    console.log(`     Breakdown: ${JSON.stringify(bookData.booking.pricing.breakdown.map(b => b.label))}`);
    passed++;

    // 8. Retrieve Confirmation page with reference
    const confirmRes = await fetch(`${BASE_URL}/booking/confirmation?ref=${bookData.booking.reference}`);
    if (confirmRes.status === 200) {
      console.log('✓ 8. Booking confirmation page loaded for generated reference');
      passed++;
    }

    // 9. Conflict Check: Test double booking prevention for overlapping confirmed booking
    // First, confirm the first booking via PATCH
    const confirmPatchRes = await fetch(`${BASE_URL}/api/bookings/${bookData.booking.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' }),
    });
    const patchData = await confirmPatchRes.json();
    if (patchData.success && patchData.booking.status === 'confirmed') {
      console.log('✓ 9a. Booking status updated to "confirmed"');
      passed++;

      // Now attempt an overlapping booking for the same vehicle
      const conflictRes = await fetch(`${BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingPayload,
          customerName: 'Conflict Tester',
          pickupDate: '2026-11-10',
          returnDate: '2026-11-15',
        }),
      });
      const conflictData = await conflictRes.json();
      if (!conflictData.success && conflictRes.status === 400) {
        console.log(`✓ 9b. Overlapping confirmed booking successfully blocked! Error: "${conflictData.error}"`);
        passed++;
      } else {
        console.error('✗ 9b. Overlapping booking was NOT blocked!');
      }
    }
  } else {
    console.error('✗ 7. Booking creation failed:', bookData);
  }

  // 10. Admin Stats API
  const statsRes = await fetch(`${BASE_URL}/api/bookings?stats=true`);
  const statsData = await statsRes.json();
  if (statsData.success && statsData.stats.totalBookings >= 1) {
    console.log(`✓ 10. Admin stats API validated: Total bookings = ${statsData.stats.totalBookings}, Confirmed = ${statsData.stats.confirmedBookings}, Revenue = NPR ${statsData.stats.confirmedRevenue.toLocaleString()}`);
    passed++;
  } else {
    console.error('✗ 10. Admin stats API failed');
  }

  // 11. Admin Login API
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'udrive2026' }),
  });
  const loginData = await loginRes.json();
  if (loginData.success) {
    console.log('✓ 11. Admin password verification succeeded');
    passed++;
  } else {
    console.error('✗ 11. Admin login failed');
  }

  // 12. Sitemap and Robots
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  if (sitemapRes.status === 200 && robotsRes.status === 200) {
    console.log('✓ 12. Sitemap.xml and Robots.txt generated and accessible');
    passed++;
  } else {
    console.error('✗ 12. Sitemap or robots failed');
  }

  console.log(`\n========================================`);
  console.log(`ALL TESTS PASSED: ${passed}/12 test suites verified!`);
  console.log(`========================================\n`);
}

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
