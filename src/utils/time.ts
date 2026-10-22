/**
 * Timezone and countdown utilities for Asia/Dubai
 */

// Target: 20 November 2026, 00:00:00 Asia/Dubai (UTC+4)
// In ISO: 2026-11-20T00:00:00+04:00
export const DUBAI_TIMEZONE = 'Asia/Dubai';
export const TARGET_DATE_ISO = '2026-11-20T00:00:00+04:00';
export const TARGET_TIMESTAMP = Date.parse(TARGET_DATE_ISO); // 1795118400000

export interface CountdownState {
  totalRemainingMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isBirthday: boolean;
  calendarDaysLeft: number;
  dubaiDateKey: string; // YYYY-MM-DD
  dubaiTimeString: string; // e.g. "12:00:00 AM"
}

export interface DubaiDateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isoDate: string; // "YYYY-MM-DD"
  formattedDisplay: string;
}

/**
 * Returns current date and time split in the Asia/Dubai timezone
 */
export function getDubaiDate(now: Date = new Date()): DubaiDateInfo {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: DUBAI_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      map[part.type] = part.value;
    }
  }

  const year = parseInt(map.year, 10);
  const month = parseInt(map.month, 10);
  const day = parseInt(map.day, 10);
  const hour = parseInt(map.hour, 10);
  const minute = parseInt(map.minute, 10);
  const second = parseInt(map.second, 10);

  const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const displayFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: DUBAI_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    isoDate,
    formattedDisplay: displayFormatter.format(now),
  };
}

/**
 * Calculate calendar days remaining between a Dubai date and 20 Nov 2026
 */
export function calculateCalendarDaysUntilBirthday(dubaiInfo: DubaiDateInfo): number {
  const currentDubaiDateUTC = Date.UTC(dubaiInfo.year, dubaiInfo.month - 1, dubaiInfo.day);
  const targetDubaiDateUTC = Date.UTC(2026, 10, 20); // Month is 0-indexed: 10 is November

  const diffMs = targetDubaiDateUTC - currentDubaiDateUTC;
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

/**
 * Computes countdown state accurate to the current second
 */
export function getCountdownState(now: Date = new Date()): CountdownState {
  const nowMs = now.getTime();
  const totalRemainingMs = Math.max(0, TARGET_TIMESTAMP - nowMs);
  const isExpired = totalRemainingMs <= 0;

  const totalSeconds = Math.floor(totalRemainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const dubaiInfo = getDubaiDate(now);
  const calendarDaysLeft = calculateCalendarDaysUntilBirthday(dubaiInfo);
  const isBirthday = isExpired || (dubaiInfo.year === 2026 && dubaiInfo.month === 11 && dubaiInfo.day >= 20) || (dubaiInfo.year > 2026);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: DUBAI_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return {
    totalRemainingMs,
    days,
    hours,
    minutes,
    seconds,
    isExpired,
    isBirthday,
    calendarDaysLeft,
    dubaiDateKey: dubaiInfo.isoDate,
    dubaiTimeString: timeFormatter.format(now),
  };
}
