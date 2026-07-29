import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const features = [
  'Workflow Automation',
  'WhatsApp API Integration',
  'Email Automation',
  'SMS Notification Alerts',
  'Lead Assignment Rules',
  'Multi-department Workflows',
  'CRM Pipeline Automation',
  'Auto Invoice Dispatch',
  'Attendance & Leave Automation',
  'Payroll Auto-Calculation',
  'Task Reminders & Escalations',
  'Sales Target Tracking',
  'Customer Follow-up Sequences',
  'Report Scheduling',
  'API & Third-party Integrations',
  'Google Sheets Sync',
  'Multi-channel Campaign Runs',
  'Real-time Dashboards',
  'Role-Based Access Control',
  'Secure Cloud Data Storage',
];

export default function AutomationFeatures() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Feature Set
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Everything You Need to <br />
          <span className="gradient-text">Automate Your Business</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Our automation software is packed with powerful features that handle every area of your business — from sales and HR to communication and reporting.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.02] border border-white/8 hover:border-cyanCustom/30 hover:bg-cyanCustom/5 hover:scale-[1.01] transition-all duration-200 cursor-default group"
          >
            <CheckCircle2 size={16} className="text-cyanCustom shrink-0 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-zinc-300 text-xs sm:text-sm font-medium group-hover:text-zinc-100 transition-colors duration-200">{feature}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
