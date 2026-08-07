import React, { useState, useEffect, useRef } from 'react';
import Badge from '../ui/Badge';
import { Sparkles, Activity, ShieldCheck, Zap, Award } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericTarget = parseFloat(target);
          if (isNaN(numericTarget)) {
            setCount(target);
            return;
          }
          const isFloat = String(target).includes('.');
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = progress * numericTarget;
            setCount(isFloat ? current.toFixed(1) : Math.floor(current));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{hasAnimated ? (isNaN(parseFloat(target)) ? target : `${count}${suffix}`) : `0${suffix}`}</span>;
}

function parseStat(valStr, defaultNum, defaultSuffix) {
  if (!valStr) return { num: defaultNum, suffix: defaultSuffix, isStatic: false, raw: '' };
  const str = String(valStr).trim();
  if (str === '24/7' || !str.match(/\d/)) {
    return { isStatic: true, raw: str };
  }
  const match = str.match(/^([\d\.]+)(.*)$/);
  if (match) {
    return { isStatic: false, num: parseFloat(match[1]), suffix: match[2] || '', raw: str };
  }
  return { isStatic: true, raw: str };
}

const defaultMetrics = [
  {
    id: '01',
    num: 95,
    suffix: '%',
    value: '95%',
    tag: '+9.4% YOY',
    tagColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    subtitle: 'CLIENT SATISFACTION',
    gradient: 'from-cyan-300 via-sky-400 to-white',
    lineColor: 'bg-cyan-400 shadow-[0_0_12px_#38bdf8]',
  },
  {
    id: '02',
    num: 150,
    suffix: '+',
    value: '150+',
    tag: 'VOL.MAX',
    tagColor: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
    subtitle: 'PROJECTS COMPLETED',
    gradient: 'from-purple-400 via-pink-400 to-cyan-300',
    lineColor: 'bg-purple-500 shadow-[0_0_12px_#a855f7]',
  },
  {
    id: '03',
    num: 50,
    suffix: '+',
    value: '50+',
    tag: 'ACTIVE STREAM',
    tagColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    subtitle: 'AUTOMATIONS LIVE',
    gradient: 'from-emerald-400 via-teal-300 to-cyan-200',
    lineColor: 'bg-emerald-400 shadow-[0_0_12px_#34d399]',
  },
  {
    id: '04',
    num: 99.9,
    suffix: '%',
    value: '99.9%',
    tag: 'BANK-GRADE',
    tagColor: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
    subtitle: 'SYSTEM UPTIME',
    gradient: 'from-sky-400 via-cyan-300 to-white',
    lineColor: 'bg-sky-400 shadow-[0_0_12px_#38bdf8]',
  },
  {
    id: '05',
    isStatic: true,
    value: '24/7',
    tag: 'SECURE_LINK',
    tagColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
    subtitle: 'SUPPORT AVAILABLE',
    gradient: 'from-indigo-400 via-purple-400 to-cyan-300',
    lineColor: 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]',
  },
];

export default function Stats({ settings }) {
  const activeMetrics = defaultMetrics.map((def, idx) => {
    const adminItem = settings?.stats?.[idx];
    if (!adminItem) return def;

    const parsed = parseStat(adminItem.value, def.num, def.suffix);
    return {
      ...def,
      value: adminItem.value || def.value,
      subtitle: adminItem.label || def.subtitle,
      tag: adminItem.tag || def.tag,
      isStatic: parsed.isStatic,
      num: parsed.num,
      suffix: parsed.suffix
    };
  });

  return (
    <section className="bg-zinc-950/90 border-y border-white/10 py-24 select-none relative overflow-hidden text-left font-sans">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-[1280px] px-6 mb-16 text-center">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
          <Award size={14} /> Proven Track Record
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Built for Business. Backed by Results.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Measurable achievements in software engineering, process automation, and system reliability for growing enterprise teams.
        </p>
      </div>

        {/* 5 Glassmorphic Floating Cards Grid */}
        <div className="container mx-auto max-w-[1340px] px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {activeMetrics.map((st, idx) => (
            <div 
              key={idx} 
              className="relative rounded-3xl bg-zinc-900/50 border border-white/10 p-7 flex flex-col justify-between min-h-[240px] overflow-hidden shadow-2xl hover:border-cyanCustom/50 hover:bg-zinc-900/90 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              {/* Ambient Hover Backlight Glow */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute -top-16 -right-16 w-36 h-36 bg-cyanCustom/20 blur-3xl pointer-events-none rounded-full" />

              {/* Card Top Row */}
              <div className="flex justify-between items-center text-xs font-mono mb-6 relative z-10">
                <span className="text-zinc-500 font-bold bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                  [ 0{idx + 1} ]
                </span>
                <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${st.tagColor} tracking-wider`}>
                  {st.tag}
                </span>
              </div>

              {/* Main Typography Value */}
              <div className="my-auto py-1 relative z-10">
                {st.isStatic ? (
                  <span className={`text-5xl sm:text-6xl lg:text-4xl xl:text-5xl font-black font-headline tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br ${st.gradient}`}>
                    {st.value}
                  </span>
                ) : (
                  <span className={`text-5xl sm:text-6xl lg:text-4xl xl:text-5xl font-black font-headline tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br ${st.gradient}`}>
                    <AnimatedCounter target={st.num} suffix={st.suffix} />
                  </span>
                )}
              </div>

              {/* Bottom Line & Label */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-3 relative z-10">
                <div className={`h-1 w-10 rounded-full ${st.lineColor} group-hover:w-full transition-all duration-500`} />
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block leading-snug group-hover:text-white transition-colors">
                  {st.subtitle}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
