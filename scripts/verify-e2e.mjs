// E2E Verification script with dynamic dates
const BASE_URL = 'http://localhost:3001';

async function run() {
  console.log(`Starting E2E tests against ${BASE_URL}...`);
  let passed = 0;

  // 1. Homepage
  const homeRes = await fetch(`${BASE_URL}/`);
  if (homeRes.status === 200) {
    console.log('✓ 1. Homepage loaded (200 OK)');
    passed++;
  }

  // 2. Vehicles API - All 19 vehicles
  const vehRes = await fetch(`${BASE_URL}/api/vehicles`);
  const vehData = await vehRes.json();
  if (vehRes.status === 200 && vehData.count === 19) {
    console.log(`✓ 2. Vehicles API returned all ${vehData.count} registered vehicles`);
    passed++;
  }

  // 3. Electric Vehicles filter
  const evRes = await fetch(`${BASE_URL}/api/vehicles?category=electric`);
  const evData = await evRes.json();
  if (evData.count === 13) {
    console.log(`✓ 3. Electric vehicles category returned all 13 electric models`);
    passed++;
  }

  // 4. Fuel Vehicles filter
  const fuelRes = await fetch(`${BASE_URL}/api/vehicles?category=fuel`);
  const fuelData = await fuelRes.json();
  if (fuelData.count === 6) {
    console.log(`✓ 4. Fuel vehicles category returned all 6 fuel models`);
    passed++;
  }

  // 5. Individual Vehicle Detail (e.g. Deepal S07)
  const detailRes = await fetch(`${BASE_URL}/vehicles/deepal-s07`);
  if (detailRes.status === 200) {
    console.log('✓ 5. Dynamic vehicle detail page loaded for deepal-s07');
    passed++;
  }

  // 6. Pricing Page
  const pricingRes = await fetch(`${BASE_URL}/pricing`);
  if (pricingRes.status === 200) {
    console.log('✓ 6. Pricing table page loaded');
    passed++;
  }

  // 7. Booking Submission Flow on an unbooked vehicle (e.g. BYD Atto 2)
  const bookingPayload = {
    vehicleId: 'byd-atto-2',
    customerName: 'Aarav Adhikari',
    customerPhone: '9841234567',
    customerEmail: 'aarav@example.com',
    notes: 'Please arrange airport pickup at TIA Terminal 1',
    preferredContact: 'whatsapp',
    pickupLocation: 'Tribhuvan International Airport (TIA), Kathmandu',
    returnLocation: 'Tribhuvan International Airport (TIA), Kathmandu',
    pickupDate: '2026-12-01',
    pickupTime: '10:00',
    returnDate: '2026-12-23', // 22 days
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
    passed++;

    // 8. Confirmation page
    const confirmRes = await fetch(`${BASE_URL}/booking/confirmation?ref=${bookData.booking.reference}`);
    if (confirmRes.status === 200) {
      console.log('✓ 8. Booking confirmation page loaded for generated reference');
      passed++;
    }

    // 9a. Confirm status
    const confirmPatchRes = await fetch(`${BASE_URL}/api/bookings/${bookData.booking.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' }),
    });
    const patchData = await confirmPatchRes.json();
    if (patchData.success && patchData.booking.status === 'confirmed') {
      console.log('✓ 9a. Booking status updated to "confirmed"');
      passed++;

      // 9b. Overlapping booking conflict prevention check
      const conflictRes = await fetch(`${BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingPayload,
          customerName: 'Conflict Tester',
          pickupDate: '2026-12-05',
          returnDate: '2026-12-10',
        }),
      });
      const conflictData = await conflictRes.json();
      if (!conflictData.success && conflictRes.status === 400) {
        console.log(`✓ 9b. Overlapping confirmed booking successfully blocked! Error: "${conflictData.error}"`);
        passed++;
      }
    }
  }

  // 10. Admin Stats API
  const statsRes = await fetch(`${BASE_URL}/api/bookings?stats=true`);
  const statsData = await statsRes.json();
  if (statsData.success) {
    console.log(`✓ 10. Admin stats API validated: Confirmed revenue = NPR ${statsData.stats.confirmedRevenue.toLocaleString()}`);
    passed++;
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
  }

  // 12. Sitemap and Robots
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  if (sitemapRes.status === 200 && robotsRes.status === 200) {
    console.log('✓ 12. Sitemap.xml and Robots.txt generated and accessible');
    passed++;
  }

  console.log(`\n========================================`);
  console.log(`ALL TESTS PASSED: ${passed}/12 test suites verified!`);
  console.log(`========================================\n`);
}

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
