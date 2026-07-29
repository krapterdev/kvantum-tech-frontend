import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const features = [
  'Workflow Automation',
  'Lead Assignment Automation',
  'Customer Follow-up Automation',
  'WhatsApp Automation',
  'Email Automation',
  'SMS Automation',
  'Invoice Automation',
  'Payment Reminder Automation',
  'Employee Attendance Automation',
  'Payroll Automation',
  'Leave Approval Automation',
  'HR Workflow Automation',
  'Task Assignment Automation',
  'Role-Based Access Control',
  'Real-Time Notifications',
  'CRM Automation',
  'ERP Integration',
  'API Integrations',
  'Inventory Automation',
  'Purchase Order Automation',
  'Sales Pipeline Automation',
  'Quotation Generation',
  'Analytics Dashboard',
  'Business Intelligence Reports',
  'Cloud Backup',
  'Data Security',
  'Mobile Accessibility',
  'Multi-User Management',
  'Document Management',
  'Customer Support Automation',
];

export default function AutomationFeatures() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Automation Features
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Intelligent Automation Features That <br />
          <span className="gradient-text">Save Time & Increase Productivity</span>
        </h2>
        <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Our automation solutions eliminate repetitive work and allow your team to focus on what matters most — growing your business.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/8 hover:border-cyanCustom/30 hover:bg-cyanCustom/5 hover:scale-[1.02] transition-all duration-200 cursor-default group"
          >
            <CheckCircle2 size={14} className="text-cyanCustom shrink-0 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-zinc-300 text-xs font-medium group-hover:text-zinc-100 transition-colors duration-200 leading-snug">{feature}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
