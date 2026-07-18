import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 border-t border-white/8 select-none">
      <div className="glass-panel p-12 md:p-20 rounded-[30px] border border-white/8 text-center flex flex-col items-center gap-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Glow orbs within panel */}
        <div className="glow-orb -top-20 -left-20 w-[300px] h-[300px] bg-cyanCustom/20"></div>
        <div className="glow-orb -bottom-20 -right-20 w-[300px] h-[300px] bg-purpleCustom/20"></div>

        <div className="relative z-10 max-w-xl flex flex-col items-center gap-4">
          <span className="tech-badge">Let's Collaborate</span>
          <h2 className="text-3xl sm:text-5xl font-headline font-bold text-zinc-100 leading-tight">
            Ready to build <br />
            something remarkable?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-2">
            Get in touch with our development team in Noida Sector 62 to discuss your custom project requirements, design scope, and growth strategies.
          </p>
        </div>

        <Button
          onClick={() => navigate('/contact')}
          variant="primary"
          className="relative z-10 px-8 py-4 rounded-xl"
        >
          Start the Conversation <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
}
