import React from 'react';
import Badge from '../ui/Badge';

const techGroups = [
  {
    label: 'Backend Development',
    techs: ['PHP', 'Laravel', 'Node.js', 'Express.js'],
    color: 'text-cyanCustom',
  },
  {
    label: 'Frontend Development',
    techs: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS'],
    color: 'text-pinkCustom',
  },
  {
    label: 'Mobile Development',
    techs: ['Flutter', 'React Native'],
    color: 'text-purpleCustom',
  },
  {
    label: 'Database Technologies',
    techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    color: 'text-cyanCustom',
  },
  {
    label: 'Cloud & DevOps',
    techs: ['AWS', 'Docker', 'Nginx', 'Linux'],
    color: 'text-pinkCustom',
  },
  {
    label: 'APIs & Integrations',
    techs: ['REST APIs', 'Payment Gateway Integration', 'WhatsApp Integration', 'SMS Gateway', 'Email Services', 'Third-Party APIs'],
    color: 'text-purpleCustom',
  },
  {
    label: 'UI / UX Design',
    techs: ['Figma', 'Adobe XD', 'Responsive Design', 'Modern User Experience'],
    color: 'text-cyanCustom',
  },
];

export default function Technologies() {
  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Technology Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Modern Technologies Powering <br />
            <span className="gradient-text">Every Solution</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            At Kvantum Tech Solutions, we leverage modern technologies and industry best practices to build secure, scalable, and high-performance software solutions.
          </p>
        </div>

        {/* Tech Groups */}
        <div className="space-y-5">
          {techGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 items-start p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-200"
            >
              {/* Label */}
              <div className="flex items-center sm:items-start">
                <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${group.color} sm:pt-1`}>
                  {group.label}
                </span>
              </div>
              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2.5">
                {group.techs.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-zinc-300 text-xs sm:text-sm font-mono hover:${group.color} hover:border-current/40 hover:bg-white/5 transition-all duration-200 cursor-default`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
