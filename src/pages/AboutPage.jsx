import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Zap, Users, Code, ArrowRight, Target, Lightbulb, Lock, HeartHandshake } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const companyValues = [
  {
    title: '100% Custom Source Code',
    desc: 'Zero template bloat or third-party reseller locks. You own full source code rights and data control.',
    icon: Code,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    title: 'Automation-First Focus',
    desc: 'Every software system is architected to eliminate repetitive manual processes and save hundreds of operational hours.',
    icon: Zap,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
  {
    title: 'Enterprise Security & SLA',
    desc: 'Bank-grade encryption, continuous server monitoring, daily automated backups, and 2-hour SLA response guarantees.',
    icon: Lock,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'Direct Engineering Access',
    desc: 'Work directly with senior full-stack developers and solution architects. Zero account managers or sales fluff.',
    icon: HeartHandshake,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
];

const teamMembers = [
  { name: 'Sahil Kumar', role: 'Head of Web Design & Development', exp: '10+ Yrs Exp.', badge: 'Architecture & UI', bio: 'Leads custom software architecture, full-stack web application engineering, and responsive UI design.' },
  { name: 'Bhavya Nigam', role: 'Head of Business Development & Sales', exp: '10+ Yrs Exp.', badge: 'Enterprise Growth', bio: 'Drives enterprise sales strategy, client consulting, and strategic business growth solutions.' },
  { name: 'Anil Thapa', role: 'Head of SMO & Social Media Marketing', exp: '7+ Yrs Exp.', badge: 'Branding & SMO', bio: 'Spearheads brand positioning, multi-channel social media campaigns, and community engagement.' },
  { name: 'Ankit Kumar', role: 'Head of SEO & Organic Growth', exp: '6+ Yrs Exp.', badge: 'Technical SEO', bio: 'Specializes in technical SEO auditing, high-converting keyword architecture, and search visibility.' },
  { name: 'Kunal Dinkar Singh', role: 'Head of Graphic Design & Creative Media', exp: '5+ Yrs Exp.', badge: 'Creative Design', bio: 'Oversees visual identity design, brand aesthetics, UI graphics, and marketing media assets.' },
  { name: 'Akansha Sharma', role: 'Business Development Executive', exp: '2+ Yrs Exp.', badge: 'Client Relations', bio: 'Manages client onboarding, initial project consultations, and daily sales coordination.' },
];

export default function AboutPage({ theme, settings }) {
  const about = settings?.about || {};

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-24">

      {/* Hero Banner */}
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Award size={14} /> About Kvantum Tech Solutions
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-6">
          PIONEERING CUSTOM SOFTWARE & <br />
          <span className="gradient-text">BUSINESS AUTOMATION ENGINEERING</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {about.description || 'Kvantum Tech Solutions is a custom software development company dedicated to helping businesses streamline operations, reduce manual workload, and grow faster through intelligent digital solutions.'}
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center mb-4">
              <Target size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block mb-2">Our Mission</span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-4">Eliminate Operational Friction Through Code</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We empower enterprises to replace slow, manual tasks with automated, high-speed digital workflows.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-zinc-800 mt-6">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>100% Data Privacy & Full Source Code Rights</span>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center mb-4">
              <Lightbulb size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-2">Our Vision</span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-4">Scalable Architecture Built for Growth</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              To be the trusted technology partner for mid-market and enterprise businesses seeking scalable software architectures.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-zinc-800 mt-6">
            <CheckCircle2 size={16} className="text-sky-500" />
            <span>Enterprise SLA & 24/7 Developer Support</span>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div>
        <div className="text-center mb-12">
          <Badge className="mb-3 inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
            Core Principles
          </Badge>
          <h2 className="text-3xl font-headline font-bold text-slate-900 dark:text-white">Why Clients Choose Kvantum</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg">
                <div className={`w-12 h-12 rounded-2xl border ${val.color} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-House Leadership & Team Grid */}
      <div>
        <div className="text-center mb-12">
          <Badge className="mb-3 inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
            <Users size={14} /> Leadership & Core Department Heads
          </Badge>
          <h2 className="text-3xl font-headline font-bold text-slate-900 dark:text-white">Meet Our Core Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    {m.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-pink-600 dark:text-pink-400">{m.exp}</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white">{m.name}</h3>
                <span className="text-xs font-mono text-sky-600 dark:text-sky-400 block mb-3 font-semibold">{m.role}</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
