import React from 'react';
import {
  Users, Layers, BarChart2, Target, TrendingUp, Package,
  Warehouse, HeadphonesIcon, MessageSquare, CheckSquare,
  Clock, CreditCard, FolderKanban, Truck, ShoppingCart,
  FileText, PenLine, Wrench, Calendar, BookOpen,
  Heart, Hotel, UtensilsCrossed, ShoppingBag, PieChart,
  FileArchive, HardDrive, Globe, Smartphone, Building2
} from 'lucide-react';
import Badge from '../ui/Badge';

const products = [
  { icon: Users, name: 'Custom CRM Software', desc: 'Lead management, pipeline tracking, customer follow-ups, and sales automation' },
  { icon: Layers, name: 'HRMS Software', desc: 'Attendance, payroll, leaves, recruitment, employee records & HR analytics' },
  { icon: BarChart2, name: 'ERP Software', desc: 'Integrated finance, procurement, inventory & operational management' },
  { icon: Target, name: 'Lead Management System', desc: 'Capture, score, assign, and track leads through automated funnels' },
  { icon: TrendingUp, name: 'Sales Management Software', desc: 'Sales targets, team performance, pipeline visibility & revenue reporting' },
  { icon: Package, name: 'Inventory Management Software', desc: 'Stock tracking, reorder alerts, batch management & supplier control' },
  { icon: Warehouse, name: 'Warehouse Management System', desc: 'Multi-warehouse control, goods receipt, dispatch & stock movement' },
  { icon: HeadphonesIcon, name: 'Customer Support Software', desc: 'Ticket management, escalation rules, SLA tracking & team collaboration' },
  { icon: MessageSquare, name: 'WhatsApp Automation Platform', desc: 'Bulk campaigns, drip sequences, auto-replies & broadcast messaging' },
  { icon: CheckSquare, name: 'Task Management System', desc: 'Assign tasks, set deadlines, track progress & team daily logs' },
  { icon: Clock, name: 'Attendance Management Software', desc: 'Biometric sync, punch-in/out, shift management & attendance reports' },
  { icon: CreditCard, name: 'Payroll Management Software', desc: 'Auto salary calculations, payslip generation, tax deductions & compliance' },
  { icon: FolderKanban, name: 'Project Management Software', desc: 'Milestones, Gantt charts, team collaboration & deliverable tracking' },
  { icon: Truck, name: 'Vendor Management System', desc: 'Supplier onboarding, PO management, vendor performance & payments' },
  { icon: ShoppingCart, name: 'Procurement Software', desc: 'Purchase requisitions, approvals, cost control & vendor coordination' },
  { icon: FileText, name: 'Billing & Invoice Management', desc: 'GST invoices, payment reminders, recurring billing & client accounts' },
  { icon: PenLine, name: 'Quotation Management Software', desc: 'Create, send, track & convert quotations into confirmed orders' },
  { icon: Wrench, name: 'Service Management System', desc: 'Job scheduling, technician dispatch, AMC contracts & service history' },
  { icon: Calendar, name: 'Appointment Booking Software', desc: 'Online booking, availability management, reminders & calendar sync' },
  { icon: BookOpen, name: 'Learning Management System (LMS)', desc: 'Employee training, course tracking, assessments & certifications' },
  { icon: Heart, name: 'Hospital Management Software', desc: 'Patient records, OPD/IPD, lab, pharmacy, billing & doctor management' },
  { icon: Hotel, name: 'Hotel Management Software', desc: 'Reservations, room management, guest profiles & front desk automation' },
  { icon: UtensilsCrossed, name: 'Restaurant Management Software', desc: 'POS, table management, kitchen orders, inventory & billing' },
  { icon: ShoppingBag, name: 'Ecommerce Management System', desc: 'Product catalog, order management, shipping integration & analytics' },
  { icon: PieChart, name: 'Business Dashboard & Analytics', desc: 'Real-time KPIs, custom charts, department reports & data visualization' },
  { icon: FileArchive, name: 'Document Management System', desc: 'Centralized file storage, version control, access permissions & sharing' },
  { icon: HardDrive, name: 'Asset Management Software', desc: 'Track company assets, maintenance schedules, depreciation & audits' },
  { icon: Globe, name: 'Custom Web Applications', desc: 'Scalable web portals, dashboards, SaaS platforms & business tools' },
  { icon: Smartphone, name: 'Mobile Applications', desc: 'Android & iOS apps for customers, field teams & internal operations' },
  { icon: Building2, name: 'Enterprise Business Solutions', desc: 'Multi-branch, multi-department enterprise-grade management systems' },
];

export default function SoftwareProducts() {
  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Software Products
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Powerful Software Products Designed to <br />
            <span className="gradient-text">Simplify Business Operations</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-3">
            At Kvantum Tech Solutions, we develop software products that help businesses automate operations, improve productivity, and manage every department from a single platform.
          </p>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Every software product is fully customizable and can be integrated with your existing systems to ensure a seamless digital transformation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div
                key={idx}
                className="flex flex-col gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pinkCustom/30 hover:bg-pinkCustom/[0.03] hover:-translate-y-1 transition-all duration-300 cursor-default text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center shrink-0 group-hover:border-pinkCustom/30 transition-colors duration-300">
                  <Icon size={16} className="text-pinkCustom" />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-xs font-bold font-headline mb-1 leading-snug">{product.name}</h4>
                  <p className="text-zinc-500 text-[10px] leading-relaxed">{product.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-zinc-400 text-sm mb-5">Don't see your software? We build fully custom solutions for any business need.</p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            Discuss Your Custom Software Requirements
          </button>
        </div>

      </div>
    </section>
  );
}
