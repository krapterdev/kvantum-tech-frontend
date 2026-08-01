import React from 'react';
import { ShieldCheck, Cpu, Clock, Headphones, Zap, Code } from 'lucide-react';
import Badge from '../ui/Badge';

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          Why Kvantum Tech Solutions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Engineering Excellence & <br />
          <span className="gradient-text">Automation-First Approach</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Why businesses trust Kvantum Tech Solutions to build secure, scalable, and reliable software tailored to their operational needs.
        </p>
      </div>

      {/* Bento Grid Layout (Section 06 Blueprint) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Bento Card 1 (Large - 2 cols) */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-pinkCustom/15 via-purpleCustom/10 to-transparent border border-white/12 flex flex-col justify-between gap-6 backdrop-blur-2xl shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pinkCustom/10 border border-pinkCustom/20 text-pinkCustom flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <span className="text-xs font-mono text-pinkCustom uppercase font-bold tracking-widest block mb-1">100% Custom Source Code</span>
            <h3 className="text-2xl font-headline font-bold text-zinc-100 mb-3">Custom Built — Zero Generic Templates</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We write pure, clean, maintainable code specifically for your business processes. You retain full source code ownership with zero recurring third-party platform lock-in.
            </p>
          </div>
          <div className="flex gap-4 text-xs font-mono text-zinc-400 border-t border-white/8 pt-4">
            <span>• Full Code Ownership</span>
            <span>• Scalable Architecture</span>
            <span>• Zero License Fees</span>
          </div>
        </div>

        {/* Bento Card 2 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between gap-6 backdrop-blur-2xl shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyanCustom/10 border border-cyanCustom/20 text-cyanCustom flex items-center justify-center mb-4">
              <Headphones size={24} />
            </div>
            <span className="text-xs font-mono text-cyanCustom uppercase font-bold tracking-widest block mb-1">Dedicated Support</span>
            <h3 className="text-xl font-headline font-bold text-zinc-100 mb-2">24/7 Support</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Direct developer access, rapid resolution SLAs, and continuous system monitoring for peace of mind.
            </p>
          </div>
        </div>

        {/* Bento Card 3 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between gap-6 backdrop-blur-2xl shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest block mb-1">Agile Delivery</span>
            <h3 className="text-xl font-headline font-bold text-zinc-100 mb-2">Fast Setup</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Sprint-based development cycles ensuring your custom software goes live in weeks, not months.
            </p>
          </div>
        </div>

        {/* Bento Card 4 (Standard - 1 col) */}
        <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between gap-6 backdrop-blur-2xl shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purpleCustom/10 border border-purpleCustom/20 text-purpleCustom flex items-center justify-center mb-4">
              <Cpu size={24} />
            </div>
            <span className="text-xs font-mono text-purpleCustom uppercase font-bold tracking-widest block mb-1">Automation First</span>
            <h3 className="text-xl font-headline font-bold text-zinc-100 mb-2">Automation First</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Every system is built to automate repetitive manual work, saving your team hundreds of hours each month.
            </p>
          </div>
        </div>

        {/* Bento Card 5 (Large - 3 cols) */}
        <div className="md:col-span-3 p-8 rounded-3xl bg-gradient-to-r from-cyanCustom/15 via-purpleCustom/15 to-pinkCustom/15 border border-white/12 flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-2xl shadow-xl">
          <div>
            <span className="text-xs font-mono text-cyanCustom uppercase font-bold tracking-widest block mb-1">Built to Scale</span>
            <h3 className="text-2xl font-headline font-bold text-zinc-100 mb-2">Scalable & Enterprise Ready</h3>
            <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
              Our software architectures seamlessly handle high transaction volumes, multi-branch data synchronization, and enterprise integrations.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.35)] shrink-0 cursor-pointer"
          >
            Start Building Today →
          </button>
        </div>

      </div>

    </section>
  );
}
