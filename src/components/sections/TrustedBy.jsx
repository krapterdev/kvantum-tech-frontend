import React from 'react';
import { Factory, Heart, Home, ShoppingBag, GraduationCap, Briefcase, Rocket, Building2 } from 'lucide-react';

const industries = [
  'Startups', 'Small Businesses', 'Enterprises', 'Manufacturing Companies',
  'Healthcare', 'Hotels', 'Real Estate', 'Education',
  'Retail', 'Logistics', 'Finance', 'Construction',
];

export default function TrustedBy() {
  // Duplicate for seamless marquee loop
  const marqueeItems = [...industries, ...industries, ...industries];

  return (
    <section className="bg-zinc-950/20 py-20 select-none overflow-hidden border-y border-white/5">
      <div className="container mx-auto max-w-[1280px] px-6 text-center">

        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-zinc-100 mb-4">
          Trusted by Businesses That Believe in Innovation
        </h2>
        <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-4">
          Growing businesses choose Kvantum Tech Solutions to build powerful software that improves efficiency, automates daily operations, and drives measurable business growth.
        </p>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed mb-10">
          From startups to established enterprises, our solutions help organizations manage customers, employees, operations, and business processes through reliable technology.
        </p>

        {/* Businesses We Serve Label */}
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">
          Businesses We Serve
        </p>

        {/* Industry Marquee */}
        <div className="w-full overflow-hidden relative flex py-2">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950/20 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-10 md:gap-16 items-center opacity-60 hover:opacity-90 transition-opacity duration-300">
            {marqueeItems.map((industry, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-pinkCustom"></div>
                <span className="text-zinc-300 font-headline font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
