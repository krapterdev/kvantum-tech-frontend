import React, { useState } from 'react';
import { Layers, Sparkles, ArrowRight, ShieldCheck, Cpu, Smartphone, Database, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const cards = [
  {
    id: 1,
    title: 'Custom CRM Software',
    subtitle: 'Lead Management & Sales Funnels',
    desc: 'Automate sales pipelines, follow-ups, quotation creation, and team performance tracking.',
    badge: 'Sales & CRM',
    tagColor: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/30',
    icon: ShieldCheck,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    features: ['Auto Lead Assignment', 'Pipeline Analytics', 'Quotation Generator'],
  },
  {
    id: 2,
    title: 'HRMS & Payroll System',
    subtitle: 'Complete Workforce Automation',
    desc: 'Manage employee records, biometric attendance sync, automated salary calculations, and leave workflows.',
    badge: 'HR & Payroll',
    tagColor: 'text-cyanCustom bg-cyanCustom/10 border-cyanCustom/30',
    icon: Cpu,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    features: ['Biometric & GPS Punch-in', 'Auto Salary Slip', 'Leave Approvals'],
  },
  {
    id: 3,
    title: 'WhatsApp Automation Platform',
    subtitle: 'Official Meta API Integration',
    desc: 'Send automated order notifications, payment reminders, promotional campaigns, and 24/7 AI chat replies.',
    badge: 'Messaging API',
    tagColor: 'text-purpleCustom bg-purpleCustom/10 border-purpleCustom/30',
    icon: Smartphone,
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    features: ['Official Green Tick API', 'Bulk Broadcasts', 'Interactive Bot Chat'],
  },
  {
    id: 4,
    title: 'Enterprise ERP Solutions',
    subtitle: 'Inventory, Procurement & Accounts',
    desc: 'Unify multi-warehouse stock management, purchase orders, vendor ledgers, and live financial P&L reporting.',
    badge: 'Operations',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: Database,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    features: ['Multi-Warehouse Tracking', 'Auto PO Triggers', 'GST Billing'],
  },
];

export default function CardStackShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Layers size={14} className="animate-pulse" /> Software Suite Fan-Out Showcase
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Explore Our Core Software Suite <br />
          <span className="gradient-text">Hover or Touch Below to Fan Out</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Hover over the card stack to expand our core software solutions and discover their built-in automation capabilities.
        </p>
      </div>

      {/* Interactive Card Fan-Out Container */}
      <div
        className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center py-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 blur-3xl pointer-events-none rounded-full" />

        {/* Cards Grid / Fan-Out Wrapper */}
        <div className="relative w-full max-w-[1100px] flex justify-center items-center">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            
            // Calculate 3D Fan-out offsets when hovered vs collapsed
            const total = cards.length;
            const centerIdx = (total - 1) / 2;
            const offset = idx - centerIdx;

            // Transformed values when hovered vs stacked
            const rotateDeg = isHovered ? offset * 6 : offset * -3;
            const translateX = isHovered ? offset * 260 : offset * 18;
            const translateY = isHovered ? 0 : offset * 8;
            const scale = isHovered ? 1 : 1 - Math.abs(offset) * 0.04;
            const zIndex = isHovered ? 10 + idx : total - Math.abs(offset);

            return (
              <div
                key={card.id}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className={`absolute w-[280px] sm:w-[320px] p-7 rounded-3xl bg-zinc-950/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between text-left h-[380px] hover:border-pinkCustom/50 transition-colors duration-300 group`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl opacity-50 pointer-events-none`} />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${card.tagColor}`}>
                    {card.badge}
                  </span>
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-200">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Card Title & Desc */}
                <div className="relative z-10 my-auto">
                  <h3 className="text-xl font-headline font-bold text-zinc-100 mb-1 leading-snug">
                    {card.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mb-3">{card.subtitle}</span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Feature Tags */}
                <div className="relative z-10 space-y-1.5 border-t border-white/8 pt-3 mt-2">
                  {card.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                      <CheckCircle2 size={12} className="text-cyanCustom shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <p className="text-center text-zinc-500 font-mono text-xs mt-6">
        {isHovered ? '✨ Interactive Fan-Out View Active — Click any product to discuss' : '💡 Hover over or tap the deck to expand all 4 core software modules'}
      </p>

    </section>
  );
}
