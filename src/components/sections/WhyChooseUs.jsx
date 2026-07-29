import React from 'react';
import { ShieldCheck, Zap, Bot, Star, Code, Layers } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const points = [
    {
      title: "100% Custom-Built Software",
      desc: "No off-the-shelf templates. Every system is designed and built from scratch specifically for your business workflows, data structure, and team.",
      icon: Code,
      color: "text-cyanCustom"
    },
    {
      title: "You Own Your Source Code",
      desc: "Unlike SaaS tools that lock you in, we hand over full source code ownership on delivery. No recurring license fees, no vendor lock-in.",
      icon: ShieldCheck,
      color: "text-pinkCustom"
    },
    {
      title: "Scalable Architecture",
      desc: "Our software is built to grow with your business. Add users, modules, integrations, and features without expensive rewrites.",
      icon: Layers,
      color: "text-purpleCustom"
    },
    {
      title: "Fast Deployment",
      desc: "We work in agile sprints with clear milestones. Most basic modules go live within 4–8 weeks from project kickoff.",
      icon: Zap,
      color: "text-emerald-400"
    },
    {
      title: "Post-Launch Support",
      desc: "We don't disappear after delivery. All plans include post-launch support, bug fixes, and training for your team.",
      icon: Star,
      color: "text-pinkCustom"
    },
    {
      title: "Real Developers, Not Resellers",
      desc: "Our in-house team of engineers, UI designers, and automation specialists build every project — no outsourcing, no middlemen.",
      icon: Bot,
      color: "text-cyanCustom"
    },
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Why Choose Us"
        title="Why Businesses Choose Kvantum Tech Solutions"
        subtitle="Reliable software development, transparent pricing, and long-term partnership."
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
