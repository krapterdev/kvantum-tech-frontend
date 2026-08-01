import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Badge from '../ui/Badge';

const faqItems = [
  {
    num: '01',
    question: 'What custom software and business automation solutions does Kvantum Tech build?',
    answer: 'We specialize in Custom Software Development, CRM Systems, HRMS & Payroll Software, ERP Platforms, Business Process Automation, WhatsApp Business API, Web Applications, and Mobile Apps tailored specifically to your business operations.'
  },
  {
    num: '02',
    question: 'Do we get 100% source code ownership with zero recurring license fees?',
    answer: 'Yes! All custom software and automation solutions built by Kvantum Tech Solutions come with 100% full source code ownership. You never pay recurring software license fees or get locked into proprietary reseller platforms.'
  },
  {
    num: '03',
    question: 'How long does it take to develop and deploy a custom CRM or ERP system?',
    answer: 'Our sprint-driven development process delivers initial MVP releases within 2 to 4 weeks. Full-scale custom enterprise CRM or ERP platforms typically take 6 to 12 weeks depending on module complexity.'
  },
  {
    num: '04',
    question: 'Can Kvantum integrate WhatsApp Business API with our existing CRM/ERP database?',
    answer: 'Absolutely. We build direct Meta WhatsApp API integrations with automated lead response, instant quotation dispatch, payment reminders, order status updates, and 24/7 interactive chat bots.'
  },
  {
    num: '05',
    question: 'What post-launch maintenance and SLA support options do you provide?',
    answer: 'We offer 24/7 continuous system monitoring, rapid bug resolution SLAs, daily backups, cloud server maintenance, and dedicated developer support across our monthly engagement plans.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container mx-auto max-w-[960px] px-6 py-24 select-none text-left relative z-10">
      
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
          <HelpCircle size={14} /> Frequently Asked Questions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Everything You Need to Know <br />
          <span className="gradient-text">About Our Software & Process</span>
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-zinc-900 border-cyan-500 shadow-md'
                  : 'bg-slate-50 dark:bg-zinc-950/70 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                    isOpen ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' : 'bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400'
                  }`}>
                    {item.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-headline font-bold text-slate-900 dark:text-white">
                    {item.question}
                  </h3>
                </div>
                <div className={`p-2 rounded-xl border transition-transform duration-300 shrink-0 ${
                  isOpen ? 'bg-cyan-500 text-slate-950 border-cyan-500 rotate-180' : 'bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400'
                }`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-zinc-800 font-sans">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
