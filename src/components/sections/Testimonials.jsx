import React from 'react';
import { Star, Quote } from 'lucide-react';
import Badge from '../ui/Badge';

const row1Reviews = [
  { name: 'Rajesh M.', role: 'Sales Director, Manufacturing', quote: 'Kvantum developed a custom CRM tailored to our sales process. Our team now manages leads, follow-ups, and quotes 3x faster.' },
  { name: 'Priya S.', role: 'Operations Manager, Logistics Firm', quote: 'Our manual workflows were slowing us down. Kvantum automated approvals and WhatsApp alerts, saving us over 400 hours a month.' },
  { name: 'Amit K.', role: 'Founder, Healthcare Startup', quote: 'They built our patient booking and WhatsApp lab report system in weeks. Highly professional team and clean code.' },
];

const row2Reviews = [
  { name: 'Vikram R.', role: 'General Manager, Luxe Hotels', quote: 'The hotel reservation POS & billing automation system Kvantum delivered transformed our front desk operations.' },
  { name: 'Neha G.', role: 'HR Head, Tech Enterprise', quote: 'The biometric attendance & auto-payroll HRMS module solved all our multi-branch compliance headaches.' },
  { name: 'Sanjay P.', role: 'Managing Director, Real Estate', quote: 'Site visit scheduling and buyer WhatsApp follow-up automation doubled our sales conversion rate in 60 days.' },
];

export default function Testimonials() {
  return (
    <section className="bg-zinc-950/90 border-y border-white/8 py-24 select-none overflow-hidden text-left relative z-10">
      
      {/* Section Header */}
      <div className="container mx-auto max-w-[1280px] px-6 text-center mb-14">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          Client Feedback
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
          Trusted by Industry Leaders <br />
          <span className="gradient-text">What Our Clients Say About Kvantum</span>
        </h2>
      </div>

      {/* Row 1 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-6 opacity-85 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-left space-x-6 shrink-0">
          {row1Reviews.concat(row1Reviews).map((rev, idx) => (
            <div
              key={idx}
              className="w-[380px] p-6 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between gap-4 backdrop-blur-xl whitespace-normal cursor-pointer hover:border-pinkCustom/40 transition-colors"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed italic">"{rev.quote}"</p>
              <div className="border-t border-white/8 pt-3 mt-1">
                <h4 className="text-xs font-bold font-headline text-zinc-100">{rev.name}</h4>
                <span className="text-[10px] font-mono text-zinc-500">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-right space-x-6 shrink-0">
          {row2Reviews.concat(row2Reviews).map((rev, idx) => (
            <div
              key={idx}
              className="w-[380px] p-6 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between gap-4 backdrop-blur-xl whitespace-normal cursor-pointer hover:border-cyanCustom/40 transition-colors"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed italic">"{rev.quote}"</p>
              <div className="border-t border-white/8 pt-3 mt-1">
                <h4 className="text-xs font-bold font-headline text-zinc-100">{rev.name}</h4>
                <span className="text-[10px] font-mono text-zinc-500">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
