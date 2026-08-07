import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';

const expertiseAreas = [
  'Custom CRM Platforms',
  'Business Automation Systems',
  'HRMS Software',
  'ERP Applications',
  'Hotel Management Software',
  'Healthcare Solutions',
  'Inventory Management Systems',
  'Ecommerce Platforms',
  'Mobile Applications',
  'Customer Portals',
  'Employee Portals',
  'Enterprise Web Applications',
  'Workflow Automation Systems',
  'WhatsApp Automation Platforms',
];

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Copy */}
        <div className="flex flex-col items-start text-left">
          <Badge className="mb-5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            Portfolio & Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Software Built to Solve Real Business Challenges
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
            Explore how we turn operational challenges and product ideas into practical digital solutions. Our work spans custom business software, CRM systems, HR platforms, automation workflows, web applications, and mobile products.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            Explore Our Portfolio <ArrowRight size={15} />
          </button>
        </div>

        {/* Right: Expertise Grid */}
        <div>
          <h3 className="text-zinc-300 text-sm font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-3">
            Our Expertise Includes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expertiseAreas.map((area, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/8 hover:border-cyanCustom/30 hover:bg-cyanCustom/5 transition-all duration-200 group"
              >
                <CheckCircle2 size={14} className="text-cyanCustom shrink-0" />
                <span className="text-zinc-300 text-xs sm:text-sm group-hover:text-zinc-100 transition-colors">{area}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
