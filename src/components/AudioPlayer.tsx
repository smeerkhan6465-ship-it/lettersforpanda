import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useDualAudio } from '../context/AudioContext';

export const AudioPlayer: React.FC = () => {
  const {
    activeTrack,
    isPlaying,
    autoplayBlocked,
    isLetterOpen,
    isPromiseMode,
    isBirthdaySurpriseOpen,
    birthdayAudioUnavailable,
    togglePlay,
    startMusicOnInteraction,
  } = useDualAudio();

  // Do not show a broken audio control if the birthday soundtrack fails to load
  if (isBirthdaySurpriseOpen && birthdayAudioUnavailable) {
    return null;
  }

  const handleControlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPromiseMode || isBirthdaySurpriseOpen) {
      togglePlay();
    } else if (autoplayBlocked && !isPlaying) {
      startMusicOnInteraction();
    } else {
      togglePlay();
    }
  };

  const trackLabel =
    activeTrack === 'music1'
      ? 'background music'
      : activeTrack === 'music2'
      ? 'letter music'
      : activeTrack === 'promise'
      ? 'promise music'
      : 'birthday surprise music';

  const label = isPlaying ? `Pause ${trackLabel}` : `Play ${trackLabel}`;

  const isDarkTheme = isLetterOpen || isPromiseMode || isBirthdaySurpriseOpen;
  const isTopRightDocked = isPromiseMode || isBirthdaySurpriseOpen;

  // Adaptive positioning: top-right in Saat Ahad & Birthday Surprise to keep sticky bottom action bars unobstructed on mobile
  const positionClasses = isTopRightDocked
    ? 'fixed top-3.5 right-4 sm:top-4 sm:right-6'
    : 'fixed bottom-5 right-5 sm:bottom-6 sm:right-6';

  const baseClasses = `${positionClasses} z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-95 group shadow-sm cursor-pointer`;

  const styleClasses = isDarkTheme
    ? isPlaying
      ? 'bg-[#3A0E1E]/85 border border-[#E7C7CF]/60 text-[#E7C7CF] hover:bg-[#4D1327] hover:border-[#E7C7CF] shadow-lg shadow-black/40'
      : 'bg-[#3A0E1E]/60 border border-[#E7C7CF]/30 text-[#A07A80] hover:text-[#E7C7CF] hover:border-[#E7C7CF]/50'
    : isPlaying
    ? 'bg-white/85 border border-[#E7C7CF] text-[#8E2D3B] hover:bg-white hover:border-[#8E2D3B]/40 shadow-[#3A0E1E]/5'
    : 'bg-white/65 border border-[#E7C7CF]/60 text-[#A07A80] hover:text-[#8E2D3B] hover:border-[#E7C7CF]';

  return (
    <button
      type="button"
      onClick={handleControlClick}
      aria-label={label}
      title={label}
      className={`${baseClasses} ${styleClasses}`}
    >
      {isPlaying ? (
        <span className="relative flex items-center justify-center">
          <Volume2 className="w-4 h-4 transition-transform group-hover:scale-105" />
          <span
            className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full animate-ping opacity-75 ${
              isDarkTheme ? 'bg-[#E7C7CF]' : 'bg-[#8E2D3B]'
            }`}
          />
        </span>
      ) : (
        <VolumeX className="w-4 h-4 transition-colors" />
      )}
    </button>
  );
};
