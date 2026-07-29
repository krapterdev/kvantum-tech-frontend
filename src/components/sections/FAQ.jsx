import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Badge from '../ui/Badge';

const faqs = [
  {
    q: '1. What software development services do you offer?',
    a: 'We provide custom software development, CRM software, HRMS software, ERP solutions, business automation, web application development, mobile app development, SaaS platforms, and enterprise software solutions tailored to your business.'
  },
  {
    q: '2. Can you build fully customized software?',
    a: 'Yes. Every solution we develop is customized according to your business processes, operational requirements, and future growth plans. We do not use one-size-fits-all templates.'
  },
  {
    q: '3. Do you provide CRM software?',
    a: 'Yes. We develop fully customized CRM systems for sales management, lead tracking, customer support, follow-ups, quotations, pipeline management, and detailed reporting dashboards.'
  },
  {
    q: '4. What is Business Automation?',
    a: 'Business automation eliminates repetitive manual work by automating workflows, approvals, notifications, customer communication, reporting, invoice generation, and business processes — saving time and improving efficiency.'
  },
  {
    q: '5. Do you develop HRMS software?',
    a: 'Yes. Our HRMS solutions include employee attendance management, payroll processing, leave management, recruitment workflows, employee records, onboarding, and performance management modules.'
  },
  {
    q: '6. Can you develop ERP software?',
    a: 'Absolutely. We build scalable ERP systems covering finance, inventory management, procurement, HR operations, sales tracking, production, and real-time business reporting.'
  },
  {
    q: '7. Do you develop mobile applications?',
    a: 'Yes. We build Android, iOS, and cross-platform mobile applications using modern frameworks including Flutter and React Native — for customers, field teams, and internal operations.'
  },
  {
    q: '8. Can your software integrate with existing systems?',
    a: 'Yes. We integrate payment gateways, WhatsApp Business API, SMS, email services, accounting software, ERP systems, REST APIs, and third-party platforms seamlessly into your solution.'
  },
  {
    q: '9. How long does software development take?',
    a: 'Project timelines depend on complexity, features, integrations, and business requirements. Basic modules typically take 4–8 weeks. After a free consultation, we provide a detailed project roadmap with clear milestones.'
  },
  {
    q: '10. Is my business data secure?',
    a: 'Absolutely. We follow secure coding standards, encrypted communication protocols, role-based access control, multi-factor authentication, and regular security auditing practices across every application we build.'
  },
  {
    q: '11. Do you provide post-launch support?',
    a: 'Yes. We provide maintenance, updates, monitoring, bug fixes, performance optimization, and dedicated technical support after deployment. All plans include a structured post-launch support period.'
  },
  {
    q: '12. Can software be upgraded later?',
    a: 'Yes. Our solutions are built with scalability in mind, allowing new modules, user roles, integrations, and features to be added as your business grows — without expensive rewrites.'
  },
  {
    q: '13. Do you provide cloud deployment?',
    a: 'Yes. We deploy software on secure cloud infrastructure (AWS, DigitalOcean, GCP) as well as on-premise servers based on your business requirements and data sensitivity.'
  },
  {
    q: '14. Which industries do you serve?',
    a: 'We serve manufacturing, healthcare, hospitality, education, logistics, finance, real estate, retail, ecommerce, construction, startups, SMEs, and large enterprises across India and beyond.'
  },
  {
    q: '15. How can I get started?',
    a: 'Simply book a free consultation using our contact form or call us directly. Our experts will understand your requirements, analyze your workflows, and recommend the best software solution for your business — with no commitment required.'
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 select-none">
      <div className="container mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            FAQs
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Frequently Asked <br />
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Everything you need to know about our software development services, pricing, process, and support.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                open === idx
                  ? 'border-pinkCustom/30 bg-pinkCustom/5'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/15'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="text-sm sm:text-base font-medium text-zinc-100">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-zinc-400 shrink-0 transition-transform duration-300 ${open === idx ? 'rotate-180 text-pinkCustom' : ''}`}
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

      </div>
    </section>
  );
}
