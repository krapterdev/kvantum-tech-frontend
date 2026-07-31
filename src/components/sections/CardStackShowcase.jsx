import React from 'react';
import { Users, Code, Palette, Search, Share2, TrendingUp, Award, CheckCircle2, User } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const teamMembers = [
  {
    id: 1,
    name: 'Sahil Kumar',
    role: 'Head of Web Design & Development',
    experience: '10+ Yrs Exp.',
    badge: 'Web Architecture & UI',
    tagColor: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/30',
    icon: Code,
    gradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
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
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
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
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
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
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
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
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
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
    gradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
    bio: 'Manages client onboarding, initial project consultations, and daily sales coordination.',
    skills: ['Client Onboarding', 'Sales Support', 'Requirements Gathering'],
  },
];

export default function CardStackShowcase() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Users size={14} className="animate-pulse" /> Meet Our Leadership & Core Team
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          In-House Experts & <br />
          <span className="gradient-text">Department Heads</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          No middlemen or outsourced resellers. Real experienced engineers, designers, and growth heads building your custom software.
        </p>
      </div>

      {/* Super Readable 6-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const Icon = member.icon;
          return (
            <div
              key={member.id}
              className="p-7 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-pinkCustom/40 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between gap-6 cursor-default group backdrop-blur-xl hover:-translate-y-1.5 shadow-lg"
            >
              {/* Member Top */}
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-pinkCustom group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${member.tagColor}`}>
                    {member.badge}
                  </span>
                </div>

                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-headline font-bold text-zinc-100 group-hover:text-pinkCustom transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-[11px] font-mono text-pinkCustom font-bold shrink-0">{member.experience}</span>
                </div>

                <span className="text-xs font-mono text-cyanCustom block mb-3 font-semibold">{member.role}</span>
                
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              {/* Member Skills */}
              <div className="space-y-2 border-t border-white/8 pt-4 mt-auto">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">Core Domain Expertise:</span>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono text-zinc-300 bg-white/[0.03] border border-white/8 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <Award size={11} className="text-cyanCustom" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
