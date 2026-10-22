import React, { useState } from 'react';
import { Lock, Gift, Sparkles, Heart } from 'lucide-react';

interface BirthdayLockProps {
  isBirthday: boolean;
}

export const BirthdayLock: React.FC<BirthdayLockProps> = ({ isBirthday }) => {
  const [showSurpriseNotice, setShowSurpriseNotice] = useState(false);

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
          /* Locked State (Before 20 November) */
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

            {/* Locked Pill-shaped Indicator with subtle shimmer */}
            <div className="pt-2">
              <div
                aria-disabled="true"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-[#E7C7CF] text-xs font-medium text-[#8E2D3B] cursor-not-allowed select-none min-h-[40px] shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-[#8E2D3B] opacity-80" />
                <span className="tracking-wide">Unlocks on 20 November ♡</span>
              </div>
            </div>
          </div>
        ) : (
          /* Unlocked State (On Birthday 20 November in Dubai) */
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

            {/* Active CTA: “Open your birthday surprise ♡” */}
            <div className="pt-2 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setShowSurpriseNotice(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm shadow-md shadow-[#8E2D3B]/25 hover:shadow-lg active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-[#E7C7CF]" />
                <span>Open your birthday surprise ♡</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Birthday Surprise Placeholder Dialog */}
      {showSurpriseNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative max-w-sm w-full bg-[#FAF4F6] p-7 rounded-3xl border border-[#E7C7CF] shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-13 h-13 rounded-full bg-[#F5E9ED] text-[#8E2D3B] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Heart className="w-6 h-6 fill-[#8E2D3B] text-[#8E2D3B] animate-heartbeat" />
            </div>

            <h4 className="text-2xl font-serif-elegant font-normal text-[#3A0E1E] mb-1.5">
              Happy Birthday, Meri Jaan! 🐼🎂💗
            </h4>
            <p className="text-xs sm:text-sm text-[#A07A80] font-sans leading-relaxed mb-6">
              Your full birthday celebration portal will connect right here. Today is all about celebrating you!
            </p>

            <button
              type="button"
              onClick={() => setShowSurpriseNotice(false)}
              className="w-full py-3 px-4 rounded-xl bg-[#8E2D3B] hover:bg-[#731F2C] text-white font-medium text-xs shadow-sm active:scale-[0.98] transition-all"
            >
              Close with love ♡
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
