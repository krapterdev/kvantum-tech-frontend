import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Projects from '@/components/sections/Projects';

export default function ProjectsPage({ portfolios = [] }) {
  return (
    <div className="space-y-16">
      
      {/* Page Header */}
      <div className="container mx-auto max-w-[1280px] px-6 pt-8 text-center select-none">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
          <Sparkles size={14} /> Proven Deliverables
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          FEATURED PORTFOLIO & <br />
          <span className="gradient-text">CLIENT CASE STUDIES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base">
          Explore custom software applications, enterprise CRMs, WhatsApp automation bots, and web platforms built by Kvantum Tech.
        </p>
      </div>

      {/* Projects Gallery Component */}
      <Projects />

    </div>
  );
}
