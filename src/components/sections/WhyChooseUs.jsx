import React from 'react';
import { ShieldCheck, Cpu, Clock, Headphones, Zap, Layers, Users, Globe } from 'lucide-react';
import Badge from '../ui/Badge';

const reasons = [
  { title: 'Built Around Your Workflow', desc: 'We understand your processes before deciding how your software should work.', icon: Cpu, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  { title: 'Automation-First Approach', desc: 'We identify repetitive work and opportunities to improve efficiency through automation.', icon: Zap, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
  { title: 'Scalable Architecture', desc: 'Build what you need today while keeping the foundation ready for tomorrow.', icon: Layers, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
  { title: 'User-Focused Development', desc: 'Software should be powerful without becoming difficult for your team or customers to use.', icon: Users, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  { title: 'Integration Ready', desc: 'Connect APIs, payment gateways, WhatsApp, email, existing software, and third-party platforms.', icon: Globe, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  { title: 'Security by Design', desc: 'Authentication, permissions, data protection, and secure development practices are considered throughout development.', icon: ShieldCheck, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  { title: 'Transparent Development', desc: 'Clear requirements, milestones, communication, and visibility throughout the project.', icon: Clock, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
  { title: 'Long-Term Technology Support', desc: 'As your business changes, we can maintain, optimize, integrate, and expand your software.', icon: Headphones, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
];

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

      {/* 8 Pillar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-4 cursor-default group shadow-md dark:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${r.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-500 transition-colors">
                  {r.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
