import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const models = [
  { name: 'Fixed-Scope Development', desc: 'For clearly defined requirements and deliverables.', badge: 'Project Based', icon: ShieldCheck, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  { name: 'Dedicated Development', desc: 'For businesses that need ongoing development capacity.', badge: 'Retainer / Dedicated', icon: Zap, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
  { name: 'Custom Product Development', desc: 'For complex software, SaaS products, and long-term platforms.', badge: 'Full Platform', icon: Sparkles, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
  { name: 'Automation Implementation', desc: 'For improving and connecting existing business processes.', badge: 'Workflow Engine', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400">
          <Sparkles size={14} /> Engagement Models
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          A Development Model That Fits Your Project
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Every software project has different requirements, complexity, timelines, and technical challenges. That's why we offer flexible engagement models instead of forcing every business into a standard package.
        </p>
      </div>

      {/* 4 Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {models.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-6 cursor-default group shadow-md dark:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className={`p-2.5 rounded-xl border ${m.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors">
                  {m.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left shadow-md">
        <div>
          <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-2">Need a Custom Estimate for Your Project?</h3>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-xl">Share your project goals, scope, and technical requirements with our engineering team for an accurate milestone roadmap and timeline.</p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('contact') || document.getElementById('contact-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else navigate('/contact');
          }}
          className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md shrink-0 cursor-pointer flex items-center gap-2"
        >
          Request a Project Estimate <ArrowRight size={15} />
        </button>
      </div>

    </section>
  );
}
