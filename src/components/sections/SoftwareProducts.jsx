import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Layers, BarChart2, Target, TrendingUp, Package,
  Warehouse, HeadphonesIcon, MessageSquare, CheckSquare,
  Clock, CreditCard, FolderKanban, Truck, ShoppingCart,
  FileText, PenLine, Wrench, Calendar, BookOpen,
  Heart, Hotel, UtensilsCrossed, ShoppingBag, PieChart,
  FileArchive, HardDrive, Globe, Smartphone, Building2, Sparkles, ArrowRight,
  ChevronDown, ChevronUp
} from 'lucide-react';
import Badge from '../ui/Badge';

const categories = ['All Products', 'CRM & Sales', 'HR & Operations', 'ERP & Finance', 'Industry Specific'];

const products = [
  { cat: 'CRM & Sales', icon: Users, name: 'Custom CRM Software', desc: 'Lead management, pipeline tracking, customer follow-ups, and sales automation' },
  { cat: 'HR & Operations', icon: Layers, name: 'HRMS Software', desc: 'Attendance, payroll, leaves, recruitment, employee records & HR analytics' },
  { cat: 'ERP & Finance', icon: BarChart2, name: 'ERP Software', desc: 'Integrated finance, procurement, inventory & operational management' },
  { cat: 'CRM & Sales', icon: Target, name: 'Lead Management System', desc: 'Capture, score, assign, and track leads through automated funnels' },
  { cat: 'CRM & Sales', icon: TrendingUp, name: 'Sales Management Software', desc: 'Sales targets, team performance, pipeline visibility & revenue reporting' },
  { cat: 'ERP & Finance', icon: Package, name: 'Inventory Management Software', desc: 'Stock tracking, reorder alerts, batch management & supplier control' },
  { cat: 'ERP & Finance', icon: Warehouse, name: 'Warehouse Management System', desc: 'Multi-warehouse control, goods receipt, dispatch & stock movement' },
  { cat: 'HR & Operations', icon: HeadphonesIcon, name: 'Customer Support Software', desc: 'Ticket management, escalation rules, SLA tracking & team collaboration' },
  { cat: 'CRM & Sales', icon: MessageSquare, name: 'WhatsApp Automation Platform', desc: 'Bulk campaigns, drip sequences, auto-replies & broadcast messaging' },
  { cat: 'HR & Operations', icon: CheckSquare, name: 'Task Management System', desc: 'Assign tasks, set deadlines, track progress & team daily logs' },
  { cat: 'HR & Operations', icon: Clock, name: 'Attendance Management Software', desc: 'Biometric sync, punch-in/out, shift management & attendance reports' },
  { cat: 'HR & Operations', icon: CreditCard, name: 'Payroll Management Software', desc: 'Auto salary calculations, payslip generation, tax deductions & compliance' },
  { cat: 'HR & Operations', icon: FolderKanban, name: 'Project Management Software', desc: 'Milestones, Gantt charts, team collaboration & deliverable tracking' },
  { cat: 'ERP & Finance', icon: Truck, name: 'Vendor Management System', desc: 'Supplier onboarding, PO management, vendor performance & payments' },
  { cat: 'ERP & Finance', icon: ShoppingCart, name: 'Procurement Software', desc: 'Purchase requisitions, approvals, cost control & vendor coordination' },
  { cat: 'ERP & Finance', icon: FileText, name: 'Billing & Invoice Management', desc: 'GST invoices, payment reminders, recurring billing & client accounts' },
  { cat: 'CRM & Sales', icon: PenLine, name: 'Quotation Management Software', desc: 'Create, send, track & convert quotations into confirmed orders' },
  { cat: 'HR & Operations', icon: Wrench, name: 'Service Management System', desc: 'Job scheduling, technician dispatch, AMC contracts & service history' },
  { cat: 'CRM & Sales', icon: Calendar, name: 'Appointment Booking Software', desc: 'Online booking, availability management, reminders & calendar sync' },
  { cat: 'HR & Operations', icon: BookOpen, name: 'Learning Management System (LMS)', desc: 'Employee training, course tracking, assessments & certifications' },
  { cat: 'Industry Specific', icon: Heart, name: 'Hospital Management Software', desc: 'Patient records, OPD/IPD, lab, pharmacy, billing & doctor management' },
  { cat: 'Industry Specific', icon: Hotel, name: 'Hotel Management Software', desc: 'Reservations, room management, guest profiles & front desk automation' },
  { cat: 'Industry Specific', icon: UtensilsCrossed, name: 'Restaurant Management Software', desc: 'POS, table management, kitchen orders, inventory & billing' },
  { cat: 'Industry Specific', icon: ShoppingBag, name: 'Ecommerce Management System', desc: 'Product catalog, order management, shipping integration & analytics' },
  { cat: 'ERP & Finance', icon: PieChart, name: 'Business Dashboard & Analytics', desc: 'Real-time KPIs, custom charts, department reports & data visualization' },
  { cat: 'HR & Operations', icon: FileArchive, name: 'Document Management System', desc: 'Centralized file storage, version control, access permissions & sharing' },
  { cat: 'HR & Operations', icon: HardDrive, name: 'Asset Management Software', desc: 'Track company assets, maintenance schedules, depreciation & audits' },
  { cat: 'CRM & Sales', icon: Globe, name: 'Custom Web Applications', desc: 'Scalable web portals, dashboards, SaaS platforms & business tools' },
  { cat: 'CRM & Sales', icon: Smartphone, name: 'Mobile Applications', desc: 'Android & iOS apps for customers, field teams & internal operations' },
  { cat: 'ERP & Finance', icon: Building2, name: 'Enterprise Business Solutions', desc: 'Multi-branch, multi-department enterprise-grade management systems' },
];

