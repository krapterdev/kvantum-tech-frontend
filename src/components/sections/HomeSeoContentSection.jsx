import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, Award, Zap, Code, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function HomeSeoContentSection() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 text-left select-none relative z-10 border-t border-slate-200 dark:border-zinc-800">
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <Badge className="mb-2 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
            <Cpu size={14} /> Enterprise Software Architecture & Digital Transformation
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
            LEADING IT SOLUTIONS COMPANY IN <span className="gradient-text">DELHI NCR & PAN-INDIA</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Empowering businesses, startups, and industrial enterprises with tailor-made software, WhatsApp automation, CRM engines, and scalable web applications.
          </p>
        </div>

        {/* 3 Grid Columns of Deep SEO Information Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="p-8 bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 w-fit">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white">
              Custom Software Development
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              At Kvantum Tech Solutions, we eliminate rigid SaaS limitations by engineering 100% custom enterprise software built specifically around your business workflows. From operational dashboards to complex PostgreSQL database architectures, our systems deliver complete source code ownership and zero monthly license fees.
            </p>
            <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-sky-500 shrink-0" /> Full Source Code Ownership</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-sky-500 shrink-0" /> Custom Database & REST APIs</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-sky-500 shrink-0" /> 100% Tailor-Made Workflows</li>
            </ul>
          </Card>

          <Card className="p-8 bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
            <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500 w-fit">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white">
              Business & WhatsApp API Automation
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              Automate multi-department tasks, customer support follow-ups, and sales pipelines. Our WhatsApp Business API integrations connect directly to Meta webhooks, triggering instant quotation dispatches, automated payment reminders, PDF report generation, and 24/7 AI chat assistants.
            </p>
            <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500 shrink-0" /> Meta Official WhatsApp API</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500 shrink-0" /> 98% Instant Open Rates</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500 shrink-0" /> Automated Lead Lead Scoring</li>
            </ul>
          </Card>

          <Card className="p-8 bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 w-fit">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white">
              CRM, HRMS & ERP Software Suite
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              Streamline internal operations with custom CRM systems for sales pipeline tracking, HRMS software for employee biometric attendance and automated payroll calculation, and comprehensive ERP platforms designed to handle inventory, billing, and accounting seamlessly.
            </p>
            <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500 shrink-0" /> Biometric Sync & Attendance</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500 shrink-0" /> Automated Salary & Payslips</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500 shrink-0" /> Real-time Analytics Dashboard</li>
            </ul>
          </Card>

        </div>

        {/* Additional Rich Text Content Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 space-y-6">
          <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white">
            Why Kvantum Tech Solutions is the Preferred IT Partner for Enterprise Growth
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
            In today's competitive digital ecosystem, businesses in Delhi NCR, Noida, Gurgaon, and across India require modern software that is fast, secure, and built without unnecessary framework bloat. Kvantum Tech Solutions combines deep technical expertise in React, Next.js, Node.js, Python, and PostgreSQL to deliver high-performance applications that rank top on search engines and convert visitors into active clients.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono font-bold text-slate-800 dark:text-zinc-200">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5">
              <Sparkles size={16} className="text-sky-500 shrink-0" />
              <span>Delhi NCR Local Office</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5">
              <Sparkles size={16} className="text-pink-500 shrink-0" />
              <span>2-Hour SLA Response</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5">
              <Sparkles size={16} className="text-purple-500 shrink-0" />
              <span>100% NDA Protection</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5">
              <Sparkles size={16} className="text-emerald-500 shrink-0" />
              <span>Zero Monthly Seat Fees</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
