import React from 'react';
import { Building2, ShieldCheck, Zap, Globe, Layers, Cpu, Compass, Activity } from 'lucide-react';

const row1Logos = [
  { name: 'Apex Logistics', icon: Compass, code: 'APX-GLOBAL' },
  { name: 'MediCare Health', icon: Activity, code: 'MED-SYS' },
  { name: 'Luxe Hospitality', icon: Building2, code: 'LUXE-HOTELS' },
  { name: 'Horizon Real Estate', icon: Globe, code: 'HORIZON-RE' },
  { name: 'Vanguard Capital', icon: ShieldCheck, code: 'VANGUARD-FIN' },
  { name: 'TechCorp Enterprise', icon: Cpu, code: 'TECHCORP-INC' },
];

const row2Logos = [
  { name: 'Metro Manufacturing', icon: Layers, code: 'METRO-MFG' },
  { name: 'Zenith SaaS', icon: Zap, code: 'ZENITH-CLOUD' },
  { name: 'Starlight Resorts', icon: Building2, code: 'STARLIGHT-RES' },
  { name: 'Omega Cloud Systems', icon: Cpu, code: 'OMEGA-NET' },
  { name: 'Urban Living Properties', icon: Globe, code: 'URBAN-RE' },
  { name: 'Quantum Retail', icon: Activity, code: 'QUANTUM-POS' },
];

export default function TrustedBy() {
  return (
    <section className="bg-slate-50 dark:bg-zinc-950/90 border-y border-slate-200 dark:border-white/8 py-16 select-none overflow-hidden relative z-10">
      <div className="container mx-auto max-w-[1280px] px-6 mb-10 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400 font-bold block mb-2">
          TRUSTED BY INNOVATIVE BUSINESSES & ENTERPRISES
        </span>
        <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-zinc-100">
          Powering Operations for High-Growth Companies
        </h3>
      </div>

      {/* Row 1: Right Moving Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-6 opacity-90 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-right space-x-6 shrink-0">
          {row1Logos.concat(row1Logos).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="px-7 py-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-pink-500/50 transition-all duration-300 flex items-center gap-3 cursor-pointer group shadow-sm dark:shadow-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400 group-hover:text-pink-500 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <span className="text-xs font-headline font-bold text-slate-900 dark:text-zinc-200 group-hover:text-pink-500 transition-colors block">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-500 block">
                    {item.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Left Moving Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-left space-x-6 shrink-0">
          {row2Logos.concat(row2Logos).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="px-7 py-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-sky-500/50 transition-all duration-300 flex items-center gap-3 cursor-pointer group shadow-sm dark:shadow-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400 group-hover:text-sky-500 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <span className="text-xs font-headline font-bold text-slate-900 dark:text-zinc-200 group-hover:text-sky-500 transition-colors block">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-500 block">
                    {item.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