export default function SoftwareProducts() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredProducts = activeCategory === 'All Products'
    ? products
    : products.filter(p => p.cat === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section className="bg-zinc-950/40 border-y border-white/8 py-20 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            <Sparkles size={14} /> Custom Software Suite
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Powerful Software Products Designed to <br />
            <span className="gradient-text">Simplify & Automate Business Operations</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-3">
            At Kvantum Tech Solutions, we develop enterprise-grade software products that empower businesses to manage operations, workforce, sales, and logistics from a unified digital platform.
          </p>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Every module is 100% customizable, scalable, and includes full source code ownership with zero recurring license fees.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(10);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-headline transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-pinkCustom text-white shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-[1.02]'
                  : 'bg-white/[0.03] text-zinc-400 border border-white/8 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Compact Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayedProducts.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 p-5 rounded-2xl bg-zinc-900/40 border border-white/8 hover:border-pinkCustom/40 hover:bg-pinkCustom/[0.04] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-left group shadow-sm hover:shadow-[0_15px_30px_rgba(236,72,153,0.12)]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-pinkCustom/40 group-hover:bg-pinkCustom/10 transition-all duration-300 mb-3">
                    <Icon size={18} className="text-pinkCustom group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-zinc-100 text-xs font-bold font-headline mb-1.5 leading-snug group-hover:text-pinkCustom transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{product.desc}</p>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 pt-2 border-t border-white/5 transition-colors">
                  <span>Explore Module</span> <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More & View All Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {visibleCount < filteredProducts.length ? (
            <>
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 10, filteredProducts.length))}
                className="px-6 py-3 rounded-xl bg-pinkCustom/10 border border-pinkCustom/30 text-pinkCustom hover:bg-pinkCustom/20 text-xs sm:text-sm font-bold font-headline transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
              >
                <span>Load More Suites ({filteredProducts.length - visibleCount} Remaining)</span>
                <ChevronDown size={16} />
              </button>

              <button
                onClick={() => setVisibleCount(filteredProducts.length)}
                className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/[0.08] text-xs sm:text-sm font-bold font-headline transition-all cursor-pointer"
              >
                View All {filteredProducts.length} Suites
              </button>
            </>
          ) : (
            filteredProducts.length > 10 && (
              <button
                onClick={() => setVisibleCount(10)}
                className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/[0.08] text-xs sm:text-sm font-bold font-headline transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Show Compact View</span>
                <ChevronUp size={16} />
              </button>
            )
          )}

          <Link
            to="/services"
            className="px-6 py-3 rounded-xl bg-cyanCustom/10 border border-cyanCustom/30 text-cyanCustom hover:bg-cyanCustom/20 text-xs sm:text-sm font-bold font-headline transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore All Capabilities Page</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-pinkCustom/10 via-purpleCustom/10 to-cyanCustom/10 border border-white/12 text-center flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-lg font-headline font-bold text-zinc-100 mb-1">Need a Custom Software Solution?</h3>
            <p className="text-zinc-400 text-xs sm:text-sm">We engineer custom software modules tailored specifically to your unique operational workflow.</p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] shrink-0 cursor-pointer"
          >
            Discuss Custom Requirements →
          </button>
        </div>

      </div>
    </section>
  );
}
