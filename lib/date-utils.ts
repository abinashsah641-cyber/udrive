/**
 * Date and time utilities for UDrive Rental Service
 * Default timezone: Asia/Kathmandu (UTC +05:45)
 */

export const NEPAL_TIMEZONE = 'Asia/Kathmandu';

/**
 * Returns today's date formatted as YYYY-MM-DD in Kathmandu time
 */
export function getTodayNepal(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: NEPAL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(now);
}

/**
 * Returns tomorrow's date formatted as YYYY-MM-DD in Kathmandu time
 */
export function getTomorrowNepal(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: NEPAL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(d);
}

/**
 * Calculates total rental days between pickup and return date + time.
 * If rental duration is under 24 hours, minimum 1 day is returned.
 * Every extra 24 hours (with a 2-hour grace period) counts as an additional day.
 */
export function calculateRentalDays(
  pickupDate: string,
  pickupTime: string = '10:00',
  returnDate: string,
  returnTime: string = '10:00'
): { days: number; error: string | null } {
  if (!pickupDate || !returnDate) {
    return { days: 1, error: 'Pickup and return dates are required' };
  }

  const pDateTime = new Date(`${pickupDate}T${pickupTime || '10:00'}:00`);
  const rDateTime = new Date(`${returnDate}T${returnTime || '10:00'}:00`);

  if (isNaN(pDateTime.getTime()) || isNaN(rDateTime.getTime())) {
    return { days: 1, error: 'Invalid date format' };
  }

  const diffMs = rDateTime.getTime() - pDateTime.getTime();

  if (diffMs <= 0) {
    return { days: 0, error: 'Return date and time must be after pickup date and time' };
  }

  const diffHours = diffMs / (1000 * 60 * 60);

  // Standard rental calculation: 24h = 1 day. If extra hours exceed 2 hours grace, add 1 full day.
  let days = Math.floor(diffHours / 24);
  const remainderHours = diffHours % 24;

  if (remainderHours > 2 || days === 0) {
    days += 1;
  }

  return { days: Math.max(1, days), error: null };
}

/**
 * Checks whether two date ranges [startA, endA] and [startB, endB] overlap
 */
export function doDateRangesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  const aStart = new Date(startA).getTime();
  const aEnd = new Date(endA).getTime();
  const bStart = new Date(startB).getTime();
  const bEnd = new Date(endB).getTime();

  return aStart < bEnd && bStart < aEnd;
}
