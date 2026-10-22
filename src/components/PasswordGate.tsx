import React, { useState } from 'react';
import { Heart, Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess || isFadingOut) return;

    const trimmed = password.trim();

    // Check exact secret word
    if (trimmed === 'Panda') {
      setError(null);
      setIsSuccess(true);

      // Begin smooth fade-out transition after brief success indicator
      setTimeout(() => {
        setIsFadingOut(true);
      }, 350);

      // Complete transition after 1.2s fade-out, triggering full entrance to website
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError('Not quite, my love. Try again ♡');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none transition-opacity duration-1200 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 25%, #4D1327 0%, #3A0E1E 55%, #240813 100%)',
      }}
    >
      {/* Soft, diffused blush-pink ambient glow around the center */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-[#E7C7CF]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Very subtle floating particles in the background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span
          className="absolute top-[18%] left-[16%] w-1.5 h-1.5 rounded-full bg-[#E7C7CF]/40 blur-[0.5px] animate-mote"
          style={{ animationDuration: '10s' }}
        />
        <span
          className="absolute top-[38%] right-[20%] w-1 h-1 rounded-full bg-[#E7C7CF]/30 blur-[0.5px] animate-mote"
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <span
          className="absolute bottom-[24%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#8E2D3B]/50 blur-[0.5px] animate-mote"
          style={{ animationDuration: '11s', animationDelay: '4s' }}
        />
      </div>

      {/* Main Glass Panel Card */}
      <div
        className={`relative z-10 w-full max-w-md bg-[#FAF4F6]/5 backdrop-blur-xl border border-[#E7C7CF]/30 rounded-3xl p-7 sm:p-10 shadow-[0_24px_70px_rgba(15,3,8,0.6)] text-center transition-transform duration-500 animate-in fade-in zoom-in-95 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#E7C7CF]/20 pointer-events-none" />

        {/* Delicate Romantic Icon */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8E2D3B]/40 to-[#3A0E1E]/60 border border-[#E7C7CF]/40 flex items-center justify-center mx-auto mb-6 shadow-md shadow-black/20">
          {isSuccess ? (
            <Heart className="w-5 h-5 text-[#FAF4F6] fill-[#FAF4F6]/80 animate-pulse" />
          ) : (
            <Lock className="w-5 h-5 text-[#E7C7CF]" />
          )}
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-serif-elegant font-normal text-2xl sm:text-3xl text-[#FAF4F6] tracking-[0.18em] uppercase">
          ENTER THE DOMAIN
        </h1>
        <p className="font-serif-elegant italic text-[#E7C7CF]/85 text-sm sm:text-base mt-2">
          A little world, meant only for you ♡
        </p>

        {/* Password Entry Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              disabled={isSuccess || isFadingOut}
              placeholder="Enter the secret word…"
              autoComplete="off"
              autoFocus
              className="w-full bg-black/30 border border-[#E7C7CF]/40 focus:border-[#E7C7CF] focus:ring-1 focus:ring-[#E7C7CF] text-[#FAF4F6] placeholder-[#A07A80] rounded-2xl px-5 py-3.5 pr-12 text-center text-sm sm:text-base tracking-widest outline-none transition-all placeholder:tracking-normal placeholder:font-light"
            />
            {password.length > 0 && !isSuccess && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide secret word' : 'Show secret word'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A07A80] hover:text-[#E7C7CF] transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && !isSuccess && (
            <p className="text-xs sm:text-sm font-sans text-[#E7C7CF] animate-in fade-in duration-300">
              {error}
            </p>
          )}

          {/* Success Message */}
          {isSuccess && (
            <p className="text-xs sm:text-sm font-sans text-[#E7C7CF] animate-in fade-in duration-300 font-medium tracking-wide">
              Welcome to our little world ♡
            </p>
          )}

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={isSuccess || isFadingOut || password.trim().length === 0}
            className={`w-full py-3.5 px-6 rounded-2xl text-white font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 ${
              isSuccess
                ? 'bg-[#8E2D3B] opacity-90 cursor-default'
                : password.trim().length === 0
                ? 'bg-[#8E2D3B]/40 opacity-50 cursor-not-allowed border border-[#E7C7CF]/20'
                : 'bg-gradient-to-r from-[#8E2D3B] via-[#731F2C] to-[#8E2D3B] hover:shadow-lg hover:shadow-[#8E2D3B]/35 active:scale-[0.98] border border-[#E7C7CF]/30 cursor-pointer'
            }`}
          >
            <span>{isSuccess ? 'Opening… ♡' : 'Unlock My Little World ♡'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
