import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Badge from '../ui/Badge';

export const homeFaqs = [
  {
    num: '01',
    question: 'What custom software & automation solutions does Kvantum Tech build?',
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

export const aboutFaqs = [
  {
    num: '01',
    question: 'Who is Kvantum Tech Solutions and where are you located?',
    answer: 'Kvantum Tech Solutions is a premier IT solutions & engineering agency based in Dilshad Garden, Delhi NCR (A33, 64, Tahirpur Rd, Delhi 110095). We build custom software, web applications, and enterprise automation.'
  },
  {
    num: '02',
    question: 'What is your core software engineering methodology?',
    answer: 'We follow a clean-code, sprint-based agile architecture using modern stacks (React, Node.js, PostgreSQL, Docker, AWS). We eliminate page builders and build high-performance custom engines.'
  },
  {
    num: '03',
    question: 'Can we schedule an in-person meeting or office visit?',
    answer: 'Yes! Client consultation meetings can be scheduled at our Delhi NCR office or conducted virtually via Google Meet / Zoom.'
  },
];

export const servicesFaqs = [
  {
    num: '01',
    question: 'Why choose Custom Software over off-the-shelf SaaS subscriptions?',
    answer: 'Off-the-shelf SaaS platforms force your team into rigid workflows and charge expensive monthly seat fees. Custom software is built 100% around your exact business processes, with zero monthly per-user licenses.'
  },
  {
    num: '02',
    question: 'What modules are included in your custom CRM & HRMS platforms?',
    answer: 'Our CRM solutions include lead pipeline management, automated follow-ups, quotation generation, and team activity logs. HRMS solutions cover biometric attendance sync, leave management, automated payroll, and payslip dispatch.'
  },
  {
    num: '03',
    question: 'How does WhatsApp Business API integration work for sales & support?',
    answer: 'We connect your system directly to Meta Official WhatsApp API webhooks to automate customer messaging, send broadcast updates, dispatch invoice receipts, and trigger 24/7 interactive chatbots.'
  },
];

export const projectsFaqs = [
  {
    num: '01',
    question: 'Can you sign a Non-Disclosure Agreement (NDA) before sharing project details?',
    answer: 'Yes, we sign strict mutual NDAs with all clients to safeguard intellectual property, proprietary business logic, client data, and software architecture.'
  },
  {
    num: '02',
    question: 'How do you ensure project milestones and code quality on delivered projects?',
    answer: 'We provide staging access for live testing, GitHub commit tracking, sprint demos every 2 weeks, and comprehensive automated test suites before production deployment.'
  },
  {
    num: '03',
    question: 'Do you provide maintenance and updates for completed software projects?',
    answer: 'Yes, all our completed software projects come with standard post-launch warranty support, plus optional long-term Annual Maintenance Contracts (AMC).'
  },
];

export const contactFaqs = [
  {
    num: '01',
    question: 'How fast will your technical team respond to my contact inquiry?',
    answer: 'Our SLA guarantees that all contact form inquiries receive a response from a senior software consultant within 2 business hours during working hours.'
  },
  {
    num: '02',
    question: 'What information should I provide to get an accurate project cost quotation?',
    answer: 'Providing a brief summary of your core objectives, required features/modules, target users, and preferred timeline allows us to prepare a detailed scope and fixed-price estimate.'
  },
  {
    num: '03',
    question: 'Do you offer free initial technical consultations?',
    answer: 'Yes! We offer a complimentary 30-minute technical architecture consultation to discuss your software roadmap, tech stack selection, and automation strategy.'
  },
];

export const blogFaqs = [
  {
    num: '01',
    question: 'How often does the Kvantum Tech engineering team publish articles?',
    answer: 'We publish weekly technical guides, architecture blueprints, SEO strategies, WhatsApp API tutorials, and enterprise automation case studies.'
  },
  {
    num: '02',
    question: 'Can I request a specific topic or tech stack guide on your blog?',
    answer: 'Yes! You can contact us via email or contact form with suggested technical topics, and our engineering leads will cover them in upcoming publications.'
  },
];

export default function FAQ({ items = homeFaqs, title = "Everything You Need to Know", subtitle = "About Our Software & Process" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container mx-auto max-w-[960px] px-6 py-24 select-none text-left relative z-10">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <Badge className="mb-4 mx-auto inline-flex items-center gap-1.5 bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400 font-mono text-xs">
          <HelpCircle size={14} /> Frequently Asked Questions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 dark:text-white leading-tight mb-4">
          {title} <br />
          <span className="gradient-text">{subtitle}</span>
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {items.map((item, idx) => {
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
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border shrink-0 ${
                    isOpen ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' : 'bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400'
                  }`}>
                    {item.num || `0${idx + 1}`}
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
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
