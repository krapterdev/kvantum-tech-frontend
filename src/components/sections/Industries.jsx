import React from 'react';
import { Building2, Hotel, Heart, Factory, GraduationCap, ShoppingBag, Truck, Briefcase } from 'lucide-react';
import Badge from '../ui/Badge';

const industryList = [
  { name: 'Manufacturing', desc: 'Production, inventory, procurement and operations.', icon: Factory, color: 'text-sky-500' },
  { name: 'Healthcare', desc: 'Patient workflows, appointments and management systems.', icon: Heart, color: 'text-pink-500' },
  { name: 'Real Estate', desc: 'Lead, property, follow-up and sales management.', icon: Building2, color: 'text-purple-500' },
  { name: 'Education', desc: 'Student, staff, fee and administration systems.', icon: GraduationCap, color: 'text-emerald-500' },
  { name: 'Retail & Ecommerce', desc: 'Orders, customers, inventory and fulfillment.', icon: ShoppingBag, color: 'text-cyan-500' },
  { name: 'Logistics', desc: 'Shipment, fleet, warehouse and delivery operations.', icon: Truck, color: 'text-amber-500' },
  { name: 'Hospitality', desc: 'Reservations, guests, staff and operational workflows.', icon: Hotel, color: 'text-pink-500' },
  { name: 'Professional Services', desc: 'CRM, projects, billing, documents and client management.', icon: Briefcase, color: 'text-sky-500' },
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

      {/* 8 Industry Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {industryList.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-4 cursor-default group shadow-md dark:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center ${ind.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-500 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
