import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

export type ActiveTrack = 'music1' | 'music2';

interface AudioContextType {
  activeTrack: ActiveTrack;
  isPlaying: boolean;
  userPaused: boolean;
  autoplayBlocked: boolean;
  isLetterOpen: boolean;
  music1Ready: boolean;
  music2Ready: boolean;
  togglePlay: () => Promise<void>;
  startMusicOnInteraction: () => Promise<void>;
  openLetterMusic: () => Promise<void>;
  closeLetterMusic: () => Promise<void>;
  trackName: string;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const MUSIC1_SRC = '/assets/aistudio/music1_e4c2ec43.mp3';
export const MUSIC2_SRC = '/assets/aistudio/music2_be725d27.mp3';

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const music1Ref = useRef<HTMLAudioElement | null>(null);
  const music2Ref = useRef<HTMLAudioElement | null>(null);

  const [activeTrack, setActiveTrack] = useState<ActiveTrack>('music1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [music1Ready, setMusic1Ready] = useState(false);
  const [music2Ready, setMusic2Ready] = useState(false);

  // Initialize and preload both audio files early on mount
  useEffect(() => {
    const m1 = music1Ref.current;
    const m2 = music2Ref.current;

    if (!m1 || !m2) return;

    // Preload both audio resources immediately
    m1.load();
    m2.load();

    const handleM1CanPlay = () => setMusic1Ready(true);
    const handleM2CanPlay = () => setMusic2Ready(true);

    const handleM1Play = () => {
      if (activeTrack === 'music1') setIsPlaying(true);
      setAutoplayBlocked(false);
    };
    const handleM1Pause = () => {
      if (activeTrack === 'music1') setIsPlaying(false);
    };

    const handleM2Play = () => {
      if (activeTrack === 'music2') setIsPlaying(true);
    };
    const handleM2Pause = () => {
      if (activeTrack === 'music2') setIsPlaying(false);
    };

    m1.addEventListener('canplay', handleM1CanPlay);
    m2.addEventListener('canplay', handleM2CanPlay);
    m1.addEventListener('play', handleM1Play);
    m1.addEventListener('pause', handleM1Pause);
    m2.addEventListener('play', handleM2Play);
    m2.addEventListener('pause', handleM2Pause);

    // Audio is loaded but kept paused until user enters and interacts
    setIsPlaying(false);
    setAutoplayBlocked(true);


    return () => {
      m1.removeEventListener('canplay', handleM1CanPlay);
      m2.removeEventListener('canplay', handleM2CanPlay);
      m1.removeEventListener('play', handleM1Play);
      m1.removeEventListener('pause', handleM1Pause);
      m2.removeEventListener('play', handleM2Play);
      m2.removeEventListener('pause', handleM2Pause);
    };
  }, []);

  // Sync isPlaying state whenever activeTrack changes
  useEffect(() => {
    const currentAudio = activeTrack === 'music1' ? music1Ref.current : music2Ref.current;
    if (currentAudio) {
      setIsPlaying(!currentAudio.paused);
    }
  }, [activeTrack]);

  // Start music1 on any user interaction if not already playing and user hasn't explicitly paused
  const startMusicOnInteraction = useCallback(async () => {
    const m1 = music1Ref.current;
    if (!m1 || isLetterOpen || userPaused) return;

    if (m1.paused) {
      try {
        await m1.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn('Playback error on interaction:', err);
      }
    }
  }, [isLetterOpen, userPaused]);

  // Toggle play/pause for currently active track
  const togglePlay = useCallback(async () => {
    const currentAudio = activeTrack === 'music1' ? music1Ref.current : music2Ref.current;
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
      setUserPaused(true);
    } else {
      try {
        await currentAudio.play();
        setIsPlaying(true);
        setUserPaused(false);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn('Playback resume failed:', err);
        setIsPlaying(false);
      }
    }
  }, [activeTrack, isPlaying]);

  // Switch to Music 2 when opening love letter
  const openLetterMusic = useCallback(async () => {
    setIsLetterOpen(true);
    setActiveTrack('music2');

    const m1 = music1Ref.current;
    const m2 = music2Ref.current;

    // 1. Pause music1 immediately, preserving its currentTime
    if (m1 && !m1.paused) {
      m1.pause();
    }

    // 2. Start music2 using the letter opening click as user gesture
    if (m2) {
      try {
        // If user had not paused, play music2
        if (!userPaused) {
          await m2.play();
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      } catch (err) {
        console.warn('Music 2 play failed:', err);
        setIsPlaying(false);
      }
    }
  }, [userPaused]);

  // Switch back to Music 1 when closing love letter
  const closeLetterMusic = useCallback(async () => {
    setIsLetterOpen(false);
    setActiveTrack('music1');

    const m1 = music1Ref.current;
    const m2 = music2Ref.current;

    // 1. Pause music2
    if (m2 && !m2.paused) {
      m2.pause();
    }

    // 2. Resume music1 from its previous position if not explicitly paused by user
    if (m1 && !userPaused) {
      try {
        await m1.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Music 1 resume failed:', err);
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  }, [userPaused]);

  const trackName = activeTrack === 'music1' ? 'Our Theme ♡' : 'Letter Song 💌';

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        userPaused,
        autoplayBlocked,
        isLetterOpen,
        music1Ready,
        music2Ready,
        togglePlay,
        startMusicOnInteraction,
        openLetterMusic,
        closeLetterMusic,
        trackName,
      }}
    >
      {/* Two persistent, preloaded audio instances */}
      <audio
        ref={music1Ref}
        src={MUSIC1_SRC}
        loop
        preload="auto"
        className="hidden"
      />
      <audio
        ref={music2Ref}
        src={MUSIC2_SRC}
        loop
        preload="auto"
        className="hidden"
      />

      {children}
    </AudioContext.Provider>
  );
};

export const useDualAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useDualAudio must be used within an AudioProvider');
  }
  return context;
};
