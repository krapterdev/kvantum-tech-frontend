import React from 'react';
import { ShieldCheck, Zap, Bot, Star } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const points = [
    {
      title: "Tailored Engineering",
      desc: "Every line of code is written specifically for your project. We don't use generic templates or rigid site builders.",
      icon: ShieldCheck,
      color: "text-cyanCustom"
    },
    {
      title: "Core Speed Focus",
      desc: "We optimize code bundles and server response times to ensure your site passes Google's Core Web Vitals with flying colors.",
      icon: Zap,
      color: "text-emerald-400"
    },
    {
      title: "Smart API Integrations",
      desc: "We integrate custom database systems and modern third-party APIs to automate your business workflows seamlessly.",
      icon: Bot,
      color: "text-purpleCustom"
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Our Approach"
        title="Why Brands Partner with Kvantum"
        subtitle="We build reliable, high-performance web products designed to scale with your business and keep visitors engaged."
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
