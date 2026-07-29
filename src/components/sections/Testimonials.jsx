import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Star } from 'lucide-react';

const defaultTestimonials = [
  {
    title: 'Exceptional CRM Development',
    content: 'Kvantum Tech Solutions developed a custom CRM tailored to our sales process. Our team now manages leads, follow-ups, and customer communication far more efficiently. Their expertise and support exceeded our expectations.',
    name: 'Sales Director',
    role: 'Manufacturing Company',
    rating: 5
  },
  {
    title: 'Business Automation That Saved Us Time',
    content: 'Our manual workflows were slowing us down. Kvantum Tech Solutions automated approvals, notifications, and internal processes, significantly improving productivity across our entire organization.',
    name: 'Operations Manager',
    role: 'Logistics Firm',
    rating: 5
  },
  {
    title: 'Professional Software Development Team',
    content: 'The team understood our business requirements and delivered a secure, scalable web application within the committed timeline. We highly recommend their software development services.',
    name: 'Founder & CEO',
    role: 'Healthcare Startup',
    rating: 5
  },
  {
    title: 'Reliable Long-Term Technology Partner',
    content: 'From planning to deployment and ongoing support, Kvantum Tech Solutions has been an excellent technology partner for our growing business. They truly care about delivering results.',
    name: 'Business Owner',
    role: 'Real Estate Company',
    rating: 5
  },
];

export default function Testimonials({ settings }) {
  const list = settings?.testimonials || [];
  const displayList = list.length > 0
    ? list.map(t => ({
        title: t.title || 'Client Review',
        content: t.content || t.quote || '',
        name: t.name,
        role: t.role,
        rating: 5,
        avatar: t.avatar
      }))
    : defaultTestimonials;

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Client Reviews
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
          What Our <span className="gradient-text">Clients Say</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Businesses across industries share their experience working with Kvantum Tech Solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayList.map((t, idx) => (
          <Card key={idx} className="p-8 flex flex-col gap-5 border text-left hover:-translate-y-1 transition-all duration-300">

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Title */}
            {t.title && (
              <h4 className="text-zinc-100 font-headline font-bold text-base">{t.title}</h4>
            )}

            {/* Content */}
            <p className="text-zinc-400 text-sm leading-relaxed flex-1">
              "{t.content || t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border border-white/8 object-cover bg-zinc-900"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-white/8 bg-gradient-to-br from-pinkCustom/30 to-purpleCustom/30 flex items-center justify-center text-zinc-100 text-sm font-bold font-headline">
                  {(t.name || 'C')[0]}
                </div>
              )}
              <div>
                <h5 className="text-zinc-100 text-sm font-headline font-bold">— {t.name}</h5>
                <span className="text-zinc-500 text-[11px] font-mono block">{t.role}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
