import React, { useState } from 'react';
import {
  Users, MessageSquare, Layers, BarChart3, CheckCircle2, ShieldCheck,
  TrendingUp, Activity, Bell, Smartphone, Search, RefreshCw, Zap
} from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const tabs = [
  {
    id: 'crm',
    label: 'Custom CRM System',
    icon: Users,
    color: 'text-pinkCustom',
    badge: 'Sales & Lead Funnel',
    title: 'Lead Pipeline & Automated Follow-Up Dashboard',
    desc: 'Track deal stages, assign lead rules automatically, trigger WhatsApp sequences, and monitor rep performance in real-time.',
    kpis: [
      { label: 'Active Leads', val: '1,420', change: '+18% this month' },
      { label: 'Conversion Rate', val: '24.8%', change: '+4.2% optimized' },
      { label: 'Follow-ups Automated', val: '9,840', change: 'Zero manual delays' },
    ],
    features: ['Auto Lead Assignment', 'WhatsApp Drip Sequences', 'Quotation Builder', 'Pipeline Stage Analytics'],
  },
  {
    id: 'hrms',
    label: 'HRMS & Payroll',
    icon: Layers,
    color: 'text-cyanCustom',
    badge: 'Workforce Hub',
    title: 'Attendance, Payroll & Employee Portal',
    desc: 'Automate biometric attendance sync, instant leave approvals, salary slip generation, and compliance tax calculations.',
    kpis: [
      { label: 'Total Employees', val: '285', change: 'Across 4 branches' },
      { label: 'On-Time Attendance', val: '97.2%', change: 'Biometric synced' },
      { label: 'Payroll Auto-Calculated', val: '₹42.5L', change: '100% accurate' },
    ],
    features: ['Biometric & GPS Punch-in', 'Auto Salary Calculation', 'Leave Workflow Approvals', 'Employee Self-Service App'],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Business API',
    icon: MessageSquare,
    color: 'text-purpleCustom',
    badge: 'Automated Messaging',
    title: 'Multi-Agent WhatsApp Broadcast & Bot Platform',
    desc: 'Send order alerts, payment reminders, broadcast campaigns, and automated AI chat responses through official Meta APIs.',
    kpis: [
      { label: 'Messages Sent / Month', val: '125,000+', change: '99.4% Delivery' },
      { label: 'Open Rate', val: '98.1%', change: '5x vs Email' },
      { label: 'Auto Response Time', val: '< 2 sec', change: '24/7 AI chatbot' },
    ],
    features: ['Official Green Tick Integration', 'Bulk Campaign Broadcasts', 'Interactive Bot Buttons', 'Multi-Agent Shared Inbox'],
  },
  {
    id: 'erp',
    label: 'Enterprise ERP',
    icon: BarChart3,
    color: 'text-emerald-400',
    badge: 'Operations & Inventory',
    title: 'End-to-End Inventory, Procurement & Billing ERP',
    desc: 'Unify stock levels across warehouses, automated purchase orders, supplier ledgers, and real-time P&L reporting.',
    kpis: [
      { label: 'Stock Valuation', val: '₹1.85 Cr', change: 'Live inventory sync' },
      { label: 'PO Approval Time', val: '15 mins', change: 'Down from 3 days' },
      { label: 'Invoices Generated', val: '3,450', change: 'Auto GST calculation' },
    ],
    features: ['Multi-Warehouse Tracking', 'Auto Re-Order Triggers', 'GST Complaint Invoicing', 'Real-Time Financial P&L'],
  },
];

export default function InteractiveDashboardMockup() {
  const [activeTabId, setActiveTabId] = useState('crm');
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const Icon = activeTab.icon;

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left">

      {/* Header */}
      <div className="text-center mb-14">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Activity size={14} className="animate-pulse" /> Live System Previews
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Experience How Our Custom Software <br />
          <span className="gradient-text">Dashboards Look & Perform</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Switch between system modules below to see real dashboard layouts, key metrics, and automated features we build for businesses.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold font-headline transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)] scale-[1.02]'
                  : 'bg-white/[0.02] text-zinc-400 border border-white/5 hover:border-white/15 hover:text-zinc-200'
              }`}
            >
              <TabIcon size={18} className={tab.color} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Mockup Container */}
      <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">

        {/* Window Chrome Header Bar */}
        <div className="flex justify-between items-center border-b border-white/8 pb-5 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-zinc-500 ml-3 hidden sm:inline">
              kts-cloud://app.kvantumtechsolutions.com/{activeTab.id}-module
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Live
            </span>
          </div>
        </div>

        {/* Mockup Body Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Summary & Features (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeTab.color} bg-white/[0.03] border border-white/8 px-3 py-1 rounded-full inline-block mb-3`}>
                {activeTab.badge}
              </span>
              <h3 className="text-2xl font-headline font-bold text-zinc-100 mb-3 leading-snug">
                {activeTab.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {activeTab.desc}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Key Automated Features:</span>
              {activeTab.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 size={14} className={activeTab.color} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact') || document.getElementById('contact-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/contact';
              }}
              className="py-3.5 px-6 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-zinc-100 border border-white/15 transition-all cursor-pointer text-center"
            >
              Customize This Module For Your Business →
            </button>
          </div>

          {/* Right Live KPIs & Mock UI Widgets (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Top KPIs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeTab.kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/8 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">{kpi.label}</span>
                  <span className={`text-2xl font-bold font-headline ${activeTab.color} my-1`}>{kpi.val}</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <TrendingUp size={10} /> {kpi.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated Live Analytics Graph & Feed Container */}
            <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-headline font-bold text-zinc-300 flex items-center gap-2">
                  <Activity size={14} className={activeTab.color} /> Real-Time Activity Log
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Auto-updating...</span>
              </div>

              {/* Feed Items */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-zinc-300 font-medium">Automated trigger executed: Lead assigned to Sales Representative</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Just now</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pinkCustom" />
                    <span className="text-zinc-300 font-medium">WhatsApp API message delivered to +91 98116XXXXX</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">2s ago</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyanCustom" />
                    <span className="text-zinc-300 font-medium">System backup & data sync completed successfully</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">1m ago</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
