import React, { useState, useEffect, useRef } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

function StatCounter({ target, suffix = '', label, sublabel }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const end = parseInt(target);
    if (isNaN(end)) { setCount(target); return; }
    const duration = 1600;
    const totalFrames = 55;
    const step = end / totalFrames;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.floor(step * frame));
      if (frame >= totalFrames) { setCount(end); clearInterval(timer); }
    }, duration / totalFrames);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={countRef} className="w-full flex">
      <Card className="p-8 border bg-zinc-900/10 text-center flex flex-col gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.25)] w-full items-center justify-center rounded-[22px] hover:scale-[1.03] transition-transform duration-300 group">
        <h3 className="text-5xl md:text-6xl font-black font-headline text-pinkCustom drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] tracking-tight">
          {count}{suffix}
        </h3>
        <span className="text-zinc-100 font-headline font-bold text-sm mt-1 block">{label}</span>
        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest block max-w-[200px] leading-relaxed mt-1">
          {sublabel}
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
    if (match) return { target: match[1], suffix: match[2], label: statItem.label, sublabel: '' };
    return { target: val, suffix: '', label: statItem.label, sublabel: '' };
  };

  const statsList = customStats && customStats.length > 0
    ? customStats.map(parseStat)
    : [
        {
          target: '250', suffix: '+',
          label: 'Successful Projects Delivered',
          sublabel: 'Custom software, CRM, ERP & automation platforms across industries.'
        },
        {
          target: '100', suffix: '+',
          label: 'Happy Clients',
          sublabel: 'Businesses trust us to build secure, scalable & reliable software.'
        },
        {
          target: '15', suffix: '+',
          label: 'Industries Served',
          sublabel: 'Healthcare, hospitality, manufacturing, education, logistics & more.'
        },
        {
          target: '98', suffix: '%',
          label: 'Client Satisfaction Rate',
          sublabel: 'Quality, transparency & long-term support build lasting relationships.'
        },
        {
          target: '24', suffix: '/7',
          label: 'Technical Support',
          sublabel: 'Dedicated support for timely maintenance, updates & assistance.'
        },
      ];

  return (
    <section className="bg-zinc-950/30 py-24 px-6 select-none border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[180px] bg-gradient-to-r from-pinkCustom/5 to-purpleCustom/5 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Success Metrics
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
            Trusted by Businesses. <span className="gradient-text">Proven by Results.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            At Kvantum Tech Solutions, we measure our success by the value we create for our clients. Every software solution, automation platform, and digital product is designed to improve efficiency, increase productivity, and support long-term business growth.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 items-stretch w-full">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)] min-w-[200px] max-w-[260px] flex"
            >
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
