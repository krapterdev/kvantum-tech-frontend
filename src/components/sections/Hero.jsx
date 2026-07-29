import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function Hero({ settings }) {
  const navigate = useNavigate();
  const hero = settings?.hero || {};

  const trustPoints = [
    'Custom Software Development',
    'CRM & ERP Solutions',
    'HRMS Software',
    'Business Automation',
    'WhatsApp Automation',
    'Web & Mobile App Development',
    'Cloud-Based Business Applications',
    'Secure & Scalable Solutions',
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-14 md:py-24 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left Side: Copy & CTAs */}
        <div className="flex flex-col items-start text-left">
          <Badge className="mb-6 flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Business Automation & Custom Software Development
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-zinc-100 leading-[1.15] tracking-tight mb-6">
            {hero.title || 'Custom Software Development & Business Automation Solutions for Modern Businesses'}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[620px] mb-5 font-sans">
            {hero.subtitle ||
              'Empower your business with intelligent software solutions designed to simplify operations, improve productivity, and accelerate growth. Kvantum Tech Solutions specializes in Custom Software Development, CRM Software, HRMS Software, Business Automation, WhatsApp Automation, Web Application Development, Mobile App Development, ERP Solutions, and Enterprise Software Development tailored to your unique business needs.'}
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-[620px] mb-9 font-sans">
            Whether you're a startup, SME, or enterprise, we build scalable digital solutions that automate repetitive tasks, streamline workflows, improve customer relationships, and help your business operate more efficiently.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              className="px-7 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer text-center"
            >
              {hero.ctaText || 'Book Free Consultation'}
            </button>
            <Button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/contact');
              }}
              variant="secondary"
              className="px-7 py-3.5 rounded-xl text-sm text-center"
            >
              Request Live Demo
            </Button>
          </div>

          {/* Trust Points Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[11px] sm:text-xs font-mono text-zinc-400 border-t border-white/5 pt-7 w-full">
            {trustPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-cyanCustom font-bold">✔</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Live Stats Card */}
        <div className="flex justify-center w-full">
          <Card
            tilt
            scanline
            className="w-full max-w-[440px] p-9 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >
            <div className="flex flex-col gap-6">

              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-cyanCustom/10 rounded-lg">
                    <Cpu size={18} className="text-cyanCustom" />
                  </div>
                  <div>
                    <h4 className="text-zinc-100 text-sm font-semibold">Business Software Platform</h4>
                    <span className="text-zinc-500 text-[11px] font-mono block">System Status: Active & Running</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
                  <span className="text-[11px] font-mono text-zinc-400">LIVE</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '250+', label: 'Projects Delivered', color: 'text-pinkCustom' },
                  { value: '100+', label: 'Happy Clients', color: 'text-cyanCustom' },
                  { value: '15+', label: 'Industries Served', color: 'text-purpleCustom' },
                  { value: '99%', label: 'Client Satisfaction', color: 'text-emerald-400' },
                ].map((m, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/8 rounded-xl p-4 text-center">
                    <div className={`text-2xl font-extrabold font-headline ${m.color}`}>{m.value}</div>
                    <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2.5 bg-white/[0.01] p-3 rounded-lg border border-white/8">
                <ShieldCheck size={16} className="text-cyanCustom shrink-0" />
                <span className="text-[11px] font-mono text-zinc-400">
                  100% Source Code Ownership — No License Fees — Secure Architecture
                </span>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
