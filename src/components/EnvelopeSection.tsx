import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { DailyLetter } from '../data/messages';

interface EnvelopeSectionProps {
  letter: DailyLetter;
  onOpenLetter: () => void;
  isOpening?: boolean;
}

export const EnvelopeSection: React.FC<EnvelopeSectionProps> = ({
  letter,
  onOpenLetter,
  isOpening = false,
}) => {
  const handleClickOpen = () => {
    if (isOpening) return;
    onOpenLetter();
  };

  return (
    <section
      aria-label="Today's Letter"
      className="relative z-35 w-full max-w-md mx-auto px-4 my-6 sm:my-8 text-center select-none"
    >
      {/* Title & Subtitle */}
      <div
        className={`space-y-1.5 mb-6 transition-opacity duration-700 ${
          isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <h3 className="text-2xl sm:text-3xl font-serif-elegant font-normal tracking-wide text-[#3A0E1E] flex items-center justify-center gap-2">
          <span>Today’s little letter is waiting for you…</span>
          <span className="text-lg">💌</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#A07A80] font-sans font-light">
          A little note, written especially for you.
        </p>
      </div>

      {/* Luxury Sealed Envelope Container */}
      <div className="relative mx-auto w-64 h-44 sm:w-72 sm:h-48 group">
        {/* Soft blush ambient glow */}
        <div
          className={`absolute -inset-2 rounded-3xl blur-xl transition-all duration-1000 pointer-events-none ${
            isOpening ? 'opacity-70 scale-105' : 'opacity-40'
          }`}
          style={{ backgroundColor: '#E7C7CF' }}
          aria-hidden="true"
        />

        {/* Envelope Body */}
        <div
          className={`relative w-full h-full perspective-1000 ${
            !isOpening ? 'animate-float-gentle' : ''
          }`}
        >
          {/* Paper letter sliding up during opening animation */}
          <div
            className={`absolute left-4 right-4 h-36 bg-[#FAF4F6] border border-[#E7C7CF] rounded-t-xl shadow-lg p-3 transition-all duration-1000 ease-out z-10 ${
              isOpening
                ? '-translate-y-24 opacity-100 shadow-2xl scale-[1.02]'
                : 'translate-y-4 opacity-0 pointer-events-none'
            }`}
          >
            <div className="border-b border-[#E7C7CF] pb-1.5 mb-2 flex items-center justify-between text-[10px] text-[#8E2D3B]">
              <span className="font-medium truncate pr-2 font-serif-elegant text-xs">
                {letter.heading}
              </span>
              <span>♡</span>
            </div>
            <div className="space-y-1.5 text-left opacity-70">
              <div className="h-1.5 w-3/4 bg-[#E7C7CF] rounded-full" />
              <div className="h-1.5 w-full bg-[#E7C7CF]/60 rounded-full" />
              <div className="h-1.5 w-5/6 bg-[#E7C7CF]/80 rounded-full" />
            </div>
          </div>

          {/* Envelope Back Base in Blush Veil & Porcelain Pink */}
          <div className="absolute inset-0 bg-[#F5E9ED] border border-[#E7C7CF] rounded-2xl shadow-[0_8px_24px_rgba(58,14,30,0.06)] overflow-hidden z-0">
            {/* Inner subtle gradient pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E7C7CF]/50 via-[#F5E9ED] to-[#E7C7CF]/30" />

            {/* Fold triangles */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 288 192"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,192 144,110 288,192"
                fill="#E7C7CF"
                fillOpacity="0.45"
                stroke="#A07A80"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              <polygon
                points="0,0 0,192 144,110"
                fill="#F5E9ED"
                fillOpacity="0.8"
                stroke="#A07A80"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              <polygon
                points="288,0 288,192 144,110"
                fill="#FAF4F6"
                fillOpacity="0.9"
                stroke="#A07A80"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* Top Flap with 3D folding effect */}
          <div
            className={`absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-700 ease-in-out transform-style-3d z-20 ${
              isOpening ? '-rotate-x-180' : 'rotate-x-0'
            }`}
          >
            <svg
              className="w-full h-full drop-shadow-xs"
              viewBox="0 0 288 112"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 288,0 144,112"
                fill="#E7C7CF"
                stroke="#A07A80"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
            </svg>

            {/* Cranberry Silk Wax Seal */}
            <div
              className={`absolute left-1/2 bottom-[-14px] -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8E2D3B] via-[#731F2C] to-[#3A0E1E] flex items-center justify-center shadow-md shadow-[#3A0E1E]/30 border-2 border-[#E7C7CF]/60 transition-all duration-300 ${
                isOpening
                  ? 'opacity-0 scale-75 pointer-events-none'
                  : 'cursor-pointer hover:scale-105 active:scale-95'
              }`}
              onClick={handleClickOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClickOpen();
                }
              }}
              aria-label="Seal to open today's letter"
            >
              <Heart className="w-5 h-5 text-[#FAF4F6] fill-[#FAF4F6]/80 drop-shadow-xs" />
              <span className="sr-only">Wax seal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button: “Open today’s letter ♡” */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleClickOpen}
          disabled={isOpening}
          className={`group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base shadow-md shadow-[#8E2D3B]/25 hover:shadow-lg active:scale-[0.98] transition-all duration-500 min-h-[48px] w-full max-w-xs ${
            isOpening ? 'opacity-80 scale-[0.99] cursor-default' : ''
          }`}
        >
          <Mail className="w-4 h-4 text-[#E7C7CF] transition-transform group-hover:scale-110" />
          <span>{isOpening ? 'Opening your letter… 💌' : 'Open today’s letter ♡'}</span>
          {!isOpening && (
            <span className="text-[#E7C7CF] group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          )}
        </button>
      </div>
    </section>
  );
};
