import React from 'react';
import {
  Factory, Heart, Hotel, Home, GraduationCap, ShoppingBag,
  Truck, Building2, Briefcase, Rocket
} from 'lucide-react';
import Badge from '../ui/Badge';

const industries = [
  {
    icon: Factory,
    name: 'Manufacturing',
    color: 'text-cyanCustom',
    bgColor: 'bg-cyanCustom/10 border-cyanCustom/20',
    desc: 'Digitize production, inventory, procurement, vendor management, quality control, and reporting with custom manufacturing software.'
  },
  {
    icon: Heart,
    name: 'Healthcare',
    color: 'text-pinkCustom',
    bgColor: 'bg-pinkCustom/10 border-pinkCustom/20',
    desc: 'Develop secure healthcare software, patient management systems, appointment booking, hospital CRM, billing, and staff management solutions.'
  },
  {
    icon: Hotel,
    name: 'Hotels & Hospitality',
    color: 'text-purpleCustom',
    bgColor: 'bg-purpleCustom/10 border-purpleCustom/20',
    desc: 'Automate reservations, room management, guest communication, billing, housekeeping, and hotel operations with smart hospitality software.'
  },
  {
    icon: Home,
    name: 'Real Estate',
    color: 'text-cyanCustom',
    bgColor: 'bg-cyanCustom/10 border-cyanCustom/20',
    desc: 'Manage leads, properties, site visits, follow-ups, customer communication, documentation, and sales using real estate CRM software.'
  },
  {
    icon: GraduationCap,
    name: 'Education',
    color: 'text-pinkCustom',
    bgColor: 'bg-pinkCustom/10 border-pinkCustom/20',
    desc: 'Build school ERP systems, student management software, attendance systems, fee management, online learning platforms, and staff management solutions.'
  },
  {
    icon: ShoppingBag,
    name: 'Retail & Ecommerce',
    color: 'text-purpleCustom',
    bgColor: 'bg-purpleCustom/10 border-purpleCustom/20',
    desc: 'Manage products, orders, customers, inventory, billing, warehouses, and online stores with integrated retail software.'
  },
  {
    icon: Truck,
    name: 'Logistics & Transportation',
    color: 'text-cyanCustom',
    bgColor: 'bg-cyanCustom/10 border-cyanCustom/20',
    desc: 'Track shipments, vehicles, drivers, deliveries, warehouses, invoices, and operational workflows from one centralized dashboard.'
  },
  {
    icon: Building2,
    name: 'Construction',
    color: 'text-pinkCustom',
    bgColor: 'bg-pinkCustom/10 border-pinkCustom/20',
    desc: 'Manage projects, contractors, vendors, materials, equipment, budgeting, and site operations digitally.'
  },
  {
    icon: Briefcase,
    name: 'Finance & Professional Services',
    color: 'text-purpleCustom',
    bgColor: 'bg-purpleCustom/10 border-purpleCustom/20',
    desc: 'Automate customer onboarding, documentation, approvals, billing, compliance, and reporting through secure business applications.'
  },
  {
    icon: Rocket,
    name: 'Startups & Enterprises',
    color: 'text-cyanCustom',
    bgColor: 'bg-cyanCustom/10 border-cyanCustom/20',
    desc: 'Launch scalable SaaS products, internal management systems, CRM platforms, HRMS software, ERP applications, and automation tools built for growth.'
  },
];

export default function Industries() {
  return (
    <section className="bg-zinc-950/30 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Industries We Serve
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Empowering Every Industry with Smart <br />
            <span className="gradient-text">Software Solutions & Business Automation</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-4">
            Every industry has unique challenges, workflows, and operational requirements. At Kvantum Tech Solutions, we don't believe in one-size-fits-all software. We develop industry-specific custom software, CRM systems, HRMS platforms, ERP solutions, web applications, mobile apps, and business automation software that align perfectly with your business processes.
          </p>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Whether you're looking to automate operations, improve customer experience, manage employees, or streamline business workflows, our solutions are designed to help you work smarter, faster, and more efficiently.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <div
                key={idx}
                className="flex flex-col gap-4 p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300 cursor-default group text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${industry.bgColor} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon size={22} className={industry.color} />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-bold font-headline text-base mb-2">{industry.name}</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">{industry.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
