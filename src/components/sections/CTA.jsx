import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import Badge from '../ui/Badge';

export default function CTA() {
  return (
    <section className="relative py-28 px-6 select-none text-center overflow-hidden bg-slate-900 dark:bg-zinc-950 border-y border-slate-800 dark:border-white/15 text-white">
      {/* Background Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-pinkCustom/20 via-purpleCustom/20 to-cyanCustom/20 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 container mx-auto max-w-[1100px] flex flex-col items-center gap-8">
        
        <Badge className="bg-white/10 border-white/20 text-white font-mono text-xs">
          <Sparkles size={13} /> Free Technical Consultation — No Commitment Required
        </Badge>

        <h2 className="text-3xl sm:text-5xl font-black font-headline text-white tracking-tight leading-tight max-w-4xl">
          Have a Software Idea or a Process That Needs Automation?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Whether you're planning a new digital product, replacing manual processes, modernizing existing software, or connecting disconnected systems, we're ready to understand the challenge and help you find the right development approach.
        </p>

        <p className="text-sky-400 font-semibold text-sm font-mono">
          Tell us what you want to build, improve, or automate.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            to="/contact"
            className="px-9 py-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            Discuss Your Project <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-xl text-sm font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            Request a Demo
          </Link>
        </div>

        {/* Direct Contact Numbers */}
        <div className="text-slate-400 text-xs sm:text-sm font-mono flex flex-wrap justify-center gap-4 mt-4">
          <span>Or call directly:</span>
          <a href="tel:+919811661828" className="hover:text-white transition-colors">+91 9811661828</a>
          <span>•</span>
          <a href="tel:+919811663433" className="hover:text-white transition-colors">+91 9811663433</a>
        </div>

      </div>
    </section>
  );
}
