'use client';

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mr-2 mt-1 shadow-lg shadow-cyan-500/30">
        K
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-800/90 border border-slate-700/60 shadow-md">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
