import React from 'react';
import { CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const plans = [
  {
    name: 'Starter',
    tagline: 'Ideal for Startups & Small Businesses',
    price: 'Starting ₹25,000',
    period: 'one-time project cost',
    bestFor: 'New Businesses',
    features: [
      'Business Website',
      'Basic CRM Setup',
      'Standard Software Features',
      'Email Support',
      'Fast Deployment',
      '3 Months Post-Launch Support',
    ],
    highlight: false,
    cta: 'Get Started',
  },
  {
    name: 'Business',
    tagline: 'Perfect for Growing Companies',
    price: 'Starting ₹75,000',
    period: 'one-time project cost',
    bestFor: 'SMEs',
    features: [
      'Custom CRM Software',
      'HRMS Software',
      'Business Automation',
      'API & Third-Party Integrations',
      'Priority Support',
      'Advanced Reports & Dashboards',
      '6 Months Post-Launch Support',
    ],
    highlight: true,
    cta: 'Request Proposal',
  },
  {
    name: 'Enterprise',
    tagline: 'Complete Digital Transformation',
    price: 'Custom Pricing',
    period: 'based on project scope',
    bestFor: 'Large Organizations',
    features: [
      'Custom Software Development',
      'ERP System',
      'Enterprise Automation',
      'Web Applications',
      'Mobile Applications',
      'Dedicated Project Team',
      'Cloud Deployment',
      '12 Months Ongoing Maintenance',
    ],
    highlight: false,
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Pricing Plans
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Flexible Pricing for <br />
          <span className="gradient-text">Every Business</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Whether you're a startup, growing business, or enterprise, we offer flexible engagement models tailored to your requirements and budget.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`p-8 flex flex-col gap-6 border transition-all duration-300 ${
              plan.highlight
                ? 'border-pinkCustom/40 bg-pinkCustom/5 shadow-[0_0_50px_rgba(236,72,153,0.12)] md:scale-[1.03]'
                : 'border-white/8 hover:border-white/20'
            }`}
          >
            {/* Header */}
            <div>
              {plan.highlight && (
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest bg-pinkCustom/20 text-pinkCustom px-3 py-1 rounded-full border border-pinkCustom/30 mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-headline font-bold text-zinc-100 mb-1">{plan.name}</h3>
              <p className="text-zinc-500 text-xs">{plan.tagline}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-white/5 py-5">
              <span className="text-2xl font-extrabold font-headline text-zinc-100">{plan.price}</span>
              <span className="text-zinc-500 text-xs ml-2">{plan.period}</span>
              <div className="mt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Best For: </span>
                <span className="text-[10px] font-mono text-cyanCustom font-bold">{plan.bestFor}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                  <CheckCircle size={14} className="text-cyanCustom shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] cursor-pointer w-full ${
                plan.highlight
                  ? 'bg-pinkCustom text-white hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                  : 'border border-white/15 text-zinc-200 hover:bg-white/5 hover:border-white/25'
              }`}
            >
              {plan.cta}
            </button>
          </Card>
        ))}
      </div>

      <p className="text-center text-zinc-500 text-xs mt-8">
        All prices include 100% source code ownership. No recurring license fees. Custom quotes available for complex projects.
      </p>
    </section>
  );
}
