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

  return (
    <section className="border-y border-white/8 bg-zinc-950/20 py-8 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">
        <p className="text-zinc-500 font-mono text-[10px] text-center uppercase tracking-[0.2em] mb-6">
          Our Core Technology Stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 hover:opacity-75 transition-opacity duration-300">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2">
                <Icon size={16} className="text-emerald-500" />
                <span className="text-zinc-400 font-headline font-bold tracking-tight text-sm sm:text-base">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
