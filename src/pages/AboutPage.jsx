import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Zap, Users, Code, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import CardStackShowcase from '@/components/sections/CardStackShowcase';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function AboutPage({ theme, settings }) {
  const about = settings?.about || {};

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-24">

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Award size={14} /> About Kvantum Tech Solutions
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-6">
          BUILDING THE FUTURE OF <br />
          <span className="gradient-text">CUSTOM DIGITAL ENGINEERING</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {about.description || 'Kvantum Tech Solutions is a custom software development company dedicated to helping businesses streamline operations, reduce manual workload, and grow faster through intelligent digital solutions.'}
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block mb-2">Our Mission</span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-4">Eliminate Manual Work Through Code</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              Our mission is to empower growing enterprises with custom software and automation platforms that eliminate repetitive task bloat, improve team efficiency, and deliver 100% source code ownership.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Zero Template Lock-in • 100% Data Security</span>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-2">Our Engineering Standard</span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-4">High Performance & Scalable Architecture</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              We write clean, modular React, Node, PHP/Laravel, and WebGL code that scales effortlessly to millions of data transactions.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <CheckCircle2 size={16} className="text-sky-500" />
            <span>Enterprise SLA • 24/7 Developer Support</span>
          </div>
        </div>
      </div>

      {/* Why Choose Us Bento Section */}
      <WhyChooseUs />

      {/* Leadership & Core Team Showcase */}
      <CardStackShowcase />

    </div>
  );
}
