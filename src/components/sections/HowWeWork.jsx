import React, { useState } from 'react';
import { Search, Compass, Palette, Code2, Rocket, Headphones, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

const steps = [
  { num: '01', title: 'Discover', icon: Search, desc: 'Understand your business, users, challenges, workflows, and objectives.' },
  { num: '02', title: 'Define', icon: Compass, desc: 'Turn requirements into scope, features, architecture, integrations, and a clear roadmap.' },
  { num: '03', title: 'Design', icon: Palette, desc: 'Create intuitive user journeys and interfaces around how people will actually use the software.' },
  { num: '04', title: 'Develop', icon: Code2, desc: 'Build the application using the technology and architecture appropriate for your requirements.' },
  { num: '05', title: 'Test & Launch', icon: Rocket, desc: 'Validate functionality, performance, usability, and security before deployment.' },
  { num: '06', title: 'Support & Scale', icon: Headphones, desc: 'Maintain, optimize, integrate, and extend your software as your business evolves.' },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400 font-mono text-xs">
          Our Development Process
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          From Business Requirement to Working Software
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Our structured 6-step engineering methodology translates your ideas and operational requirements into reliable software.
        </p>
      </div>

      {/* Horizontal Steps Scroll Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep.title === step.title;

          return (
            <div
              key={step.num}
              onMouseEnter={() => setActiveStep(step)}
              onClick={() => setActiveStep(step)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 border-sky-500 shadow-md scale-[1.03] z-20'
                  : 'bg-slate-50 dark:bg-zinc-950/70 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 z-10'
              }`}
            >
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2">{step.num}</span>
              <h3 className="text-sm font-headline font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 ${isActive ? 'text-sky-500' : 'text-slate-500 dark:text-zinc-400'}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Detail Breakdown Box */}
      <div className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-sky-500 shrink-0">
            <activeStep.icon size={24} />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
              Phase {activeStep.num} Overview:
            </span>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-1">{activeStep.title}</h3>
            <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">{activeStep.desc}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('contact') || document.getElementById('contact-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.href = '/contact';
          }}
          className="px-6 py-3.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-md shrink-0 cursor-pointer flex items-center gap-2"
        >
          Discuss Your Requirements <ArrowRight size={14} />
        </button>
      </div>

    </section>
  );
}
