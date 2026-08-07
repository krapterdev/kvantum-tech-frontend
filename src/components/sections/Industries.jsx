import React from 'react';
import { Building2, Hotel, Heart, Factory, GraduationCap, ShoppingBag, Truck, Briefcase } from 'lucide-react';
import Badge from '../ui/Badge';

const industryList = [
  {
    id: 'manufacturing',
    name: 'MANUFACTURING',
    tag: 'Production & ERP',
    icon: Factory,
    color: 'text-sky-500',
    desc: 'Production planning, raw material stock alerts, batch tracking, procurement and operational workflows.',
    highlights: ['Production Tracking', 'Procurement ERP', 'Vendor Ledgers'],
  },
  {
    id: 'healthcare',
    name: 'HEALTHCARE & CLINICS',
    tag: 'Medical Systems',
    icon: Heart,
    color: 'text-pink-500',
    desc: 'Patient appointment workflows, health records, lab report dispatch, pharmacy stock, and OPD/IPD systems.',
    highlights: ['Patient Records', 'Lab Report Automation', 'Doctor Scheduling'],
  },
  {
    id: 'real-estate',
    name: 'REAL ESTATE',
    tag: 'Property CRM',
    icon: Building2,
    color: 'text-purple-500',
    desc: 'Lead capture from property portals, site visit scheduling, agent pipeline tracking, and buyer follow-ups.',
    highlights: ['Site Visit Automation', 'Agent Pipelines', 'Property Catalogs'],
  },
  {
    id: 'education',
    name: 'EDUCATION & INSTITUTES',
    tag: 'Campus ERP',
    icon: GraduationCap,
    color: 'text-emerald-500',
    desc: 'Student admission funnels, fee collection reminders, attendance tracking, staff and administrative workflows.',
    highlights: ['Fee Gateways', 'Parent Alerts', 'LMS & Records'],
  },
  {
    id: 'retail',
    name: 'RETAIL & ECOMMERCE',
    tag: 'Store & Fulfillment',
    icon: ShoppingBag,
    color: 'text-cyan-500',
    desc: 'Multi-channel orders, customer management, inventory synchronization across locations, and fulfillment.',
    highlights: ['Multi-Store Sync', 'Order Automation', 'Inventory POS'],
  },
  {
    id: 'logistics',
    name: 'LOGISTICS & FLEET',
    tag: 'Fleet & Warehouse',
    icon: Truck,
    color: 'text-amber-500',
    desc: 'Shipment tracking, fleet operations, multi-warehouse stock control, dispatching, and delivery logistics.',
    highlights: ['Shipment Tracking', 'Warehouse Control', 'Fleet Dispatch'],
  },
  {
    id: 'hospitality',
    name: 'HOSPITALITY & HOTELS',
    tag: 'Hotel Automation',
    icon: Hotel,
    color: 'text-pink-500',
    desc: 'Room reservation engines, guest check-in/out, staff assignment, restaurant POS, and operational workflows.',
    highlights: ['Booking Engines', 'Front Desk POS', 'Guest CRM'],
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL SERVICES',
    tag: 'Agency & Services',
    icon: Briefcase,
    color: 'text-sky-500',
    desc: 'CRM pipelines, project milestone tracking, time logs, client document portals, and automated billing.',
    highlights: ['Client Portals', 'Automated Invoicing', 'Project Timelines'],
  },
];

export default function Industries() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
          Industries We Serve
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Software Designed for the Way Your Industry Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Different industries require different workflows, integrations, compliance considerations, and user experiences. We adapt our software development approach to your operational environment rather than applying the same solution everywhere.
        </p>
      </div>

      {/* 8 Rich Industry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {industryList.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-6 cursor-pointer group shadow-md dark:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center ${ind.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-500 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
                  {ind.desc}
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 dark:border-white/8 pt-4">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">Key Modules:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ind.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/8 px-2 py-0.5 rounded-md">
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
