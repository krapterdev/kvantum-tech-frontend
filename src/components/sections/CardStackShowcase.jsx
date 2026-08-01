import React from 'react';
import { Users, Code, Palette, Search, Share2, TrendingUp, Award } from 'lucide-react';
import Badge from '../ui/Badge';

const teamMembers = [
  {
    id: 1,
    name: 'Sahil Kumar',
    role: 'Head of Web Design & Development',
    experience: '10+ Yrs Exp.',
    badge: 'Web Architecture & UI',
    tagColor: 'text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/30',
    icon: Code,
    bio: 'Leads custom software architecture, full-stack web application engineering, and responsive UI design.',
    skills: ['Web Architecture', 'React & Full-Stack', 'UI/UX Engineering'],
  },
  {
    id: 2,
    name: 'Bhavya Nigam',
    role: 'Head of Business Development & Sales',
    experience: '10+ Yrs Exp.',
    badge: 'Enterprise Growth',
    tagColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30',
    icon: TrendingUp,
    bio: 'Drives enterprise sales strategy, client consulting, and strategic business growth solutions.',
    skills: ['Business Development', 'Client Consulting', 'Growth Strategy'],
  },
  {
    id: 3,
    name: 'Anil Thapa',
    role: 'Head of SMO & Social Media Marketing',
    experience: '7+ Yrs Exp.',
    badge: 'Social Media & Branding',
    tagColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30',
    icon: Share2,
    bio: 'Spearheads brand positioning, multi-channel social media campaigns, and community engagement.',
    skills: ['SMO Strategy', 'Brand Campaigns', 'Audience Growth'],
  },
  {
    id: 4,
    name: 'Ankit Kumar',
    role: 'Head of SEO & Organic Growth',
    experience: '6+ Yrs Exp.',
    badge: 'Search Engine Optimization',
    tagColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    icon: Search,
    bio: 'Specializes in technical SEO auditing, high-converting keyword architecture, and search visibility.',
    skills: ['Technical SEO', 'Keyword Architecture', 'Organic Traffic'],
  },
  {
    id: 5,
    name: 'Kunal Dinkar Singh',
    role: 'Head of Graphic Design & Creative Media',
    experience: '5+ Yrs Exp.',
    badge: 'Creative & Visual Design',
    tagColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
    icon: Palette,
    bio: 'Oversees visual identity design, brand aesthetics, UI graphics, and marketing media assets.',
    skills: ['Graphic Design', 'Brand Identity', 'UI Visuals & Assets'],
  },
  {
    id: 6,
    name: 'Akansha Sharma',
    role: 'Business Development Executive',
    experience: '2+ Yrs Exp.',
    badge: 'Client Relations & Sales',
    tagColor: 'text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/30',
    icon: Users,
    bio: 'Manages client onboarding, initial project consultations, and daily sales coordination.',
    skills: ['Client Onboarding', 'Sales Support', 'Requirements Gathering'],
  },
];

export default function CardStackShowcase() {
  return (
    <section id="team" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
          <Users size={14} /> Leadership & Core Department Heads
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Experienced In-House Engineers & <br />
          <span className="gradient-text">Department Leadership</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
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
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between gap-6 cursor-default group hover:-translate-y-1 shadow-md dark:shadow-xl relative z-10"
            >
              {/* Member Top */}
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${member.tagColor}`}>
                    {member.badge}
                  </span>
                </div>

                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white group-hover:text-pink-500 transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-[11px] font-mono text-pink-600 dark:text-pink-400 font-bold shrink-0">{member.experience}</span>
                </div>

                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 block mb-3 font-semibold">{member.role}</span>
                
                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              {/* Member Skills */}
              <div className="space-y-2 border-t border-slate-100 dark:border-zinc-800 pt-4 mt-auto">
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest block mb-1.5 font-bold">Core Domain Expertise:</span>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <Award size={11} className="text-cyan-500" />
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
