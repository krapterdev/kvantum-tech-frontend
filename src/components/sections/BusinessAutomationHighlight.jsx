import React from 'react';
import { Cpu, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GradientText from '../ui/GradientText';

export default function BusinessAutomationHighlight() {
  const automationTargets = [
    'Lead Management',
    'Sales Process',
    'Employee Management',
    'Customer Support',
    'WhatsApp Messaging',
    'Invoice Generation',
    'Task Assignment',
    'Notifications',
    'Reports',
    'Approvals',
    'Inventory',
    'Follow-ups',
    'CRM Activities',
    'HR Operations',
    'Business Reports'
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Context and CTAs */}
        <div className="lg:col-span-5 text-left flex flex-col items-start">
          <Badge className="mb-6 flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
            <Cpu size={14} className="animate-pulse" /> Business Automation Highlight
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-6">
            Stop Managing Work Manually. <br />
            <span className="gradient-text">Start Automating Your Business.</span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 font-sans">
            Manual processes slow down growth. Our business automation solutions eliminate repetitive work by connecting your departments, customers, employees, and workflows into one intelligent system.
          </p>
          
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] cursor-pointer text-center"
          >
            Schedule Free Demo
          </button>
        </div>
        
        {/* Right Column: Dynamic Targets Grid */}
        <div className="lg:col-span-7 w-full">
          <Card className="p-8 border bg-zinc-950/20">
            <h3 className="text-zinc-150 text-xs font-mono uppercase tracking-widest mb-6 text-left border-b border-white/5 pb-3">
              Automated Operations System
            </h3>
            
            <div className="flex flex-wrap gap-2.5 justify-start">
              {automationTargets.map((target, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/8 text-zinc-300 text-xs sm:text-sm hover:border-cyanCustom/40 hover:bg-cyanCustom/5 hover:text-cyanCustom hover:scale-[1.03] transition-all duration-300 cursor-default font-mono"
                >
                  <CheckCircle size={13} className="text-cyanCustom shrink-0" />
                  <span>{target}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
