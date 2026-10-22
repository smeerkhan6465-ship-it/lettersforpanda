import React from 'react';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative z-20 w-full pt-6 sm:pt-8 pb-2 px-4 max-w-4xl mx-auto flex items-center justify-center select-none">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xs border border-white/60 shadow-[0_2px_10px_rgba(58,14,30,0.03)]">
        <span className="text-[#8E2D3B] text-[10px] opacity-75">✦</span>
        <h1 className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-[#3A0E1E] uppercase">
          A Little World, Just For You ♡
        </h1>
        <Heart className="w-3 h-3 text-[#8E2D3B] fill-[#8E2D3B]/20" aria-hidden="true" />
      </div>
    </header>
  );
};
