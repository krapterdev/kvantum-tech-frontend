import React, { useState } from 'react';
import { Cpu, ArrowRight, MessageSquare, Database, Mail, BarChart3, Sparkles, Zap } from 'lucide-react';
import Badge from '../ui/Badge';

const nodes = [
  { id: 'leads', label: '1. LEADS CAPTURE', icon: Sparkles, color: 'text-pink-400', desc: 'Auto capture from Web Forms, Meta Ads, IndiaMART, Justdial & Calls' },
  { id: 'whatsapp', label: '2. WHATSAPP BOT', icon: MessageSquare, color: 'text-emerald-400', desc: 'Instant WhatsApp welcome message, interactive menu & lead response under 5s' },
  { id: 'crm', label: '3. CRM PIPELINE', icon: Database, color: 'text-cyan-400', desc: 'Auto assignment to sales rep, deal stage tracking & automated quotation creation' },
  { id: 'email', label: '4. EMAIL & SMS', icon: Mail, color: 'text-purple-400', desc: 'Drip follow-up sequences, proposal PDFs & payment reminder triggers' },
  { id: 'reports', label: '5. EXECUTIVE REPORTS', icon: BarChart3, color: 'text-amber-400', desc: 'Real-time sales P&L dashboard, rep performance scores & conversion analytics' },
];

export default function BusinessAutomationHighlight() {
  const [activeNode, setActiveNode] = useState(nodes[3]); // Default EMAIL & SMS

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          <Zap size={14} className="animate-pulse" /> Signature Automation Engine
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          End-to-End Business Automation <br />
          <span className="gradient-text">Interactive Workflow Architecture</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Hover over or click any node below to see how our custom automation engines eliminate manual tasks across your sales & operations funnel.
        </p>
      </div>

      {/* Interactive Node Flow Container */}
      <div className="p-8 md:p-10 rounded-3xl bg-slate-50 dark:bg-zinc-950/90 border border-slate-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl backdrop-blur-2xl mb-12">
        
        {/* Node Selector Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative mb-10">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isActive = activeNode.id === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative ${
                  isActive
                    ? 'bg-white dark:bg-zinc-900 border-cyan-500 shadow-lg scale-[1.02] z-20'
                    : 'bg-slate-100/70 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 z-10'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 flex items-center justify-center ${node.color} mb-3`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-headline font-bold text-slate-900 dark:text-white mb-1">{node.label}</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">Node #{idx + 1}</span>

                {idx < nodes.length - 1 && (
                  <ArrowRight size={14} className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-600 z-30" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Expansion Box (Fixed High Contrast Readability) */}
        <div className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white shrink-0">
              <activeNode.icon size={24} className={activeNode.color} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                Active Node Specifications:
              </span>
              <h3 className="text-xl font-headline font-bold text-slate-900 dark:text-white mb-1">{activeNode.label}</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">{activeNode.desc}</p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contact') || document.getElementById('contact-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/contact';
            }}
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 transition-colors shadow-md shrink-0 cursor-pointer"
          >
            Automate This Node →
          </button>
        </div>

      </div>

    </section>
  );
}
