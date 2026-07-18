import React from 'react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 border-t border-white/8 select-none">
      <SectionHeading
        badge="Reviews"
        title="Telemetry Node Feedback"
        subtitle="Read feedback logs transmitted by CTOs and product owners."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-8 flex flex-col justify-between min-h-[250px] border text-left">
            <p className="text-zinc-400 text-sm italic leading-relaxed mb-6">
              "{t.quote}"
            </p>
            
            <div className="flex items-center gap-3">
              <img 
                src={t.avatar} 
                alt={t.name}
                className="w-10 h-10 rounded-full border border-white/8 object-cover bg-zinc-900"
              />
              <div>
                <h5 className="text-zinc-100 text-sm font-headline font-bold">{t.name}</h5>
                <span className="text-zinc-500 text-[11px] font-mono block">{t.role}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
