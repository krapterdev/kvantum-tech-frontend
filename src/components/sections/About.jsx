import React from 'react';
import { Globe, Activity, Cpu } from 'lucide-react';
import Card from '../ui/Card';

export default function About() {
  return (
    <section className="bg-zinc-950/10 border-y border-white/8 py-20 px-6 select-none">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-10">
          
          <Card className="p-[30px] border">
            <Globe size={32} className="text-cyanCustom mx-auto mb-4" />
            <h3 className="text-4xl text-zinc-100 font-extrabold font-headline mb-1.5">5x</h3>
            <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
              Faster Page Speed
            </p>
          </Card>

          <Card className="p-[30px] border">
            <Activity size={32} className="text-purpleCustom mx-auto mb-4" />
            <h3 className="text-4xl text-zinc-100 font-extrabold font-headline mb-1.5">99.9%</h3>
            <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
              Uptime Guarantee
            </p>
          </Card>

          <Card className="p-[30px] border">
            <Cpu size={32} className="text-cyanCustom mx-auto mb-4" />
            <h3 className="text-4xl text-zinc-100 font-extrabold font-headline mb-1.5">100%</h3>
            <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
              Custom Hand-Crafted Code
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
}
