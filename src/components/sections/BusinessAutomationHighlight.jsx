import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Badge from '../ui/Badge';

const automationsList = [
  'Lead capture and assignment',
  'Sales follow-ups',
  'WhatsApp, email and SMS communication',
  'Approval workflows',
  'Employee and HR processes',
  'Attendance and payroll workflows',
  'Quotations and invoices',
  'Payment reminders',
  'Task assignments',
  'Inventory updates',
  'Customer support processes',
  'Reports and management dashboards',
  'API and third-party integrations'
];

export default function BusinessAutomationHighlight() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          <Zap size={14} className="animate-pulse" /> Business Process Automation
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Automate the Work That Slows Your Business Down
        </h2>
      </div>

      <div className="p-8 md:p-12 rounded-3xl bg-slate-50 dark:bg-zinc-950/90 border border-slate-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl">
        <div className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed space-y-4 max-w-4xl mb-8">
          <p>
            Growth becomes difficult when your team spends hours updating spreadsheets, assigning leads, sending reminders, preparing reports, managing approvals, or moving information between disconnected systems.
          </p>
          <p>
            Our <strong>business automation solutions</strong> turn repetitive processes into connected digital workflows.
          </p>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400">
            We first understand how work moves through your business—who performs each task, where delays happen, what requires manual intervention, and which systems need to communicate. We then design automation around those workflows.
          </p>
        </div>

        {/* What Can You Automate */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 mb-8">
          <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-6">
            What Can You Automate?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {automationsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/8">
                <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Paragraph & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-slate-200 dark:border-white/10 pt-6">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            The goal isn't automation for the sake of technology. It's to reduce repetitive work, improve visibility, minimize errors, and give your team more time to focus on customers and growth.
          </p>
          <Link
            to="/services/business-automation"
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-md shrink-0 inline-flex items-center gap-2"
          >
            Explore Business Automation <ArrowRight size={14} />
          </Link>
        </div>

      </div>

    </section>
  );
}
