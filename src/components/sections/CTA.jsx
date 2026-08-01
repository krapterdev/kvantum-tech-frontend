import React from 'react';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import Badge from '../ui/Badge';

export default function CTA() {
  return (
    <section className="relative py-28 px-6 select-none text-center overflow-hidden bg-gradient-to-br from-pinkCustom/20 via-purpleCustom/20 to-cyanCustom/20 border-y border-white/15">
      {/* Background Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-pinkCustom/30 via-purpleCustom/30 to-cyanCustom/30 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 container mx-auto max-w-[1100px] flex flex-col items-center gap-8">
        
        <Badge className="bg-white/10 border-white/20 text-white font-mono text-xs">
          <Sparkles size={13} /> Free Technical Consultation — No Commitment Required
        </Badge>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-headline text-white uppercase tracking-tight leading-[1.05] max-w-4xl">
          HAVE A PROCESS THAT <br />
          SHOULD BE <span className="gradient-text">AUTOMATED?</span> <br />
          LET'S BUILD IT.
        </h2>

        <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-2xl">
          Whether you need Custom Software, CRM, HRMS, ERP, Business Automation, or WhatsApp Integration, our team is ready to turn your operational bottlenecks into automated digital advantages.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-9 py-4 rounded-xl text-sm font-bold bg-white text-zinc-950 hover:bg-zinc-100 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            BOOK FREE CONSULTATION <ArrowRight size={16} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-xl text-sm font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            Request Live Demo
          </button>
        </div>

        {/* Direct Contact Numbers */}
        <div className="text-zinc-400 text-xs sm:text-sm font-mono flex flex-wrap justify-center gap-4 mt-4">
          <span>Or call directly:</span>
          <a href="tel:+919811661828" className="hover:text-white transition-colors">+91 9811661828</a>
          <span>•</span>
          <a href="tel:+919811663433" className="hover:text-white transition-colors">+91 9811663433</a>
          <span>•</span>
          <a href="tel:+919811663121" className="hover:text-white transition-colors">+91 9811663121</a>
        </div>

      </div>
    </section>
  );
}
