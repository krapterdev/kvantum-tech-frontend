import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Badge from '../ui/Badge';

const faqs = [
  {
    q: 'What kind of software does Kvantum Tech Solutions develop?',
    a: 'We develop custom software solutions including CRM software, HRMS software, ERP systems, business automation tools, WhatsApp automation, inventory management, billing systems, mobile apps, and web applications — all built specifically for your business requirements.'
  },
  {
    q: 'How long does it take to develop custom software?',
    a: 'A basic software module typically takes 4–8 weeks. Complete business solutions like full CRM or HRMS systems take 2–5 months depending on the scope. We share a clear project timeline before starting work.'
  },
  {
    q: 'Do you provide software after delivery support?',
    a: 'Yes. All our packages include post-delivery support (3–12 months depending on the plan). We also offer extended Annual Maintenance Contracts (AMC) for ongoing updates, bug fixes, and feature additions.'
  },
  {
    q: 'Will I own the source code of the software?',
    a: 'Absolutely. You receive 100% ownership of the source code upon project delivery. There are no recurring license fees — you own and control your software completely.'
  },
  {
    q: 'Can you integrate the software with our existing tools?',
    a: 'Yes. We integrate with popular tools like WhatsApp Business API, Razorpay, Stripe, Google Sheets, Tally, Zoho, and custom APIs. If you have an existing system, we can build bridges to connect them.'
  },
  {
    q: 'Is the software mobile-friendly?',
    a: 'Yes. All our web software is fully mobile-responsive and accessible from any device. We also develop dedicated Android/iOS mobile apps for businesses that need a standalone mobile experience.'
  },
  {
    q: 'Do you work with businesses outside Delhi NCR?',
    a: 'Yes. We work with businesses across India — Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, and more. We deliver projects fully remotely with regular video call check-ins.'
  },
  {
    q: 'What is the minimum budget to start a project?',
    a: 'Projects start from ₹25,000 for basic software modules. Comprehensive business solutions like full CRM or HRMS range from ₹75,000 onwards depending on complexity. Contact us for a detailed quote.'
  },
  {
    q: 'Can you automate our WhatsApp customer communication?',
    a: 'Yes. We integrate the official WhatsApp Business API to automate campaigns, follow-ups, order notifications, lead nurturing sequences, and customer support replies inside WhatsApp at scale.'
  },
  {
    q: 'How do we get started?',
    a: 'Simply fill out our contact form or call us directly. We schedule a free consultation call to understand your requirements, then share a detailed project scope and timeline. No commitment required at that stage.'
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-24 select-none">

      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-cyanCustom/10 border-cyanCustom/20 text-cyanCustom">
          FAQs
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
          Frequently Asked <br />
          <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Everything you need to know about our software development services, pricing, and process.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              open === idx ? 'border-cyanCustom/30 bg-cyanCustom/5' : 'border-white/8 bg-white/[0.02] hover:border-white/15'
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="text-sm sm:text-base font-medium text-zinc-100">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`text-zinc-400 shrink-0 transition-transform duration-300 ${open === idx ? 'rotate-180 text-cyanCustom' : ''}`}
              />
            </button>
            {open === idx && (
              <div className="px-6 pb-6">
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
