import React, { useState } from 'react';
import { Users, Sparkles, Code, Cpu, ShieldCheck, Layers, Terminal, Award } from 'lucide-react';
import Badge from '../ui/Badge';

const teamCards = [
  {
    id: 1,
    name: 'Sahil Kumar',
    role: 'Founder & Tech Lead',
    experience: '8+ Yrs Exp.',
    badge: 'Architecture & Leadership',
    tagColor: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/30',
    icon: Code,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    bio: 'Specializes in Enterprise Systems, SaaS Architecture, and scalable cloud applications.',
    skills: ['Node.js & React', 'System Design', 'PostgreSQL / Mongo'],
  },
  {
    id: 2,
    name: 'Automation Engineer',
    role: 'Lead Workflow Architect',
    experience: '6+ Yrs Exp.',
    badge: 'Business Automation',
    tagColor: 'text-cyanCustom bg-cyanCustom/10 border-cyanCustom/30',
    icon: Cpu,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    bio: 'Builds custom CRM pipelines, WhatsApp API bots, and automated business workflows.',
    skills: ['WhatsApp API', 'Python & Node', 'Process Automation'],
  },
  {
    id: 3,
    name: 'Full Stack Engineer',
    role: 'Senior Software Developer',
    experience: '5+ Yrs Exp.',
    badge: 'Core Software',
    tagColor: 'text-purpleCustom bg-purpleCustom/10 border-purpleCustom/30',
    icon: Terminal,
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    bio: 'Expert in high-performance web applications, HRMS modules, and ERP solutions.',
    skills: ['Laravel & PHP', 'React.js / Next.js', 'REST APIs & Cloud'],
  },
  {
    id: 4,
    name: 'UI/UX Specialist',
    role: 'Product Designer',
    experience: '5+ Yrs Exp.',
    badge: 'Modern UI/UX',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: Layers,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    bio: 'Crafts intuitive dashboard interfaces, responsive mobile apps, and design systems.',
    skills: ['Figma & Design Systems', 'Modern Web Animations', 'User Research'],
  },
];

export default function CardStackShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Users size={14} className="animate-pulse" /> Meet Our Technical Experts
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          In-House Engineers & Automation Specialists <br />
          <span className="gradient-text">Hover or Touch Below to Reveal Our Team</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          No middlemen or outsourced resellers. Hover over the team deck below to meet the developers and architects building your custom software.
        </p>
      </div>

      {/* Interactive Card Fan-Out Container */}
      <div
        className="relative min-h-[440px] sm:min-h-[480px] flex items-center justify-center py-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >

        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 blur-3xl pointer-events-none rounded-full" />

        {/* Cards Stack Wrapper */}
        <div className="relative w-full max-w-[1100px] flex justify-center items-center">
          {teamCards.map((card, idx) => {
            const Icon = card.icon;
            
            // Calculate 3D Fan-out offsets when hovered vs collapsed
            const total = teamCards.length;
            const centerIdx = (total - 1) / 2;
            const offset = idx - centerIdx;

            // Transformed values when hovered vs stacked
            const rotateDeg = isHovered ? offset * 6 : offset * -3;
            const translateX = isHovered ? offset * 265 : offset * 18;
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
                className={`absolute w-[280px] sm:w-[310px] p-7 rounded-3xl bg-zinc-950/90 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl flex flex-col justify-between text-left h-[400px] hover:border-pinkCustom/50 transition-colors duration-300 group`}
              >
                {/* Background Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl opacity-40 pointer-events-none`} />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${card.tagColor}`}>
                    {card.badge}
                  </span>
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-200">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Team Member Info */}
                <div className="relative z-10 my-auto">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-headline font-bold text-zinc-100 leading-snug">
                      {card.name}
                    </h3>
                    <span className="text-[10px] font-mono text-pinkCustom font-bold">{card.experience}</span>
                  </div>
                  <span className="text-xs font-mono text-cyanCustom block mb-3 font-semibold">{card.role}</span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {card.bio}
                  </p>
                </div>

                {/* Skills Checklist */}
                <div className="relative z-10 space-y-1.5 border-t border-white/8 pt-3 mt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Core Expertise:</span>
                  {card.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                      <Award size={12} className="text-cyanCustom shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <p className="text-center text-zinc-500 font-mono text-xs mt-6">
        {isHovered ? '✨ Interactive Team View Active — In-house software development & architecture' : '💡 Hover over or tap the deck to meet our engineering team'}
      </p>

    </section>
  );
}
