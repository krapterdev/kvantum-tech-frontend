import React from 'react';
import { Play, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

const demoIncludes = [
  'Live Product Walkthrough',
  'Dashboard Overview',
  'CRM Features',
  'HRMS Modules',
  'ERP Functionalities',
  'Automation Workflows',
  'Mobile App Preview',
  'Web Application Demo',
  'Reporting & Analytics',
  'Q&A Session with Experts',
];

export default function LiveDemo() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-16 select-none">
      <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/90 dark:border-white/10 p-8 sm:p-10 md:p-14 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors duration-300">

        {/* Ambient Subtle Background Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left: Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-5">
            <Badge className="inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
              <Play size={12} className="ml-0.5" /> Live Software Demo
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Experience Our Software <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Before You Invest
              </span>
            </h2>

            <p className="text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              See our software in action before making a decision. Book a personalized live demonstration and explore how our <strong>CRM, HRMS, ERP, Business Automation, WhatsApp Automation, Web Applications, and Mobile Apps</strong> simplify your operations and improve productivity.
            </p>

            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              During the live demo, our experts will walk you through key features, dashboards, automation workflows, reporting capabilities, user roles, integrations, and customization options based on your business requirements.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('contact') || document.getElementById('contact-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/contact';
                }}
                className="px-8 py-4 rounded-xl text-xs sm:text-sm font-bold bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200 shadow-lg shadow-pink-500/25 hover:scale-[1.02] cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Calendar size={16} /> Book Your Free Live Demo
              </button>

              <a
                href="tel:+919811661828"
                className="px-6 py-4 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-white/15 text-slate-800 dark:text-zinc-200 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Phone size={15} /> Call Now: +91 98116 61828
              </a>
            </div>
          </div>

          {/* Right: What's Included Card Grid (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 p-6 sm:p-7 rounded-2xl shadow-inner">
            <h3 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base font-headline mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              What&apos;s Included in the Demo?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {demoIncludes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-200 group shadow-sm"
                >
                  <CheckCircle2 size={15} className="text-pink-500 shrink-0" />
                  <span className="text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

