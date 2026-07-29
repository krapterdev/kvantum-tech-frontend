import React, { useState, useEffect, useRef } from 'react';
import Card from '../ui/Card';

function StatCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(target);
    if (isNaN(end)) {
      setCount(target);
      return;
    }
    
    const duration = 1500;
    const totalFrames = 50;
    const step = end / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const current = Math.floor(step * frame);
      setCount(current);
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, duration / totalFrames);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={countRef} className="w-full flex">
      <Card className="p-9 border bg-zinc-900/10 text-center flex flex-col gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.25)] w-full items-center justify-center rounded-[22px] hover:scale-[1.03] transition-transform duration-300">
        <h3 className="text-5xl md:text-6xl font-black font-headline text-pinkCustom drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] tracking-tight">
          {count}{suffix}
        </h3>
        <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-widest mt-2 block max-w-[180px] leading-relaxed">
          {label}
        </span>
      </Card>
    </div>
  );
}

export default function Stats({ settings }) {
  const customStats = settings?.stats;

  const parseStat = (statItem) => {
    const val = statItem.value || '';
    const match = val.match(/^(\d+)(.*)$/);
    if (match) {
      return { target: match[1], suffix: match[2], label: statItem.label };
    }
    return { target: val, suffix: '', label: statItem.label };
  };

  const statsList = customStats && customStats.length > 0
    ? customStats.map(parseStat)
    : [
        { target: "250", suffix: "+", label: "Projects Delivered" },
        { target: "100", suffix: "+", label: "Happy Clients" },
        { target: "20", suffix: "+", label: "Business Solutions" },
        { target: "99", suffix: "%", label: "Client Satisfaction" },
        { target: "24", suffix: "×7", label: "Support Available" }
      ];

  return (
    <section className="bg-zinc-950/30 py-24 px-6 select-none border-y border-white/5 relative overflow-hidden">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-gradient-to-r from-pinkCustom/5 to-purpleCustom/5 blur-3xl pointer-events-none -z-10 rounded-full" />
      
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-wrap justify-center gap-8 items-stretch w-full">
          {statsList.map((stat, idx) => (
            <div 
              key={idx} 
              className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-22px)] lg:w-[calc(25%-24px)] max-w-[290px] min-w-[240px] flex"
            >
              <StatCounter 
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
