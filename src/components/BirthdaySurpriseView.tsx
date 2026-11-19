import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  BIRTHDAY_SURPRISE_OPENING,
  BIRTHDAY_SURPRISE_LETTER,
  BIRTHDAY_SURPRISE_WALL,
  BIRTHDAY_SURPRISE_PHOTOS,
  BIRTHDAY_SURPRISE_TRUTH,
  BIRTHDAY_SURPRISE_FINALE,
  SurprisePhoto,
} from '../data/birthdaySurprise';

type SurpriseStep =
  | 'OPENING'
  | 'LETTER'
  | 'MEMORY_WALL'
  | 'ONE_TRUTH'
  | 'FINAL_CONFESSION';

interface BirthdaySurpriseViewProps {
  onClose: () => void;
}

const PinAttachment: React.FC<{ styleType: SurprisePhoto['pinStyle'] }> = ({ styleType }) => {
  if (styleType === 'pin-rose') {
    return (
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-gradient-to-br from-[#F5E9ED] via-[#C96C7E] to-[#8E2D3B] shadow-[0_3px_8px_rgba(20,5,12,0.55)] border border-[#FAF4F6]/70 flex items-center justify-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/75 -translate-x-[1px] -translate-y-[1px]" />
      </span>
    );
  }

  const tapeColors =
    styleType === 'tape-lavender'
      ? 'bg-[#D8C7E8]/75 border-[#FAF4F6]/40 -rotate-3'
      : styleType === 'tape-cream'
      ? 'bg-[#F3E5D8]/80 border-[#FAF4F6]/40 rotate-2'
      : 'bg-[#E7C7CF]/80 border-[#FAF4F6]/45 -rotate-2';

  return (
    <span
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-16 sm:w-20 h-5 backdrop-blur-[1px] border-y shadow-xs ${tapeColors}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 96% 100%, 2% 100%, 0% 50%)',
      }}
    />
  );
};

interface PolaroidCardProps {
  photo: SurprisePhoto;
  index: number;
  onSelect: (index: number) => void;
  extraClasses?: string;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  index,
  onSelect,
  extraClasses = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`View photograph ${photo.id}: ${photo.note}`}
      className={`group relative block w-full text-left bg-[#FFFDFB] p-2.5 sm:p-3 pb-9 sm:pb-10 rounded-[6px] shadow-[0_16px_42px_rgba(12,3,9,0.52)] hover:shadow-[0_24px_56px_rgba(12,3,9,0.68)] border border-[#E7C7CF]/70 transition-all duration-500 ease-out hover:rotate-0 hover:scale-[1.03] hover:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7C7CF] cursor-pointer ${photo.rotationClass} ${extraClasses}`}
    >
      <PinAttachment styleType={photo.pinStyle} />

      {/* Photo Frame Mat — preserves full natural composition without cropping */}
      <div className="relative w-full bg-[#F5E9ED] rounded-[3px] overflow-hidden border border-[#E7C7CF]/40">
        {!hasError ? (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
            className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.015]"
          />
        ) : (
          <div className="w-full aspect-[4/5] flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#F5E9ED] to-[#E7C7CF]/50 text-[#8E2D3B]">
            <Heart className="w-6 h-6 mb-2 opacity-60" />
            <span className="font-serif-elegant text-sm">{photo.note}</span>
          </div>
        )}

        {/* Subtle zoom affordance on hover / touch */}
        <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#3A0E1E]/65 backdrop-blur-xs text-[#FAF4F6] flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Handwritten dream note at bottom Polaroid margin */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2">
        <p className="font-handwriting text-base sm:text-lg text-[#5A2A3B] leading-none truncate">
          {photo.note}
        </p>
        <span className="text-[10px] font-sans text-[#A07A80]/80 tabular-nums shrink-0">
          0{photo.id}
        </span>
      </div>
    </button>
  );
};

