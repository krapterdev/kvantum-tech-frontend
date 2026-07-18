import React from 'react';
import { ShieldCheck, Zap, Bot, Star } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const points = [
    {
      title: "Bespoke Architectures",
      desc: "We write clean, semantic code tailor-made for your business scope. No templates or cookie-cutter solutions.",
      icon: ShieldCheck,
      color: "text-cyanCustom"
    },
    {
      title: "Sub-Second Performance",
      desc: "We optimize bundles, images, and queries to target Google's Core Web Vitals under 3.2ms edge speeds.",
      icon: Zap,
      color: "text-emerald-400"
    },
    {
      title: "Autonomous Automations",
      desc: "Integrating dynamic database search indexes and RAG agent configurations to automate client telemetry flows.",
      icon: Bot,
      color: "text-purpleCustom"
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="System Parameters"
        title="Why Brands Upgrade with Kvantum"
        subtitle="We build high-performance systems designed to capture markets and operate without manual intervention."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
