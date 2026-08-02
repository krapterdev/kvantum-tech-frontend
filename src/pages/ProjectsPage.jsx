import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Layers, Sparkles, Code, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FAQ, { projectsFaqs } from '@/components/sections/FAQ';

const defaultProjects = [
  {
    id: 'hotel-reservation-pos',
    title: 'Hotel Reservation & Billing POS Platform',
    category: 'Custom Software',
    client: 'Luxe Resorts Group',
    desc: 'Automated room booking engine, restaurant POS sync, guest check-in, and WhatsApp checkout invoice dispatch.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
  {
    id: 'real-estate-crm-pipeline',
    title: 'Real Estate Lead CRM & Site Visit Automation',
    category: 'CRM & ERP',
    client: 'Horizon Properties',
    desc: 'Lead capture from portals, automated site visit scheduling, sales representative scoring, and follow-up bot.',
    tags: ['React', 'PHP / Laravel', 'MySQL', 'Meta API'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
  {
    id: 'healthcare-patient-system',
    title: 'OPD Patient Management & WhatsApp Lab Reports',
    category: 'Automation',
    client: 'MediCare Clinics Network',
    desc: 'OPD patient health records, doctor appointment scheduling, automated lab report PDF dispatch via WhatsApp.',
    tags: ['React', 'Node.js', 'MongoDB', 'WhatsApp Bot'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
  {
    id: 'manufacturing-erp-inventory',
    title: 'Industrial Manufacturing ERP & Stock Control',
    category: 'CRM & ERP',
    client: 'Metro Manufacturing',
    desc: 'Raw material inventory alerts, production line logging, vendor purchase order management, and P&L dashboards.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
  {
    id: 'school-fee-lms-platform',
    title: 'School Fee Gateway & LMS Parent Portal',
    category: 'Web & Mobile Apps',
    client: 'Starlight Academy',
    desc: 'Student admission funnels, automated online fee payment reminders, attendance tracking, and parent apps.',
    tags: ['React Native', 'Node.js', 'MySQL', 'Payment API'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
  {
    id: 'ecommerce-cart-recovery-bot',
    title: 'Multi-Store Ecommerce & WhatsApp Cart Recovery',
    category: 'Automation',
    client: 'Quantum Retail',
    desc: 'Multi-channel order fulfillment, abandoned cart WhatsApp recovery bot, marketplace stock sync.',
    tags: ['React', 'Node.js', 'Redis', 'WhatsApp API'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67d577c77e?w=800&auto=format&fit=crop&q=80',
    link: 'https://kvantumtechsolutions.com',
  },
];

export default function ProjectsPage({ portfolios = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const displayList = portfolios.length > 0 ? portfolios : defaultProjects;

  const categories = ['All', 'Custom Software', 'CRM & ERP', 'Automation', 'Web & Mobile Apps'];

  const filteredProjects = activeCategory === 'All'
    ? displayList
    : displayList.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 text-left select-none space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
          <Sparkles size={14} /> Proven Technical Deliverables
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black font-headline text-slate-900 dark:text-white uppercase leading-tight mb-4">
          FEATURED PORTFOLIO & <br />
          <span className="gradient-text">CLIENT CASE STUDIES</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore custom software applications, enterprise CRMs, WhatsApp automation bots, and web platforms built by Kvantum Tech.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id || project._id}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={project.image || defaultProjects[0].image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/20 backdrop-blur-md">
                  {project.category || 'Software'}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col justify-between flex-1 gap-4">
              <div>
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold block mb-1">
                  Client: {project.client || 'Enterprise Partner'}
                </span>
                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.desc || project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="space-y-3 border-t border-slate-100 dark:border-zinc-800 pt-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    let tagsList = ['React', 'Node.js', 'PostgreSQL'];
                    if (Array.isArray(project.tags) && project.tags.length > 0) {
                      tagsList = project.tags;
                    } else if (typeof project.tags === 'string' && project.tags.trim()) {
                      tagsList = project.tags.split(',').map(t => t.trim());
                    }
                    return tagsList.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ));
                  })()}
                </div>

                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-600 dark:text-pink-400 hover:underline pt-2"
                >
                  View Case Study <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Projects Specific FAQ */}
      <FAQ items={projectsFaqs} title="Projects & Delivery" subtitle="Frequently Asked Questions" />

    </div>
  );
}
