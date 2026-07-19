import React from 'react';
import { ShieldCheck, Zap, Bot, Star } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const points = [
    {
      title: "No Ghosting",
      desc: "Ever worked with a developer who vanished for a week? Yeah, we don't do that. You'll have direct access to your project team. Always.",
      icon: ShieldCheck,
      color: "text-pinkCustom"
    },
    {
      title: "We Speak Human",
      desc: "No technical jargon dumps. We explain things in plain English so you actually understand what you're paying for.",
      icon: Bot,
      color: "text-cyanCustom"
    },
    {
      title: "Deadlines Are Real Here",
      desc: "If we say Friday, we mean Friday. Not 'Friday next month.' We set realistic timelines and stick to them.",
      icon: Zap,
      color: "text-purpleCustom"
    },
    {
      title: "Post-Launch Support",
      desc: "Most agencies hand over the keys and disappear. We stick around for support, fixes, and updates because relationships matter.",
      icon: Star,
      color: "text-emerald-400"
    },
    {
      title: "Honest Pricing",
      desc: "No hidden fees. No 'that feature costs extra' surprises mid-project. You'll know exactly what you're paying for.",
      icon: ShieldCheck,
      color: "text-pinkCustom"
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Why Us"
        title="Why Companies Work With Us"
        subtitle="And keep coming back for their next digital projects."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {points.map((point, idx) => {
          const Icon = point.icon;
          return (
            <Card key={idx} className="p-8 flex flex-col gap-4 text-left border">
              <div className={`p-2.5 bg-white/[0.02] border border-white/8 rounded-lg w-fit ${point.color}`}>
                <Icon size={22} />
              </div>
              <h4 className="text-zinc-100 text-lg font-headline font-bold">{point.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{point.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
