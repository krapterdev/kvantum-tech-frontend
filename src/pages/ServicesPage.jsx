import React, { useState } from 'react';
import { Layers, Code, Database, Cpu, MessageSquare, Smartphone, Shield, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const serviceOfferings = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    category: 'Engineering',
    icon: Code,
    desc: 'Bespoke web applications, SaaS platforms, and enterprise software built specifically for your business processes. Zero template bloat, 100% source code ownership.',
    deliverables: ['React & Full-Stack Architecture', '100% Source Code Rights', 'Zero Recurring License Fees', 'Custom API Integrations', 'High Concurrency Databases'],
  },
  {
    id: 'business-automation',
    title: 'Business Process Automation',
    category: 'Automation',
    icon: Cpu,
    desc: 'Eliminate repetitive manual tasks across sales, operations, and customer support with intelligent workflow automation engines.',
    deliverables: ['Lead Qualification Funnels', 'Automated Quotations & Invoicing', 'WhatsApp & Email Drip Bot', 'Cross-Platform Data Sync', 'Audit Trail Logging'],
  },
  {
    id: 'crm-systems',
    title: 'Custom CRM Software Systems',
    category: 'Sales Tech',
    icon: Database,
    desc: 'Manage lead pipelines, team performance, client communications, and automated sales follow-ups from a single unified dashboard.',
    deliverables: ['Visual Pipeline Stages', 'Sales Rep Scoring', 'WhatsApp & Call Sync', 'Automated Lead Routing', 'Revenue Forecasting'],
  },
  {
    id: 'hrms-payroll',
    title: 'HRMS & Automated Payroll',
    category: 'Enterprise Ops',
    icon: Shield,
    desc: 'Streamline employee onboarding, biometric attendance, leave approvals, automated salary slip generation, and compliance reporting.',
    deliverables: ['Biometric Attendance Sync', 'Automated Payroll Engine', 'Leave & Asset Tracking', 'PF / ESI Compliance', 'Employee Self-Service App'],
  },
  {
    id: 'whatsapp-api',
    title: 'WhatsApp Business API Bot',
    category: 'Messaging Tech',
    icon: MessageSquare,
    desc: 'Engage leads under 5 seconds with automated Meta WhatsApp bots, instant PDF proposal dispatch, appointment scheduling, and order status updates.',
    deliverables: ['Meta WhatsApp API Integration', 'Instant Proposal PDF Bot', '24/7 Interactive Menu', 'Bulk Broadcast Campaigns', 'Live Agent Handoff'],
  },
  {
    id: 'web-mobile-apps',
    title: 'Web & Mobile Applications',
    category: 'App Dev',
    icon: Smartphone,
    desc: 'High-performance React web applications and Flutter iOS/Android mobile apps designed for speed, security, and exceptional user experience.',
    deliverables: ['React & Full-Stack Web Apps', 'iOS & Android Native Apps', 'REST & GraphQL APIs', 'PWA Offline Mode', 'App Store & Play Store Deployment'],
  },
];

export default function ServicesPage({ services = [] }) {
  const [selectedService, setSelectedService] = useState(serviceOfferings[0]);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Layers size={14} /> Comprehensive Service Architecture
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          ENTERPRISE SOFTWARE & <br />
          <span className="gradient-text">AUTOMATION CAPABILITIES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore our core software development offerings, automated sales funnels, and enterprise ERP solutions built for high-scale operations.
        </p>
      </div>

      {/* Services Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceOfferings.map((offering) => {
          const Icon = offering.icon;
          return (
            <div
              key={offering.id}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between gap-6 hover:border-sky-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-zinc-700">
                    {offering.category}
                  </span>
                </div>

                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors">
                  {offering.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {offering.desc}
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 dark:border-zinc-800 pt-4">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 font-bold">Key Deliverables:</span>
                {offering.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Service Details Accordion Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-600 dark:text-pink-400 uppercase tracking-widest font-bold mb-4">
          <Zap size={16} /> Interactive Service Inspector
        </div>
        <h3 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-6">Select a Service to Inspect Specifications</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selector Tabs */}
          <div className="flex flex-col gap-2">
            {serviceOfferings.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedService(item)}
                className={`p-4 rounded-2xl text-left font-headline font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  selectedService.id === item.id
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/30'
                }`}
              >
                <span>{item.title}</span>
                <ArrowRight size={14} />
              </button>
            ))}
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between gap-6 shadow-md">
            <div>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase font-bold tracking-widest block mb-1">
                Selected Service Specs:
              </span>
              <h4 className="text-2xl font-headline font-bold text-slate-900 dark:text-white mb-3">{selectedService.title}</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">{selectedService.desc}</p>
              
              <h5 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-3 font-bold">Standard Features:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-sky-500 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3.5 px-6 rounded-xl bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 transition-colors shadow-md self-start cursor-pointer"
            >
              Request Quote for {selectedService.title} →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
