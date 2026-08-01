import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Search, Target, Palette, Code, Cpu, Rocket, Headphones } from 'lucide-react';
import Badge from '../ui/Badge';

const steps = [
  { step: '01', title: 'DISCOVER', icon: Search, color: 'text-pinkCustom', desc: 'In-depth requirement analysis & mapping your existing operational workflows.' },
  { step: '02', title: 'STRATEGY', icon: Target, color: 'text-cyanCustom', desc: 'Designing system architecture, database schemas, and automation blueprints.' },
  { step: '03', title: 'DESIGN', icon: Palette, color: 'text-purpleCustom', desc: 'Crafting responsive UI/UX prototypes, dashboard wireframes, and design tokens.' },
  { step: '04', title: 'DEVELOPMENT', icon: Code, color: 'text-emerald-400', desc: 'Agile full-stack engineering with clean modular code & secure APIs.' },
  { step: '05', title: 'AUTOMATION', icon: Cpu, color: 'text-amber-400', desc: 'Integrating WhatsApp bots, CRM triggers, and automated notification engines.' },
  { step: '06', title: 'LAUNCH', icon: Rocket, color: 'text-pinkCustom', desc: 'Rigorous QA testing, cloud server deployment, and team onboarding.' },
  { step: '07', title: 'SUPPORT', icon: Headphones, color: 'text-cyanCustom', desc: '24/7 system monitoring, rapid bug-fixes, and continuous feature updates.' },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-purpleCustom/10 border-purpleCustom/20 text-purpleCustom">
          Our Development Process
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          How We Work — <br />
          <span className="gradient-text">7-Step Agile Software Delivery</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          From initial discovery to final deployment and 24/7 support, our structured workflow ensures transparent execution and zero delays.
        </p>
      </div>

      {/* Horizontal Process Steps Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
        {steps.map((item) => {
          const Icon = item.icon;
          const isActive = activeStep.step === item.step;

          return (
            <div
              key={item.step}
              onMouseEnter={() => setActiveStep(item)}
              onClick={() => setActiveStep(item)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
                isActive
                  ? 'bg-white/10 border-pinkCustom/60 shadow-[0_0_20px_rgba(236,72,153,0.3)] scale-[1.03] z-20'
                  : 'bg-white/[0.02] border-white/8 hover:border-white/20 z-10'
              }`}
            >
              <div>
                <span className={`text-xs font-mono font-extrabold block mb-2 ${item.color}`}>{item.step}</span>
                <h4 className="text-xs font-headline font-bold text-zinc-100 mb-2 leading-snug">{item.title}</h4>
              </div>
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 w-fit ${item.color}`}>
                <Icon size={16} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Expansion Panel */}
      <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/15 backdrop-blur-2xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-white/10 text-white shrink-0">
            <activeStep.icon size={28} className={activeStep.color} />
          </div>
          <div>
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeStep.color}`}>
              Phase {activeStep.step} Detail Breakdown:
            </span>
            <h3 className="text-2xl font-headline font-bold text-zinc-100 mt-0.5 mb-1">{activeStep.title}</h3>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">{activeStep.desc}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.35)] shrink-0 cursor-pointer"
        >
          Discuss Your Project Phase →
        </button>
      </div>

    </section>
  );
}
