import React from 'react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export default function Testimonials({ settings }) {
  const list = settings?.testimonials || [];

  const displayList = list.length > 0 ? list : [
    {
      name: "Rajesh M.",
      role: "Healthcare Startup",
      content: "They rebuilt our entire booking system in 6 weeks. Our old agency said it would take 6 months. Kvantum just… got it done.",
      avatar: "https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/web%20icons/svg/192%20dm.svg"
    },
    {
      name: "Priya S.",
      role: "E-commerce Brand",
      content: "Finally, a tech team that returns calls. These guys are ridiculous — in a good way.",
      avatar: "https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/web%20icons/svg/192%20dm.svg"
    },
    {
      name: "Amit K.",
      role: "Real Estate Firm",
      content: "They told us we DON'T need a custom app and saved us ₹8 lakhs. Who does that? Honest people, apparently.",
      avatar: "https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/web%20icons/svg/192%20dm.svg"
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Reviews"
        title="What Our Clients Say"
        subtitle="Hear directly from the founders and product leads we collaborate with."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayList.map((t, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between min-h-[250px] border text-left">
            <p className="text-zinc-400 text-sm italic leading-relaxed mb-6">
              "{t.content || t.quote}"
            </p>
            
            <div className="flex items-center gap-3">
              <img 
                src={t.avatar || "https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/web%20icons/svg/192%20dm.svg"} 
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
