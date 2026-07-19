import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Code, Target } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GradientText from '../ui/GradientText';

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="bg-zinc-950/10 py-20 px-6 select-none">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          {/* Left Side: Short Version Description */}
          <div className="flex flex-col items-start">
            <Badge className="mb-4 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
              Who We Are
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 mb-6 leading-tight">
              The Short Version of <br />
              Who We Are
            </h2>

            <div className="text-zinc-400 text-sm sm:text-base leading-relaxed flex flex-col gap-5 mb-8">
              <p>
                We started Kvantum because we were tired of seeing businesses get burned by tech agencies who overpromise and underdeliver. Big presentations, buzzwords like "synergy" and "paradigm shift," and then… a website that looks like it's from 2012.
              </p>
              <p>
                So we did things differently. Small team. No middlemen. Direct access to the people actually building your stuff. We pick up calls, we hit deadlines, and we don't disappear after launch day.
              </p>
              <p>
                We're not a massive agency with 200 employees you'll never meet. We're a tight-knit crew who genuinely gives a damn about your project.
              </p>
            </div>

            <button
              onClick={() => navigate('/about')}
              className="group text-[15px] font-bold text-pinkCustom hover:text-pink-400 flex items-center gap-1.5 cursor-pointer transition-colors duration-250"
            >
              More About Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: High-End Agency Visual / Floating Badges */}
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center">
              {/* Decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pinkCustom/10 via-purpleCustom/10 to-transparent blur-2xl -z-10 rounded-3xl" />
              
              <Card className="w-full p-8 border flex flex-col gap-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-pinkCustom/10 border border-pinkCustom/20 rounded-xl text-pinkCustom">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block">Studio Ethos</span>
                    <h4 className="text-zinc-100 font-bold text-base font-headline">Zero Middlemen</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyanCustom/10 border border-cyanCustom/20 rounded-xl text-cyanCustom">
                    <Code size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block">Build Code</span>
                    <h4 className="text-zinc-100 font-bold text-base font-headline">100% Custom Engineering</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purpleCustom/10 border border-purpleCustom/20 rounded-xl text-purpleCustom">
                    <Target size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block">Relationship</span>
                    <h4 className="text-zinc-100 font-bold text-base font-headline">Long-Term Partners</h4>
                  </div>
                </div>

                {/* Sub-label */}
                <div className="border-t border-white/8 pt-4.5 mt-2 flex justify-between items-center text-xs font-mono text-zinc-500">
                  <span>EST. NCR, IND</span>
                  <span className="text-pinkCustom">BUILDING TECH</span>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
