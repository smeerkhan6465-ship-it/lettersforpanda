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
import { PromisesSection } from './components/PromisesSection';
import { SaatAhadView } from './components/SaatAhadView';
import { BirthdaySurpriseView } from './components/BirthdaySurpriseView';

import { PasswordGate } from './components/PasswordGate';

type AppScreenState =
  | 'CARE_CHECK'
  | 'COUNTDOWN'
  | 'TRANSITION_TO_LETTER'
  | 'LETTER_VIEW'
  | 'TRANSITION_TO_SAAT_AHAD'
  | 'SAAT_AHAD'
  | 'TRANSITION_TO_BIRTHDAY_SURPRISE'
  | 'BIRTHDAY_SURPRISE'
  | 'TRANSITION_TO_COUNTDOWN';

const INTRO_SEEN_STORAGE_KEY = 'saat_ahad_intro_seen_2026_11_14';

// Temporary testing flag for previewing the November 20 Birthday Surprise before launch
const ENABLE_BIRTHDAY_SURPRISE_TEST_MODE = true;

function CountdownApp() {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState());
  const [screenState, setScreenState] = useState<AppScreenState>('CARE_CHECK');
  const [isBirthdayTestUnlocked, setIsBirthdayTestUnlocked] = useState(false);
  const [hasSeenSaatAhadIntro, setHasSeenSaatAhadIntro] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(INTRO_SEEN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const {
    openLetterMusic,
    closeLetterMusic,
    enterSaatAhadAudio,
    startPromiseMusic,
    exitSaatAhadAudio,
    openBirthdayMusic,
    exitBirthdayMusic,
  } = useDualAudio();

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

  // START CINEMATIC OPENING TRANSITION FOR DAILY LETTER
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

  // START CINEMATIC CLOSING TRANSITION FOR DAILY LETTER
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

  const shouldShowSaatAhadIntro =
    countdown.dubaiDateKey === '2026-11-14' && !hasSeenSaatAhadIntro;

  const handleMarkSaatAhadIntroSeen = () => {
    setHasSeenSaatAhadIntro(true);
    try {
      window.localStorage.setItem(INTRO_SEEN_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage failures in restricted contexts
    }
  };

  // OPEN SAAT AHAD EXPERIENCE
  const handleStartOpenSaatAhad = () => {
    if (screenState !== 'COUNTDOWN') return;

    // 1. Pause existing music1/music2 cleanly
    enterSaatAhadAudio();

    // 2. On Nov 15-20 or revisits (no intro letter), start Promise Audio directly on this click
    //    On Nov 14 first visit, keep paused until she interacts with the intro letter CTA
    if (!shouldShowSaatAhadIntro) {
      startPromiseMusic();
    }

    // 3. Smooth fade into Saat Ahad
    setScreenState('TRANSITION_TO_SAAT_AHAD');

    setTimeout(() => {
      setScreenState('SAAT_AHAD');
    }, 850);
  };

  // CLOSE SAAT AHAD EXPERIENCE
  const handleCloseSaatAhad = () => {
    if (screenState !== 'SAAT_AHAD') return;

    // 1. Stop & reset Promise Audio and restore Music 1 if not paused by user
    exitSaatAhadAudio();

    // 2. Fade cleanly back to Countdown
    setScreenState('TRANSITION_TO_COUNTDOWN');

    setTimeout(() => {
      setScreenState('COUNTDOWN');
    }, 750);
  };

  const isBirthdaySurpriseUnlocked =
    countdown.isBirthday || (ENABLE_BIRTHDAY_SURPRISE_TEST_MODE && isBirthdayTestUnlocked);

  // OPEN BIRTHDAY SURPRISE EXPERIENCE (20 November 2026 Asia/Dubai)
  const handleStartOpenBirthdaySurprise = () => {
    if (screenState !== 'COUNTDOWN' || !isBirthdaySurpriseUnlocked) return;

    // 1. Immediately pause other tracks and start Music10.mp3 inside this click gesture
    openBirthdayMusic();

    // 2. Smooth fade into Birthday Surprise
    setScreenState('TRANSITION_TO_BIRTHDAY_SURPRISE');

    setTimeout(() => {
      setScreenState('BIRTHDAY_SURPRISE');
    }, 850);
  };

  // CLOSE BIRTHDAY SURPRISE EXPERIENCE
  const handleCloseBirthdaySurprise = () => {
    if (screenState !== 'BIRTHDAY_SURPRISE') return;

    // 1. Stop & reset Music10.mp3 and restore Music 1 if not paused by user
    exitBirthdayMusic();

    // 2. Fade cleanly back to Countdown
    setScreenState('TRANSITION_TO_COUNTDOWN');

    setTimeout(() => {
      setScreenState('COUNTDOWN');
    }, 750);
  };

  const isTransitioningToOverlay =
    screenState === 'TRANSITION_TO_LETTER' ||
    screenState === 'TRANSITION_TO_SAAT_AHAD' ||
    screenState === 'TRANSITION_TO_BIRTHDAY_SURPRISE';

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
      ) : screenState === 'SAAT_AHAD' ? (
        /* SCREEN 4: Dedicated Saat Ahad — 7 Promises Experience */
        <div className="relative min-h-screen w-full bg-[#3A0E1E]">
          <SaatAhadView
            dubaiDateKey={countdown.dubaiDateKey}
            shouldShowIntro={shouldShowSaatAhadIntro}
            onMarkIntroSeen={handleMarkSaatAhadIntroSeen}
            onClose={handleCloseSaatAhad}
          />
          {/* Discreet Floating Audio Control for Promise Audio */}
          <AudioPlayer />
        </div>
      ) : screenState === 'BIRTHDAY_SURPRISE' ? (
        /* SCREEN 5: Dedicated Birthday Surprise Experience (Unlocks 20 Nov Asia/Dubai) */
        <div className="relative min-h-screen w-full bg-[#3A0E1E]">
          <BirthdaySurpriseView onClose={handleCloseBirthdaySurprise} />
          {/* Discreet Floating Audio Control for Music10.mp3 */}
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
              isTransitioningToOverlay ? 'opacity-100' : 'opacity-0'
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
              isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <BackgroundElements />
          </div>

          {/* Top Header Bar */}
          <div
            className={`transition-opacity duration-1000 ${
              isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Header />
          </div>

          {/* Main Experience Container */}
          <main className="relative z-10 flex-1 flex flex-col items-center justify-start w-full max-w-2xl mx-auto px-4 pb-8">
            {/* Panda Mascot Section */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <PandaMascot />
            </div>

            {/* Independent Second Option: Saat Ahad — 7 Promises (Placed above Time Until Your Birthday) */}
            <PromisesSection
              onOpenSaatAhad={handleStartOpenSaatAhad}
              isOpening={isTransitioningToOverlay}
            />

            {/* Live Dubai Countdown */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <CountdownTimer countdown={countdown} />
            </div>

            {/* Today's Sealed Envelope & Daily Message */}
            <EnvelopeSection
              letter={currentLetter}
              onOpenLetter={handleStartOpenLetter}
              isOpening={screenState === 'TRANSITION_TO_LETTER'}
            />

            {/* Birthday Surprise Gate */}
            <div
              className={`w-full transition-opacity duration-1000 ${
                isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <BirthdayLock
                isBirthday={isBirthdaySurpriseUnlocked}
                isRealBirthday={countdown.isBirthday}
                enableTestMode={ENABLE_BIRTHDAY_SURPRISE_TEST_MODE}
                isTestUnlocked={isBirthdayTestUnlocked}
                onToggleTestUnlock={() => setIsBirthdayTestUnlocked((prev) => !prev)}
                onOpenSurprise={handleStartOpenBirthdaySurprise}
                isOpening={isTransitioningToOverlay}
              />
            </div>
          </main>

          {/* Quiet, Personal Footer */}
          <footer
            className={`relative z-10 pb-6 text-center text-xs text-[#A07A80] font-sans tracking-wide transition-opacity duration-1000 ${
              isTransitioningToOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

