import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Users, Cpu, Layers, MessageSquare, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';

const coreServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    badge: 'Enterprise Engineering',
    icon: Settings,
    color: 'text-cyanCustom',
    glow: 'hover:border-cyanCustom/40 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)]',
    tagBg: 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/20',
    desc: 'Transform your business workflows into high-performance, secure custom software. We engineer scalable management systems, client portals, and cloud solutions built specifically for your organization.',
    highlights: ['100% Custom Source Code', 'Scalable Cloud Architecture', 'Zero Recurring License Fees'],
  },
  {
    id: 'crm-software-development',
    title: 'CRM Software Development',
    badge: 'Sales & Lead Funnels',
    icon: Users,
    color: 'text-pinkCustom',
    glow: 'hover:border-pinkCustom/40 hover:shadow-[0_15px_30px_rgba(236,72,153,0.15)]',
    tagBg: 'bg-pinkCustom/10 text-pinkCustom border-pinkCustom/20',
    desc: 'Manage leads, customer pipelines, follow-up automation, quotation generation, and sales performance from a centralized high-converting CRM dashboard.',
    highlights: ['Lead Scoring & Assignment', 'Quotation & Invoice Builder', 'Sales Pipeline Analytics'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation Solutions',
    badge: 'Workflow Optimization',
    icon: Cpu,
    color: 'text-purpleCustom',
    glow: 'hover:border-purpleCustom/40 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)]',
    tagBg: 'bg-purpleCustom/10 text-purpleCustom border-purpleCustom/20',
    desc: 'Eliminate repetitive manual tasks. We build intelligent automation engines for approvals, lead dispatch, instant alerts, attendance tracking, and multi-department workflows.',
    highlights: ['Approval Workflow Automation', 'Real-Time Notification Alerts', '75% Efficiency Boost'],
  },
  {
    id: 'hrms-software',
    title: 'HRMS & Payroll Software',
    badge: 'Workforce Management',
    icon: Layers,
    color: 'text-emerald-400',
    glow: 'hover:border-emerald-500/40 hover:shadow-[0_15px_30px_rgba(16,185,129,0.15)]',
    tagBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    desc: 'Unify workforce management from one portal. Includes biometric attendance sync, automated salary slip generation, leave approvals, employee records, and HR analytics.',
    highlights: ['Biometric & GPS Punch-in', 'Auto Salary Calculation', 'Leave & Employee Portal'],
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation Platform',
    badge: 'Official Meta API',
    icon: MessageSquare,
    color: 'text-cyanCustom',
    glow: 'hover:border-cyanCustom/40 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)]',
    tagBg: 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/20',
    desc: 'Automate customer communications with official WhatsApp Business API. Trigger instant order alerts, payment reminders, promotional campaigns, and 24/7 AI chat replies.',
    highlights: ['Official Green Tick API', 'Bulk Broadcast Campaigns', '24/7 Interactive AI Bot'],
  },
  {
    id: 'web-mobile-app-development',
    title: 'Web & Mobile App Development',
    badge: 'Cross-Platform Apps',
    icon: Smartphone,
    color: 'text-pinkCustom',
    glow: 'hover:border-pinkCustom/40 hover:shadow-[0_15px_30px_rgba(236,72,153,0.15)]',
    tagBg: 'bg-pinkCustom/10 text-pinkCustom border-pinkCustom/20',
    desc: 'Launch cloud-ready web applications and feature-rich Android & iOS mobile apps. Built using modern stacks (React, Flutter, Node, Laravel) for lightning speed and security.',
    highlights: ['iOS & Android Mobile Apps', 'Cloud-Native Web Portals', 'Modern Responsive UI/UX'],
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <div className="text-left max-w-2xl">
          <Badge className="mb-5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            <Sparkles size={14} /> Core Services & Solutions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
            Complete Custom Software & <br />
            <span className="gradient-text">Business Automation Services</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            At Kvantum Tech Solutions, we build digital ecosystems that automate operations, lower overhead costs, and accelerate company growth. Every software system is tailored to your exact workflows.
          </p>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] shrink-0 cursor-pointer"
        >
          Explore All Services <ArrowRight size={15} />
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {coreServices.map(ser => {
          const Icon = ser.icon;

          return (
            <div
              key={ser.id}
              onClick={() => navigate('/services')}
              className={`p-8 rounded-3xl bg-zinc-950/80 border border-white/10 ${ser.glow} transition-all duration-300 flex flex-col justify-between gap-6 cursor-pointer group backdrop-blur-xl shadow-md min-h-[360px]`}
            >
              {/* Card Top */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${ser.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${ser.tagBg}`}>
                    {ser.badge}
                  </span>
                </div>

                <h3 className="text-xl text-zinc-100 font-bold font-headline mb-3 leading-snug group-hover:text-pinkCustom transition-colors">
                  {ser.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
                  {ser.desc}
                </p>
              </div>

              {/* Highlights & Learn More */}
              <div className="space-y-3 border-t border-white/8 pt-4">
                <div className="space-y-1.5">
                  {ser.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={13} className={ser.color} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-bold text-pinkCustom flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200 pt-2">
                  Learn More <ArrowRight size={13} />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
