// Direct test script for all 19 vehicles
const vehicles = [
  { name: 'BYD Atto 1', daily: 6500, w: 43225, d15: 87750, m: 165750 },
  { name: 'BYD Atto 2', daily: 9000, w: 59850, d15: 121500, m: 229500 },
  { name: 'BYD Atto 3', daily: 9500, w: 63175, d15: 128250, m: 242250 },
  { name: 'Nevo E5', daily: 6500, w: 43225, d15: 87750, m: 165750 },
  { name: 'Omoda E5', daily: 9500, w: 63175, d15: 128250, m: 242250 },
  { name: 'Omoda E5 Pro', daily: 10000, w: 66500, d15: 135000, m: 255000 },
  { name: 'Ridard', daily: 15000, w: 99750, d15: 202500, m: 382500 },
  { name: 'Jaeco J5', daily: 10000, w: 66500, d15: 135000, m: 255000 },
  { name: 'Naami Vigo', daily: 8500, w: 56525, d15: 114750, m: 216750 },
  { name: 'Naami Box', daily: 7000, w: 46550, d15: 94500, m: 178500 },
  { name: 'i-caur', daily: 10000, w: 66500, d15: 135000, m: 255000 },
  { name: 'Deepal S05', daily: 9000, w: 59850, d15: 121500, m: 229500 },
  { name: 'Deepal S07', daily: 13000, w: 86450, d15: 175500, m: 331500 },
  { name: 'Grand i10', daily: 6500, w: 43225, d15: 87750, m: 165750 },
  { name: 'Nissan Magnite', daily: 7000, w: 46550, d15: 94500, m: 178500 },
  { name: 'i20', daily: 5000, w: 33250, d15: 67500, m: 127500 },
  { name: 'Volkswagen Polo', daily: 5000, w: 33250, d15: 67500, m: 127500 },
  { name: 'Kia Sonet', daily: 7500, w: 49875, d15: 101250, m: 191250 },
  { name: 'Toyota Hilux 4x4', daily: 17000, w: 113050, d15: 229500, m: 433500 },
];

function calculateRentalPricing(v, days) {
  const dailyRate = v.daily;
  const weeklyRate = v.w;
  const fifteenDayRate = v.d15;
  const monthlyRate = v.m;
  const baselineTotal = days * dailyRate;

  let bestCandidate = { n30: 0, n15: 0, n7: 0, n1: days, cost: baselineTotal };
  const max30 = Math.floor(days / 30) + 1;

  for (let c30 = 0; c30 <= max30; c30++) {
    const daysFrom30 = c30 * 30;
    if (daysFrom30 > days + 15) continue;

    const max15 = Math.floor(Math.max(0, days - daysFrom30 + 14) / 15) + 1;
    for (let c15 = 0; c15 <= max15; c15++) {
      const daysFrom15 = daysFrom30 + c15 * 15;
      if (daysFrom15 > days + 7) continue;

      const max7 = Math.floor(Math.max(0, days - daysFrom15 + 6) / 7) + 1;
      for (let c7 = 0; c7 <= max7; c7++) {
        const packageDays = daysFrom15 + c7 * 7;
        if (packageDays <= days) {
          const c1 = days - packageDays;
          const cost = c30 * monthlyRate + c15 * fifteenDayRate + c7 * weeklyRate + c1 * dailyRate;
          if (cost < bestCandidate.cost) {
            bestCandidate = { n30: c30, n15: c15, n7: c7, n1: c1, cost };
          }
        } else if (packageDays > days && packageDays <= days + 6) {
          const cost = c30 * monthlyRate + c15 * fifteenDayRate + c7 * weeklyRate;
          if (cost < bestCandidate.cost) {
            bestCandidate = { n30: c30, n15: c15, n7: c7, n1: 0, cost };
          }
        }
      }
    }
  }

  return bestCandidate;
}

let allPassed = true;

for (const v of vehicles) {
  // 1 day
  const r1 = calculateRentalPricing(v, 1);
  if (r1.cost !== v.daily) {
    console.error(`FAIL: ${v.name} 1 day expected ${v.daily}, got ${r1.cost}`);
    allPassed = false;
  }

  // 7 days
  const r7 = calculateRentalPricing(v, 7);
  if (r7.cost !== v.w) {
    console.error(`FAIL: ${v.name} 7 days expected ${v.w}, got ${r7.cost}`);
    allPassed = false;
  }

  // 15 days
  const r15 = calculateRentalPricing(v, 15);
  if (r15.cost !== v.d15) {
    console.error(`FAIL: ${v.name} 15 days expected ${v.d15}, got ${r15.cost}`);
    allPassed = false;
  }

  // 30 days
  const r30 = calculateRentalPricing(v, 30);
  if (r30.cost !== v.m) {
    console.error(`FAIL: ${v.name} 30 days expected ${v.m}, got ${r30.cost}`);
    allPassed = false;
  }

  // 22 days (Prompt test case: combination of 15d + 7d)
  const r22 = calculateRentalPricing(v, 22);
  const expected22 = v.d15 + v.w;
  if (r22.cost !== expected22 || r22.n15 !== 1 || r22.n7 !== 1 || r22.n1 !== 0) {
    console.error(`FAIL: ${v.name} 22 days expected ${expected22} (1x15d + 1x7d), got ${r22.cost}`, r22);
    allPassed = false;
  }
}

if (allPassed) {
  console.log(`✓ All 19 vehicles verified successfully across 1, 7, 15, 22, and 30-day package calculations!`);
} else {
  process.exit(1);
}
