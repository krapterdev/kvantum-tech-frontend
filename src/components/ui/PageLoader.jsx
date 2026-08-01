import React, { useState, useEffect } from 'react';
import KvantumLogo from './KvantumLogo';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Quick, smooth preloader animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020617] flex flex-col items-center justify-center p-6 select-none transition-all duration-500 fade-out">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[250px] bg-gradient-to-r from-blue-600/20 via-pink-500/15 to-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

      {/* Official KVANTUM Logo Banner */}
      <div className="relative z-10 animate-pulse mb-8">
        <KvantumLogo className="h-16 sm:h-24" theme="dark" />
      </div>

      {/* Progress Bar & Counter */}
      <div className="relative z-10 w-full max-w-[280px] flex flex-col items-center gap-3">
        <div className="w-full h-1.5 bg-zinc-900 rounded-full border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-200"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-[11px] font-mono text-zinc-400 font-bold">
          <span className="tracking-widest uppercase text-cyan-400">Loading Experience...</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
}
