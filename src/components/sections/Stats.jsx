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
    <div ref={countRef}>
      <Card className="p-9 border bg-zinc-900/10 text-center flex flex-col gap-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
        <h3 className="text-5xl font-black font-headline text-pinkCustom">
          {count}{suffix}
        </h3>
        <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-1">{label}</span>
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
        { target: "50", suffix: "+", label: "Projects Delivered" },
        { target: "35", suffix: "+", label: "Happy Clients" },
        { target: "3", suffix: "+", label: "Years of Chaos" },
        { target: "99", suffix: "%", label: "Deadlines Hit" }
      ];

  return (
    <section className="bg-zinc-950/30 py-20 px-6 select-none border-y border-white/5">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {statsList.map((stat, idx) => (
            <StatCounter 
              key={idx}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
