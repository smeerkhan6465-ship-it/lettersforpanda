import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Heart, Lock, MailOpen, Sparkles } from 'lucide-react';
import {
  SAAT_AHAD_INTRO,
  SAAT_AHAD_PROMISES,
  SAAT_AHAD_FINALE,
  PromiseItem,
} from '../data/promises';
import { useDualAudio } from '../context/AudioContext';
import { AnimatedText } from './AnimatedText';

type SaatAhadSubView = 'INTRO' | 'OVERVIEW' | 'PROMISE_INTRO' | 'PROMISE_LETTER';

interface SaatAhadViewProps {
  dubaiDateKey: string;
  shouldShowIntro: boolean;
  onMarkIntroSeen: () => void;
  onClose: () => void;
}

export const SaatAhadView: React.FC<SaatAhadViewProps> = ({
  dubaiDateKey,
  shouldShowIntro,
  onMarkIntroSeen,
  onClose,
}) => {
  const [subView, setSubView] = useState<SaatAhadSubView>(() =>
    shouldShowIntro ? 'INTRO' : 'OVERVIEW'
  );
  const [selectedPromise, setSelectedPromise] = useState<PromiseItem | null>(null);
  const [isClosingScreen, setIsClosingScreen] = useState(false);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);

  // Automatic completion states for AnimatedText reveal
  const [introTextComplete, setIntroTextComplete] = useState(false);
  const [promiseIntroComplete, setPromiseIntroComplete] = useState(false);
  const [promiseLetterComplete, setPromiseLetterComplete] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { startPromiseMusic } = useDualAudio();

  // Scroll independent content container cleanly to top when changing sub-views or promises
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [subView, selectedPromise?.id]);

  // Helper to smoothly fade between internal Saat Ahad views
  const transitionToView = useCallback(
    (nextView: SaatAhadSubView, promise: PromiseItem | null = null) => {
      setIsStepTransitioning(true);
      setTimeout(() => {
        if (nextView === 'INTRO') setIntroTextComplete(false);
        if (nextView === 'PROMISE_INTRO') setPromiseIntroComplete(false);
        if (nextView === 'PROMISE_LETTER') setPromiseLetterComplete(false);
        setSelectedPromise(promise);
        setSubView(nextView);
        setIsStepTransitioning(false);
      }, 280);
    },
    []
  );

  // Exit Saat Ahad completely back to main countdown
  const handleExitSaatAhad = () => {
    if (isClosingScreen) return;
    setIsClosingScreen(true);
    setTimeout(() => {
      onClose();
    }, 550);
  };

  // Clicking "Haan, apne waade bataiye ♡" on the Nov 14 Introductory Experience
  const handleProceedFromIntro = () => {
    // Mark introductory letter as seen so it is never shown again on revisit or navigation
    onMarkIntroSeen();

    // Explicit user interaction on Saat Ahad intro screen starts Promise Audio smoothly
    startPromiseMusic();

    // On November 14, lead directly into Promise 1's special personal conversation intro
    transitionToView('PROMISE_INTRO', SAAT_AHAD_PROMISES[0]);
  };

  // Selecting an unlocked promise from Overview
  const handleSelectPromise = (promise: PromiseItem) => {
    if (dubaiDateKey < promise.unlockDate) return;
    startPromiseMusic();
    transitionToView('PROMISE_INTRO', promise);
  };

  // Closing a promise letter or intro returns to Overview
  const handleReturnToOverview = () => {
    transitionToView('OVERVIEW', null);
  };

  const handleIntroComplete = useCallback(() => {
    setIntroTextComplete(true);
  }, []);

  const handlePromiseIntroComplete = useCallback(() => {
    setPromiseIntroComplete(true);
  }, []);

  const handlePromiseLetterComplete = useCallback(() => {
    setPromiseLetterComplete(true);
  }, []);

  const isFinalePromise = Boolean(selectedPromise?.isFinale);

  // Unlocked promises for Overview primary quick-open CTA (strictly Asia/Dubai)
  const unlockedPromises = SAAT_AHAD_PROMISES.filter(
    (p) => dubaiDateKey >= p.unlockDate
  );
  const todaysPromise = unlockedPromises.find((p) => p.unlockDate === dubaiDateKey);
  const latestUnlockedPromise =
    todaysPromise ??
    (unlockedPromises.length > 0
      ? unlockedPromises[unlockedPromises.length - 1]
      : null);

  // Next unlocked promise for seamless navigation inside PROMISE_LETTER
  const nextCandidate = selectedPromise
    ? SAAT_AHAD_PROMISES.find((p) => p.number === selectedPromise.number + 1) ?? null
    : null;
  const nextUnlockedPromise =
    nextCandidate && dubaiDateKey >= nextCandidate.unlockDate
      ? nextCandidate
      : null;

  return (
    <div
      className={`relative h-[100dvh] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out select-none ${
        isClosingScreen
          ? 'opacity-0 scale-[0.98] translate-y-4 pointer-events-none'
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, #4D1327 0%, #3A0E1E 55%, #240813 100%)',
      }}
    >
      {/* Soft diffused blush ambient glow */}
      <div
        className={`fixed top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-1000 ${
          isFinalePromise ? 'bg-[#E7C7CF]/18' : 'bg-[#E7C7CF]/10'
        }`}
        aria-hidden="true"
      />

      {/* Subtle floating hearts and motes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span
          className="absolute top-[14%] left-[12%] text-[#E7C7CF]/35 text-xs animate-mote"
          style={{ animationDuration: '11s' }}
        >
          ♡
        </span>
        <span
          className="absolute top-[38%] right-[14%] w-1.5 h-1.5 rounded-full bg-[#E7C7CF]/40 blur-[0.5px] animate-mote"
          style={{ animationDuration: '13s', animationDelay: '2s' }}
        />
        <span
          className="absolute bottom-[24%] left-[16%] text-[#E7C7CF]/30 text-sm animate-float-gentle"
          style={{ animationDuration: '9s', animationDelay: '1s' }}
        >
          ♡
        </span>
        <span
          className="absolute top-[66%] right-[18%] text-[#E7C7CF]/25 text-xs animate-mote"
          style={{ animationDuration: '12s', animationDelay: '3s' }}
        >
          ✦
        </span>
        {isFinalePromise && (
          <>
            <span
              className="absolute top-[22%] right-[24%] text-[#F5E9ED]/35 text-sm animate-float-reverse"
              style={{ animationDuration: '8s' }}
            >
              ♡
            </span>
            <span
              className="absolute bottom-[22%] right-[12%] text-[#E7C7CF]/30 text-xs animate-float-gentle"
              style={{ animationDuration: '10s', animationDelay: '2s' }}
            >
              ♡
            </span>
          </>
        )}
      </div>

      {/* =================================================================
          TOP FIXED HEADER BAR (Leaves right slot clean for AudioPlayer)
         ================================================================= */}
      <header className="relative z-20 shrink-0 w-full border-b border-[#E7C7CF]/15 bg-[#3A0E1E]/65 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-sans">
          <div className="flex items-center justify-start">
            {subView === 'INTRO' || subView === 'OVERVIEW' ? (
              <button
                type="button"
                onClick={handleExitSaatAhad}
                className="inline-flex items-center gap-1.5 text-[#E7C7CF]/90 hover:text-[#FAF4F6] transition-colors py-2 px-2.5 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Countdown</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReturnToOverview}
                className="inline-flex items-center gap-1.5 text-[#E7C7CF]/90 hover:text-[#FAF4F6] transition-colors py-2 px-2.5 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">All Promises</span>
              </button>
            )}
          </div>

          <span className="text-[10px] sm:text-[11px] tracking-[0.22em] text-[#E7C7CF]/85 uppercase font-medium whitespace-nowrap text-center">
            Saat Ahad · 7 Promises
          </span>

          {/* Space reserved cleanly for top-right AudioPlayer toggle */}
          <div className="w-11 shrink-0" aria-hidden="true" />
        </div>
      </header>

      {/* =================================================================
          INDEPENDENT SCROLLABLE CONTENT AREA
         ================================================================= */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain custom-scrollbar px-4 sm:px-6 py-5 sm:py-8"
      >
        <div
          className={`w-full max-w-xl mx-auto pb-4 transition-all duration-300 ${
            isStepTransitioning
              ? 'opacity-0 translate-y-2 scale-[0.99]'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* SUB-VIEW 1: INTRODUCTORY EXPERIENCE (Shown once on Nov 14 only) */}
          {subView === 'INTRO' && (
            <div className="w-full flex flex-col items-center">
              {/* Soft animated envelope / handwritten letter visual */}
              <div className="mb-5 flex flex-col items-center animate-in fade-in duration-700">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FAF4F6]/10 border border-[#E7C7CF]/40 flex items-center justify-center shadow-lg shadow-black/25 animate-float-gentle">
                  <MailOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#E7C7CF] stroke-[1.5]" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#8E2D3B] border border-[#E7C7CF]/60 flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-[#FAF4F6] fill-[#FAF4F6]" />
                  </span>
                </div>
              </div>

              {/* Handwritten-feel Intro Card */}
              <article className="relative w-full bg-[#FAF4F6] border border-[#E7C7CF]/80 rounded-3xl p-6 sm:p-10 shadow-[0_24px_70px_rgba(15,3,8,0.55)] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/45 pointer-events-none" />

                <header className="mb-6 text-center border-b border-[#E7C7CF]/60 pb-5">
                  <p className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] text-[#8E2D3B] uppercase mb-2">
                    Dil Se Kuch Baatein
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-elegant font-normal text-[#3A0E1E] tracking-wide">
                    {SAAT_AHAD_INTRO.heading}
                  </h1>
                </header>

                <div className="font-serif-elegant text-lg sm:text-xl text-[#3A0E1E] leading-[1.85] font-normal select-text">
                  <AnimatedText
                    key="saat-ahad-intro-letter"
                    text={SAAT_AHAD_INTRO.content}
                    speed={18}
                    delay={220}
                    onComplete={handleIntroComplete}
                    as="div"
                  />
                </div>
              </article>
            </div>
          )}

          {/* SUB-VIEW 2: SEVEN PROMISES OVERVIEW (ASIA/DUBAI SCHEDULE) */}
          {subView === 'OVERVIEW' && (
            <div className="w-full space-y-5 animate-in fade-in duration-500">
              <div className="text-center space-y-1.5 mb-2">
                <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#E7C7CF]/80">
                  14 November – 20 November 2026
                </p>
                <h2 className="text-2xl sm:text-4xl font-serif-elegant font-normal text-[#FAF4F6] tracking-wide">
                  Saat Ahad — 7 Promises ♡
                </h2>
                <p className="text-xs sm:text-sm font-sans font-light text-[#E7C7CF]/75 max-w-md mx-auto leading-relaxed">
                  Har roz ek naya ahad, Dubai ke waqt ke saath khulta jayega.
                </p>
              </div>

              {/* Promises Schedule List */}
              <div className="space-y-3">
                {SAAT_AHAD_PROMISES.map((promise) => {
                  const isUnlocked = dubaiDateKey >= promise.unlockDate;
                  const isToday = dubaiDateKey === promise.unlockDate;

                  return (
                    <div
                      key={promise.id}
                      onClick={() => isUnlocked && handleSelectPromise(promise)}
                      role={isUnlocked ? 'button' : undefined}
                      tabIndex={isUnlocked ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          handleSelectPromise(promise);
                        }
                      }}
                      className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                        isUnlocked
                          ? 'bg-[#FAF4F6] border-[#E7C7CF] text-[#3A0E1E] shadow-[0_12px_32px_rgba(15,3,8,0.35)] hover:shadow-[0_16px_36px_rgba(15,3,8,0.45)] cursor-pointer'
                          : 'bg-[#FAF4F6]/8 border-[#E7C7CF]/20 text-[#E7C7CF]/70 backdrop-blur-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="min-w-0 flex-1 text-left">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em]">
                            <span
                              className={
                                isUnlocked ? 'text-[#8E2D3B] font-medium' : 'text-[#A07A80]'
                              }
                            >
                              {promise.dateLabel}
                            </span>
                            {isToday && isUnlocked && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#8E2D3B] font-semibold">
                                  Today&apos;s Promise ♡
                                </span>
                              </>
                            )}
                          </div>

                          <h3
                            className={`mt-1 text-lg sm:text-xl font-serif-elegant tracking-wide ${
                              isUnlocked ? 'text-[#3A0E1E]' : 'text-[#FAF4F6]/75'
                            }`}
                          >
                            {promise.title}
                          </h3>

                          {!isUnlocked && (
                            <p className="mt-1 text-xs font-sans text-[#A07A80] font-light">
                              Unlocks on {promise.dateLabel} ♡
                            </p>
                          )}
                        </div>

                        {isUnlocked ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPromise(promise);
                            }}
                            className="shrink-0 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8E2D3B] to-[#731F2C] text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 min-h-[42px]"
                          >
                            <Heart className="w-3.5 h-3.5 fill-white/25" />
                            <span>Padhein</span>
                          </button>
                        ) : (
                          <div
                            aria-label={`Locked until ${promise.dateLabel}`}
                            className="shrink-0 w-10 h-10 rounded-xl bg-black/20 border border-[#E7C7CF]/15 flex items-center justify-center text-[#A07A80]"
                          >
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: SHAYARI-RESPONSE INTRODUCTION FOR EACH PROMISE */}
          {subView === 'PROMISE_INTRO' && selectedPromise && (
            <div className="w-full flex flex-col items-center mt-1 animate-in fade-in duration-500">
              <div className="mb-5 flex items-center justify-center gap-3 select-none">
                <span className="h-[1px] w-6 sm:w-8 bg-[#E7C7CF]/35" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.2em] text-[#E7C7CF]/90 uppercase text-center">
                  {selectedPromise.shayariKicker}
                </span>
                <span className="h-[1px] w-6 sm:w-8 bg-[#E7C7CF]/35" aria-hidden="true" />
              </div>

              {/* Warm translucent conversational card */}
              <div className="relative w-full bg-[#FAF4F6]/8 backdrop-blur-md border border-[#E7C7CF]/35 rounded-3xl p-6 sm:p-10 shadow-[0_24px_70px_rgba(10,2,5,0.5)]">
                <div className="font-serif-elegant text-lg sm:text-xl md:text-[21px] text-[#FAF4F6]/95 leading-[1.85] font-normal select-text">
                  <AnimatedText
                    key={`promise-intro-${selectedPromise.id}`}
                    text={selectedPromise.shayariIntro}
                    speed={18}
                    delay={180}
                    onComplete={handlePromiseIntroComplete}
                    as="div"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: FULL-SCREEN PROMISE LETTER (+ FINALE ON PROMISE 7) */}
          {subView === 'PROMISE_LETTER' && selectedPromise && (
            <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
              {/* Top Kicker */}
              <div className="mb-5 flex items-center justify-center gap-3 select-none">
                <span className="h-[1px] w-6 sm:w-10 bg-[#E7C7CF]/40" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.22em] text-[#E7C7CF]/90 uppercase text-center">
                  Promise {selectedPromise.number} of 7 · {selectedPromise.dateLabel}
                </span>
                <span className="h-[1px] w-6 sm:w-10 bg-[#E7C7CF]/40" aria-hidden="true" />
              </div>

              {/* Full-screen Styled Letter Paper (Special visual treatment for Promise 7) */}
              <article
                className={`relative w-full bg-[#FAF4F6] rounded-3xl p-6 sm:p-10 md:p-12 animate-in fade-in slide-in-from-bottom-5 duration-700 cursor-default ${
                  isFinalePromise
                    ? 'border-2 border-[#E7C7CF] shadow-[0_28px_90px_rgba(231,199,207,0.22),0_24px_70px_rgba(15,3,8,0.6)]'
                    : 'border border-[#E7C7CF]/80 shadow-[0_24px_70px_rgba(15,3,8,0.55)]'
                }`}
              >
                {/* Inner hairline frame */}
                <div
                  className={`absolute inset-2 sm:inset-3 rounded-[22px] pointer-events-none ${
                    isFinalePromise
                      ? 'border border-[#8E2D3B]/35'
                      : 'border border-[#E7C7CF]/45'
                  }`}
                />

                {/* Heading */}
                <header className="mb-7 text-center sm:text-left border-b border-[#E7C7CF]/60 pb-5">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    {isFinalePromise && (
                      <Sparkles className="w-3.5 h-3.5 text-[#8E2D3B]" aria-hidden="true" />
                    )}
                    <p className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] text-[#8E2D3B] uppercase">
                      {isFinalePromise
                        ? 'Birthday Promise · 20 November 2026 ♡'
                        : 'Dil Se Kiya Hua Ahad ♡'}
                    </p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-elegant font-normal text-[#3A0E1E] tracking-wide leading-snug">
                    {selectedPromise.title}
                  </h2>
                </header>

                {/* Exact Promise Text Revealed Smoothly */}
                <div className="font-serif-elegant text-lg sm:text-xl md:text-[21px] text-[#3A0E1E] leading-[1.85] font-normal select-text break-words">
                  <AnimatedText
                    key={`promise-body-${selectedPromise.id}`}
                    text={selectedPromise.content}
                    speed={18}
                    delay={250}
                    onComplete={handlePromiseLetterComplete}
                    as="div"
                  />
                </div>

                {/* Promise 7 Birthday Finale (Revealed automatically after text completes) */}
                {isFinalePromise && (
                  <div
                    className={`mt-10 pt-7 border-t border-[#E7C7CF]/70 text-center space-y-5 transition-all duration-1000 ${
                      promiseLetterComplete
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-serif-elegant italic text-[#8E2D3B] leading-relaxed">
                      {SAAT_AHAD_FINALE.headline}
                    </p>

                    <div className="p-5 rounded-2xl bg-[#F5E9ED]/85 border border-[#E7C7CF]/70">
                      <p className="font-handwriting text-xl sm:text-2xl text-[#3A0E1E] leading-relaxed">
                        {SAAT_AHAD_FINALE.handwrittenNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Delicate bottom signature mark */}
                <footer className="mt-8 pt-4 flex flex-col items-center justify-center gap-1.5 select-none">
                  <Heart className="w-4 h-4 text-[#8E2D3B] fill-[#8E2D3B]/20 animate-pulse" />
                  <span className="text-[10px] font-sans text-[#A07A80] tracking-widest uppercase">
                    Tumhara Sameer · ♡
                  </span>
                </footer>
              </article>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================
          CONSISTENT STICKY BOTTOM ACTION AREA (SAFE-AREA AWARE)
         ================================================================= */}
      <div className="relative z-20 shrink-0 w-full bg-[#240813]/92 backdrop-blur-lg border-t border-[#E7C7CF]/20 px-4 sm:px-6 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <div className="w-full max-w-xl mx-auto">
          {/* Sticky CTA for INTRO */}
          {subView === 'INTRO' && (
            <div className="flex flex-col items-center">
              {introTextComplete ? (
                <button
                  type="button"
                  onClick={handleProceedFromIntro}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer animate-in fade-in duration-500"
                >
                  <span>{SAAT_AHAD_INTRO.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#E7C7CF]" />
                </button>
              ) : (
                <div className="w-full min-h-[48px] rounded-2xl border border-[#E7C7CF]/25 bg-[#FAF4F6]/5 flex items-center justify-center px-4 text-xs sm:text-sm font-sans text-[#E7C7CF]/80 tracking-wide">
                  Aapke liye kuch alfaaz likh raha hoon… ♡
                </div>
              )}
            </div>
          )}

          {/* Sticky CTA for OVERVIEW */}
          {subView === 'OVERVIEW' && (
            <div className="w-full flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleExitSaatAhad}
                className={`${
                  latestUnlockedPromise ? 'shrink-0 px-4' : 'w-full px-6'
                } py-3.5 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer`}
              >
                <span>{latestUnlockedPromise ? 'Countdown' : 'Return to Countdown ♡'}</span>
              </button>

              {latestUnlockedPromise && (
                <button
                  type="button"
                  onClick={() => handleSelectPromise(latestUnlockedPromise)}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#E7C7CF] fill-[#E7C7CF]/25 shrink-0" />
                  <span className="truncate">
                    {todaysPromise
                      ? `Open Today's Promise (${todaysPromise.number}/7)`
                      : `Open Promise ${latestUnlockedPromise.number} of 7`}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Sticky CTA for PROMISE_INTRO */}
          {subView === 'PROMISE_INTRO' && selectedPromise && (
            <div className="w-full flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleReturnToOverview}
                className="shrink-0 py-3.5 px-4 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
              >
                Back
              </button>

              {promiseIntroComplete ? (
                <button
                  type="button"
                  onClick={() => transitionToView('PROMISE_LETTER', selectedPromise)}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer animate-in fade-in duration-500"
                >
                  <Heart className="w-4 h-4 text-[#E7C7CF] fill-[#E7C7CF]/30 shrink-0" />
                  <span>{selectedPromise.revealButtonLabel}</span>
                </button>
              ) : (
                <div className="flex-1 min-h-[48px] rounded-2xl border border-[#E7C7CF]/25 bg-[#FAF4F6]/5 flex items-center justify-center px-4 text-xs sm:text-sm font-sans text-[#E7C7CF]/80 tracking-wide">
                  Reading introduction… ♡
                </div>
              )}
            </div>
          )}

          {/* Sticky CTA for PROMISE_LETTER & FINALE */}
          {subView === 'PROMISE_LETTER' && selectedPromise && (
            <div className="w-full flex items-center gap-2.5 sm:gap-3">
              {!promiseLetterComplete ? (
                <>
                  <button
                    type="button"
                    onClick={handleReturnToOverview}
                    className="shrink-0 py-3.5 px-4 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex-1 min-h-[48px] rounded-2xl border border-[#E7C7CF]/25 bg-[#FAF4F6]/5 flex items-center justify-center px-4 text-xs sm:text-sm font-sans text-[#E7C7CF]/80 tracking-wide">
                    Reading promise {selectedPromise.number} of 7… ♡
                  </div>
                </>
              ) : nextUnlockedPromise ? (
                <>
                  <button
                    type="button"
                    onClick={handleReturnToOverview}
                    className="shrink-0 py-3.5 px-4 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
                  >
                    All Promises
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionToView('PROMISE_INTRO', nextUnlockedPromise)}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer animate-in fade-in duration-500"
                  >
                    <span>Next: Promise {nextUnlockedPromise.number}</span>
                    <ArrowRight className="w-4 h-4 text-[#E7C7CF] shrink-0" />
                  </button>
                </>
              ) : isFinalePromise ? (
                <>
                  <button
                    type="button"
                    onClick={handleReturnToOverview}
                    className="shrink-0 py-3.5 px-4 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
                  >
                    All 7 Promises
                  </button>
                  <button
                    type="button"
                    onClick={handleExitSaatAhad}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer animate-in fade-in duration-500"
                  >
                    <span>Return to Countdown ♡</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleReturnToOverview}
                    className="shrink-0 py-3.5 px-4 rounded-2xl bg-[#FAF4F6]/12 hover:bg-[#FAF4F6]/20 active:scale-[0.98] border border-[#E7C7CF]/35 text-[#FAF4F6] text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center cursor-pointer"
                  >
                    All Promises
                  </button>
                  <button
                    type="button"
                    onClick={handleExitSaatAhad}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-[#8E2D3B]/35 hover:shadow-xl active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer animate-in fade-in duration-500"
                  >
                    <span>Wapas Countdown par ♡</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
