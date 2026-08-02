import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles, Mail, ArrowRight, ShieldCheck, Code, Award, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import FAQ, { aboutFaqs } from '@/components/sections/FAQ';
import { defaultTeamMembers, DUMMY_AVATAR } from '@/data/team';

export default function TeamPage({ teamMembers = defaultTeamMembers }) {
  const members = teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <Badge className="mb-2 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs">
          <Users size={14} /> Leadership & Engineering Experts
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight">
          MEET THE ARCHITECTS BEHIND <br />
          <span className="gradient-text">YOUR DIGITAL SOLUTIONS</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Our team of senior software engineers, AI automation specialists, and UI architects dedicated to engineering scalable, high-performance software for your business.
        </p>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {members.map((m) => {
          const avatarUrl = m.image ? m.image : DUMMY_AVATAR;
          return (
            <Card
              key={m.id || m._id || m.name}
              className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Profile Image - Custom image if present, otherwise clean Dummy Avatar */}
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-900/90 dark:bg-zinc-950 p-2 flex items-center justify-center border border-slate-100 dark:border-zinc-800 relative">
                  <img
                    src={avatarUrl}
                    alt={m.name}
                    title={m.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {!m.image && (
                    <span className="absolute bottom-4 right-4 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/20">
                      Avatar Placeholder
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      {m.experience || m.exp || 'Team Lead'}
                    </span>
                    {m.badge && (
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-zinc-400">
                        {m.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white pt-1">
                    {m.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 block">
                    {m.role}
                  </span>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                    {m.bio}
                  </p>

                  {m.skills && m.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {m.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">Kvantum Core Team</span>
                <Link to="/contact" className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1">
                  Consult <ArrowRight size={12} />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Engineering Culture Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white dark:bg-zinc-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-2 max-w-2xl text-left">
          <Badge className="bg-pink-500/10 border-pink-500/20 text-pink-400 font-mono text-xs">
            <Award size={13} /> Engineering Excellence
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight">
            Want to Join Our Software Engineering Team?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            We are always looking for talented Full-Stack Developers, AI Engineers, and Systems Architects who love building clean code.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-8 py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg shrink-0"
        >
          Get In Touch →
        </Link>
      </div>

      {/* Page FAQ placed at bottom */}
      <FAQ items={aboutFaqs} title="Team & Methodology" subtitle="Frequently Asked Questions" />

    </div>
  );
}
