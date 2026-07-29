import React from 'react';
import {
  Settings, Users, BarChart2, Package, FileText, CreditCard,
  Calendar, Truck, MessageSquare, Smartphone, Shield, Database,
  Globe, BookOpen, Layers
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const products = [
  { icon: Users, name: 'CRM Software', desc: 'Lead management, sales pipeline, follow-up tracking' },
  { icon: Layers, name: 'HRMS Software', desc: 'Attendance, payroll, leaves, employee records' },
  { icon: Settings, name: 'ERP Software', desc: 'Integrated operations, finance, inventory management' },
  { icon: Package, name: 'Inventory Management', desc: 'Stock tracking, purchase orders, supplier management' },
  { icon: FileText, name: 'Payroll Software', desc: 'Auto salary calc, payslips, tax deductions, compliance' },
  { icon: MessageSquare, name: 'WhatsApp Automation', desc: 'Bulk messages, drip campaigns, auto-replies' },
  { icon: BarChart2, name: 'Sales Tracking Software', desc: 'Targets, revenue dashboards, team performance' },
  { icon: Calendar, name: 'Task Management', desc: 'Assign tasks, deadlines, daily team activity logs' },
  { icon: CreditCard, name: 'Invoice & Billing', desc: 'GST invoices, payment reminders, client billing' },
  { icon: Truck, name: 'Logistics Software', desc: 'Delivery tracking, fleet management, route planning' },
  { icon: Shield, name: 'Lead Management System', desc: 'Lead capture, scoring, assignment automation' },
  { icon: Database, name: 'Data Management System', desc: 'Structured records, custom data dashboards' },
  { icon: Globe, name: 'Client Portal', desc: 'Branded portals for client self-service & reporting' },
  { icon: BookOpen, name: 'Learning Management', desc: 'Employee training, course tracking, certifications' },
  { icon: Smartphone, name: 'Custom Mobile Apps', desc: 'iOS & Android apps for field teams and customers' },
];

export default function SoftwareProducts() {
  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Complete Business Suite
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Complete Business Software Solutions <br />
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From CRM and HRMS to billing and logistics, we design and develop all your business software solutions on one integrated platform built specifically for your operations.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <Card
                key={idx}
                className="p-5 flex flex-col gap-3 border border-white/5 hover:border-cyanCustom/30 hover:-translate-y-1 hover:bg-cyanCustom/[0.02] transition-all duration-300 cursor-default text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-cyanCustom" />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm font-bold font-headline mb-1 leading-tight">{product.name}</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{product.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-zinc-400 text-sm mb-4">Don't see your software? We build fully custom systems.</p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            Discuss Your Custom Software
          </button>
        </div>

      </div>
    </section>
  );
}
