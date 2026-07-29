import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const trustPoints = [
  'Free Requirement Analysis',
  'Expert Technical Consultation',
  'Custom Project Roadmap',
  'Transparent Pricing',
  'No Hidden Costs',
];

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <div className="bg-gradient-to-br from-pinkCustom via-pinkCustom to-purpleCustom p-12 md:p-20 rounded-[30px] border border-white/10 text-center flex flex-col items-center gap-8 relative overflow-hidden shadow-[0_20px_60px_rgba(236,72,153,0.3)]">

        {/* Decorative overlays */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purpleCustom/30 rounded-full blur-3xl pointer-events-none" />

        {/* Copy */}
        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 border border-white/20 px-4 py-1.5 rounded-full">
            Free Consultation — No Commitment Required
          </span>
          <h2 className="text-3xl sm:text-5xl font-headline font-bold text-white leading-tight">
            Ready to Build Smarter Software for Your Business?
          </h2>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed mt-2">
            Whether you need <strong>Custom Software Development, CRM Software, HRMS, ERP, Business Automation, Web Applications, Mobile Apps, or WhatsApp Automation</strong>, our team is ready to turn your ideas into scalable digital solutions.
          </p>
          <p className="text-white/75 text-sm leading-relaxed">
            Let's discuss your project, understand your business goals, and create software that drives measurable results.
          </p>
        </div>

        {/* Trust Points */}
        <div className="relative z-10 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {trustPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle2 size={14} className="text-white shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/contact');
            }}
            className="px-8 py-4 rounded-xl text-[15px] font-bold bg-white text-zinc-950 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow-lg"
          >
            Schedule a Free Consultation
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/contact');
            }}
            className="px-8 py-4 rounded-xl text-[15px] font-bold border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all duration-200 cursor-pointer"
          >
            Request a Live Demo <ArrowRight size={16} className="inline ml-1" />
          </button>
        </div>

        {/* Phone Numbers */}
        <div className="relative z-10 text-white/70 text-xs sm:text-sm font-mono tracking-wide flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>Or call us directly:</span>
          <a href="tel:+919811661828" className="hover:text-white hover:underline transition-colors">+91 9811661828</a>
          <span>•</span>
          <a href="tel:+919811663433" className="hover:text-white hover:underline transition-colors">+91 9811663433</a>
          <span>•</span>
          <a href="tel:+919811663121" className="hover:text-white hover:underline transition-colors">+91 9811663121</a>
        </div>
      </div>
    </section>
  );
}
