import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const steps = [
  {
    num: '01',
    title: 'Discovery & Consultation',
    text: 'We understand your business, identify challenges, gather detailed requirements, and define clear project goals. This helps us build a solution that truly fits your operations.',
    accent: 'text-cyanCustom',
    border: 'group-hover:border-cyanCustom/30',
  },
  {
    num: '02',
    title: 'Planning & Strategy',
    text: 'Our experts prepare system architecture, user flow diagrams, technology stack recommendations, project timeline, and a structured development roadmap for your approval.',
    accent: 'text-pinkCustom',
    border: 'group-hover:border-pinkCustom/30',
  },
  {
    num: '03',
    title: 'UI/UX Design',
    text: 'We design intuitive, responsive, and user-friendly interfaces that deliver an exceptional user experience across all devices — desktop, tablet, and mobile.',
    accent: 'text-purpleCustom',
    border: 'group-hover:border-purpleCustom/30',
  },
  {
    num: '04',
    title: 'Development',
    text: 'Our developers build secure, scalable, and high-performance web applications, mobile apps, CRM systems, ERP platforms, and automation software using modern technology stacks.',
    accent: 'text-cyanCustom',
    border: 'group-hover:border-cyanCustom/30',
  },
  {
    num: '05',
    title: 'Testing & Quality Assurance',
    text: 'Every module undergoes functional testing, security checks, performance testing, and quality assurance reviews before deployment to ensure a bug-free experience.',
    accent: 'text-pinkCustom',
    border: 'group-hover:border-pinkCustom/30',
  },
  {
    num: '06',
    title: 'Deployment',
    text: 'We deploy your software on secure cloud or on-premise infrastructure with minimal downtime, proper configuration, and thorough go-live checks.',
    accent: 'text-purpleCustom',
    border: 'group-hover:border-purpleCustom/30',
  },
  {
    num: '07',
    title: 'Training & Support',
    text: 'Our team provides comprehensive user training, documentation, maintenance, updates, and long-term technical support to ensure your team gets the most out of the software.',
    accent: 'text-cyanCustom',
    border: 'group-hover:border-cyanCustom/30',
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-zinc-950/20 border-y border-white/5 py-24 px-6 select-none">
      <div className="container mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-5 mx-auto inline-flex items-center gap-1.5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
            Our Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight mb-5">
            Our Proven Software <br />
            <span className="gradient-text">Development Process</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We follow a structured development methodology that ensures every project is delivered on time, within budget, and aligned with your business objectives.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-start text-left group">
              <Card className={`p-7 border h-full w-full flex flex-col gap-4 hover:-translate-y-1.5 transition-all duration-300 ${step.border}`}>
                <span className={`text-4xl font-black font-headline ${step.accent} opacity-30 group-hover:opacity-100 transition-opacity duration-300`}>
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-headline font-bold text-zinc-100 mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{step.text}</p>
                </div>
              </Card>
              {/* Connector line — visible on lg only, except last two items */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-[12%] left-[92%] w-[35%] h-[1px] border-t-2 border-dashed border-white/8 z-0 group-hover:border-white/15 transition-colors duration-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
