import React from 'react';
import Badge from '../ui/Badge';

const row1Logos = [
  'TechCorp Enterprise', 'Apex Global Logistics', 'MediCare Systems', 'Luxe Hospitality',
  'Horizon Real Estate', 'EduPulse Academy', 'Nexus Retail', 'Vanguard Finance',
];

const row2Logos = [
  'Kvantum Automation', 'Metro Manufacturing', 'Zenith SaaS', 'Starlight Hotels',
  'Omega Cloud', 'Pulse Diagnostics', 'Urban Living Properties', 'Quantum Retail',
];

export default function TrustedBy() {
  return (
    <section className="bg-zinc-950/80 border-y border-white/8 py-14 select-none overflow-hidden">
      <div className="container mx-auto max-w-[1280px] px-6 mb-8 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold block">
          TRUSTED BY INNOVATIVE BUSINESSES & ENTERPRISES ACROSS NCR
        </span>
      </div>

      {/* Row 1: Right Moving Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-6 opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-right space-x-12 shrink-0">
          {row1Logos.concat(row1Logos).map((logo, idx) => (
            <div
              key={idx}
              className="px-6 py-3 rounded-xl bg-white/[0.02] border border-white/8 text-zinc-400 hover:text-white hover:border-pinkCustom/40 hover:bg-pinkCustom/10 transition-all duration-300 font-mono text-xs sm:text-sm font-bold tracking-wider cursor-pointer"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Left Moving Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-left space-x-12 shrink-0">
          {row2Logos.concat(row2Logos).map((logo, idx) => (
            <div
              key={idx}
              className="px-6 py-3 rounded-xl bg-white/[0.02] border border-white/8 text-zinc-400 hover:text-cyanCustom hover:border-cyanCustom/40 hover:bg-cyanCustom/10 transition-all duration-300 font-mono text-xs sm:text-sm font-bold tracking-wider cursor-pointer"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
