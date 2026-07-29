import React from 'react';
import { CheckCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for startups & small businesses',
    price: 'Starting ₹25,000',
    period: 'one-time',
    features: [
      'Custom software up to 5 modules',
      'Basic CRM or HRMS setup',
      '1 user type / role level',
      'Mobile-responsive interface',
      'Basic reporting dashboard',
      '3 months post-launch support',
    ],
    highlight: false,
    cta: 'Request Quote',
  },
  {
    name: 'Business',
    tagline: 'Ideal for growing companies',
    price: 'Starting ₹75,000',
    period: 'one-time',
    features: [
      'Custom software up to 15 modules',
      'Full CRM + HRMS + Automation',
      'Multi-role access control',
      'WhatsApp API integration',
      'Advanced analytics & reports',
      '6 months post-launch support',
    ],
    highlight: true,
    cta: 'Request Quote',
  },
  {
    name: 'Enterprise',
    tagline: 'Custom software for large organizations',
    price: 'Custom Pricing',
    period: 'based on scope',
    features: [
      'Unlimited modules & integrations',
      'ERP + CRM + HRMS + Mobile App',
      'Multi-branch / multi-company',
      'AI workflow automation',
      'Dedicated project manager',
      '12 months SLA support',
    ],
    highlight: false,
    cta: 'Request Custom Quote',
  },
];

export default function Pricing() {
  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Transparent Pricing for <br />
            <span className="gradient-text">Every Business Size</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            No hidden costs, no surprise bills. Every project is quoted transparently based on your specific requirements. Get a free consultation to understand what solution fits your budget.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`p-8 flex flex-col gap-6 border transition-all duration-300 ${
                plan.highlight
                  ? 'border-pinkCustom/40 bg-pinkCustom/5 shadow-[0_0_40px_rgba(236,72,153,0.12)] scale-[1.02]'
                  : 'border-white/8 hover:border-white/15'
              }`}
            >
              {/* Plan Header */}
              <div>
                {plan.highlight && (
                  <span className="inline-block text-[10px] font-mono uppercase tracking-widest bg-pinkCustom/20 text-pinkCustom px-3 py-1 rounded-full border border-pinkCustom/20 mb-3">
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
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3">
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
                className={`mt-auto px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] cursor-pointer w-full ${
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
          All prices include full source code ownership. No recurring license fees.
        </p>

      </div>
    </section>
  );
}
