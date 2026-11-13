import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

export type ActiveTrack = 'music1' | 'music2' | 'promise';

interface AudioContextType {
  activeTrack: ActiveTrack;
  isPlaying: boolean;
  userPaused: boolean;
  autoplayBlocked: boolean;
  isLetterOpen: boolean;
  isPromiseMode: boolean;
  music1Ready: boolean;
  music2Ready: boolean;
  promiseReady: boolean;
  togglePlay: () => Promise<void>;
  startMusicOnInteraction: () => Promise<void>;
  openLetterMusic: () => Promise<void>;
  closeLetterMusic: () => Promise<void>;
  enterSaatAhadAudio: () => void;
  startPromiseMusic: () => Promise<void>;
  exitSaatAhadAudio: () => Promise<void>;
  trackName: string;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const MUSIC1_SRC = '/assets/aistudio/music1_e4c2ec43.mp3';
export const MUSIC1_FALLBACK = '/assets/music1.mp3';
export const MUSIC2_SRC = '/assets/aistudio/music2_be725d27.mp3';
export const MUSIC2_FALLBACK = '/assets/music2.mp3';
export const PROMISE_AUDIO_SRC = '/assets/aistudio/Promise_Audio_df194155.mp3';
export const PROMISE_AUDIO_FALLBACK = '/assets/Promise%20Audio.mp3';

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const music1Ref = useRef<HTMLAudioElement | null>(null);
  const music2Ref = useRef<HTMLAudioElement | null>(null);
  const promiseAudioRef = useRef<HTMLAudioElement | null>(null);