export const BirthdaySurpriseView: React.FC<BirthdaySurpriseViewProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<SurpriseStep>('OPENING');
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [isClosingScreen, setIsClosingScreen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [finaleStep, setFinaleStep] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll independently scrollable content area back to top on step change
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Progressive poetic stanza timing on the Final Confession screen
  useEffect(() => {
    if (step !== 'FINAL_CONFESSION') {
      setFinaleStep(0);
      return;
    }

    const timers = [
      setTimeout(() => setFinaleStep(1), 250),
      setTimeout(() => setFinaleStep(2), 1150),
      setTimeout(() => setFinaleStep(3), 2050),
      setTimeout(() => setFinaleStep(4), 2950),
      setTimeout(() => setFinaleStep(5), 4000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [step]);

  // Keyboard & scroll-lock support for photo lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev === null ? null : (prev + 1) % BIRTHDAY_SURPRISE_PHOTOS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + BIRTHDAY_SURPRISE_PHOTOS.length) %
              BIRTHDAY_SURPRISE_PHOTOS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  const transitionToStep = useCallback((nextStep: SurpriseStep) => {
    setIsStepTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsStepTransitioning(false);
    }, 320);
  }, []);

  const handleExit = () => {
    if (isClosingScreen) return;
    setActivePhotoIndex(null);
    setIsClosingScreen(true);
    setTimeout(() => {
      onClose();
    }, 550);
  };

  const handleBackStep = () => {
    if (step === 'LETTER') transitionToStep('OPENING');
    else if (step === 'MEMORY_WALL') transitionToStep('LETTER');
    else if (step === 'ONE_TRUTH') transitionToStep('MEMORY_WALL');
    else if (step === 'FINAL_CONFESSION') transitionToStep('ONE_TRUTH');
    else handleExit();
  };

  const activePhoto =
    activePhotoIndex !== null ? BIRTHDAY_SURPRISE_PHOTOS[activePhotoIndex] : null;

  // Lightbox Modal rendered cleanly via portal to document.body
  const lightboxModal =
    activePhoto && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-3 sm:p-6 bg-[#1A060E]/92 backdrop-blur-md animate-in fade-in duration-200 overscroll-none"
            role="dialog"
            aria-modal="true"
            aria-label={`Photograph ${activePhoto.id} of ${BIRTHDAY_SURPRISE_PHOTOS.length}`}
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar inside Lightbox */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl flex items-center justify-between mb-3 px-1 text-[#FAF4F6]"
            >
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#E7C7CF]/85 tabular-nums">
                {activePhoto.id} / {BIRTHDAY_SURPRISE_PHOTOS.length} · Our Little World
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close photograph viewer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-[#E7C7CF]/35 flex items-center justify-center text-[#FAF4F6] active:scale-95 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Framed Full Photo — Guaranteed zero cropping with object-contain */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center bg-[#FFFDFB] p-2.5 sm:p-4 pb-10 sm:pb-12 rounded-xl shadow-[0_28px_80px_rgba(0,0,0,0.8)] border border-[#E7C7CF]/70 max-w-[94vw] max-h-[82dvh] animate-in zoom-in-95 duration-200"
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[66dvh] sm:max-h-[70dvh] max-w-[86vw] sm:max-w-[78vw] w-auto h-auto object-contain rounded-[4px] bg-[#F5E9ED]"
              />
              <p className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 text-center font-handwriting text-xl sm:text-2xl text-[#5A2A3B]">
                {activePhoto.note}
              </p>
            </div>

            {/* Prev / Next Lightbox Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-4 flex items-center justify-center gap-4 pb-[env(safe-area-inset-bottom)]"
            >
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === null
                      ? 0
                      : (prev - 1 + BIRTHDAY_SURPRISE_PHOTOS.length) %
                        BIRTHDAY_SURPRISE_PHOTOS.length
                  )
                }
                aria-label="Previous photograph"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium active:scale-95 transition-all min-h-[44px] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === null
                      ? 0
                      : (prev + 1) % BIRTHDAY_SURPRISE_PHOTOS.length
                  )
                }
                aria-label="Next photograph"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium active:scale-95 transition-all min-h-[44px] cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  const isWallStep = step === 'MEMORY_WALL';
  const isFinalStep = step === 'FINAL_CONFESSION';

  return (
    <div
      className={`relative h-[100dvh] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out select-none ${
        isClosingScreen
          ? 'opacity-0 scale-[0.98] translate-y-4 pointer-events-none'
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{
        background: isWallStep
          ? 'radial-gradient(ellipse at 50% 12%, #592642 0%, #3E1529 48%, #260A18 100%)'
          : isFinalStep
          ? 'radial-gradient(ellipse at 50% 35%, #521A34 0%, #340C1D 58%, #1B050F 100%)'
          : 'radial-gradient(ellipse at 50% 18%, #541B35 0%, #3A0E1E 54%, #240813 100%)',
      }}
    >
      {/* Dreamy Pink & Lavender Ambient Glows */}
      <div
        className="fixed top-[10%] left-[10%] w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-[#E7C7CF]/14 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[12%] right-[8%] w-[260px] sm:w-[440px] h-[260px] sm:h-[440px] rounded-full bg-[#D8C7E8]/14 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Delicate Ambient Hearts & Sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span
          className="absolute top-[15%] left-[12%] text-[#E7C7CF]/40 text-xs animate-mote"
          style={{ animationDuration: '11s' }}
        >
          ♡
        </span>
        <span
          className="absolute top-[30%] right-[14%] text-[#D8C7E8]/40 text-xs animate-mote"
          style={{ animationDuration: '13s', animationDelay: '2s' }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-[28%] left-[15%] text-[#E7C7CF]/35 text-sm animate-float-gentle"
          style={{ animationDuration: '9s', animationDelay: '1s' }}
        >
          ♡
        </span>
        <span
          className="absolute bottom-[18%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#F5E9ED]/45 blur-[0.5px] animate-mote"
          style={{ animationDuration: '10s', animationDelay: '3s' }}
        />
      </div>

      {/* =================================================================
          DISCREET TOP HEADER BAR (Reserves top-right for AudioPlayer)
         ================================================================= */}
      <header className="relative z-20 shrink-0 w-full border-b border-[#E7C7CF]/15 bg-[#320B1B]/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-sans">
          <div className="flex items-center justify-start">
            {step === 'OPENING' || step === 'FINAL_CONFESSION' ? (
              <button
                type="button"
                onClick={handleExit}
                className="inline-flex items-center gap-1.5 text-[#E7C7CF]/85 hover:text-[#FAF4F6] transition-colors py-2 px-2.5 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Countdown</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBackStep}
                className="inline-flex items-center gap-1.5 text-[#E7C7CF]/85 hover:text-[#FAF4F6] transition-colors py-2 px-2.5 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Back</span>
              </button>
            )}
          </div>

          <span className="text-[10px] sm:text-[11px] tracking-[0.22em] text-[#E7C7CF]/85 uppercase font-medium whitespace-nowrap text-center">
            20 November · Birthday Surprise
          </span>

          {/* Space reserved for docked top-right AudioPlayer */}
          <div className="w-11 shrink-0" aria-hidden="true" />
        </div>
      </header>

      {/* =================================================================
          INDEPENDENT SCROLLABLE CONTENT AREA
         ================================================================= */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar px-4 sm:px-6 py-6 sm:py-9"
      >
        <div
          className={`w-full mx-auto transition-all duration-300 ${
            isWallStep ? 'max-w-4xl' : 'max-w-xl'
          } ${
            isStepTransitioning
              ? 'opacity-0 translate-y-2 scale-[0.99]'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* ===============================================================
              SCREEN 1: A LITTLE REQUEST 🤭
             =============================================================== */}
          {step === 'OPENING' && (
            <div className="min-h-[60dvh] flex flex-col items-center justify-center py-4 animate-in fade-in duration-700">
              <div className="mb-6 flex items-center justify-center">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8E2D3B]/45 via-[#D8C7E8]/20 to-[#3A0E1E]/60 border border-[#E7C7CF]/50 flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.35)] animate-float-gentle">
                  <Sparkles className="w-7 h-7 text-[#F5E9ED] stroke-[1.5]" />
                </div>
              </div>

              <div className="relative w-full bg-[#FAF4F6]/10 backdrop-blur-xl border border-[#E7C7CF]/35 rounded-3xl p-7 sm:p-11 shadow-[0_24px_70px_rgba(12,3,8,0.55)] text-center">
                <div
                  className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/20 pointer-events-none"
                  aria-hidden="true"
                />

                <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.26em] text-[#E7C7CF]/80 mb-3">
                  A Little Request · 20 November ♡
                </p>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-elegant font-normal text-[#FAF4F6] tracking-wide leading-snug text-balance">
                  {BIRTHDAY_SURPRISE_OPENING.heading}
                </h1>

                <div className="mt-7 space-y-5 font-serif-elegant text-lg sm:text-xl md:text-[22px] text-[#F5E9ED]/95 leading-[1.85] font-normal select-text">
                  {BIRTHDAY_SURPRISE_OPENING.paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="animate-letter-fade opacity-0"
                      style={{
                        animationDelay: `${250 + idx * 450}ms`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 2: BIRTHDAY LETTER — A LETTER FROM MY HEART
             =============================================================== */}
          {step === 'LETTER' && (
            <div className="w-full pb-4 animate-in fade-in duration-700">
              <div className="mb-5 flex items-center justify-center gap-3 select-none">
                <span className="h-[1px] w-8 bg-[#E7C7CF]/40" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.24em] text-[#E7C7CF]/90 uppercase">
                  {BIRTHDAY_SURPRISE_LETTER.kicker}
                </span>
                <span className="h-[1px] w-8 bg-[#E7C7CF]/40" aria-hidden="true" />
              </div>

              <article className="relative w-full bg-gradient-to-b from-[#FAF4F6] via-[#FDF8FA] to-[#F7EEF5] border border-[#E7C7CF]/85 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_24px_75px_rgba(12,3,8,0.6)]">
                {/* Inner stationery hairline border */}
                <div
                  className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/50 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Handwritten top flourish */}
                <div className="mb-6 pb-4 border-b border-[#E7C7CF]/60 text-center sm:text-left">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#8E2D3B]">
                    20 November 2026 · For My Panda ♡
                  </p>
                </div>

                {/* Complete Exact Birthday Letter */}
                <div className="space-y-5 font-serif-elegant text-[18px] sm:text-[20px] md:text-[21px] text-[#3A0E1E] leading-[1.85] font-normal select-text break-words">
                  {BIRTHDAY_SURPRISE_LETTER.paragraphs.map((paragraph, idx) => {
                    const isHeadingLine = idx === 0 || idx === 1;
                    const isSignOff =
                      idx === BIRTHDAY_SURPRISE_LETTER.paragraphs.length - 1;

                    return (
                      <p
                        key={idx}
                        className={`animate-letter-fade opacity-0 ${
                          idx === 1
                            ? 'text-2xl sm:text-3xl text-[#8E2D3B] font-medium tracking-wide'
                            : isSignOff
                            ? 'pt-2 font-handwriting text-2xl sm:text-3xl text-[#8E2D3B]'
                            : isHeadingLine
                            ? 'text-xl sm:text-2xl text-[#3A0E1E]'
                            : ''
                        }`}
                        style={{
                          animationDelay: `${140 + idx * 140}ms`,
                          animationFillMode: 'forwards',
                        }}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                <footer className="mt-8 pt-4 border-t border-[#E7C7CF]/55 flex flex-col items-center justify-center gap-1.5 select-none">
                  <Heart className="w-4 h-4 text-[#8E2D3B] fill-[#8E2D3B]/25 animate-heartbeat" />
                  <span className="text-[10px] font-sans text-[#A07A80] tracking-widest uppercase">
                    Written With All My Love
                  </span>
                </footer>
              </article>
            </div>
          )}

          {/* ===============================================================
              SCREEN 3: OUR LITTLE MEMORY WALL — SEVEN PHOTOGRAPHS
             =============================================================== */}
          {step === 'MEMORY_WALL' && (
            <div className="w-full pb-8 animate-in fade-in duration-700">
              {/* Warm Fairy Lights String Draped Across Top of Wall */}
              <div className="relative w-full -mt-2 mb-3 pointer-events-none select-none" aria-hidden="true">
                <svg
                  viewBox="0 0 800 72"
                  className="w-full h-12 sm:h-16 overflow-visible"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M -10 12 Q 200 62 400 22 T 810 18"
                    stroke="rgba(231, 199, 207, 0.42)"
                    strokeWidth="1.5"
                  />
                  {[
                    { cx: 55, cy: 26, delay: '0s' },
                    { cx: 145, cy: 40, delay: '0.7s' },
                    { cx: 235, cy: 42, delay: '1.4s' },
                    { cx: 330, cy: 31, delay: '0.3s' },
                    { cx: 430, cy: 21, delay: '1.1s' },
                    { cx: 530, cy: 34, delay: '1.8s' },
                    { cx: 635, cy: 39, delay: '0.5s' },
                    { cx: 735, cy: 27, delay: '1.2s' },
                  ].map((bulb, i) => (
                    <g key={i}>
                      <circle
                        cx={bulb.cx}
                        cy={bulb.cy}
                        r="14"
                        fill="rgba(255, 224, 178, 0.18)"
                        className="animate-pulse"
                        style={{ animationDelay: bulb.delay }}
                      />
                      <circle
                        cx={bulb.cx}
                        cy={bulb.cy}
                        r="4.2"
                        fill="#FFE7C2"
                        className="animate-pulse"
                        style={{ animationDelay: bulb.delay }}
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Wall Heading & Subtitle */}
              <div className="text-center space-y-2 mb-8 sm:mb-10 px-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-elegant font-normal text-[#FAF4F6] tracking-wide">
                  {BIRTHDAY_SURPRISE_WALL.heading}
                </h2>
                <p className="text-sm sm:text-base font-serif-elegant italic text-[#E7C7CF]/90 tracking-wide">
                  {BIRTHDAY_SURPRISE_WALL.subtitle}
                </p>
                <p className="text-[11px] font-sans text-[#D8C7E8]/75 tracking-wider pt-1">
                  Tap any photograph to view it closer ♡
                </p>
              </div>

              {/* Handcrafted Bedroom Memory Wall Collage — All 7 Uploaded Photos in Order */}
              <div className="relative space-y-8 sm:space-y-12 px-2 sm:px-4">
                {/* Row 1: Photos 1, 2, 3 (Birthday Celebrations — Portrait Polaroids) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 md:gap-7 items-start">
                  <div className="max-w-[270px] sm:max-w-none mx-auto w-full sm:mt-2">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[0]}
                      index={0}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                  <div className="max-w-[270px] sm:max-w-none mx-auto w-full sm:mt-7 sm:-mx-1">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[1]}
                      index={1}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                  <div className="max-w-[270px] sm:max-w-none mx-auto w-full sm:mt-1">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[2]}
                      index={2}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                </div>

                {/* Decorative Pinned Handwritten Note Between Rows */}
                <div className="flex justify-center py-1">
                  <div className="relative bg-[#F5E9ED] text-[#3A0E1E] px-5 py-3 rounded-sm shadow-[0_10px_28px_rgba(12,3,8,0.45)] -rotate-1 border border-[#E7C7CF]/80 max-w-xs text-center">
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-[#D8C7E8]/75 rotate-2"
                    />
                    <p className="font-handwriting text-lg sm:text-xl text-[#8E2D3B] leading-snug">
                      Little dreams pinned to my heart, waiting for their day… ♡
                    </p>
                  </div>
                </div>

                {/* Row 2: Photos 4 & 5 (Sunny Park Bench — Landscape Vintage Frames) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-center">
                  <div className="max-w-[360px] md:max-w-none mx-auto w-full md:-mr-2 md:z-10">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[3]}
                      index={3}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                  <div className="max-w-[360px] md:max-w-none mx-auto w-full md:mt-8 md:-ml-2">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[4]}
                      index={4}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                </div>

                {/* Row 3: Photos 6 & 7 (Sunlit Lawn & Grass — Portrait Polaroids) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 max-w-2xl mx-auto items-start pt-1">
                  <div className="max-w-[270px] sm:max-w-none mx-auto w-full sm:mt-2">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[5]}
                      index={5}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                  <div className="max-w-[270px] sm:max-w-none mx-auto w-full sm:mt-8">
                    <PolaroidCard
                      photo={BIRTHDAY_SURPRISE_PHOTOS[6]}
                      index={6}
                      onSelect={setActivePhotoIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 4: ONE LITTLE TRUTH
             =============================================================== */}
          {step === 'ONE_TRUTH' && (
            <div className="min-h-[60dvh] flex flex-col items-center justify-center py-4 animate-in fade-in duration-700">
              <div className="mb-5 flex items-center justify-center gap-3 select-none">
                <span className="h-[1px] w-8 bg-[#E7C7CF]/40" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.24em] text-[#E7C7CF]/90 uppercase">
                  {BIRTHDAY_SURPRISE_TRUTH.kicker}
                </span>
                <span className="h-[1px] w-8 bg-[#E7C7CF]/40" aria-hidden="true" />
              </div>

              <div className="relative w-full bg-[#FAF4F6]/10 backdrop-blur-xl border border-[#E7C7CF]/35 rounded-3xl p-7 sm:p-11 shadow-[0_24px_70px_rgba(12,3,8,0.55)] text-center">
                <div
                  className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/20 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="w-11 h-11 rounded-full bg-[#8E2D3B]/35 border border-[#E7C7CF]/40 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-5 h-5 text-[#E7C7CF] fill-[#E7C7CF]/30 animate-heartbeat" />
                </div>

                <p className="font-serif-elegant text-xl sm:text-2xl md:text-[25px] text-[#FAF4F6]/95 leading-[1.9] font-normal select-text animate-letter-fade">
                  {BIRTHDAY_SURPRISE_TRUTH.message}
                </p>
              </div>
            </div>
          )}

          {/* ===============================================================
              SCREEN 5: THE FINAL CONFESSION — A SHAYRANA ENDING
             =============================================================== */}
          {step === 'FINAL_CONFESSION' && (
            <div className="min-h-[72dvh] flex flex-col items-center justify-center py-6 px-2 text-center animate-in fade-in duration-1000">
              <div className="relative w-full max-w-lg mx-auto py-8 sm:py-12 px-5 sm:px-9 rounded-3xl bg-[#FAF4F6]/[0.06] backdrop-blur-lg border border-[#E7C7CF]/25 shadow-[0_28px_80px_rgba(10,2,6,0.65)]">
                {/* Soft inner halo */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#E7C7CF]/10 blur-[80px] pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-5 sm:space-y-6 font-serif-elegant text-xl sm:text-2xl md:text-[26px] text-[#FAF4F6] leading-[1.85] font-normal select-text">
                  {BIRTHDAY_SURPRISE_FINALE.stanzas.map((line, idx) => (
                    <p
                      key={idx}
                      className={`transition-all duration-1000 ease-out ${
                        finaleStep >= idx + 1
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-3'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Final Birthday Wish & Tender Heart Animation */}
                <div
                  className={`relative z-10 mt-10 pt-8 border-t border-[#E7C7CF]/25 flex flex-col items-center space-y-5 transition-all duration-1200 ease-out ${
                    finaleStep >= 5
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h2 className="text-3xl sm:text-4xl font-serif-elegant font-normal text-[#F5E9ED] tracking-wide">
                    {BIRTHDAY_SURPRISE_FINALE.closingTitle}
                  </h2>

                  <div className="relative flex items-center justify-center pt-1">
                    <span
                      className="absolute w-14 h-14 rounded-full bg-[#E7C7CF]/20 blur-md animate-pulse-glow"
                      aria-hidden="true"
                    />
                    <span className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#8E2D3B] to-[#541527] border border-[#E7C7CF]/55 flex items-center justify-center shadow-lg shadow-[#8E2D3B]/40">
                      <Heart className="w-5 h-5 text-[#FAF4F6] fill-[#FAF4F6] animate-heartbeat" />
                    </span>
                  </div>

                  <p className="font-handwriting text-xl sm:text-2xl text-[#E7C7CF]/85 pt-1">
                    Hamesha tumhara, Sameer ♡
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================
          CONSISTENT STICKY BOTTOM ACTION BAR (Screens 1–4 only)
          Final Confession ends gently with no extra buttons.
         ================================================================= */}
      {!isFinalStep && (
        <div className="relative z-20 shrink-0 w-full bg-[#240813]/92 backdrop-blur-lg border-t border-[#E7C7CF]/20 px-4 sm:px-6 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <div className="w-full max-w-xl mx-auto">
            {step === 'OPENING' && (
              <button
                type="button"
                onClick={() => transitionToStep('LETTER')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{BIRTHDAY_SURPRISE_OPENING.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#E7C7CF] shrink-0" />
              </button>
            )}

            {step === 'LETTER' && (
              <button
                type="button"
                onClick={() => transitionToStep('MEMORY_WALL')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{BIRTHDAY_SURPRISE_LETTER.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#E7C7CF] shrink-0" />
              </button>
            )}

            {step === 'MEMORY_WALL' && (
              <button
                type="button"
                onClick={() => transitionToStep('ONE_TRUTH')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{BIRTHDAY_SURPRISE_WALL.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#E7C7CF] shrink-0" />
              </button>
            )}

            {step === 'ONE_TRUTH' && (
              <button
                type="button"
                onClick={() => transitionToStep('FINAL_CONFESSION')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{BIRTHDAY_SURPRISE_TRUTH.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#E7C7CF] shrink-0" />
              </button>
            )}
          </div>
        </div>
      )}

      {lightboxModal}
    </div>
  );
};
