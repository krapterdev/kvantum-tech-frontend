import React from 'react';
import { Play } from 'lucide-react';

export default function LiveDemo() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-16 select-none">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 border border-white/10 p-10 md:p-16 text-center">
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-pinkCustom/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyanCustom/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Play Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pinkCustom/10 border border-pinkCustom/30 mb-8 shadow-[0_0_25px_rgba(236,72,153,0.2)]">
            <Play size={24} className="text-pinkCustom ml-1" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Experience the Software Before You Buy
          </h2>
          
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
            Book a personalized live demo and see exactly how our CRM, HRMS, ERP, and automation software works for your business. No commitments, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl text-base font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] cursor-pointer"
            >
              Book Free Demo
            </button>
            <a
              href="tel:9811661828"
              className="px-8 py-4 rounded-xl text-base font-bold border border-white/15 text-zinc-200 hover:bg-white/5 hover:border-white/25 transition-all duration-200 cursor-pointer"
            >
              Call Now: +91 98116 61828
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
