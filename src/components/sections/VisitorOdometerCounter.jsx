import React, { useState, useEffect } from 'react';
import { Eye, Activity, Sparkles, TrendingUp, Users, MousePointer, ShieldCheck } from 'lucide-react';

export default function VisitorOdometerCounter() {
  const [visitorCount, setVisitorCount] = useState(37258);
  const [todayCount, setTodayCount] = useState(242);
  const [yesterdayCount, setYesterdayCount] = useState(375);
  const [thisWeekCount, setThisWeekCount] = useState(732);
  const [lastWeekCount, setLastWeekCount] = useState(981);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setTodayCount(prev => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const digits = String(visitorCount).padStart(6, '0').split('');

  return (
    <div className="w-full max-w-[1100px] mx-auto my-12 px-6 select-none text-center relative z-10">
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-950/90 border border-slate-200 dark:border-white/15 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col items-center gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Activity size={14} className="animate-pulse" /> Live Visitor Counter & Speedometer
          </div>
          <h3 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 dark:text-zinc-100 mt-1">
            Real-Time Site Analytics & Visitor Engine
          </h3>
        </div>

        {/* Speedometer / Mechanical Odometer Flip Digit Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-50 dark:bg-zinc-900/80 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 w-full max-w-[720px]">
          <span className="text-slate-600 dark:text-zinc-400 font-mono text-sm sm:text-base font-bold tracking-wide">This site has</span>
          
          {/* Mechanical Odometer Digits Box */}
          <div className="flex items-center gap-1.5 sm:gap-2 my-2 sm:my-0">
            {digits.map((digit, index) => (
              <div
                key={index}
                className="w-10 h-14 sm:w-12 sm:h-16 rounded-xl bg-slate-900 text-white dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 border border-slate-700 dark:border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-mono font-extrabold shadow-md relative overflow-hidden group"
              >
                <span className="transition-transform duration-300 transform group-hover:scale-110">
                  {digit}
                </span>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
              </div>
            ))}
          </div>

          <span className="text-slate-600 dark:text-zinc-400 font-mono text-sm sm:text-base font-bold tracking-wide">page visits</span>
        </div>

        {/* Live Visitor Breakdown Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[850px] border-t border-slate-100 dark:border-white/8 pt-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/8 flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-widest block mb-1">Today</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-sky-600 dark:text-sky-400">{todayCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/8 flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-widest block mb-1">Yesterday</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-pink-600 dark:text-pink-400">{yesterdayCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/8 flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-widest block mb-1">This Week</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-purple-600 dark:text-purple-400">{thisWeekCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/8 flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-widest block mb-1">Last Week</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{lastWeekCount}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
