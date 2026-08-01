import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Badge from '../ui/Badge';

const pricingTiers = [
  {
    id: 'basic',
    name: 'BASIC',
    tagline: 'Ideal for small sites & basic maintenance',
    price: '₹4,999',
    period: '/ month',
    badge: 'Starter',
    badgeStyle: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    popular: false,
    features: [
      { text: '10 Hours Support & 2 Content Updates', inc: true },
      { text: 'Website & App Maintenance', inc: true },
      { text: 'Bug Fixes & Basic SEO Monitoring', inc: true },
      { text: 'Basic Performance Optimization', inc: true },
      { text: 'Weekly Email Reports', inc: true },
      { text: 'Security Monitoring', inc: false },
      { text: 'Server & Backup Management', inc: false },
      { text: 'Dedicated Developer & SLA', inc: false },
    ],
  },
  {
    id: 'standard',
    name: 'STANDARD',
    tagline: 'Perfect for growing businesses',
    price: '₹9,999',
    period: '/ month',
    badge: 'Popular',
    badgeStyle: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    popular: false,
    features: [
      { text: '25 Hours Support & 5 Content Updates', inc: true },
      { text: 'Website & App Maintenance', inc: true },
      { text: 'Security & Performance Monitoring', inc: true },
      { text: 'Limited Server & Backup Management', inc: true },
      { text: 'Partial SLA Included', inc: true },
      { text: 'Email Priority Support', inc: true },
      { text: 'Dedicated Developer 24/7', inc: false },
      { text: 'Daily Offsite Backups', inc: false },
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    tagline: 'Best for scale & automation',
    price: '₹19,999',
    period: '/ month',
    badge: 'MOST POPULAR',
    badgeStyle: 'bg-pink-500 text-white font-bold border-pink-500 shadow-lg shadow-pink-500/20',
    popular: true,
    features: [
      { text: '50 Hours Support & 10 Content Updates', inc: true },
      { text: 'Advanced SEO & Performance Optimization', inc: true },
      { text: 'Daily Server & Backup Management', inc: true },
      { text: 'Detailed SLA Included', inc: true },
      { text: 'High Priority Support', inc: true },
      { text: 'Custom Software & Automation Updates', inc: true },
      { text: 'Dedicated Developer Support', inc: true },
      { text: 'Daily Offsite Backups', inc: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    tagline: 'Full technical partner & 24/7 ops',
    price: '₹39,999',
    period: '/ month',
    badge: 'Full Power',
    badgeStyle: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    popular: false,
    features: [
      { text: 'Unlimited Support & Content Updates', inc: true },
      { text: 'Dedicated Developer & 24/7 Support', inc: true },
      { text: 'Complete Server & Custom Management', inc: true },
      { text: 'Advanced SLA & Daily Offsite Backups', inc: true },
      { text: 'Highest Priority Support', inc: true },
      { text: 'Full Custom Software Development', inc: true },
      { text: 'Dedicated Account Manager', inc: true },
      { text: 'Custom Workflow Automations', inc: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400">
          <Sparkles size={14} /> Engagement Models & Pricing
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Flexible Maintenance & <br />
          <span className="gradient-text">Software Partnership Plans</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Transparent pricing tailored for startups, SMEs, and enterprises. Choose an engagement plan or request a custom software quote.
        </p>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
        {pricingTiers.map((tier) => (
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
                  <Zap size={12} /> BEST VALUE
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div className="mb-6">
              <h3 className="text-xl font-headline font-extrabold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs min-h-[32px]">{tier.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-headline font-extrabold text-slate-900 dark:text-white tracking-tight">{tier.price}</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{tier.period}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 border-t border-slate-100 dark:border-white/8 pt-5 my-4 flex-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">Included Deliverables:</span>
              {tier.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  {feat.inc ? (
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
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
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4 ${
                tier.popular
                  ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-md shadow-pink-500/20'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15'
              }`}
            >
              Get Started <ArrowRight size={14} />
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
