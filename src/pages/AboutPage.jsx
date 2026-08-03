import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, CheckCircle2, ShieldCheck, Zap, Code, ArrowRight, Target, Lightbulb, 
  Cpu, Layers, Smartphone, LayoutGrid, Check, Sparkles, Building2, Rocket, Globe
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import FAQ, { aboutFaqs } from '@/components/sections/FAQ';

const whatWeBuildItems = [
  'Custom Software Solutions',
  'Business Automation Software',
  'CRM & ERP Systems',
  'SaaS Platforms',
  'Web Applications',
  'Mobile Applications',
  'E-commerce Platforms',
  'Business Management Systems',
  'HR & Employee Management Systems',
  'Booking & Appointment Systems',
  'Inventory & Order Management Systems',
  'Lead & Customer Management Systems',
  'Custom Admin Panels & Dashboards',
  'API & Third-Party Integrations',
  'Industry-Specific Software Solutions',
];

const goalsList = [
  'Automate repetitive operations',
  'Reduce manual work',
  'Improve team productivity',
  'Manage customers and data efficiently',
  'Streamline business processes',
  'Improve customer experiences',
  'Build a stronger online presence',
  'Scale operations with technology',
];

export default function AboutPage({ theme, settings }) {
  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-24">

      {/* Hero Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <Badge className="mb-2 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Award size={14} /> Kvantum Tech Solutions
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
          BUILD SMARTER. AUTOMATE BETTER. <br />
          <span className="gradient-text">GROW DIGITALLY.</span>
        </h1>

        <p className="text-slate-700 dark:text-slate-200 text-base sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
          Kvantum Tech Solutions is a software development and technology solutions company helping businesses build powerful digital products, automate operations, and establish a strong online presence.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-mono">
          <span className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 font-bold">
            Primary Focus: Custom Software Development
          </span>
          <span className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-bold">
            Business Process Automation
          </span>
          <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold">
            SaaS & Web Architecture
          </span>
        </div>
      </div>

      {/* Primary Target Clients Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <Badge className="bg-pink-500/10 border-pink-500/30 text-pink-400 font-mono text-xs">
            <Building2 size={14} /> Who We Work With
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-black uppercase text-white leading-tight">
            Transforming Ideas Into Scalable Software
          </h2>
          <p className="text-slate-300 text-base leading-relaxed font-sans">
            We work with <strong>startups, SMEs, growing businesses, and organizations</strong> to transform ideas and business requirements into reliable, scalable, and user-friendly software solutions.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed font-sans">
            From internal business management systems to customer-facing platforms, we build technology designed around real business needs.
          </p>
        </div>
      </div>

      {/* WHAT WE BUILD GRID */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-3 inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
            <Cpu size={14} /> Core Engineering Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
            WHAT WE BUILD
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Tailor-made software products engineered specifically for operational efficiency and digital growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatWeBuildItems.map((item, idx) => (
            <Card
              key={idx}
              className="p-5 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-md flex items-center gap-3.5 hover:border-sky-500/40 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center shrink-0 font-mono text-xs font-bold group-hover:scale-110 transition-transform">
                0{idx + 1}
              </div>
              <span className="text-sm font-bold font-headline text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                {item}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* BEYOND SOFTWARE DEVELOPMENT & OUR APPROACH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Beyond Software Development */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center">
              <Globe size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
              Digital Ecosystem
            </span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white">
              Beyond Software Development
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
              Beyond software development, we also help businesses build and strengthen their online presence through professional websites, e-commerce experiences, search visibility, performance optimization, and scalable digital infrastructure.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 mt-6">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Webites • E-Commerce • Search Visibility • Infrastructure
            </span>
          </div>
        </div>

        {/* Card 2: Business-First Approach */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center">
              <Target size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block">
              Our Methodology
            </span>
            <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white">
              Our Approach is Business-First
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
              We start by understanding how your business works, identifying repetitive processes, operational challenges, and growth opportunities, and then designing the right technology solution around them.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 mt-6">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Understand Workflow → Identify Friction → Engineer Custom Solution
            </span>
          </div>
        </div>

      </div>

      {/* OUR GOAL CHECKLIST SECTION */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xl space-y-8">
        <div className="max-w-2xl text-left">
          <Badge className="mb-3 inline-flex items-center gap-1.5 bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
            <Rocket size={14} /> Measurable Business Outcomes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
            OUR GOAL
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
            Our goal is not simply to deliver software. We aim to build systems that help businesses achieve operational supremacy:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {goalsList.map((goal, gIdx) => (
            <div
              key={gIdx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={14} />
              </div>
              <span className="text-xs sm:text-sm font-bold font-sans text-slate-900 dark:text-slate-200">
                {goal}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CLOSING STATEMENT BANNER */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white dark:bg-zinc-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-4 max-w-3xl text-left">
          <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest block">
            Software Development • Business Automation • SaaS • Web & Mobile Applications • Digital Presence
          </span>
          <h3 className="text-2xl sm:text-4xl font-black font-headline uppercase leading-tight">
            Ready to Turn Your Requirements into a Practical Technology Solution?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Whether you need custom software for your business, want to automate an existing process, launch a SaaS product, develop a web or mobile platform, or strengthen your company's digital presence, Kvantum Tech Solutions can help.
          </p>
          <p className="text-slate-400 text-xs font-mono italic">
            "We believe the right software should simplify business, improve efficiency, and create opportunities for growth."
          </p>
        </div>

        <Link
          to="/contact"
          className="px-8 py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg shrink-0"
        >
          Discuss Your Project →
        </Link>
      </div>

      {/* Page FAQ placed at bottom */}
      <FAQ items={aboutFaqs} title="About Kvantum Tech" subtitle="Frequently Asked Questions" />

    </div>
  );
}
