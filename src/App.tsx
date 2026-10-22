import React, { useState, useEffect } from 'react';
import { getCountdownState, CountdownState } from './utils/time';
import { DAILY_LETTERS, DailyLetter } from './data/messages';
import { AudioProvider, useDualAudio } from './context/AudioContext';
import { BackgroundElements } from './components/BackgroundElements';
import { Header } from './components/Header';
import { PandaMascot } from './components/PandaMascot';
import { CountdownTimer } from './components/CountdownTimer';
import { EnvelopeSection } from './components/EnvelopeSection';
import { BirthdayLock } from './components/BirthdayLock';
import { DailyCareCheck } from './components/DailyCareCheck';
import { AudioPlayer } from './components/AudioPlayer';
import { LetterView } from './components/LetterView';

import { PasswordGate } from './components/PasswordGate';

type AppScreenState =
  | 'CARE_CHECK'
  | 'COUNTDOWN'
  | 'TRANSITION_TO_LETTER'
  | 'LETTER_VIEW'
  | 'TRANSITION_TO_COUNTDOWN';

function CountdownApp() {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState());
  const [screenState, setScreenState] = useState<AppScreenState>('CARE_CHECK');
  const { openLetterMusic, closeLetterMusic } = useDualAudio();

  // Update countdown every second and handle midnight rollover in Asia/Dubai
  useEffect(() => {
    setCountdown(getCountdownState());

    const interval = setInterval(() => {
      setCountdown(getCountdownState());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Determine current day's letter based on Dubai calendar date
  const getLetterForDate = (dateKey: string): DailyLetter => {
    if (DAILY_LETTERS[dateKey]) {
      return DAILY_LETTERS[dateKey];
    }
    if (dateKey < '2026-10-22') {
      return DAILY_LETTERS['2026-10-22'];
    }
    if (dateKey >= '2026-11-20') {
      return DAILY_LETTERS['2026-11-20'];
    }
    return DAILY_LETTERS['2026-10-22'];
  };

  const currentLetter = getLetterForDate(countdown.dubaiDateKey);

  // START CINEMATIC OPENING TRANSITION
  const handleStartOpenLetter = () => {
    if (screenState !== 'COUNTDOWN') return;

    // 1. Immediately switch audio to Music 2 (Letter soundtrack)
    openLetterMusic();

    // 2. Start coordinated transition sequence
    setScreenState('TRANSITION_TO_LETTER');

    // 3. Complete transition after 1600ms: countdown layout is unmounted, only LetterView remains
    setTimeout(() => {
      setScreenState('LETTER_VIEW');
    }, 1600);
  };

  // START CINEMATIC CLOSING TRANSITION
  const handleStartCloseLetter = () => {
    if (screenState !== 'LETTER_VIEW') return;

    // 1. Immediately switch audio back to Music 1 (Countdown soundtrack)
    closeLetterMusic();

    // 2. Transition state back to countdown
    setScreenState('TRANSITION_TO_COUNTDOWN');

    // 3. Return cleanly to countdown view
    setTimeout(() => {
      setScreenState('COUNTDOWN');
    }, 750);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-[#3A0E1E] selection:bg-[#E7C7CF] selection:text-[#3A0E1E] overflow-x-hidden">
      {screenState === 'CARE_CHECK' ? (
        /* SCREEN 1: Full-Screen Minimal Romantic Daily Care Check (Untouched) */
        <DailyCareCheck onComplete={() => setScreenState('COUNTDOWN')} />
      ) : screenState === 'LETTER_VIEW' ? (
        /* SCREEN 3: Dedicated Romantic Luxury Letter Reading View (Countdown Completely Unmounted) */
        <div className="relative min-h-screen w-full bg-[#3A0E1E]">
          <LetterView letter={currentLetter} onClose={handleStartCloseLetter} />
          {/* Discreet Floating Audio Control at Bottom-Right */}
          <AudioPlayer />
        </div>
      ) : (
        /* SCREEN 2: Main Romantic Luxury Birthday Countdown & Transitions */
        <div
          className={`relative min-h-screen flex flex-col justify-between transition-opacity duration-800 ${
            screenState === 'TRANSITION_TO_COUNTDOWN' ? 'animate-in fade-in duration-700' : ''
          }`}
        >
          {/* Deep Black Cherry Transition Overlay that dims the screen into darkness */}
          <div
            className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-1500 ease-in-out ${
              screenState === 'TRANSITION_TO_LETTER'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, #4D1327 0%, #3A0E1E 55%, #240813 100%)',
            }}
            aria-hidden="true"
          />

          {/* Luxury Ambient Rose Glow & Particles */}
          <div
            className={`transition-opacity duration-1000 ${
              screenState === 'TRANSITION_TO_LETTER'
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100'
            }`}
          >
            <BackgroundElements />
          </div>

          {/* Top Header Bar */}
          <div
            className={`transition-opacity duration-1000 ${
              screenState === 'TRANSITION_TO_LETTER'
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100'
            }`}
          >
            <Header />
          </div>

          {/* Main Experience Container */}
          <main className="relative z-10 flex-1 flex flex-col items-center justify-start w-full max-w-2xl mx-auto px-4 pb-8">
            {/* Panda Mascot Section */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                screenState === 'TRANSITION_TO_LETTER'
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <PandaMascot />
            </div>

            {/* Live Dubai Countdown */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                screenState === 'TRANSITION_TO_LETTER'
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <CountdownTimer countdown={countdown} />
            </div>

            {/* Today's Sealed Envelope & Letter Reveal */}
            <EnvelopeSection
              letter={currentLetter}
              onOpenLetter={handleStartOpenLetter}
              isOpening={screenState === 'TRANSITION_TO_LETTER'}
            />

            {/* Birthday Surprise Gate */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                screenState === 'TRANSITION_TO_LETTER'
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <BirthdayLock isBirthday={countdown.isBirthday} />
            </div>
          </main>

          {/* Quiet, Personal Footer */}
          <footer
            className={`relative z-10 pb-6 text-center text-xs text-[#A07A80] font-sans tracking-wide transition-opacity duration-1000 ${
              screenState === 'TRANSITION_TO_LETTER'
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100'
            }`}
          >
            <p>Made with all my love, for my Panda 🐼 ♡</p>
          </footer>

          {/* Discreet Floating Audio Control at Bottom-Right */}
          <AudioPlayer />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <AudioProvider>
      <CountdownApp />
    </AudioProvider>
  );
}

