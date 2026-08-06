import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const demoIncludes = [
  'Live Product Walkthrough',
  'Dashboard Overview',
  'CRM Features',
  'HRMS Modules',
  'ERP Functionalities',
  'Automation Workflows',
  'Mobile App Preview',
  'Web Application Demo',
  'Reporting & Analytics',
  'Q&A Session with Experts',
];

export default function LiveDemo() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-16 select-none">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 border border-white/10 p-10 md:p-14">

        {/* Background Glow Effects */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pinkCustom/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyanCustom/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div className="text-left">
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
              <Play size={12} className="ml-0.5" /> Live Software Demo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
              Experience Our Software <br />
              <span className="gradient-text">Before You Invest</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
              See our software in action before making a decision. Book a personalized live demonstration and explore how our CRM, HRMS, ERP, Business Automation, WhatsApp Automation, Web Applications, and Mobile Apps can simplify your operations and improve productivity.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              During the live demo, our experts will walk you through key features, dashboards, automation workflows, reporting capabilities, user roles, integrations, and customization options based on your business requirements. Whether you're a startup or a large enterprise, we'll demonstrate how our solutions can be tailored to fit your unique workflows and business goals.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('contact') || document.getElementById('contact-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/contact';
                }}
                className="px-7 py-4 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer text-center"
              >
                Book Your Free Live Demo
              </button>
              <a
                href="tel:+919811661828"
                className="px-7 py-4 rounded-xl text-sm font-bold border border-white/15 text-zinc-200 hover:bg-white/5 hover:border-white/25 transition-all duration-200 cursor-pointer text-center"
              >
                Call Now: +91 98116 61828
              </a>
            </div>
          </div>

          {/* Right: What's Included */}
          <div>
            <h3 className="text-zinc-200 font-bold text-base font-headline mb-5">What's Included in the Demo?</h3>
            <div className="flex flex-col gap-3">
              {demoIncludes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-pinkCustom/30 hover:bg-pinkCustom/5 transition-all duration-200 group"
                >
                  <CheckCircle2 size={15} className="text-pinkCustom shrink-0" />
                  <span className="text-zinc-300 text-sm group-hover:text-zinc-100 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
