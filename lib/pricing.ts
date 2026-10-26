import { Vehicle, PricingCalculation, PackageBreakdownItem } from '@/types';

/**
 * Format any integer or number as Nepalese Rupee currency string:
 * e.g. 6500 -> "NPR 6,500"
 */
export function formatNPR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'NPR 0';
  const rounded = Math.round(amount);
  return `NPR ${rounded.toLocaleString('en-IN')}`;
}

/**
 * Calculate the optimal transparent package breakdown for an arbitrary rental duration.
 * Adheres strictly to the published rates:
 * - 30-day (Monthly) package rate
 * - 15-day package rate
 * - 7-day (Weekly) package rate
 * - Daily rate for remaining days
 *
 * Chooses the least expensive eligible combination using only approved published rates.
 */
export function calculateRentalPricing(vehicle: Vehicle, totalDays: number): PricingCalculation {
  const days = Math.max(1, Math.floor(totalDays));
  const dailyRate = Math.round(vehicle.dailyRate);
  const weeklyRate = Math.round(vehicle.weeklyRate);
  const fifteenDayRate = Math.round(vehicle.fifteenDayRate);
  const monthlyRate = Math.round(vehicle.monthlyRate);

  const baselineTotal = days * dailyRate;

  // Let's explore combinations of (n30, n15, n7, n1)
  interface Candidate {
    n30: number;
    n15: number;
    n7: number;
    n1: number;
    cost: number;
  }

  let bestCandidate: Candidate = {
    n30: 0,
    n15: 0,
    n7: 0,
    n1: days,
    cost: baselineTotal,
  };

  const max30 = Math.floor(days / 30) + 1;

  for (let c30 = 0; c30 <= max30; c30++) {
    const daysFrom30 = c30 * 30;
    if (daysFrom30 > days + 15) continue; // no need to over-buy excessively

    const max15 = Math.floor(Math.max(0, days - daysFrom30 + 14) / 15) + 1;
    for (let c15 = 0; c15 <= max15; c15++) {
      const daysFrom15 = daysFrom30 + c15 * 15;
      if (daysFrom15 > days + 7) continue;

      const max7 = Math.floor(Math.max(0, days - daysFrom15 + 6) / 7) + 1;
      for (let c7 = 0; c7 <= max7; c7++) {
        const packageDays = daysFrom15 + c7 * 7;
        
        // Scenario A: Exact remainder in daily days
        if (packageDays <= days) {
          const c1 = days - packageDays;
          const cost = c30 * monthlyRate + c15 * fifteenDayRate + c7 * weeklyRate + c1 * dailyRate;
          if (cost < bestCandidate.cost) {
            bestCandidate = { n30: c30, n15: c15, n7: c7, n1: c1, cost };
          }
        } 
        // Scenario B: Package slightly exceeds rental days (e.g. 29 days taking 30-day package if cheaper)
        else if (packageDays > days && packageDays <= days + 6) {
          const cost = c30 * monthlyRate + c15 * fifteenDayRate + c7 * weeklyRate;
          if (cost < bestCandidate.cost) {
            bestCandidate = { n30: c30, n15: c15, n7: c7, n1: 0, cost };
          }
        }
      }
    }
  }

  const breakdown: PackageBreakdownItem[] = [];

  if (bestCandidate.n30 > 0) {
    breakdown.push({
      packageType: 'monthly',
      label: '30-Day Monthly Package',
      count: bestCandidate.n30,
      daysCovered: bestCandidate.n30 * 30,
      unitRate: monthlyRate,
      subtotal: bestCandidate.n30 * monthlyRate,
    });
  }

  if (bestCandidate.n15 > 0) {
    breakdown.push({
      packageType: 'fifteen_day',
      label: '15-Day Package',
      count: bestCandidate.n15,
      daysCovered: bestCandidate.n15 * 15,
      unitRate: fifteenDayRate,
      subtotal: bestCandidate.n15 * fifteenDayRate,
    });
  }

  if (bestCandidate.n7 > 0) {
    breakdown.push({
      packageType: 'weekly',
      label: '7-Day Weekly Package',
      count: bestCandidate.n7,
      daysCovered: bestCandidate.n7 * 7,
      unitRate: weeklyRate,
      subtotal: bestCandidate.n7 * weeklyRate,
    });
  }

  if (bestCandidate.n1 > 0) {
    breakdown.push({
      packageType: 'daily',
      label: bestCandidate.n1 === 1 ? 'Daily Rate' : `${bestCandidate.n1} Daily Days`,
      count: bestCandidate.n1,
      daysCovered: bestCandidate.n1,
      unitRate: dailyRate,
      subtotal: bestCandidate.n1 * dailyRate,
    });
  }

  const subtotal = bestCandidate.cost;
  const savings = Math.max(0, baselineTotal - subtotal);
  const savingsPercent = baselineTotal > 0 ? Math.round((savings / baselineTotal) * 100) : 0;

  return {
    totalDays: days,
    dailyRate,
    totalBeforeDiscount: baselineTotal,
    subtotal,
    savings,
    savingsPercent,
    breakdown,
  };
}
