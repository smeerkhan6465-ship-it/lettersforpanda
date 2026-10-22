import React from 'react';

export const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft luxury ambient glow orbs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] opacity-60"
        style={{ backgroundColor: '#E7C7CF' }}
      />
      <div
        className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] max-w-[450px] max-h-[450px] rounded-full blur-[110px] opacity-40"
        style={{ backgroundColor: '#A07A80' }}
      />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] max-w-[550px] max-h-[550px] rounded-full blur-[120px] opacity-50"
        style={{ backgroundColor: '#E7C7CF' }}
      />

      {/* Subtle, tiny luxury motes */}
      <div className="absolute top-[15%] left-[10%] animate-mote opacity-30 text-[#8E2D3B] text-xs">
        ✧
      </div>
      <div className="absolute top-[35%] right-[12%] animate-mote opacity-25 text-[#A07A80] text-sm" style={{ animationDelay: '2s' }}>
        ✦
      </div>
      <div className="absolute top-[60%] left-[8%] animate-mote opacity-20 text-[#8E2D3B] text-xs" style={{ animationDelay: '4s' }}>
        ✧
      </div>
      <div className="absolute top-[80%] right-[15%] animate-mote opacity-25 text-[#A07A80] text-xs" style={{ animationDelay: '1s' }}>
        ✦
      </div>
      <div className="absolute top-[22%] right-[28%] animate-float-gentle opacity-25 text-[#8E2D3B] text-sm">
        ♡
      </div>
      <div className="absolute top-[72%] left-[18%] animate-float-reverse opacity-20 text-[#8E2D3B] text-xs" style={{ animationDelay: '3s' }}>
        ♡
      </div>
    </div>
  );
};
