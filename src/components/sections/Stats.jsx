import React from 'react';
import Badge from '../ui/Badge';
import { Award, Zap, Smile, Headphones } from 'lucide-react';

const defaultStats = [
  { value: '50+', label: 'PROJECTS DELIVERED' },
  { value: '20+', label: 'AUTOMATIONS LIVE' },
  { value: '95%', label: 'CLIENT SATISFACTION' },
  { value: '24/7', label: 'SUPPORT AVAILABLE' },
];

export default function Stats({ settings }) {
  const displayStats = settings?.stats && settings.stats.length >= 3 ? settings.stats : defaultStats;

  return (
    <section className="bg-slate-50 dark:bg-zinc-950/80 border-y border-slate-200 dark:border-white/8 py-20 select-none text-center relative z-10">
      <div className="container mx-auto max-w-[1280px] px-6">
        
        <div className="text-center mb-12">
          <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Award size={14} /> Proven Track Record
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight">
            Key Performance Metrics
          </h2>
        </div>

        {/* Huge Typography Minimal Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {displayStats.map((st, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black font-headline tracking-tight text-slate-900 dark:text-white leading-none">
                {st.value}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mt-1">
                {st.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
