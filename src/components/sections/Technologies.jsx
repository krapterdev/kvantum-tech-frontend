import React from 'react';
import Badge from '../ui/Badge';

const techGroups = [
  {
    label: 'Backend',
    techs: ['Node.js', 'PHP', 'Laravel', 'Python', 'Express.js']
  },
  {
    label: 'Frontend',
    techs: ['React.js', 'Next.js', 'Vue.js', 'HTML5', 'CSS3']
  },
  {
    label: 'Mobile',
    techs: ['Flutter', 'React Native']
  },
  {
    label: 'Database',
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis']
  },
  {
    label: 'Cloud & DevOps',
    techs: ['AWS', 'Docker', 'Nginx', 'GitHub CI/CD']
  },
  {
    label: 'Integrations',
    techs: ['WhatsApp API', 'REST APIs', 'Twilio', 'Razorpay', 'Stripe']
  },
];

export default function Technologies() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Technology Stack
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Built with Industry-Leading <br />
          <span className="gradient-text">Technologies</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We use modern, scalable, and battle-tested technology stacks to build software that is fast, secure, and maintainable for years to come.
        </p>
      </div>

      {/* Tech Groups */}
      <div className="space-y-8">
        {techGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-28 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-r border-white/10 pr-4 block">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {group.techs.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-zinc-300 text-xs sm:text-sm font-mono hover:border-cyanCustom/40 hover:text-cyanCustom hover:bg-cyanCustom/5 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
