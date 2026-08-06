import React, { useState, useEffect, useRef } from 'react';
import Badge from '../ui/Badge';
import { Award, Activity, ShieldCheck, Zap } from 'lucide-react';

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

const defaultMetrics = [
  {
    id: '01',
    num: 95,
    suffix: '%',
    tag: '+9.4% YOY',
    tagColor: 'text-emerald-400',
    subtitle: 'CLIENT SATISFACTION',
    gradient: 'from-cyan-300 via-sky-400 to-white',
    lineColor: 'bg-cyan-400 shadow-[0_0_10px_#38bdf8]',
    outline: false,
  },
  {
    id: '02',
    num: 150,
    suffix: '+',
    tag: 'VOL.MAX',
    tagColor: 'text-zinc-400',
    subtitle: 'PROJECTS COMPLETED',
    gradient: 'from-zinc-100 via-zinc-300 to-zinc-500',
    lineColor: 'bg-zinc-500',
    outline: true,
  },
  {
    id: '03',
    num: 50,
    suffix: '+',
    tag: 'ACTIVE STREAM',
    tagColor: 'text-purple-400',
    subtitle: 'AUTOMATIONS LIVE',
    gradient: 'from-purple-400 via-pink-400 to-cyan-400',
    lineColor: 'bg-purple-500 shadow-[0_0_10px_#a855f7]',
    outline: false,
  },
  {
    id: '04',
    num: 99.9,
    suffix: '%',
    tag: 'BANK-GRADE',
    tagColor: 'text-sky-400',
    subtitle: 'SYSTEM UPTIME',
    gradient: 'from-sky-400 via-teal-300 to-white',
    lineColor: 'bg-sky-400 shadow-[0_0_10px_#38bdf8]',
    outline: false,
  },
  {
    id: '05',
    isStatic: true,
    value: '24/7',
    tag: 'SECURE_LINK',
    tagColor: 'text-cyan-400',
    subtitle: 'SUPPORT AVAILABLE',
    gradient: 'from-indigo-400 via-purple-400 to-cyan-400',
    lineColor: 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]',
    outline: false,
  },
];

export default function Stats({ settings }) {
  return (
    <section className="bg-[#030712] border-y border-white/10 py-24 select-none relative overflow-hidden text-left font-sans">
      {/* Subtle Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-[1340px] px-6 relative z-10">
        
        {/* Header telemetry matching reference design */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>// DATA_STREAM_ACTIVE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline text-white tracking-tight leading-none uppercase">
              KEY PERFORMANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-600">METRICS</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end text-[11px] font-mono text-zinc-500 space-y-1 font-bold">
            <span className="text-zinc-400">SYS.OP.0492</span>
            <span>LAT.45.92.11</span>
            <span className="text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> SECURE_LINK
            </span>
          </div>
        </div>

        {/* 5-Card Cyber Telemetry Grid matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-zinc-950/80 border border-white/10 rounded-3xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          {defaultMetrics.map((st) => (
            <div key={st.id} className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] hover:bg-white/[0.02] transition-all duration-300 group relative">
              
              {/* Card Top Header */}
              <div className="flex justify-between items-center text-xs font-mono mb-6">
                <span className="text-zinc-500 font-bold">[ {st.id} ]</span>
                <span className={`text-[11px] font-bold ${st.tagColor} tracking-wider`}>{st.tag}</span>
              </div>

              {/* Main Number Value */}
              <div className="my-auto py-2">
                {st.isStatic ? (
                  <span className={`text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black font-headline tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r ${st.gradient}`}>
                    {st.value}
                  </span>
                ) : st.outline ? (
                  <span 
                    className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black font-headline tracking-tighter leading-none"
                    style={{
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.7)',
                      color: 'transparent'
                    }}
                  >
                    <AnimatedCounter target={st.num} suffix={st.suffix} />
                  </span>
                ) : (
                  <span className={`text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black font-headline tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r ${st.gradient}`}>
                    <AnimatedCounter target={st.num} suffix={st.suffix} />
                  </span>
                )}
              </div>

              {/* Accent Line & Subtitle */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                <div className={`h-0.5 w-8 rounded-full ${st.lineColor} group-hover:w-16 transition-all duration-500`} />
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block leading-tight group-hover:text-zinc-200 transition-colors">
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
