import React from 'react';
import { Heart, BookHeart } from 'lucide-react';

interface PromisesSectionProps {
  onOpenSaatAhad: () => void;
  isOpening?: boolean;
}

export const PromisesSection: React.FC<PromisesSectionProps> = ({
  onOpenSaatAhad,
  isOpening = false,
}) => {
  return (
    <section
      aria-label="Saat Ahad — 7 Promises"
      className={`relative z-20 w-full max-w-md mx-auto px-4 mt-1 mb-6 text-center select-none transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Compact, elegant Saat Ahad card positioned above Time Until Your Birthday */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-[#F5E9ED]/85 hover:bg-white/95 backdrop-blur-md border border-[#E7C7CF] shadow-[0_6px_24px_rgba(58,14,30,0.05)] transition-all duration-300">
        {/* Subtle inner hairline frame */}
        <div
          className="absolute inset-2 rounded-[20px] border border-[#E7C7CF]/40 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#8E2D3B]">
            <BookHeart className="w-4 h-4 stroke-[1.7]" />
            <p className="text-[10px] font-sans font-medium tracking-[0.24em] uppercase">
              14 Nov – 20 Nov · Seven Vows
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif-elegant font-normal tracking-wide text-[#3A0E1E]">
              Saat Ahad — 7 Promises
            </h3>
            <p className="text-xs sm:text-sm text-[#A07A80] font-sans font-light leading-relaxed max-w-xs mx-auto">
              Meri zindagi ke saat waade, sirf tumhare naam. ♡
            </p>
          </div>

          <div className="pt-1 w-full max-w-xs">
            <button
              type="button"
              onClick={onOpenSaatAhad}
              disabled={isOpening}
              className="group w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base shadow-md shadow-[#8E2D3B]/20 hover:shadow-lg active:scale-[0.98] transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#E7C7CF] fill-[#E7C7CF]/30 group-hover:scale-110 transition-transform" />
              <span>Open Saat Ahad ♡</span>
              <span className="text-[#E7C7CF] group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
