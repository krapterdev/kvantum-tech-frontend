import React from 'react';
import Badge from '../ui/Badge';
import { Cpu, Code2, Server } from 'lucide-react';

const techRow1 = [
  { name: 'React.js 19', category: 'Frontend', color: 'text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10' },
  { name: 'Node.js', category: 'Backend Engine', color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'PHP / Laravel', category: 'Core Software', color: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { name: 'MySQL & MongoDB', category: 'Database', color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { name: 'Three.js / WebGL', category: '3D & Graphics', color: 'text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/10' },
  { name: 'AWS Cloud Services', category: 'Infrastructure', color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10' },
];

const techRow2 = [
  { name: 'TypeScript', category: 'Type Safety', color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10' },
  { name: 'Docker & Kubernetes', category: 'DevOps', color: 'text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10' },
  { name: 'Meta WhatsApp API', category: 'Automation', color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'Redis Cache', category: 'In-Memory DB', color: 'text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/10' },
  { name: 'Nginx Web Server', category: 'Web Server', color: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { name: 'REST & GraphQL APIs', category: 'API Layer', color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10' },
];

export default function Technologies() {
  return (
    <section className="bg-slate-50 dark:bg-zinc-950/90 border-y border-slate-200 dark:border-white/8 py-20 select-none overflow-hidden text-center relative z-10">
      
      {/* Header */}
      <div className="container mx-auto max-w-[1280px] px-6 mb-12">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
          <Cpu size={14} /> Technology Stack
        </Badge>

        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Technology Selected for Performance, Security & Scale
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          We choose technology based on what your product needs—not simply what's trending. Our development stack supports modern web applications, mobile products, business platforms, APIs, databases, cloud infrastructure, and automation.
        </p>
      </div>

      {/* Row 1 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-6 opacity-90 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-left space-x-6 shrink-0">
          {techRow1.concat(techRow1).map((tech, idx) => (
            <div
              key={idx}
              className={`px-6 py-3.5 rounded-2xl border ${tech.color} flex items-center gap-3 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-md`}
            >
              <Code2 size={16} />
              <div className="text-left">
                <span className="text-xs font-mono font-bold block leading-none">{tech.name}</span>
                <span className="text-[9px] font-mono opacity-80 block mt-1">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-right space-x-6 shrink-0">
          {techRow2.concat(techRow2).map((tech, idx) => (
            <div
              key={idx}
              className={`px-6 py-3.5 rounded-2xl border ${tech.color} flex items-center gap-3 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-md`}
            >
              <Server size={16} />
              <div className="text-left">
                <span className="text-xs font-mono font-bold block leading-none">{tech.name}</span>
                <span className="text-[9px] font-mono opacity-80 block mt-1">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
