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
    badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
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
    badgeStyle: 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/20',
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
    badgeStyle: 'bg-pinkCustom text-white font-bold border-pinkCustom shadow-[0_0_15px_rgba(236,72,153,0.4)]',
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
    badgeStyle: 'bg-purpleCustom/10 text-purpleCustom border-purpleCustom/20',
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
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-purpleCustom/10 border-purpleCustom/20 text-purpleCustom">
          <Sparkles size={14} /> Engagement Models & Pricing
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Flexible Maintenance & <br />
          <span className="gradient-text">Software Partnership Plans</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Transparent pricing tailored for startups, SMEs, and enterprises. Choose an engagement plan or request a custom software quote.
        </p>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`p-7 rounded-3xl bg-zinc-950/90 border transition-all duration-300 flex flex-col justify-between text-left relative backdrop-blur-2xl ${
              tier.popular
                ? 'border-pinkCustom/50 shadow-[0_20px_50px_rgba(236,72,153,0.2)] scale-[1.03] z-20'
                : 'border-white/10 hover:border-white/20 z-10'
            }`}
          >
            {/* Top Badge */}
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${tier.badgeStyle}`}>
                {tier.badge}
              </span>
              {tier.popular && (
                <span className="text-[10px] font-mono text-pinkCustom font-bold flex items-center gap-1">
                  <Zap size={12} /> BEST VALUE
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div className="mb-6">
              <h3 className="text-xl font-headline font-extrabold text-zinc-100 mb-1">{tier.name}</h3>
              <p className="text-zinc-400 text-xs min-h-[32px]">{tier.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-headline font-extrabold text-white tracking-tight">{tier.price}</span>
                <span className="text-xs font-mono text-zinc-400">{tier.period}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 border-t border-white/8 pt-5 my-4 flex-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Included Deliverables:</span>
              {tier.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  {feat.inc ? (
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <X size={14} className="text-zinc-600 shrink-0 mt-0.5" />
                  )}
                  <span className={feat.inc ? 'text-zinc-300' : 'text-zinc-600 line-through'}>{feat.text}</span>
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
                  ? 'bg-pinkCustom text-white hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                  : 'bg-white/10 text-white hover:bg-white/15 border border-white/15'
              }`}
            >
              Get Started <ArrowRight size={14} />
            </button>

          </div>
        ))}
      </div>

      {/* Custom Plan Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-pinkCustom/15 via-purpleCustom/15 to-cyanCustom/15 border border-white/15 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-xs font-mono text-pinkCustom uppercase font-bold tracking-widest block mb-1">Custom Requirements?</span>
          <h3 className="text-xl font-headline font-bold text-zinc-100">Need a Custom Software or Enterprise Automation Plan?</h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">We build tailored engagement models based on your exact business requirements.</p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-7 py-3.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.35)] shrink-0 cursor-pointer"
        >
          Request Custom Plan Quote →
        </button>
      </div>

    </section>
  );
}
