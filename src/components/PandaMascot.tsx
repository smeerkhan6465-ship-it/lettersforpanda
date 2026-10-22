import React from 'react';

export const PandaMascot: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center mt-3 mb-6 select-none">
      {/* Tastefully sized luxury baby panda illustration */}
      <div className="relative group">
        {/* Soft radial glow behind panda */}
        <div
          className="absolute -inset-3 rounded-full blur-xl animate-pulse-glow pointer-events-none opacity-40"
          style={{ backgroundColor: '#E7C7CF' }}
          aria-hidden="true"
        />

        {/* Panda SVG with gentle sway */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 animate-sway-mascot transition-transform duration-300">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(58,14,30,0.08)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Cute baby panda holding a Cranberry Silk heart"
          >
            {/* Background shadow ellipse */}
            <ellipse cx="100" cy="186" rx="46" ry="7" fill="#3A0E1E" fillOpacity="0.06" />

            {/* Left Ear */}
            <circle cx="56" cy="54" r="22" fill="#2d3748" />
            <circle cx="56" cy="54" r="13" fill="#E7C7CF" fillOpacity="0.7" />

            {/* Right Ear */}
            <circle cx="144" cy="54" r="22" fill="#2d3748" />
            <circle cx="144" cy="54" r="13" fill="#E7C7CF" fillOpacity="0.7" />

            {/* Panda Body */}
            <path
              d="M62 135 C62 110, 138 110, 138 135 C138 165, 126 178, 100 178 C74 178, 62 165, 62 135 Z"
              fill="#FFFFFF"
              stroke="#2d3748"
              strokeWidth="3.5"
            />

            {/* Feet / Paws */}
            <ellipse cx="70" cy="172" rx="16" ry="11" fill="#2d3748" />
            <ellipse cx="130" cy="172" rx="16" ry="11" fill="#2d3748" />
            <circle cx="70" cy="172" r="5" fill="#E7C7CF" />
            <circle cx="130" cy="172" r="5" fill="#E7C7CF" />

            {/* Panda Head */}
            <ellipse cx="100" cy="95" rx="55" ry="46" fill="#FFFFFF" stroke="#2d3748" strokeWidth="3.5" />

            {/* Eye Patches */}
            <ellipse
              cx="78"
              cy="92"
              rx="15"
              ry="19"
              transform="rotate(-18 78 92)"
              fill="#2d3748"
            />
            <ellipse
              cx="122"
              cy="92"
              rx="15"
              ry="19"
              transform="rotate(18 122 92)"
              fill="#2d3748"
            />

            {/* Sparkling Eyes */}
            <circle cx="80" cy="92" r="7" fill="#ffffff" />
            <circle cx="81" cy="91" r="5" fill="#1a202c" />
            <circle cx="83" cy="89" r="2.2" fill="#ffffff" />
            <circle cx="79" cy="93" r="1.1" fill="#ffffff" />

            <circle cx="120" cy="92" r="7" fill="#ffffff" />
            <circle cx="119" cy="91" r="5" fill="#1a202c" />
            <circle cx="121" cy="89" r="2.2" fill="#ffffff" />
            <circle cx="117" cy="93" r="1.1" fill="#ffffff" />

            {/* Rosy Cheeks */}
            <ellipse cx="64" cy="110" rx="9" ry="6" fill="#8E2D3B" fillOpacity="0.25" />
            <ellipse cx="136" cy="110" rx="9" ry="6" fill="#8E2D3B" fillOpacity="0.25" />

            {/* Nose */}
            <path
              d="M95 106 C95 103, 105 103, 105 106 C105 109, 101 112, 100 112 C99 112, 95 109, 95 106 Z"
              fill="#2d3748"
            />

            {/* Sweet Smiling Mouth */}
            <path
              d="M94 114 C96 117, 99 117, 100 115 C101 117, 104 117, 106 114"
              stroke="#2d3748"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Cranberry Silk Heart held by Panda */}
            <g className="animate-heartbeat" style={{ transformOrigin: '100px 142px' }}>
              <path
                d="M100,158 C96,154 78,142 78,130 C78,121 85,115 94,115 C98,115 100,118 100,118 C100,118 102,115 106,115 C115,115 122,121 122,130 C122,142 104,154 100,158 Z"
                fill="#8E2D3B"
                filter="drop-shadow(0 4px 8px rgba(142,45,59,0.3))"
              />
              <ellipse cx="90" cy="124" rx="4" ry="2.5" transform="rotate(-30 90 124)" fill="#ffffff" fillOpacity="0.5" />
            </g>

            {/* Front Paws holding the heart */}
            <ellipse cx="78" cy="136" rx="10" ry="8" transform="rotate(20 78 136)" fill="#2d3748" />
            <ellipse cx="122" cy="136" rx="10" ry="8" transform="rotate(-20 122 136)" fill="#2d3748" />
          </svg>
        </div>
      </div>

      {/* Mascot Title and Subtitle */}
      <div className="mt-3.5 space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-serif-elegant font-normal tracking-wide text-[#3A0E1E] flex items-center justify-center gap-2">
          <span>For my Panda</span>
          <span className="text-[#8E2D3B] text-xl">♡</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#A07A80] font-sans font-light tracking-wide">
          A little closer to your special day…
        </p>
      </div>
    </div>
  );
};
