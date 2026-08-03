import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Code, Database, Cpu, MessageSquare, Smartphone, Shield, ArrowRight, 
  CheckCircle2, Zap, Award, PhoneCall, Mail, MapPin, Sparkles, Star, ChevronRight, Check
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import FAQ, { servicesFaqs } from '@/components/sections/FAQ';
import { fallbackServices } from '@/data/services';

const defaultDeliverablesMap = {
  'custom-software-development': ['100% Custom Source Code Rights', 'Zero Template Bloat & Recurring Fees', 'Custom REST & GraphQL API Engine', 'High Concurrency Database Architecture', 'Bank-Grade Security & Encryption'],
  'crm-software-development': ['Visual Pipeline & Lead Stages', 'Sales Rep Performance Analytics', 'WhatsApp & Phone Call Integration', 'Automated Lead Assignment Engine', 'Invoice & Quotation Generator'],
  'business-automation': ['Lead Qualification Webhooks', 'Automated Invoicing & Tax Calculations', 'Cross-Platform Data Sync (Zapier/Make)', '24/7 Workflow Audit Trail Logs', 'Eliminate 95% Manual Data Entry'],
  'hrms-software': ['Biometric Attendance & Leave Sync', 'Automated Salary & Payslip Engine', 'PF / ESI Compliance Reporting', 'Employee Self-Service Dashboard', 'Asset & Onboarding Tracking'],
  'whatsapp-automation': ['Meta WhatsApp Official API Integration', 'Instant Proposal PDF Dispatch Bot', '24/7 Automated Interactive Menu', 'Bulk Broadcast Campaign Scheduler', 'Live Agent Desk Handoff'],
  'web-mobile-app-development': ['React & Full-Stack Web Applications', 'iOS & Android Native App Builds', 'High-Speed PageSpeed Optimization', 'PWA Offline Mode Support', 'App Store & Play Store Publishing']
};

const iconMap = {
  Settings: Code,
  Code: Code,
  Users: Database,
  Database: Database,
  Cpu: Cpu,
  Layers: Shield,
  Shield: Shield,
  MessageSquare: MessageSquare,
  Smartphone: Smartphone
};

