import React from 'react';
import Badge from '../ui/Badge';

const statsData = [
  { value: '250+', label: 'PROJECTS DELIVERED', sub: 'Across custom CRM, HRMS, ERP & automation' },
  { value: '100+', label: 'HAPPY CLIENTS', sub: 'Trust Kvantum Tech Solutions to manage their tech' },
  { value: '98%', label: 'SATISFACTION RATE', sub: 'Proven operational ROI & client retention' },
  { value: '24/7', label: 'SUPPORT & MONITORING', sub: 'Direct developer access & SLA response' },
];

export default function Stats() {
  return (
    <section className="bg-zinc-950/80 border-y border-white/8 py-24 select-none text-left relative z-10">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            Proven Performance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
            Trusted by Businesses. <br />
            <span className="gradient-text">Proven by Real Results.</span>
          </h2>
        </div>

        {/* Minimal Huge Animated Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-pinkCustom/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-5xl sm:text-6xl font-black font-headline gradient-text block mb-2 tracking-tight">
                  {stat.value}
                </span>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-2">
                  {stat.label}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
