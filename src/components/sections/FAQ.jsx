'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const homeFaqs = [
  {
    num: '01',
    question: 'What does a custom software development company do?',
    answer: 'A custom software development company designs and builds applications around the specific requirements, workflows, users, and goals of a business instead of relying entirely on pre-built software.'
  },
  {
    num: '02',
    question: 'What types of custom software do you develop?',
    answer: 'We develop CRM, HRMS, ERP systems, business management platforms, workflow automation, web applications, mobile apps, customer portals, internal systems, and other custom business software.'
  },
  {
    num: '03',
    question: 'Can you automate our existing business processes?',
    answer: 'Yes. We can analyze repetitive workflows and automate activities such as lead assignment, approvals, notifications, follow-ups, reporting, invoicing, employee processes, and system-to-system data exchange.'
  },
  {
    num: '04',
    question: 'Can you integrate with our existing software?',
    answer: 'Yes. Depending on the available APIs and technical capabilities, we can integrate existing software with payment gateways, WhatsApp, email, SMS, CRMs, ERPs, websites, mobile apps, and third-party services.'
  },
  {
    num: '05',
    question: 'How much does custom software development cost?',
    answer: 'The cost depends on project scope, functionality, integrations, design requirements, technology, security needs, and development timeline. We estimate projects after understanding the requirements.'
  },
  {
    num: '06',
    question: 'How long does custom software development take?',
    answer: 'Timelines vary by complexity. A focused application may require considerably less time than a multi-module ERP or enterprise platform. We define milestones and an estimated timeline after requirement analysis.'
  },
  {
    num: '07',
    question: 'Do you provide support after launch?',
    answer: 'Yes. Software can require maintenance, monitoring, optimization, security updates, integrations, and new features as the business evolves.'
  },
  {
    num: '08',
    question: 'Can you develop both web and mobile applications?',
    answer: 'Yes. We develop web applications as well as Android, iOS, and cross-platform mobile applications based on product and business requirements.'
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

export default function FAQ({
  items = homeFaqs,
  tag = "08 / QUESTIONS, ANSWERED",
  title = "Before we",
  highlightTitle = "begin.",
  subtitle = ""
} = {}) {
  const displayHighlight = subtitle || highlightTitle;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-slate-50 dark:bg-slate-950/80 py-20 sm:py-28 border-t border-slate-200/60 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Tag */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-4 block">
              {tag}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              {title} <br />
              <span className="text-cyan-500 dark:text-cyan-400">{displayHighlight}</span>
            </h2>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 flex flex-col border-t border-slate-200 dark:border-zinc-800">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const formattedNum = item.num || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);

              return (
                <div
                  key={idx}
                  className="border-b border-slate-200 dark:border-zinc-800 py-6 sm:py-7 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm sm:text-base font-semibold shrink-0 pt-0.5 w-7 sm:w-8">
                        {formattedNum}
                      </span>
                      <h3 className="text-base sm:text-lg lg:text-xl font-headline font-medium text-slate-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors pr-2">
                        {item.question}
                      </h3>
                    </div>

                    <div className="shrink-0 pt-1 text-cyan-500 dark:text-cyan-400">
                      <ChevronDown
                        size={20}
                        className={`transform transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0 text-slate-400 dark:text-zinc-500 group-hover:text-cyan-500'
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pl-11 sm:pl-14 pt-3 pb-1 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

