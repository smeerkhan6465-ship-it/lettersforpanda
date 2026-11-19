import React from 'react';
import { Lock, Gift, Sparkles, Unlock } from 'lucide-react';

interface BirthdayLockProps {
  isBirthday: boolean;
  isRealBirthday?: boolean;
  enableTestMode?: boolean;
  isTestUnlocked?: boolean;
  onToggleTestUnlock?: () => void;
  onOpenSurprise: () => void;
  isOpening?: boolean;
}

export const BirthdayLock: React.FC<BirthdayLockProps> = ({
  isBirthday,
  isRealBirthday = false,
  enableTestMode = false,
  isTestUnlocked = false,
  onToggleTestUnlock,
  onOpenSurprise,
  isOpening = false,
}) => {
  return (
    <section
      aria-label="Birthday Surprise Section"
      className="relative z-10 w-full max-w-md mx-auto px-4 mt-8 mb-12 text-center select-none"
    >
      {/* Delicate hairline divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="h-[1px] w-10 bg-[#E7C7CF]" aria-hidden="true" />
        <span className="text-[#A07A80] text-xs">♡</span>
        <span className="h-[1px] w-10 bg-[#E7C7CF]" aria-hidden="true" />
      </div>

      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#F5E9ED]/75 hover:bg-white/90 backdrop-blur-md border border-[#E7C7CF] shadow-[0_6px_24px_rgba(58,14,30,0.03)] transition-all duration-300">
        {!isBirthday ? (
          /* Locked State (Before 20 November 2026 in Asia/Dubai) */
          <div className="flex flex-col items-center space-y-3.5">
            {/* Minimal Gift Icon with Lock Detail */}
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-white/70 border border-[#E7C7CF] flex items-center justify-center text-[#8E2D3B] shadow-inner">
                <Gift className="w-6 h-6 stroke-[1.6]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#8E2D3B] text-white flex items-center justify-center shadow-xs">
                <Lock className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Locked Headings */}
            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-serif-elegant font-normal text-[#3A0E1E] tracking-wide">
                Something special is waiting for you… ♡
              </h4>
              <p className="text-xs sm:text-sm text-[#A07A80] font-sans font-light">
                Your birthday surprise is still sleeping.
              </p>
            </div>

            {/* Locked Indicator */}
            <div className="pt-2 flex flex-col items-center gap-2.5">
              <div
                aria-disabled="true"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-[#E7C7CF] text-xs font-medium text-[#8E2D3B] cursor-not-allowed select-none min-h-[40px] shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-[#8E2D3B] opacity-80" />
                <span className="tracking-wide">Unlocks on 20 November ♡</span>
              </div>

              {enableTestMode && onToggleTestUnlock && !isRealBirthday && (
                <button
                  type="button"
                  onClick={onToggleTestUnlock}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 hover:bg-white border border-dashed border-[#A07A80]/60 text-[11px] font-sans font-medium text-[#8E2D3B]/85 hover:text-[#8E2D3B] active:scale-[0.98] transition-all cursor-pointer min-h-[34px]"
                >
                  <Unlock className="w-3 h-3" />
                  <span>Test Unlock Surprise</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Unlocked State (On & After 20 November 2026 in Asia/Dubai, or Test Unlocked) */
          <div className="flex flex-col items-center space-y-3.5 animate-in fade-in zoom-in-95 duration-500">
            {/* Glowing Unlocked Gift */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-full blur-md animate-pulse-glow opacity-50 bg-[#E7C7CF]" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8E2D3B] to-[#731F2C] text-white flex items-center justify-center shadow-md shadow-[#8E2D3B]/20">
                <Gift className="w-7 h-7 animate-bounce stroke-[1.8]" />
              </div>
            </div>

            {/* Unlocked Headings */}
            <div className="space-y-1">
              <h4 className="text-2xl sm:text-3xl font-serif-elegant font-normal text-[#3A0E1E] tracking-wide">
                It’s finally your day, my Panda! ♡
              </h4>
              <p className="text-xs sm:text-sm text-[#A07A80] font-sans font-light">
                Your birthday surprise has awakened with all my love.
              </p>
            </div>

            {/* Active CTA: “Open Your Birthday Surprise ♡” */}
            <div className="pt-2 w-full max-w-xs flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenSurprise}
                disabled={isOpening}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base shadow-md shadow-[#8E2D3B]/25 hover:shadow-lg active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E7C7CF] group-hover:scale-110 transition-transform" />
                <span>Open Your Birthday Surprise ♡</span>
              </button>

              {enableTestMode && isTestUnlocked && onToggleTestUnlock && !isRealBirthday && (
                <button
                  type="button"
                  onClick={onToggleTestUnlock}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white border border-dashed border-[#A07A80]/55 text-[11px] font-sans font-medium text-[#A07A80] hover:text-[#8E2D3B] active:scale-[0.98] transition-all cursor-pointer min-h-[32px]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Test Mode · Re-lock Surprise</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
