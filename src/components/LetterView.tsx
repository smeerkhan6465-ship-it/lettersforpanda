import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { DailyLetter } from '../data/messages';
import { AnimatedText } from './AnimatedText';

interface LetterViewProps {
  letter: DailyLetter;
  onClose: () => void;
}

export const LetterView: React.FC<LetterViewProps> = ({ letter, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLetterAnimationComplete, setIsLetterAnimationComplete] = useState(false);
  const [rereadCount, setRereadCount] = useState(0);
  const letterTopRef = useRef<HTMLDivElement | null>(null);

  // Scroll smoothly to top on mount or reread
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    letterTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rereadCount]);

  // Handle closing the letter
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    // Smooth exit duration before unmounting
    setTimeout(() => {
      onClose();
    }, 600);
  };

  // Re-read the same current-day letter without leaving
  const handleReread = () => {
    setIsLetterAnimationComplete(false);
    setRereadCount((prev) => prev + 1);
  };

  // Automatic completion callback fired directly from animation completion logic
  const handleAnimationComplete = useCallback(() => {
    setIsLetterAnimationComplete(true);
  }, []);

  return (
    <div
      ref={letterTopRef}
      className={`relative min-h-screen w-full flex flex-col items-center justify-start py-8 sm:py-14 px-4 sm:px-6 transition-all duration-700 ease-out select-none ${
        isClosing
          ? 'opacity-0 scale-[0.97] translate-y-6 pointer-events-none'
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, #4D1327 0%, #3A0E1E 55%, #240813 100%)',
      }}
    >
      {/* Soft diffused blush glow behind the letter paper */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-[#E7C7CF]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Delicate floating ambient particles in the night sky */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="absolute top-[14%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#E7C7CF]/50 blur-[0.5px] animate-mote"
          style={{ animationDuration: '11s' }}
        />
        <span
          className="absolute top-[42%] right-[15%] w-1 h-1 rounded-full bg-[#E7C7CF]/40 blur-[0.5px] animate-mote"
          style={{ animationDuration: '13s', animationDelay: '2s' }}
        />
        <span
          className="absolute bottom-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#8E2D3B]/60 blur-[0.5px] animate-mote"
          style={{ animationDuration: '10s', animationDelay: '4s' }}
        />
      </div>

      {/* Top delicate date kicker */}
      <div className="relative z-10 mb-6 flex items-center justify-center gap-3 select-none">
        <span className="h-[1px] w-8 sm:w-12 bg-[#E7C7CF]/40" aria-hidden="true" />
        <span className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.25em] text-[#E7C7CF]/90 uppercase">
          {letter.dateFormatted} · {letter.daysLeftLabel}
        </span>
        <span className="h-[1px] w-8 sm:w-12 bg-[#E7C7CF]/40" aria-hidden="true" />
      </div>

      {/* Centered Elegant Letter Paper */}
      <article className="relative z-10 w-full max-w-xl bg-[#FAF4F6] border border-[#E7C7CF]/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_24px_70px_rgba(15,3,8,0.55)] animate-in fade-in slide-in-from-bottom-5 duration-700 cursor-default">
        {/* Subtle decorative inner hairline border */}
        <div className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/45 pointer-events-none" />

        {/* Letter Heading */}
        <header className="mb-8 text-center sm:text-left border-b border-[#E7C7CF]/60 pb-5">
          <p className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] text-[#8E2D3B] uppercase mb-2">
            A Note Written For You ♡
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-elegant font-normal text-[#3A0E1E] tracking-wide leading-snug">
            {letter.heading}
          </h2>
        </header>

        {/* Complete Letter Body with Character-by-Character Fade */}
        <div className="font-serif-elegant text-lg sm:text-xl md:text-[21px] text-[#3A0E1E] leading-[1.85] font-normal select-text">
          <AnimatedText
            key={`letter-body-${rereadCount}`}
            text={letter.content}
            speed={20}
            delay={250}
            onComplete={handleAnimationComplete}
            as="div"
          />
        </div>

        {/* Sweet Sign-off */}
        <footer className="mt-10 pt-6 border-t border-[#E7C7CF]/60">
          <p className="text-base sm:text-lg md:text-xl font-serif-elegant italic text-[#8E2D3B] leading-relaxed whitespace-pre-line">
            {letter.signOff}
          </p>

          {/* Delicate heart detail */}
          <div className="mt-8 flex flex-col items-center justify-center gap-1.5 select-none">
            <Heart className="w-4 h-4 text-[#8E2D3B] fill-[#8E2D3B]/20 animate-pulse" />
            <span className="text-[10px] font-sans text-[#A07A80] tracking-widest uppercase">
              Written with all my heart
            </span>
          </div>
        </footer>
      </article>

      {/* Action Buttons: Fade in gently ONLY after the final character reveal finishes */}
      <div
        className={`relative z-20 w-full max-w-md mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 ${
          isLetterAnimationComplete && !isClosing
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Primary Close Button: “Bas, aaj ke liye itna hi, meri jaan ♡” */}
        <button
          type="button"
          onClick={handleClose}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
        >
          <span>Bas, aaj ke liye itna hi, meri jaan ♡</span>
        </button>

        {/* Secondary Reread Button: “Ek baar phir padhun? 💌” */}
        <button
          type="button"
          onClick={handleReread}
          className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#FAF4F6]/15 hover:bg-[#FAF4F6]/25 active:scale-[0.98] border border-[#E7C7CF]/40 text-[#FAF4F6] font-medium text-xs sm:text-sm tracking-wide shadow-xs backdrop-blur-md transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
        >
          <span>Ek baar phir padhun? 💌</span>
        </button>
      </div>

      {/* Tender Reassuring Message under buttons */}
      <div
        className={`mt-4 text-center transition-all duration-700 px-4 ${
          isLetterAnimationComplete && !isClosing
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <p className="text-xs sm:text-[13px] font-sans text-[#E7C7CF]/85 tracking-wide font-light">
          Ab kal aana, meri Panda… main yahin tumhara intezaar karunga. ♡
        </p>
      </div>
    </div>
  );
};
