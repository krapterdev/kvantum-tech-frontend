import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <div className="bg-gradient-to-br from-pinkCustom via-pinkCustom to-purpleCustom p-12 md:p-20 rounded-[30px] border border-white/10 text-center flex flex-col items-center gap-8 relative overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.25)]">
        
        {/* Glow decorative layers */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 max-w-xl flex flex-col items-center gap-4">
          <h2 className="text-3xl sm:text-5xl font-headline font-bold text-white leading-tight">
            Got an Idea? Let's Not <br />
            Let It Die in a Notepad.
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed mt-2 font-sans">
            Whether you have a full blueprint or just a messy thought at 2 AM — we're down to chat. No sales pressure. No long forms. Just a real conversation.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/contact');
            }}
            className="px-8 py-4 rounded-xl text-[15px] font-bold bg-white text-zinc-950 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow-lg"
          >
            Start a Conversation
          </button>
          
          <div className="text-white/80 text-xs sm:text-sm font-mono tracking-wide mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Or call us:</span>
            <a href="tel:+919811661828" className="hover:text-white hover:underline">+91 9811661828</a>
            <span>•</span>
            <a href="tel:+919811663433" className="hover:text-white hover:underline">+91 9811663433</a>
            <span>•</span>
            <a href="tel:+919811663121" className="hover:text-white hover:underline">+91 9811663121</a>
          </div>
        </div>
      </div>
    </section>
  );
}
