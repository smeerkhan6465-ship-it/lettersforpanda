import React, { useState, useEffect } from 'react';
import { useDualAudio } from '../context/AudioContext';
import { AudioPlayer } from './AudioPlayer';
import { AnimatedText } from './AnimatedText';

interface DailyCareCheckProps {
  onComplete: () => void;
}

type CareStep =
  | 'INTRO'
  | 'BREAKFAST_QUESTION'
  | 'BREAKFAST_CONFIRM_YES'
  | 'BREAKFAST_NO_REMINDER'
  | 'BREAKFAST_PROMISE'
  | 'BREAKFAST_STILL_NO'
  | 'MEDICINE_QUESTION'
  | 'MEDICINE_CONFIRM_YES'
  | 'MEDICINE_NO_REMINDER'
  | 'MEDICINE_PROMISE'
  | 'MEDICINE_STILL_NO'
  | 'CARE_COMPLETE';

export const DailyCareCheck: React.FC<DailyCareCheckProps> = ({ onComplete }) => {
  const [step, setStep] = useState<CareStep>('INTRO');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [introReadyToTap, setIntroReadyToTap] = useState(false);
  const { startMusicOnInteraction } = useDualAudio();

  // Ensure 'Tap to continue' hint reveals after the greeting text finishes
  useEffect(() => {
    if (step === 'INTRO') {
      const timer = setTimeout(() => {
        setIntroReadyToTap(true);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Smooth transition between steps with subtle fade
  const transitionTo = (nextStep: CareStep) => {
    startMusicOnInteraction();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, 280);
  };

  // One-tap interaction to dismiss greeting and transition to breakfast question
  const handleIntroTap = () => {
    if (isTransitioning) return;
    startMusicOnInteraction();
    transitionTo('BREAKFAST_QUESTION');
  };

  const handleFinalUnlock = () => {
    startMusicOnInteraction();
    if (isTransitioning) return;
    setIsTransitioning(true);
    onComplete();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Soft Blush-Pink and Pale-Lavender Ambient Gradient */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(255, 240, 245, 0.95) 0%, rgba(250, 240, 255, 0.8) 55%, rgba(255, 245, 247, 0.9) 100%)',
        }}
      />

      {/* Subtle, diffused ambient glow behind main content */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-rose-200/20 blur-[90px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Sparse, small, slow-drifting glowing dust motes */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <span
          className="absolute top-[18%] left-[15%] w-1.5 h-1.5 rounded-full bg-rose-300/40 blur-[0.5px] animate-mote"
          style={{ animationDuration: '9s' }}
        />
        <span
          className="absolute top-[32%] right-[18%] w-1 h-1 rounded-full bg-purple-300/35 blur-[0.5px] animate-mote"
          style={{ animationDuration: '11s', animationDelay: '2s' }}
        />
        <span
          className="absolute top-[68%] left-[22%] w-1.5 h-1.5 rounded-full bg-pink-300/30 blur-[0.5px] animate-mote"
          style={{ animationDuration: '10s', animationDelay: '4s' }}
        />
        <span
          className="absolute bottom-[20%] right-[24%] w-1 h-1 rounded-full bg-rose-200/40 blur-[0.5px] animate-mote"
          style={{ animationDuration: '12s', animationDelay: '1s' }}
        />
        <span
          className="absolute top-[50%] left-[8%] w-1 h-1 rounded-full bg-purple-200/30 blur-[0.5px] animate-mote"
          style={{ animationDuration: '14s', animationDelay: '3s' }}
        />
      </div>

      {/* Discreet Audio Control at bottom-right (Only shown after "Hi My Lady" opening moment) */}
      {step !== 'INTRO' && <AudioPlayer />}

      {/* =========================================================================
          SECTION 1: THE "HI MY LADY" INTRO MOMENT (TAP TO CONTINUE)
         ========================================================================= */}
      {step === 'INTRO' && (
        <div
          onClick={handleIntroTap}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleIntroTap();
            }
          }}
          aria-label="Tap to continue to questions"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-opacity duration-500 ${
            isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <AnimatedText
            text="Hi My Lady"
            speed={85}
            delay={200}
            as="h1"
            className="font-serif-elegant font-light text-4xl sm:text-5xl md:text-6xl text-slate-800/90 tracking-wide"
            onComplete={() => setIntroReadyToTap(true)}
          />

          {/* Subtle hint that appears only after text has finished appearing */}
          <div
            className={`mt-6 transition-all duration-700 ${
              introReadyToTap ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
            }`}
          >
            <p className="text-xs sm:text-sm font-sans font-light tracking-widest text-pink-700/60 animate-pulse">
              Tap to continue ♡
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2 & 3: MINIMAL GLASSMORPHIC CARE CHECK QUESTIONS
         ========================================================================= */}
      {step !== 'INTRO' && (
        <div
          className={`relative z-10 w-full max-w-md mx-auto transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {/* One restrained, translucent glass panel */}
          <div
            key={step}
            className="bg-white/55 backdrop-blur-md border border-white/80 rounded-3xl p-7 sm:p-10 shadow-lg shadow-pink-900/[0.04] text-center transition-all duration-300"
          >
            {/* -----------------------------------------------------------------
                QUESTION 1: BREAKFAST
               ----------------------------------------------------------------- */}
            {step === 'BREAKFAST_QUESTION' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <AnimatedText
                    text="My bacchu, aaj ka message dekhne se pehle…"
                    speed={28}
                    delay={80}
                    as="p"
                    className="text-xs sm:text-sm font-sans text-pink-700/75 tracking-wider"
                  />
                  <div className="pt-1">
                    <AnimatedText
                      text="Breakfast kiya aapne, My Lady? ♡"
                      speed={35}
                      delay={200}
                      as="h2"
                      className="font-serif-elegant font-normal text-2xl sm:text-3xl text-slate-800 tracking-wide"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_CONFIRM_YES')}
                    className="py-3 px-4 rounded-2xl bg-white/70 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 shadow-xs text-slate-800 text-sm font-medium transition-all duration-200 min-h-[46px]"
                  >
                    Haan 💗
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_NO_REMINDER')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 shadow-xs text-slate-700 text-sm font-medium transition-all duration-200 min-h-[46px]"
                  >
                    Nahi 🙈
                  </button>
                </div>
              </div>
            )}

            {/* BREAKFAST: CONFIRM YES */}
            {step === 'BREAKFAST_CONFIRM_YES' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <AnimatedText
                    text="“Achhaaa, meri shaitaan bacchu! 🥹❤️ Good girl! Apna khayal rakhti ho toh mujhe bhi sukoon milta hai. Aise hi apna dhyaan rakha karo, meri Panda. Proud of you, meri jaan! 🐼💗”"
                    speed={20}
                    delay={60}
                    as="p"
                    className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                  />
                  <div className="pt-2">
                    <AnimatedText
                      text="Sach mein kar liya hai na, meri shaitaan bacchu? 👀💕"
                      speed={30}
                      delay={150}
                      as="h3"
                      className="font-serif-elegant font-normal text-xl sm:text-2xl text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_QUESTION')}
                    className="py-3 px-4 rounded-2xl bg-white/75 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 text-slate-800 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Haan baba, sach mein! 😂
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_NO_REMINDER')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 text-slate-600 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Achha nahi kiya tha 🙈
                  </button>
                </div>
              </div>
            )}

            {/* BREAKFAST: NO REMINDER */}
            {step === 'BREAKFAST_NO_REMINDER' && (
              <div className="space-y-6">
                <AnimatedText
                  text="“BACCHUUU! 😭😂 Meri Panda, aise kaise chalega? Pehle jao kuch kha lo, phir aapka pyaara sa message milega. Main yahin hoon, bhaag nahi raha. 🙈💗”"
                  speed={22}
                  delay={60}
                  as="p"
                  className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_PROMISE')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white active:scale-[0.98] border border-pink-200/70 text-slate-800 text-sm font-medium transition-all shadow-xs min-h-[46px]"
                  >
                    Achha baba, abhi khaane jaati hoon 🍓
                  </button>
                </div>
              </div>
            )}

            {/* BREAKFAST: PROMISE */}
            {step === 'BREAKFAST_PROMISE' && (
              <div className="space-y-6">
                <AnimatedText
                  text="Pakka? Kha logi na, meri jaan? 🥹"
                  speed={35}
                  delay={80}
                  as="h3"
                  className="font-serif-elegant font-normal text-2xl text-slate-800"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_QUESTION')}
                    className="py-3 px-4 rounded-2xl bg-white/75 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 text-slate-800 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Haan, abhi khaane ja rahi hoon 💗
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_STILL_NO')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 text-slate-600 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Abhi nahi 🙈
                  </button>
                </div>
              </div>
            )}

            {/* BREAKFAST: STILL NO */}
            {step === 'BREAKFAST_STILL_NO' && (
              <div className="space-y-6">
                <AnimatedText
                  text="Main yahin wait kar raha hoon bacchu... pehle thoda sa kuch kha lo na! 🍓🐼"
                  speed={25}
                  delay={60}
                  as="p"
                  className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('BREAKFAST_PROMISE')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white active:scale-[0.98] border border-pink-200/70 text-slate-800 text-sm font-medium transition-all shadow-xs min-h-[46px]"
                  >
                    Achha baba, abhi jaati hoon khaane 🍓
                  </button>
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------------
                QUESTION 2: MEDICINE
               ----------------------------------------------------------------- */}
            {step === 'MEDICINE_QUESTION' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <AnimatedText
                    text="Ab ek aur baat batao, meri jaan…"
                    speed={28}
                    delay={80}
                    as="p"
                    className="text-xs sm:text-sm font-sans text-pink-700/75 tracking-wider"
                  />
                  <div className="pt-1">
                    <AnimatedText
                      text="Aaj ki dawai li aapne, My Panda? ♡"
                      speed={35}
                      delay={200}
                      as="h2"
                      className="font-serif-elegant font-normal text-2xl sm:text-3xl text-slate-800 tracking-wide"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_CONFIRM_YES')}
                    className="py-3 px-4 rounded-2xl bg-white/70 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 shadow-xs text-slate-800 text-sm font-medium transition-all duration-200 min-h-[46px]"
                  >
                    Haan 💗
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_NO_REMINDER')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 shadow-xs text-slate-700 text-sm font-medium transition-all duration-200 min-h-[46px]"
                  >
                    Nahi 🙈
                  </button>
                </div>
              </div>
            )}

            {/* MEDICINE: CONFIRM YES */}
            {step === 'MEDICINE_CONFIRM_YES' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <AnimatedText
                    text="“Shabaash meri bacchu! 🥹❤️ Apna khayal rakhti ho toh mujhe bahut achha lagta hai. Meri pyaari si Panda, tumhari sehat aur sukoon mere liye important hain. Aise hi apna dhyaan rakha karo, meri jaan. 💗”"
                    speed={20}
                    delay={60}
                    as="p"
                    className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                  />
                  <div className="pt-2">
                    <AnimatedText
                      text="Lekin sach sach batao… dawai le li hai na, shaitaan bacchu? 👀😂"
                      speed={30}
                      delay={150}
                      as="h3"
                      className="font-serif-elegant font-normal text-xl sm:text-2xl text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('CARE_COMPLETE')}
                    className="py-3 px-4 rounded-2xl bg-white/75 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 text-slate-800 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Haan baba, sach mein le li! 💗
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_NO_REMINDER')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 text-slate-600 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Nahi, abhi nahi li 🙈
                  </button>
                </div>
              </div>
            )}

            {/* MEDICINE: NO REMINDER */}
            {step === 'MEDICINE_NO_REMINDER' && (
              <div className="space-y-6">
                <AnimatedText
                  text="“Areyyy meri shaitaan bacchu! 😭🙈 Agar aaj aapki dawai leni thi, toh apne prescribed schedule ke mutabik le lena, meri jaan. Pehle apna khayal, phir mera pyaara sa message! Main yahin intezaar kar raha hoon. 🐼💗”"
                  speed={22}
                  delay={60}
                  as="p"
                  className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_PROMISE')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white active:scale-[0.98] border border-pink-200/70 text-slate-800 text-sm font-medium transition-all shadow-xs min-h-[46px]"
                  >
                    Achha baba, le li / ab le lungi 💗
                  </button>
                </div>
              </div>
            )}

            {/* MEDICINE: PROMISE */}
            {step === 'MEDICINE_PROMISE' && (
              <div className="space-y-6">
                <AnimatedText
                  text="Pakka meri jaan? 🥹"
                  speed={35}
                  delay={80}
                  as="h3"
                  className="font-serif-elegant font-normal text-2xl text-slate-800"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('CARE_COMPLETE')}
                    className="py-3 px-4 rounded-2xl bg-white/75 hover:bg-white/95 active:scale-[0.98] border border-pink-200/60 text-slate-800 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Haan, le li / ab le lungi 💗
                  </button>
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_STILL_NO')}
                    className="py-3 px-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 active:scale-[0.98] border border-pink-200/50 text-slate-600 text-xs sm:text-sm font-medium transition-all min-h-[46px]"
                  >
                    Abhi nahi 🙈
                  </button>
                </div>
              </div>
            )}

            {/* MEDICINE: STILL NO */}
            {step === 'MEDICINE_STILL_NO' && (
              <div className="space-y-6">
                <AnimatedText
                  text="Dawai waqt par lena bahut zaroori hai meri jaan. Apna khayal rakhna meri sabse badi khwahish hai. 💊🐼"
                  speed={25}
                  delay={60}
                  as="p"
                  className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal"
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => transitionTo('MEDICINE_PROMISE')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white active:scale-[0.98] border border-pink-200/70 text-slate-800 text-sm font-medium transition-all shadow-xs min-h-[46px]"
                  >
                    Achha abhi leti hoon 💗
                  </button>
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------------
                CARE COMPLETE: TRANSITION SCREEN
               ----------------------------------------------------------------- */}
            {step === 'CARE_COMPLETE' && (
              <div className="space-y-6">
                <AnimatedText
                  text="“Duniya se chhupakar nahi, bas tumhare liye sambhaal kar rakhe hain kuch alfaaz… ♡”"
                  speed={24}
                  delay={80}
                  as="h2"
                  className="font-serif-elegant font-normal text-xl sm:text-2xl text-slate-800 leading-relaxed"
                />

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleFinalUnlock}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/85 hover:bg-white active:scale-[0.98] border border-pink-200/80 text-rose-800 font-medium text-sm sm:text-base transition-all shadow-sm shadow-pink-200/40 min-h-[48px]"
                  >
                    Enter our little world ♡
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
