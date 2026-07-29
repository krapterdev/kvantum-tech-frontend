import React from 'react';
import { CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const automationTargets = [
  'Customer Relationship Management (CRM)',
  'Employee Management',
  'HR Operations',
  'Attendance & Payroll',
  'Sales Process',
  'Lead Management',
  'Task Management',
  'Approval Workflows',
  'Inventory Management',
  'Invoice Generation',
  'Payment Reminders',
  'WhatsApp Messaging',
  'Email Automation',
  'SMS Notifications',
  'Customer Support',
  'Reports & Analytics',
  'Project Management',
  'Document Management',
  'Internal Communication',
  'Business Workflows',
];

const automationBenefits = [
  'Reduce Manual Work',
  'Increase Team Productivity',
  'Save Operational Costs',
  'Improve Customer Experience',
  'Eliminate Human Errors',
  'Faster Decision Making',
  'Real-Time Reporting',
  'Better Collaboration',
  'Higher Revenue Growth',
  'Scalable Business Operations',
];

const visionPoints = [
  'Every new lead is automatically assigned to the sales team.',
  'Follow-up reminders are scheduled without manual effort.',
  'WhatsApp messages are sent automatically.',
  'HR processes run without paperwork.',
  'Reports are generated instantly.',
  'Managers can track every department from one dashboard.',
  'Customers receive real-time updates automatically.',
  'Employee attendance and payroll are managed digitally.',
  'Business performance is visible through live dashboards.',
];

export default function BusinessAutomationHighlight() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          <Cpu size={14} className="animate-pulse" /> Business Automation Solutions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Automate Your Business. Eliminate Manual Work. <br />
          <span className="gradient-text">Scale Faster.</span>
        </h2>
        <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Running a business shouldn't mean wasting hours on repetitive tasks. Most businesses still depend on spreadsheets, manual follow-ups, paperwork, disconnected systems, and repetitive operations that slow growth and reduce productivity.
        </p>
      </div>

      {/* Main 2-Col Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Left: Problem + Vision */}
        <div className="flex flex-col gap-6">
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            At Kvantum Tech Solutions, we develop <strong className="text-zinc-200">intelligent business automation software</strong> that transforms the way organizations operate. Instead of managing everything manually, our automation solutions connect your departments, employees, customers, and business processes into one centralized platform.
          </p>

          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6">
            <h3 className="text-zinc-100 font-bold text-base font-headline mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-cyanCustom" />
              Imagine a Business Where:
            </h3>
            <ul className="flex flex-col gap-3">
              {visionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-400 text-sm leading-relaxed">
                  <CheckCircle2 size={14} className="text-cyanCustom shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-zinc-300 text-sm font-semibold text-center py-3 border border-cyanCustom/20 rounded-xl bg-cyanCustom/5">
            That's the power of business automation.
          </p>
        </div>

        {/* Right: Benefits */}
        <div className="flex flex-col gap-5">
          <h3 className="text-zinc-100 font-bold text-lg font-headline">Why Businesses Invest in Automation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {automationBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/8 hover:border-cyanCustom/30 hover:bg-cyanCustom/5 transition-all duration-200 group"
              >
                <CheckCircle2 size={14} className="text-cyanCustom shrink-0" />
                <span className="text-zinc-300 text-xs sm:text-sm group-hover:text-zinc-100 transition-colors">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Can We Automate Grid */}
      <div className="mb-16">
        <h3 className="text-zinc-100 font-bold text-xl font-headline text-center mb-8">What Can We Automate?</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {automationTargets.map((target, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/8 text-zinc-300 text-xs sm:text-sm hover:border-cyanCustom/40 hover:bg-cyanCustom/5 hover:text-cyanCustom hover:scale-[1.03] transition-all duration-300 cursor-default font-mono"
            >
              <CheckCircle2 size={12} className="text-cyanCustom shrink-0" />
              <span>{target}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 border border-white/10 p-10 text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-pinkCustom/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyanCustom/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-headline font-bold text-zinc-100 mb-3">
            Ready to Transform Your Business?
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Let's build software that works for your business — not the other way around.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer"
          >
            Book Your Free Software Consultation Today
          </button>
        </div>
      </div>

    </section>
  );
}