export default function ServicesPage({ services = [] }) {
  // Use dynamic services if available, otherwise fall back to fallbackServices
  const activeServicesList = Array.isArray(services) && services.length > 0 ? services : fallbackServices;

  const [selectedServiceId, setSelectedServiceId] = useState(activeServicesList[0]?.id || 'custom-software-development');

  const selectedService = activeServicesList.find(s => s.id === selectedServiceId) || activeServicesList[0];

  return (
    <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 py-10 text-left select-none space-y-20">

      {/* HERO SECTION: EXCELLENCE IN EVERY SERVICE (INSPIRED BY REFERENCE IMAGE) */}
      <div className="rounded-[36px] bg-slate-900 text-white dark:bg-zinc-950 border border-slate-800 p-8 sm:p-14 shadow-2xl relative overflow-hidden space-y-10">
        
        {/* Top Floating Glow Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Top Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column (7 Cols): Excellence Headline & Subtitle */}
          <div className="lg:col-span-7 space-y-6">
            <Badge className="bg-sky-500/10 border-sky-500/30 text-sky-400 font-mono text-xs px-4 py-1.5 inline-flex items-center gap-2">
              <Award size={14} className="text-sky-400" /> EXCELLENCE IN EVERY SERVICE
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black font-headline text-white uppercase leading-none tracking-tight">
              YOUR PARTNER IN QUALITY & <br />
              <span className="gradient-text">DIGITAL INNOVATION</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              We engineer custom software, automate repetitive business workflows, and build high-concurrency web & mobile platforms designed around real enterprise requirements.
            </p>

            {/* Quick Metrics Counter Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-headline text-sky-400 block">100+</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Custom Systems</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-headline text-emerald-400 block">99.9%</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">System SLA Uptime</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-headline text-pink-400 block">95%</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Manual Hours Saved</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): WHY US & LIMITED TIME OFFER PROMO CARD (INSPIRED BY REF IMAGE) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Why Us Card */}
            <div className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
                <Sparkles size={16} /> WHY US?
              </div>
              <h3 className="text-xl font-headline font-bold text-white leading-snug">
                Trusted Software Experts Dedicated to Delivering Exceptional Results
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                Innovative software solutions, 100% source code ownership, zero reseller locks, and direct senior engineer support.
              </p>
            </div>

            {/* LIMITED TIME OFFER PROMO BADGE (INSPIRED BY REF IMAGE "GET 20% OFF") */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-sky-500/20 border border-pink-500/40 shadow-xl flex items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-pink-500 text-white font-bold uppercase inline-block">
                  Get 20% Off
                </span>
                <h4 className="text-sm font-headline font-bold text-white">On Your First Service Order!</h4>
                <p className="text-[11px] text-slate-300 font-mono">Limited time architectural audit offer.</p>
              </div>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-md shrink-0"
              >
                Claim Offer →
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* SERVICES OFFERED SECTION (NUMBERED 01, 02, 03 CARDS - INSPIRED BY REF IMAGE) */}
      <div className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-6">
          <div>
            <Badge className="mb-2 inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
              <Layers size={14} /> Full Capability Suite
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black font-headline text-slate-900 dark:text-white uppercase leading-none">
              SERVICES OFFERED
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-mono max-w-md">
            Click on any service card below to inspect deliverables, tech stack specifications, and request custom quotes.
          </p>
        </div>

        {/* Numbered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServicesList.map((service, index) => {
            const numStr = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;
            const IconComp = iconMap[service.iconName] || Code;
            const deliverables = defaultDeliverablesMap[service.id] || [
              'Custom Architecture & Code Rights',
              'High Concurrency & Low Latency',
              'Tailor-made Business Process Sync',
              'Comprehensive Security Audit'
            ];

            return (
              <div
                key={service.id}
                className="p-8 rounded-[32px] bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between gap-6 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1.5 text-left relative"
              >
                <div>
                  {/* Top Row: Number Badge (01, 02, 03) & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Number Badge (Ref Image 01, 02 style) */}
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center font-mono text-lg font-black shadow-md group-hover:bg-pink-500 group-hover:text-white transition-colors">
                      {numStr}
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp size={22} />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <Link to={`/services/${service.id}`} className="block group-hover:text-sky-500 transition-colors">
                    <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white leading-snug mb-3">
                      {service.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {service.shortDesc || service.longDesc}
                  </p>

                  {/* Tech Stack Pills */}
                  {service.techStack && (
                    <div className="mb-6">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Tech Stack & Frameworks:</span>
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-sky-600 dark:text-sky-400">
                        {service.techStack.split(',').map((tech, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 font-bold">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deliverables List */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-zinc-800 pt-4">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 font-bold">Key Capabilities:</span>
                    {deliverables.slice(0, 3).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <Link
                  to={`/services/${service.id}`}
                  className="w-full py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-slate-900 dark:text-slate-200 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
                >
                  Inspect Service Specs <ArrowRight size={14} />
                </Link>

              </div>
            );
          })}
        </div>

      </div>

      {/* INTERACTIVE SERVICE SPECIFICATIONS INSPECTOR */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-slate-50 dark:bg-zinc-950/90 border border-slate-200 dark:border-zinc-800 shadow-2xl space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <Badge className="bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
              <Zap size={14} /> Real-Time Inspector
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
              Interactive Service Inspector
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-mono text-left">
            Select a service from the left menu to view detailed technical specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Selection Menu (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {activeServicesList.map((item, idx) => {
              const numStr = (idx + 1) < 10 ? `0${idx + 1}` : `${idx + 1}`;
              const isSelected = selectedService.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedServiceId(item.id)}
                  className={`p-4 rounded-2xl font-headline font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-lg'
                      : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isSelected ? 'text-white' : 'text-slate-400'}`}>{numStr}</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <ChevronRight size={16} className={isSelected ? 'translate-x-1 transition-transform' : 'opacity-40'} />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Specs View (8 Cols) */}
          <div className="lg:col-span-8 p-8 rounded-[32px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between gap-6">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase font-bold tracking-widest block mb-1">
                    Technical Specifications:
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900 dark:text-white">
                    {selectedService.title}
                  </h4>
                </div>
                {selectedService.metrics && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                    ✓ {selectedService.metrics}
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {selectedService.longDesc || selectedService.shortDesc}
              </p>

              {selectedService.techStack && (
                <div>
                  <h5 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                    Architectural Stack:
                  </h5>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs font-mono text-sky-600 dark:text-sky-300 font-bold">
                    {selectedService.techStack}
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-3 font-bold">
                  Core Engineering Deliverables:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(defaultDeliverablesMap[selectedService.id] || [
                    '100% Custom Source Code Rights',
                    'High Concurrency Database Sync',
                    'Zero License Fees',
                    'REST & GraphQL API Endpoints'
                  ]).map((d, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-sky-500 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Ready to discuss your project requirements?
              </span>
              <Link
                to="/contact"
                className="py-3 px-6 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-md shrink-0"
              >
                Request Quote for {selectedService.title} →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* QUICK CONTACT DIRECT ACCESS BANNER (INSPIRED BY REFERENCE IMAGE FOOTER) */}
      <div className="p-8 sm:p-10 rounded-[32px] bg-slate-900 text-white dark:bg-zinc-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        <div className="space-y-2 max-w-xl">
          <Badge className="bg-sky-500/10 border-sky-500/30 text-sky-400 font-mono text-xs">
            <PhoneCall size={14} /> Direct Communications Desk
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight">
            CONTACT US DIRECTLY
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            Connect with our engineering consultation team for immediate project inquiries and cost estimates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-xs text-slate-300 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <PhoneCall size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">HOTLINE PHONE</span>
              <a href="tel:+919811661828" className="text-white font-bold hover:text-sky-400 transition-colors">+91 9811661828</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">SUPPORT INBOX</span>
              <a href="mailto:info@kvantumtechsolutions.com" className="text-white font-bold hover:text-pink-400 transition-colors">info@kvantumtechsolutions.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Specific FAQ */}
      <FAQ items={servicesFaqs} title="Services & Capabilities" subtitle="Frequently Asked Questions" />

    </div>
  );
}
