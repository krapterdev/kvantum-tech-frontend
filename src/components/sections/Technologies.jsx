import React from 'react';

const techRow1 = [
  'REACT.JS', 'NODE.JS', 'PHP', 'LARAVEL', 'MYSQL', 'THREE.JS', 'AWS CLOUD', 'DOCKER', 'MONGODB', 'POSTGRESQL'
];

const techRow2 = [
  'TYPESCRIPT', 'PYTHON', 'EXPRESS.JS', 'REDIS', 'NGINX', 'FLUTTER', 'META WHATSAPP API', 'REST APIS', 'GIT', 'TAILWIND CSS'
];

export default function Technologies() {
  return (
    <section className="bg-zinc-950/90 border-y border-white/8 py-16 select-none overflow-hidden text-center">
      <div className="container mx-auto max-w-[1280px] px-6 mb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold block">
          MODERN TECH STACK & CLOUD INFRASTRUCTURE WE USE
        </span>
      </div>

      {/* Row 1 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-4 opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-left space-x-8 shrink-0">
          {techRow1.concat(techRow1).map((tech, idx) => (
            <span
              key={idx}
              className="px-6 py-2.5 rounded-xl bg-white/[0.02] border border-white/8 font-mono text-xs font-bold text-zinc-300 tracking-widest hover:text-cyanCustom hover:border-cyanCustom/40 transition-colors"
            >
              • {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex animate-marquee-right space-x-8 shrink-0">
          {techRow2.concat(techRow2).map((tech, idx) => (
            <span
              key={idx}
              className="px-6 py-2.5 rounded-xl bg-white/[0.02] border border-white/8 font-mono text-xs font-bold text-zinc-300 tracking-widest hover:text-pinkCustom hover:border-pinkCustom/40 transition-colors"
            >
              • {tech}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
