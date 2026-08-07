import React from 'react';
import { ShieldCheck, Cpu, Clock, Headphones, Zap, Layers, Users, Globe, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400">
          Why Choose Kvantum
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Why Businesses Choose Kvantum Tech Solutions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Why growing businesses and enterprise teams partner with us to engineer custom software and automate operations.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Bento Card 1 (Large - 2 cols) */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/12 flex flex-col justify-between gap-6 shadow-md dark:shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center mb-4">
              <Cpu size={24} />
            </div>
            <span className="text-xs font-mono text-pink-600 dark:text-pink-400 uppercase font-bold tracking-widest block mb-1">Tailored Architecture</span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-3">Built Around Your Workflow</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We understand your processes before deciding how your software should work. We build custom applications that conform to your business rules rather than forcing you into rigid off-the-shelf software.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/8 pt-4">
            <span>• Process First</span>
            <span>• Zero Forced SaaS Lock-in</span>
            <span>• Custom Business Logic</span>
          </div>
        </div>

        {/* Bento Card 2 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-6 shadow-md dark:shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase font-bold tracking-widest block mb-1">Efficiency First</span>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-2">Automation-First Approach</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              We identify repetitive work and opportunities to improve operational efficiency through smart workflow automation.
            </p>
          </div>
        </div>

        {/* Bento Card 3 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-6 shadow-md dark:shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
              <Layers size={24} />
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-widest block mb-1">Future Proof</span>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-2">Scalable Architecture</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Build what you need today while keeping the software foundation ready for tomorrow's business growth.
            </p>
          </div>
        </div>

        {/* Bento Card 4 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-6 shadow-md dark:shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase font-bold tracking-widest block mb-1">Intuitive Design</span>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-2">User-Focused Development</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Software should be powerful without becoming difficult for your internal team or end customers to use.
            </p>
          </div>
        </div>

        {/* Bento Card 5 (Large - 3 cols) */}
        <div className="md:col-span-3 p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md dark:shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={20} className="text-sky-500" />
              <Globe size={20} className="text-emerald-500" />
              <Clock size={20} className="text-pink-500" />
              <Headphones size={20} className="text-purple-500" />
            </div>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-2">Integration Ready • Security by Design • Transparent & Supported</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl leading-relaxed">
              Connect APIs, payment gateways, WhatsApp & SMS. Bank-grade authentication, permissions, clear milestone communication, and long-term tech support.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact') || document.getElementById('contact-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/contact';
            }}
            className="px-7 py-3.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md shrink-0 cursor-pointer flex items-center gap-2"
          >
            Start Project <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </section>
  );
}
