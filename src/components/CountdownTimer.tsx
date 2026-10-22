import React from 'react';
import { CountdownState } from '../utils/time';

interface CountdownTimerProps {
  countdown: CountdownState;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdown }) => {
  const { days, hours, minutes, seconds, calendarDaysLeft, isBirthday } = countdown;

  const pad = (num: number) => String(num).padStart(2, '0');

  let dynamicSubtitle = '';
  if (isBirthday || calendarDaysLeft === 0) {
    dynamicSubtitle = "It's finally your special day, my love! 🎂💗";
  } else if (calendarDaysLeft === 1) {
    dynamicSubtitle = 'Only 1 day left, my love… Every second brings me closer to celebrating you ♡';
  } else {
    dynamicSubtitle = `Only ${calendarDaysLeft} days left, my love… Every second brings me closer to celebrating you ♡`;
  }

  const units = [
    { label: 'DAYS', value: pad(days), key: 'days', delay: '0ms' },
    { label: 'HOURS', value: pad(hours), key: 'hours', delay: '80ms' },
    { label: 'MINUTES', value: pad(minutes), key: 'minutes', delay: '160ms' },
    { label: 'SECONDS', value: pad(seconds), key: 'seconds', delay: '240ms' },
  ];

  return (
    <section
      aria-label="Birthday Countdown"
      className="relative z-10 w-full max-w-lg mx-auto px-4 my-4 sm:my-6 text-center select-none"
    >
      {/* Delicate Section Label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-[1px] w-8 bg-[#E7C7CF]" aria-hidden="true" />
        <span className="text-[10px] font-medium tracking-[0.25em] text-[#8E2D3B] uppercase">
          Time Until Your Birthday
        </span>
        <span className="h-[1px] w-8 bg-[#E7C7CF]" aria-hidden="true" />
      </div>

      {/* Four Luxury Countdown Cards */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto">
        {units.map((unit) => (
          <div
            key={unit.key}
            style={{ animationDelay: unit.delay }}
            className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F5E9ED]/80 hover:bg-white/95 backdrop-blur-md border border-[#E7C7CF]/90 shadow-[0_4px_16px_rgba(58,14,30,0.04)] hover:shadow-[0_6px_20px_rgba(142,45,59,0.08)] transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Subtle card highlight */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Digit Display */}
            <span className="relative text-2xl sm:text-3xl md:text-4xl font-light font-sans tabular-nums text-[#3A0E1E] tracking-tight leading-none py-1">
              {unit.value}
            </span>

            {/* Label */}
            <span className="relative text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.22em] text-[#8E2D3B] uppercase mt-1.5 opacity-90">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Romantic Line beneath countdown */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-base font-serif-elegant italic text-[#3A0E1E]/90 tracking-wide leading-relaxed min-h-[1.5rem] px-2">
        {dynamicSubtitle}
      </p>

      {/* Elegant Dubai timezone note */}
      <p className="text-[10px] font-sans text-[#A07A80] mt-1.5 tracking-wider font-light">
        20 November 2026 · Asia/Dubai ({countdown.dubaiTimeString} in Dubai now)
      </p>
    </section>
  );
};
