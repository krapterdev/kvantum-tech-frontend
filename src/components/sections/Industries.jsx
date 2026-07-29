import React from 'react';
import {
  Factory, Heart, Home, ShoppingBag, UtensilsCrossed,
  Briefcase, GraduationCap, Truck, Building2, Pill,
  Wrench, Layers, Hotel, BarChart2, Users, Package, Globe, Scissors
} from 'lucide-react';
import Badge from '../ui/Badge';

const industries = [
  { icon: Factory, name: 'Manufacturing', desc: 'Production tracking, inventory, quality management' },
  { icon: Heart, name: 'Healthcare', desc: 'Patient records, appointments, billing, staff management' },
  { icon: Home, name: 'Real Estate', desc: 'Lead tracking, property listings, buyer journey' },
  { icon: Hotel, name: 'Hotels & Hospitality', desc: 'Reservations, housekeeping, guest management' },
  { icon: ShoppingBag, name: 'Ecommerce & Retail', desc: 'Orders, inventory, returns, customer notifications' },
  { icon: Package, name: 'Wholesale & Distribution', desc: 'Purchase orders, supplier payments, stock control' },
  { icon: UtensilsCrossed, name: 'Food & Restaurants', desc: 'POS, table management, supplier tracking' },
  { icon: Truck, name: 'Logistics & Transport', desc: 'Fleet, delivery tracking, driver management' },
  { icon: Briefcase, name: 'Finance & Accounting', desc: 'Billing, invoicing, GST compliance, ledgers' },
  { icon: GraduationCap, name: 'Education', desc: 'Student records, fees, attendance, LMS' },
  { icon: Building2, name: 'Construction', desc: 'Project tracking, material costs, contractor management' },
  { icon: Pill, name: 'Pharma & Medical', desc: 'Drug inventory, expiry tracking, sales reporting' },
  { icon: Wrench, name: 'Services & Maintenance', desc: 'Job scheduling, technician dispatch, AMC contracts' },
  { icon: Scissors, name: 'Beauty & Wellness', desc: 'Bookings, client history, staff payroll' },
  { icon: Globe, name: 'IT & Startups', desc: 'Team workflows, client portals, project billing' },
  { icon: Users, name: 'Staffing & Recruitment', desc: 'Candidate pipeline, client tracking, placements' },
  { icon: BarChart2, name: 'Marketing & Agencies', desc: 'Campaign tracking, client reporting, lead pipelines' },
  { icon: Layers, name: 'Any Business', desc: 'We build custom solutions for any industry vertical' },
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
            Software Solutions Built for <br />
            <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We've built software for businesses across every sector. No matter your industry, we design solutions that align with your workflows, regulations, and operational needs.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pinkCustom/30 hover:bg-pinkCustom/5 hover:-translate-y-1 transition-all duration-300 cursor-default group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center group-hover:border-pinkCustom/30 transition-colors duration-300">
                  <Icon size={20} className="text-pinkCustom" />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-xs font-bold font-headline mb-1 leading-tight">{industry.name}</h4>
                  <p className="text-zinc-500 text-[10px] leading-relaxed">{industry.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
