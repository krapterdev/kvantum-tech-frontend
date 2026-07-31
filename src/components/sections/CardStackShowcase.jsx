import React, { useState } from 'react';
import {
  Users, Sparkles, Code, Palette, Search, Share2, TrendingUp, Award, CheckCircle2
} from 'lucide-react';
import Badge from '../ui/Badge';

const teamCards = [
  {
    id: 1,
    name: 'Sahil Kumar',
    role: 'Head of Web Design & Development',
    experience: '10+ Yrs Exp.',
    badge: 'Web Architecture & UI',
    tagColor: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/30',
    icon: Code,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    bio: 'Leads custom software architecture, full-stack web application engineering, and responsive UI design.',
    skills: ['Web Architecture', 'React & Full-Stack', 'UI/UX Engineering'],
  },
  {
    id: 2,
    name: 'Bhavya Nigam',
    role: 'Head of Business Development & Sales',
    experience: '10+ Yrs Exp.',
    badge: 'Enterprise Growth',
    tagColor: 'text-cyanCustom bg-cyanCustom/10 border-cyanCustom/30',
    icon: TrendingUp,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    bio: 'Drives enterprise sales strategy, client consulting, and strategic business growth solutions.',
    skills: ['Business Development', 'Client Consulting', 'Growth Strategy'],
  },
  {
    id: 3,
    name: 'Anil Thapa',
    role: 'Head of SMO & Social Media Marketing',
    experience: '7+ Yrs Exp.',
    badge: 'Social Media & Branding',
    tagColor: 'text-purpleCustom bg-purpleCustom/10 border-purpleCustom/30',
    icon: Share2,
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    bio: 'Spearheads brand positioning, multi-channel social media campaigns, and community engagement.',
    skills: ['SMO Strategy', 'Brand Campaigns', 'Audience Growth'],
  },
  {
    id: 4,
    name: 'Ankit Kumar',
    role: 'Head of SEO & Organic Growth',
    experience: '6+ Yrs Exp.',
    badge: 'Search Engine Optimization',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: Search,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    bio: 'Specializes in technical SEO auditing, high-converting keyword architecture, and search visibility.',
    skills: ['Technical SEO', 'Keyword Architecture', 'Organic Traffic'],
  },
  {
    id: 5,
    name: 'Kunal Dinkar Singh',
    role: 'Head of Graphic Design & Creative Media',
    experience: '5+ Yrs Exp.',
    badge: 'Creative & Visual Design',
    tagColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    icon: Palette,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    bio: 'Oversees visual identity design, brand aesthetics, UI graphics, and marketing media assets.',
    skills: ['Graphic Design', 'Brand Identity', 'UI Visuals & Assets'],
  },
  {
    id: 6,
    name: 'Akansha Sharma',
    role: 'Business Development Executive',
    experience: '2+ Yrs Exp.',
    badge: 'Client Relations & Sales',
    tagColor: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/30',
    icon: Users,
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    bio: 'Manages client onboarding, initial project consultations, and daily sales coordination.',
    skills: ['Client Onboarding', 'Sales Support', 'Requirements Gathering'],
  },
];

export default function CardStackShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none overflow-hidden">

      {/* Header */}
      <div className="text-center mb-14">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Users size={14} className="animate-pulse" /> Meet Our Leadership & Core Team
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          In-House Experts & Department Heads <br />
          <span className="gradient-text">Hover or Touch Below to Spread Our Team Deck</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Hover over or tap the card stack to expand our leadership team across 90% width of the screen.
        </p>
      </div>

      {/* Interactive Card Fan-Out Container (90% Width Spread) */}
      <div
        className="relative min-h-[460px] sm:min-h-[500px] w-full flex items-center justify-center py-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 blur-3xl pointer-events-none rounded-full" />

        {/* 90% Width Cards Fan-Out Wrapper */}
        <div className="relative w-full max-w-[90%] mx-auto flex justify-center items-center h-[420px]">
          {teamCards.map((card, idx) => {
            const Icon = card.icon;

            const total = teamCards.length;
            const centerIdx = (total - 1) / 2;
            const offset = idx - centerIdx;

            // 90% spread offsets across 6 cards
            // When hovered: Spread out horizontally across container width (~180px gap between cards)
            // When collapsed: Stacked neatly in center with slight offset
            const rotateDeg = isHovered ? offset * 4 : offset * -2;
            const translateX = isHovered ? offset * 180 : offset * 14;
            const translateY = isHovered ? (Math.abs(offset) === 2.5 ? 12 : 0) : offset * 6;
            const scale = isHovered ? 1 : 1 - Math.abs(offset) * 0.03;
            const zIndex = isHovered ? 10 + idx : total - Math.abs(offset);

            return (
              <div
                key={card.id}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="absolute w-[260px] sm:w-[290px] p-6 sm:p-7 rounded-3xl bg-zinc-950/95 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between text-left h-[420px] hover:border-pinkCustom/60 transition-colors duration-300 group"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl opacity-40 pointer-events-none`} />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.tagColor}`}>
                    {card.badge}
                  </span>
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-200 shrink-0">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Team Info */}
                <div className="relative z-10 my-auto">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-headline font-bold text-zinc-100 leading-snug">
                      {card.name}
                    </h3>
                    <span className="text-[10px] font-mono text-pinkCustom font-bold shrink-0">{card.experience}</span>
                  </div>
                  <span className="text-xs font-mono text-cyanCustom block mb-2.5 font-semibold leading-snug">{card.role}</span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {card.bio}
                  </p>
                </div>

                {/* Core Expertise Skills */}
                <div className="relative z-10 space-y-1 border-t border-white/8 pt-3 mt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Expertise:</span>
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
        {isHovered ? '✨ 90% Width Spread Active — Leadership & Department Heads' : '💡 Hover over or tap the deck to spread our team cards across the screen'}
      </p>

    </section>
  );
}
