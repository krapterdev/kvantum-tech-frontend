import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Users, Cpu, Layers, MessageSquare, Globe, Smartphone, BarChart2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

// Static fallback service descriptions with full SEO copy
const serviceDetails = {
  'custom-software-development': {
    icon: Settings,
    color: 'text-cyanCustom',
    shortDesc: 'Transform your ideas into powerful software with our custom software development services. We build scalable, secure, and high-performance business applications that simplify complex processes and support long-term business growth.',
    longSnippet: 'Enterprise software, internal management systems, customer portals, workflow automation platforms — all built specifically for your organization.'
  },
  'crm-software-development': {
    icon: Users,
    color: 'text-pinkCustom',
    shortDesc: 'Manage leads, customers, follow-ups, quotations, sales pipelines, and customer interactions from a centralized CRM platform.',
    longSnippet: 'Our CRM software helps businesses improve customer relationships, automate sales processes, increase conversions, and make data-driven decisions.'
  },
  'business-automation': {
    icon: Cpu,
    color: 'text-cyanCustom',
    shortDesc: 'Replace manual processes with intelligent automation. Automate approvals, lead assignments, notifications, reporting, invoices, employee management, and business workflows.',
    longSnippet: 'Save valuable time while improving operational efficiency across departments.'
  },
  'hrms-software': {
    icon: Layers,
    color: 'text-purpleCustom',
    shortDesc: 'Manage your complete workforce from one platform. Our HRMS software includes attendance management, leave management, payroll, employee records, recruitment, onboarding, and performance tracking.',
    longSnippet: 'Simplify HR operations while improving employee productivity with real-time HR analytics.'
  },
  'whatsapp-automation': {
    icon: MessageSquare,
    color: 'text-cyanCustom',
    shortDesc: 'Automate customer communication through WhatsApp. Send instant notifications, marketing campaigns, follow-up reminders, order updates, invoices, payment reminders, and appointment confirmations automatically.',
    longSnippet: 'Improve customer engagement while reducing manual communication workload.'
  },
  'web-mobile-app-development': {
    icon: Smartphone,
    color: 'text-pinkCustom',
    shortDesc: 'Build secure, scalable, and cloud-ready web applications and feature-rich Android & iOS mobile apps designed for modern businesses.',
    longSnippet: 'From CRM portals to ERP platforms, booking systems, customer dashboards, and business automation — we develop high-performance applications optimized for speed and security.'
  },
};

const fallbackServices = [
  { id: 'custom-software-development', iconName: 'Settings', title: 'Custom Software Development', shortDesc: serviceDetails['custom-software-development'].shortDesc },
  { id: 'crm-software-development', iconName: 'Users', title: 'CRM Software Development', shortDesc: serviceDetails['crm-software-development'].shortDesc },
  { id: 'business-automation', iconName: 'Cpu', title: 'Business Automation Solutions', shortDesc: serviceDetails['business-automation'].shortDesc },
  { id: 'hrms-software', iconName: 'Layers', title: 'HRMS Software Development', shortDesc: serviceDetails['hrms-software'].shortDesc },
  { id: 'whatsapp-automation', iconName: 'MessageSquare', title: 'WhatsApp Automation', shortDesc: serviceDetails['whatsapp-automation'].shortDesc },
  { id: 'web-mobile-app-development', iconName: 'Smartphone', title: 'Web & Mobile App Development', shortDesc: serviceDetails['web-mobile-app-development'].shortDesc },
];

const iconMap = { Settings, Users, Cpu, Layers, MessageSquare, Globe, Smartphone, BarChart2 };

export default function Services({ services = [] }) {
  const navigate = useNavigate();
  const displayServices = services.length > 0 ? services.slice(0, 6) : fallbackServices;

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <div className="text-left max-w-2xl">
          <Badge className="mb-5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-4">
            Complete Software Development & <br />
            <span className="gradient-text">Business Automation Services</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            At Kvantum Tech Solutions, we don't just develop software — we build digital ecosystems that help businesses grow faster, reduce operational costs, and increase productivity. Every solution is customized according to your workflow, ensuring your business gets software that truly fits your operations.
          </p>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-[1.02] shrink-0"
        >
          Explore All Services <ArrowRight size={15} />
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayServices.map(ser => {
          const detail = serviceDetails[ser.id];
          const Icon = detail?.icon || iconMap[ser.iconName] || Settings;
          const color = detail?.color || 'text-cyanCustom';
          const longSnippet = detail?.longSnippet || '';

          return (
            <Card
              key={ser.id}
              onClick={() => navigate('/services')}
              className="p-8 flex flex-col gap-5 border hover:-translate-y-2 hover:border-white/20 transition-all duration-300 text-left cursor-pointer group min-h-[320px]"
            >
              <div className={`w-11 h-11 rounded-xl bg-white/[0.02] border border-white/8 flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-lg text-zinc-100 font-bold font-headline">{ser.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{ser.shortDesc}</p>
                {longSnippet && (
                  <p className="text-zinc-500 text-xs leading-relaxed mt-1">{longSnippet}</p>
                )}
              </div>
              <div className="text-xs font-bold text-pinkCustom flex items-center gap-1 group-hover:gap-2 transition-all duration-200 mt-auto">
                Learn More <ArrowRight size={12} />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
