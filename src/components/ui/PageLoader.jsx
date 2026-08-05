import React, { useState, useEffect } from 'react';
import KvantumLogo from './KvantumLogo';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col justify-between p-6 sm:p-10 select-none transition-opacity duration-500 overflow-hidden font-sans text-left">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header Skeleton Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 relative z-10">
        <KvantumLogo className="h-10 sm:h-12" theme="dark" />
        <div className="hidden sm:flex items-center gap-4 animate-pulse">
          <div className="h-4 w-20 bg-white/10 rounded-full" />
          <div className="h-4 w-20 bg-white/10 rounded-full" />
          <div className="h-4 w-20 bg-white/10 rounded-full" />
          <div className="h-8 w-28 bg-sky-500/20 rounded-xl" />
        </div>
      </div>

      {/* Hero Section Skeleton Layout */}
      <div className="max-w-4xl mx-auto w-full space-y-6 my-auto relative z-10 animate-pulse">
        <div className="h-6 w-48 bg-sky-500/20 rounded-full border border-sky-500/30" />
        <div className="h-12 sm:h-16 w-full bg-white/10 rounded-2xl" />
        <div className="h-12 sm:h-16 w-4/5 bg-white/10 rounded-2xl" />
        <div className="h-6 w-2/3 bg-white/5 rounded-xl pt-2" />
        
        {/* Shimmer Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-12 w-44 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-xl" />
          <div className="h-12 w-36 bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Bottom Skeleton Card Grid & Progress Tracker */}
      <div className="space-y-6 relative z-10 max-w-6xl mx-auto w-full">
        {/* Bottom Shimmer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-pulse hidden md:grid">
          <div className="h-28 bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-6 w-32 bg-white/20 rounded" />
          </div>
          <div className="h-28 bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-6 w-32 bg-white/20 rounded" />
          </div>
          <div className="h-28 bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-6 w-32 bg-white/20 rounded" />
          </div>
        </div>

        {/* Dynamic Progress Line */}
        <div className="flex flex-col gap-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-pink-500 to-cyan-400 transition-all duration-150 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 font-bold">
            <span className="text-cyan-400 uppercase tracking-widest">Initialising Architecture...</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
