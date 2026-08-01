import React, { useState } from 'react';
import { Building2, Hotel, Heart, Factory, GraduationCap, ShoppingBag, Truck, HardHat, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

const industryList = [
  {
    id: 'hotels',
    name: 'HOTELS & HOSPITALITY',
    tag: 'Hotel Automation',
    icon: Hotel,
    color: 'text-pinkCustom',
    desc: 'Automated room reservations, guest check-in, billing, restaurant POS, and WhatsApp feedback loops.',
    highlights: ['Room & Booking Engine', 'Restaurant POS Sync', 'Guest CRM & Billing'],
  },
  {
    id: 'real-estate',
    name: 'REAL ESTATE',
    tag: 'Property CRM',
    icon: Building2,
    color: 'text-cyanCustom',
    desc: 'Lead capture from portals, automated site visit scheduling, agent pipeline tracking, and buyer follow-ups.',
    highlights: ['Site Visit Automation', 'Agent Performance', 'Property Catalog'],
  },
  {
    id: 'healthcare',
    name: 'HEALTHCARE & CLINICS',
    tag: 'Medical Systems',
    icon: Heart,
    color: 'text-purpleCustom',
    desc: 'OPD/IPD patient management, lab report dispatch via WhatsApp, pharmacy inventory, and doctor booking.',
    highlights: ['Patient Health Records', 'WhatsApp Lab Reports', 'Pharmacy POS'],
  },
  {
    id: 'manufacturing',
    name: 'MANUFACTURING',
    tag: 'Industrial ERP',
    icon: Factory,
    color: 'text-emerald-400',
    desc: 'Procurement tracking, raw material stock alerts, production line logging, and vendor ledger management.',
    highlights: ['Raw Material Control', 'Vendor PO System', 'Production P&L'],
  },
  {
    id: 'education',
    name: 'EDUCATION & INSTITUTES',
    tag: 'School & Institute ERP',
    icon: GraduationCap,
    color: 'text-amber-400',
    desc: 'Student admission funnels, fee payment reminders, attendance tracking, and parent communication apps.',
    highlights: ['Online Fee Gateway', 'Parent WhatsApp Bot', 'LMS & Exams'],
  },
  {
    id: 'ecommerce',
    name: 'RETAIL & ECOMMERCE',
    tag: 'Ecommerce Automation',
    icon: ShoppingBag,
    color: 'text-pinkCustom',
    desc: 'Multi-channel order fulfillment, abandoned cart recovery, stock sync across marketplaces, and shipping APIs.',
    highlights: ['Cart Recovery Bot', 'Multi-Store Sync', 'Automated Invoicing'],
  },
];

export default function Industries() {
  const [activeInd, setActiveInd] = useState(industryList[0]);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Industries We Serve
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Empowering Every Industry with <br />
          <span className="gradient-text">Custom Software & Automation</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We build industry-specific custom software, CRM platforms, HRMS platforms, and ERP solutions tailored to your unique operational requirements.
        </p>
      </div>

      {/* Industry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryList.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyanCustom/40 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between gap-6 cursor-pointer group backdrop-blur-xl hover:-translate-y-1.5 shadow-xl"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${ind.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 text-zinc-400 bg-white/5">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="text-xl font-headline font-bold text-zinc-100 mb-2 leading-snug group-hover:text-cyanCustom transition-colors">
                  {ind.name}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {ind.desc}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/8 pt-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Modules Automated:</span>
                <div className="flex flex-wrap gap-2">
                  {ind.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="text-[11px] font-mono text-zinc-300 bg-white/[0.03] border border-white/8 px-2.5 py-1 rounded-lg">
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
