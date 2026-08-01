import React from 'react';
import { Code, Database, Cpu, MessageSquare, Smartphone, Zap, ArrowRight, Shield } from 'lucide-react';
import Badge from '../ui/Badge';

const serviceCards = [
  {
    num: '01',
    title: 'BUSINESS AUTOMATION',
    desc: 'Eliminate repetitive manual tasks. We build automated lead assignment, email follow-ups, quotation generation, and cross-platform data syncing.',
    highlights: ['Workflow Automation', 'Lead Qualification', 'Document & Invoice Triggers'],
    icon: Cpu,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    num: '02',
    title: 'CUSTOM SOFTWARE DEV',
    desc: 'Bespoke web and enterprise software built from the ground up for your specific business requirements. Zero template bloat, 100% source code ownership.',
    highlights: ['100% Source Code Ownership', 'Scalable Architecture', 'Zero Recurring License Fees'],
    icon: Code,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
  {
    num: '03',
    title: 'CRM SOFTWARE SYSTEMS',
    desc: 'Manage lead pipelines, team performance, client communications, and automated sales follow-ups from an intuitive single dashboard.',
    highlights: ['Lead Funnel Tracking', 'Sales Rep Scoring', 'WhatsApp & Call Sync'],
    icon: Database,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    num: '04',
    title: 'HRMS & PAYROLL SOFTWARE',
    desc: 'Streamline employee onboarding, biometric attendance, leave approvals, automated salary slip generation, and compliance reporting.',
    highlights: ['Biometric Attendance Sync', 'Automated Payroll Engine', 'Leave & Asset Management'],
    icon: Shield,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    num: '05',
    title: 'WHATSAPP BUSINESS API',
    desc: 'Engage leads in under 5 seconds with automated WhatsApp bots, PDF proposal dispatch, appointment scheduling, and order status updates.',
    highlights: ['Interactive 24/7 Chatbots', 'Instant PDF Proposals', 'Broadcast Campaigns'],
    icon: MessageSquare,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    num: '06',
    title: 'WEB & MOBILE APPS',
    desc: 'High-performance React web applications and Flutter iOS/Android mobile apps designed for speed, security, and exceptional user experience.',
    highlights: ['React & Full-Stack', 'iOS & Android Native Apps', 'REST & GraphQL APIs'],
    icon: Smartphone,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
];

export default function Services({ services = [] }) {
  return (
    <section id="services" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
          Core Services & Solutions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Tailored Engineering for <br />
          <span className="gradient-text">Modern Enterprise Scale</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          From custom software development to automated lead funnels and enterprise ERP platforms, we deliver secure, scalable digital products.
        </p>
      </div>

      {/* Ultra-Wide Cards Layout (Blueprint Section 03) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-6 cursor-default group hover:-translate-y-1 shadow-md dark:shadow-xl"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                    {card.num}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${card.color}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 dark:border-white/8 pt-4">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">Key Deliverables:</span>
                <div className="flex flex-wrap gap-2">
                  {card.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/8 px-2.5 py-1 rounded-lg">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
