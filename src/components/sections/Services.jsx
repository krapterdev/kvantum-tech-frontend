import React from 'react';
import Link from '../ui/SafeLink';
import { Code, Database, Cpu, MessageSquare, Smartphone, Zap, ArrowRight, Shield, Layers, Globe } from 'lucide-react';
import Badge from '../ui/Badge';

const serviceCards = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'Build purpose-driven software tailored to your processes, users, and business goals. From internal management platforms to complex enterprise applications, we develop secure and scalable solutions from the ground up.',
    link: '/services/custom-software-development',
    ctaText: 'Explore Custom Software Development →',
    icon: Code,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    num: '02',
    title: 'CRM Software Development',
    desc: 'Turn leads and customer interactions into structured sales processes with custom CRM software for lead management, follow-ups, pipelines, quotations, communication, reporting, and team performance.',
    link: '/services/crm-software-development',
    ctaText: 'Explore CRM Development →',
    icon: Database,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
  {
    num: '03',
    title: 'HRMS Software Development',
    desc: 'Simplify workforce management with custom HRMS solutions for employee records, attendance, leave, payroll, onboarding, recruitment, performance, and HR reporting.',
    link: '/services/hrms-software-development',
    ctaText: 'Explore HRMS Development →',
    icon: Shield,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    num: '04',
    title: 'ERP Software Development',
    desc: 'Connect departments, data, and operations through custom ERP software designed around your finance, inventory, procurement, sales, HR, and operational workflows.',
    link: '/services/erp-software-development',
    ctaText: 'Explore ERP Development →',
    icon: Layers,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    num: '05',
    title: 'Business Automation',
    desc: 'Replace repetitive manual work with connected workflows. Automate lead routing, approvals, notifications, reporting, tasks, documents, customer communication, and everyday business processes.',
    link: '/services/business-automation',
    ctaText: 'Explore Business Automation →',
    icon: Cpu,
    color: 'text-cyanCustom bg-cyanCustom/10 border-cyanCustom/20',
  },
  {
    num: '06',
    title: 'WhatsApp Automation',
    desc: 'Integrate WhatsApp into your business workflows for automated notifications, customer updates, reminders, lead communication, support, and API-driven messaging.',
    link: '/services/whatsapp-automation',
    ctaText: 'Explore WhatsApp Automation →',
    icon: MessageSquare,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    num: '07',
    title: 'Web Application Development',
    desc: 'Develop responsive, secure, and scalable web applications—from customer portals and SaaS platforms to internal dashboards and business management systems.',
    link: '/services/web-mobile-app-development',
    ctaText: 'Explore Web App Development →',
    icon: Globe,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    num: '08',
    title: 'Mobile App Development',
    desc: 'Build Android, iOS, and cross-platform mobile applications for customers, employees, field teams, ecommerce, operations, and digital products.',
    link: '/services/web-mobile-app-development',
    ctaText: 'Explore Mobile App Development →',
    icon: Smartphone,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
];

const iconMap = {
  Settings: Code,
  Code: Code,
  Users: Database,
  Database: Database,
  Cpu: Cpu,
  Layers: Shield,
  Shield: Shield,
  MessageSquare: MessageSquare,
  Smartphone: Smartphone,
  Globe: Globe,
  Zap: Zap
};

export default function Services({ services = [] }) {
  // Combine CMS services or fallback cards
  const rawServices = Array.isArray(services) && services.length > 0 ? services : serviceCards;

  // Sort explicitly by sortOrder
  const allServices = [...rawServices].sort((a, b) => {
    const orderA = a.sortOrder !== undefined && a.sortOrder !== null ? Number(a.sortOrder) : 999;
    const orderB = b.sortOrder !== undefined && b.sortOrder !== null ? Number(b.sortOrder) : 999;
    return orderA - orderB;
  });

  // Filter only services marked to show in Homepage (showInHome !== false)
  const homeServices = allServices.filter(s => s.showInHome !== false);

  return (
    <section id="services" className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
          Core Services & Solutions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Custom Software Development Services for Every Stage of Growth
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          From a single business application to a connected digital ecosystem, we design and develop software that supports the way your business operates today—and where it wants to go tomorrow.
        </p>
      </div>

      {/* Dynamic Homepage Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {homeServices.map((card, idx) => {
          const Icon = (card.iconName && iconMap[card.iconName]) || card.icon || Code;
          const cardLink = card.link || `/services/${card.slug || card.id || card._id}`;
          const ctaText = card.ctaText || `Explore ${card.title} →`;
          const numStr = (idx + 1).toString().padStart(2, '0');

          return (
            <div
              key={card.id || card._id || idx}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-6 cursor-default group hover:-translate-y-1 shadow-md dark:shadow-xl"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                    {numStr}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${card.color || 'text-sky-500 bg-sky-500/10 border-sky-500/20'}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {card.shortDesc || card.desc}
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-white/8 pt-4">
                <Link 
                  to={cardLink}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-500 dark:text-cyanCustom hover:underline group-hover:translate-x-1 transition-transform"
                >
                  {ctaText}
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* Explore All Services Button */}
      <div className="mt-14 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md hover:shadow-sky-500/30 hover:scale-[1.03] cursor-pointer"
        >
          Explore All Services <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
