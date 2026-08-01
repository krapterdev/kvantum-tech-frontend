import React, { useState } from 'react';
import { Cpu, ArrowRight, MessageSquare, Database, Mail, BarChart3, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import Badge from '../ui/Badge';

const nodes = [
  { id: 'leads', label: '1. LEADS CAPTURE', icon: Sparkles, color: 'text-pinkCustom', desc: 'Auto capture from Web Forms, Meta Ads, IndiaMART, Justdial & Calls' },
  { id: 'whatsapp', label: '2. WHATSAPP BOT', icon: MessageSquare, color: 'text-emerald-400', desc: 'Instant WhatsApp welcome message, interactive menu & lead response under 5s' },
  { id: 'crm', label: '3. CRM PIPELINE', icon: Database, color: 'text-cyanCustom', desc: 'Auto assignment to sales rep, deal stage tracking & automated quotation creation' },
  { id: 'email', label: '4. EMAIL & SMS', icon: Mail, color: 'text-purpleCustom', desc: 'Drip follow-up sequences, proposal PDFs & payment reminder triggers' },
  { id: 'reports', label: '5. EXECUTIVE REPORTS', icon: BarChart3, color: 'text-amber-400', desc: 'Real-time sales P&L dashboard, rep performance scores & conversion analytics' },
];

export default function BusinessAutomationHighlight() {
  const [activeNode, setActiveNode] = useState(nodes[0]);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none text-left relative z-10">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
          <Zap size={14} className="animate-pulse" /> Signature Highlight
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          End-to-End Business Automation <br />
          <span className="gradient-text">Interactive Node Workflow Diagram</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Hover over or click any node below to see how our custom automation engines eliminate manual tasks across your sales & operations funnel.
        </p>
      </div>

      {/* Interactive Node Flow Diagram Container */}
      <div className="p-8 md:p-12 rounded-3xl bg-zinc-950/90 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl mb-12">
        
        {/* Horizontal Node Flow Line */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mb-12">

          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isActive = activeNode.id === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative ${
                  isActive
                    ? 'bg-white/10 border-pinkCustom/60 shadow-[0_0_25px_rgba(236,72,153,0.3)] scale-[1.04] z-20'
                    : 'bg-white/[0.02] border-white/8 hover:border-white/20 z-10'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${node.color} mb-3 ${isActive ? 'scale-110' : ''}`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs font-headline font-bold text-zinc-100 mb-1">{node.label}</span>
                <span className="text-[10px] font-mono text-zinc-500">Node #{idx + 1}</span>

                {/* Arrow Connector on desktop */}
                {idx < nodes.length - 1 && (
                  <ArrowRight size={16} className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-zinc-600 z-30" />
                )}
              </div>
            );
          })}

        </div>

        {/* Active Node Detail Expansion Box */}
        <div className="p-7 rounded-2xl bg-gradient-to-r from-pinkCustom/15 via-purpleCustom/15 to-cyanCustom/15 border border-white/15 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 text-white shrink-0">
              <activeNode.icon size={26} className={activeNode.color} />
            </div>
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeNode.color}`}>
                Active Workflow Node Expansion:
              </span>
              <h3 className="text-xl font-headline font-bold text-zinc-100 mt-0.5 mb-1">{activeNode.label}</h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">{activeNode.desc}</p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.35)] shrink-0 cursor-pointer"
          >
            Automate This Node →
          </button>
        </div>

      </div>

    </section>
  );
}
