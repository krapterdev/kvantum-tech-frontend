import React from 'react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Services from '@/components/sections/Services';
import BusinessAutomationHighlight from '@/components/sections/BusinessAutomationHighlight';
import SoftwareProducts from '@/components/sections/SoftwareProducts';

export default function ServicesPage({ services = [] }) {
  return (
    <div className="space-y-16">
      
      {/* Page Header */}
      <div className="container mx-auto max-w-[1280px] px-6 pt-8 text-center select-none">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Layers size={14} /> Comprehensive Engineering Portfolio
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          ENTERPRISE SOFTWARE & <br />
          <span className="gradient-text">AUTOMATION CAPABILITIES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base">
          From custom software development to automated lead funnels and enterprise ERP platforms, we deliver secure, scalable digital products.
        </p>
      </div>

      {/* Services Section */}
      <Services services={services} />

      {/* Signature Automation Workflow Diagram */}
      <BusinessAutomationHighlight />

      {/* Software Products Showcase */}
      <SoftwareProducts />

    </div>
  );
}
