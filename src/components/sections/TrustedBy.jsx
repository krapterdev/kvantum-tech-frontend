import React from 'react';
import { Cpu, Globe, Layers, Shield, Zap } from 'lucide-react';

export default function TrustedBy() {
  const integrations = [
    { name: 'Vite / React', icon: Cpu },
    { name: 'Node / Express', icon: Zap },
    { name: 'MongoDB Atlas', icon: Layers },
    { name: 'Supabase Storage', icon: Shield },
    { name: 'AWS S3 Client', icon: Globe },
  ];

  // Duplicate items to ensure a seamless loop
  const listItems = [...integrations, ...integrations, ...integrations, ...integrations];

  return (
    <section className="bg-zinc-950/20 py-16 select-none overflow-hidden border-y border-white/5">
      <div className="container mx-auto max-w-[1280px] px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-zinc-100 mb-4">
          Trusted by Growing Businesses Across India
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
          From startups to established enterprises, businesses trust Kvantum Tech Solutions for reliable software development, business automation, CRM implementation, and digital transformation solutions.
        </p>
        
        <div className="w-full overflow-hidden relative flex py-2 MaskImage">
          {/* Faders/Gradients to blend edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background-dark/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background-dark/20 to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-16 md:gap-24 items-center opacity-40 hover:opacity-75 transition-opacity duration-300">
            {listItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 shrink-0">
                  <Icon size={16} className="text-pinkCustom" />
                  <span className="text-zinc-400 font-headline font-bold tracking-tight text-sm sm:text-base">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
