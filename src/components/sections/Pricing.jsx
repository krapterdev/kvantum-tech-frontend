import React from 'react';
import { useSafeNavigate as useNavigate } from '@/utils/navigation';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Check, X } from 'lucide-react';
import Badge from '../ui/Badge';

const models = [
  {
    id: 'fixed-scope',
    name: 'FIXED-SCOPE',
    tagline: 'Clearly defined requirements and deliverables',
    badge: 'Project Based',
    badgeStyle: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    popular: false,
    features: [
      { text: 'Fixed Scope & Milestone Roadmap', inc: true },
      { text: 'Dedicated Project Manager & Developers', inc: true },
      { text: 'Full Source Code Ownership', inc: true },
      { text: 'Quality Assurance & Automated Testing', inc: true },
      { text: 'Post-Launch Warranty Support', inc: true },
      { text: 'Ongoing Unscoped Retainer', inc: false },
    ],
  },
  {
    id: 'dedicated',
    name: 'DEDICATED TEAM',
    tagline: 'Ongoing engineering capacity for scaling teams',
    badge: 'Popular',
    badgeStyle: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    popular: false,
    features: [
      { text: 'Dedicated Full-Stack Software Engineers', inc: true },
      { text: 'Agile Sprint Planning & Daily Standups', inc: true },
      { text: 'Direct Developer Slack / WhatsApp Sync', inc: true },
      { text: 'Continuous Feature Releases & Updates', inc: true },
      { text: '100% Flexible Monthly Scaling', inc: true },
      { text: 'Fixed Rigid Deliverable Lock', inc: false },
    ],
  },
  {
    id: 'custom-product',
    name: 'CUSTOM PRODUCT',
    tagline: 'Complex SaaS products, ERPs & core platforms',
    badge: 'MOST POPULAR',
    badgeStyle: 'bg-pink-500 text-white font-bold border-pink-500 shadow-lg shadow-pink-500/20',
    popular: true,
    features: [
      { text: 'Custom Enterprise System Architecture', inc: true },
      { text: 'Custom CRM, HRMS or ERP Engine', inc: true },
      { text: 'Scalable Microservices & Cloud Infrastructure', inc: true },
      { text: 'Full API & Third-Party System Integrations', inc: true },
      { text: '100% Code Ownership & Zero License Fees', inc: true },
      { text: 'Shared Resource Constraints', inc: false },
    ],
  },
  {
    id: 'automation',
    name: 'AUTOMATION ENGINE',
    tagline: 'Connect disconnected systems & workflows',
    badge: 'Workflow Engine',
    badgeStyle: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    popular: false,
    features: [
      { text: 'Lead Capture & Assignment Triggers', inc: true },
      { text: 'WhatsApp, Email & SMS Automated Messaging', inc: true },
      { text: 'Approval Workflows & Auto Invoicing', inc: true },
      { text: 'System-to-System Data Synchronization', inc: true },
      { text: 'Real-Time Management Dashboards', inc: true },
      { text: 'Manual Spreadsheet Updates', inc: false },
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400">
          <Sparkles size={14} /> Engagement Models
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          A Development Model That Fits Your Project
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Every software project has different requirements, complexity, timelines, and technical challenges. That's why we offer flexible engagement models instead of forcing every business into a standard package.
        </p>
      </div>

      {/* 4 Pricing Tiers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
        {models.map((tier) => (
          <div
            key={tier.id}
            className={`p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border transition-all duration-300 flex flex-col justify-between text-left relative backdrop-blur-2xl ${
              tier.popular
                ? 'border-pink-500/50 shadow-xl shadow-pink-500/10 scale-[1.02] z-20'
                : 'border-slate-200 dark:border-white/10 z-10'
            }`}
          >
            {/* Top Badge */}
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${tier.badgeStyle}`}>
                {tier.badge}
              </span>
              {tier.popular && (
                <span className="text-[10px] font-mono text-pink-500 font-bold flex items-center gap-1">
                  <Zap size={12} /> FEATURED
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h3 className="text-xl font-headline font-extrabold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs min-h-[32px] leading-relaxed">{tier.tagline}</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 border-t border-slate-100 dark:border-white/8 pt-5 my-4 flex-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">Key Highlights:</span>
              {tier.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  {feat.inc ? (
                    <Check size={14} className="text-sky-500 shrink-0 mt-0.5" />
                  ) : (
                    <X size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={feat.inc ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600 line-through'}>{feat.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('contact') || document.getElementById('contact-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4 ${
                tier.popular
                  ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-md shadow-pink-500/20'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15'
              }`}
            >
              Discuss Estimate <ArrowRight size={14} />
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
