import React from 'react';
import {
  Settings, Cpu, Layers, Shield, Zap, Link2,
  HeadphonesIcon, MessageSquare, TrendingUp, Users
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import SectionHeading from '../ui/SectionHeading';

const reasons = [
  {
    num: '01',
    icon: Settings,
    color: 'text-cyanCustom',
    bg: 'bg-cyanCustom/10 border-cyanCustom/20',
    title: 'Fully Custom Software Development',
    desc: 'Every business is different. We build software tailored specifically to your workflows, goals, and operational requirements — no templates, no cookie-cutter solutions.'
  },
  {
    num: '02',
    icon: Cpu,
    color: 'text-pinkCustom',
    bg: 'bg-pinkCustom/10 border-pinkCustom/20',
    title: 'Business Automation Experts',
    desc: 'We automate repetitive tasks, manual processes, approvals, notifications, customer communication, and internal operations to improve team efficiency and save time.'
  },
  {
    num: '03',
    icon: Layers,
    color: 'text-purpleCustom',
    bg: 'bg-purpleCustom/10 border-purpleCustom/20',
    title: 'Scalable Architecture',
    desc: 'Our software is designed to grow with your business, allowing you to add new features, users, and modules whenever required — without costly rewrites.'
  },
  {
    num: '04',
    icon: Zap,
    color: 'text-cyanCustom',
    bg: 'bg-cyanCustom/10 border-cyanCustom/20',
    title: 'Modern Technology Stack',
    desc: 'We use the latest technologies including Laravel, PHP, React, Node.js, Flutter, MySQL, REST APIs, cloud infrastructure, and modern UI/UX practices to build future-ready software.'
  },
  {
    num: '05',
    icon: Shield,
    color: 'text-pinkCustom',
    bg: 'bg-pinkCustom/10 border-pinkCustom/20',
    title: 'Enterprise-Level Security',
    desc: 'Data protection is our priority. We implement secure authentication, role-based access, encrypted data handling, and regular security best practices across every application.'
  },
  {
    num: '06',
    icon: TrendingUp,
    color: 'text-purpleCustom',
    bg: 'bg-purpleCustom/10 border-purpleCustom/20',
    title: 'Faster Development & Deployment',
    desc: 'Using agile development methodologies, we deliver projects efficiently while maintaining high quality standards and clear milestone-based communication.'
  },
  {
    num: '07',
    icon: Link2,
    color: 'text-cyanCustom',
    bg: 'bg-cyanCustom/10 border-cyanCustom/20',
    title: 'Seamless Third-Party Integrations',
    desc: 'Connect your software with payment gateways, WhatsApp Business API, SMS, Email, ERP, accounting software, cloud services, and custom APIs for a fully connected ecosystem.'
  },
  {
    num: '08',
    icon: HeadphonesIcon,
    color: 'text-pinkCustom',
    bg: 'bg-pinkCustom/10 border-pinkCustom/20',
    title: 'Dedicated Support & Maintenance',
    desc: 'Our relationship doesn\'t end after deployment. We provide continuous updates, maintenance, monitoring, and technical support to keep your software running perfectly.'
  },
  {
    num: '09',
    icon: MessageSquare,
    color: 'text-purpleCustom',
    bg: 'bg-purpleCustom/10 border-purpleCustom/20',
    title: 'Transparent Communication',
    desc: 'Stay informed throughout the project with regular progress updates, milestone tracking, collaborative planning sessions, and direct access to your dedicated project team.'
  },
  {
    num: '10',
    icon: Users,
    color: 'text-cyanCustom',
    bg: 'bg-cyanCustom/10 border-cyanCustom/20',
    title: 'Long-Term Technology Partner',
    desc: 'We focus on building long-term relationships by delivering reliable software solutions that support your business growth — project after project.'
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          Why Choose Us
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Why Businesses Choose Kvantum Tech Solutions <br />
          <span className="gradient-text">for Software Development & Automation</span>
        </h2>
        <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Choosing the right technology partner is one of the most important decisions for any business. At Kvantum Tech Solutions, we combine innovation, technical expertise, and business understanding to build software that delivers measurable results.
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <Card
              key={idx}
              className="p-7 flex flex-col gap-4 border hover:-translate-y-1.5 hover:border-white/20 transition-all duration-300 text-left group"
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${reason.bg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon size={20} className={reason.color} />
                </div>
                <span className="text-[11px] font-mono text-zinc-600 font-bold">{reason.num}</span>
              </div>
              <div>
                <h3 className="text-zinc-100 font-bold font-headline text-base mb-2">{reason.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>

    </section>
  );
}