  const [activeTrack, setActiveTrack] = useState<ActiveTrack>('music1');
  const activeTrackRef = useRef<ActiveTrack>('music1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [promiseUserPaused, setPromiseUserPaused] = useState(false);
  const promiseUserPausedRef = useRef(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPromiseMode, setIsPromiseMode] = useState(false);
  const [music1Ready, setMusic1Ready] = useState(false);
  const [music2Ready, setMusic2Ready] = useState(false);
  const [promiseReady, setPromiseReady] = useState(false);

  const updateActiveTrack = useCallback((track: ActiveTrack) => {
    activeTrackRef.current = track;
    setActiveTrack(track);
  }, []);

  // Initialize and preload audio files early on mount (strictly paused until interaction)
  useEffect(() => {
    const m1 = music1Ref.current;
    const m2 = music2Ref.current;
    const pa = promiseAudioRef.current;

    if (!m1 || !m2 || !pa) return;

    // Preload audio resources cleanly without playing
    m1.load();
    m2.load();
    pa.load();

    const handleM1CanPlay = () => setMusic1Ready(true);
    const handleM2CanPlay = () => setMusic2Ready(true);
    const handlePromiseCanPlay = () => setPromiseReady(true);

    const handleM1Play = () => {
      if (activeTrackRef.current === 'music1') setIsPlaying(true);
      setAutoplayBlocked(false);
    };
    const handleM1Pause = () => {
      if (activeTrackRef.current === 'music1') setIsPlaying(false);
    };

    const handleM2Play = () => {
      if (activeTrackRef.current === 'music2') setIsPlaying(true);
    };
    const handleM2Pause = () => {
      if (activeTrackRef.current === 'music2') setIsPlaying(false);
    };

    const handlePromisePlay = () => {
      if (activeTrackRef.current === 'promise') setIsPlaying(true);
    };
    const handlePromisePause = () => {
      if (activeTrackRef.current === 'promise') setIsPlaying(false);
    };

    // Resilient fallbacks if primary paths are unavailable
    const handleM1Error = () => {
      if (m1 && !m1.src.endsWith(MUSIC1_FALLBACK)) {
        m1.src = MUSIC1_FALLBACK;
        m1.load();
      }
    };
    const handleM2Error = () => {
      if (m2 && !m2.src.endsWith(MUSIC2_FALLBACK)) {
        m2.src = MUSIC2_FALLBACK;
        m2.load();
      }
    };
    const handlePromiseError = () => {
      if (pa && !pa.src.endsWith(PROMISE_AUDIO_FALLBACK) && !pa.src.endsWith('/assets/Promise Audio.mp3')) {
        pa.src = PROMISE_AUDIO_FALLBACK;
        pa.load();
      } else {
        setPromiseReady(false);
      }
    };

    m1.addEventListener('canplay', handleM1CanPlay);
    m2.addEventListener('canplay', handleM2CanPlay);
    pa.addEventListener('canplay', handlePromiseCanPlay);
    m1.addEventListener('play', handleM1Play);
    m1.addEventListener('pause', handleM1Pause);
    m2.addEventListener('play', handleM2Play);
    m2.addEventListener('pause', handleM2Pause);
    pa.addEventListener('play', handlePromisePlay);
    pa.addEventListener('pause', handlePromisePause);
    m1.addEventListener('error', handleM1Error);
    m2.addEventListener('error', handleM2Error);
    pa.addEventListener('error', handlePromiseError);

    // Audio is loaded but kept paused until user enters and interacts
    setIsPlaying(false);
    setAutoplayBlocked(true);

    return () => {
      m1.removeEventListener('canplay', handleM1CanPlay);
      m2.removeEventListener('canplay', handleM2CanPlay);
      pa.removeEventListener('canplay', handlePromiseCanPlay);
      m1.removeEventListener('play', handleM1Play);
      m1.removeEventListener('pause', handleM1Pause);
      m2.removeEventListener('play', handleM2Play);
      m2.removeEventListener('pause', handleM2Pause);
      pa.removeEventListener('play', handlePromisePlay);
      pa.removeEventListener('pause', handlePromisePause);
      m1.removeEventListener('error', handleM1Error);
      m2.removeEventListener('error', handleM2Error);
      pa.removeEventListener('error', handlePromiseError);
      m1.pause();
      m2.pause();
      pa.pause();
    };
  }, []);

  // Sync isPlaying state whenever activeTrack changes
  useEffect(() => {
    const currentAudio =
      activeTrack === 'music1'
        ? music1Ref.current
        : activeTrack === 'music2'
        ? music2Ref.current
        : promiseAudioRef.current;
    if (currentAudio) {
      setIsPlaying(!currentAudio.paused);
    }
  }, [activeTrack]);

  // Start music1 on any user interaction if not already playing and not in letter/promise mode
  const startMusicOnInteraction = useCallback(async () => {
    const m1 = music1Ref.current;
    if (!m1 || isLetterOpen || isPromiseMode || userPaused) return;

    if (m1.paused) {
      try {
        await m1.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn('Playback error on interaction:', err);
      }
    }
  }, [isLetterOpen, isPromiseMode, userPaused]);

  // Toggle play/pause for currently active track
  const togglePlay = useCallback(async () => {
    const m1 = music1Ref.current;
    const m2 = music2Ref.current;
    const pa = promiseAudioRef.current;

    const currentAudio =
      activeTrack === 'music1' ? m1 : activeTrack === 'music2' ? m2 : pa;
    if (!currentAudio) return;

    if (!currentAudio.paused) {
      currentAudio.pause();
      setIsPlaying(false);
      if (activeTrack === 'promise') {
        promiseUserPausedRef.current = true;
        setPromiseUserPaused(true);
      } else {
        setUserPaused(true);
      }
    } else {
      // Guarantee no track overlap before playing
      if (activeTrack === 'promise') {
        if (m1 && !m1.paused) m1.pause();
        if (m2 && !m2.paused) m2.pause();
      } else {
        if (pa && !pa.paused) pa.pause();
      }

      try {
        await currentAudio.play();
        setIsPlaying(true);
        if (activeTrack === 'promise') {
          promiseUserPausedRef.current = false;
          setPromiseUserPaused(false);
        } else {
          setUserPaused(false);
          setAutoplayBlocked(false);
        }
      } catch (err) {
        console.warn('Playback resume failed:', err);
        setIsPlaying(false);
      }
    }
  }, [activeTrack]);

  // Switch to Music 2 when opening daily love letter
  const openLetterMusic = useCallback(async () => {
    setIsLetterOpen(true);
    setIsPromiseMode(false);
    updateActiveTrack('music2');

    const m1 = music1Ref.current;
    const m2 = music2Ref.current;
    const pa = promiseAudioRef.current;

    if (m1 && !m1.paused) m1.pause();
    if (pa && !pa.paused) pa.pause();

    if (m2) {
      try {
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
  }, [userPaused, updateActiveTrack]);

  // Switch back to Music 1 when closing daily love letter
  const closeLetterMusic = useCallback(async () => {
    setIsLetterOpen(false);
    updateActiveTrack('music1');

    const m1 = music1Ref.current;
    const m2 = music2Ref.current;

    if (m2 && !m2.paused) {
      m2.pause();
    }

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
  }, [userPaused, updateActiveTrack]);

  // Enter Saat Ahad mode: silence music1/music2 immediately, keep Promise Audio paused until intro interaction
  const enterSaatAhadAudio = useCallback(() => {
    const m1 = music1Ref.current;
    const m2 = music2Ref.current;
    const pa = promiseAudioRef.current;

    if (m1 && !m1.paused) m1.pause();
    if (m2 && !m2.paused) m2.pause();
    if (pa) {
      pa.pause();
      try {
        pa.currentTime = 0;
      } catch {
        // ignore seek errors if media isn't loaded yet
      }
    }

    promiseUserPausedRef.current = false;
    setPromiseUserPaused(false);
    setIsLetterOpen(false);
    setIsPromiseMode(true);
    updateActiveTrack('promise');
    setIsPlaying(false);
  }, [updateActiveTrack]);

  // Start Promise Audio smoothly upon interaction inside Saat Ahad (never restarts if already playing)
  const startPromiseMusic = useCallback(async () => {
    const m1 = music1Ref.current;
    const m2 = music2Ref.current;
    const pa = promiseAudioRef.current;

    if (m1 && !m1.paused) m1.pause();
    if (m2 && !m2.paused) m2.pause();

    if (!pa || promiseUserPausedRef.current) return;

    // Keep playing continuously without restarting if already active
    if (!pa.paused) {
      setIsPlaying(true);
      return;
    }

    try {
      await pa.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Promise audio playback blocked or unavailable:', err);
      setIsPlaying(false);
    }
  }, []);

  // Exit Saat Ahad mode: stop & reset Promise Audio, then restore music1 if not userPaused
  const exitSaatAhadAudio = useCallback(async () => {
    const m1 = music1Ref.current;
    const pa = promiseAudioRef.current;

    if (pa) {
      pa.pause();
      try {
        pa.currentTime = 0;
      } catch {
        // ignore seek errors if media isn't loaded yet
      }
    }

    promiseUserPausedRef.current = false;
    setPromiseUserPaused(false);
    setIsPromiseMode(false);
    updateActiveTrack('music1');

    if (m1 && !userPaused) {
      try {
        await m1.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Music 1 resume failed after Saat Ahad:', err);
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  }, [userPaused, updateActiveTrack]);

  const trackName =
    activeTrack === 'music1'
      ? 'Our Theme ♡'
      : activeTrack === 'music2'
      ? 'Letter Song 💌'
      : 'Saat Ahad ♡';

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        userPaused: isPromiseMode ? promiseUserPaused : userPaused,
        autoplayBlocked,
        isLetterOpen,
        isPromiseMode,
        music1Ready,
        music2Ready,
        promiseReady,
        togglePlay,
        startMusicOnInteraction,
        openLetterMusic,
        closeLetterMusic,
        enterSaatAhadAudio,
        startPromiseMusic,
        exitSaatAhadAudio,
        trackName,
      }}
    >
      {/* Persistent, preloaded audio instances with automatic fallbacks */}
      <audio
        ref={music1Ref}
        src={MUSIC1_SRC}
        loop
        preload="auto"
        className="hidden"
      >
        <source src={MUSIC1_SRC} type="audio/mpeg" />
        <source src={MUSIC1_FALLBACK} type="audio/mpeg" />
      </audio>
      <audio
        ref={music2Ref}
        src={MUSIC2_SRC}
        loop
        preload="auto"
        className="hidden"
      >
        <source src={MUSIC2_SRC} type="audio/mpeg" />
        <source src={MUSIC2_FALLBACK} type="audio/mpeg" />
      </audio>
      <audio
        ref={promiseAudioRef}
        src={PROMISE_AUDIO_SRC}
        loop
        preload="metadata"
        className="hidden"
      >
        <source src={PROMISE_AUDIO_SRC} type="audio/mpeg" />
        <source src={PROMISE_AUDIO_FALLBACK} type="audio/mpeg" />
      </audio>

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
